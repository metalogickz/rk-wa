# WhatsApp Multi-Instance API - Documentation

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Authentication](#authentication)
4. [Instance Management](#instance-management)
5. [WhatsApp API](#whatsapp-api)
6. [Contacts](#contacts)
7. [Chats and Messages](#chats-and-messages)
8. [Statistics and Monitoring](#statistics-and-monitoring)
9. [Webhooks](#webhooks)
10. [Database Management](#database-management)
11. [Error Codes](#error-codes)
12. [Usage Examples](#usage-examples)

## 🚀 Introduction

WhatsApp Multi-Instance API allows you to manage multiple WhatsApp connections in a single application. The API supports two authentication schemes: JWT token and API key, as well as two storage systems: MongoDB and SQLite.

### Key Features

- Management of multiple WhatsApp instances
- Sending and receiving text messages and media files
- Contact management
- Message history storage
- Webhook notifications for events
- Usage statistics
- Support for two types of databases (MongoDB/SQLite)
- User administration

## 🔧 Getting Started

### System Requirements

- Node.js 18.0 or higher
- MongoDB (optional)
- SQLite (optional)

### Installation Using Docker

```bash
# Clone the repository
git clone https://github.com/your-username/whatsapp-multi-instance-api.git

# Navigate to project directory
cd whatsapp-multi-instance-api

# Run using Docker Compose
docker-compose up -d
```

### Environment Variable Configuration

Main configuration settings:

```
# Database type
DATABASE_PROVIDER=sqlite  # mongodb or sqlite

# MongoDB settings
DATABASE_URL=mongodb://username:password@hostname:port/database

# SQLite settings
SQLITE_DATABASE_URL=file:./data/whatsapp-api.db

# Secret for JWT tokens
JWT_SECRET=your-jwt-secret-key-here
JWT_EXPIRATION=24h

# Default administrator data
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=User
```

## 🔐 Authentication

The API supports two authentication methods:

### JWT Token

- Token is obtained when logging into the system via `/api/auth/login`
- Passed in the `Authorization: Bearer <token>` header
- Token expiration is configurable via `JWT_EXPIRATION`

### API Key

- Unique key associated with a user
- Automatically generated when creating a user
- Passed in the `x-api-key: <api_key>` header

### Authentication Routes

#### Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

**Successful Response:**
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

#### Get Current User Data

**Endpoint:** `GET /api/auth/me`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

## 🖥️ Instance Management

### Create Instance

**Endpoint:** `POST /api/instances`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Request Body:**
```json
{
  "name": "Primary WhatsApp",
  "description": "Corporate account",
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

**Successful Response:**
```json
{
  "id": "instance_id",
  "name": "Primary WhatsApp",
  "description": "Corporate account",
  "userId": "user_id",
  "status": "connecting",
  "webhookUrl": "https://example.com/webhook",
  "webhookEnabled": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Get Instance List

**Endpoint:** `GET /api/instances`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "instances": [
    {
      "id": "instance_id",
      "name": "Primary WhatsApp",
      "description": "Corporate account",
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

### Get Specific Instance Information

**Endpoint:** `GET /api/instances/{instanceId}`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "id": "instance_id",
  "name": "Primary WhatsApp",
  "description": "Corporate account",
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

### Get Instance Status

**Endpoint:** `GET /api/instances/{instanceId}/status`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Successful Response:**
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

### Update Instance

**Endpoint:** `PUT /api/instances/{instanceId}`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Request Body:**
```json
{
  "name": "New WhatsApp Name",
  "description": "Updated description",
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

**Successful Response:**
```json
{
  "id": "instance_id",
  "name": "New WhatsApp Name",
  "description": "Updated description",
  "webhookUrl": "https://new-example.com/webhook",
  "webhookEnabled": true,
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

### Delete Instance

**Endpoint:** `DELETE /api/instances/{instanceId}`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "success": true,
  "message": "Instance instance_id deleted successfully"
}
```

### Reconnect Instance

**Endpoint:** `POST /api/instances/{instanceId}/reconnect`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "success": true,
  "message": "Instance instance_id reconnected"
}
```

### Logout from WhatsApp

**Endpoint:** `POST /api/instances/{instanceId}/logout`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "success": true,
  "message": "Instance instance_id logged out"
}
```

### Get QR Code for Instance

**Endpoint:** `GET /api/instances/{instanceId}/qr`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
}
```

**Response When Generating:**
```json
{
  "message": "QR code generation in progress. Please try again in a few seconds.",
  "status": "generating"
}
```

### Get Instance Activity Log

**Endpoint:** `GET /api/instances/{instanceId}/activity`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Query Parameters:**
- `limit` - number of records (default 100)
- `skip` - offset (default 0)
- `actions` - list of action types separated by commas (e.g., `connected,disconnected,qr_received`)
- `startDate` - start date in ISO 8601 format
- `endDate` - end date in ISO 8601 format

**Successful Response:**
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

### Get Latest Instance Events

**Endpoint:** `GET /api/instances/{instanceId}/events`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Query Parameters:**
- `since` - timestamp in ISO 8601 format from which to get events
- `limit` - maximum number of events (default 20)
- `types` - event types separated by commas (e.g., `message_sent,message_received,message_status`)

**Successful Response:**
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
        "body": "Hi! How are you?",
        "hasMedia": false,
        "status": "received",
        "metadata": {
          "pushName": "John",
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

### Get Instance Status

**Endpoint:** `GET /api/whatsapp/{instanceId}/status`

**Headers:**
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "ready": true,
  "status": "connected",
  "hasQr": false
}
```

### Get QR Code

**Endpoint:** `GET /api/whatsapp/{instanceId}/qr`

**Headers:**
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
}
```

### Send Text Message

**Endpoint:** `POST /api/whatsapp/{instanceId}/send`

**Headers:**
- `x-api-key: <api_key>`

**Request Body:**
```json
{
  "phone": "79001234567",
  "message": "Hi! How are you?"
}
```

**Successful Response:**
```json
{
  "id": "whatsapp_message_id"
}
```

### Send Media via URL

**Endpoint:** `POST /api/whatsapp/{instanceId}/send-media`

**Headers:**
- `x-api-key: <api_key>`

**Request Body:**
```json
{
  "phone": "79001234567",
  "url": "https://example.com/image.jpg",
  "caption": "Image description",
  "filename": "image.jpg"
}
```

**Successful Response:**
```json
{
  "id": "whatsapp_message_id"
}
```

### Send Media from File

**Endpoint:** `POST /api/whatsapp/{instanceId}/send-file`

**Headers:**
- `x-api-key: <api_key>`
- `Content-Type: multipart/form-data`

**Form Fields:**
- `phone` - recipient's phone number
- `caption` - file description (optional)
- `file` - file to send

**Successful Response:**
```json
{
  "id": "whatsapp_message_id"
}
```

### Logout from WhatsApp

**Endpoint:** `POST /api/whatsapp/{instanceId}/logout`

**Headers:**
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "success": true
}
```

## 👥 Contacts

### Get Contacts from WhatsApp

**Endpoint:** `GET /api/whatsapp/{instanceId}/contacts`

**Headers:**
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "contacts": [
    {
      "id": "79001234567@s.whatsapp.net",
      "name": "John Doe",
      "number": "79001234567",
      "isGroup": false
    },
    {
      "id": "1234567890@g.us",
      "name": "Work Group",
      "number": "1234567890",
      "isGroup": true
    }
  ]
}
```

### Add Contact to WhatsApp

**Endpoint:** `POST /api/whatsapp/{instanceId}/contacts/add`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Request Body:**
```json
{
  "phone": "79001234567",
  "name": "John Doe"
}
```

**Successful Response:**
```json
{
  "success": true,
  "message": "Contact successfully added",
  "contact": {
    "id": "79001234567@s.whatsapp.net",
    "number": "79001234567",
    "name": "John Doe"
  }
}
```

### Get Contacts from Database

**Endpoint:** `GET /api/instances/{instanceId}/contacts/db` or `GET /api/whatsapp/{instanceId}/contacts/db`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Query Parameters:**
- `limit` - number of contacts (default 100)
- `skip` - offset (default 0)
- `search` - search string for name or number
- `onlyGroups` - filter only for groups (true/false)

**Successful Response:**
```json
{
  "contacts": [
    {
      "id": "contact_id",
      "instanceId": "instance_id",
      "name": "John Doe",
      "number": "79001234567",
      "remoteJid": "79001234567@s.whatsapp.net",
      "pushName": "John",
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

### Import Contacts from WhatsApp to Database

**Endpoint:** `POST /api/instances/{instanceId}/contacts/import` or `POST /api/whatsapp/{instanceId}/contacts/import`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "success": true,
  "message": "Successfully imported 25 contacts",
  "importedCount": 25
}
```

### Save or Update Contact in Database

**Endpoint:** `POST /api/instances/{instanceId}/contacts/save` or `POST /api/whatsapp/{instanceId}/contacts/save`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Request Body:**
```json
{
  "number": "79001234567",
  "name": "John Doe",
  "pushName": "John",
  "isGroup": false,
  "profilePicture": "url-to-picture",
  "about": "User status"
}
```

**Successful Response:**
```json
{
  "id": "contact_id",
  "instanceId": "instance_id",
  "name": "John Doe",
  "number": "79001234567",
  "remoteJid": "79001234567@s.whatsapp.net",
  "pushName": "John",
  "isGroup": false,
  "profilePicture": "url-to-picture",
  "about": "User status",
  "lastActivity": "2023-01-01T12:00:00.000Z",
  "createdAt": "2023-01-01T10:00:00.000Z",
  "updatedAt": "2023-01-01T12:00:00.000Z"
}
```

## 💬 Chats and Messages

### Get Chat Message History

**Endpoint:** `GET /api/instances/{instanceId}/chats/{chatId}/messages`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Query Parameters:**
- `limit` - number of messages (default 50)
- `skip` - offset (default 0)
- `startDate` - start date in ISO 8601 format
- `endDate` - end date in ISO 8601 format

**Successful Response:**
```json
{
  "messages": [
    {
      "id": "message_id",
      "instanceId": "instance_id",
      "remoteJid": "79001234567@s.whatsapp.net",
      "fromMe": true,
      "messageType": "text",
      "content": "Hi! How are you?",
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

## 📊 Statistics and Monitoring

### User Statistics

**Endpoint:** `GET /api/stats/user`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Query Parameters:**
- `period` - statistics period (week, month, year, all, default is month)

**Successful Response:**
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
      "name": "Primary WhatsApp",
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

### Instance Statistics

**Endpoint:** `GET /api/stats/instances/{instanceId}`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Query Parameters:**
- `period` - statistics period (today, week, month, all, default is today)

**Successful Response:**
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

### System Statistics

**Endpoint:** `GET /api/stats/system`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Important:** Administrator rights required

**Successful Response:**
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

The system supports sending webhook notifications for various events. Webhook settings are configured when creating or updating an instance.

### Event Types

1. **message_received** - New message received
```json
{
  "event": "message_received",
  "data": {
    "instanceId": "instance_id",
    "messageId": "whatsapp_message_id",
    "from": "79001234567@s.whatsapp.net",
    "body": "Hi! How are you?",
    "type": "conversation",
    "timestamp": 1672531200,
    "hasMedia": false,
    "pushName": "John"
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

2. **message_sent** - Message sent
```json
{
  "event": "message_sent",
  "data": {
    "instanceId": "instance_id",
    "messageId": "whatsapp_message_id",
    "to": "79001234567@s.whatsapp.net",
    "body": "Hi! I'm doing well.",
    "type": "text",
    "timestamp": 1672531200,
    "hasMedia": false
  },
  "timestamp": "2023-01-01T12:01:00.000Z"
}
```

3. **message_status** - Message status change
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

4. **connected** - WhatsApp connection established
```json
{
  "event": "connected",
  "data": {
    "instanceId": "instance_id"
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

5. **disconnected** - WhatsApp connection closed
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

6. **qr_received** - QR code received for authentication
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

7. **limit_exceeded** - Usage limits exceeded
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

8. **webhook_updated** - Webhook settings updated
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

### Webhook Security

A secret key can be used to ensure webhook security. If a key is specified, the server will add an `X-Webhook-Signature` header to each request, containing an HMAC SHA-256 signature of the request body created using the secret key.

Example of signature verification on the recipient side:

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

// Usage in Express
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const secret = 'your-webhook-secret';
  
  if (!signature || !verifyWebhookSignature(req.body, signature, secret)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook
  // ...
  
  res.sendStatus(200);
});
```

## 🔄 Database Management

The API supports working with two types of databases: MongoDB and SQLite. You can switch between them even during operation.

### Get Database Status

**Endpoint:** `GET /api/db/status`

**Response:**
```json
{
  "provider": "sqlite",
  "url": "file:./data/whatsapp-api.db"
}
```

### Switch Database Provider

**Endpoint:** `POST /api/db/switch`

**Request Body:**
```json
{
  "provider": "mongodb"
}
```

**Successful Response:**
```json
{
  "success": true,
  "message": "Database provider switched to mongodb",
  "provider": "mongodb"
}
```

## 🚫 Error Codes

| Code | Description            | Possible Causes                                    |
|------|------------------------|---------------------------------------------------|
| 400  | Bad Request           | Missing required fields, invalid data format       |
| 401  | Unauthorized          | Invalid token or API key, expired token            |
| 403  | Forbidden             | No permission to access the resource               |
| 404  | Resource Not Found    | Instance does not exist, message not found         |
| 500  | Internal Server Error | Server operation error, database problems          |

## 🚀 Usage Examples

### Python

```python
import requests
import qrcode
import time
from io import BytesIO
from PIL import Image

# API Configuration
api_key = "YOUR_API_KEY"
base_url = "https://api.example.com/api"

# Headers for authentication
headers = {
    "x-api-key": api_key,
    "Content-Type": "application/json"
}

# Create new instance
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
        raise Exception(f"Error creating instance: {response.text}")

# Get and display QR code
def get_and_display_qr(instance_id):
    print("Getting QR code...")
    
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
            print("Scan the QR code in WhatsApp app")
            return True
        elif response.status_code == 202:
            print("QR code still generating, waiting...")
            time.sleep(3)
        else:
            print(f"Attempt {attempt+1}/{max_attempts}: failed to get QR code")
            time.sleep(2)
    
    return False

# Send message
def send_message(instance_id, phone, message):
    response = requests.post(
        f"{base_url}/whatsapp/{instance_id}/send", 
        headers=headers, 
        json={"phone": phone, "message": message}
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error sending message: {response.text}")

# Send image
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
        raise Exception(f"Error sending image: {response.text}")

# Monitor incoming messages
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
        print("Monitoring stopped")

# Usage example
if __name__ == "__main__":
    # Create new instance
    instance = create_instance(
        "Test Instance", 
        "Created via Python SDK",
        "https://webhook.example.com/whatsapp"
    )
    
    instance_id = instance["id"]
    print(f"Instance created with ID: {instance_id}")
    
    # Get and display QR code
    if get_and_display_qr(instance_id):
        print("Waiting for QR code scanning...")
        time.sleep(20)  # Give time for scanning
        
        # Send test message
        result = send_message(instance_id, "79001234567", "Test message from Python")
        print(f"Message sent, ID: {result['id']}")
        
        # Monitor incoming messages (commented for example)
        # def message_handler(message):
        #     print(f"New message from {message['from']}: {message['body']}")
        #
        # monitor_messages(instance_id, message_handler)
```

### Node.js

```javascript
const axios = require('axios');
const qrcode = require('qrcode-terminal');

// API Configuration
const apiKey = 'YOUR_API_KEY';
const baseUrl = 'https://api.example.com/api';

// Headers for authentication
const headers = {
  'x-api-key': apiKey,
  'Content-Type': 'application/json'
};

// Class for working with WhatsApp Multi-Instance API
class WhatsAppAPI {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'x-api-key': apiKey,
      'Content-Type': 'application/json'
    };
  }
  
  // Create new instance
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
      console.error('Error creating instance:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // Get and display QR code
  async getAndDisplayQR(instanceId, maxAttempts = 10) {
    console.log('Getting QR code...');
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await axios.get(
          `${this.baseUrl}/instances/${instanceId}/qr`,
          { headers: this.headers }
        );
        
        if (response.data.qrCode) {
          // Display QR code in console
          qrcode.generate(response.data.qrCode);
          console.log('Scan the QR code in WhatsApp app');
          return true;
        }
      } catch (error) {
        if (error.response?.status === 202) {
          console.log('QR code still generating, waiting...');
        } else {
          console.log(`Attempt ${attempt+1}/${maxAttempts}: failed to get QR code`);
        }
      }
      
      // Wait before next attempt
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    return false;
  }
  
  // Check instance status
  async checkStatus(instanceId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/whatsapp/${instanceId}/status`,
        { headers: this.headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error checking status:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // Send message
  async sendMessage(instanceId, phone, message) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/whatsapp/${instanceId}/send`,
        { phone, message },
        { headers: this.headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // Send image
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
      console.error('Error sending image:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // Get contacts
  async getContacts(instanceId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/whatsapp/${instanceId}/contacts`,
        { headers: this.headers }
      );
      
      return response.data.contacts;
    } catch (error) {
      console.error('Error getting contacts:', error.response?.data || error.message);
      return [];
    }
  }
  
  // Monitor incoming messages
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
        console.error('Error monitoring messages:', error.message);
      }
    };
    
    // Start interval to check for new messages
    const intervalId = setInterval(checkMessages, interval);
    
    // Return function to stop monitoring
    return () => clearInterval(intervalId);
  }
}

// Usage example
async function main() {
  const whatsapp = new WhatsAppAPI(apiKey, baseUrl);
  
  try {
    // Create new instance
    const instance = await whatsapp.createInstance(
      'Test Instance',
      'Created via Node.js SDK',
      'https://webhook.example.com/whatsapp'
    );
    
    const instanceId = instance.id;
    console.log(`Instance created with ID: ${instanceId}`);
    
    // Get and display QR code
    if (await whatsapp.getAndDisplayQR(instanceId)) {
      console.log('Waiting for QR code scanning...');
      
      // Give time for scanning
      await new Promise(resolve => setTimeout(resolve, 20000));
      
      // Check status
      const status = await whatsapp.checkStatus(instanceId);
      console.log('Instance status:', status);
      
      if (status.ready) {
        // Send test message
        const result = await whatsapp.sendMessage(
          instanceId,
          '79001234567',
          'Test message from Node.js'
        );
        
        console.log(`Message sent, ID: ${result.id}`);
        
        // Start message monitoring
        const stopMonitoring = await whatsapp.monitorMessages(
          instanceId,
          (message) => {
            console.log(`New message from ${message.from}: ${message.body}`);
          }
        );
        
        // Stop monitoring after 1 minute
        setTimeout(() => {
          stopMonitoring();
          console.log('Monitoring stopped');
        }, 60000);
      }
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();
```

## Additional Information

### Project Structure

```
├── src/
│   ├── controllers/       # API controllers
│   ├── middleware/        # Express middleware
│   ├── models/            # Data models
│   ├── routes/            # Route definitions
│   ├── services/          # Business logic
│   ├── utils/             # Utilities
│   └── app.js             # Application entry point
├── prisma/
│   ├── schema.prisma      # Database schema for MongoDB
│   └── schema.sqlite.prisma # Database schema for SQLite
├── public/                # Static files and web interface
├── instances/             # Instance data storage
├── uploads/               # Uploaded files
├── logs/                  # Log files
└── docker-compose.yml     # Docker Compose configuration
```

### License

This software is distributed under the MIT License.

---

**⚠️ Note:** Documentation may be updated as the API evolves. Check the project repository for the latest version.