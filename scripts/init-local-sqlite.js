const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Initializing SQLite database...');

// Путь к базе данных
const dbUrl = process.env.SQLITE_DATABASE_URL || 'file:./data/whatsapp-api.db';
const dbPath = dbUrl.replace('file:', '');
const dbDir = path.dirname(dbPath);

// Создаем директорию, если не существует
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

try {
  // Выполняем миграцию
  execSync('npx prisma db push --schema=./prisma/schema.sqlite.prisma', {
    stdio: 'inherit'
  });

  // Генерируем клиент Prisma
  execSync('npx prisma generate --schema=./prisma/schema.sqlite.prisma', {
    stdio: 'inherit'
  });

  console.log('SQLite database initialized successfully');
} catch (error) {
  console.error('Failed to initialize SQLite database:', error);
  process.exit(1);
}