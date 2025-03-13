# WhatsApp Multi-Instance API Documentation

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Authentication](#authentication)
3. [Instance Management](#instance-management)
4. [WhatsApp API](#whatsapp-api)
5. [Statistics](#statistics)
6. [Webhooks](#webhooks)
7. [Error Codes](#error-codes)
8. [Usage Examples](#usage-examples)
9. [Security](#security)

## 🚀 Introduction

The WhatsApp Multi-Instance API allows you to manage multiple WhatsApp connections in a single application. The API supports two authentication schemes: JWT token and API key.

## 🔐 Authentication

### Authentication Types

#### 1. JWT Token
- Authentication via JSON Web Token mechanism
- Obtained during system login
- Passed in the header `Authorization: Bearer <token>`

#### 2. API Key
- Unique key linked to a user
- Passed in the header `x-api-key`
- Works for most endpoints

### System Login

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

### Getting Current User Information

**Endpoint:** `GET /api/auth/me`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Response:**
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

## 🖥️ Instance Management

### Creating an Instance

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
  "webhookSecret": "optional-secret-key"
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

### Getting Instance List

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

### Getting Specific Instance Information

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

### Updating an Instance

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
    "secret": "new-secret-key"
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

### Deleting an Instance

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

### Reconnecting an Instance

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

### Logging Out of WhatsApp

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

### Getting QR Code for an Instance

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

**Important:** The QR code is returned as a string that can be used to generate a QR code, not in base64 format as was previously indicated.

### Getting Instance Activity Log

**Endpoint:** `GET /api/instances/{instanceId}/activity`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Query Parameters:**
- `limit` - number of records (default 100)
- `skip` - offset (default 0)
- `actions` - comma-separated list of action types
- `startDate` - start date (ISO 8601)
- `endDate` - end date (ISO 8601)

**Successful Response:**
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

### Getting Chat Message History

**Endpoint:** `GET /api/instances/{instanceId}/chats/{chatId}/messages`

**Headers:**
- `Authorization: Bearer <jwt_token>` or
- `x-api-key: <api_key>`

**Query Parameters:**
- `limit` - number of messages (default 50)
- `skip` - offset (default 0)
- `startDate` - start date (ISO 8601)
- `endDate` - end date (ISO 8601)

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

### Getting Instance Status

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

### Getting QR Code

**Endpoint:** `GET /api/whatsapp/{instanceId}/qr`

**Headers:**
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
}
```

**Important:** The QR code is returned as a string that can be used to generate a QR code, not in base64 format.

### Sending a Text Message

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

### Sending Media via URL

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

### Sending Media from a File

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

### Getting Contacts

**Endpoint:** `GET /api/whatsapp/{instanceId}/contacts`

**Headers:**
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "contacts": [
    {
      "id": "79001234567@s.whatsapp.net",
      "name": "Ivan Ivanov",
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

### Logging Out of WhatsApp

**Endpoint:** `POST /api/whatsapp/{instanceId}/logout`

**Headers:**
- `x-api-key: <api_key>`

**Successful Response:**
```json
{
  "success": true
}
```

## 📊 Statistics

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

**Important:** Administrator rights are required

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

The system supports sending webhook notifications for various events.

### Webhook Configuration

Webhook settings are configured when creating or updating an instance.

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
    "pushName": "Ivan"
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

4. **connection_opened** - WhatsApp connection established
```json
{
  "event": "connection_opened",
  "data": {
    "instanceId": "instance_id"
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

5. **connection_closed** - WhatsApp connection closed
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

### Webhook Security

A secret key can be used to ensure webhook security. If a key is specified, the server will add an `X-Webhook-Signature` header to each request, containing an HMAC SHA-256 signature of the request body created using the secret key.

## 🚫 Error Codes

| Code | Description           | Possible Causes                                     |
|------|-----------------------|----------------------------------------------------|
| 400  | Bad Request           | Missing required fields, invalid data format        |
| 401  | Unauthorized          | Invalid token or API key, expired token             |
| 403  | Forbidden             | No permission to access the resource                |
| 404  | Resource Not Found    | Instance does not exist, message not found          |
| 500  | Internal Server Error | Server operation error, database problems           |

## 🔒 Security

### Security Recommendations

1. **HTTPS**: Always use HTTPS for API interactions.
2. **API Key Protection**: Store the API key in a secure location, do not include it in client application code.
3. **Regular Credential Updates**: Periodically change your password and API key.
4. **Access Restriction**: Configure a list of allowed IP addresses for API access.
5. **Monitoring**: Monitor activity logs to detect suspicious activities.

## 🚀 Usage Examples

### Python

```python
import requests

# Creating an instance
api_key = "YOUR_API_KEY"
base_url = "https://api.example.com/api"

# Headers for authorization
headers = {
    "x-api-key": api_key,
    "Content-Type": "application/json"
}

# Creating a new instance
instance_data = {
    "name": "Primary WhatsApp",
    "description": "Corporate account",
    "webhookUrl": "https://your-webhook.com/whatsapp"
}

response = requests.post(f"{base_url}/instances", 
                        headers=headers, 
                        json=instance_data)
instance = response.json()
instance_id = instance["id"]

# Sending a message
message_data = {
    "phone": "79001234567",
    "message": "Hi! This is a test message."
}

response = requests.post(f"{base_url}/whatsapp/{instance_id}/send", 
                        headers=headers, 
                        json=message_data)
result = response.json()
print(f"Message sent, ID: {result['id']}")
```

### Node.js

```javascript
const axios = require('axios');

// API configuration
const apiKey = 'YOUR_API_KEY';
const baseUrl = 'https://api.example.com/api';

// Headers for authorization
const headers = {
  'x-api-key': apiKey,
  'Content-Type': 'application/json'
};

// Sending a message
async function sendMessage(instanceId, phone, message) {
  try {
    const response = await axios.post(
      `${baseUrl}/whatsapp/${instanceId}/send`,
      { phone, message },
      { headers }
    );
    
    console.log(`Message sent, ID: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
    throw error;
  }
}

// Getting a QR code
async function getQrCode(instanceId) {
  try {
    const response = await axios.get(
      `${baseUrl}/whatsapp/${instanceId}/qr`,
      { headers }
    );
    
    // QR code is returned as a string that can be used to create a QR code
    const qrCode = response.data.qrCode;
    console.log('QR code received:', qrCode);
    return qrCode;
  } catch (error) {
    console.error('Error getting QR code:', error.response?.data || error.message);
    throw error;
  }
}

// Usage example
(async () => {
  const instanceId = 'YOUR_INSTANCE_ID';
  await sendMessage(instanceId, '79001234567', 'Hello from Node.js!');
})();
```

---

**⚠️ Attention:** Documentation may be updated. Always check for the current version.
