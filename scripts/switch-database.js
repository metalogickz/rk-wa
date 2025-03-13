#!/usr/bin/env node

/**
 * Скрипт для быстрого переключения между типами баз данных
 * Удобная утилита для командной строки
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Создаем интерфейс для ввода данных пользователем
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Функция для запроса данных от пользователя
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Функция для записи в файл .env
function updateEnvFile(provider) {
  const envPath = path.join(__dirname, '../.env');
  
  if (!fs.existsSync(envPath)) {
    console.error('Error: .env file not found. Please create it first.');
    process.exit(1);
  }
  
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Обновляем переменную DATABASE_PROVIDER
  if (envContent.includes('DATABASE_PROVIDER=')) {
    envContent = envContent.replace(/DATABASE_PROVIDER=.*$/m, `DATABASE_PROVIDER=${provider}`);
  } else {
    envContent += `\nDATABASE_PROVIDER=${provider}`;
  }
  
  // Записываем обновленное содержимое
  fs.writeFileSync(envPath, envContent);
  console.log(`Updated .env file with DATABASE_PROVIDER=${provider}`);
}

// Функция для проверки доступности базы данных
function checkDatabaseUrl(provider) {
  if (provider === 'mongodb' && !process.env.DATABASE_URL) {
    return false;
  }
  
  if (provider === 'sqlite' && !process.env.SQLITE_DATABASE_URL) {
    return false;
  }
  
  return true;
}

// Основная функция
async function main() {
  console.log('WhatsApp Multi-Instance API - Database Switch Tool');
  console.log('------------------------------------------------');
  
  // Получаем текущий провайдер
  const currentProvider = process.env.DATABASE_PROVIDER || 'mongodb';
  console.log(`Current database provider: ${currentProvider}`);
  
  // Запрашиваем выбор нового провайдера
  const newProvider = (await question('Switch to (mongodb/sqlite): ')).toLowerCase();
  
  if (newProvider !== 'mongodb' && newProvider !== 'sqlite') {
    console.error('Error: Invalid provider. Use "mongodb" or "sqlite".');
    process.exit(1);
  }
  
  if (newProvider === currentProvider) {
    console.log(`Already using ${newProvider} as database provider.`);
    process.exit(0);
  }
  
  // Проверяем наличие необходимых URL
  if (!checkDatabaseUrl(newProvider)) {
    console.error(`Error: Missing ${newProvider === 'mongodb' ? 'DATABASE_URL' : 'SQLITE_DATABASE_URL'} in .env file.`);
    process.exit(1);
  }
  
  // Обновляем .env файл
  updateEnvFile(newProvider);
  
  // Проверяем, нужно ли сгенерировать клиент для выбранной базы
  if (newProvider === 'sqlite') {
    const sqliteClientDir = path.join(__dirname, '../prisma/generated/sqlite-client');
    
    if (!fs.existsSync(sqliteClientDir)) {
      console.log('SQLite Prisma client not found. Generating...');
      try {
        execSync('npm run prisma:generate:sqlite', { stdio: 'inherit' });
        console.log('SQLite Prisma client generated successfully');
      } catch (error) {
        console.error('Error generating SQLite Prisma client:', error.message);
        process.exit(1);
      }
    }
  }
  
  // Если сервер запущен, нужно перезапустить его
  console.log(`\nDatabase provider switched to ${newProvider}`);
  console.log('\nIMPORTANT:');
  console.log('1. If the server is running, you need to restart it for changes to take effect');
  console.log('2. Make sure the database is properly initialized');
  
  rl.close();
}

// Запуск скрипта
main()
  .catch((e) => {
    console.error('Error:', e.message);
    process.exit(1);
  })
  .finally(() => {
    rl.close();
  });