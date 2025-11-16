FROM node:20-alpine

# Устанавливаем необходимые утилиты через apk (быстро и надежно)
RUN apk add --no-cache \
    git \
    wget \
    sqlite \
    openssl

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

# Создаем скрипт запуска (на Alpine используем /bin/sh)
RUN echo '#!/bin/sh\n\
  mkdir -p /usr/src/app/data\n\
  chmod -R 777 /usr/src/app/data\n\
  mkdir -p /usr/src/app/src/public /usr/src/app/src/public/css /usr/src/app/src/public/js\n\
  echo "Current environment variables:"\n\
  echo "DATABASE_PROVIDER: ${DATABASE_PROVIDER}"\n\
  echo "DATABASE_URL: ${DATABASE_URL}"\n\
  echo "SQLITE_DATABASE_URL: ${SQLITE_DATABASE_URL}"\n\
  echo "ADMIN_EMAIL: ${ADMIN_EMAIL:-admin@example.com}"\n\
  if [ "$DATABASE_PROVIDER" = "sqlite" ]; then\n\
    echo "Initializing SQLite database..."\n\
    node scripts/init-sqlite.js\n\
    echo "Creating default admin user for SQLite..."\n\
    ADMIN_EMAIL=${ADMIN_EMAIL:-"admin@example.com"} \\\n\
    ADMIN_PASSWORD=${ADMIN_PASSWORD:-"admin123"} \\\n\
    ADMIN_FIRST_NAME=${ADMIN_FIRST_NAME:-"Admin"} \\\n\
    ADMIN_LAST_NAME=${ADMIN_LAST_NAME:-"User"} \\\n\
    node scripts/init-admin.js\n\
    if [ -n "$SQLITE_DATABASE_URL" ] && [ -f "$SQLITE_DATABASE_URL" ]; then\n\
      echo "SQLite database exists at: $SQLITE_DATABASE_URL"\n\
      if command -v sqlite3 >/dev/null 2>&1; then\n\
        echo "Checking users table with sqlite3:"\n\
        sqlite3 $SQLITE_DATABASE_URL "SELECT id, email, firstName, lastName FROM users;"\n\
      else\n\
        echo "sqlite3 not found, cannot check database content"\n\
      fi\n\
    else\n\
      echo "SQLite database file not found at $SQLITE_DATABASE_URL"\n\
    fi\n\
  else\n\
    echo "Using default database provider..."\n\
    echo "Creating default admin user..."\n\
    ADMIN_EMAIL=${ADMIN_EMAIL:-"admin@example.com"} \\\n\
    ADMIN_PASSWORD=${ADMIN_PASSWORD:-"admin123"} \\\n\
    ADMIN_FIRST_NAME=${ADMIN_FIRST_NAME:-"Admin"} \\\n\
    ADMIN_LAST_NAME=${ADMIN_LAST_NAME:-"User"} \\\n\
    node scripts/init-admin.js\n\
  fi\n\
  echo "Starting main application..."\n\
  exec node src/app.js\n\
' > /usr/src/app/start.sh && chmod +x /usr/src/app/start.sh

# На Alpine используем /bin/sh
CMD ["/bin/sh", "/usr/src/app/start.sh"]