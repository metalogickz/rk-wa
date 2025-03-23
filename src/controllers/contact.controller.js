// contact.controller.js
const contactService = require('../services/contact.service');
const whatsappManager = require('../services/whatsapp-manager.service');
const logger = require('../utils/logger');

class ContactController {
  /**
   * Получить все контакты инстанса из базы данных
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async getContactsFromDB(req, res, next) {
    try {
      const instanceId = req.params.instanceId;
      
      // Опции для фильтрации и пагинации
      const options = {
        limit: parseInt(req.query.limit) || 100,
        skip: parseInt(req.query.skip) || 0,
        searchTerm: req.query.search || '',
        onlyGroups: req.query.onlyGroups === 'true'
      };
      
      // Получаем контакты из базы данных
      const result = await contactService.getContacts(instanceId, options);
      
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Импортировать контакты из WhatsApp в базу данных
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async importContacts(req, res, next) {
    try {
      const instanceId = req.params.instanceId;
      
      // Получаем контакты из WhatsApp через существующий механизм
      const { contacts } = await whatsappManager.getContacts(instanceId);
      
      // Импортируем контакты в базу данных
      const importedCount = await contactService.importContacts(instanceId, contacts);
      
      res.json({
        success: true,
        message: `Successfully imported ${importedCount} contacts`,
        importedCount
      });
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Добавить или обновить контакт в базе данных
   * @param {object} req - Запрос
   * @param {object} res - Ответ
   * @param {function} next - Следующий middleware
   */
  async saveContact(req, res, next) {
    try {
      const instanceId = req.params.instanceId;
      const contactData = req.body;
      
      if (!contactData.number && !contactData.remoteJid) {
        return res.status(400).json({ error: 'Either number or remoteJid is required' });
      }
      
      // Сохраняем контакт в базе данных
      const contact = await contactService.saveContact(instanceId, contactData);
      
      if (!contact) {
        return res.status(500).json({ error: 'Failed to save contact' });
      }
      
      res.json(contact);
    } catch (error) {
      next(error);
    }
  }
  
  /**
   * Расширяет существующий метод getContacts из whatsapp.controller.js
   * Добавляет сохранение контактов в базу данных
   */
  async extendedGetContacts(req, res, next) {
    try {
      const instanceId = req.params.instanceId;
      
      // Используем существующий метод получения контактов из WhatsApp
      const { contacts } = await whatsappManager.getContacts(instanceId);
      
      // Асинхронно сохраняем контакты в базу данных, не блокируя ответ
      if (contacts && contacts.length > 0) {
        // Запускаем сохранение, но не ждем его завершения
        contactService.importContacts(instanceId, contacts)
          .then(count => {
            logger.info(`Asynchronously imported ${count} contacts for instance ${instanceId}`);
          })
          .catch(error => {
            logger.error(`Failed to import contacts for instance ${instanceId}`, {
              error: error.message
            });
          });
      }
      
      // Возвращаем оригинальные контакты из WhatsApp
      res.json({ contacts });
    } catch (error) {
      // Даже при ошибке возвращаем пустой массив для обратной совместимости
      res.json({ contacts: [] });
    }
  }
}

module.exports = new ContactController();