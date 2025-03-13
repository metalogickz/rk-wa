// simplified-whatsapp.controller.js
const simplifiedWhatsAppService = require('../services/simplified-whatsapp.service');
const logger = require('../utils/logger');
const dbConnector = require('../utils/db-connector');

class SimplifiedWhatsAppController {
  /**
   * Инициализировать экземпляр
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async initInstance(req, res, next) {
    try {
      const instanceId = req.params.instanceId;
      
      // Проверяем доступ к экземпляру
      const prisma = dbConnector.getClient();
      const instance = await prisma.instance.findUnique({
        where: { id: instanceId }
      });
      
      if (!instance) {
        return res.status(404).json({ error: `Instance ${instanceId} not found` });
      }
      
      // Проверяем, принадлежит ли экземпляр пользователю
      if (instance.userId !== req.user.id && !req.user.isAdmin) {
        return res.status(403).json({ error: 'You do not have access to this instance' });
      }
      
      // Инициализируем экземпляр
      await simplifiedWhatsAppService.initInstance(instanceId);
      
      res.json({ 
        success: true, 
        message: `Instance ${instanceId} initialized`,
        status: simplifiedWhatsAppService.getStatus(instanceId)
      });
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Получить QR-код для экземпляра
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async getQrCode(req, res, next) {
    try {
      const instanceId = req.params.instanceId;
      
      // Получаем QR-код
      const qrCode = simplifiedWhatsAppService.getQrCode(instanceId);
      
      if (!qrCode) {
        // Если QR-код не доступен, пробуем инициализировать экземпляр
        try {
          await simplifiedWhatsAppService.initInstance(instanceId);
          
          // Даем немного времени на генерацию QR-кода
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Получаем QR-код снова
          const newQrCode = simplifiedWhatsAppService.getQrCode(instanceId);
          
          if (!newQrCode) {
            return res.status(404).json({ error: 'QR code not available yet. Please try again in a few seconds.' });
          }
          
          return res.json({ qrCode: newQrCode });
        } catch (initError) {
          logger.error(`Error initializing instance for QR code ${instanceId}`, {
            error: initError.message
          });
          
          return res.status(404).json({ error: 'QR code not available' });
        }
      }
      
      res.json({ qrCode });
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Получить статус экземпляра
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async getStatus(req, res, next) {
    try {
      const instanceId = req.params.instanceId;
      
      // Получаем статус
      const status = simplifiedWhatsAppService.getStatus(instanceId);
      
      res.json(status);
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
      
      // Проверяем, инициализирован ли экземпляр
      const status = simplifiedWhatsAppService.getStatus(instanceId);
      
      if (!status.ready) {
        return res.status(400).json({ 
          error: 'Instance not ready', 
          status: status.status,
          message: 'Please initialize the instance and scan the QR code first'
        });
      }
      
      // Отправляем сообщение
      const result = await simplifiedWhatsAppService.sendMessage(instanceId, phone, message);
      
      res.json(result);
    } catch (error) {
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
      
      // Выполняем выход
      await simplifiedWhatsAppService.logout(instanceId);
      
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SimplifiedWhatsAppController();