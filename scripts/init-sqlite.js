// init-sqlite.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting SQLite initialization script');

// Получаем путь к базе данных из переменной окружения
const dbUrl = process.env.SQLITE_DATABASE_URL || 'file:/usr/src/app/data/whatsapp-api.db';
const dbPath = dbUrl.replace('file:', '');
const dbDir = path.dirname(dbPath);

console.log(`Database path: ${dbPath}`);

// Создаем директорию, если не существует
if (!fs.existsSync(dbDir)) {
  console.log(`Creating directory: ${dbDir}`);
  fs.mkdirSync(dbDir, { recursive: true });
}

// Проверяем существование базы данных
const dbExists = fs.existsSync(dbPath);
console.log(`Database exists: ${dbExists}`);

// Если база данных не существует или пуста, выполняем миграцию
if (!dbExists || fs.statSync(dbPath).size === 0) {
  console.log('Initializing SQLite database...');
  try {
    execSync('npx prisma db push --schema=./prisma/schema.sqlite.prisma --skip-generate', {
      stdio: 'inherit',
      env: { ...process.env }
    });
    console.log('SQLite database initialized successfully!');
  } catch (error) {
    console.error('Failed to initialize SQLite database:', error);
    process.exit(1);
  }
} else {
  console.log('SQLite database already exists, skipping initialization.');
}