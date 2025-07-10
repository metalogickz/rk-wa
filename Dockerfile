FROM node:20-slim

# Установка необходимых зависимостей для baileys и git
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    xdg-utils \
    curl \
    git \
    sqlite3 \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Рабочая директория приложения
WORKDIR /usr/src/app

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование папки prisma со схемами 
COPY prisma ./prisma/

# Создаем .dockerignore, чтобы исключить .env файл
RUN echo ".env\n.env.*" > .dockerignore

# Копирование остальных файлов проекта, исключая .env файлы
COPY --chown=node:node . .

# Генерация Prisma клиентов
RUN npx prisma generate
RUN npx prisma generate --schema=./prisma/schema.sqlite.prisma

# Создание директорий для данных
RUN mkdir -p instances uploads logs data
RUN chmod -R 777 data

# Настройка томов для хранения данных
VOLUME ["/usr/src/app/instances", "/usr/src/app/uploads", "/usr/src/app/logs", "/usr/src/app/data"]

# Порт приложения
EXPOSE 3000

# Создаем скрипт для запуска, который будет инициализировать базу данных и создавать администратора
RUN echo '#!/bin/bash\n\
# Создаем директорию для данных\n\
mkdir -p /usr/src/app/data\n\
chmod -R 777 /usr/src/app/data\n\
\n\
# Создаем директорию для публичных файлов\n\
mkdir -p /usr/src/app/src/public\n\
mkdir -p /usr/src/app/src/public/css\n\
mkdir -p /usr/src/app/src/public/js\n\
\n\
# Выводим информацию о переменных окружения\n\
echo "Current environment variables:"\n\
echo "DATABASE_PROVIDER: ${DATABASE_PROVIDER}"\n\
echo "DATABASE_URL: ${DATABASE_URL}"\n\
echo "SQLITE_DATABASE_URL: ${SQLITE_DATABASE_URL}"\n\
echo "ADMIN_EMAIL: ${ADMIN_EMAIL:-admin@example.com}"\n\
\n\
# Инициализируем базу данных SQLite\n\
if [ "$DATABASE_PROVIDER" = "sqlite" ]; then\n\
  echo "Initializing SQLite database..."\n\
  node scripts/init-sqlite.js\n\
  \n\
  # После инициализации базы данных создаем администратора\n\
  echo "Creating default admin user for SQLite..."\n\
  ADMIN_EMAIL=${ADMIN_EMAIL:-"admin@example.com"} \\\n\
  ADMIN_PASSWORD=${ADMIN_PASSWORD:-"admin123"} \\\n\
  ADMIN_FIRST_NAME=${ADMIN_FIRST_NAME:-"Admin"} \\\n\
  ADMIN_LAST_NAME=${ADMIN_LAST_NAME:-"User"} \\\n\
  node scripts/init-admin.js\n\
  \n\
  # Проверяем, был ли создан пользователь\n\
  echo "Checking if the user was created in SQLite:"\n\
  if [ -f "$SQLITE_DATABASE_URL" ]; then\n\
    echo "SQLite database exists at: $SQLITE_DATABASE_URL"\n\
    if [ -x "$(command -v sqlite3)" ]; then\n\
      echo "Checking users table with sqlite3:"\n\
      sqlite3 $SQLITE_DATABASE_URL "SELECT id, email, firstName, lastName FROM users;"\n\
    else\n\
      echo "sqlite3 not found, cannot check database content"\n\
    fi\n\
  else\n\
    echo "SQLite database file not found at $SQLITE_DATABASE_URL"\n\
  fi\n\
elif [ "$DATABASE_PROVIDER" = "mongodb" ]; then\n\
  echo "Using MongoDB database..."\n\
  echo "Waiting for MongoDB to be ready..."\n\
  # Ждем, пока MongoDB станет доступен\n\
  until nc -z mongodb 27017; do\n\
    echo "Waiting for MongoDB..."\n\
    sleep 2\n\
  done\n\
  echo "MongoDB is ready!"\n\
  \n\
  # Создаем администратора для MongoDB\n\
  echo "Creating default admin user for MongoDB..."\n\
  ADMIN_EMAIL=${ADMIN_EMAIL:-"admin@example.com"} \\\n\
  ADMIN_PASSWORD=${ADMIN_PASSWORD:-"admin123"} \\\n\
  ADMIN_FIRST_NAME=${ADMIN_FIRST_NAME:-"Admin"} \\\n\
  ADMIN_LAST_NAME=${ADMIN_LAST_NAME:-"User"} \\\n\
  node scripts/init-admin.js\n\
else\n\
  echo "Using default database provider..."\n\
  # Создаем администратора по умолчанию\n\
  echo "Creating default admin user..."\n\
  ADMIN_EMAIL=${ADMIN_EMAIL:-"admin@example.com"} \\\n\
  ADMIN_PASSWORD=${ADMIN_PASSWORD:-"admin123"} \\\n\
  ADMIN_FIRST_NAME=${ADMIN_FIRST_NAME:-"Admin"} \\\n\
  ADMIN_LAST_NAME=${ADMIN_LAST_NAME:-"User"} \\\n\
  node scripts/init-admin.js\n\
fi\n\
\n\
# Устанавливаем sqlite3, если он не установлен (для диагностики)\n\
if ! [ -x "$(command -v sqlite3)" ]; then\n\
  echo "Installing sqlite3 for diagnostics..."\n\
  apt-get update && apt-get install -y sqlite3\n\
fi\n\
\n\
# Запускаем основное приложение\n\
echo "Starting main application..."\n\
exec node src/app.js\n\
' > /usr/src/app/start.sh && chmod +x /usr/src/app/start.sh

# Запуск приложения через shell скрипт
CMD ["/bin/bash", "/usr/src/app/start.sh"]