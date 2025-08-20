const logger = require('../utils/logger');
const path = require('path');
const fs = require('fs');
const whatsappManager = require('./whatsapp-manager.service');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const dbConnector = require('../utils/db-connector');

class InstanceService {
  constructor() {
    this.instancesBasePath = path.join(__dirname, '../../instances');

    // Создаем базовую директорию для инстансов, если её нет
    if (!fs.existsSync(this.instancesBasePath)) {
      fs.mkdirSync(this.instancesBasePath, { recursive: true });
    }
  }

  /**
   * Получить базовый путь к данным инстанса
   * @param {string} instanceId - ID инстанса
   * @returns {string} Путь к директории инстанса
   */
  getInstancePath(instanceId) {
    return path.join(this.instancesBasePath, instanceId);
  }

  /**
   * Создать новый инстанс для пользователя
   * @param {string} userId - ID пользователя
   * @param {object} data - Данные для создания инстанса
   * @returns {Promise<object>} Созданный инстанс
   */
  async createInstance(userId, data) {
    try {
      const prisma = dbConnector.getClient();
      logger.info(`Creating new instance for user ${userId}`, { data });

      // Обработка JSON данных для SQLite
      const createData = {
        name: data.name,
        description: data.description,
        userId: userId,
        webhookUrl: data.webhookUrl,
        webhookEnabled: !!data.webhookUrl
      };

      const instance = await prisma.instance.create({
        data: createData
      });

      // Создаем директорию для данных инстанса
      const instancePath = this.getInstancePath(instance.id);
      if (!fs.existsSync(instancePath)) {
        fs.mkdirSync(instancePath, { recursive: true });
      }

      // Создаем настройки вебхука, если URL предоставлен
      if (data.webhookUrl) {
        // Для SQLite нужно обрабатывать JSON
        const webhookData = {
          instanceId: instance.id,
          notifyReceived: data.notifyReceived !== false,
          notifySent: data.notifySent !== false,
          notifyDelivery: data.notifyDelivery === true,
          notifyRead: data.notifyRead === true,
          maxRetries: data.maxRetries || 3,
          retryInterval: data.retryInterval || 60000,
          secret: data.webhookSecret || uuidv4()
        };

        if (data.headers && dbConnector.activeProvider === 'sqlite') {
          webhookData.headers = JSON.stringify(data.headers);
        } else if (data.headers) {
          webhookData.headers = data.headers;
        }

        await prisma.webhookSettings.create({
          data: webhookData
        });
      }

      // Регистрируем активность
      const activityDetails = { name: data.name };

      await prisma.activityLog.create({
        data: {
          instanceId: instance.id,
          action: 'instance_created',
          details: dbConnector.activeProvider === 'sqlite'
            ? JSON.stringify(activityDetails)
            : activityDetails
        }
      });

      // Запускаем инстанс
      whatsappManager.initInstance(instance.id);

      return instance;
    } catch (error) {
      logger.error('Error creating instance', {
        userId,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  /**
   * Обновить данные инстанса
   * @param {string} instanceId - ID инстанса
   * @param {object} data - Данные для обновления
   * @returns {Promise<object>} Обновленный инстанс
   */
  async updateInstance(instanceId, data) {
    try {
      const prisma = dbConnector.getClient();
      logger.info(`Updating instance ${instanceId}`, { data });

      // Проверяем существование инстанса
      const existingInstance = await prisma.instance.findUnique({
        where: { id: instanceId }
      });

      if (!existingInstance) {
        throw new Error(`Instance ${instanceId} not found`);
      }

      // Обновляем инстанс
      const instance = await prisma.instance.update({
        where: { id: instanceId },
        data: {
          name: data.name,
          description: data.description,
          webhookUrl: data.webhookUrl,
          webhookEnabled: data.webhookEnabled
        }
      });

      // Обновляем настройки вебхука
      if (data.webhookSettings) {
        const webhookData = {
          notifyReceived: data.webhookSettings.notifyReceived,
          notifySent: data.webhookSettings.notifySent,
          notifyDelivery: data.webhookSettings.notifyDelivery,
          notifyRead: data.webhookSettings.notifyRead,
          maxRetries: data.webhookSettings.maxRetries,
          retryInterval: data.webhookSettings.retryInterval
        };

        // Если есть секретный ключ и он не пустой, обновляем его
        if (data.webhookSettings.secret) {
          webhookData.secret = data.webhookSettings.secret;
        }

        // Если есть заголовки, обрабатываем в зависимости от базы данных
        if (data.webhookSettings.headers) {
          webhookData.headers = dbConnector.activeProvider === 'sqlite'
            ? JSON.stringify(data.webhookSettings.headers)
            : data.webhookSettings.headers;
        }

        // Проверяем существование настроек вебхука
        const existingSettings = await prisma.webhookSettings.findUnique({
          where: { instanceId }
        });

        if (existingSettings) {
          // Обновляем существующие настройки
          await prisma.webhookSettings.update({
            where: { instanceId },
            data: webhookData
          });
        } else {
          // Создаем новые настройки
          webhookData.instanceId = instanceId;
          if (!webhookData.secret) {
            webhookData.secret = uuidv4();
          }

          await prisma.webhookSettings.create({
            data: webhookData
          });
        }
      }

      // Регистрируем активность
      const activityDetails = { name: data.name };

      await prisma.activityLog.create({
        data: {
          instanceId,
          action: 'instance_updated',
          details: dbConnector.activeProvider === 'sqlite'
            ? JSON.stringify(activityDetails)
            : activityDetails
        }
      });

      // Если изменились настройки вебхука, обновляем их в менеджере
      if (data.webhookUrl !== undefined || data.webhookEnabled !== undefined || data.webhookSettings) {
        whatsappManager.updateInstanceWebhook(instanceId);
      }

      return instance;
    } catch (error) {
      logger.error(`Error updating instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  /**
   * Удалить инстанс
   * @param {string} instanceId - ID инстанса
   * @returns {Promise<object>} Результат операции
   */
  async deleteInstance(instanceId) {
    try {
      const prisma = dbConnector.getClient();
      logger.info(`Deleting instance ${instanceId}`);

      // Сначала останавливаем клиент WhatsApp
      await whatsappManager.stopInstance(instanceId);

      // Удаляем инстанс из базы данных
      // Связанные записи (webhookSettings, messages, activityLogs) 
      // будут удалены каскадно благодаря настройкам в Prisma
      await prisma.instance.delete({
        where: { id: instanceId }
      });

      // Удаляем директорию с данными инстанса
      const instancePath = this.getInstancePath(instanceId);
      if (fs.existsSync(instancePath)) {
        fs.rmSync(instancePath, { recursive: true, force: true });
      }

      return { success: true, message: `Instance ${instanceId} deleted successfully` };
    } catch (error) {
      logger.error(`Error deleting instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  /**
   * Получить инстанс по ID
   * @param {string} instanceId - ID инстанса
   * @returns {Promise<object>} Инстанс
   */
  async getInstance(instanceId) {
    try {
      const prisma = dbConnector.getClient();
      const instance = await prisma.instance.findUnique({
        where: { id: instanceId },
        include: {
          webhookSettings: true
        }
      });

      if (!instance) {
        throw new Error(`Instance ${instanceId} not found`);
      }

      // Если SQLite и есть данные JSON, преобразуем их
      if (dbConnector.activeProvider === 'sqlite' && instance.webhookSettings?.headers) {
        try {
          instance.webhookSettings.headers = JSON.parse(instance.webhookSettings.headers);
        } catch (e) {
          logger.warn(`Failed to parse webhook headers JSON for instance ${instanceId}`);
          instance.webhookSettings.headers = {};
        }
      }

      // Добавляем информацию о статусе соединения от менеджера
      const connectionStatus = whatsappManager.getInstanceStatus(instanceId);

      return {
        ...instance,
        connectionStatus
      };
    } catch (error) {
      logger.error(`Error getting instance ${instanceId}`, {
        error: error.message
      });
      throw error;
    }
  }

  /**
 * Получить статус инстанса
 * @param {string} instanceId - ID инстанса
 * @returns {Promise<object>} Статус инстанса
 */
  async getInstanceStatus(instanceId) {
    try {
      const prisma = dbConnector.getClient();

      // Проверяем существование инстанса
      const instance = await prisma.instance.findUnique({
        where: { id: instanceId }
      });

      if (!instance) {
        throw new Error(`Instance ${instanceId} not found`);
      }

      // Получаем статус из WhatsApp Manager
      const connectionStatus = whatsappManager.getInstanceStatus(instanceId);

      // Объединяем информацию из базы данных и WhatsApp Manager
      return {
        instanceId,
        status: instance.status,
        ready: connectionStatus.ready,
        hasQr: connectionStatus.hasQr,
        lastActivity: instance.lastActivity,
        connectionDetails: connectionStatus
      };
    } catch (error) {
      logger.error(`Error getting status for instance ${instanceId}`, {
        error: error.message
      });
      throw error;
    }
  }

  /**
   * Получить все инстансы пользователя
   * @param {string} userId - ID пользователя
   * @returns {Promise<array>} Массив инстансов
   */
  async getUserInstances(userId) {
    try {
      const prisma = dbConnector.getClient();
      const instances = await prisma.instance.findMany({
        where: { userId },
        include: {
          webhookSettings: true
        }
      });

      // Преобразуем JSON данные для SQLite
      if (dbConnector.activeProvider === 'sqlite') {
        for (const instance of instances) {
          if (instance.webhookSettings?.headers) {
            try {
              instance.webhookSettings.headers = JSON.parse(instance.webhookSettings.headers);
            } catch (e) {
              logger.warn(`Failed to parse webhook headers JSON for instance ${instance.id}`);
              instance.webhookSettings.headers = {};
            }
          }
        }
      }

      // Добавляем информацию о статусе соединения от менеджера для каждого инстанса
      return instances.map(instance => ({
        ...instance,
        connectionStatus: whatsappManager.getInstanceStatus(instance.id)
      }));
    } catch (error) {
      logger.error(`Error getting instances for user ${userId}`, {
        error: error.message
      });
      throw error;
    }
  }

  /**
 * Получить QR-код для инстанса с повторной попыткой при ошибках
 * @param {string} instanceId - ID инстанса
 * @returns {Promise<object>} QR-код
 */
  async getInstanceQrCode(instanceId) {
    try {
      const prisma = dbConnector.getClient();
      // Проверяем существование инстанса
      const instance = await prisma.instance.findUnique({
        where: { id: instanceId }
      });

      if (!instance) {
        throw new Error(`Instance ${instanceId} not found`);
      }

      // Если статус "logged_out", сначала сбрасываем его на "disconnected"
      if (instance.status === 'logged_out') {
        logger.info(`Resetting instance status from logged_out to disconnected for ${instanceId}`);
        await prisma.instance.update({
          where: { id: instanceId },
          data: {
            status: 'disconnected',
            qrCode: null
          }
        });
      }

      // Получаем QR-код от менеджера
      let qrCode = whatsappManager.getInstanceQrCode(instanceId);

      // Если QR-кода нет, пробуем инициализировать инстанс
      if (!qrCode) {
        logger.info(`QR code not available for instance ${instanceId}, attempting to initialize instance`);

        // Инициализируем инстанс для генерации QR-кода
        await whatsappManager.initInstance(instanceId);

        // Ждем 5 секунд, чтобы QR-код сгенерировался
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Пробуем получить QR-код снова
        qrCode = whatsappManager.getInstanceQrCode(instanceId);

        // Если QR все еще не получен, делаем вторую попытку через еще 5 секунд
        if (!qrCode) {
          logger.info(`QR code still not available after first attempt, waiting more for ${instanceId}`);
          await new Promise(resolve => setTimeout(resolve, 5000));
          qrCode = whatsappManager.getInstanceQrCode(instanceId);
        }

        // Если QR-код все еще не доступен, возвращаем статус генерации
        if (!qrCode) {
          logger.warn(`Failed to generate QR code for instance ${instanceId} after initialization`);

          // Обновляем статус в базе данных, чтобы форсировать новую попытку
          const currentStatus = await prisma.instance.findUnique({
            where: { id: instanceId },
            select: { status: true }
          });

          // Если статус "error" или "logged_out", меняем его на "disconnected"
          if (currentStatus && (currentStatus.status === 'error' || currentStatus.status === 'logged_out')) {
            await prisma.instance.update({
              where: { id: instanceId },
              data: {
                status: 'disconnected',
                qrCode: null
              }
            });
          }

          return {
            message: "QR code generation in progress. Please try again in a few seconds.",
            status: "generating"
          };
        }
      }

      return { qrCode };
    } catch (error) {
      logger.error(`Error getting QR code for instance ${instanceId}`, {
        error: error.message
      });
      throw error;
    }
  }

  /**
   * Переподключить инстанс (перезапустить клиент WhatsApp)
   * @param {string} instanceId - ID инстанса
   * @returns {Promise<object>} Результат операции
   */
  async reconnectInstance(instanceId) {
    try {
      const prisma = dbConnector.getClient();
      logger.info(`Reconnecting instance ${instanceId}`);

      // Проверяем существование инстанса
      const instance = await prisma.instance.findUnique({
        where: { id: instanceId }
      });

      if (!instance) {
        throw new Error(`Instance ${instanceId} not found`);
      }

      // Останавливаем и перезапускаем клиент
      await whatsappManager.stopInstance(instanceId);
      await whatsappManager.initInstance(instanceId);

      // Регистрируем активность
      await prisma.activityLog.create({
        data: {
          instanceId,
          action: 'instance_reconnected',
          // Для SQLite преобразуем детали в JSON строку если необходимо
          details: dbConnector.activeProvider === 'sqlite' ? '{}' : {}
        }
      });

      return { success: true, message: `Instance ${instanceId} reconnected` };
    } catch (error) {
      logger.error(`Error reconnecting instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  /**
   * Выход из WhatsApp
   * @param {string} instanceId - ID инстанса
   * @returns {Promise<object>} Результат операции
   */
  async logoutInstance(instanceId) {
    try {
      const prisma = dbConnector.getClient();
      logger.info(`Logging out instance ${instanceId}`);

      // Проверяем существование инстанса
      const instance = await prisma.instance.findUnique({
        where: { id: instanceId }
      });

      if (!instance) {
        throw new Error(`Instance ${instanceId} not found`);
      }

      // Выполняем выход
      await whatsappManager.logoutInstance(instanceId);

      // Регистрируем активность
      await prisma.activityLog.create({
        data: {
          instanceId,
          action: 'instance_logout',
          // Для SQLite преобразуем детали в JSON строку если необходимо
          details: dbConnector.activeProvider === 'sqlite' ? '{}' : {}
        }
      });

      return { success: true, message: `Instance ${instanceId} logged out` };
    } catch (error) {
      logger.error(`Error logging out instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  /**
   * Получить лог активности инстанса
   * @param {string} instanceId - ID инстанса
   * @param {object} options - Опции для пагинации и фильтрации
   * @returns {Promise<array>} Массив записей лога
   */
  async getInstanceActivityLog(instanceId, options = {}) {
    try {
      const prisma = dbConnector.getClient();
      const { limit = 100, skip = 0, actions = [], startDate, endDate } = options;

      // Формируем фильтры
      const where = { instanceId };

      if (actions && actions.length > 0) {
        where.action = { in: actions };
      }

      if (startDate || endDate) {
        where.createdAt = {};

        if (startDate) {
          where.createdAt.gte = new Date(startDate);
        }

        if (endDate) {
          where.createdAt.lte = new Date(endDate);
        }
      }

      // Получаем логи с пагинацией
      const logs = await prisma.activityLog.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        },
        take: limit,
        skip
      });

      // Если SQLite, конвертируем JSON
      if (dbConnector.activeProvider === 'sqlite') {
        for (const log of logs) {
          if (log.details) {
            try {
              log.details = JSON.parse(log.details);
            } catch (e) {
              logger.warn(`Failed to parse log details JSON for log ${log.id}`);
              log.details = {};
            }
          }
        }
      }

      // Получаем общее количество записей
      const total = await prisma.activityLog.count({ where });

      return {
        logs,
        pagination: {
          total,
          limit,
          skip,
          hasMore: skip + limit < total
        }
      };
    } catch (error) {
      logger.error(`Error getting activity log for instance ${instanceId}`, {
        error: error.message
      });
      throw error;
    }
  }

  /**
   * Обновить статистику по сообщениям инстанса
   * @param {string} instanceId - ID инстанса
   * @param {object} stats - Статистика (sent, received)
   */
  async updateMessageStats(instanceId, { sent = 0, received = 0 }) {
    try {
      const prisma = dbConnector.getClient();

      // Импортируем usageMonitor здесь для избежания циклических зависимостей
      const usageMonitor = require('./usage-monitor.service');

      if (sent > 0) {
        // Трекинг отправленных сообщений
        usageMonitor.trackMetric(instanceId, 'messagesSent', sent);

        logger.debug(`Tracked messagesSent for instance ${instanceId}: +${sent}`);
      }

      if (received > 0) {
        // Трекинг полученных сообщений
        usageMonitor.trackMetric(instanceId, 'messagesReceived', received);

        logger.debug(`Tracked messagesReceived for instance ${instanceId}: +${received}`);
      }

      if (sent > 0 || received > 0) {
        await prisma.instance.update({
          where: { id: instanceId },
          data: {
            sentMessages: { increment: sent },
            receivedMessages: { increment: received },
            lastActivity: new Date()
          }
        });
      }
    } catch (error) {
      logger.error(`Error updating message stats for instance ${instanceId}`, {
        error: error.message
      });
    }
  }

  /**
 * Сохранить сообщение в базе данных (для добавления в instanceService.js)
 * @param {string} instanceId - ID инстанса
 * @param {object} messageData - Данные сообщения
 * @returns {Promise<object>} Сохраненное сообщение
 */
  async saveMessage(instanceId, messageData) {
    try {
      const prisma = dbConnector.getClient();

      // Подготавливаем метаданные в зависимости от типа базы данных
      const metadata = messageData.metadata || {};
      const preparedMetadata = dbConnector.activeProvider === 'sqlite'
        ? JSON.stringify(metadata)
        : metadata;

      // Создаем сообщение
      const message = await prisma.message.create({
        data: {
          instanceId,
          remoteJid: messageData.remoteJid,
          fromMe: messageData.fromMe,
          messageType: messageData.messageType,
          content: messageData.content || '',
          messageId: messageData.messageId,
          hasMedia: messageData.hasMedia || false,
          mediaUrl: messageData.mediaUrl,
          caption: messageData.caption,
          mimeType: messageData.mimeType,
          fileName: messageData.fileName,
          status: messageData.status || 'sent',
          metadata: preparedMetadata
        }
      });

      // Обновляем статистику
      await this.updateMessageStats(instanceId, {
        sent: messageData.fromMe ? 1 : 0,
        received: !messageData.fromMe ? 1 : 0
      });

      return message;
    } catch (error) {
      logger.error(`Error saving message for instance ${instanceId}`, {
        error: error.message,
        messageData
      });
      // Возвращаем null вместо выброса ошибки, чтобы не прерывать основной процесс
      return null;
    }
  }

  /**
   * Обновить статус сообщения
   * @param {string} instanceId - ID инстанса
   * @param {string} messageId - ID сообщения
   * @param {string} status - Новый статус
   * @returns {Promise<object>} Обновленное сообщение
   */
  async updateMessageStatus(instanceId, messageId, status) {
    try {
      const prisma = dbConnector.getClient();

      // Преобразование числового статуса в строковый
      let statusText;
      if (typeof status === 'number') {
        switch (status) {
          case 1:
            statusText = 'pending';
            break;
          case 2:
            statusText = 'server_ack';
            break;
          case 3:
            statusText = 'delivered';
            break;
          case 4:
            statusText = 'read';
            break;
          default:
            statusText = 'sent';
        }
      } else {
        statusText = status; // Если уже строка, оставляем как есть
      }

      return await prisma.message.updateMany({
        where: {
          instanceId,
          messageId
        },
        data: {
          status: statusText,
          statusUpdatedAt: new Date()
        }
      });
    } catch (error) {
      logger.error(`Error updating message status for instance ${instanceId}`, {
        error: error.message,
        messageId,
        status
      });
      throw error;
    }
  }

  /**
   * Получить историю сообщений
   * @param {string} instanceId - ID инстанса
   * @param {string} chatId - ID чата (номер телефона)
   * @param {object} options - Опции для пагинации
   * @returns {Promise<array>} Массив сообщений
   */
  async getChatHistory(instanceId, chatId, options = {}) {
    try {
      const prisma = dbConnector.getClient();
      const { limit = 50, skip = 0, startDate, endDate } = options;

      // Форматируем номер получателя
      const formattedChatId = chatId.includes('@') ? chatId : `${chatId}@s.whatsapp.net`;

      // Формируем фильтры
      const where = {
        instanceId,
        remoteJid: formattedChatId
      };

      if (startDate || endDate) {
        where.createdAt = {};

        if (startDate) {
          where.createdAt.gte = new Date(startDate);
        }

        if (endDate) {
          where.createdAt.lte = new Date(endDate);
        }
      }

      // Получаем сообщения с пагинацией
      const messages = await prisma.message.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        },
        take: limit,
        skip
      });

      // Если SQLite, конвертируем JSON
      if (dbConnector.activeProvider === 'sqlite') {
        for (const message of messages) {
          if (message.metadata) {
            try {
              message.metadata = JSON.parse(message.metadata);
            } catch (e) {
              logger.warn(`Failed to parse message metadata JSON for message ${message.id}`);
              message.metadata = {};
            }
          }
        }
      }

      // Получаем общее количество сообщений
      const total = await prisma.message.count({ where });

      return {
        messages,
        pagination: {
          total,
          limit,
          skip,
          hasMore: skip + limit < total
        }
      };
    } catch (error) {
      logger.error(`Error getting chat history for instance ${instanceId}`, {
        error: error.message,
        chatId
      });
      throw error;
    }
  }

  /**
   * Записать в лог результат отправки вебхука
   * @param {string} instanceId - ID инстанса
   * @param {object} data - Данные результата
   */
  async logWebhookResult(instanceId, data) {
    try {
      const prisma = dbConnector.getClient();

      // Подготовка payload и response для SQLite
      const payload = data.payload || {};
      const response = data.response || null;

      const preparedPayload = dbConnector.activeProvider === 'sqlite'
        ? JSON.stringify(payload)
        : payload;

      const preparedResponse = response && dbConnector.activeProvider === 'sqlite'
        ? JSON.stringify(response)
        : response;

      await prisma.webhookLog.create({
        data: {
          instanceId,
          webhookUrl: data.webhookUrl,
          payload: preparedPayload,
          response: preparedResponse,
          statusCode: data.statusCode,
          success: data.success,
          attempt: data.attempt || 1,
          errorMessage: data.errorMessage
        }
      });
    } catch (error) {
      logger.error(`Error logging webhook result for instance ${instanceId}`, {
        error: error.message
      });
    }
  }
}

module.exports = new InstanceService();