const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
const dbConnector = require('../utils/db-connector');
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const axios = require('axios');
const crypto = require('crypto');
const qrcode = require('qrcode-terminal');
const usageMonitor = require('./usage-monitor.service');

const prisma = dbConnector.getClient();

class WhatsAppManager {
  constructor() {
    this.instances = new Map();
    this.instancesBasePath = path.join(__dirname, '../../instances');

    // Создание базовой директории, если ее нет
    if (!fs.existsSync(this.instancesBasePath)) {
      fs.mkdirSync(this.instancesBasePath, { recursive: true });
    }

    // Принудительная остановка всех существующих инстансов при старте
    this.stopAllInstances().then(() => {
      // Запуск всех активных инстансов
      this.initAllInstances();
    });
  }

  async stopAllInstances() {
    logger.info('Stopping all existing instances before initialization');

    for (const [instanceId, instanceObj] of this.instances.entries()) {
      try {
        await this.stopInstance(instanceId);
      } catch (error) {
        logger.error(`Error stopping instance ${instanceId}`, {
          error: error.message
        });
      }
    }

    // Очищаем карту инстансов
    this.instances.clear();
  }

  /**
   * Инициализация всех инстансов из базы данных
   */
  async initAllInstances() {
    try {
      try {
        const tableExists = await prisma.$queryRaw`
          SELECT name FROM sqlite_master 
          WHERE type='table' AND name='instances'
        `;

        // If no table exists, return early
        if (!tableExists || tableExists.length === 0) {
          logger.warn('Instances table does not exist. Skipping initialization.');
          return;
        }
      } catch (tableCheckError) {
        logger.error('Error checking instances table existence', {
          error: tableCheckError.message
        });
        return;
      }

      // Полная очистка существующих инстансов в памяти
      this.instances.clear();

      const instances = await prisma.instance.findMany({
        where: {
          status: { not: 'deleted' }
        }
      });

      logger.info(`DIAGNOSTIC: Found ${instances.length} instances to initialize`, {
        instanceIds: instances.map(i => i.id)
      });

      // Сбрасываем статусы всех существующих инстансов
      await prisma.instance.updateMany({
        where: {
          status: { not: 'deleted' }
        },
        data: {
          status: 'disconnected',
          qrCode: null
        }
      });

      for (const instance of instances) {
        try {
          logger.info(`DIAGNOSTIC: Attempting to initialize instance ${instance.id}`);
          await this.initInstance(instance.id);
        } catch (initError) {
          logger.error(`DIAGNOSTIC: Failed to initialize instance ${instance.id}`, {
            error: initError.message,
            stack: initError.stack
          });
        }
      }
    } catch (error) {
      logger.error('DIAGNOSTIC: Critical error in initAllInstances', {
        error: error.message,
        stack: error.stack
      });
    }
  }

  /**
   * Получить путь к директории инстанса
   * @param {string} instanceId - ID инстанса
   * @returns {string} - Путь к директории инстанса
   */
  getInstancePath(instanceId) {
    return path.join(this.instancesBasePath, instanceId);
  }

  /**
 * Инициализировать новый инстанс WhatsApp
 * @param {string} instanceId - ID инстанса
 * @returns {Promise<object>} - Объект инстанса
 */
  async initInstance(instanceId) {
    try {
      // Проверка существующих экземпляров с тем же ID
      if (this.instances.has(instanceId)) {
        const existingInstance = this.instances.get(instanceId);

        // Если экземпляр уже инициализирован и в статусе connected или qr_received, возвращаем его
        if (existingInstance.status === 'connected' || existingInstance.status === 'qr_received') {
          logger.info(`Instance ${instanceId} already initialized with status: ${existingInstance.status}`);
          return existingInstance;
        }

        // Если экземпляр в процессе подключения, просто возвращаем его
        if (existingInstance.status === 'connecting') {
          logger.info(`Instance ${instanceId} is currently connecting`);
          return existingInstance;
        }

        // В остальных случаях останавливаем существующий экземпляр
        logger.info(`Stopping existing instance ${instanceId} with status: ${existingInstance.status}`);
        try {
          if (existingInstance.socket) {
            await existingInstance.socket.logout();
          }
          this.instances.delete(instanceId);
        } catch (error) {
          logger.error(`Error stopping existing instance ${instanceId}`, {
            error: error.message
          });
        }
      }

      // Получаем инстанс из базы данных
      const instance = await prisma.instance.findUnique({
        where: { id: instanceId },
        include: { webhookSettings: true }
      });

      if (!instance) {
        throw new Error(`Instance ${instanceId} not found in database`);
      }

      logger.info(`Initializing instance ${instanceId} with current status: ${instance.status}`);

      // Создаем директорию для данных инстанса
      const instancePath = this.getInstancePath(instanceId);
      const authPath = path.join(instancePath, 'auth');

      fs.mkdirSync(authPath, { recursive: true });

      // Инициализация состояния аутентификации
      const { state, saveCreds } = await useMultiFileAuthState(authPath);

      // Получаем последнюю версию Baileys
      const { version } = await fetchLatestBaileysVersion();

      // Создаем логгер для Baileys
      const baileysLogger = pino({ level: 'silent' });

      // Создаем сокет WhatsApp
      const sock = makeWASocket({
        version,
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, baileysLogger)
        },
        printQRInTerminal: false,
        logger: baileysLogger,
        browser: ['WhatsApp API', 'Chrome', '110.0.0'],
        syncFullHistory: false,
        markOnlineOnConnect: false,
        transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 }
      });

      // Создаем объект инстанса
      const instanceObj = {
        id: instanceId,
        socket: sock,
        status: 'connecting',
        qrCode: null,
        webhookQueue: [],
        webhookProcessing: false,
        lastActivity: new Date(),
        retryTimers: new Map(),
        qrGenerationAttempts: 0  // Счетчик попыток генерации QR-кода
      };

      // Добавляем инстанс в карту
      this.instances.set(instanceId, instanceObj);

      // Настраиваем обработчики событий
      this.setupEventHandlers(instanceId, sock, saveCreds);

      // Устанавливаем таймер для проверки, был ли сгенерирован QR-код
      setTimeout(async () => {
        const currentInstance = this.instances.get(instanceId);
        if (currentInstance && !currentInstance.qrCode && currentInstance.status === 'connecting') {
          logger.warn(`QR code not generated for instance ${instanceId} after timeout, retrying`);

          // Пробуем переинициализировать
          try {
            await this.reconnectInstance(instanceId);
          } catch (error) {
            logger.error(`Error reconnecting instance ${instanceId}`, {
              error: error.message
            });
          }
        }
      }, 10000);  // 10 секунд - таймаут для генерации QR-кода

      // Обновляем статус в базе данных
      await prisma.instance.update({
        where: { id: instanceId },
        data: {
          status: 'connecting',
          qrCode: null  // Очищаем QR-код при инициализации
        }
      });

      logger.info(`WhatsApp instance ${instanceId} initialized successfully`);

      return instanceObj;
    } catch (error) {
      logger.error(`Error initializing WhatsApp instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });

      // Обновляем статус в базе данных
      try {
        await prisma.instance.update({
          where: { id: instanceId },
          data: {
            status: 'error',
            qrCode: null
          }
        });
      } catch (statusUpdateError) {
        logger.error('Error updating instance status', {
          error: statusUpdateError.message
        });
      }

      throw error;
    }
  }

  /**
   * Настроить обработчики событий для инстанса
   * @param {string} instanceId - ID инстанса
   * @param {object} sock - Сокет WhatsApp
   * @param {function} saveCreds - Функция для сохранения учетных данных
   */
  setupEventHandlers(instanceId, sock, saveCreds) {
    // Получаем объект инстанса
    const instanceObj = this.instances.get(instanceId);
    if (!instanceObj) {
      logger.error(`CRITICAL: No instance object for ${instanceId} during event handler setup`);
      return;
    }

    // Счетчик для отслеживания количества генераций QR
    let qrGenerationCount = 0;

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      // Обработка QR-кода
      if (qr) {
        // Увеличиваем счетчик попыток генерации QR
        instanceObj.qrGenerationAttempts = (instanceObj.qrGenerationAttempts || 0) + 1;

        logger.info(`QR Code received for instance ${instanceId} (attempt ${instanceObj.qrGenerationAttempts})`);

        // Сохраняем QR-код в объекте инстанса
        instanceObj.qrCode = qr;
        instanceObj.status = 'qr_received';

        // Обновляем статус и QR-код в базе данных
        try {
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
                ? JSON.stringify({ attempt: instanceObj.qrGenerationAttempts })
                : { attempt: instanceObj.qrGenerationAttempts }
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
          // Определяем причину разрыва соединения
          const statusCode = lastDisconnect?.error?.output?.statusCode;
          const reason = lastDisconnect?.error?.output?.payload?.message || 'Unknown';

          // Определяем, нужно ли пытаться переподключиться автоматически
          // Стандартная логика для shouldReconnect
          let shouldReconnect = (lastDisconnect?.error instanceof Boom) &&
            statusCode !== DisconnectReason.loggedOut;

          // Дополнительная логика: всегда пытаемся переподключиться при ошибке "Connection Failure"
          if (reason === 'Connection Failure') {
            shouldReconnect = true;
            logger.info(`Force reconnect enabled for Connection Failure in instance ${instanceId}`);
          }

          // Обновляем статус в объекте
          instanceObj.status = statusCode === DisconnectReason.loggedOut ? 'logged_out' : 'disconnected';

          logger.info(`WhatsApp connection closed for instance ${instanceId}`, {
            reason: reason,
            willReconnect: shouldReconnect
          });

          // Обновляем статус в базе данных
          try {
            await prisma.instance.update({
              where: { id: instanceId },
              data: {
                status: instanceObj.status,
                qrCode: null  // Очищаем QR-код при отключении
              }
            });

            // Логируем отключение
            await prisma.activityLog.create({
              data: {
                instanceId,
                action: 'disconnected',
                details: dbConnector.activeProvider === 'sqlite'
                  ? JSON.stringify({ reason: reason })
                  : { reason: reason }
              }
            });
          } catch (error) {
            logger.error(`Error updating status for instance ${instanceId}`, {
              error: error.message
            });
          }

          // Если нужно переподключиться, делаем это после задержки
          if (shouldReconnect) {
            // Увеличиваем задержку до 10 секунд для более стабильного переподключения
            setTimeout(() => {
              logger.info(`Attempting to reconnect instance ${instanceId}`);

              // Полный перезапуск инстанса
              this.instances.delete(instanceId); // Удаляем старый инстанс из карты

              // Инициализируем инстанс заново
              this.initInstance(instanceId).catch(error => {
                logger.error(`Error reinitializing instance ${instanceId}`, {
                  error: error.message
                });
              });
            }, 10000);
          } else {
            // Если не нужно переподключаться, удаляем экземпляр из карты
            this.instances.delete(instanceId);
          }
        }
        else if (connection === 'open') {
          logger.info(`WhatsApp client connected for instance ${instanceId}`);

          // Сбрасываем счетчик попыток генерации QR
          instanceObj.qrGenerationAttempts = 0;

          // Обновляем статус
          instanceObj.status = 'connected';
          instanceObj.qrCode = null;  // Очищаем QR-код при подключении

          try {
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

    // Обработка обновлений учетных данных с дополнительной защитой
    sock.ev.on('creds.update', async (creds) => {
      try {
        // Вначале используем встроенное сохранение
        await saveCreds();

        // Дополнительно логируем для отладки
        logger.info(`Credentials update triggered for instance ${instanceId}`);

        // Затем явно сохраняем credentials с использованием промисов
        const instancePath = this.getInstancePath(instanceId);
        const authPath = path.join(instancePath, 'auth');
        const credsPath = path.join(authPath, 'creds.json');

        // Убедимся, что директория существует
        if (!fs.existsSync(authPath)) {
          fs.mkdirSync(authPath, { recursive: true });
        }

        // Попробуем прочитать существующие credentials
        let existingCreds = {};
        try {
          if (fs.existsSync(credsPath)) {
            const credsData = fs.readFileSync(credsPath, 'utf8');
            if (credsData.trim()) {
              existingCreds = JSON.parse(credsData);
            }
          }
        } catch (readError) {
          logger.error(`Error reading credentials file for instance ${instanceId}`, {
            error: readError.message,
            path: credsPath
          });
        }

        // Объединяем обновленные и существующие credentials
        const updatedCreds = {
          ...existingCreds,
          ...creds,
          creation_timestamp: existingCreds.creation_timestamp || new Date().toISOString()
        };

        // Записываем с использованием промисов
        await fs.promises.writeFile(
          credsPath,
          JSON.stringify(updatedCreds, null, 2),
          'utf8'
        );

        logger.info(`Credentials successfully updated and saved for instance ${instanceId}`);
      } catch (error) {
        logger.error(`Error in creds.update for instance ${instanceId}`, {
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

        logger.debug(`Message received in instance ${instanceId}`, {
          from,
          body: messageContent
        });

        // Получаем тип сообщения
        const messageType = Object.keys(message.message || {})[0];

        // Обрабатываем медиа, если есть
        let media = null;
        if (message.message?.imageMessage || message.message?.documentMessage ||
          message.message?.videoMessage || message.message?.audioMessage) {
          try {
            media = await this.downloadMedia(sock, message);
          } catch (error) {
            logger.error(`Error downloading media for instance ${instanceId}`, {
              error: error.message,
              messageId: message.key.id
            });
          }
        }

        // Сохраняем сообщение в базе данных
        try {
          // Импортируем сервис инстансов
          const instanceService = require('./instance.service');

          // Подготавливаем данные сообщения
          const messageData = {
            remoteJid: from,
            fromMe: false,
            messageType,
            content: messageContent,
            messageId: message.key.id,
            hasMedia: !!media,
            mediaUrl: null, // В будущем можно реализовать хранение медиафайлов
            caption: message.message?.imageMessage?.caption || message.message?.videoMessage?.caption,
            mimeType: message.message?.imageMessage?.mimetype ||
              message.message?.documentMessage?.mimetype ||
              message.message?.videoMessage?.mimetype ||
              message.message?.audioMessage?.mimetype,
            fileName: message.message?.documentMessage?.fileName,
            status: 'received',
            metadata: {
              pushName: message.pushName,
              timestamp: message.messageTimestamp
            }
          };

          // Асинхронно сохраняем сообщение, не блокируя основной процесс
          instanceService.saveMessage(instanceId, messageData)
            .then(() => {
              logger.debug(`Message saved to database for instance ${instanceId}`);
            })
            .catch(error => {
              logger.error(`Error saving message for instance ${instanceId}`, {
                error: error.message
              });
            });

          // Также можно асинхронно сохранить контакт
          try {
            const contactService = require('./contact.service');
            contactService.getOrCreateContact(instanceId, from, message.pushName)
              .then(() => {
                logger.debug(`Contact saved/updated for instance ${instanceId}`);
              })
              .catch(contactError => {
                logger.warn(`Contact save error for instance ${instanceId}`, {
                  error: contactError.message
                });
              });
          } catch (contactImportError) {
            logger.warn(`Contact import error for instance ${instanceId}`, {
              error: contactImportError.message
            });
          }
        } catch (error) {
          logger.error(`Error in database integration for instance ${instanceId}`, {
            error: error.message,
            messageId: message.key.id
          });
        }

        // Отправляем уведомление через вебхук, если настроен
        await this.sendWebhook(instanceId, {
          event: 'message_received',
          data: {
            messageId: message.key.id,
            from,
            body: messageContent,
            type: messageType,
            timestamp: message.messageTimestamp,
            hasMedia: !!media,
            media,
            pushName: message.pushName
          }
        });
      }
    });

    // Обработка изменений статуса сообщения
    sock.ev.on('messages.update', async (updates) => {
      for (const update of updates) {
        // Обрабатываем только обновления статуса
        if (!update.update.status) continue;

        const { key, update: { status } } = update;

        logger.debug(`Message status update in instance ${instanceId}`, {
          messageId: key.id,
          status
        });

        // Обновляем статус сообщения в базе данных
        try {
          // Импортируем сервис инстансов
          const instanceService = require('./instance.service');

          // Обновляем статус
          await instanceService.updateMessageStatus(instanceId, key.id, status);
        } catch (error) {
          logger.error(`Error updating message status for instance ${instanceId}`, {
            error: error.message,
            messageId: key.id,
            status
          });
        }

        // Отправляем уведомление через вебхук, если настроен
        await this.sendWebhook(instanceId, {
          event: 'message_status',
          data: {
            messageId: key.id,
            status,
            from: key.remoteJid,
            fromMe: key.fromMe
          }
        });
      }
    });
  }

  /**
   * Загрузить медиа из сообщения
   * @param {object} sock - Сокет WhatsApp
   * @param {object} message - Сообщение
   * @returns {Promise<object>} Медиа-данные
   */
  async downloadMedia(sock, message) {
    try {
      let messageType;
      if (message.message?.imageMessage) messageType = 'image';
      else if (message.message?.documentMessage) messageType = 'document';
      else if (message.message?.videoMessage) messageType = 'video';
      else if (message.message?.audioMessage) messageType = 'audio';
      else return null;

      if (!messageType) return null;

      const stream = await sock.downloadContentFromMessage(
        message.message[`${messageType}Message`],
        messageType
      );

      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }

      return {
        data: buffer.toString('base64'),
        mimetype: message.message[`${messageType}Message`].mimetype,
        filename: message.message[`${messageType}Message`].fileName || `${messageType}.${message.message[`${messageType}Message`].mimetype.split('/')[1]}`
      };
    } catch (error) {
      logger.error('Error downloading media', {
        error: error.message,
        messageId: message.key.id
      });
      return null;
    }
  }

  /**
   * Отправить вебхук на настроенный URL
   * @param {string} instanceId - ID инстанса
   * @param {object} data - Данные для отправки
   */
  async sendWebhook(instanceId, data) {
    // Получаем инстанс из базы данных
    const instance = await prisma.instance.findUnique({
      where: { id: instanceId },
      include: { webhookSettings: true }
    });

    // Если вебхук не настроен или отключен, выходим
    if (!instance || !instance.webhookUrl || !instance.webhookEnabled) {
      return;
    }

    // Проверяем настройки вебхука для данного типа события
    const settings = instance.webhookSettings;
    if (settings) {
      // Проверяем, нужно ли отправлять уведомление для данного типа события
      if (data.event === 'message_received' && !settings.notifyReceived) return;
      if (data.event === 'message_status' && !settings.notifyDelivery) return;
      if (data.event === 'message_sent' && !settings.notifySent) return;
    }

    // Добавляем задачу в очередь вебхуков
    const webhookTask = {
      id: crypto.randomUUID(),
      instanceId,
      webhookUrl: instance.webhookUrl,
      data: {
        ...data,
        instanceId,
        timestamp: new Date().toISOString()
      },
      attempt: 1,
      maxRetries: settings?.maxRetries || 3,
      retryInterval: settings?.retryInterval || 60000
    };

    usageMonitor.trackMetric(instanceId, 'webhookCalls');

    // Получаем объект инстанса из карты
    const instanceObj = this.instances.get(instanceId);
    if (instanceObj) {
      instanceObj.webhookQueue.push(webhookTask);

      // Запускаем обработку вебхуков, если она не запущена
      if (!instanceObj.webhookProcessing) {
        this.processWebhookQueue(instanceId);
      }
    }
  }

  /**
   * Обработать очередь вебхуков
   * @param {string} instanceId - ID инстанса
   */
  async processWebhookQueue(instanceId) {
    // Получаем объект инстанса из карты
    const instanceObj = this.instances.get(instanceId);
    if (!instanceObj) return;

    // Устанавливаем флаг обработки
    instanceObj.webhookProcessing = true;

    // Пока есть задачи в очереди
    while (instanceObj.webhookQueue.length > 0) {
      // Получаем следующую задачу
      const task = instanceObj.webhookQueue.shift();

      // Отправляем вебхук
      try {
        // Получаем настройки вебхука из базы данных
        const settings = await prisma.webhookSettings.findUnique({
          where: { instanceId }
        });

        // Подготавливаем данные для отправки
        const payload = task.data;

        // Если есть секретный ключ, добавляем подпись
        let headers = {};
        if (settings?.secret) {
          const signature = this.generateWebhookSignature(payload, settings.secret);
          headers['X-Webhook-Signature'] = signature;
        }

        // Если есть дополнительные заголовки, добавляем их
        if (settings?.headers) {
          headers = { ...headers, ...settings.headers };
        }

        // Отправляем запрос
        const response = await axios.post(task.webhookUrl, payload, {
          headers,
          timeout: 10000 // Таймаут 10 секунд
        });

        // Логируем успешную отправку
        logger.debug(`Webhook sent successfully for instance ${instanceId}`, {
          taskId: task.id,
          event: task.data.event,
          status: response.status
        });

        // Записываем результат в базу данных
        const instanceService = require('./instance.service');
        await instanceService.logWebhookResult(instanceId, {
          webhookUrl: task.webhookUrl,
          payload,
          response: {
            status: response.status,
            data: response.data
          },
          statusCode: response.status,
          success: true,
          attempt: task.attempt
        });
      } catch (error) {
        // Логируем ошибку
        logger.error(`Error sending webhook for instance ${instanceId}`, {
          taskId: task.id,
          event: task.data.event,
          error: error.message,
          attempt: task.attempt
        });

        // Если не превышено максимальное количество попыток, добавляем задачу обратно в очередь
        if (task.attempt < task.maxRetries) {
          // Увеличиваем счетчик попыток
          task.attempt++;

          // Вычисляем время следующей попытки с экспоненциальной задержкой
          const retryDelay = task.retryInterval * Math.pow(2, task.attempt - 1);

          // Создаем таймер для повторной попытки
          const timer = setTimeout(() => {
            // Убираем таймер из карты
            instanceObj.retryTimers.delete(task.id);

            // Добавляем задачу обратно в очередь
            instanceObj.webhookQueue.push(task);

            // Если обработка не запущена, запускаем её
            if (!instanceObj.webhookProcessing) {
              this.processWebhookQueue(instanceId);
            }
          }, retryDelay);

          // Сохраняем таймер в карту
          instanceObj.retryTimers.set(task.id, timer);
        } else {
          // Записываем результат в базу данных
          const instanceService = require('./instance.service');
          await instanceService.logWebhookResult(instanceId, {
            webhookUrl: task.webhookUrl,
            payload: task.data,
            response: null,
            statusCode: error.response?.status,
            success: false,
            attempt: task.attempt,
            errorMessage: error.message
          });
        }
      }
    }

    // Сбрасываем флаг обработки
    instanceObj.webhookProcessing = false;
  }

  /**
   * Генерировать подпись для вебхука
   * @param {object} payload - Данные для отправки
   * @param {string} secret - Секретный ключ
   * @returns {string} Подпись
   */
  generateWebhookSignature(payload, secret) {
    const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
    return crypto.createHmac('sha256', secret).update(data).digest('hex');
  }

  /**
   * Получить статус инстанса
   * @param {string} instanceId - ID инстанса
   * @returns {object} Статус инстанса
   */
  getInstanceStatus(instanceId) {
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
   * Получить QR-код инстанса
   * @param {string} instanceId - ID инстанса
   * @returns {string|null} QR-код
   */
  getInstanceQrCode(instanceId) {
    const instanceObj = this.instances.get(instanceId);
    return instanceObj ? instanceObj.qrCode : null;
  }

  /**
   * Остановить инстанс
   * @param {string} instanceId - ID инстанса
   */
  async stopInstance(instanceId) {
    const instanceObj = this.instances.get(instanceId);
    if (!instanceObj) {
      logger.warn(`Cannot stop instance ${instanceId}: not found`);
      return;
    }

    logger.info(`Stopping WhatsApp instance ${instanceId}`);

    try {
      // Очищаем все таймеры повторных попыток отправки вебхуков
      for (const timerId of instanceObj.retryTimers.keys()) {
        clearTimeout(instanceObj.retryTimers.get(timerId));
      }

      // Закрываем соединение
      if (instanceObj.socket) {
        await instanceObj.socket.logout();
        instanceObj.socket.ev.removeAllListeners();
        instanceObj.socket = null;
      }

      // Удаляем инстанс из карты
      this.instances.delete(instanceId);

      // Обновляем статус в базе данных
      await prisma.instance.update({
        where: { id: instanceId },
        data: {
          status: 'disconnected',
          qrCode: null
        }
      });

      // Регистрируем активность
      await prisma.activityLog.create({
        data: {
          instanceId,
          action: 'instance_stopped'
        }
      });

      logger.info(`WhatsApp instance ${instanceId} stopped`);
    } catch (error) {
      logger.error(`Error stopping instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });

      // Удаляем инстанс из карты даже при ошибке
      this.instances.delete(instanceId);

      throw error;
    }
  }

  /**
   * Обновить настройки вебхука инстанса
   * @param {string} instanceId - ID инстанса
   */
  async updateInstanceWebhook(instanceId) {
    const instanceObj = this.instances.get(instanceId);
    if (!instanceObj) {
      logger.warn(`Cannot update webhook for instance ${instanceId}: not found`);
      return;
    }

    try {
      // Получаем инстанс из базы данных
      const instance = await prisma.instance.findUnique({
        where: { id: instanceId },
        include: { webhookSettings: true }
      });

      // Отправляем тестовый вебхук для проверки настроек
      if (instance.webhookUrl && instance.webhookEnabled) {
        await this.sendWebhook(instanceId, {
          event: 'webhook_updated',
          data: {
            instanceId,
            timestamp: new Date().toISOString()
          }
        });

        logger.info(`Webhook settings updated for instance ${instanceId}`);
      }
    } catch (error) {
      logger.error(`Error updating webhook for instance ${instanceId}`, {
        error: error.message
      });
    }
  }

  /**
   * Выход из WhatsApp
   * @param {string} instanceId - ID инстанса
   */
  async logoutInstance(instanceId) {
    const instanceObj = this.instances.get(instanceId);
    if (!instanceObj) {
      logger.warn(`Cannot logout instance ${instanceId}: not found`);
      return;
    }

    try {
      logger.info(`Logging out WhatsApp instance ${instanceId}`);

      // Выход из WhatsApp
      if (instanceObj.socket) {
        await instanceObj.socket.logout();
      }

      // Удаляем файлы аутентификации
      const authPath = path.join(this.getInstancePath(instanceId), 'auth');
      if (fs.existsSync(authPath)) {
        fs.rmSync(authPath, { recursive: true, force: true });
      }

      // Останавливаем инстанс
      await this.stopInstance(instanceId);

      // Обновляем статус в базе данных
      await prisma.instance.update({
        where: { id: instanceId },
        data: {
          status: 'logged_out',
          qrCode: null
        }
      });

      // Регистрируем активность
      await prisma.activityLog.create({
        data: {
          instanceId,
          action: 'instance_logout'
        }
      });

      logger.info(`WhatsApp instance ${instanceId} logged out`);
    } catch (error) {
      logger.error(`Error logging out instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });

      throw error;
    }
  }

  /**
 * Переподключить инстанс
 * @param {string} instanceId - ID инстанса
 */
  async reconnectInstance(instanceId) {
    try {
      logger.info(`Reconnecting instance ${instanceId}`);

      // Пробуем остановить существующий инстанс
      await this.stopInstance(instanceId);

      // Пробуем заново инициализировать
      await this.initInstance(instanceId);

      logger.info(`Instance ${instanceId} reconnected successfully`);
    } catch (error) {
      logger.error(`Error reconnecting instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });
    }
  }

  /**
   * Отправить сообщение через инстанс
   * @param {string} instanceId - ID инстанса
   * @param {string} to - Номер получателя
   * @param {string} message - Текст сообщения
   * @returns {Promise<object>} Результат отправки
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

      logger.debug(`Message sent for instance ${instanceId}`, {
        to: chatId,
        messageId: result.key.id
      });

      // Сохраняем сообщение в базе данных
      try {
        // Импортируем сервис инстансов
        const instanceService = require('./instance.service');

        // Подготавливаем данные сообщения
        const messageData = {
          remoteJid: chatId,
          fromMe: true,
          messageType: 'text',
          content: message,
          messageId: result.key.id,
          hasMedia: false,
          status: 'sent',
          metadata: {
            timestamp: Date.now() / 1000
          }
        };

        // Асинхронно сохраняем сообщение
        instanceService.saveMessage(instanceId, messageData)
          .then(() => {
            logger.debug(`Sent message saved to database for instance ${instanceId}`);
          })
          .catch(error => {
            logger.error(`Error saving sent message for instance ${instanceId}`, {
              error: error.message
            });
          });

        // Также можно асинхронно сохранить контакт
        try {
          const contactService = require('./contact.service');
          contactService.getOrCreateContact(instanceId, chatId)
            .then(() => {
              logger.debug(`Contact saved/updated for sent message in instance ${instanceId}`);
            })
            .catch(contactError => {
              logger.warn(`Contact save error for sent message in instance ${instanceId}`, {
                error: contactError.message
              });
            });
        } catch (contactImportError) {
          logger.warn(`Contact import error for sent message in instance ${instanceId}`, {
            error: contactImportError.message
          });
        }
      } catch (error) {
        logger.error(`Error in database integration for sent message in instance ${instanceId}`, {
          error: error.message
        });
      }

      // Отправляем уведомление через вебхук
      await this.sendWebhook(instanceId, {
        event: 'message_sent',
        data: {
          messageId: result.key.id,
          to: chatId,
          body: message,
          timestamp: Date.now() / 1000
        }
      });

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
   * Отправить медиа по URL
   * @param {string} instanceId - ID инстанса
   * @param {string} to - Номер получателя
   * @param {string} url - URL медиафайла
   * @param {string} caption - Подпись к медиафайлу
   * @param {string} filename - Имя файла
   * @returns {Promise<object>} Результат отправки
   */
  async sendMediaByUrl(instanceId, to, url, caption = '', filename = 'file') {
    const instanceObj = this.instances.get(instanceId);
    if (!instanceObj || instanceObj.status !== 'connected') {
      throw new Error(`Instance ${instanceId} not ready`);
    }

    try {
      // Форматируем номер получателя
      const chatId = this.formatNumber(to);

      // Загружаем медиафайл
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data);
      const mimetype = response.headers['content-type'];

      // Определяем тип файла
      const isImage = mimetype.startsWith('image');
      const isVideo = mimetype.startsWith('video');
      const isDocument = !isImage && !isVideo;

      let messageData;
      let messageType;

      if (isImage) {
        messageData = {
          image: buffer,
          caption: caption || ''
        };
        messageType = 'image';
      } else if (isVideo) {
        messageData = {
          video: buffer,
          caption: caption || ''
        };
        messageType = 'video';
      } else {
        messageData = {
          document: buffer,
          fileName: filename,
          caption: caption || '',
          mimetype
        };
        messageType = 'document';
      }

      // Отправляем медиафайл
      const result = await instanceObj.socket.sendMessage(chatId, messageData);

      logger.debug(`Media sent for instance ${instanceId}`, {
        to: chatId,
        messageId: result.key.id,
        type: messageType
      });

      // Сохраняем сообщение в базе данных
      try {
        // Импортируем сервис инстансов
        const instanceService = require('./instance.service');

        // Подготавливаем данные сообщения
        const messageDataForDb = {
          remoteJid: chatId,
          fromMe: true,
          messageType,
          content: caption || '',
          messageId: result.key.id,
          hasMedia: true,
          mediaUrl: url,
          caption,
          mimeType: mimetype,
          fileName: filename,
          status: 'sent',
          metadata: {
            timestamp: Date.now() / 1000
          }
        };

        // Асинхронно сохраняем сообщение
        instanceService.saveMessage(instanceId, messageDataForDb)
          .then(() => {
            logger.debug(`Sent media message saved to database for instance ${instanceId}`);
          })
          .catch(error => {
            logger.error(`Error saving sent media message for instance ${instanceId}`, {
              error: error.message
            });
          });
      } catch (error) {
        logger.error(`Error in database integration for sent media message in instance ${instanceId}`, {
          error: error.message
        });
      }

      // Отправляем уведомление через вебхук
      await this.sendWebhook(instanceId, {
        event: 'message_sent',
        data: {
          messageId: result.key.id,
          to: chatId,
          body: caption || '',
          type: messageType,
          hasMedia: true,
          mediaUrl: url,
          timestamp: Date.now() / 1000
        }
      });

      return { id: result.key.id };
    } catch (error) {
      logger.error(`Error sending media for instance ${instanceId}`, {
        to,
        url,
        error: error.message,
        stack: error.stack
      });

      throw error;
    }
  }

  /**
   * Отправить медиа из файла
   * @param {string} instanceId - ID инстанса
   * @param {string} to - Номер получателя
   * @param {string} filePath - Путь к файлу
   * @param {string} caption - Подпись к медиафайлу
   * @returns {Promise<object>} Результат отправки
   */
  async sendMediaFromPath(instanceId, to, filePath, caption = '') {
    const instanceObj = this.instances.get(instanceId);
    if (!instanceObj || instanceObj.status !== 'connected') {
      throw new Error(`Instance ${instanceId} not ready`);
    }

    try {
      // Форматируем номер получателя
      const chatId = this.formatNumber(to);

      // Проверяем существование файла
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      // Читаем файл
      const buffer = fs.readFileSync(filePath);
      const mimetype = this.getMimeType(filePath);
      const filename = path.basename(filePath);

      // Определяем тип файла
      const isImage = mimetype.startsWith('image');
      const isVideo = mimetype.startsWith('video');
      const isDocument = !isImage && !isVideo;

      let messageData;
      let messageType;

      if (isImage) {
        messageData = {
          image: buffer,
          caption: caption || ''
        };
        messageType = 'image';
      } else if (isVideo) {
        messageData = {
          video: buffer,
          caption: caption || ''
        };
        messageType = 'video';
      } else {
        messageData = {
          document: buffer,
          fileName: filename,
          caption: caption || '',
          mimetype
        };
        messageType = 'document';
      }

      // Отправляем медиафайл
      const result = await instanceObj.socket.sendMessage(chatId, messageData);

      logger.debug(`Media sent from path for instance ${instanceId}`, {
        to: chatId,
        messageId: result.key.id,
        type: messageType,
        filename
      });

      // Сохраняем сообщение в базе данных
      try {
        // Импортируем сервис инстансов
        const instanceService = require('./instance.service');

        // Подготавливаем данные сообщения
        const messageDataForDb = {
          remoteJid: chatId,
          fromMe: true,
          messageType,
          content: caption || '',
          messageId: result.key.id,
          hasMedia: true,
          mediaUrl: null,
          caption,
          mimeType: mimetype,
          fileName: filename,
          status: 'sent',
          metadata: {
            timestamp: Date.now() / 1000,
            localFilePath: filePath
          }
        };

        // Сохраняем сообщение
        await instanceService.saveMessage(instanceId, messageDataForDb);

        // Обновляем статистику
        await instanceService.updateMessageStats(instanceId, { sent: 1, received: 0 });
      } catch (error) {
        logger.error(`Error saving sent media message for instance ${instanceId}`, {
          error: error.message,
          messageId: result.key.id
        });
      }

      // Отправляем уведомление через вебхук
      await this.sendWebhook(instanceId, {
        event: 'message_sent',
        data: {
          messageId: result.key.id,
          to: chatId,
          body: caption || '',
          type: messageType,
          hasMedia: true,
          filename,
          timestamp: Date.now() / 1000
        }
      });

      return { id: result.key.id };
    } catch (error) {
      logger.error(`Error sending media from path for instance ${instanceId}`, {
        to,
        filePath,
        error: error.message,
        stack: error.stack
      });

      throw error;
    }
  }

  /**
   * Получить список контактов
   * @param {string} instanceId - ID инстанса
   * @returns {Promise<array>} Список контактов
   */
  async getContacts(instanceId) {
    const instanceObj = this.instances.get(instanceId);
    if (!instanceObj || instanceObj.status !== 'connected') {
      throw new Error(`Instance ${instanceId} not ready`);
    }

    try {
      // Проверяем наличие contacts и его тип
      const contacts = instanceObj.socket.contacts
        ? Object.values(instanceObj.socket.contacts).filter(c => c && c.id && c.id.endsWith('@s.whatsapp.net'))
        : [];

      // Форматируем контакты
      const contactsList = contacts.map(contact => ({
        id: contact.id,
        name: contact.name || contact.notify || contact.verifiedName || '',
        number: contact.id.split('@')[0],
        isGroup: false
      }));

      // Получаем группы
      let groups = [];
      try {
        if (instanceObj.socket.groupMetadata) {
          const groupsMap = instanceObj.socket.groupMetadata;
          groups = Object.values(groupsMap)
            .filter(group => group && group.id)
            .map(group => ({
              id: group.id,
              name: group.subject || '',
              number: group.id.split('@')[0],
              isGroup: true
            }));
        }
      } catch (error) {
        logger.warn(`Error getting groups for instance ${instanceId}`, {
          error: error.message
        });
      }

      const result = [...contactsList, ...groups];

      // Если контактов нет, возвращаем пустой массив
      return result.length > 0
        ? { contacts: result }
        : { contacts: [] };
    } catch (error) {
      logger.error(`Error getting contacts for instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });

      // Возвращаем пустой массив контактов вместо выброса ошибки
      return { contacts: [] };
    }
  }

  /**
 * Отправить медиа из файла
 * @param {string} instanceId - ID инстанса
 * @param {string} phone - Номер телефона
 * @param {string} name - Имя
 * @returns {Promise<object>} Результат отправки
 */

  async addContact(instanceId, phone, name = '') {
    const instanceObj = this.instances.get(instanceId);
    if (!instanceObj || instanceObj.status !== 'connected') {
      throw new Error(`Instance ${instanceId} not ready`);
    }

    try {
      // Форматируем номер для WhatsApp
      const formattedPhone = this.formatNumber(phone);

      // Добавление контакта через Baileys
      const result = await instanceObj.socket.sendMessage(formattedPhone, {
        text: `Привет! Этот контакт был добавлен через WhatsApp API.`
      });

      // Логируем действие
      logger.info(`Contact added for instance ${instanceId}`, { phone, name });

      return {
        success: true,
        message: 'Контакт успешно добавлен',
        contact: {
          id: formattedPhone,
          number: phone,
          name
        }
      };
    } catch (error) {
      logger.error(`Error adding contact for instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  /**
   * Проверка и обновление авторизации
   * @param {string} instanceId - ID инстанса
   * @returns {Promise<array>} Список контактов
   */
  async checkAuthExpiration() {
    try {
      // Получаем инстансы с истекающей авторизацией
      // (менее 3 дней до истечения, но еще активные)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 3);

      const expiringInstances = await prisma.instance.findMany({
        where: {
          status: 'connected',
          authExpiresAt: {
            lt: expirationDate,
            gt: new Date()
          }
        }
      });

      logger.info(`Found ${expiringInstances.length} instances with expiring auth`);

      for (const instance of expiringInstances) {
        try {
          // Проверяем, можно ли обновить авторизацию без QR
          const instanceObj = this.instances.get(instance.id);
          if (!instanceObj || !instanceObj.socket) continue;

          logger.info(`Attempting to refresh auth for instance ${instance.id}`);

          // Отправляем запрос на обновление авторизации
          // Метод зависит от используемой библиотеки WhatsApp
          const refreshResult = await instanceObj.socket.refreshQR();

          // Логируем результат
          await prisma.activityLog.create({
            data: {
              instanceId: instance.id,
              action: 'auth_refresh_attempt',
              details: {
                success: !!refreshResult,
                currentExpiry: instance.authExpiresAt
              }
            }
          });
        } catch (error) {
          logger.error(`Error refreshing auth for instance ${instance.id}`, {
            error: error.message
          });
        }
      }

      // Находим инстансы с уже истекшей авторизацией
      const expiredInstances = await prisma.instance.findMany({
        where: {
          status: 'connected',
          authExpiresAt: {
            lt: new Date()
          }
        }
      });

      for (const instance of expiredInstances) {
        logger.warn(`Instance ${instance.id} has expired authorization, disconnecting`);

        // Отключаем инстанс с истекшей авторизацией
        await this.stopInstance(instance.id);

        // Обновляем статус в базе данных
        await prisma.instance.update({
          where: { id: instance.id },
          data: {
            status: 'auth_expired',
            qrCode: null
          }
        });

        // Регистрируем активность
        await prisma.activityLog.create({
          data: {
            instanceId: instance.id,
            action: 'auth_expired',
            details: {
              expiredAt: instance.authExpiresAt
            }
          }
        });
      }
    } catch (error) {
      logger.error('Error checking auth expiration', {
        error: error.message,
        stack: error.stack
      });
    }
  }

  /**
   * Проверка состояния Instance
   * @param {string} instanceId - ID инстанса
   * @returns {Promise<array>} Список контактов
   */
  async checkSocketAlive(instanceId) {
    const instanceObj = this.instances.get(instanceId);
    if (!instanceObj || !instanceObj.socket) {
      return { alive: false, reason: 'no_socket' };
    }

    try {
      // Проверяем, что сокет подключен
      const connectionState = instanceObj.status === 'connected';

      // Проверка на ping/pong (более безопасный метод)
      let pingResult = false;
      try {
        const pingStartTime = Date.now();
        // Используем более базовое действие, которое должно быть доступно
        if (instanceObj.socket.sendPresenceUpdate) {
          await Promise.race([
            instanceObj.socket.sendPresenceUpdate('available'),
            new Promise(resolve => setTimeout(() => resolve(false), 5000))
          ]);
          pingResult = true;
        }
        const pingTime = Date.now() - pingStartTime;

        return {
          alive: connectionState && pingResult,
          state: instanceObj.status,
          latency: pingTime,
          lastActivity: instanceObj.lastActivity
        };
      } catch (pingError) {
        logger.warn(`Ping failed for instance ${instanceId}`, {
          error: pingError.message
        });
        return { alive: false, reason: 'ping_failed', error: pingError.message };
      }
    } catch (error) {
      logger.error(`Error checking socket state for instance ${instanceId}`, {
        error: error.message
      });
      return { alive: false, reason: 'error', error: error.message };
    }
  }

  /**
   * Проверка состояния всех Instance
   * @returns {Promise<array>} Список контактов
   */
  async checkAllSockets() {
    const results = {};
    const instanceIds = Array.from(this.instances.keys());

    logger.info(`Checking socket status for ${instanceIds.length} instances`);

    for (const instanceId of instanceIds) {
      try {
        results[instanceId] = await this.checkSocketAlive(instanceId);

        // Если соединение неактивно, но статус активен - исправляем
        if (!results[instanceId].alive && this.instances.get(instanceId).status === 'connected') {
          logger.warn(`Instance ${instanceId} has dead socket but active status, reconnecting`);
          await this.reconnectInstance(instanceId);
        }
      } catch (error) {
        results[instanceId] = { alive: false, error: error.message };
      }
    }

    return results;
  }

  /**
   * Форматировать номер телефона
   * @param {string} number - Номер телефона
   * @returns {string} Отформатированный номер
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

  /**
   * Получить MIME-тип по расширению файла
   * @param {string} filePath - Путь к файлу
   * @returns {string} MIME-тип
   */
  getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.mp4': 'video/mp4',
      '.mkv': 'video/x-matroska',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.ppt': 'application/vnd.ms-powerpoint',
      '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      '.mp3': 'audio/mpeg',
      '.ogg': 'audio/ogg',
      '.txt': 'text/plain'
    };

    return mimeTypes[ext] || 'application/octet-stream';
  }
}

// Создаем синглтон
const whatsAppManager = new WhatsAppManager();

module.exports = whatsAppManager;