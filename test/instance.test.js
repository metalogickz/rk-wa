// test/instance.test.js
const request = require('supertest');
const { setupTestDatabase, switchDatabaseProvider } = require('./setup');

// Импортируем нужные модули
const app = require('../src/app');

// Константы для тестов
let testUserId;
let testApiKey;
let testInstanceId;
let newInstanceId;

// Тестируем оба провайдера баз данных
['mongodb', 'sqlite'].forEach(databaseProvider => {
  describe(`Instance Management API Tests (${databaseProvider})`, () => {
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
    
    // Тесты для получения списка инстансов
    describe('GET /api/instances', () => {
      it('should get list of instances with API key', async () => {
        const res = await request(app)
          .get('/api/instances')
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('instances');
        expect(Array.isArray(res.body.instances)).toBe(true);
        expect(res.body.instances.length).toBeGreaterThan(0);
        
        // Проверяем, что в списке есть наш тестовый инстанс
        const foundInstance = res.body.instances.find(inst => inst.id === testInstanceId);
        expect(foundInstance).toBeDefined();
        expect(foundInstance.name).toEqual('Test Instance');
      });
      
      it('should reject request without authentication', async () => {
        const res = await request(app)
          .get('/api/instances');
        
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
      });
    });
    
    // Тесты для создания инстанса
    describe('POST /api/instances', () => {
      it('should create a new instance', async () => {
        const instanceData = {
          name: 'New Test Instance',
          description: 'Instance created by automated test',
          webhookUrl: 'https://webhook.test/new-instance',
          webhookEnabled: false
        };
        
        const res = await request(app)
          .post('/api/instances')
          .set('x-api-key', testApiKey)
          .send(instanceData);
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name');
        expect(res.body.name).toEqual(instanceData.name);
        expect(res.body).toHaveProperty('description');
        expect(res.body.description).toEqual(instanceData.description);
        
        // Сохраняем ID нового инстанса для последующих тестов
        newInstanceId = res.body.id;
      });
      
      it('should reject creation without required fields', async () => {
        const invalidData = {
          description: 'Missing name field'
        };
        
        const res = await request(app)
          .post('/api/instances')
          .set('x-api-key', testApiKey)
          .send(invalidData);
        
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
      });
    });
    
    // Тесты для получения конкретного инстанса
    describe('GET /api/instances/:instanceId', () => {
      it('should get instance details', async () => {
        const res = await request(app)
          .get(`/api/instances/${testInstanceId}`)
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toEqual(testInstanceId);
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('description');
        expect(res.body).toHaveProperty('connectionStatus');
      });
      
      it('should reject with non-existent instanceId', async () => {
        const res = await request(app)
          .get('/api/instances/non-existent-id')
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error');
      });
    });
    
    // Тесты для обновления инстанса
    describe('PUT /api/instances/:instanceId', () => {
      it('should update instance details', async () => {
        const updateData = {
          name: 'Updated Instance Name',
          description: 'Updated by automated test'
        };
        
        const res = await request(app)
          .put(`/api/instances/${newInstanceId}`)
          .set('x-api-key', testApiKey)
          .send(updateData);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.id).toEqual(newInstanceId);
        expect(res.body).toHaveProperty('name');
        expect(res.body.name).toEqual(updateData.name);
        expect(res.body).toHaveProperty('description');
        expect(res.body.description).toEqual(updateData.description);
      });
    });
    
    // Тесты для обновления webhook настроек
    describe('Webhook settings', () => {
      it('should update webhook settings', async () => {
        const updateData = {
          webhookUrl: 'https://webhook.test/updated',
          webhookEnabled: true,
          webhookSettings: {
            notifyReceived: true,
            notifySent: true,
            notifyDelivery: false,
            maxRetries: 5,
            retryInterval: 30000
          }
        };
        
        const res = await request(app)
          .put(`/api/instances/${newInstanceId}`)
          .set('x-api-key', testApiKey)
          .send(updateData);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('webhookUrl');
        expect(res.body.webhookUrl).toEqual(updateData.webhookUrl);
        expect(res.body).toHaveProperty('webhookEnabled');
        expect(res.body.webhookEnabled).toEqual(updateData.webhookEnabled);
        
        // Проверяем, что настройки вебхука обновились
        const detailsRes = await request(app)
          .get(`/api/instances/${newInstanceId}`)
          .set('x-api-key', testApiKey);
        
        expect(detailsRes.statusCode).toEqual(200);
        expect(detailsRes.body).toHaveProperty('webhookSettings');
        expect(detailsRes.body.webhookSettings).toHaveProperty('notifyReceived');
        expect(detailsRes.body.webhookSettings.notifyReceived).toEqual(updateData.webhookSettings.notifyReceived);
      });
    });
    
    // Тесты для истории активности
    describe('GET /api/instances/:instanceId/activity', () => {
      it('should get activity log', async () => {
        const res = await request(app)
          .get(`/api/instances/${newInstanceId}/activity`)
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('logs');
        expect(Array.isArray(res.body.logs)).toBe(true);
        expect(res.body).toHaveProperty('pagination');
      });
      
      it('should support pagination and filtering', async () => {
        const res = await request(app)
          .get(`/api/instances/${newInstanceId}/activity`)
          .query({ limit: 5, skip: 0, actions: 'instance_created,instance_updated' })
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('logs');
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toHaveProperty('limit');
        expect(res.body.pagination.limit).toEqual(5);
      });
    });
    
    // Тесты для чтения событий (polling API)
    describe('GET /api/instances/:instanceId/events', () => {
      it('should get latest events', async () => {
        const res = await request(app)
          .get(`/api/instances/${newInstanceId}/events`)
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('events');
        expect(Array.isArray(res.body.events)).toBe(true);
        expect(res.body).toHaveProperty('latestTimestamp');
      });
      
      it('should support filtering by types', async () => {
        const res = await request(app)
          .get(`/api/instances/${newInstanceId}/events`)
          .query({ types: 'instance_created,instance_updated' })
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('events');
        
        // Проверяем, что все события соответствуют запрошенным типам
        for (const event of res.body.events) {
          expect(['instance_created', 'instance_updated']).toContain(event.type);
        }
      });
      
      it('should respect the since parameter', async () => {
        // Получаем текущую временную метку
        const now = new Date().toISOString();
        
        const res = await request(app)
          .get(`/api/instances/${newInstanceId}/events`)
          .query({ since: now })
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('events');
        
        // После текущего времени не должно быть событий (или их очень мало)
        expect(res.body.events.length).toBeLessThan(2);
      });
    });
    
    // Тесты для удаления инстанса (выполняем в конце)
    describe('DELETE /api/instances/:instanceId', () => {
      it('should delete the created instance', async () => {
        const res = await request(app)
          .delete(`/api/instances/${newInstanceId}`)
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success');
        expect(res.body.success).toBe(true);
        
        // Проверяем, что инстанс действительно удален
        const checkRes = await request(app)
          .get(`/api/instances/${newInstanceId}`)
          .set('x-api-key', testApiKey);
        
        expect(checkRes.statusCode).toEqual(404);
      });
    });
  });
});