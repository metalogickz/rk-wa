const logger = require('../utils/logger');
const dbConnector = require('../utils/db-connector');

async function apiKeyAuthMiddleware(req, res, next) {
  try {
    const prisma = dbConnector.getClient();
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
      logger.warn('API request without API key', { 
        ip: req.ip, 
        endpoint: req.originalUrl 
      });
      return res.status(401).json({ error: 'API key is required' });
    }
    
    const user = await prisma.user.findUnique({
      where: { apiKey }
    });
    
    if (!user) {
      logger.warn('API request with invalid API key', { 
        ip: req.ip, 
        endpoint: req.originalUrl,
        apiKey
      });
      return res.status(401).json({ error: 'Invalid API key' });
    }
    
    // Добавляем пользователя в req для дальнейшего использования
    req.user = user;
    next();
  } catch (error) {
    logger.error('Error in API key authentication middleware', {
      error: error.message,
      stack: error.stack
    });
    
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = apiKeyAuthMiddleware;