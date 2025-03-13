const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const dbConnector = require('../utils/db-connector');

async function authMiddleware(req, res, next) {
  try {
    const prisma = dbConnector.getClient();
    
    // Сначала проверяем JWT
    const authHeader = req.headers.authorization;
    const apiKey = req.headers['x-api-key'];
    
    // Если нет ни JWT, ни API-ключа
    if (!authHeader && !apiKey) {
      logger.warn('Unauthorized access attempt', { 
        ip: req.ip, 
        endpoint: req.originalUrl 
      });
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    let user;
    
    // Проверка JWT
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-jwt-secret');
        user = await prisma.user.findUnique({
          where: { id: decoded.id }
        });
      } catch (jwtError) {
        // JWT не прошел проверку
        user = null;
      }
    }
    
    // Если JWT не сработал, пробуем API-ключ
    if (!user && apiKey) {
      user = await prisma.user.findUnique({
        where: { apiKey }
      });
    }
    
    // Если пользователь не найден
    if (!user) {
      logger.warn('Authentication failed', { 
        ip: req.ip, 
        endpoint: req.originalUrl 
      });
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Сохраняем пользователя в запросе
    req.user = user;
    
    next();
  } catch (error) {
    logger.error('Error in auth middleware', {
      error: error.message,
      stack: error.stack
    });
    
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = authMiddleware;