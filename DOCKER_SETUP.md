# Запуск WhatsApp Multi-Instance API в Docker

Это руководство поможет вам запустить проект в Docker контейнерах.

## Предварительные требования

- Docker версии 20.10 или выше
- Docker Compose версии 2.0 или выше
- Минимум 2GB свободной оперативной памяти
- Минимум 5GB свободного места на диске

## Быстрый старт

### 1. Базовый запуск (только WhatsApp API с SQLite)

```bash
# Клонируйте репозиторий (если еще не сделали)
git clone <repository-url>
cd rk-wa

# Запустите основной сервис
docker-compose up -d whatsapp-api
```

### 2. Запуск с MongoDB

```bash
# Измените DATABASE_PROVIDER на mongodb в docker-compose.yml
# Затем запустите с MongoDB
docker-compose up -d mongodb whatsapp-api
```

### 3. Запуск с Nginx reverse proxy

```bash
# Запуск с nginx профилем
docker-compose --profile with-nginx up -d
```

## Конфигурация

### Переменные окружения

Основные переменные можно изменить в секции `environment` сервиса `whatsapp-api` в файле `docker-compose.yml`:

- `DATABASE_PROVIDER`: `sqlite` или `mongodb`
- `JWT_SECRET`: Секретный ключ для JWT токенов
- `ADMIN_EMAIL`: Email администратора
- `ADMIN_PASSWORD`: Пароль администратора
- `LOG_LEVEL`: Уровень логирования (`debug`, `info`, `warn`, `error`)

### Порты

- **3000**: WhatsApp API сервис
- **27017**: MongoDB (если используется)
- **80/443**: Nginx (если используется профиль with-nginx)

## Управление контейнерами

### Просмотр логов

```bash
# Логи WhatsApp API
docker-compose logs -f whatsapp-api

# Логи всех сервисов
docker-compose logs -f

# Логи конкретного контейнера
docker logs whatsapp-api-service
```

### Остановка сервисов

```bash
# Остановить все сервисы
docker-compose down

# Остановить с удалением volumes (ВНИМАНИЕ: удалит все данные)
docker-compose down -v
```

### Перезапуск сервисов

```bash
# Перезапустить все сервисы
docker-compose restart

# Перезапустить конкретный сервис
docker-compose restart whatsapp-api
```

### Обновление образов

```bash
# Пересобрать образ WhatsApp API
docker-compose build whatsapp-api

# Пересобрать и запустить
docker-compose up -d --build whatsapp-api
```

## Volumes (Постоянное хранение данных)

Проект использует следующие volumes для сохранения данных:

- `whatsapp_data`: База данных SQLite
- `whatsapp_instances`: Данные WhatsApp инстансов
- `whatsapp_uploads`: Загруженные файлы
- `whatsapp_logs`: Логи приложения
- `whatsapp_sessions`: Сессии WhatsApp
- `mongodb_data`: Данные MongoDB (если используется)

### Резервное копирование данных

```bash
# Создать резервную копию всех volumes
docker run --rm -v whatsapp_data:/data -v $(pwd):/backup alpine tar czf /backup/whatsapp_backup.tar.gz /data

# Восстановить из резервной копии
docker run --rm -v whatsapp_data:/data -v $(pwd):/backup alpine tar xzf /backup/whatsapp_backup.tar.gz -C /
```

## Мониторинг и отладка

### Проверка состояния контейнеров

```bash
# Статус всех контейнеров
docker-compose ps

# Детальная информация о контейнере
docker inspect whatsapp-api-service
```

### Подключение к контейнеру

```bash
# Подключиться к контейнеру WhatsApp API
docker-compose exec whatsapp-api /bin/sh

# Выполнить команду в контейнере
docker-compose exec whatsapp-api npm run prisma:studio:sqlite
```

### Health Check

Контейнер WhatsApp API имеет встроенную проверку здоровья:

```bash
# Проверить health status
docker inspect --format='{{.State.Health.Status}}' whatsapp-api-service
```

## Производственное развертывание

### Рекомендации для production

1. **Измените секретные ключи**:
   ```yaml
   environment:
     - JWT_SECRET=your-super-secure-secret-key
     - ADMIN_PASSWORD=strong-admin-password
   ```

2. **Используйте внешнюю базу данных** для высокой доступности

3. **Настройте SSL сертификаты** для nginx:
   ```bash
   # Поместите сертификаты в папку ssl/
   mkdir ssl
   # Скопируйте cert.pem и key.pem в папку ssl/
   ```

4. **Настройте мониторинг** и логирование

5. **Ограничьте ресурсы** в docker-compose.yml (уже настроено)

### Переменные окружения для production

```yaml
environment:
  - NODE_ENV=production
  - LOG_LEVEL=warn
  - JWT_SECRET=${JWT_SECRET}  # Из .env файла
  - ADMIN_PASSWORD=${ADMIN_PASSWORD}  # Из .env файла
```

## Устранение неполадок

### Частые проблемы

1. **Контейнер не запускается**:
   ```bash
   docker-compose logs whatsapp-api
   ```

2. **База данных не инициализируется**:
   ```bash
   docker-compose exec whatsapp-api npm run setup:sqlite
   ```

3. **Проблемы с правами доступа**:
   ```bash
   docker-compose exec whatsapp-api chown -R node:node /usr/src/app/data
   ```

4. **Очистка всех данных**:
   ```bash
   docker-compose down -v
   docker system prune -a
   ```

## Полезные команды

```bash
# Просмотр использования ресурсов
docker stats

# Просмотр сетей Docker
docker network ls

# Просмотр volumes
docker volume ls

# Очистка неиспользуемых ресурсов
docker system prune
```

## Доступ к приложению

После успешного запуска:

- **Веб-интерфейс**: http://localhost:3000
- **API документация**: http://localhost:3000/api-docs (если настроена)
- **Health check**: http://localhost:3000/health

### Данные для входа по умолчанию

- **Email**: admin@example.com
- **Пароль**: admin123
- **API ключ**: Генерируется автоматически при первом запуске

---

**Примечание**: Обязательно измените пароли и секретные ключи перед использованием в production среде!