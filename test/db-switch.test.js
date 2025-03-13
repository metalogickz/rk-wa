// test/db-switch.test.js
const request = require('supertest');
const { setupTestDatabase, switchDatabaseProvider } = require('./setup');
const dbConnector = require('../src/utils/db-connector');

// Импортируем нужные модули
const app = require('../src/app');

// Константы для тестов
let testApiKey;

describe('Database Provider Switching Tests', () => {
  // Перед всеми тестами настраиваем базу данных
  beforeAll(async () => {
    // Настраиваем тестовую базу данных
    const testData = await setupTestDatabase();
    testApiKey = testData.testApiKey;
    
    // Устанавливаем MongoDB как начальный провайдер
    await switchDatabaseProvider('mongodb');
  });
  
  // Тесты для получения текущего провайдера
  describe('GET /api/db/status', () => {
    it('should return current database provider (MongoDB)', async () => {
      // Убеждаемся, что мы используем MongoDB
      await switchDatabaseProvider('mongodb');
      
      const res = await request(app)
        .get('/api/db/status');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('provider');
      expect(res.body.provider).toEqual('mongodb');
      expect(res.body).toHaveProperty('url');
      // URL должен быть замаскирован (пароль скрыт)
      expect(res.body.url).not.toMatch(/:.*@/);
    });
    
    it('should return current database provider (SQLite)', async () => {
      // Переключаемся на SQLite
      await switchDatabaseProvider('sqlite');
      
      const res = await request(app)
        .get('/api/db/status');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('provider');
      expect(res.body.provider).toEqual('sqlite');
      expect(res.body).toHaveProperty('url');
      // URL для SQLite должен содержать путь к файлу
      expect(res.body.url).toMatch(/file:/);
    });
  });
  
  // Тесты для переключения провайдера
  describe('POST /api/db/switch', () => {
    it('should switch from MongoDB to SQLite', async () => {
      // Убеждаемся, что мы используем MongoDB
      await switchDatabaseProvider('mongodb');
      
      const res = await request(app)
        .post('/api/db/switch')
        .set('x-api-key', testApiKey)
        .send({ provider: 'sqlite' });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success');
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('provider');
      expect(res.body.provider).toEqual('sqlite');
      
      // Проверяем, что провайдер действительно изменился
      expect(dbConnector.activeProvider).toEqual('sqlite');
    });
    
    it('should switch from SQLite to MongoDB', async () => {
      // Убеждаемся, что мы используем SQLite
      await switchDatabaseProvider('sqlite');
      
      const res = await request(app)
        .post('/api/db/switch')
        .set('x-api-key', testApiKey)
        .send({ provider: 'mongodb' });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success');
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('provider');
      expect(res.body.provider).toEqual('mongodb');
      
      // Проверяем, что провайдер действительно изменился
      expect(dbConnector.activeProvider).toEqual('mongodb');
    });
    
    it('should not switch if provider is already active', async () => {
      // Убеждаемся, что мы используем MongoDB
      await switchDatabaseProvider('mongodb');
      
      const res = await request(app)
        .post('/api/db/switch')
        .set('x-api-key', testApiKey)
        .send({ provider: 'mongodb' });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success');
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toMatch(/already set/i);
    });
    
    it('should reject invalid provider', async () => {
      const res = await request(app)
        .post('/api/db/switch')
        .set('x-api-key', testApiKey)
        .send({ provider: 'invalid-db' });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
    
    it('should reject request without authentication', async () => {
      const res = await request(app)
        .post('/api/db/switch')
        .send({ provider: 'sqlite' });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error');
    });
  });
  
  // Тест работы приложения после переключения провайдера
  describe('Application functionality after provider switch', () => {
    it('should maintain data access after switching to SQLite', async () => {
      // Переключаемся на SQLite
      await switchDatabaseProvider('sqlite');
      
      // Проверяем доступ к данным (получаем список инстансов)
      const res = await request(app)
        .get('/api/instances')
        .set('x-api-key', testApiKey);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('instances');
      expect(Array.isArray(res.body.instances)).toBe(true);
    });
    
    it('should maintain data access after switching to MongoDB', async () => {
      // Переключаемся на MongoDB
      await switchDatabaseProvider('mongodb');
      
      // Проверяем доступ к данным (получаем список инстансов)
      const res = await request(app)
        .get('/api/instances')
        .set('x-api-key', testApiKey);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('instances');
      expect(Array.isArray(res.body.instances)).toBe(true);
    });
  });
});