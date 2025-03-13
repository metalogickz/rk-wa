const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const axios = require('axios');
const crypto = require('crypto');
const qrcode = require('qrcode-terminal');
const usageMonitor = require('./usage-monitor.service');

const prisma = new PrismaClient();

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
   */
  async initInstance(instanceId) {
    try {
      // Добавляем проверку существующих инстансов с тем же ID
      const existingInstances = Array.from(this.instances.entries())
        .filter(([id]) => id === instanceId);

      if (existingInstances.length > 0) {
        logger.warn(`DIAGNOSTIC: Found ${existingInstances.length} existing instances with ID ${instanceId}. Removing...`);

        for (const [id, instanceObj] of existingInstances) {
          try {
            if (instanceObj.socket) {
              await instanceObj.socket.logout();
            }
            this.instances.delete(id);
          } catch (error) {
            logger.error(`Error removing existing instance ${id}`, {
              error: error.message
            });
          }
        }
      }

      // Проверяем, не инициализирован ли уже этот инстанс
      if (this.instances.has(instanceId)) {
        logger.warn(`DIAGNOSTIC: Instance ${instanceId} already exists in memory. Stopping existing instance.`);

        // Останавливаем существующий инстанс
        const existingInstance = this.instances.get(instanceId);
        if (existingInstance && existingInstance.socket) {
          await existingInstance.socket.logout();
          this.instances.delete(instanceId);
        }
      }

      // Получаем инстанс из базы данных
      const instance = await prisma.instance.findUnique({
        where: { id: instanceId },
        include: { webhookSettings: true }
      });

      if (!instance) {
        throw new Error(`DIAGNOSTIC: Instance ${instanceId} not found in database`);
      }

      logger.info(`DIAGNOSTIC: Initializing instance ${instanceId} with current status: ${instance.status}`);

      // Создаем директорию для данных инстанса
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
        printQRInTerminal: false,
        logger: baileysLogger,
        browser: ['AeroBook WhatsApp', 'Chrome', '10.0.0'],
        syncFullHistory: false,
        markOnlineOnConnect: false,
        transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 },
        getMessage: async () => { return { conversation: 'hello' } }
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
        retryTimers: new Map()
      };

      // Добавляем инстанс в карту
      this.instances.set(instanceId, instanceObj);

      // Настраиваем обработчики событий
      this.setupEventHandlers(instanceId, sock, saveCreds);

      // Обновляем статус в базе данных
      await prisma.instance.update({
        where: { id: instanceId },
        data: {
          status: 'connecting',
          qrCode: null  // Очищаем QR-код при инициализации
        }
      });

      logger.info(`DIAGNOSTIC: WhatsApp instance ${instanceId} initialized successfully`);

      return instanceObj;
    } catch (error) {
      logger.error(`DIAGNOSTIC: Error initializing WhatsApp instance ${instanceId}`, {
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
        logger.error('DIAGNOSTIC: Error updating instance status', {
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
        qrGenerationCount++;

        logger.warn(`DIAGNOSTIC: QR Code generation attempt #${qrGenerationCount} for instance ${instanceId}`, {
          currentStatus: instanceObj.status,
          qrLength: qr.length
        });

        // Ограничиваем количество генераций QR
        if (qrGenerationCount > 1) {
          logger.error(`CRITICAL: Multiple QR generations detected for instance ${instanceId}`);

          // Попытка остановить текущий сокет
          // try {
          //   await sock.logout();
          // } catch (logoutError) {
          //   logger.error(`Error during forced logout`, {
          //     error: logoutError.message
          //   });
          // }

          // // Удаляем инстанс из карты
          // this.instances.delete(instanceId);

          // return;
        }

        instanceObj.qrCode = qr;
        instanceObj.status = 'qr_received';

        qrcode.generate(qr, { small: true });

        try {
          await prisma.instance.update({
            where: { id: instanceId },
            data: {
              status: 'qr_received',
              qrCode: qr
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
        }
        else if (connection === 'open') {
          logger.info(`WhatsApp client connected for instance ${instanceId}`);

          instanceObj.status = 'connected';
          instanceObj.qrCode = null;

          try {
            // Явное сохранение credentials
            const instancePath = this.getInstancePath(instanceId);
            const authPath = path.join(instancePath, 'auth');

            // Создаем директорию, если она не существует
            fs.mkdirSync(authPath, { recursive: true });

            // Путь к файлу credentials
            const credsPath = path.join(authPath, 'creds.json');

            // Сохраняем credentials с явным указанием даты создания
            const credentialsToSave = {
              ...sock.authState.creds,
              creation_timestamp: new Date().toISOString()
            };

            // Безопасная запись с блокировкой
            const writeStream = fs.createWriteStream(credsPath, { flags: 'w' });
            writeStream.write(JSON.stringify(credentialsToSave, null, 2));
            writeStream.end();

            await new Promise((resolve, reject) => {
              writeStream.on('finish', resolve);
              writeStream.on('error', reject);
            });

            logger.info(`Credentials saved for instance ${instanceId}`);

            // Обновляем статус в базе данных
            await prisma.instance.update({
              where: { id: instanceId },
              data: {
                status: 'connected',
                qrCode: null,
                lastActivity: new Date()
              }
            });
          } catch (error) {
            logger.error(`Error saving credentials for instance ${instanceId}`, {
              error: error.message,
              stack: error.stack
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

          // Сохраняем сообщение
          await instanceService.saveMessage(instanceId, messageData);

          // Трекинг метрики
          usageMonitor.trackMetric(instanceId, 'messagesReceived');

          if (media) {
            usageMonitor.trackMetric(instanceId, 'mediaReceived');
            usageMonitor.trackMetric(instanceId, 'mediaSize', media.data.length * 0.75); // приблизительно из base64
          }
        } catch (error) {
          logger.error(`Error saving message for instance ${instanceId}`, {
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

        // Сохраняем сообщение
        await instanceService.saveMessage(instanceId, messageData);

        // Обновляем статистику
        await instanceService.updateMessageStats(instanceId, { sent: 1, received: 0 });
        usageMonitor.trackMetric(instanceId, 'messagesSent');
      } catch (error) {
        logger.error(`Error saving sent message for instance ${instanceId}`, {
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

        // Сохраняем сообщение
        await instanceService.saveMessage(instanceId, messageDataForDb);

        // Обновляем статистику
        await instanceService.updateMessageStats(instanceId, { sent: 1, received: 0 });
        // Трекинг метрики с размером файла
        usageMonitor.trackMetric(instanceId, 'mediaSent');
        usageMonitor.trackMetric(instanceId, 'mediaSize', buffer.length);
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
      // Получаем контакты
      const contacts = Object.values(instanceObj.socket.contacts)
        .filter(c => c.id.endsWith('@s.whatsapp.net'));

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
          groups = Object.values(groupsMap).map(group => ({
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

      return [...contactsList, ...groups];
    } catch (error) {
      logger.error(`Error getting contacts for instance ${instanceId}`, {
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