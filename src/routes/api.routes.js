const express = require('express');
const router = express.Router();
const instanceController = require('../controllers/instance.controller');
const whatsappController = require('../controllers/whatsapp.controller');
const authController = require('../controllers/auth.controller');
const statsController = require('../controllers/stats.controller');
const contactController = require('../controllers/contact.controller');
const authMiddleware = require('../middleware/auth.middleware');
const instanceAuthMiddleware = require('../middleware/instance-auth.middleware');
const apiKeyAuthMiddleware = require('../middleware/api-key-auth.middleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Настройка multer для загрузки файлов
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Аутентификация
router.post('/auth/login', authController.login);
router.get('/auth/me', authMiddleware, authController.getCurrentUser);

// Статистика использования (требует авторизации пользователя)
router.get('/stats/user', authMiddleware, statsController.getUserStats);
router.get('/stats/instances/:instanceId', authMiddleware, statsController.getInstanceStats);
router.get('/stats/system', authMiddleware, statsController.getSystemStats);

// --- Маршруты управления инстансами (требуют авторизации пользователя) ---

// Получить все инстансы пользователя
router.get('/instances', authMiddleware, instanceController.getUserInstances);

// Создать новый инстанс
router.post('/instances', authMiddleware, instanceController.createInstance);

// Создать новый инстанс
router.post('/instances', apiKeyAuthMiddleware, instanceController.createInstance);

// Получить все инстансы пользователя
router.get('/instances', apiKeyAuthMiddleware, instanceController.getUserInstances);

// Получить инстанс по ID
router.get('/instances/:instanceId', authMiddleware, instanceController.getInstance);

// Обновить инстанс
router.put('/instances/:instanceId', authMiddleware, instanceController.updateInstance);

// Удалить инстанс
router.delete('/instances/:instanceId', authMiddleware, instanceController.deleteInstance);

// Получить статус инстанса
router.get('/instances/:instanceId/status', authMiddleware, instanceController.getInstanceStatus);

// Переподключить инстанс
router.post('/instances/:instanceId/reconnect', authMiddleware, instanceController.reconnectInstance);

// Выйти из WhatsApp
router.post('/instances/:instanceId/logout', authMiddleware, instanceController.logoutInstance);

// Получить лог активности инстанса
router.get('/instances/:instanceId/activity', authMiddleware, instanceController.getInstanceActivityLog);

// Получить QR-код для инстанса
router.get('/instances/:instanceId/qr', authMiddleware, instanceController.getInstanceQrCode);

// Получить контакты
router.get('/instances/:instanceId/contacts', authMiddleware, whatsappController.getContacts);

router.post('/instances/:instanceId/contacts/add', authMiddleware, whatsappController.addContact);

// Получить контакты из базы данных
router.get('/instances/:instanceId/contacts/db', authMiddleware, contactController.getContactsFromDB);

// Импортировать контакты из WhatsApp в базу данных
router.post('/instances/:instanceId/contacts/import', authMiddleware, contactController.importContacts);

// Добавить или обновить контакт в базе данных
router.post('/instances/:instanceId/contacts/save', authMiddleware, contactController.saveContact);

// Отправить сообщение
router.post('/instances/:instanceId/send', authMiddleware, whatsappController.sendMessage);

// Получить историю сообщений чата
router.get('/instances/:instanceId/chats/:chatId/messages', authMiddleware, instanceController.getChatHistory);

// Получить последние события инстанса (для polling)
router.get('/instances/:instanceId/events', authMiddleware, instanceController.getLatestEvents);

// --- Маршруты WhatsApp API (требуют аутентификации инстанса) ---

// Получить статус инстанса
router.get('/whatsapp/:instanceId/status', instanceAuthMiddleware, whatsappController.getStatus);

// Получить QR-код для инстанса
router.get('/whatsapp/:instanceId/qr', instanceAuthMiddleware, whatsappController.getQrCode);

// Получить контакты из базы данных через API
router.get('/whatsapp/:instanceId/contacts/db', instanceAuthMiddleware, contactController.getContactsFromDB);

// Импортировать контакты через API
router.post('/whatsapp/:instanceId/contacts/import', instanceAuthMiddleware, contactController.importContacts);

// Добавить контакт через API
router.post('/whatsapp/:instanceId/contacts/save', instanceAuthMiddleware, contactController.saveContact);

// Отправить сообщение
router.post('/whatsapp/:instanceId/send', instanceAuthMiddleware, whatsappController.sendMessage);

// Отправить медиа по URL
router.post('/whatsapp/:instanceId/send-media', instanceAuthMiddleware, whatsappController.sendMediaUrl);

// Отправить медиа из файла
router.post('/whatsapp/:instanceId/send-file', instanceAuthMiddleware, upload.single('file'), whatsappController.sendMediaFile);

// Получить контакты
router.get('/whatsapp/:instanceId/contacts', instanceAuthMiddleware, whatsappController.getContacts);

// То же самое, но с API ключом
router.get('/whatsapp/:instanceId/events', instanceAuthMiddleware, whatsappController.getLatestEvents);

// Выйти из WhatsApp
router.post('/whatsapp/:instanceId/logout', instanceAuthMiddleware, whatsappController.logout);

module.exports = router;