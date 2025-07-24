// simplified-whatsapp.service.js
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const axios = require('axios');
const qrcode = require('qrcode-terminal');
const dbConnector = require('../utils/db-connector');

class SimplifiedWhatsAppService {
  constructor() {
    this.instances = new Map(); // instanceId -> {socket, state}
    this.instancesBasePath = path.join(__dirname, '../../instances');

    // Создание базовой директории, если её нет
    if (!fs.existsSync(this.instancesBasePath)) {
      fs.mkdirSync(this.instancesBasePath, { recursive: true });
    }
  }

  /**
   * Инициализировать экземпляр WhatsApp по запросу
   * @param {string} instanceId - ID экземпляра
   * @returns {Promise<object>} - Информация об экземпляре
   */
  async initInstance(instanceId) {
    logger.info(`Initializing WhatsApp instance ${instanceId}`);

    // Проверяем, существует ли уже экземпляр
    if (this.instances.has(instanceId)) {
      logger.info(`Instance ${instanceId} already exists, returning existing instance`);
      return this.instances.get(instanceId);
    }

    try {
      const prisma = dbConnector.getClient();

      // Проверяем, существует ли экземпляр в базе данных
      const instance = await prisma.instance.findUnique({
        where: { id: instanceId }
      });

      if (!instance) {
        throw new Error(`Instance ${instanceId} not found in database`);
      }

      // Создаем директорию для данных экземпляра
      const instancePath = this.getInstancePath(instanceId);
      const authPath = path.join(instancePath, 'auth');

      fs.mkdirSync(authPath, { recursive: true });

      // Инициализация состояния аутентификации
      const { state, saveCreds } = await useMultiFileAuthState(authPath);

      // Получаем последнюю версию Baileys
      const { version } = await fetchLatestBaileysVersion();

      // Создаем логгер для Baileys (тихий режим)
      const baileysLogger = pino({ level: 'silent' });

      // Создаем сокет WhatsApp
      const sock = makeWASocket({
        version,
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, baileysLogger)
        },
        printQRInTerminal: false, // Отключаем встроенный вывод QR
        logger: baileysLogger,
        browser: ['RK WhatsApp API', 'Chrome', '10.0.0'],
        syncFullHistory: false,
        markOnlineOnConnect: false
      });

      // Создаем объект экземпляра
      const instanceObj = {
        id: instanceId,
        socket: sock,
        status: 'connecting',
        qrCode: null
      };

      // Добавляем экземпляр в карту
      this.instances.set(instanceId, instanceObj);

      // Настраиваем обработчики событий
      this.setupEventHandlers(instanceId, sock, saveCreds);

      // Обновляем статус в базе данных
      await prisma.instance.update({
        where: { id: instanceId },
        data: {
          status: 'connecting',
          qrCode: null
        }
      });

      return instanceObj;
    } catch (error) {
      logger.error(`Error initializing WhatsApp instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });

      throw error;
    }
  }

  /**
   * Получить путь к директории экземпляра
   * @param {string} instanceId - ID экземпляра
   * @returns {string} - Путь к директории
   */
  getInstancePath(instanceId) {
    return path.join(this.instancesBasePath, instanceId);
  }

  /**
   * Настроить обработчики событий для экземпляра
   * @param {string} instanceId - ID экземпляра
   * @param {object} sock - Сокет WhatsApp
   * @param {function} saveCreds - Функция для сохранения учетных данных
   */
  setupEventHandlers(instanceId, sock, saveCreds) {
    const instanceObj = this.instances.get(instanceId);

    // Обработка обновлений соединения
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      // Обработка QR-кода
      if (qr) {
        logger.info(`QR Code received for instance ${instanceId}`);

        instanceObj.qrCode = qr;
        instanceObj.status = 'qr_received';

        // Выводим QR в консоль
        qrcode.generate(qr, { small: true });

        try {
          const prisma = dbConnector.getClient();
          await prisma.instance.update({
            where: { id: instanceId },
            data: {
              status: 'qr_received',
              qrCode: qr
            }
          });

          // Логируем получение QR
          await prisma.activityLog.create({
            data: {
              instanceId,
              action: 'qr_received',
              details: dbConnector.activeProvider === 'sqlite'
                ? JSON.stringify({})
                : {}
            }
          });
        } catch (error) {
          logger.error(`Error updating QR code for instance ${instanceId}`, {
            error: error.message
          });
        }
      }

      // Обработка изменений соединения
      if (connection) {
        if (connection === 'close') {
          const shouldReconnect = (lastDisconnect?.error instanceof Boom) &&
            lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;

          instanceObj.status = lastDisconnect?.error?.output?.statusCode === DisconnectReason.loggedOut
            ? 'logged_out'
            : 'disconnected';

          logger.info(`WhatsApp connection closed for instance ${instanceId}`, {
            reason: lastDisconnect?.error?.output?.payload?.message || 'Unknown',
            willReconnect: shouldReconnect
          });

          // Обновляем статус в базе данных
          try {
            const prisma = dbConnector.getClient();
            await prisma.instance.update({
              where: { id: instanceId },
              data: {
                status: instanceObj.status,
                qrCode: null
              }
            });

            // Логируем отключение
            await prisma.activityLog.create({
              data: {
                instanceId,
                action: 'disconnected',
                details: dbConnector.activeProvider === 'sqlite'
                  ? JSON.stringify({ reason: lastDisconnect?.error?.output?.payload?.message || 'Unknown' })
                  : { reason: lastDisconnect?.error?.output?.payload?.message || 'Unknown' }
              }
            });
          } catch (error) {
            logger.error(`Error updating status for instance ${instanceId}`, {
              error: error.message
            });
          }

          // Если не нужно переподключаться, удаляем экземпляр из карты
          if (!shouldReconnect) {
            this.instances.delete(instanceId);
          }
        }
        else if (connection === 'open') {
          logger.info(`WhatsApp client connected for instance ${instanceId}`);

          instanceObj.status = 'connected';
          instanceObj.qrCode = null;

          try {
            const prisma = dbConnector.getClient();

            // Обновляем статус в базе данных
            await prisma.instance.update({
              where: { id: instanceId },
              data: {
                status: 'connected',
                qrCode: null,
                lastActivity: new Date()
              }
            });

            // Логируем подключение
            await prisma.activityLog.create({
              data: {
                instanceId,
                action: 'connected',
                details: dbConnector.activeProvider === 'sqlite'
                  ? JSON.stringify({})
                  : {}
              }
            });
          } catch (error) {
            logger.error(`Error updating status for instance ${instanceId}`, {
              error: error.message
            });
          }
        }
      }
    });

    // Обработка обновлений учетных данных
    sock.ev.on('creds.update', async () => {
      try {
        await saveCreds();
        logger.info(`Credentials saved for instance ${instanceId}`);
      } catch (error) {
        logger.error(`Error saving credentials for instance ${instanceId}`, {
          error: error.message,
          stack: error.stack
        });
      }
    });

    // Обработка входящих сообщений
    sock.ev.on('messages.upsert', async (msg) => {
      // Обрабатываем только новые сообщения
      if (msg.type !== 'notify') return;

      for (const message of msg.messages) {
        // Пропускаем сообщения, отправленные нами
        if (message.key.fromMe) continue;

        // Получаем текст сообщения
        const messageContent = message.message?.conversation ||
          message.message?.extendedTextMessage?.text ||
          message.message?.imageMessage?.caption ||
          '';

        const from = message.key.remoteJid;

        logger.info(`Message received in instance ${instanceId}`, {
          from,
          body: messageContent
        });

        // Сохраняем сообщение в базе данных
        try {
          const prisma = dbConnector.getClient();

          // Получаем тип сообщения
          const messageType = Object.keys(message.message || {})[0];

          // Подготавливаем метаданные в зависимости от типа базы данных
          const metadata = {
            pushName: message.pushName,
            timestamp: message.messageTimestamp
          };

          const preparedMetadata = dbConnector.activeProvider === 'sqlite'
            ? JSON.stringify(metadata)
            : metadata;

          // Пропускаем сообщения, которые не содержат текстовое содержимое
          if (['messageContextInfo', 'protocolMessage'].includes(messageType)) {
            continue;
          }

          // Создаем запись сообщения
          await prisma.message.create({
            data: {
              instanceId,
              remoteJid: from,
              fromMe: false,
              messageType,
              content: messageContent,
              messageId: message.key.id,
              hasMedia: false, // Упрощенная версия без обработки медиа
              status: 'received',
              metadata: preparedMetadata
            }
          });

          // Обновляем счетчик сообщений
          await prisma.instance.update({
            where: { id: instanceId },
            data: {
              receivedMessages: { increment: 1 },
              lastActivity: new Date()
            }
          });
        } catch (error) {
          logger.error(`Error saving message for instance ${instanceId}`, {
            error: error.message,
            messageId: message.key.id
          });
        }
      }
    });
  }

  /**
   * Получить QR-код экземпляра
   * @param {string} instanceId - ID экземпляра
   * @returns {string|null} - QR-код или null
   */
  getQrCode(instanceId) {
    const instanceObj = this.instances.get(instanceId);
    return instanceObj ? instanceObj.qrCode : null;
  }

  /**
   * Получить статус экземпляра
   * @param {string} instanceId - ID экземпляра
   * @returns {object} - Объект статуса
   */
  getStatus(instanceId) {
    const instanceObj = this.instances.get(instanceId);
    if (!instanceObj) {
      return {
        ready: false,
        status: 'disconnected',
        hasQr: false
      };
    }

    return {
      ready: instanceObj.status === 'connected',
      status: instanceObj.status,
      hasQr: !!instanceObj.qrCode
    };
  }

  /**
   * Отправить сообщение
   * @param {string} instanceId - ID экземпляра
   * @param {string} to - Номер получателя
   * @param {string} message - Текст сообщения
   * @returns {Promise<object>} - Результат отправки
   */
  async sendMessage(instanceId, to, message) {
    const instanceObj = this.instances.get(instanceId);
    if (!instanceObj || instanceObj.status !== 'connected') {
      throw new Error(`Instance ${instanceId} not ready`);
    }

    try {
      // Форматируем номер получателя
      const chatId = this.formatNumber(to);

      // Отправляем сообщение
      const result = await instanceObj.socket.sendMessage(chatId, { text: message });

      logger.info(`Message sent for instance ${instanceId}`, {
        to: chatId,
        messageId: result.key.id
      });

      // Сохраняем сообщение в базе данных
      try {
        const prisma = dbConnector.getClient();

        // Подготавливаем метаданные
        const metadata = {
          timestamp: Date.now() / 1000
        };

        const preparedMetadata = dbConnector.activeProvider === 'sqlite'
          ? JSON.stringify(metadata)
          : metadata;

        // Создаем запись сообщения
        await prisma.message.create({
          data: {
            instanceId,
            remoteJid: chatId,
            fromMe: true,
            messageType: 'text',
            content: message,
            messageId: result.key.id,
            hasMedia: false,
            status: 'sent',
            metadata: preparedMetadata
          }
        });

        // Обновляем счетчик сообщений
        await prisma.instance.update({
          where: { id: instanceId },
          data: {
            sentMessages: { increment: 1 },
            lastActivity: new Date()
          }
        });
      } catch (error) {
        logger.error(`Error saving sent message for instance ${instanceId}`, {
          error: error.message,
          messageId: result.key.id
        });
      }

      return { id: result.key.id };
    } catch (error) {
      logger.error(`Error sending message for instance ${instanceId}`, {
        to,
        error: error.message,
        stack: error.stack
      });

      throw error;
    }
  }

  /**
   * Выйти из WhatsApp
   * @param {string} instanceId - ID экземпляра
   * @returns {Promise<object>} - Результат операции
   */
  async logout(instanceId) {
    const instanceObj = this.instances.get(instanceId);
    if (!instanceObj) {
      throw new Error(`Instance ${instanceId} not found`);
    }

    try {
      // Выполняем выход
      await instanceObj.socket.logout();

      // Удаляем экземпляр из карты
      this.instances.delete(instanceId);

      // Удаляем файлы аутентификации
      const authPath = path.join(this.getInstancePath(instanceId), 'auth');
      if (fs.existsSync(authPath)) {
        fs.rmSync(authPath, { recursive: true, force: true });
      }

      // Обновляем статус в базе данных
      const prisma = dbConnector.getClient();
      await prisma.instance.update({
        where: { id: instanceId },
        data: {
          status: 'logged_out',
          qrCode: null
        }
      });

      // Логируем выход
      await prisma.activityLog.create({
        data: {
          instanceId,
          action: 'logout',
          details: dbConnector.activeProvider === 'sqlite'
            ? JSON.stringify({})
            : {}
        }
      });

      return { success: true };
    } catch (error) {
      logger.error(`Error logging out instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });

      throw error;
    }
  }

  /**
   * Форматировать номер телефона
   * @param {string} number - Номер телефона
   * @returns {string} - Отформатированный номер
   */
  formatNumber(number) {
    // Удаляем все нецифровые символы
    let cleaned = number.toString().replace(/\D/g, '');

    // Убеждаемся, что номер не начинается с '+'
    if (cleaned.startsWith('+')) {
      cleaned = cleaned.substring(1);
    }

    // Добавляем суффикс '@s.whatsapp.net', если его нет
    if (!cleaned.includes('@')) {
      cleaned = `${cleaned}@s.whatsapp.net`;
    }

    return cleaned;
  }
}

// Экспортируем синглтон
module.exports = new SimplifiedWhatsAppService();