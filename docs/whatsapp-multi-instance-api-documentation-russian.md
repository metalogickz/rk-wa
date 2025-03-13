# WhatsApp Multi-Instance API Documentation

## 📋 Оглавление

1. [Введение](#введение)
2. [Аутентификация](#аутентификация)
3. [Управление Инстансами](#управление-инстансами)
4. [WhatsApp API](#whatsapp-api)
5. [Статистика](#статистика)
6. [Webhooks](#webhooks)
7. [Коды Ошибок](#коды-ошибок)
8. [Примеры Использования](#примеры-использования)
9. [Безопасность](#безопасность)

## 🚀 Введение

WhatsApp Multi-Instance API позволяет управлять несколькими WhatsApp-соединениями в одном приложении. API поддерживает две схемы аутентификации: JWT-токен и API-ключ.

## 🔐 Аутентификация

### Типы Аутентификации

#### 1. JWT-токен
- Авторизация через механизм JSON Web Token
- Получается при входе в систему
- Передается в заголовке `Authorization: Bearer <token>`

#### 2. API-ключ
- Уникальный ключ, привязанный к пользователю
- Передается в заголовке `x-api-key`
- Работает для большинства эндпоинтов

### Вход в Систему

**Endpoint:** `POST /api/auth/login`

**Тело Запроса:**
```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

**Успешный Ответ:**
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

### Получение Информации о Текущем Пользователе

**Endpoint:** `GET /api/auth/me`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Ответ:**
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

## 🖥️ Управление Инстансами

### Создание Инстанса

**Endpoint:** `POST /api/instances`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Тело Запроса:**
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
  "webhookSecret": "optional-secret-key"
}
```

**Успешный Ответ:**
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

### Получение Списка Инстансов

**Endpoint:** `GET /api/instances`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный Ответ:**
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

### Получение Информации о Конкретном Инстансе

**Endpoint:** `GET /api/instances/{instanceId}`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный Ответ:**
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
    "notifyReceived": true,
    "notifySent": true,
    "notifyDelivery": false,
    "notifyRead": false,
    "maxRetries": 3,
    "retryInterval": 60000
  },
  "connectionStatus": {
    "ready": true,
    "status": "connected",
    "hasQr": false
  }
}
```

### Обновление Инстанса

**Endpoint:** `PUT /api/instances/{instanceId}`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Тело Запроса:**
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
    "secret": "new-secret-key"
  }
}
```

**Успешный Ответ:**
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

### Удаление Инстанса

**Endpoint:** `DELETE /api/instances/{instanceId}`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный Ответ:**
```json
{
  "success": true,
  "message": "Instance instance_id deleted successfully"
}
```

### Переподключение Инстанса

**Endpoint:** `POST /api/instances/{instanceId}/reconnect`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный Ответ:**
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

**Успешный Ответ:**
```json
{
  "success": true,
  "message": "Instance instance_id logged out"
}
```

### Получение QR-кода для Инстанса

**Endpoint:** `GET /api/instances/{instanceId}/qr`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Успешный Ответ:**
```json
{
  "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
}
```

**Важно:** QR-код возвращается в виде строки, которую нужно использовать для генерации QR-кода, а не в формате base64 как было указано ранее.

### Получение Лога Активности Инстанса

**Endpoint:** `GET /api/instances/{instanceId}/activity`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Параметры запроса:**
- `limit` - количество записей (по умолчанию 100)
- `skip` - смещение (по умолчанию 0)
- `actions` - список типов действий через запятую
- `startDate` - начальная дата (ISO 8601)
- `endDate` - конечная дата (ISO 8601)

**Успешный Ответ:**
```json
{
  "logs": [
    {
      "id": "log_id",
      "instanceId": "instance_id",
      "action": "connection_opened",
      "details": {},
      "createdAt": "2023-01-01T12:00:00.000Z"
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

### Получение Истории Сообщений Чата

**Endpoint:** `GET /api/instances/{instanceId}/chats/{chatId}/messages`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Параметры запроса:**
- `limit` - количество сообщений (по умолчанию 50)
- `skip` - смещение (по умолчанию 0)
- `startDate` - начальная дата (ISO 8601)
- `endDate` - конечная дата (ISO 8601)

**Успешный Ответ:**
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
      "status": "sent",
      "createdAt": "2023-01-01T12:00:00.000Z"
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

## 📱 WhatsApp API

### Получение Статуса Инстанса

**Endpoint:** `GET /api/whatsapp/{instanceId}/status`

**Заголовки:**
- `x-api-key: <api_key>`

**Успешный Ответ:**
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

**Успешный Ответ:**
```json
{
  "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
}
```

**Важно:** QR-код возвращается в виде строки, которую нужно использовать для генерации QR-кода, а не в формате base64.

### Отправка Текстового Сообщения

**Endpoint:** `POST /api/whatsapp/{instanceId}/send`

**Заголовки:**
- `x-api-key: <api_key>`

**Тело Запроса:**
```json
{
  "phone": "79001234567",
  "message": "Привет! Как дела?"
}
```

**Успешный Ответ:**
```json
{
  "id": "whatsapp_message_id"
}
```

### Отправка Медиа по URL

**Endpoint:** `POST /api/whatsapp/{instanceId}/send-media`

**Заголовки:**
- `x-api-key: <api_key>`

**Тело Запроса:**
```json
{
  "phone": "79001234567",
  "url": "https://example.com/image.jpg",
  "caption": "Описание изображения",
  "filename": "image.jpg"
}
```

**Успешный Ответ:**
```json
{
  "id": "whatsapp_message_id"
}
```

### Отправка Медиа из Файла

**Endpoint:** `POST /api/whatsapp/{instanceId}/send-file`

**Заголовки:**
- `x-api-key: <api_key>`
- `Content-Type: multipart/form-data`

**Поля формы:**
- `phone` - номер телефона получателя
- `caption` - описание файла (опционально)
- `file` - файл для отправки

**Успешный Ответ:**
```json
{
  "id": "whatsapp_message_id"
}
```

### Получение Контактов

**Endpoint:** `GET /api/whatsapp/{instanceId}/contacts`

**Заголовки:**
- `x-api-key: <api_key>`

**Успешный Ответ:**
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

### Выход из WhatsApp

**Endpoint:** `POST /api/whatsapp/{instanceId}/logout`

**Заголовки:**
- `x-api-key: <api_key>`

**Успешный Ответ:**
```json
{
  "success": true
}
```

## 📊 Статистика

### Статистика Пользователя

**Endpoint:** `GET /api/stats/user`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Параметры запроса:**
- `period` - период статистики (week, month, year, all, по умолчанию month)

**Успешный Ответ:**
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

### Статистика Инстанса

**Endpoint:** `GET /api/stats/instances/{instanceId}`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Параметры запроса:**
- `period` - период статистики (today, week, month, all, по умолчанию today)

**Успешный Ответ:**
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

### Системная Статистика

**Endpoint:** `GET /api/stats/system`

**Заголовки:**
- `Authorization: Bearer <jwt_token>` или
- `x-api-key: <api_key>`

**Важно:** Требуются права администратора

**Успешный Ответ:**
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

Система поддерживает отправку webhook-уведомлений о различных событиях.

### Настройка Webhooks

Настройки webhook производится при создании или обновлении инстанса.

### Типы Событий

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

4. **connection_opened** - Установлено соединение с WhatsApp
```json
{
  "event": "connection_opened",
  "data": {
    "instanceId": "instance_id"
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

5. **connection_closed** - Закрыто соединение с WhatsApp
```json
{
  "event": "connection_closed",
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

### Безопасность Webhook

Для обеспечения безопасности webhook можно использовать секретный ключ. Если ключ указан, сервер будет добавлять заголовок `X-Webhook-Signature` к каждому запросу, который содержит HMAC SHA-256 подпись тела запроса, созданную с использованием секретного ключа.

## 🚫 Коды Ошибок

| Код  | Описание                 | Возможные причины                                        |
|------|--------------------------|----------------------------------------------------------|
| 400  | Некорректный запрос      | Отсутствуют обязательные поля, неверный формат данных    |
| 401  | Неавторизован            | Неверный токен или API-ключ, истекший токен              |
| 403  | Доступ запрещен          | Нет прав для доступа к ресурсу                           |
| 404  | Ресурс не найден         | Инстанс не существует, сообщение не найдено               |
| 500  | Внутренняя ошибка сервера| Ошибка в работе сервера, проблемы с базой данных        |

## 🔒 Безопасность

### Рекомендации по безопасности

1. **HTTPS**: Всегда используйте HTTPS для взаимодействия с API.
2. **Защита API-ключа**: Храните API-ключ в безопасном месте, не включайте его в код клиентских приложений.
3. **Регулярное обновление учетных данных**: Периодически меняйте пароль и API-ключ.
4. **Ограничение доступа**: Настройте список разрешенных IP-адресов для доступа к API.
5. **Мониторинг**: Следите за логами активности для выявления подозрительных действий.

## 🚀 Примеры Использования

### Python

```python
import requests

# Создание инстанса
api_key = "YOUR_API_KEY"
base_url = "https://api.example.com/api"

# Заголовки для авторизации
headers = {
    "x-api-key": api_key,
    "Content-Type": "application/json"
}

# Создание нового инстанса
instance_data = {
    "name": "Основной WhatsApp",
    "description": "Корпоративный аккаунт",
    "webhookUrl": "https://your-webhook.com/whatsapp"
}

response = requests.post(f"{base_url}/instances", 
                        headers=headers, 
                        json=instance_data)
instance = response.json()
instance_id = instance["id"]

# Отправка сообщения
message_data = {
    "phone": "79001234567",
    "message": "Привет! Это тестовое сообщение."
}

response = requests.post(f"{base_url}/whatsapp/{instance_id}/send", 
                        headers=headers, 
                        json=message_data)
result = response.json()
print(f"Сообщение отправлено, ID: {result['id']}")
```

### Node.js

```javascript
const axios = require('axios');

// Настройка API
const apiKey = 'YOUR_API_KEY';
const baseUrl = 'https://api.example.com/api';

// Заголовки для авторизации
const headers = {
  'x-api-key': apiKey,
  'Content-Type': 'application/json'
};

// Отправка сообщения
async function sendMessage(instanceId, phone, message) {
  try {
    const response = await axios.post(
      `${baseUrl}/whatsapp/${instanceId}/send`,
      { phone, message },
      { headers }
    );
    
    console.log(`Сообщение отправлено, ID: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error.response?.data || error.message);
    throw error;
  }
}

// Получение QR-кода
async function getQrCode(instanceId) {
  try {
    const response = await axios.get(
      `${baseUrl}/whatsapp/${instanceId}/qr`,
      { headers }
    );
    
    // QR-код возвращается как строка, которую нужно использовать для создания QR-кода
    const qrCode = response.data.qrCode;
    console.log('QR-код получен:', qrCode);
    return qrCode;
  } catch (error) {
    console.error('Ошибка при получении QR-кода:', error.response?.data || error.message);
    throw error;
  }
}

// Пример использования
(async () => {
  const instanceId = 'YOUR_INSTANCE_ID';
  await sendMessage(instanceId, '79001234567', 'Привет из Node.js!');
})();
```

---

**⚠️ Внимание:** Документация может обновляться. Всегда проверяйте актуальную версию.
