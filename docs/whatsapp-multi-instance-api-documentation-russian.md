# WhatsApp Multi-Instance API - Документация

## 📋 Оглавление

1. [Введение](#введение)
2. [Начало работы](#начало-работы)
3. [Аутентификация](#аутентификация)
4. [Управление инстансами](#управление-инстансами)
5. [WhatsApp API](#whatsapp-api)
6. [Контакты](#контакты)
7. [Чаты и сообщения](#чаты-и-сообщения)
8. [Статистика и мониторинг](#статистика-и-мониторинг)
9. [Webhooks](#webhooks)
10. [Управление базой данных](#управление-базой-данных)
11. [Коды ошибок](#коды-ошибок)
12. [Примеры использования](#примеры-использования)

## 🚀 Введение

WhatsApp Multi-Instance API позволяет управлять несколькими WhatsApp-соединениями в одном приложении. API поддерживает две схемы аутентификации: JWT-токен и API-ключ, а также две системы хранения данных: MongoDB и SQLite.

### Ключевые возможности

- Управление несколькими инстансами WhatsApp
- Отправка и получение текстовых сообщений и медиафайлов
- Управление контактами
- Хранение истории сообщений
- Webhook-уведомления о событиях
- Статистика использования
- Поддержка двух типов баз данных (MongoDB/SQLite)
- Администрирование пользователей

## 🔧 Начало работы

### Системные требования

- Node.js 18.0 или выше
- MongoDB (опционально)
- SQLite (опционально)

### Установка с использованием Docker

```bash
# Клонировать репозиторий
git clone https://github.com/your-username/whatsapp-multi-instance-api.git

# Перейти в директорию проекта
cd whatsapp-multi-instance-api

# Запустить с использованием Docker Compose
docker-compose up -d
```

### Настройка переменных окружения

Основные настройки конфигурации:

```
# Тип базы данных
DATABASE_PROVIDER=sqlite  # mongodb или sqlite

# Настройки MongoDB
DATABASE_URL=mongodb://username:password@hostname:port/database

# Настройки SQLite
SQLITE_DATABASE_URL=file:./data/whatsapp-api.db

# Секрет для JWT-токенов
JWT_SECRET=your-jwt-secret-key-here
JWT_EXPIRATION=24h

# Данные администратора по умолчанию
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=User
```

## 🔐 Аутентификация

API поддерживает два метода аутентификации:

### JWT-токен

- Токен получается при входе в систему через `/api/auth/login`
- Передается в заголовке `Authorization: Bearer <token>`
- Срок действия токена настраивается через `JWT_EXPIRATION`

### API-ключ

- Уникальный ключ, привязанный к пользователю
- Автоматически генерируется при создании пользователя
- Передается в заголовке `x-api-key: <api_key>`

### Маршруты аутентификации

#### Вход в систему

**Endpoint:** `POST /api/auth/login`

**Тело запроса:**
```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

**Успешный ответ:**
```json
{
  "token": "jwt.token.here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "apiKey": "unique_api_key"
  }
}
```

#### Получение данных текущего пользователя

**Endpoint:** `GET /api/auth/me`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный ответ:**
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

## 🖥️ Управление инстансами

### Создание инстанса

**Endpoint:** `POST /api/instances`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Тело запроса:**
```json
{
  "name": "Основной WhatsApp",
  "description": "Корпоративный аккаунт",
  "webhookUrl": "https://example.com/webhook",
  "webhookEnabled": true,
  "notifyReceived": true,
  "notifySent": true,
  "notifyDelivery": false,
  "notifyRead": false,
  "maxRetries": 3,
  "retryInterval": 60000,
  "webhookSecret": "optional-secret-key",
  "headers": {
    "Custom-Header": "custom-value"
  }
}
```

**Успешный ответ:**
```json
{
  "id": "instance_id",
  "name": "Основной WhatsApp",
  "description": "Корпоративный аккаунт",
  "userId": "user_id",
  "status": "connecting",
  "webhookUrl": "https://example.com/webhook",
  "webhookEnabled": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Получение списка инстансов

**Endpoint:** `GET /api/instances`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный ответ:**
```json
{
  "instances": [
    {
      "id": "instance_id",
      "name": "Основной WhatsApp",
      "description": "Корпоративный аккаунт",
      "status": "connected",
      "webhookUrl": "https://example.com/webhook",
      "webhookEnabled": true,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "connectionStatus": {
        "ready": true,
        "status": "connected",
        "hasQr": false
      }
    }
  ]
}
```

### Получение информации о конкретном инстансе

**Endpoint:** `GET /api/instances/{instanceId}`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный ответ:**
```json
{
  "id": "instance_id",
  "name": "Основной WhatsApp",
  "description": "Корпоративный аккаунт",
  "status": "connected",
  "webhookUrl": "https://example.com/webhook",
  "webhookEnabled": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "webhookSettings": {
    "instanceId": "instance_id",
    "notifyReceived": true,
    "notifySent": true,
    "notifyDelivery": false,
    "notifyRead": false,
    "maxRetries": 3,
    "retryInterval": 60000,
    "secret": "webhook-secret-key",
    "headers": {
      "Custom-Header": "custom-value"
    }
  },
  "connectionStatus": {
    "ready": true,
    "status": "connected",
    "hasQr": false
  }
}
```

### Получение статуса инстанса

**Endpoint:** `GET /api/instances/{instanceId}/status`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный ответ:**
```json
{
  "instanceId": "instance_id",
  "status": "connected",
  "ready": true,
  "hasQr": false,
  "lastActivity": "2023-01-01T12:00:00.000Z",
  "connectionDetails": {
    "ready": true,
    "status": "connected",
    "hasQr": false
  }
}
```

### Обновление инстанса

**Endpoint:** `PUT /api/instances/{instanceId}`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Тело запроса:**
```json
{
  "name": "Новое имя WhatsApp",
  "description": "Обновленное описание",
  "webhookUrl": "https://new-example.com/webhook",
  "webhookEnabled": true,
  "webhookSettings": {
    "notifyReceived": true,
    "notifySent": false,
    "notifyDelivery": true,
    "notifyRead": true,
    "maxRetries": 5,
    "retryInterval": 30000,
    "secret": "new-secret-key",
    "headers": {
      "New-Custom-Header": "new-value"
    }
  }
}
```

**Успешный ответ:**
```json
{
  "id": "instance_id",
  "name": "Новое имя WhatsApp",
  "description": "Обновленное описание",
  "webhookUrl": "https://new-example.com/webhook",
  "webhookEnabled": true,
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

### Удаление инстанса

**Endpoint:** `DELETE /api/instances/{instanceId}`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный ответ:**
```json
{
  "success": true,
  "message": "Instance instance_id deleted successfully"
}
```

### Переподключение инстанса

**Endpoint:** `POST /api/instances/{instanceId}/reconnect`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный ответ:**
```json
{
  "success": true,
  "message": "Instance instance_id reconnected"
}
```

### Выход из WhatsApp

**Endpoint:** `POST /api/instances/{instanceId}/logout`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный ответ:**
```json
{
  "success": true,
  "message": "Instance instance_id logged out"
}
```

### Получение QR-кода для инстанса

**Endpoint:** `GET /api/instances/{instanceId}/qr`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный ответ:**
```json
{
  "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
}
```

**Ответ в случае генерации:**
```json
{
  "message": "QR code generation in progress. Please try again in a few seconds.",
  "status": "generating"
}
```

### Получение лога активности инстанса

**Endpoint:** `GET /api/instances/{instanceId}/activity`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Параметры запроса:**
- `limit` - количество записей (по умолчанию 100)
- `skip` - смещение (по умолчанию 0)
- `actions` - список типов действий через запятую (например, `connected,disconnected,qr_received`)
- `startDate` - начальная дата в формате ISO 8601
- `endDate` - конечная дата в формате ISO 8601

**Успешный ответ:**
```json
{
  "logs": [
    {
      "id": "log_id",
      "instanceId": "instance_id",
      "action": "connected",
      "details": {},
      "createdAt": "2023-01-01T12:00:00.000Z"
    },
    {
      "id": "log_id",
      "instanceId": "instance_id",
      "action": "qr_received",
      "details": {
        "attempt": 1
      },
      "createdAt": "2023-01-01T11:55:00.000Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 100,
    "skip": 0,
    "hasMore": true
  }
}
```

### Получение последних событий инстанса

**Endpoint:** `GET /api/instances/{instanceId}/events`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Параметры запроса:**
- `since` - временная метка в формате ISO 8601, с которой получать события
- `limit` - максимальное количество событий (по умолчанию 20)
- `types` - типы событий через запятую (например, `message_sent,message_received,message_status`)

**Успешный ответ:**
```json
{
  "events": [
    {
      "type": "message_received",
      "timestamp": "2023-01-01T12:05:00.000Z",
      "data": {
        "instanceId": "instance_id",
        "messageId": "whatsapp_message_id",
        "remoteJid": "79001234567@s.whatsapp.net",
        "fromMe": false,
        "body": "Привет! Как дела?",
        "hasMedia": false,
        "status": "received",
        "metadata": {
          "pushName": "Иван",
          "timestamp": 1672531200
        }
      }
    }
  ],
  "latestTimestamp": "2023-01-01T12:05:00.000Z",
  "count": 1,
  "hasMore": false
}
```

## 📱 WhatsApp API

### Получение статуса инстанса

**Endpoint:** `GET /api/whatsapp/{instanceId}/status`

**Заголовки:**
- `x-api-key: <api_key>`

**Успешный ответ:**
```json
{
  "ready": true,
  "status": "connected",
  "hasQr": false
}
```

### Получение QR-кода

**Endpoint:** `GET /api/whatsapp/{instanceId}/qr`

**Заголовки:**
- `x-api-key: <api_key>`

**Успешный ответ:**
```json
{
  "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
}
```

### Отправка текстового сообщения

**Endpoint:** `POST /api/whatsapp/{instanceId}/send`

**Заголовки:**
- `x-api-key: <api_key>`

**Тело запроса:**
```json
{
  "phone": "79001234567",
  "message": "Привет! Как дела?"
}
```

**Успешный ответ:**
```json
{
  "id": "whatsapp_message_id"
}
```

### Отправка медиа по URL

**Endpoint:** `POST /api/whatsapp/{instanceId}/send-media`

**Заголовки:**
- `x-api-key: <api_key>`

**Тело запроса:**
```json
{
  "phone": "79001234567",
  "url": "https://example.com/image.jpg",
  "caption": "Описание изображения",
  "filename": "image.jpg"
}
```

**Успешный ответ:**
```json
{
  "id": "whatsapp_message_id"
}
```

### Отправка медиа из файла

**Endpoint:** `POST /api/whatsapp/{instanceId}/send-file`

**Заголовки:**
- `x-api-key: <api_key>`
- `Content-Type: multipart/form-data`

**Поля формы:**
- `phone` - номер телефона получателя
- `caption` - описание файла (опционально)
- `file` - файл для отправки

**Успешный ответ:**
```json
{
  "id": "whatsapp_message_id"
}
```

### Выход из WhatsApp

**Endpoint:** `POST /api/whatsapp/{instanceId}/logout`

**Заголовки:**
- `x-api-key: <api_key>`

**Успешный ответ:**
```json
{
  "success": true
}
```

## 👥 Контакты

### Получение контактов из WhatsApp

**Endpoint:** `GET /api/whatsapp/{instanceId}/contacts`

**Заголовки:**
- `x-api-key: <api_key>`

**Успешный ответ:**
```json
{
  "contacts": [
    {
      "id": "79001234567@s.whatsapp.net",
      "name": "Иван Иванов",
      "number": "79001234567",
      "isGroup": false
    },
    {
      "id": "1234567890@g.us",
      "name": "Рабочая группа",
      "number": "1234567890",
      "isGroup": true
    }
  ]
}
```

### Добавление контакта в WhatsApp

**Endpoint:** `POST /api/whatsapp/{instanceId}/contacts/add`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Тело запроса:**
```json
{
  "phone": "79001234567",
  "name": "Иван Иванов"
}
```

**Успешный ответ:**
```json
{
  "success": true,
  "message": "Контакт успешно добавлен",
  "contact": {
    "id": "79001234567@s.whatsapp.net",
    "number": "79001234567",
    "name": "Иван Иванов"
  }
}
```

### Получение контактов из базы данных

**Endpoint:** `GET /api/instances/{instanceId}/contacts/db` или `GET /api/whatsapp/{instanceId}/contacts/db`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Параметры запроса:**
- `limit` - количество контактов (по умолчанию 100)
- `skip` - смещение (по умолчанию 0)
- `search` - строка поиска по имени или номеру
- `onlyGroups` - фильтр только для групп (true/false)

**Успешный ответ:**
```json
{
  "contacts": [
    {
      "id": "contact_id",
      "instanceId": "instance_id",
      "name": "Иван Иванов",
      "number": "79001234567",
      "remoteJid": "79001234567@s.whatsapp.net",
      "pushName": "Иван",
      "isGroup": false,
      "profilePicture": null,
      "about": null,
      "lastActivity": "2023-01-01T12:00:00.000Z",
      "createdAt": "2023-01-01T10:00:00.000Z",
      "updatedAt": "2023-01-01T12:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 100,
    "skip": 0,
    "hasMore": true
  }
}
```

### Импорт контактов из WhatsApp в базу данных

**Endpoint:** `POST /api/instances/{instanceId}/contacts/import` или `POST /api/whatsapp/{instanceId}/contacts/import`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный ответ:**
```json
{
  "success": true,
  "message": "Successfully imported 25 contacts",
  "importedCount": 25
}
```

### Сохранение или обновление контакта в базе данных

**Endpoint:** `POST /api/instances/{instanceId}/contacts/save` или `POST /api/whatsapp/{instanceId}/contacts/save`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Тело запроса:**
```json
{
  "number": "79001234567",
  "name": "Иван Иванов",
  "pushName": "Иван",
  "isGroup": false,
  "profilePicture": "url-to-picture",
  "about": "Статус пользователя"
}
```

**Успешный ответ:**
```json
{
  "id": "contact_id",
  "instanceId": "instance_id",
  "name": "Иван Иванов",
  "number": "79001234567",
  "remoteJid": "79001234567@s.whatsapp.net",
  "pushName": "Иван",
  "isGroup": false,
  "profilePicture": "url-to-picture",
  "about": "Статус пользователя",
  "lastActivity": "2023-01-01T12:00:00.000Z",
  "createdAt": "2023-01-01T10:00:00.000Z",
  "updatedAt": "2023-01-01T12:00:00.000Z"
}
```

## 💬 Чаты и сообщения

### Получение истории сообщений чата

**Endpoint:** `GET /api/instances/{instanceId}/chats/{chatId}/messages`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Параметры запроса:**
- `limit` - количество сообщений (по умолчанию 50)
- `skip` - смещение (по умолчанию 0)
- `startDate` - начальная дата в формате ISO 8601
- `endDate` - конечная дата в формате ISO 8601

**Успешный ответ:**
```json
{
  "messages": [
    {
      "id": "message_id",
      "instanceId": "instance_id",
      "remoteJid": "79001234567@s.whatsapp.net",
      "fromMe": true,
      "messageType": "text",
      "content": "Привет! Как дела?",
      "messageId": "whatsapp_message_id",
      "hasMedia": false,
      "mediaUrl": null,
      "caption": null,
      "mimeType": null,
      "fileName": null,
      "status": "sent",
      "metadata": {
        "timestamp": 1672531200
      },
      "createdAt": "2023-01-01T12:00:00.000Z",
      "updatedAt": "2023-01-01T12:00:00.000Z",
      "statusUpdatedAt": "2023-01-01T12:00:05.000Z"
    }
  ],
  "pagination": {
    "total": 120,
    "limit": 50,
    "skip": 0,
    "hasMore": true
  }
}
```

## 📊 Статистика и мониторинг

### Статистика пользователя

**Endpoint:** `GET /api/stats/user`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Параметры запроса:**
- `period` - период статистики (week, month, year, all, по умолчанию month)

**Успешный ответ:**
```json
{
  "total": {
    "messagesSent": 1500,
    "messagesReceived": 1200,
    "mediaSent": 45,
    "mediaReceived": 30,
    "totalMediaSize": 125000000,
    "apiCalls": 3200,
    "webhookSent": 2700,
    "instanceCount": 3
  },
  "instances": [
    {
      "instanceId": "instance_id",
      "name": "Основной WhatsApp",
      "messagesSent": 600,
      "messagesReceived": 500,
      "mediaSent": 20,
      "mediaReceived": 12,
      "totalMediaSize": 50000000,
      "apiCalls": 1500,
      "webhookSent": 1100
    }
  ]
}
```

### Статистика инстанса

**Endpoint:** `GET /api/stats/instances/{instanceId}`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Параметры запроса:**
- `period` - период статистики (today, week, month, all, по умолчанию today)

**Успешный ответ:**
```json
{
  "usage": {
    "messagesSent": 150,
    "messagesReceived": 120,
    "mediaSent": 5,
    "mediaReceived": 3,
    "totalMediaSize": 12500000,
    "apiCalls": 320,
    "webhookSent": 270,
    "dailyStats": [
      {
        "date": "2023-01-01T00:00:00.000Z",
        "messagesSent": 50,
        "messagesReceived": 40,
        "mediaSent": 2,
        "mediaReceived": 1
      }
    ]
  }
}
```

### Системная статистика

**Endpoint:** `GET /api/stats/system`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Важно:** Требуются права администратора

**Успешный ответ:**
```json
{
  "instances": {
    "total": 50,
    "active": 35
  },
  "users": {
    "total": 20,
    "active": 15
  },
  "usage": {
    "messagesSent": 15000,
    "messagesReceived": 12000,
    "mediaSent": 450,
    "mediaReceived": 300,
    "totalMediaSize": 1250000000,
    "apiCalls": 32000,
    "webhookSent": 27000
  }
}
```

## 🌐 Webhooks

Система поддерживает отправку webhook-уведомлений о различных событиях. Настройка webhooks производится при создании или обновлении инстанса.

### Типы событий

1. **message_received** - Получено новое сообщение
```json
{
  "event": "message_received",
  "data": {
    "instanceId": "instance_id",
    "messageId": "whatsapp_message_id",
    "from": "79001234567@s.whatsapp.net",
    "body": "Привет! Как дела?",
    "type": "conversation",
    "timestamp": 1672531200,
    "hasMedia": false,
    "pushName": "Иван"
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

2. **message_sent** - Отправлено сообщение
```json
{
  "event": "message_sent",
  "data": {
    "instanceId": "instance_id",
    "messageId": "whatsapp_message_id",
    "to": "79001234567@s.whatsapp.net",
    "body": "Привет! Всё хорошо.",
    "type": "text",
    "timestamp": 1672531200,
    "hasMedia": false
  },
  "timestamp": "2023-01-01T12:01:00.000Z"
}
```

3. **message_status** - Изменение статуса сообщения
```json
{
  "event": "message_status",
  "data": {
    "instanceId": "instance_id",
    "messageId": "whatsapp_message_id",
    "status": "delivered",
    "from": "79001234567@s.whatsapp.net",
    "fromMe": true
  },
  "timestamp": "2023-01-01T12:02:00.000Z"
}
```

4. **connected** - Установлено соединение с WhatsApp
```json
{
  "event": "connected",
  "data": {
    "instanceId": "instance_id"
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

5. **disconnected** - Закрыто соединение с WhatsApp
```json
{
  "event": "disconnected",
  "data": {
    "instanceId": "instance_id",
    "reason": "logout",
    "willReconnect": false
  },
  "timestamp": "2023-01-01T18:00:00.000Z"
}
```

6. **qr_received** - Получен QR-код для авторизации
```json
{
  "event": "qr_received",
  "data": {
    "instanceId": "instance_id",
    "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

7. **limit_exceeded** - Превышены лимиты использования
```json
{
  "event": "limit_exceeded",
  "data": {
    "instanceId": "instance_id",
    "exceededLimits": ["maxMessagesSent", "maxApiCalls"],
    "usage": {
      "messagesSent": 1500,
      "apiCalls": 5000
    }
  },
  "timestamp": "2023-01-01T14:00:00.000Z"
}
```

8. **webhook_updated** - Обновлены настройки webhook
```json
{
  "event": "webhook_updated",
  "data": {
    "instanceId": "instance_id",
    "timestamp": "2023-01-01T15:00:00.000Z"
  },
  "timestamp": "2023-01-01T15:00:00.000Z"
}
```

### Безопасность Webhook

Для обеспечения безопасности webhook можно использовать секретный ключ. Если ключ указан, сервер будет добавлять заголовок `X-Webhook-Signature` к каждому запросу, который содержит HMAC SHA-256 подпись тела запроса, созданную с использованием секретного ключа.

Пример проверки подписи на стороне получателя:

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(body, signature, secret) {
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(typeof body === 'string' ? body : JSON.stringify(body))
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );
}

// Использование в Express
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const secret = 'your-webhook-secret';
  
  if (!signature || !verifyWebhookSignature(req.body, signature, secret)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Обработка webhook
  // ...
  
  res.sendStatus(200);
});
```

## 🔄 Управление базой данных

API поддерживает работу с двумя типами баз данных: MongoDB и SQLite. Можно переключаться между ними даже во время работы.

### Получение статуса базы данных

**Endpoint:** `GET /api/db/status`

**Ответ:**
```json
{
  "provider": "sqlite",
  "url": "file:./data/whatsapp-api.db"
}
```

### Переключение провайдера базы данных

**Endpoint:** `POST /api/db/switch`

**Тело запроса:**
```json
{
  "provider": "mongodb"
}
```

**Успешный ответ:**
```json
{
  "success": true,
  "message": "Database provider switched to mongodb",
  "provider": "mongodb"
}
```

## 🚫 Коды ошибок

| Код  | Описание                 | Возможные причины                                        |
|------|--------------------------|----------------------------------------------------------|
| 400  | Некорректный запрос      | Отсутствуют обязательные поля, неверный формат данных    |
| 401  | Неавторизован            | Неверный токен или API-ключ, истекший токен              |
| 403  | Доступ запрещен          | Нет прав для доступа к ресурсу                           |
| 404  | Ресурс не найден         | Инстанс не существует, сообщение не найдено               |
| 500  | Внутренняя ошибка сервера| Ошибка в работе сервера, проблемы с базой данных        |

## 🚀 Примеры использования

### Python

```python
import requests
import qrcode
import time
from io import BytesIO
from PIL import Image

# Конфигурация API
api_key = "YOUR_API_KEY"
base_url = "https://api.example.com/api"

# Заголовки для аутентификации
headers = {
    "x-api-key": api_key,
    "Content-Type": "application/json"
}

# Создание нового инстанса
def create_instance(name, description, webhook_url=None):
    instance_data = {
        "name": name,
        "description": description
    }
    
    if webhook_url:
        instance_data["webhookUrl"] = webhook_url
        instance_data["webhookEnabled"] = True
        instance_data["notifyReceived"] = True
        instance_data["notifySent"] = True
    
    response = requests.post(
        f"{base_url}/instances", 
        headers=headers, 
        json=instance_data
    )
    
    if response.status_code == 201:
        return response.json()
    else:
        raise Exception(f"Ошибка создания инстанса: {response.text}")

# Получение и отображение QR-кода
def get_and_display_qr(instance_id):
    print("Получение QR-кода...")
    
    max_attempts = 10
    for attempt in range(max_attempts):
        response = requests.get(
            f"{base_url}/instances/{instance_id}/qr", 
            headers=headers
        )
        
        if response.status_code == 200 and "qrCode" in response.json():
            qr_data = response.json()["qrCode"]
            img = qrcode.make(qr_data)
            img.show()
            print("Отсканируйте QR-код в приложении WhatsApp")
            return True
        elif response.status_code == 202:
            print("QR-код еще генерируется, ожидание...")
            time.sleep(3)
        else:
            print(f"Попытка {attempt+1}/{max_attempts}: не удалось получить QR-код")
            time.sleep(2)
    
    return False

# Отправка сообщения
def send_message(instance_id, phone, message):
    response = requests.post(
        f"{base_url}/whatsapp/{instance_id}/send", 
        headers=headers, 
        json={"phone": phone, "message": message}
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Ошибка отправки сообщения: {response.text}")

# Отправка изображения
def send_image(instance_id, phone, image_url, caption=None):
    data = {
        "phone": phone,
        "url": image_url
    }
    
    if caption:
        data["caption"] = caption
    
    response = requests.post(
        f"{base_url}/whatsapp/{instance_id}/send-media", 
        headers=headers, 
        json=data
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Ошибка отправки изображения: {response.text}")

# Мониторинг входящих сообщений
def monitor_messages(instance_id, callback, interval=5):
    last_timestamp = None
    
    try:
        while True:
            params = {"limit": 10}
            if last_timestamp:
                params["since"] = last_timestamp
            
            response = requests.get(
                f"{base_url}/instances/{instance_id}/events", 
                headers=headers,
                params=params
            )
            
            if response.status_code == 200:
                data = response.json()
                
                for event in data["events"]:
                    if event["type"] == "message_received":
                        callback(event["data"])
                
                if data["events"]:
                    last_timestamp = data["latestTimestamp"]
            
            time.sleep(interval)
    except KeyboardInterrupt:
        print("Мониторинг остановлен")

# Пример использования
if __name__ == "__main__":
    # Создание нового инстанса
    instance = create_instance(
        "Тестовый инстанс", 
        "Создан через Python SDK",
        "https://webhook.example.com/whatsapp"
    )
    
    instance_id = instance["id"]
    print(f"Инстанс создан с ID: {instance_id}")
    
    # Получение и отображение QR-кода
    if get_and_display_qr(instance_id):
        print("Ожидание сканирования QR-кода...")
        time.sleep(20)  # Даем время на сканирование
        
        # Отправка тестового сообщения
        result = send_message(instance_id, "79001234567", "Тестовое сообщение из Python")
        print(f"Сообщение отправлено, ID: {result['id']}")
        
        # Мониторинг входящих сообщений (закомментирован для примера)
        # def message_handler(message):
        #     print(f"Новое сообщение от {message['from']}: {message['body']}")
        #
        # monitor_messages(instance_id, message_handler)
```

### Node.js

```javascript
const axios = require('axios');
const qrcode = require('qrcode-terminal');

// Конфигурация API
const apiKey = 'YOUR_API_KEY';
const baseUrl = 'https://api.example.com/api';

// Заголовки для аутентификации
const headers = {
  'x-api-key': apiKey,
  'Content-Type': 'application/json'
};

// Класс для работы с WhatsApp Multi-Instance API
class WhatsAppAPI {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'x-api-key': apiKey,
      'Content-Type': 'application/json'
    };
  }
  
  // Создание нового инстанса
  async createInstance(name, description, webhookUrl = null) {
    try {
      const instanceData = {
        name,
        description
      };
      
      if (webhookUrl) {
        instanceData.webhookUrl = webhookUrl;
        instanceData.webhookEnabled = true;
        instanceData.notifyReceived = true;
        instanceData.notifySent = true;
      }
      
      const response = await axios.post(
        `${this.baseUrl}/instances`,
        instanceData,
        { headers: this.headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Ошибка создания инстанса:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // Получение и отображение QR-кода
  async getAndDisplayQR(instanceId, maxAttempts = 10) {
    console.log('Получение QR-кода...');
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await axios.get(
          `${this.baseUrl}/instances/${instanceId}/qr`,
          { headers: this.headers }
        );
        
        if (response.data.qrCode) {
          // Отображаем QR-код в консоли
          qrcode.generate(response.data.qrCode);
          console.log('Отсканируйте QR-код в приложении WhatsApp');
          return true;
        }
      } catch (error) {
        if (error.response?.status === 202) {
          console.log('QR-код еще генерируется, ожидание...');
        } else {
          console.log(`Попытка ${attempt+1}/${maxAttempts}: не удалось получить QR-код`);
        }
      }
      
      // Ждем перед следующей попыткой
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    return false;
  }
  
  // Проверка статуса инстанса
  async checkStatus(instanceId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/whatsapp/${instanceId}/status`,
        { headers: this.headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Ошибка проверки статуса:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // Отправка сообщения
  async sendMessage(instanceId, phone, message) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/whatsapp/${instanceId}/send`,
        { phone, message },
        { headers: this.headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // Отправка изображения
  async sendImage(instanceId, phone, imageUrl, caption = null) {
    try {
      const data = {
        phone,
        url: imageUrl
      };
      
      if (caption) {
        data.caption = caption;
      }
      
      const response = await axios.post(
        `${this.baseUrl}/whatsapp/${instanceId}/send-media`,
        data,
        { headers: this.headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Ошибка отправки изображения:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // Получение контактов
  async getContacts(instanceId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/whatsapp/${instanceId}/contacts`,
        { headers: this.headers }
      );
      
      return response.data.contacts;
    } catch (error) {
      console.error('Ошибка получения контактов:', error.response?.data || error.message);
      return [];
    }
  }
  
  // Мониторинг входящих сообщений
  async monitorMessages(instanceId, callback, interval = 5000) {
    let lastTimestamp = null;
    
    const checkMessages = async () => {
      try {
        const params = { limit: 10 };
        if (lastTimestamp) {
          params.since = lastTimestamp;
        }
        
        const response = await axios.get(
          `${this.baseUrl}/instances/${instanceId}/events`,
          { 
            headers: this.headers,
            params
          }
        );
        
        const data = response.data;
        
        for (const event of data.events) {
          if (event.type === 'message_received') {
            callback(event.data);
          }
        }
        
        if (data.events.length > 0) {
          lastTimestamp = data.latestTimestamp;
        }
      } catch (error) {
        console.error('Ошибка мониторинга сообщений:', error.message);
      }
    };
    
    // Запускаем интервал проверки новых сообщений
    const intervalId = setInterval(checkMessages, interval);
    
    // Возвращаем функцию для остановки мониторинга
    return () => clearInterval(intervalId);
  }
}

// Пример использования
async function main() {
  const whatsapp = new WhatsAppAPI(apiKey, baseUrl);
  
  try {
    // Создание нового инстанса
    const instance = await whatsapp.createInstance(
      'Тестовый инстанс',
      'Создан через Node.js SDK',
      'https://webhook.example.com/whatsapp'
    );
    
    const instanceId = instance.id;
    console.log(`Инстанс создан с ID: ${instanceId}`);
    
    // Получение и отображение QR-кода
    if (await whatsapp.getAndDisplayQR(instanceId)) {
      console.log('Ожидание сканирования QR-кода...');
      
      // Даем время на сканирование
      await new Promise(resolve => setTimeout(resolve, 20000));
      
      // Проверка статуса
      const status = await whatsapp.checkStatus(instanceId);
      console.log('Статус инстанса:', status);
      
      if (status.ready) {
        // Отправка тестового сообщения
        const result = await whatsapp.sendMessage(
          instanceId,
          '79001234567',
          'Тестовое сообщение из Node.js'
        );
        
        console.log(`Сообщение отправлено, ID: ${result.id}`);
        
        // Запуск мониторинга сообщений
        const stopMonitoring = await whatsapp.monitorMessages(
          instanceId,
          (message) => {
            console.log(`Новое сообщение от ${message.from}: ${message.body}`);
          }
        );
        
        // Остановка мониторинга через 1 минуту
        setTimeout(() => {
          stopMonitoring();
          console.log('Мониторинг остановлен');
        }, 60000);
      }
    }
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}

main();
```

## Дополнительная информация

### Структура проекта

```
├── src/
│   ├── controllers/       # Контроллеры API
│   ├── middleware/        # Middleware для Express
│   ├── models/            # Модели данных
│   ├── routes/            # Определения маршрутов
│   ├── services/          # Бизнес-логика
│   ├── utils/             # Утилиты
│   └── app.js             # Точка входа приложения
├── prisma/
│   ├── schema.prisma      # Схема базы данных для MongoDB
│   └── schema.sqlite.prisma # Схема базы данных для SQLite
├── public/                # Статические файлы и веб-интерфейс
├── instances/             # Хранилище данных инстансов
├── uploads/               # Загруженные файлы
├── logs/                  # Лог-файлы
└── docker-compose.yml     # Конфигурация для Docker Compose
```

### Лицензия

Данное программное обеспечение распространяется под лицензией MIT.

---

**⚠️ Примечание:** Документация может обновляться по мере развития API. Проверяйте последнюю версию в репозитории проекта.