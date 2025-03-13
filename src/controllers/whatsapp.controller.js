const whatsappManager = require('../services/whatsapp-manager.service');
const logger = require('../utils/logger');

class WhatsAppController {
  /**
   * Получить статус инстанса
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async getStatus(req, res, next) {
    try {
      const instanceId = req.params.instanceId;

      const status = whatsappManager.getInstanceStatus(instanceId);
      res.json(status);
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
  async getQrCode(req, res, next) {
    try {
      const instanceId = req.params.instanceId;

      const qrCode = whatsappManager.getInstanceQrCode(instanceId);

      if (!qrCode) {
        return res.status(404).json({ error: 'QR code not available' });
      }

      res.json({ qrCode });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Отправить сообщение
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async sendMessage(req, res, next) {
    try {
      const instanceId = req.params.instanceId;
      const { phone, message } = req.body;

      if (!phone || !message) {
        return res.status(400).json({ error: 'Phone and message are required' });
      }

      const result = await whatsappManager.sendMessage(instanceId, phone, message);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Отправить медиа по URL
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async sendMediaUrl(req, res, next) {
    try {
      const instanceId = req.params.instanceId;
      const { phone, url, caption, filename } = req.body;

      if (!phone || !url) {
        return res.status(400).json({ error: 'Phone and URL are required' });
      }

      const result = await whatsappManager.sendMediaByUrl(instanceId, phone, url, caption, filename);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Отправить медиа из файла
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async sendMediaFile(req, res, next) {
    try {
      const instanceId = req.params.instanceId;

      // Проверяем наличие файла
      if (!req.file) {
        return res.status(400).json({ error: 'File is required' });
      }

      const { phone, caption } = req.body;

      if (!phone) {
        return res.status(400).json({ error: 'Phone is required' });
      }

      const filePath = req.file.path;

      const result = await whatsappManager.sendMediaFromPath(instanceId, phone, filePath, caption);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получить контакты
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async getContacts(req, res, next) {
    try {
      const instanceId = req.params.instanceId;

      const contacts = await whatsappManager.getContacts(instanceId);
      res.json({ contacts });
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

      // Перенаправляем запрос в instanceController, используя тот же механизм
      // instanceController хранится в другом файле, поэтому нужно его импортировать
      const instanceController = require('./instance.controller');

      // Мы просто переназначаем req.params, чтобы использовать тот же метод
      req.params.instanceId = instanceId;

      // Вызываем оригинальный метод
      await instanceController.getLatestEvents(req, res, next);
    } catch (error) {
      logger.error(`Error getting latest events for instance ${req.params.instanceId}`, {
        error: error.message,
        stack: error.stack
      });
      next(error);
    }
  }

  /**
   * Выйти из WhatsApp
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async logout(req, res, next) {
    try {
      const instanceId = req.params.instanceId;

      await whatsappManager.logoutInstance(instanceId);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WhatsAppController();