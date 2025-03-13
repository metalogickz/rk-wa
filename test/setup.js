// test/setup.js
require('dotenv').config({ path: '.env.test' });
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { PrismaClient: MongoDBPrismaClient } = require('@prisma/client');
const { PrismaClient: SQLitePrismaClient } = require('../prisma/generated/sqlite-client');
const dbConnector = require('../src/utils/db-connector');

// Постоянный API ключ для тестов
const TEST_API_KEY = 'test-api-key-12345';

/**
 * Настройка тестовой базы данных
 * Создает тестового пользователя и инстанс в текущей активной базе данных
 */
async function setupTestDatabase() {
  const currentProvider = dbConnector.activeProvider || 'mongodb';
  console.log(`Setting up test database using provider: ${currentProvider}`);

  const prisma = currentProvider === 'mongodb' 
    ? new MongoDBPrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } })
    : new SQLitePrismaClient({ datasources: { db: { url: process.env.SQLITE_DATABASE_URL } } });

  try {
    const hashedPassword = await bcrypt.hash('testpassword123', 10);

    await cleanDatabase(prisma);

    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
        firstName: 'Test',
        lastName: 'User',
        apiKey: TEST_API_KEY
        // Удалил isAdmin, так как это может быть необязательное поле
      }
    });

    const instance = await prisma.instance.create({
      data: {
        name: 'Test Instance',
        description: 'Test instance for automated testing',
        userId: user.id,
        status: 'disconnected',
        webhookUrl: 'https://webhook.test/example',
        webhookEnabled: false
      }
    });

    console.log(`Initialized test database (${currentProvider}) successfully`);
    
    return {
      testUserId: user.id,
      testInstanceId: instance.id,
      testApiKey: TEST_API_KEY
    };
  } catch (error) {
    console.error(`Database initialization error (${currentProvider}):`, error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Очистка базы данных между тестами
 * @param {Object} prisma - Экземпляр PrismaClient для очистки
 */
async function cleanDatabase(prisma) {
  const tables = [
    'webhookLog',
    'message', 
    'activityLog',
    'webhookSettings',
    'usageLimit',
    'instanceUsage',
    'instance',
    'user'
  ];

  // Используем Promise.all для параллельной очистки
  await Promise.all(tables.map(async (table) => {
    try {
      if (prisma[table]) {
        await prisma[table].deleteMany({});
      }
    } catch (error) {
      console.warn(`Could not clean table ${table}:`, error.message);
    }
  }));
}

/**
 * Переключение провайдера базы данных
 * @param {string} provider - Новый провайдер ('mongodb' или 'sqlite')
 * @returns {string} - Предыдущий провайдер
 */
async function switchDatabaseProvider(provider) {
  if (!['mongodb', 'sqlite'].includes(provider)) {
    throw new Error(`Invalid database provider: ${provider}`);
  }

  const currentProvider = dbConnector.activeProvider;

  if (currentProvider !== provider) {
    dbConnector.switchProvider(provider);
    console.log(`Switched database provider from ${currentProvider} to ${provider}`);
  }

  return currentProvider;
}

module.exports = {
  setupTestDatabase,
  cleanDatabase,
  switchDatabaseProvider,
  TEST_API_KEY
};