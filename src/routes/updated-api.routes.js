// updated-api.routes.js
const express = require('express');
const router = express.Router();
const instanceController = require('../controllers/instance.controller');
const whatsappController = require('../controllers/whatsapp.controller');
const simplifiedWhatsAppController = require('../controllers/simplified-whatsapp.controller');
const authController = require('../controllers/auth.controller');
const statsController = require('../controllers/stats.controller');
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

// Получить инстанс по ID
router.get('/instances/:instanceId', authMiddleware, instanceController.getInstance);

// Обновить инстанс
router.put('/instances/:instanceId', authMiddleware, instanceController.updateInstance);

// Удалить инстанс
router.delete('/instances/:instanceId', authMiddleware, instanceController.deleteInstance);

// Получить лог активности инстанса
router.get('/instances/:instanceId/activity', authMiddleware, instanceController.getInstanceActivityLog);

// Получить историю сообщений чата
router.get('/instances/:instanceId/chats/:chatId/messages', authMiddleware, instanceController.getChatHistory);

// Получить последние события инстанса (для polling)
router.get('/instances/:instanceId/events', authMiddleware, instanceController.getLatestEvents);

// --- Новые маршруты для упрощенного сервиса WhatsApp ---

// Инициализировать экземпляр (вместо автоматической инициализации)
router.post('/whatsapp-simple/:instanceId/init', authMiddleware, simplifiedWhatsAppController.initInstance);

// Получить QR-код экземпляра
router.get('/whatsapp-simple/:instanceId/qr', authMiddleware, simplifiedWhatsAppController.getQrCode);

// Получить статус экземпляра
router.get('/whatsapp-simple/:instanceId/status', authMiddleware, simplifiedWhatsAppController.getStatus);

// Отправить сообщение
router.post('/whatsapp-simple/:instanceId/send', authMiddleware, simplifiedWhatsAppController.sendMessage);

// Выйти из WhatsApp
router.post('/whatsapp-simple/:instanceId/logout', authMiddleware, simplifiedWhatsAppController.logout);

// --- Оставляем текущие маршруты WhatsApp для обратной совместимости ---

// Старые маршруты с оригинальным контроллером
router.get('/whatsapp/:instanceId/status', instanceAuthMiddleware, whatsappController.getStatus);
router.get('/whatsapp/:instanceId/qr', instanceAuthMiddleware, whatsappController.getQrCode);
router.post('/whatsapp/:instanceId/send', instanceAuthMiddleware, whatsappController.sendMessage);
router.post('/whatsapp/:instanceId/send-media', instanceAuthMiddleware, whatsappController.sendMediaUrl);
router.post('/whatsapp/:instanceId/send-file', instanceAuthMiddleware, upload.single('file'), whatsappController.sendMediaFile);
router.get('/whatsapp/:instanceId/contacts', instanceAuthMiddleware, whatsappController.getContacts);
router.get('/whatsapp/:instanceId/events', instanceAuthMiddleware, whatsappController.getLatestEvents);
router.post('/whatsapp/:instanceId/logout', instanceAuthMiddleware, whatsappController.logout);

// --- Маршруты для API ключа (сохраняем для обратной совместимости) ---

// Создать новый инстанс с помощью API ключа
router.post('/instances', apiKeyAuthMiddleware, instanceController.createInstance);

// Получить все инстансы пользователя с помощью API ключа
router.get('/instances', apiKeyAuthMiddleware, instanceController.getUserInstances);

module.exports = router;