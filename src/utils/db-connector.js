const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');  // Добавьте этот импорт
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient: MongoDBPrismaClient } = require('@prisma/client');
const { PrismaClient: SQLitePrismaClient } = require('../../prisma/generated/sqlite-client');
const logger = require('./logger');

/**
 * Database connector factory that provides the appropriate Prisma client
 * based on the selected database provider
 */
class DBConnector {
  constructor() {
    this.mongoClient = null;
    this.sqliteClient = null;
    this.activeProvider = process.env.DATABASE_PROVIDER || 'mongodb';

    logger.info(`Initializing database connector with provider: ${this.activeProvider}`);
  }

  /**
   * Инициализация базы данных
   */
  async initialize() {
    try {
      switch (this.activeProvider) {
        case 'mongodb':
          await this.initializeMongoDB();
          break;
        case 'sqlite':
          await this.initializeSQLite();
          break;
        default:
          throw new Error(`Unsupported database provider: ${this.activeProvider}`);
      }

      // Создание начального администратора
      await this.createInitialAdmin();
    } catch (error) {
      logger.error('Database initialization failed', {
        provider: this.activeProvider,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  /**
   * Инициализация MongoDB
   * @private
   */
  async initializeMongoDB() {
    try {
      // Выполнение миграции для MongoDB
      execSync('npx prisma db push --schema=./prisma/schema.prisma', {
        stdio: 'inherit'
      });

      // Генерация клиента Prisma
      execSync('npx prisma generate', {
        stdio: 'inherit'
      });

      logger.info('MongoDB database initialized successfully');
    } catch (error) {
      logger.error('MongoDB initialization failed', {
        error: error.message
      });
      throw error;
    }
  }

  /**
   * Инициализация SQLite
   * @private
   */
  async initializeSQLite() {
    try {
      // Путь к базе данных
      const dbUrl = process.env.SQLITE_DATABASE_URL || 'file:./data/whatsapp-api.db';
      const dbPath = dbUrl.replace('file:', '');
      const dbDir = path.dirname(dbPath);

      // Создаем директорию, если не существует
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      // Проверяем существование базы данных
      if (fs.existsSync(dbPath)) {
        // Если база данных существует, делаем резервную копию
        const backupPath = `${dbPath}.backup_${Date.now()}`;
        fs.copyFileSync(dbPath, backupPath);
        logger.info(`Created backup of existing database: ${backupPath}`);

        // Удаляем существующую базу данных
        fs.unlinkSync(dbPath);
      }

      // Выполнение миграции для SQLite
      execSync('npx prisma db push --schema=./prisma/schema.sqlite.prisma', {
        stdio: 'inherit'
      });

      // Генерация клиента Prisma для SQLite
      execSync('npx prisma generate --schema=./prisma/schema.sqlite.prisma', {
        stdio: 'inherit'
      });

      logger.info('SQLite database initialized successfully');
    } catch (error) {
      logger.error('SQLite initialization failed', {
        error: error.message
      });
      throw error;
    }
  }

  /**
   * Создание начального администратора
   * @private
   */
  async createInitialAdmin() {
    try {
      const prisma = this.getClient();

      // Данные администратора из переменных окружения
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const adminFirstName = process.env.ADMIN_FIRST_NAME || 'Admin';
      const adminLastName = process.env.ADMIN_LAST_NAME || 'User';

      // Проверяем существование администратора
      const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail }
      });

      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const apiKey = uuidv4();

        await prisma.user.create({
          data: {
            email: adminEmail,
            password: hashedPassword,
            firstName: adminFirstName,
            lastName: adminLastName,
            apiKey,
            isAdmin: true
          }
        });

        logger.info('Initial admin user created', {
          email: adminEmail,
          apiKey: apiKey
        });
      } else {
        logger.info('Admin user already exists');
      }
    } catch (error) {
      logger.error('Error creating initial admin', {
        error: error.message
      });
      throw error;
    }
  }

  /**
   * Get the appropriate Prisma client instance based on the active provider
   * @returns {PrismaClient} The Prisma client instance
   */
  getClient() {
    if (this.activeProvider === 'sqlite') {
      if (!this.sqliteClient) {
        logger.info('Creating new SQLite Prisma client');
        this.sqliteClient = new SQLitePrismaClient({
          datasources: {
            db: {
              url: process.env.SQLITE_DATABASE_URL || 'file:./data/whatsapp-api.db'
            }
          },
          log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
        });
      }
      return this.sqliteClient;
    } else {
      // Default to MongoDB
      if (!this.mongoClient) {
        logger.info('Creating new MongoDB Prisma client');
        this.mongoClient = new MongoDBPrismaClient({
          datasources: {
            db: {
              url: process.env.DATABASE_URL
            }
          },
          log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
        });
      }
      return this.mongoClient;
    }
  }

  /**
   * Switch the active database provider
   * @param {string} provider - The database provider ('mongodb' or 'sqlite')
   */
  switchProvider(provider) {
    if (provider !== 'mongodb' && provider !== 'sqlite') {
      throw new Error(`Unsupported database provider: ${provider}. Supported providers are 'mongodb' and 'sqlite'.`);
    }

    logger.info(`Switching database provider from ${this.activeProvider} to ${provider}`);
    this.activeProvider = provider;

    // Return the appropriate client
    return this.getClient();
  }

  /**
   * Disconnect from all database clients
   */
  async disconnect() {
    if (this.mongoClient) {
      logger.info('Disconnecting MongoDB Prisma client');
      await this.mongoClient.$disconnect();
      this.mongoClient = null;
    }

    if (this.sqliteClient) {
      logger.info('Disconnecting SQLite Prisma client');
      await this.sqliteClient.$disconnect();
      this.sqliteClient = null;
    }
  }

  /**
   * Handles JSON data conversion for SQLite
   * SQLite doesn't support native JSON storage, so we need to serialize/deserialize
   * 
   * @param {Object|string} data - Data to process
   * @param {boolean} toJson - Whether to convert to JSON string (true) or parse from JSON string (false)
   * @returns {string|Object} - Processed data
   */
  handleJsonData(data, toJson = true) {
    if (this.activeProvider !== 'sqlite') {
      return data; // No conversion needed for MongoDB
    }

    try {
      if (toJson && data && typeof data === 'object') {
        // Convert object to JSON string for SQLite
        return JSON.stringify(data);
      } else if (!toJson && data && typeof data === 'string') {
        // Parse JSON string from SQLite
        return JSON.parse(data);
      }
    } catch (error) {
      logger.error('Error handling JSON data conversion', {
        error: error.message,
        data: typeof data
      });
    }

    return data;
  }
}

// Export singleton instance
module.exports = new DBConnector();