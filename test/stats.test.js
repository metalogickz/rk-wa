// test/stats.test.js
const request = require('supertest');
const { setupTestDatabase, switchDatabaseProvider } = require('./setup');

// Импортируем нужные модули
const app = require('../src/app');

// Тестируем оба провайдера баз данных
['mongodb', 'sqlite'].forEach(databaseProvider => {
  describe(`Statistics API Tests (${databaseProvider})`, () => {
    let testUserId;
    let testApiKey;
    let testInstanceId;

    // Перед всеми тестами настраиваем базу данных и переключаем провайдер
    beforeAll(async () => {
      // Настраиваем тестовую базу данных
      const testData = await setupTestDatabase();
      testUserId = testData.testUserId;
      testApiKey = testData.testApiKey;
      testInstanceId = testData.testInstanceId;
      
      // Переключаем провайдер базы данных
      await switchDatabaseProvider(databaseProvider);
    });
    
    // Тесты для получения статистики пользователя
    describe('GET /api/stats/user', () => {
      it('should get user statistics', async () => {
        const res = await request(app)
          .get('/api/stats/user')
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('total');
        expect(res.body).toHaveProperty('instances');
        expect(Array.isArray(res.body.instances)).toBe(true);
      });
      
      it('should support period parameter', async () => {
        const periods = ['week', 'month', 'year', 'all'];
        
        for (const period of periods) {
          const res = await request(app)
            .get('/api/stats/user')
            .query({ period })
            .set('x-api-key', testApiKey);
          
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty('total');
          expect(res.body).toHaveProperty('instances');
          expect(Array.isArray(res.body.instances)).toBe(true);
        }
      });
      
      it('should reject request without authentication', async () => {
        const res = await request(app)
          .get('/api/stats/user');
        
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
      });
    });
    
    // Тесты для получения статистики инстанса
    describe('GET /api/stats/instances/:instanceId', () => {
      it('should get instance statistics', async () => {
        const res = await request(app)
          .get(`/api/stats/instances/${testInstanceId}`)
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('usage');
      });
      
      it('should support period parameter', async () => {
        const periods = ['today', 'week', 'month', 'all'];
        
        for (const period of periods) {
          const res = await request(app)
            .get(`/api/stats/instances/${testInstanceId}`)
            .query({ period })
            .set('x-api-key', testApiKey);
          
          expect(res.statusCode).toEqual(200);
          expect(res.body).toHaveProperty('usage');
          
          if (period === 'today') {
            // Для daily периода должны быть детальные данные
            expect(res.body.usage).toBeInstanceOf(Object);
          } else {
            // Для других периодов должны быть агрегированные данные
            expect(res.body.usage).toHaveProperty('messagesSent');
            expect(res.body.usage).toHaveProperty('messagesReceived');
            
            if (period !== 'all') {
              expect(res.body.usage).toHaveProperty('dailyStats');
              expect(Array.isArray(res.body.usage.dailyStats)).toBe(true);
            }
          }
        }
      });
      
      it('should reject with non-existent instanceId', async () => {
        const res = await request(app)
          .get('/api/stats/instances/non-existent-id')
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(500); // Или 404 в зависимости от реализации
      });
    });
    
    // Тесты для получения системной статистики
    describe('GET /api/stats/system', () => {
      it('should reject non-admin user', async () => {
        const res = await request(app)
          .get('/api/stats/system')
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(403);
        expect(res.body).toHaveProperty('error');
      });
    });
  });
});