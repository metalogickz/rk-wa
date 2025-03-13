#!/usr/bin/env node

/**
 * Скрипт для миграции данных между MongoDB и SQLite
 * Позволяет переносить данные из одной базы в другую
 */

require('dotenv').config();
const { PrismaClient: MongoDBPrismaClient } = require('@prisma/client');
const { PrismaClient: SQLitePrismaClient } = require('../prisma/generated/sqlite-client');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

// Создаем интерфейс для ввода данных пользователем
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Функция для запроса данных от пользователя
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Преобразование JSON полей для SQLite
function prepareJsonForSQLite(data) {
  if (typeof data === 'object' && data !== null) {
    return JSON.stringify(data);
  }
  return data;
}

// Преобразование JSON строк из SQLite в объекты
function parseJsonFromSQLite(data) {
  if (typeof data === 'string' && (data.startsWith('{') || data.startsWith('['))) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.warn('Error parsing JSON from SQLite:', e.message);
      return data;
    }
  }
  return data;
}

// Перенос данных из MongoDB в SQLite
async function migrateFromMongoToSQLite() {
  console.log('Migrating data from MongoDB to SQLite...');
  
  const mongoPrisma = new MongoDBPrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });
  
  const sqlitePrisma = new SQLitePrismaClient({
    datasources: {
      db: {
        url: process.env.SQLITE_DATABASE_URL
      }
    }
  });
  
  try {
    // Сначала получим всех пользователей
    console.log('Fetching users from MongoDB...');
    const users = await mongoPrisma.user.findMany();
    console.log(`Found ${users.length} users`);
    
    // Перенос пользователей
    console.log('Migrating users...');
    for (const user of users) {
      // Проверка наличия пользователя в SQLite
      const existingUser = await sqlitePrisma.user.findUnique({
        where: { email: user.email }
      });
      
      if (existingUser) {
        console.log(`User ${user.email} already exists in SQLite, skipping`);
        continue;
      }
      
      // Создаем пользователя в SQLite
      await sqlitePrisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          apiKey: user.apiKey,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
      
      console.log(`Migrated user: ${user.email}`);
    }
    
    // Получаем инстансы
    console.log('Fetching instances from MongoDB...');
    const instances = await mongoPrisma.instance.findMany();
    console.log(`Found ${instances.length} instances`);
    
    // Перенос инстансов
    console.log('Migrating instances...');
    for (const instance of instances) {
      // Проверка наличия инстанса в SQLite
      const existingInstance = await sqlitePrisma.instance.findUnique({
        where: { id: instance.id }
      });
      
      if (existingInstance) {
        console.log(`Instance ${instance.id} already exists in SQLite, skipping`);
        continue;
      }
      
      // Создаем инстанс в SQLite
      await sqlitePrisma.instance.create({
        data: {
          id: instance.id,
          name: instance.name,
          description: instance.description,
          userId: instance.userId,
          status: instance.status,
          qrCode: instance.qrCode,
          webhookUrl: instance.webhookUrl,
          webhookEnabled: instance.webhookEnabled,
          sentMessages: instance.sentMessages,
          receivedMessages: instance.receivedMessages,
          lastActivity: instance.lastActivity,
          authCreatedAt: instance.authCreatedAt,
          authExpiresAt: instance.authExpiresAt,
          authRefreshToken: instance.authRefreshToken,
          createdAt: instance.createdAt,
          updatedAt: instance.updatedAt
        }
      });
      
      console.log(`Migrated instance: ${instance.id}`);
    }
    
    // Получаем webhook settings
    console.log('Fetching webhook settings from MongoDB...');
    const webhookSettings = await mongoPrisma.webhookSettings.findMany();
    console.log(`Found ${webhookSettings.length} webhook settings`);
    
    // Перенос настроек вебхуков
    console.log('Migrating webhook settings...');
    for (const settings of webhookSettings) {
      // Проверка наличия настроек в SQLite
      const existingSettings = await sqlitePrisma.webhookSettings.findUnique({
        where: { instanceId: settings.instanceId }
      });
      
      if (existingSettings) {
        console.log(`Webhook settings for instance ${settings.instanceId} already exists in SQLite, skipping`);
        continue;
      }
      
      // Создаем настройки в SQLite
      await sqlitePrisma.webhookSettings.create({
        data: {
          id: settings.id,
          instanceId: settings.instanceId,
          notifyReceived: settings.notifyReceived,
          notifySent: settings.notifySent,
          notifyDelivery: settings.notifyDelivery,
          notifyRead: settings.notifyRead,
          maxRetries: settings.maxRetries,
          retryInterval: settings.retryInterval,
          secret: settings.secret,
          headers: settings.headers ? prepareJsonForSQLite(settings.headers) : null,
          createdAt: settings.createdAt,
          updatedAt: settings.updatedAt
        }
      });
      
      console.log(`Migrated webhook settings for instance: ${settings.instanceId}`);
    }
    
    // Получаем сообщения (с опциональным лимитом)
    const migrateMessages = await question('Do you want to migrate messages? (y/n): ');
    if (migrateMessages.toLowerCase() === 'y') {
      const messageLimit = parseInt(await question('How many messages to migrate per instance? (0 for all): '));
      
      // Для каждого инстанса мигрируем сообщения
      for (const instance of instances) {
        console.log(`Fetching messages for instance ${instance.id}...`);
        
        const messagesQuery = {
          where: { instanceId: instance.id },
          orderBy: { createdAt: 'desc' }
        };
        
        if (messageLimit > 0) {
          messagesQuery.take = messageLimit;
        }
        
        const messages = await mongoPrisma.message.findMany(messagesQuery);
        console.log(`Found ${messages.length} messages for instance ${instance.id}`);
        
        if (messages.length === 0) continue;
        
        console.log(`Migrating messages for instance ${instance.id}...`);
        for (const message of messages) {
          // Проверка наличия сообщения в SQLite
          const existingMessage = await sqlitePrisma.message.findFirst({
            where: { 
              instanceId: message.instanceId,
              messageId: message.messageId
            }
          });
          
          if (existingMessage) {
            continue; // Skip existing
          }
          
          // Создаем сообщение в SQLite
          await sqlitePrisma.message.create({
            data: {
              id: message.id,
              instanceId: message.instanceId,
              remoteJid: message.remoteJid,
              fromMe: message.fromMe,
              messageType: message.messageType,
              content: message.content,
              messageId: message.messageId,
              hasMedia: message.hasMedia,
              mediaUrl: message.mediaUrl,
              caption: message.caption,
              mimeType: message.mimeType,
              fileName: message.fileName,
              status: message.status,
              statusUpdatedAt: message.statusUpdatedAt,
              metadata: message.metadata ? prepareJsonForSQLite(message.metadata) : null,
              createdAt: message.createdAt,
              updatedAt: message.updatedAt
            }
          });
        }
        
        console.log(`Migrated ${messages.length} messages for instance ${instance.id}`);
      }
    }
    
    // Получаем активности
    const migrateActivity = await question('Do you want to migrate activity logs? (y/n): ');
    if (migrateActivity.toLowerCase() === 'y') {
      const activityLimit = parseInt(await question('How many activity logs to migrate per instance? (0 for all): '));
      
      for (const instance of instances) {
        console.log(`Fetching activity logs for instance ${instance.id}...`);
        
        const activityQuery = {
          where: { instanceId: instance.id },
          orderBy: { createdAt: 'desc' }
        };
        
        if (activityLimit > 0) {
          activityQuery.take = activityLimit;
        }
        
        const activities = await mongoPrisma.activityLog.findMany(activityQuery);
        console.log(`Found ${activities.length} activity logs for instance ${instance.id}`);
        
        if (activities.length === 0) continue;
        
        console.log(`Migrating activity logs for instance ${instance.id}...`);
        for (const activity of activities) {
          // Создаем запись активности в SQLite
          await sqlitePrisma.activityLog.create({
            data: {
              id: activity.id,
              instanceId: activity.instanceId,
              action: activity.action,
              details: activity.details ? prepareJsonForSQLite(activity.details) : null,
              createdAt: activity.createdAt
            }
          });
        }
        
        console.log(`Migrated ${activities.length} activity logs for instance ${instance.id}`);
      }
    }
    
    console.log('Migration from MongoDB to SQLite completed!');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await mongoPrisma.$disconnect();
    await sqlitePrisma.$disconnect();
  }
}

// Перенос данных из SQLite в MongoDB
async function migrateFromSQLiteToMongo() {
  console.log('Migrating data from SQLite to MongoDB...');
  
  const sqlitePrisma = new SQLitePrismaClient({
    datasources: {
      db: {
        url: process.env.SQLITE_DATABASE_URL
      }
    }
  });
  
  const mongoPrisma = new MongoDBPrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });
  
  try {
    // Сначала получим всех пользователей
    console.log('Fetching users from SQLite...');
    const users = await sqlitePrisma.user.findMany();
    console.log(`Found ${users.length} users`);
    
    // Перенос пользователей
    console.log('Migrating users...');
    for (const user of users) {
      // Проверка наличия пользователя в MongoDB
      const existingUser = await mongoPrisma.user.findUnique({
        where: { email: user.email }
      });
      
      if (existingUser) {
        console.log(`User ${user.email} already exists in MongoDB, skipping`);
        continue;
      }
      
      // Создаем пользователя в MongoDB
      await mongoPrisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          apiKey: user.apiKey,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
      
      console.log(`Migrated user: ${user.email}`);
    }
    
    // Получаем инстансы
    console.log('Fetching instances from SQLite...');
    const instances = await sqlitePrisma.instance.findMany();
    console.log(`Found ${instances.length} instances`);
    
    // Перенос инстансов
    console.log('Migrating instances...');
    for (const instance of instances) {
      // Проверка наличия инстанса в MongoDB
      const existingInstance = await mongoPrisma.instance.findUnique({
        where: { id: instance.id }
      });
      
      if (existingInstance) {
        console.log(`Instance ${instance.id} already exists in MongoDB, skipping`);
        continue;
      }
      
      // Создаем инстанс в MongoDB
      await mongoPrisma.instance.create({
        data: {
          id: instance.id,
          name: instance.name,
          description: instance.description,
          userId: instance.userId,
          status: instance.status,
          qrCode: instance.qrCode,
          webhookUrl: instance.webhookUrl,
          webhookEnabled: instance.webhookEnabled,
          sentMessages: instance.sentMessages,
          receivedMessages: instance.receivedMessages,
          lastActivity: instance.lastActivity,
          authCreatedAt: instance.authCreatedAt,
          authExpiresAt: instance.authExpiresAt,
          authRefreshToken: instance.authRefreshToken,
          createdAt: instance.createdAt,
          updatedAt: instance.updatedAt
        }
      });
      
      console.log(`Migrated instance: ${instance.id}`);
    }
    
    // Получаем webhook settings
    console.log('Fetching webhook settings from SQLite...');
    const webhookSettings = await sqlitePrisma.webhookSettings.findMany();
    console.log(`Found ${webhookSettings.length} webhook settings`);
    
    // Перенос настроек вебхуков
    console.log('Migrating webhook settings...');
    for (const settings of webhookSettings) {
      // Проверка наличия настроек в MongoDB
      const existingSettings = await mongoPrisma.webhookSettings.findUnique({
        where: { instanceId: settings.instanceId }
      });
      
      if (existingSettings) {
        console.log(`Webhook settings for instance ${settings.instanceId} already exists in MongoDB, skipping`);
        continue;
      }
      
      // Создаем настройки в MongoDB
      await mongoPrisma.webhookSettings.create({
        data: {
          id: settings.id,
          instanceId: settings.instanceId,
          notifyReceived: settings.notifyReceived,
          notifySent: settings.notifySent,
          notifyDelivery: settings.notifyDelivery,
          notifyRead: settings.notifyRead,
          maxRetries: settings.maxRetries,
          retryInterval: settings.retryInterval,
          secret: settings.secret,
          headers: settings.headers ? parseJsonFromSQLite(settings.headers) : null,
          createdAt: settings.createdAt,
          updatedAt: settings.updatedAt
        }
      });
      
      console.log(`Migrated webhook settings for instance: ${settings.instanceId}`);
    }
    
    // Получаем сообщения (с опциональным лимитом)
    const migrateMessages = await question('Do you want to migrate messages? (y/n): ');
    if (migrateMessages.toLowerCase() === 'y') {
      const messageLimit = parseInt(await question('How many messages to migrate per instance? (0 for all): '));
      
      for (const instance of instances) {
        console.log(`Fetching messages for instance ${instance.id}...`);
        
        const messagesQuery = {
          where: { instanceId: instance.id },
          orderBy: { createdAt: 'desc' }
        };
        
        if (messageLimit > 0) {
          messagesQuery.take = messageLimit;
        }
        
        const messages = await sqlitePrisma.message.findMany(messagesQuery);
        console.log(`Found ${messages.length} messages for instance ${instance.id}`);
        
        if (messages.length === 0) continue;
        
        console.log(`Migrating messages for instance ${instance.id}...`);
        for (const message of messages) {
          // Проверка наличия сообщения в MongoDB
          const existingMessage = await mongoPrisma.message.findFirst({
            where: { 
              instanceId: message.instanceId,
              messageId: message.messageId
            }
          });
          
          if (existingMessage) {
            continue; // Skip existing
          }
          
          // Создаем сообщение в MongoDB
          await mongoPrisma.message.create({
            data: {
              id: message.id,
              instanceId: message.instanceId,
              remoteJid: message.remoteJid,
              fromMe: message.fromMe,
              messageType: message.messageType,
              content: message.content,
              messageId: message.messageId,
              hasMedia: message.hasMedia,
              mediaUrl: message.mediaUrl,
              caption: message.caption,
              mimeType: message.mimeType,
              fileName: message.fileName,
              status: message.status,
              statusUpdatedAt: message.statusUpdatedAt,
              metadata: message.metadata ? parseJsonFromSQLite(message.metadata) : null,
              createdAt: message.createdAt,
              updatedAt: message.updatedAt
            }
          });
        }
        
        console.log(`Migrated ${messages.length} messages for instance ${instance.id}`);
      }
    }
    
    // Получаем активности
    const migrateActivity = await question('Do you want to migrate activity logs? (y/n): ');
    if (migrateActivity.toLowerCase() === 'y') {
      const activityLimit = parseInt(await question('How many activity logs to migrate per instance? (0 for all): '));
      
      for (const instance of instances) {
        console.log(`Fetching activity logs for instance ${instance.id}...`);
        
        const activityQuery = {
          where: { instanceId: instance.id },
          orderBy: { createdAt: 'desc' }
        };
        
        if (activityLimit > 0) {
          activityQuery.take = activityLimit;
        }
        
        const activities = await sqlitePrisma.activityLog.findMany(activityQuery);
        console.log(`Found ${activities.length} activity logs for instance ${instance.id}`);
        
        if (activities.length === 0) continue;
        
        console.log(`Migrating activity logs for instance ${instance.id}...`);
        for (const activity of activities) {
          // Создаем запись активности в MongoDB
          await mongoPrisma.activityLog.create({
            data: {
              id: activity.id,
              instanceId: activity.instanceId,
              action: activity.action,
              details: activity.details ? parseJsonFromSQLite(activity.details) : null,
              createdAt: activity.createdAt
            }
          });
        }
        
        console.log(`Migrated ${activities.length} activity logs for instance ${instance.id}`);
      }
    }
    
    console.log('Migration from SQLite to MongoDB completed!');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await sqlitePrisma.$disconnect();
    await mongoPrisma.$disconnect();
  }
}

// Основная функция
async function main() {
  console.log('WhatsApp Multi-Instance API - Database Migration Tool');
  console.log('---------------------------------------------------');
  
  // Проверяем наличие переменных окружения
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not defined in .env file');
    rl.close();
    process.exit(1);
  }
  
  if (!process.env.SQLITE_DATABASE_URL) {
    console.error('SQLITE_DATABASE_URL not defined in .env file');
    rl.close();
    process.exit(1);
  }
  
  // Выбор направления миграции
  console.log('\nSelect migration direction:');
  console.log('1. MongoDB → SQLite');
  console.log('2. SQLite → MongoDB');
  
  const direction = await question('Enter your choice (1 or 2): ');
  
  if (direction === '1') {
    await migrateFromMongoToSQLite();
  } else if (direction === '2') {
    await migrateFromSQLiteToMongo();
  } else {
    console.error('Invalid choice. Please run the script again and select 1 or 2.');
  }
  
  rl.close();
}

// Запуск с обработкой ошибок
main()
  .catch((e) => {
    console.error('Error during migration:', e);
    process.exit(1);
  })
  .finally(() => {
    rl.close();
  });