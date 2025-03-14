FROM node:20-slim

# Установка необходимых зависимостей для baileys
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
    && rm -rf /var/lib/apt/lists/*

# Рабочая директория приложения
WORKDIR /usr/src/app

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование папки prisma со схемами 
COPY prisma ./prisma/

# Копирование остальных файлов проекта
COPY . .

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

# Создаем скрипт для запуска, который будет инициализировать базу данных
RUN echo '#!/bin/bash\n\
# Создаем директорию для данных\n\
mkdir -p /usr/src/app/data\n\
chmod -R 777 /usr/src/app/data\n\
\n\
# Инициализируем базу данных SQLite\n\
if [ ! -f "$SQLITE_DATABASE_URL" ] || [ ! -s "$SQLITE_DATABASE_URL" ]; then\n\
  echo "Initializing SQLite database..."\n\
  npx prisma db push --schema=./prisma/schema.sqlite.prisma --skip-generate --accept-data-loss\n\
  echo "SQLite database initialized successfully!"\n\
fi\n\
\n\
# Запускаем основное приложение\n\
exec node src/app.js\n\
' > /usr/src/app/start.sh && chmod +x /usr/src/app/start.sh

# Запуск приложения через shell скрипт
CMD ["/bin/bash", "/usr/src/app/start.sh"]