// test/health.test.js
const request = require('supertest');
const { setupTestDatabase, switchDatabaseProvider } = require('./setup');

// Импортируем нужные модули
const app = require('../src/app');

// Тестируем оба провайдера баз данных
['mongodb', 'sqlite'].forEach(databaseProvider => {
  describe(`Health Check Tests (${databaseProvider})`, () => {
    // Перед всеми тестами настраиваем базу данных и переключаем провайдер
    beforeAll(async () => {
      // Настраиваем тестовую базу данных
      await setupTestDatabase();
      
      // Переключаем провайдер базы данных
      await switchDatabaseProvider(databaseProvider);
    });
    
    // Тесты для проверки состояния приложения
    describe('GET /health', () => {
      it('should return healthy status', async () => {
        const res = await request(app)
          .get('/health');
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status');
        expect(res.body.status).toEqual('ok');
        expect(res.body).toHaveProperty('timestamp');
        expect(res.body).toHaveProperty('dbProvider');
        expect(res.body.dbProvider).toEqual(databaseProvider);
      });
    });
  });
});