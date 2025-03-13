const instanceService = require('../services/instance.service');
const logger = require('../utils/logger');

class InstanceController {
  /**
   * Создать новый инстанс
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async createInstance(req, res, next) {
    try {
      // Используем ID пользователя из req.user 
      // (который теперь может быть установлен либо JWT middleware, 
      // либо API-ключ middleware)
      const userId = req.user.id;
      const data = req.body;

      // Остальной код без изменений
      if (!data.name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const instance = await instanceService.createInstance(userId, data);

      res.status(201).json(instance);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Обновить инстанс
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async updateInstance(req, res, next) {
    try {
      const instanceId = req.params.instanceId;
      const data = req.body;

      const instance = await instanceService.updateInstance(instanceId, data);

      res.json(instance);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Удалить инстанс
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async deleteInstance(req, res, next) {
    try {
      const instanceId = req.params.instanceId;

      const result = await instanceService.deleteInstance(instanceId);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получить инстанс по ID
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async getInstance(req, res, next) {
    try {
      const instanceId = req.params.instanceId;

      const instance = await instanceService.getInstance(instanceId);

      res.json(instance);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получить все инстансы пользователя
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async getUserInstances(req, res, next) {
    try {
      // Аналогично используем req.user.id
      const userId = req.user.id;

      const instances = await instanceService.getUserInstances(userId);

      res.json({ instances });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получить QR-код для инстанса
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async getInstanceQrCode(req, res, next) {
    try {
      const instanceId = req.params.instanceId;

      const qrCode = await instanceService.getInstanceQrCode(instanceId);

      res.json(qrCode);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Переподключить инстанс
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async reconnectInstance(req, res, next) {
    try {
      const instanceId = req.params.instanceId;

      const result = await instanceService.reconnectInstance(instanceId);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Выход из WhatsApp
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async logoutInstance(req, res, next) {
    try {
      const instanceId = req.params.instanceId;

      const result = await instanceService.logoutInstance(instanceId);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получить лог активности инстанса
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async getInstanceActivityLog(req, res, next) {
    try {
      const instanceId = req.params.instanceId;

      // Опции пагинации и фильтрации
      const options = {
        limit: parseInt(req.query.limit) || 100,
        skip: parseInt(req.query.skip) || 0,
        actions: req.query.actions ? req.query.actions.split(',') : [],
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };

      const logs = await instanceService.getInstanceActivityLog(instanceId, options);

      res.json(logs);
    } catch (error) {
      next(error);
    }
  }

  /**
 * Получить последние события инстанса (для polling)
 * @param {object} req - Запрос
 * @param {object} res - Ответ
 * @param {function} next - Следующий middleware
 */
  async getLatestEvents(req, res, next) {
    try {
      const instanceId = req.params.instanceId;
      const { since, limit = 20, types = '' } = req.query;

      // Преобразуем строку типов в массив, если она указана
      const eventTypes = types ? types.split(',') : [];

      // Получаем объект для работы с базой данных
      const prisma = dbConnector.getClient();

      // Проверяем существование инстанса
      const instance = await prisma.instance.findUnique({
        where: { id: instanceId }
      });

      if (!instance) {
        return res.status(404).json({ error: `Instance ${instanceId} not found` });
      }

      // Проверяем принадлежит ли инстанс пользователю
      if (instance.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({ error: 'You do not have access to this instance' });
      }

      // Готовим запрос для сообщений
      const messageQuery = {
        where: {
          instanceId,
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: parseInt(limit)
      };

      // Добавляем фильтр по времени, если указан параметр since
      if (since) {
        const sinceDate = new Date(since);
        if (!isNaN(sinceDate.getTime())) {
          messageQuery.where.createdAt = {
            gt: sinceDate
          };
        } else {
          return res.status(400).json({ error: 'Invalid since parameter. Use ISO 8601 format.' });
        }
      }

      // Запрос сообщений из базы данных
      let messages = [];
      if (!eventTypes.length || eventTypes.some(type => ['message_sent', 'message_received', 'message_status'].includes(type))) {
        messages = await prisma.message.findMany(messageQuery);

        // Если SQLite, обрабатываем JSON поля
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
      }

      // Запрос логов активности
      const activityQuery = {
        where: {
          instanceId,
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: parseInt(limit)
      };

      // Добавляем фильтр по времени для логов активности
      if (since) {
        activityQuery.where.createdAt = {
          gt: new Date(since)
        };
      }

      // Запрос активностей из базы данных
      let activities = [];
      if (!eventTypes.length || eventTypes.some(type => !['message_sent', 'message_received', 'message_status'].includes(type))) {
        activities = await prisma.activityLog.findMany(activityQuery);

        // Если SQLite, обрабатываем JSON поля
        if (dbConnector.activeProvider === 'sqlite') {
          for (const activity of activities) {
            if (activity.details) {
              try {
                activity.details = JSON.parse(activity.details);
              } catch (e) {
                logger.warn(`Failed to parse activity details JSON for activity ${activity.id}`);
                activity.details = {};
              }
            }
          }
        }
      }

      // Форматируем данные в события
      const events = [];

      // Добавляем сообщения как события
      for (const message of messages) {
        const eventType = message.fromMe ? 'message_sent' : 'message_received';

        // Пропускаем, если указан конкретный тип события и он не совпадает
        if (eventTypes.length > 0 && !eventTypes.includes(eventType) && !eventTypes.includes('message_status')) {
          continue;
        }

        events.push({
          type: eventType,
          timestamp: message.createdAt,
          data: {
            instanceId,
            messageId: message.messageId,
            remoteJid: message.remoteJid,
            fromMe: message.fromMe,
            body: message.content,
            hasMedia: message.hasMedia,
            mediaUrl: message.mediaUrl,
            caption: message.caption,
            mimeType: message.mimeType,
            fileName: message.fileName,
            status: message.status,
            metadata: message.metadata || {}
          }
        });
      }

      // Добавляем активности как события
      for (const activity of activities) {
        // Пропускаем, если указан конкретный тип события и он не совпадает
        if (eventTypes.length > 0 && !eventTypes.includes(activity.action)) {
          continue;
        }

        events.push({
          type: activity.action,
          timestamp: activity.createdAt,
          data: {
            instanceId,
            details: activity.details || {}
          }
        });
      }

      // Сортируем события по времени (от новых к старым)
      events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      // Обрезаем результат до указанного лимита
      const limitedEvents = events.slice(0, parseInt(limit));

      // Определяем самую последнюю временную метку
      const latestTimestamp = limitedEvents.length > 0 ? limitedEvents[0].timestamp : (since || new Date().toISOString());

      // Пагинация и полезная информация
      res.json({
        events: limitedEvents,
        latestTimestamp,
        count: limitedEvents.length,
        hasMore: events.length > parseInt(limit)
      });
    } catch (error) {
      logger.error(`Error getting latest events for instance`, {
        error: error.message,
        stack: error.stack
      });
      next(error);
    }
  }

  /**
   * Получить историю сообщений чата
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async getChatHistory(req, res, next) {
    try {
      const instanceId = req.params.instanceId;
      const chatId = req.params.chatId;

      // Опции пагинации
      const options = {
        limit: parseInt(req.query.limit) || 50,
        skip: parseInt(req.query.skip) || 0,
        startDate: req.query.startDate,
        endDate: req.query.endDate
      };

      const history = await instanceService.getChatHistory(instanceId, chatId, options);

      res.json(history);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new InstanceController();