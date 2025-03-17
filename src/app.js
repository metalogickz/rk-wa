require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api.routes');
const errorMiddleware = require('./middleware/error.middleware');
const logger = require('./utils/logger');
const usageMonitor = require('./services/usage-monitor.service');
const whatsappManager = require('./services/whatsapp-manager.service');
const cron = require('node-cron');
const path = require('path');
const fs = require('fs');
const dbConnector = require('./utils/db-connector');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

if (process.env.DATABASE_PROVIDER === 'sqlite') {
  const dbDir = path.dirname(process.env.SQLITE_DATABASE_URL.replace('file:', ''));
  if (!fs.existsSync(dbDir)) {
    logger.info(`Creating SQLite database directory: ${dbDir}`);
    fs.mkdirSync(dbDir, { recursive: true });
  }
}

app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

app.get('/api/db/status', (req, res) => {
  res.json({
    provider: dbConnector.activeProvider,
    url: dbConnector.activeProvider === 'mongodb'
      ? process.env.DATABASE_URL.replace(/:[^:]*@/, ':****@') // Скрываем пароль
      : process.env.SQLITE_DATABASE_URL
  });
});

app.post('/api/db/switch', async (req, res) => {
  try {
    const { provider } = req.body;

    if (!provider || (provider !== 'mongodb' && provider !== 'sqlite')) {
      return res.status(400).json({
        error: 'Invalid provider. Use "mongodb" or "sqlite"'
      });
    }

    // Проверка необходимых переменных окружения
    if (provider === 'mongodb' && !process.env.DATABASE_URL) {
      return res.status(400).json({
        error: 'Missing DATABASE_URL environment variable'
      });
    }

    if (provider === 'sqlite' && !process.env.SQLITE_DATABASE_URL) {
      return res.status(400).json({
        error: 'Missing SQLITE_DATABASE_URL environment variable'
      });
    }

    // Если провайдер уже активен, просто вернем статус
    if (provider === dbConnector.activeProvider) {
      return res.json({
        success: true,
        message: `Database provider is already set to ${provider}`,
        provider: dbConnector.activeProvider
      });
    }

    // Переключаем провайдер
    logger.info(`Switching database provider to ${provider}`);

    // Отключаем существующие соединения
    await dbConnector.disconnect();

    // Переключаем провайдер и получаем новый клиент
    const client = dbConnector.switchProvider(provider);

    // Обновляем переменную окружения для последующих запусков
    process.env.DATABASE_PROVIDER = provider;

    return res.json({
      success: true,
      message: `Database provider switched to ${provider}`,
      provider: dbConnector.activeProvider
    });
  } catch (error) {
    logger.error('Error switching database provider', {
      error: error.message,
      stack: error.stack
    });

    return res.status(500).json({
      error: `Failed to switch database provider: ${error.message}`
    });
  }
});

app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    dbProvider: dbConnector.activeProvider
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/ui/instances', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/instances.html'));
});

app.get('/ui/instance/create', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/instance-create.html'));
});

app.get('/ui/instance/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/instance-detail.html'));
});

app.get('/ui/instance/edit/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/instance-edit.html'));
});

app.get('/ui/instance/:id/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/chat.html'));
});

app.get('/ui/instance/:id/contacts', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/contacts.html'));
});

app.get('/ui/stats', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'));
});

// Error handling
app.use(errorMiddleware);

const initializeDatabase = async () => {
  try {
    // Инициализируем базу данных
    await dbConnector.initialize();

    logger.info(`Database initialized successfully with provider: ${dbConnector.activeProvider}`);
  } catch (error) {
    logger.error('Database initialization failed', {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
};

// Start server
const server = app.listen(PORT, async () => {
  try {
    // Инициализируем базу данных перед стартом сервера
    await initializeDatabase();

    logger.info(`WhatsApp Multi-Instance API service running on port ${PORT}`);
    logger.info(`Database provider: ${dbConnector.activeProvider}`);
  } catch (error) {
    logger.error('Server startup failed', {
      error: error.message
    });
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received. Closing HTTP server and database connections');

  // Закрываем HTTP сервер (перестаем принимать новые запросы)
  server.close(async () => {
    logger.info('HTTP server closed');

    try {
      // Закрываем соединение с базой данных
      await dbConnector.disconnect();
      logger.info('Database connections closed');

      process.exit(0);
    } catch (err) {
      logger.error('Error during graceful shutdown', { error: err.message });
      process.exit(1);
    }
  });
});

// Проверка состояния сокетов каждые 5 минут
const socketCheckSchedule = process.env.SOCKET_CHECK_CRON || '*/5 * * * *';
cron.schedule(socketCheckSchedule, async () => {
  try {
    logger.info('Starting scheduled socket health check');
    const results = await whatsappManager.checkAllSockets();

    // Логируем только проблемные инстансы для экономии места в логах
    const problematicInstances = Object.entries(results)
      .filter(([_, status]) => !status.alive)
      .map(([id, status]) => ({ id, status }));

    if (problematicInstances.length > 0) {
      logger.warn(`Found ${problematicInstances.length} problematic instances`, {
        instances: problematicInstances
      });
    } else {
      logger.info('All instances have healthy connections');
    }
  } catch (error) {
    logger.error('Error during socket health check', {
      error: error.message,
      stack: error.stack
    });
  }
});

// Проверка истечения авторизации (раз в день)
const authCheckSchedule = process.env.AUTH_CHECK_CRON || '0 12 * * *';
cron.schedule(authCheckSchedule, async () => {
  try {
    logger.info('Starting scheduled auth expiration check');
    await whatsappManager.checkAuthExpiration();
  } catch (error) {
    logger.error('Error during auth expiration check', {
      error: error.message,
      stack: error.stack
    });
  }
});

// Сохранение метрик использования (каждые 15 минут)
const saveMetricsSchedule = process.env.USAGE_SAVE_CRON || '*/15 * * * *';
cron.schedule(saveMetricsSchedule, async () => {
  try {
    logger.debug('Saving usage metrics');
    await usageMonitor.saveMetrics();
  } catch (error) {
    logger.error('Error saving usage metrics', {
      error: error.message,
      stack: error.stack
    });
  }
});

// Проверка лимитов использования (каждый час)
const checkLimitsSchedule = process.env.USAGE_LIMITS_CRON || '0 * * * *';
cron.schedule(checkLimitsSchedule, async () => {
  try {
    logger.info('Checking usage limits');
    await usageMonitor.checkUsageLimits();
  } catch (error) {
    logger.error('Error checking usage limits', {
      error: error.message,
      stack: error.stack
    });
  }
});

// Сбор системных метрик (каждые 5 минут)
const systemMetricsSchedule = process.env.SYSTEM_METRICS_CRON || '*/5 * * * *';
cron.schedule(systemMetricsSchedule, async () => {
  try {
    logger.debug('Collecting system metrics');
    await usageMonitor.collectSystemMetrics();
  } catch (error) {
    logger.error('Error collecting system metrics', {
      error: error.message,
      stack: error.stack
    });
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', async (error) => {
  logger.error('Uncaught exception', {
    error: error.message,
    stack: error.stack
  });

  try {
    await dbConnector.disconnect();
  } catch (err) {
    logger.error('Error disconnecting from database', { error: err.message });
  }

  // Exit only in production
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', async (reason, promise) => {
  logger.error('Unhandled promise rejection', {
    reason: reason instanceof Error ?
      { message: reason.message, stack: reason.stack } :
      reason
  });

  // Exit only in production
  if (process.env.NODE_ENV === 'production') {
    try {
      await dbConnector.disconnect();
    } catch (err) {
      logger.error('Error disconnecting from database', { error: err.message });
    }

    process.exit(1);
  }
});
