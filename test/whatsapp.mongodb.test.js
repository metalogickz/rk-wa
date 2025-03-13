// test/whatsapp.mongodb.test.js
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const { setupTestDatabase, switchDatabaseProvider } = require('./setup');

// Импортируем нужные модули
const app = require('../src/app');

// Константы для тестов
let testUserId;
let testApiKey;
let testInstanceId;

// Настройка окружения для тестов MongoDB
beforeAll(async () => {
  // Переключаем провайдер базы данных на MongoDB
  await switchDatabaseProvider('mongodb');
  
  // Настраиваем тестовую базу данных
  const testData = await setupTestDatabase();
  testUserId = testData.testUserId;
  testApiKey = testData.testApiKey;
  testInstanceId = testData.testInstanceId;
  
  // Создаем директорию для тестовых файлов
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  // Создаем тестовый файл для тестов отправки медиа
  const testImagePath = path.join(uploadsDir, 'test-image.jpg');
  if (!fs.existsSync(testImagePath)) {
    // Создаем пустой файл для тестов
    fs.writeFileSync(testImagePath, Buffer.alloc(1024));
  }
});

// Тесты WhatsApp API с MongoDB
describe('WhatsApp API Tests (MongoDB)', () => {
  // Тесты для получения статуса инстанса
  describe('GET /api/whatsapp/:instanceId/status', () => {
    it('should get instance status', async () => {
      const res = await request(app)
        .get(`/api/whatsapp/${testInstanceId}/status`)
        .set('x-api-key', testApiKey);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status');
      // Статус будет 'disconnected', так как мы не запускаем реальное подключение
      expect(res.body).toHaveProperty('ready');
    });
    
    it('should reject with non-existent instanceId', async () => {
      const res = await request(app)
        .get('/api/whatsapp/non-existent-id/status')
        .set('x-api-key', testApiKey);
      
      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('error');
    });
  });
  
  // Тесты для отправки сообщения
  // Примечание: мы не можем реально отправить сообщение без активного соединения,
  // поэтому мы ожидаем ошибку с кодом, указывающим на отсутствие соединения
  describe('POST /api/whatsapp/:instanceId/send', () => {
    it('should attempt to send a message', async () => {
      const messageData = {
        phone: '12345678901',
        message: 'Test message from automated test'
      };
      
      const res = await request(app)
        .post(`/api/whatsapp/${testInstanceId}/send`)
        .set('x-api-key', testApiKey)
        .send(messageData);
      
      // Так как нет реального соединения, мы ожидаем ошибку
      // В реальном тесте, с моком WhatsApp менеджера, можно было бы ожидать 200
      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toMatch(/not ready/i);
    });
    
    it('should reject without required fields', async () => {
      const invalidData = {
        // Отсутствует поле 'phone'
        message: 'Test message'
      };
      
      const res = await request(app)
        .post(`/api/whatsapp/${testInstanceId}/send`)
        .set('x-api-key', testApiKey)
        .send(invalidData);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });
  
  // Тесты для отправки медиа по URL
  describe('POST /api/whatsapp/:instanceId/send-media', () => {
    it('should attempt to send media by URL', async () => {
      const mediaData = {
        phone: '12345678901',
        url: 'https://example.com/test-image.jpg',
        caption: 'Test image caption'
      };
      
      const res = await request(app)
        .post(`/api/whatsapp/${testInstanceId}/send-media`)
        .set('x-api-key', testApiKey)
        .send(mediaData);
      
      // Так как нет реального соединения, мы ожидаем ошибку
      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error');
    });
    
    it('should reject without required fields', async () => {
      const invalidData = {
        // Отсутствует поле 'url'
        phone: '12345678901',
        caption: 'Missing URL'
      };
      
      const res = await request(app)
        .post(`/api/whatsapp/${testInstanceId}/send-media`)
        .set('x-api-key', testApiKey)
        .send(invalidData);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });
  
  // Тесты для отправки медиа из файла
  describe('POST /api/whatsapp/:instanceId/send-file', () => {
    it('should attempt to upload and send a file', async () => {
      const testImagePath = path.join(__dirname, 'uploads', 'test-image.jpg');
      
      const res = await request(app)
        .post(`/api/whatsapp/${testInstanceId}/send-file`)
        .set('x-api-key', testApiKey)
        .field('phone', '12345678901')
        .field('caption', 'Test file upload')
        .attach('file', testImagePath);
      
      // Так как нет реального соединения, мы ожидаем ошибку
      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error');
    });
    
    it('should reject without required file', async () => {
      const res = await request(app)
        .post(`/api/whatsapp/${testInstanceId}/send-file`)
        .set('x-api-key', testApiKey)
        .field('phone', '12345678901')
        .field('caption', 'Missing file');
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });
  
  // Тесты для получения контактов
  describe('GET /api/whatsapp/:instanceId/contacts', () => {
    it('should attempt to get contacts', async () => {
      const res = await request(app)
        .get(`/api/whatsapp/${testInstanceId}/contacts`)
        .set('x-api-key', testApiKey);
      
      // Так как нет реального соединения, мы ожидаем ошибку
      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error');
    });
  });
});