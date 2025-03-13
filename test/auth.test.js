// test/auth.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { setupTestDatabase, switchDatabaseProvider } = require('./setup');

// Импортируем нужные модули
const app = require('../src/app');

// Тестируем оба провайдера баз данных
['mongodb', 'sqlite'].forEach(databaseProvider => {
  describe(`Authentication API Tests (${databaseProvider})`, () => {
    let testUserId;
    let testApiKey;
    let testInstanceId;
    let jwtToken;

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
    
    // Тесты для входа пользователя
    describe('POST /api/auth/login', () => {
      it('should login with valid credentials and return JWT token', async () => {
        const res = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'test@example.com',
            password: 'testpassword123'
          });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toEqual('test@example.com');
        
        // Сохраняем токен для будущих тестов
        jwtToken = res.body.token;
        
        // Проверка валидности JWT
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        expect(decoded).toHaveProperty('id');
        expect(decoded).toHaveProperty('email');
        expect(decoded.email).toEqual('test@example.com');
      });
      
      it('should reject login with invalid password', async () => {
        const res = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'test@example.com',
            password: 'wrongpassword'
          });
        
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
      });
      
      it('should reject login with non-existent user', async () => {
        const res = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'nonexistent@example.com',
            password: 'testpassword123'
          });
        
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
      });
    });
    
    // Тесты для получения информации о текущем пользователе
    describe('GET /api/auth/me', () => {
      it('should get current user info with JWT token', async () => {
        const res = await request(app)
          .get('/api/auth/me')
          .set('Authorization', `Bearer ${jwtToken}`);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email');
        expect(res.body.email).toEqual('test@example.com');
      });
      
      it('should get current user info with API key', async () => {
        const res = await request(app)
          .get('/api/auth/me')
          .set('x-api-key', testApiKey);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email');
        expect(res.body.email).toEqual('test@example.com');
      });
      
      it('should reject request without authentication', async () => {
        const res = await request(app)
          .get('/api/auth/me');
        
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
      });
      
      it('should reject request with invalid JWT token', async () => {
        const res = await request(app)
          .get('/api/auth/me')
          .set('Authorization', 'Bearer invalid-token');
        
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
      });
      
      it('should reject request with invalid API key', async () => {
        const res = await request(app)
          .get('/api/auth/me')
          .set('x-api-key', 'invalid-api-key');
        
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
      });
    });
  });
});