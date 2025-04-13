// contact.service.js
const logger = require('../utils/logger');
const dbConnector = require('../utils/db-connector');

class ContactService {
  /**
   * Создание или обновление контакта
   * @param {string} instanceId - ID инстанса
   * @param {object} contactData - Данные контакта
   * @returns {Promise<object>} - Созданный или обновленный контакт
   */
  async saveContact(instanceId, contactData) {
    try {
      const prisma = dbConnector.getClient();

      // Получаем remoteJid (полный JID)
      const remoteJid = contactData.remoteJid || this.formatJid(contactData.number, contactData.isGroup);

      // Ищем существующий контакт
      const existingContact = await prisma.contact.findUnique({
        where: {
          instanceId_remoteJid: {
            instanceId,
            remoteJid
          }
        }
      });

      if (existingContact) {
        // Обновляем существующий контакт
        return await prisma.contact.update({
          where: { id: existingContact.id },
          data: {
            name: contactData.name || existingContact.name,
            pushName: contactData.pushName || existingContact.pushName,
            profilePicture: contactData.profilePicture || existingContact.profilePicture,
            about: contactData.about || existingContact.about,
            lastActivity: new Date(),
            updatedAt: new Date()
          }
        });
      } else {
        // Создаем новый контакт
        // Получаем номер из remoteJid
        const number = contactData.number || this.extractNumberFromJid(remoteJid);

        return await prisma.contact.create({
          data: {
            instanceId,
            name: contactData.name,
            number,
            remoteJid,
            pushName: contactData.pushName,
            isGroup: contactData.isGroup || false,
            profilePicture: contactData.profilePicture,
            about: contactData.about,
            lastActivity: new Date()
          }
        });
      }
    } catch (error) {
      logger.error(`Error saving contact for instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });
      // Возвращаем null вместо выброса ошибки, чтобы не прерывать основной процесс
      return null;
    }
  }

  /**
   * Получение контакта по remoteJid
   * @param {string} instanceId - ID инстанса
   * @param {string} remoteJid - JID контакта
   * @returns {Promise<object>} - Контакт
   */
  async getContactByJid(instanceId, remoteJid) {
    try {
      const prisma = dbConnector.getClient();

      return await prisma.contact.findUnique({
        where: {
          instanceId_remoteJid: {
            instanceId,
            remoteJid
          }
        }
      });
    } catch (error) {
      logger.error(`Error getting contact by JID for instance ${instanceId}`, {
        error: error.message,
        stack: error.stack,
        remoteJid
      });
      return null; // Возвращаем null вместо выброса ошибки
    }
  }

  /**
   * Получение или создание контакта
   * @param {string} instanceId - ID инстанса
   * @param {string} remoteJid - JID контакта
   * @param {string} pushName - Имя из WhatsApp (опционально)
   * @returns {Promise<object>} - Контакт
   */
  async getOrCreateContact(instanceId, remoteJid, pushName = null) {
    try {
      const contact = await this.getContactByJid(instanceId, remoteJid);

      if (contact) {
        // Если контакт существует и получили новое pushName, обновляем его
        if (pushName && contact.pushName !== pushName) {
          return await this.saveContact(instanceId, {
            remoteJid,
            pushName
          });
        }
        return contact;
      }

      // Создаем новый контакт
      const number = this.extractNumberFromJid(remoteJid);
      const isGroup = remoteJid.includes('@g.us');

      return await this.saveContact(instanceId, {
        remoteJid,
        number,
        pushName,
        isGroup
      });
    } catch (error) {
      logger.error(`Error getting or creating contact for instance ${instanceId}`, {
        error: error.message,
        stack: error.stack,
        remoteJid
      });

      // В случае ошибки возвращаем базовый объект контакта
      return {
        instanceId,
        remoteJid,
        number: this.extractNumberFromJid(remoteJid),
        isGroup: remoteJid.includes('@g.us')
      };
    }
  }

  /**
   * Получение всех контактов инстанса
   * @param {string} instanceId - ID инстанса
   * @param {object} options - Опции фильтрации и пагинации
   * @returns {Promise<array>} - Список контактов
   */
  async getContacts(instanceId, options = {}) {
    try {
      const prisma = dbConnector.getClient();
      const { limit = 100, skip = 0, searchTerm = '', onlyGroups = false } = options;

      // Формируем фильтры
      const whereClause = {
        instanceId
      };

      if (onlyGroups) {
        whereClause.isGroup = true;
      }

      if (searchTerm) {
        whereClause.OR = [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { number: { contains: searchTerm } },
          { pushName: { contains: searchTerm, mode: 'insensitive' } }
        ];
      }

      // Получаем контакты с пагинацией
      const contacts = await prisma.contact.findMany({
        where: whereClause,
        orderBy: [
          { name: 'asc' },
          { pushName: 'asc' }
        ],
        take: limit,
        skip
      });

      // Считаем общее количество
      const total = await prisma.contact.count({
        where: whereClause
      });

      return {
        contacts,
        pagination: {
          total,
          limit,
          skip,
          hasMore: skip + limit < total
        }
      };
    } catch (error) {
      logger.error(`Error getting contacts for instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });
      // Возвращаем пустой список вместо выброса ошибки
      return { contacts: [], pagination: { total: 0, limit: options.limit || 100, skip: options.skip || 0, hasMore: false } };
    }
  }

  /**
   * Импорт контактов из WhatsApp
   * @param {string} instanceId - ID инстанса
   * @param {array} whatsappContacts - Список контактов из WhatsApp
   * @returns {Promise<number>} - Количество импортированных контактов
   */
  async importContacts(instanceId, whatsappContacts) {
    try {
      let importedCount = 0;

      // Обрабатываем каждый контакт
      for (const contact of whatsappContacts) {
        if (!contact.id) continue;

        try {
          await this.saveContact(instanceId, {
            remoteJid: contact.id,
            number: this.extractNumberFromJid(contact.id),
            name: contact.name || contact.notify || contact.verifiedName,
            pushName: contact.notify || contact.name || contact.verifiedName,
            isGroup: contact.id.includes('@g.us')
          });

          importedCount++;
        } catch (contactError) {
          logger.warn(`Error importing contact ${contact.id} for instance ${instanceId}`, {
            error: contactError.message
          });
        }
      }

      logger.info(`Imported ${importedCount} contacts for instance ${instanceId}`);
      return importedCount;
    } catch (error) {
      logger.error(`Error importing contacts for instance ${instanceId}`, {
        error: error.message,
        stack: error.stack
      });
      return 0; // Возвращаем 0 вместо выброса ошибки
    }
  }

  /**
 * Удалить контакт
 * @param {string} instanceId - ID инстанса
 * @param {string} remoteJid - JID контакта для удаления
 * @returns {Promise<object>} - Результат операции
 */
  async deleteContact(instanceId, remoteJid) {
    try {
      const prisma = dbConnector.getClient();

      // Проверяем существование контакта
      const existingContact = await prisma.contact.findUnique({
        where: {
          instanceId_remoteJid: {
            instanceId,
            remoteJid
          }
        }
      });

      if (!existingContact) {
        throw new Error(`Contact with remoteJid ${remoteJid} not found`);
      }

      // Удаляем контакт
      await prisma.contact.delete({
        where: {
          instanceId_remoteJid: {
            instanceId,
            remoteJid
          }
        }
      });

      logger.info(`Contact deleted for instance ${instanceId}`, {
        remoteJid
      });

      return { success: true, message: `Contact ${remoteJid} successfully deleted` };
    } catch (error) {
      logger.error(`Error deleting contact for instance ${instanceId}`, {
        error: error.message,
        stack: error.stack,
        remoteJid
      });
      throw error;
    }
  }

  /**
   * Форматирование номера в формат JID
   * @param {string} number - Номер телефона
   * @param {boolean} isGroup - Это группа?
   * @returns {string} - JID формат
   */
  formatJid(number, isGroup = false) {
    // Очищаем номер от всех нецифровых символов
    const cleaned = number.toString().replace(/\D/g, '');

    // Добавляем суффикс в зависимости от типа
    const suffix = isGroup ? '@g.us' : '@s.whatsapp.net';

    return `${cleaned}${suffix}`;
  }

  /**
   * Извлечение номера из JID
   * @param {string} jid - JID формат
   * @returns {string} - Чистый номер
   */
  extractNumberFromJid(jid) {
    // Удаляем суффикс @s.whatsapp.net или @g.us
    return jid.split('@')[0];
  }
}

module.exports = new ContactService();