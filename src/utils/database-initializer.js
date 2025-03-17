const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger');

class DatabaseInitializer {
  /**
   * Инициализация и проверка базы данных
   * @param {string} provider - Провайдер базы данных ('mongodb' или 'sqlite')
   */
  static initialize(provider) {
    logger.info(`Initializing database for provider: ${provider}`);

    try {
      switch (provider) {
        case 'mongodb':
          this.initializeMongoDB();
          break;
        case 'sqlite':
          this.initializeSQLite();
          break;
        default:
          throw new Error(`Unsupported database provider: ${provider}`);
      }
    } catch (error) {
      logger.error('Database initialization failed', {
        provider,
        error: error.message,
        stack: error.stack
      });
      process.exit(1);
    }
  }

  /**
   * Инициализация MongoDB
   */
  static initializeMongoDB() {
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
   */
  static initializeSQLite() {
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
   */
  static async createInitialAdmin() {
    try {
      const { PrismaClient } = require('@prisma/client');
      const bcrypt = require('bcrypt');
      const { v4: uuidv4 } = require('uuid');

      const prisma = new PrismaClient();

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

      await prisma.$disconnect();
    } catch (error) {
      logger.error('Error creating initial admin', {
        error: error.message
      });
      throw error;
    }
  }
}

module.exports = DatabaseInitializer;