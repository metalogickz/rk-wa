const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');
const usageMonitor = require('../services/usage-monitor.service');

const prisma = new PrismaClient();

/**
 * Middleware для авторизации запросов к API по ID инстанса и ключу API
 * @param {object} req - Запрос
 * @param {object} res - Ответ
 * @param {function} next - Следующий middleware
 */
async function instanceAuthMiddleware(req, res, next) {
  try {
    const apiKey = req.headers['x-api-key'];
    const instanceId = req.params.instanceId;
    
    if (!instanceId) {
      logger.warn('API request without instance ID', { 
        ip: req.ip, 
        endpoint: req.originalUrl 
      });
      return res.status(400).json({ error: 'Instance ID is required' });
    }
    
    // Объявляем user с помощью let, чтобы можно было изменить
    let user = null;
    
    // Находим пользователя по API ключу, если он предоставлен
    if (apiKey) {
      user = await prisma.user.findUnique({
        where: { apiKey }
      });
    }
    
    // Если API-ключ не сработал, используем пользователя из предыдущего middleware (JWT)
    if (!user && req.user) {
      user = req.user;
    }
    
    // Если пользователя нет, возвращаем ошибку
    if (!user) {
      logger.warn('API request without valid authentication', { 
        ip: req.ip, 
        endpoint: req.originalUrl
      });
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Проверяем, принадлежит ли инстанс пользователю
    const instance = await prisma.instance.findUnique({
      where: {
        id: instanceId
      }
    });
    
    // Проверяем существование инстанса
    if (!instance) {
      logger.warn('API request to non-existent instance', {
        ip: req.ip,
        endpoint: req.originalUrl,
        instanceId
      });
      return res.status(404).json({ error: 'Instance not found' });
    }
    
    // Проверяем принадлежность инстанса пользователю
    if (instance.userId !== user.id && !user.isAdmin) {
      logger.warn('API request to instance not owned by user', { 
        ip: req.ip, 
        endpoint: req.originalUrl,
        userId: user.id,
        instanceId
      });
      return res.status(403).json({ error: 'You do not have access to this instance' });
    }
    
    // Сохраняем данные пользователя и инстанса в запросе
    req.user = user;
    req.instance = instance;
    
    // Трекинг метрики API-вызова
    usageMonitor.trackMetric(instanceId, 'apiCalls');

    next();
  } catch (error) {
    logger.error('Error in instance authentication middleware', {
      error: error.message,
      stack: error.stack
    });
    
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = instanceAuthMiddleware;