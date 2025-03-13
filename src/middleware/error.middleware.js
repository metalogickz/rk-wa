const logger = require('../utils/logger');

function errorMiddleware(err, req, res, next) {
  logger.error('API Error', { 
    error: err.message, 
    stack: err.stack,
    endpoint: req.originalUrl,
    method: req.method
  });
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
}

module.exports = errorMiddleware;