# WhatsApp 多实例 API 文档

## 📋 目录

1. [简介](#简介)
2. [认证](#认证)
3. [实例管理](#实例管理)
4. [WhatsApp API](#whatsapp-api)
5. [统计数据](#统计数据)
6. [Webhooks](#webhooks)
7. [错误代码](#错误代码)
8. [使用示例](#使用示例)
9. [安全](#安全)

## 🚀 简介

WhatsApp 多实例 API 允许您在单个应用程序中管理多个 WhatsApp 连接。API 支持两种认证方式：JWT 令牌和 API 密钥。

## 🔐 认证

### 认证类型

#### 1. JWT 令牌
- 通过 JSON Web Token 机制进行认证
- 在系统登录时获得
- 在请求头中以 `Authorization: Bearer <token>` 方式传递

#### 2. API 密钥
- 与用户关联的唯一密钥
- 在请求头中以 `x-api-key` 方式传递
- 适用于大多数端点

### 系统登录

**端点:** `POST /api/auth/login`

**请求体:**
```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

**成功响应:**
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

### 获取当前用户信息

**端点:** `GET /api/auth/me`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**响应:**
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

## 🖥️ 实例管理

### 创建实例

**端点:** `POST /api/instances`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**请求体:**
```json
{
  "name": "主要 WhatsApp",
  "description": "公司账户",
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

**成功响应:**
```json
{
  "id": "instance_id",
  "name": "主要 WhatsApp",
  "description": "公司账户",
  "userId": "user_id",
  "status": "connecting",
  "webhookUrl": "https://example.com/webhook",
  "webhookEnabled": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### 获取实例列表

**端点:** `GET /api/instances`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "instances": [
    {
      "id": "instance_id",
      "name": "主要 WhatsApp",
      "description": "公司账户",
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

### 获取特定实例信息

**端点:** `GET /api/instances/{instanceId}`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "id": "instance_id",
  "name": "主要 WhatsApp",
  "description": "公司账户",
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

### 更新实例

**端点:** `PUT /api/instances/{instanceId}`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**请求体:**
```json
{
  "name": "新的 WhatsApp 名称",
  "description": "更新的描述",
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

**成功响应:**
```json
{
  "id": "instance_id",
  "name": "新的 WhatsApp 名称",
  "description": "更新的描述",
  "webhookUrl": "https://new-example.com/webhook",
  "webhookEnabled": true,
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

### 删除实例

**端点:** `DELETE /api/instances/{instanceId}`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "success": true,
  "message": "Instance instance_id deleted successfully"
}
```

### 重新连接实例

**端点:** `POST /api/instances/{instanceId}/reconnect`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "success": true,
  "message": "Instance instance_id reconnected"
}
```

### 登出 WhatsApp

**端点:** `POST /api/instances/{instanceId}/logout`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "success": true,
  "message": "Instance instance_id logged out"
}
```

### 获取实例的二维码

**端点:** `GET /api/instances/{instanceId}/qr`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
}
```

**重要提示:** 二维码以字符串形式返回，可用于生成二维码，而不是之前所指的 base64 格式。

### 获取实例活动日志

**端点:** `GET /api/instances/{instanceId}/activity`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**查询参数:**
- `limit` - 记录数量（默认 100）
- `skip` - 偏移量（默认 0）
- `actions` - 以逗号分隔的操作类型列表
- `startDate` - 开始日期（ISO 8601）
- `endDate` - 结束日期（ISO 8601）

**成功响应:**
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

### 获取聊天消息历史

**端点:** `GET /api/instances/{instanceId}/chats/{chatId}/messages`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**查询参数:**
- `limit` - 消息数量（默认 50）
- `skip` - 偏移量（默认 0）
- `startDate` - 开始日期（ISO 8601）
- `endDate` - 结束日期（ISO 8601）

**成功响应:**
```json
{
  "messages": [
    {
      "id": "message_id",
      "instanceId": "instance_id",
      "remoteJid": "79001234567@s.whatsapp.net",
      "fromMe": true,
      "messageType": "text",
      "content": "你好！最近怎么样？",
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

### 获取实例状态

**端点:** `GET /api/whatsapp/{instanceId}/status`

**请求头:**
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "ready": true,
  "status": "connected",
  "hasQr": false
}
```

### 获取二维码

**端点:** `GET /api/whatsapp/{instanceId}/qr`

**请求头:**
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
}
```

**重要提示:** 二维码以字符串形式返回，可用于生成二维码，而不是 base64 格式。

### 发送文本消息

**端点:** `POST /api/whatsapp/{instanceId}/send`

**请求头:**
- `x-api-key: <api_key>`

**请求体:**
```json
{
  "phone": "79001234567",
  "message": "你好！最近怎么样？"
}
```

**成功响应:**
```json
{
  "id": "whatsapp_message_id"
}
```

### 通过 URL 发送媒体

**端点:** `POST /api/whatsapp/{instanceId}/send-media`

**请求头:**
- `x-api-key: <api_key>`

**请求体:**
```json
{
  "phone": "79001234567",
  "url": "https://example.com/image.jpg",
  "caption": "图片描述",
  "filename": "image.jpg"
}
```

**成功响应:**
```json
{
  "id": "whatsapp_message_id"
}
```

### 从文件发送媒体

**端点:** `POST /api/whatsapp/{instanceId}/send-file`

**请求头:**
- `x-api-key: <api_key>`
- `Content-Type: multipart/form-data`

**表单字段:**
- `phone` - 接收者电话号码
- `caption` - 文件描述（可选）
- `file` - 要发送的文件

**成功响应:**
```json
{
  "id": "whatsapp_message_id"
}
```

### 获取联系人

**端点:** `GET /api/whatsapp/{instanceId}/contacts`

**请求头:**
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "contacts": [
    {
      "id": "79001234567@s.whatsapp.net",
      "name": "伊万·伊万诺夫",
      "number": "79001234567",
      "isGroup": false
    },
    {
      "id": "1234567890@g.us",
      "name": "工作群组",
      "number": "1234567890",
      "isGroup": true
    }
  ]
}
```

### 登出 WhatsApp

**端点:** `POST /api/whatsapp/{instanceId}/logout`

**请求头:**
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "success": true
}
```

## 📊 统计数据

### 用户统计

**端点:** `GET /api/stats/user`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**查询参数:**
- `period` - 统计周期（week, month, year, all，默认为 month）

**成功响应:**
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
      "name": "主要 WhatsApp",
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

### 实例统计

**端点:** `GET /api/stats/instances/{instanceId}`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**查询参数:**
- `period` - 统计周期（today, week, month, all，默认为 today）

**成功响应:**
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

### 系统统计

**端点:** `GET /api/stats/system`

**请求头:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**重要提示:** 需要管理员权限

**成功响应:**
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

系统支持为各种事件发送 webhook 通知。

### Webhook 配置

Webhook 设置在创建或更新实例时配置。

### 事件类型

1. **message_received** - 收到新消息
```json
{
  "event": "message_received",
  "data": {
    "instanceId": "instance_id",
    "messageId": "whatsapp_message_id",
    "from": "79001234567@s.whatsapp.net",
    "body": "你好！最近怎么样？",
    "type": "conversation",
    "timestamp": 1672531200,
    "hasMedia": false,
    "pushName": "伊万"
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

2. **message_sent** - 消息已发送
```json
{
  "event": "message_sent",
  "data": {
    "instanceId": "instance_id",
    "messageId": "whatsapp_message_id",
    "to": "79001234567@s.whatsapp.net",
    "body": "你好！我很好。",
    "type": "text",
    "timestamp": 1672531200,
    "hasMedia": false
  },
  "timestamp": "2023-01-01T12:01:00.000Z"
}
```

3. **message_status** - 消息状态变更
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

4. **connection_opened** - WhatsApp 连接已建立
```json
{
  "event": "connection_opened",
  "data": {
    "instanceId": "instance_id"
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

5. **connection_closed** - WhatsApp 连接已关闭
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

6. **qr_received** - 收到用于认证的二维码
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

### Webhook 安全

可以使用密钥确保 webhook 安全。如果指定了密钥，服务器将在每个请求中添加 `X-Webhook-Signature` 头，其中包含使用密钥创建的请求体的 HMAC SHA-256 签名。

## 🚫 错误代码

| 代码 | 描述               | 可能原因                                |
|------|------------------|-----------------------------------------|
| 400  | 请求错误           | 缺少必填字段，数据格式无效               |
| 401  | 未授权             | 无效的令牌或 API 密钥，令牌已过期        |
| 403  | 禁止访问           | 没有访问资源的权限                       |
| 404  | 资源未找到         | 实例不存在，消息未找到                   |
| 500  | 服务器内部错误     | 服务器操作错误，数据库问题               |

## 🔒 安全

### 安全建议

1. **HTTPS**: 始终使用 HTTPS 进行 API 交互。
2. **API 密钥保护**: 将 API 密钥存储在安全位置，不要将其包含在客户端应用程序代码中。
3. **定期更新凭证**: 定期更改密码和 API 密钥。
4. **访问限制**: 配置允许访问 API 的 IP 地址列表。
5. **监控**: 监控活动日志以检测可疑活动。

## 🚀 使用示例

### Python

```python
import requests

# 创建实例
api_key = "YOUR_API_KEY"
base_url = "https://api.example.com/api"

# 授权请求头
headers = {
    "x-api-key": api_key,
    "Content-Type": "application/json"
}

# 创建新实例
instance_data = {
    "name": "主要 WhatsApp",
    "description": "公司账户",
    "webhookUrl": "https://your-webhook.com/whatsapp"
}

response = requests.post(f"{base_url}/instances", 
                        headers=headers, 
                        json=instance_data)
instance = response.json()
instance_id = instance["id"]

# 发送消息
message_data = {
    "phone": "79001234567",
    "message": "你好！这是一条测试消息。"
}

response = requests.post(f"{base_url}/whatsapp/{instance_id}/send", 
                        headers=headers, 
                        json=message_data)
result = response.json()
print(f"消息已发送，ID: {result['id']}")
```

### Node.js

```javascript
const axios = require('axios');

// API 配置
const apiKey = 'YOUR_API_KEY';
const baseUrl = 'https://api.example.com/api';

// 授权请求头
const headers = {
  'x-api-key': apiKey,
  'Content-Type': 'application/json'
};

// 发送消息
async function sendMessage(instanceId, phone, message) {
  try {
    const response = await axios.post(
      `${baseUrl}/whatsapp/${instanceId}/send`,
      { phone, message },
      { headers }
    );
    
    console.log(`消息已发送，ID: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('发送消息出错:', error.response?.data || error.message);
    throw error;
  }
}

// 获取二维码
async function getQrCode(instanceId) {
  try {
    const response = await axios.get(
      `${baseUrl}/whatsapp/${instanceId}/qr`,
      { headers }
    );
    
    // 二维码以字符串形式返回，可用于创建二维码
    const qrCode = response.data.qrCode;
    console.log('已收到二维码:', qrCode);
    return qrCode;
  } catch (error) {
    console.error('获取二维码出错:', error.response?.data || error.message);
    throw error;
  }
}

// 使用示例
(async () => {
  const instanceId = 'YOUR_INSTANCE_ID';
  await sendMessage(instanceId, '79001234567', '来自 Node.js 的问候！');
})();
```

---

**⚠️ 注意:** 文档可能会更新。请始终查看最新版本。
