# Руководство по развертыванию WhatsApp Multi-Instance API в Docker

В данном руководстве представлены подробные инструкции по развертыванию сервиса WhatsApp Multi-Instance API с использованием Docker. Приложение поддерживает MongoDB и SQLite в качестве провайдеров баз данных.

## Содержание

- [Требования](#требования)
- [Обзор проекта](#обзор-проекта)
- [Быстрый старт](#быстрый-старт)
- [Детальная настройка](#детальная-настройка)
  - [Переменные окружения](#переменные-окружения)
  - [Настройка базы данных](#настройка-базы-данных)
  - [Аутентификация](#аутентификация)
  - [Настройки вебхуков](#настройки-вебхуков)
  - [Cron-задачи](#cron-задачи)
- [Варианты развертывания Docker](#варианты-развертывания-docker)
  - [Использование Docker Compose](#использование-docker-compose)
  - [Использование Docker CLI](#использование-docker-cli)
- [Управление томами](#управление-томами)
- [Проверка работоспособности](#проверка-работоспособности)
- [Логирование](#логирование)
- [Масштабирование](#масштабирование)
- [Резервное копирование и восстановление](#резервное-копирование-и-восстановление)
- [Обновление](#обновление)
- [Устранение неполадок](#устранение-неполадок)
- [Рекомендации по безопасности](#рекомендации-по-безопасности)
- [Документация API](#документация-api)

## Требования

- Docker Engine 20.10.0 или новее
- Docker Compose 2.0.0 или новее (при использовании docker-compose)
- Минимум 2 ГБ свободной оперативной памяти
- 1 ГБ свободного дискового пространства (рекомендуется больше для истории сообщений)
- Интернет-соединение (требуется для подключения к WhatsApp)

## Обзор проекта

Сервис WhatsApp Multi-Instance API позволяет:

- Управлять несколькими экземплярами WhatsApp
- Отправлять и получать сообщения
- Управлять контактами
- Отправлять медиафайлы
- Настраивать вебхуки для уведомлений в реальном времени
- Отслеживать статистику использования

Сервис поддерживает два провайдера баз данных:
- **MongoDB**: Рекомендуется для производственного развертывания
- **SQLite**: Подходит для разработки или небольших развертываний

## Быстрый старт

Для быстрого запуска сервиса с использованием Docker Compose:

1. Создайте новую директорию для проекта:
   ```bash
   mkdir whatsapp-api && cd whatsapp-api
   ```

2. Создайте файл `docker-compose.yml` со следующим содержимым:
   ```yaml
   version: '3'

   services:
     mongodb:
       image: mongo:latest
       ports:
         - "27017:27017"
       environment:
         - MONGO_INITDB_ROOT_USERNAME=whatsapp
         - MONGO_INITDB_ROOT_PASSWORD=whatsapp-password
       volumes:
         - mongodb_data:/data/db
       restart: unless-stopped

     whatsapp-api:
       image: your-registry/whatsapp-api:latest  # Замените на ваш образ
       # Альтернативно используйте build для сборки из Dockerfile
       # build: .
       ports:
         - "3000:3000"
       environment:
         - PORT=3000
         - NODE_ENV=production
         - DATABASE_PROVIDER=sqlite  # или mongodb
         - DATABASE_URL=mongodb://whatsapp:whatsapp-password@mongodb:27017/whatsapp-api?authSource=admin
         - SQLITE_DATABASE_URL=file:/usr/src/app/data/whatsapp-api.db
         - JWT_SECRET=your-jwt-secret-key-here
         - JWT_EXPIRATION=24h
         - ADMIN_EMAIL=admin@example.com
         - ADMIN_PASSWORD=admin123
       volumes:
         - whatsapp_instances:/usr/src/app/instances
         - whatsapp_uploads:/usr/src/app/uploads
         - whatsapp_logs:/usr/src/app/logs
         - whatsapp_data:/usr/src/app/data
       depends_on:
         - mongodb
       restart: unless-stopped

   volumes:
     mongodb_data:
     whatsapp_instances:
     whatsapp_uploads:
     whatsapp_logs:
     whatsapp_data:
   ```

3. Запустите сервис:
   ```bash
   docker-compose up -d
   ```

4. Доступ к API: `http://localhost:3000`

5. Учетные данные администратора по умолчанию:
   - Email: admin@example.com
   - Пароль: admin123

## Детальная настройка

### Переменные окружения

| Переменная | Описание | По умолчанию | Обязательная |
|----------|-------------|---------|----------|
| `PORT` | Порт сервера | `3000` | Нет |
| `NODE_ENV` | Окружение (production, development) | `development` | Нет |
| `DATABASE_PROVIDER` | Провайдер базы данных (mongodb, sqlite) | `mongodb` | Нет |
| `DATABASE_URL` | Строка подключения MongoDB | - | Да (при использовании MongoDB) |
| `SQLITE_DATABASE_URL` | Путь к базе данных SQLite | `file:./data/whatsapp-api.db` | Нет |
| `JWT_SECRET` | Секретный ключ для JWT токенов | - | Да |
| `JWT_EXPIRATION` | Время жизни JWT токена | `24h` | Нет |
| `ADMIN_EMAIL` | Email администратора | `admin@example.com` | Нет |
| `ADMIN_PASSWORD` | Пароль администратора | `admin123` | Нет |
| `ADMIN_FIRST_NAME` | Имя администратора | `Admin` | Нет |
| `ADMIN_LAST_NAME` | Фамилия администратора | `User` | Нет |
| `LOG_LEVEL` | Уровень логирования (debug, info, warn, error) | `info` | Нет |
| `MAX_FILE_SIZE` | Максимальный размер файла для загрузки (байты) | `10485760` (10МБ) | Нет |
| `UPLOADS_DIR` | Директория для загрузки файлов | `./uploads` | Нет |
| `CORS_ORIGIN` | Разрешенные источники CORS | `*` | Нет |

### Настройка базы данных

#### Настройка MongoDB

Для использования MongoDB в качестве провайдера базы данных:

```yaml
environment:
  - DATABASE_PROVIDER=mongodb
  - DATABASE_URL=mongodb://username:password@hostname:port/database?authSource=admin
```

Для реплик-сетов или кластеров:

```yaml
environment:
  - DATABASE_PROVIDER=mongodb
  - DATABASE_URL=mongodb://username:password@host1:port,host2:port,host3:port/database?replicaSet=myReplicaSet&authSource=admin
```

#### Настройка SQLite

Для использования SQLite в качестве провайдера базы данных:

```yaml
environment:
  - DATABASE_PROVIDER=sqlite
  - SQLITE_DATABASE_URL=file:/usr/src/app/data/whatsapp-api.db
```

### Аутентификация

Сервис использует JWT (JSON Web Tokens) для аутентификации. Настройте следующие переменные:

```yaml
environment:
  - JWT_SECRET=your-strong-secret-key-here
  - JWT_EXPIRATION=24h  # Формат: Xh (часы), Xm (минуты), Xd (дни)
```

Для учетной записи администратора:

```yaml
environment:
  - ADMIN_EMAIL=admin@example.com
  - ADMIN_PASSWORD=secure-password
  - ADMIN_FIRST_NAME=Admin
  - ADMIN_LAST_NAME=User
```

### Настройки вебхуков

Вебхуки можно настроить для каждого экземпляра WhatsApp через API. Глобальные настройки включают:

```yaml
environment:
  - WEBHOOK_RETRY_INTERVAL=60000  # Интервал повторных попыток в миллисекундах
  - WEBHOOK_MAX_RETRIES=3         # Максимальное количество повторных попыток
```

### Cron-задачи

Сервис использует несколько cron-задач для обслуживания:

```yaml
environment:
  - CLEANUP_CRON=0 0 * * *          # Запуск в полночь каждый день
  - SOCKET_CHECK_CRON=*/5 * * * *   # Запуск каждые 5 минут
  - AUTH_CHECK_CRON=0 12 * * *      # Запуск в полдень каждый день
  - USAGE_SAVE_CRON=*/15 * * * *    # Запуск каждые 15 минут
  - USAGE_LIMITS_CRON=0 * * * *     # Запуск каждый час
  - SYSTEM_METRICS_CRON=*/5 * * * * # Запуск каждые 5 минут
```

## Варианты развертывания Docker

### Использование Docker Compose

Рекомендуемый способ развертывания сервиса - с использованием Docker Compose:

1. Сохраните файл `docker-compose.yml` с вашей конфигурацией
2. Запустите:
   ```bash
   docker-compose up -d
   ```
3. Для просмотра логов:
   ```bash
   docker-compose logs -f whatsapp-api
   ```
4. Для остановки сервиса:
   ```bash
   docker-compose down
   ```

### Использование Docker CLI

Вы также можете запустить сервис с помощью Docker CLI:

```bash
# Создаем сеть
docker network create whatsapp-network

# Запускаем MongoDB
docker run -d \
  --name mongodb \
  --network whatsapp-network \
  -e MONGO_INITDB_ROOT_USERNAME=whatsapp \
  -e MONGO_INITDB_ROOT_PASSWORD=whatsapp-password \
  -v mongodb_data:/data/db \
  mongo:latest

# Запускаем WhatsApp API
docker run -d \
  --name whatsapp-api \
  --network whatsapp-network \
  -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=production \
  -e DATABASE_PROVIDER=mongodb \
  -e DATABASE_URL=mongodb://whatsapp:whatsapp-password@mongodb:27017/whatsapp-api?authSource=admin \
  -e JWT_SECRET=your-jwt-secret-key-here \
  -e JWT_EXPIRATION=24h \
  -e ADMIN_EMAIL=admin@example.com \
  -e ADMIN_PASSWORD=admin123 \
  -v whatsapp_instances:/usr/src/app/instances \
  -v whatsapp_uploads:/usr/src/app/uploads \
  -v whatsapp_logs:/usr/src/app/logs \
  -v whatsapp_data:/usr/src/app/data \
  your-registry/whatsapp-api:latest
```

## Управление томами

Сервис использует несколько томов Docker для постоянного хранения данных:

| Том | Назначение | Примечания |
|--------|---------|-------|
| `mongodb_data` | Файлы базы данных MongoDB | Нужен только при использовании MongoDB |
| `whatsapp_instances` | Данные сессий WhatsApp | Содержит файлы аутентификации для каждого экземпляра |
| `whatsapp_uploads` | Загруженные медиафайлы | Для отправки медиафайлов |
| `whatsapp_logs` | Логи приложения | Полезно для устранения неполадок |
| `whatsapp_data` | Файлы базы данных SQLite | Нужен только при использовании SQLite |

Для использования именованных томов с Docker CLI:

```bash
docker volume create whatsapp_instances
docker volume create whatsapp_uploads
docker volume create whatsapp_logs
docker volume create whatsapp_data
```

### Резервное копирование томов

Для резервного копирования томов:

```bash
# Для данных MongoDB
docker run --rm -v mongodb_data:/data -v $(pwd):/backup alpine tar -czf /backup/mongodb_backup.tar.gz /data

# Для экземпляров WhatsApp
docker run --rm -v whatsapp_instances:/data -v $(pwd):/backup alpine tar -czf /backup/instances_backup.tar.gz /data

# Для данных SQLite
docker run --rm -v whatsapp_data:/data -v $(pwd):/backup alpine tar -czf /backup/sqlite_backup.tar.gz /data
```

### Восстановление томов

Для восстановления томов:

```bash
# Для данных MongoDB
docker run --rm -v mongodb_data:/data -v $(pwd):/backup alpine sh -c "rm -rf /data/* && tar -xzf /backup/mongodb_backup.tar.gz -C /"

# Для экземпляров WhatsApp
docker run --rm -v whatsapp_instances:/data -v $(pwd):/backup alpine sh -c "rm -rf /data/* && tar -xzf /backup/instances_backup.tar.gz -C /"

# Для данных SQLite
docker run --rm -v whatsapp_data:/data -v $(pwd):/backup alpine sh -c "rm -rf /data/* && tar -xzf /backup/sqlite_backup.tar.gz -C /"
```

## Проверка работоспособности

Сервис предоставляет конечную точку проверки работоспособности `/health`. Вы можете настроить проверку работоспособности Docker:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## Логирование

Сервис логирует в stdout/stderr, а также в файлы в директории `/usr/src/app/logs`:

- `combined.log` - Все логи
- `error.log` - Только логи ошибок

Для просмотра логов из Docker:

```bash
docker logs -f whatsapp-api
```

Для настройки логирования:

```yaml
environment:
  - LOG_LEVEL=debug  # Варианты: debug, info, warn, error
```

## Масштабирование

Сервис может быть масштабирован горизонтально. Каждый экземпляр должен иметь свои собственные тома данных:

```yaml
services:
  whatsapp-api-1:
    image: your-registry/whatsapp-api:latest
    volumes:
      - whatsapp_instances_1:/usr/src/app/instances
      - whatsapp_data_1:/usr/src/app/data
    # другие настройки...

  whatsapp-api-2:
    image: your-registry/whatsapp-api:latest
    volumes:
      - whatsapp_instances_2:/usr/src/app/instances
      - whatsapp_data_2:/usr/src/app/data
    # другие настройки...
```

Обратите внимание, что каждый экземпляр WhatsApp должен управляться только одним экземпляром сервиса, чтобы избежать конфликтов.

## Резервное копирование и восстановление

### Резервное копирование базы данных

#### Резервное копирование MongoDB

```bash
docker exec -it mongodb mongodump --username whatsapp --password whatsapp-password --authenticationDatabase admin --db whatsapp-api --out /dump
docker cp mongodb:/dump ./backup
```

#### Резервное копирование SQLite

```bash
docker exec -it whatsapp-api sh -c "sqlite3 /usr/src/app/data/whatsapp-api.db .dump > /usr/src/app/data/backup.sql"
docker cp whatsapp-api:/usr/src/app/data/backup.sql ./backup.sql
```

### Восстановление базы данных

#### Восстановление MongoDB

```bash
docker cp ./backup mongodb:/dump
docker exec -it mongodb mongorestore --username whatsapp --password whatsapp-password --authenticationDatabase admin /dump
```

#### Восстановление SQLite

```bash
docker cp ./backup.sql whatsapp-api:/usr/src/app/data/
docker exec -it whatsapp-api sh -c "cat /usr/src/app/data/backup.sql | sqlite3 /usr/src/app/data/whatsapp-api.db"
```

## Обновление

Для обновления сервиса:

1. Загрузите последний образ:
   ```bash
   docker-compose pull whatsapp-api
   ```

2. Перезапустите сервис:
   ```bash
   docker-compose up -d whatsapp-api
   ```

Для значительных обновлений рекомендуется сначала создать резервную копию данных.

## Устранение неполадок

### Контейнер не запускается

Проверьте логи:
```bash
docker logs whatsapp-api
```

Распространенные проблемы:
- Проблемы подключения к базе данных
- Проблемы с разрешениями для томов
- Неправильная настройка переменных окружения

### Проблемы с подключением к базе данных

Для MongoDB:
- Убедитесь, что контейнер MongoDB запущен: `docker ps`
- Проверьте строку подключения в `DATABASE_URL`
- Убедитесь, что учетные данные верны

Для SQLite:
- Проверьте, имеет ли директория данных правильные разрешения
- Убедитесь, что `SQLITE_DATABASE_URL` указан верно

### Проблемы с подключением к WhatsApp

- Убедитесь, что контейнер имеет доступ к интернету
- Проверьте логи экземпляра WhatsApp: `/usr/src/app/logs/combined.log`
- Попробуйте переподключить экземпляр через API

### QR-код не отображается

- Перезапустите экземпляр через API
- Проверьте логи на наличие сообщений об ошибках
- Убедитесь, что браузер имеет доступ к конечной точке API

## Рекомендации по безопасности

### Пароль администратора

Смените пароль администратора по умолчанию сразу после первого входа:

```yaml
environment:
  - ADMIN_EMAIL=admin@example.com
  - ADMIN_PASSWORD=strong-unique-password
```

### JWT Secret

Используйте сильный, уникальный JWT secret:

```yaml
environment:
  - JWT_SECRET=your-very-long-and-secure-random-string
```

### Аутентификация MongoDB

Всегда используйте аутентификацию для MongoDB:

```yaml
environment:
  - DATABASE_URL=mongodb://username:password@hostname:port/database?authSource=admin
```

### Сетевая безопасность

- Используйте обратный прокси (например, Nginx или Traefik) с HTTPS
- Ограничьте доступ к API с помощью сетевых правил
- Используйте ограничения CORS для продакшена:
  ```yaml
  environment:
    - CORS_ORIGIN=https://your-domain.com
  ```

## Документация API

Конечные точки API доступны по адресам:

- Аутентификация: `/api/auth/login`
- Управление экземплярами: `/api/instances`
- Функции WhatsApp: `/api/whatsapp/:instanceId/...`
- Упрощенный API WhatsApp: `/api/whatsapp-simple/:instanceId/...`
- Статистика: `/api/stats/...`

Для подробной документации API обратитесь к документации API или исследуйте интерфейс по адресу `/ui/instances`.

## Сборка пользовательского Docker-образа

Если вам нужно собрать пользовательскую версию образа:

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/your-organization/whatsapp-api.git
   cd whatsapp-api
   ```

2. Внесите необходимые изменения в код

3. Соберите Docker-образ:
   ```bash
   docker build -t your-registry/whatsapp-api:custom .
   ```

4. Обновите ваш `docker-compose.yml` для использования пользовательского образа:
   ```yaml
   services:
     whatsapp-api:
       image: your-registry/whatsapp-api:custom
       # другие настройки...
   ```

## Таблица переменных окружения

| Переменная | Описание | По умолчанию | Обязательная |
|----------|-------------|---------|----------|
| `PORT` | Порт сервера | `3000` | Нет |
| `NODE_ENV` | Окружение (production, development) | `development` | Нет |
| `DATABASE_PROVIDER` | Провайдер базы данных (mongodb, sqlite) | `mongodb` | Нет |
| `DATABASE_URL` | Строка подключения MongoDB | - | Да (при использовании MongoDB) |
| `SQLITE_DATABASE_URL` | Путь к базе данных SQLite | `file:./data/whatsapp-api.db` | Нет |
| `JWT_SECRET` | Секретный ключ для JWT токенов | - | Да |
| `JWT_EXPIRATION` | Время жизни JWT токена | `24h` | Нет |
| `ADMIN_EMAIL` | Email администратора | `admin@example.com` | Нет |
| `ADMIN_PASSWORD` | Пароль администратора | `admin123` | Нет |
| `ADMIN_FIRST_NAME` | Имя администратора | `Admin` | Нет |
| `ADMIN_LAST_NAME` | Фамилия администратора | `User` | Нет |
| `LOG_LEVEL` | Уровень логирования (debug, info, warn, error) | `info` | Нет |
| `MAX_FILE_SIZE` | Максимальный размер файла для загрузки (байты) | `10485760` (10МБ) | Нет |
| `UPLOADS_DIR` | Директория для загрузки файлов | `./uploads` | Нет |
| `CORS_ORIGIN` | Разрешенные источники CORS | `*` | Нет |
| `CLEANUP_CRON` | Расписание для задачи очистки | `0 0 * * *` | Нет |
| `SOCKET_CHECK_CRON` | Расписание для проверки работоспособности сокета | `*/5 * * * *` | Нет |
| `AUTH_CHECK_CRON` | Расписание для проверки истечения срока аутентификации | `0 12 * * *` | Нет |
| `USAGE_SAVE_CRON` | Расписание для сохранения метрик использования | `*/15 * * * *` | Нет |
| `USAGE_LIMITS_CRON` | Расписание для проверки лимитов использования | `0 * * * *` | Нет |
| `SYSTEM_METRICS_CRON` | Расписание для сбора системных метрик | `*/5 * * * *` | Нет |
