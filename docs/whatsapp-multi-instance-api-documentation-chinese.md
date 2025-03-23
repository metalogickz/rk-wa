# WhatsApp 多实例 API - 文档

## 📋 目录

1. [简介](#简介)
2. [入门指南](#入门指南)
3. [认证](#认证)
4. [实例管理](#实例管理)
5. [WhatsApp API](#whatsapp-api)
6. [联系人](#联系人)
7. [聊天和消息](#聊天和消息)
8. [统计和监控](#统计和监控)
9. [Webhooks](#webhooks)
10. [数据库管理](#数据库管理)
11. [错误代码](#错误代码)
12. [使用示例](#使用示例)

## 🚀 简介

WhatsApp 多实例 API 允许您在单个应用程序中管理多个 WhatsApp 连接。API 支持两种认证方式：JWT 令牌和 API 密钥，以及两种存储系统：MongoDB 和 SQLite。

### 主要功能

- 管理多个 WhatsApp 实例
- 发送和接收文本消息和媒体文件
- 联系人管理
- 消息历史存储
- 事件的 Webhook 通知
- 使用统计
- 支持两种数据库类型 (MongoDB/SQLite)
- 用户管理

## 🔧 入门指南

### 系统要求

- Node.js 18.0 或更高版本
- MongoDB (可选)
- SQLite (可选)

### 使用 Docker 安装

```bash
# 克隆仓库
git clone https://github.com/your-username/whatsapp-multi-instance-api.git

# 进入项目目录
cd whatsapp-multi-instance-api

# 使用 Docker Compose 运行
docker-compose up -d
```

### 环境变量配置

主要配置设置：

```
# 数据库类型
DATABASE_PROVIDER=sqlite  # mongodb 或 sqlite

# MongoDB 设置
DATABASE_URL=mongodb://username:password@hostname:port/database

# SQLite 设置
SQLITE_DATABASE_URL=file:./data/whatsapp-api.db

# JWT 令牌密钥
JWT_SECRET=your-jwt-secret-key-here
JWT_EXPIRATION=24h

# 默认管理员数据
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=User
```

## 🔐 认证

API 支持两种认证方法：

### JWT 令牌

- 通过 `/api/auth/login` 登录系统时获取令牌
- 在 `Authorization: Bearer <token>` 头中传递
- 令牌过期时间可通过 `JWT_EXPIRATION` 配置

### API 密钥

- 与用户关联的唯一密钥
- 创建用户时自动生成
- 在 `x-api-key: <api_key>` 头中传递

### 认证路由

#### 登录

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

#### 获取当前用户数据

**端点:** `GET /api/auth/me`

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**成功响应:**
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

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**请求体:**
```json
{
  "name": "主要 WhatsApp",
  "description": "企业账户",
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

**成功响应:**
```json
{
  "id": "instance_id",
  "name": "主要 WhatsApp",
  "description": "企业账户",
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

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "instances": [
    {
      "id": "instance_id",
      "name": "主要 WhatsApp",
      "description": "企业账户",
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

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "id": "instance_id",
  "name": "主要 WhatsApp",
  "description": "企业账户",
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

### 获取实例状态

**端点:** `GET /api/instances/{instanceId}/status`

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**成功响应:**
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

### 更新实例

**端点:** `PUT /api/instances/{instanceId}`

**头信息:**
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
    "secret": "new-secret-key",
    "headers": {
      "New-Custom-Header": "new-value"
    }
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

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "success": true,
  "message": "Instance instance_id deleted successfully"
}
```

### 重连实例

**端点:** `POST /api/instances/{instanceId}/reconnect`

**头信息:**
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

**头信息:**
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

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
}
```

**生成中响应:**
```json
{
  "message": "QR code generation in progress. Please try again in a few seconds.",
  "status": "generating"
}
```

### 获取实例活动日志

**端点:** `GET /api/instances/{instanceId}/activity`

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**查询参数:**
- `limit` - 记录数量 (默认 100)
- `skip` - 偏移量 (默认 0)
- `actions` - 以逗号分隔的操作类型列表 (例如, `connected,disconnected,qr_received`)
- `startDate` - 开始日期 (ISO 8601 格式)
- `endDate` - 结束日期 (ISO 8601 格式)

**成功响应:**
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

### 获取最新实例事件

**端点:** `GET /api/instances/{instanceId}/events`

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**查询参数:**
- `since` - ISO 8601 格式的时间戳，从该时间开始获取事件
- `limit` - 最大事件数量 (默认 20)
- `types` - 以逗号分隔的事件类型 (例如, `message_sent,message_received,message_status`)

**成功响应:**
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
        "body": "你好！最近怎么样？",
        "hasMedia": false,
        "status": "received",
        "metadata": {
          "pushName": "张三",
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

### 获取实例状态

**端点:** `GET /api/whatsapp/{instanceId}/status`

**头信息:**
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

**头信息:**
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
}
```

### 发送文本消息

**端点:** `POST /api/whatsapp/{instanceId}/send`

**头信息:**
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

**头信息:**
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

**头信息:**
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

### 从 WhatsApp 登出

**端点:** `POST /api/whatsapp/{instanceId}/logout`

**头信息:**
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "success": true
}
```

## 👥 联系人

### 从 WhatsApp 获取联系人

**端点:** `GET /api/whatsapp/{instanceId}/contacts`

**头信息:**
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "contacts": [
    {
      "id": "79001234567@s.whatsapp.net",
      "name": "张三",
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

### 添加联系人到 WhatsApp

**端点:** `POST /api/whatsapp/{instanceId}/contacts/add`

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**请求体:**
```json
{
  "phone": "79001234567",
  "name": "张三"
}
```

**成功响应:**
```json
{
  "success": true,
  "message": "联系人添加成功",
  "contact": {
    "id": "79001234567@s.whatsapp.net",
    "number": "79001234567",
    "name": "张三"
  }
}
```

### 从数据库获取联系人

**端点:** `GET /api/instances/{instanceId}/contacts/db` 或 `GET /api/whatsapp/{instanceId}/contacts/db`

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**查询参数:**
- `limit` - 联系人数量（默认 100）
- `skip` - 偏移量（默认 0）
- `search` - 按名称或号码搜索的字符串
- `onlyGroups` - 仅群组过滤器（true/false）

**成功响应:**
```json
{
  "contacts": [
    {
      "id": "contact_id",
      "instanceId": "instance_id",
      "name": "张三",
      "number": "79001234567",
      "remoteJid": "79001234567@s.whatsapp.net",
      "pushName": "张三",
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

### 从 WhatsApp 导入联系人到数据库

**端点:** `POST /api/instances/{instanceId}/contacts/import` 或 `POST /api/whatsapp/{instanceId}/contacts/import`

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**成功响应:**
```json
{
  "success": true,
  "message": "成功导入 25 个联系人",
  "importedCount": 25
}
```

### 在数据库中保存或更新联系人

**端点:** `POST /api/instances/{instanceId}/contacts/save` 或 `POST /api/whatsapp/{instanceId}/contacts/save`

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**请求体:**
```json
{
  "number": "79001234567",
  "name": "张三",
  "pushName": "三",
  "isGroup": false,
  "profilePicture": "url-to-picture",
  "about": "用户状态"
}
```

**成功响应:**
```json
{
  "id": "contact_id",
  "instanceId": "instance_id",
  "name": "张三",
  "number": "79001234567",
  "remoteJid": "79001234567@s.whatsapp.net",
  "pushName": "三",
  "isGroup": false,
  "profilePicture": "url-to-picture",
  "about": "用户状态",
  "lastActivity": "2023-01-01T12:00:00.000Z",
  "createdAt": "2023-01-01T10:00:00.000Z",
  "updatedAt": "2023-01-01T12:00:00.000Z"
}
```

## 💬 聊天和消息

### 获取聊天消息历史

**端点:** `GET /api/instances/{instanceId}/chats/{chatId}/messages`

**头信息:**
- `Authorization: Bearer <jwt_token>` 或
- `x-api-key: <api_key>`

**查询参数:**
- `limit` - 消息数量（默认 50）
- `skip` - 偏移量（默认 0）
- `startDate` - 开始日期（ISO 8601 格式）
- `endDate` - 结束日期（ISO 8601 格式）

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

## 📊 统计和监控

### 用户统计

**端点:** `GET /api/stats/user`

**头信息:**
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

**头信息:**
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

**头信息:**
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

系统支持为各种事件发送 webhook 通知。Webhook 设置在创建或更新实例时配置。

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
    "pushName": "张三"
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

4. **connected** - WhatsApp 连接已建立
```json
{
  "event": "connected",
  "data": {
    "instanceId": "instance_id"
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

5. **disconnected** - WhatsApp 连接已关闭
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

7. **limit_exceeded** - 使用限制超出
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

8. **webhook_updated** - Webhook 设置更新
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

### Webhook 安全

可以使用密钥确保 webhook 安全。如果指定了密钥，服务器将在每个请求中添加 `X-Webhook-Signature` 头，其中包含使用密钥创建的请求体的 HMAC SHA-256 签名。

接收方验证签名示例：

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

// 在 Express 中使用
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const secret = 'your-webhook-secret';
  
  if (!signature || !verifyWebhookSignature(req.body, signature, secret)) {
    return res.status(401).send('无效签名');
  }
  
  // 处理 webhook
  // ...
  
  res.sendStatus(200);
});
```

## 🔄 数据库管理

API 支持使用两种类型的数据库：MongoDB 和 SQLite。您可以在操作过程中切换它们。

### 获取数据库状态

**端点:** `GET /api/db/status`

**响应:**
```json
{
  "provider": "sqlite",
  "url": "file:./data/whatsapp-api.db"
}
```

### 切换数据库提供商

**端点:** `POST /api/db/switch`

**请求体:**
```json
{
  "provider": "mongodb"
}
```

**成功响应:**
```json
{
  "success": true,
  "message": "Database provider switched to mongodb",
  "provider": "mongodb"
}
```

## 🚫 错误代码

| 代码 | 描述                 | 可能原因                             |
|------|---------------------|--------------------------------------|
| 400  | 错误请求             | 缺少必填字段，数据格式无效            |
| 401  | 未授权               | 令牌或 API 密钥无效，令牌过期         |
| 403  | 禁止访问             | 没有访问资源的权限                   |
| 404  | 资源未找到           | 实例不存在，消息未找到               |
| 500  | 内部服务器错误        | 服务器操作错误，数据库问题            |

## 🚀 使用示例

### Python

```python
import requests
import qrcode
import time
from io import BytesIO
from PIL import Image

# API 配置
api_key = "YOUR_API_KEY"
base_url = "https://api.example.com/api"

# 认证头
headers = {
    "x-api-key": api_key,
    "Content-Type": "application/json"
}

# 创建新实例
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
        raise Exception(f"创建实例错误: {response.text}")

# 获取并显示二维码
def get_and_display_qr(instance_id):
    print("获取二维码...")
    
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
            print("在 WhatsApp 应用中扫描二维码")
            return True
        elif response.status_code == 202:
            print("二维码仍在生成，等待中...")
            time.sleep(3)
        else:
            print(f"尝试 {attempt+1}/{max_attempts}: 未能获取二维码")
            time.sleep(2)
    
    return False

# 发送消息
def send_message(instance_id, phone, message):
    response = requests.post(
        f"{base_url}/whatsapp/{instance_id}/send", 
        headers=headers, 
        json={"phone": phone, "message": message}
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"发送消息错误: {response.text}")

# 发送图片
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
        raise Exception(f"发送图片错误: {response.text}")

# 监控收到的消息
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
        print("监控已停止")

# 使用示例
if __name__ == "__main__":
    # 创建新实例
    instance = create_instance(
        "测试实例", 
        "通过 Python SDK 创建",
        "https://webhook.example.com/whatsapp"
    )
    
    instance_id = instance["id"]
    print(f"实例已创建，ID: {instance_id}")
    
    # 获取并显示二维码
    if get_and_display_qr(instance_id):
        print("等待扫描二维码...")
        time.sleep(20)  # 给扫描留时间
        
        # 发送测试消息
        result = send_message(instance_id, "79001234567", "来自 Python 的测试消息")
        print(f"消息已发送，ID: {result['id']}")
        
        # 监控收到的消息（示例中已注释）
        # def message_handler(message):
        #     print(f"来自 {message['from']} 的新消息: {message['body']}")
        #
        # monitor_messages(instance_id, message_handler)
```

### Node.js

```javascript
const axios = require('axios');
const qrcode = require('qrcode-terminal');

// API 配置
const apiKey = 'YOUR_API_KEY';
const baseUrl = 'https://api.example.com/api';

// 认证头
const headers = {
  'x-api-key': apiKey,
  'Content-Type': 'application/json'
};

// WhatsApp 多实例 API 操作类
class WhatsAppAPI {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'x-api-key': apiKey,
      'Content-Type': 'application/json'
    };
  }
  
  // 创建新实例
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
      console.error('创建实例错误:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // 获取并显示二维码
  async getAndDisplayQR(instanceId, maxAttempts = 10) {
    console.log('获取二维码...');
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await axios.get(
          `${this.baseUrl}/instances/${instanceId}/qr`,
          { headers: this.headers }
        );
        
        if (response.data.qrCode) {
          // 在控制台显示二维码
          qrcode.generate(response.data.qrCode);
          console.log('在 WhatsApp 应用中扫描二维码');
          return true;
        }
      } catch (error) {
        if (error.response?.status === 202) {
          console.log('二维码仍在生成，等待中...');
        } else {
          console.log(`尝试 ${attempt+1}/${maxAttempts}: 未能获取二维码`);
        }
      }
      
      // 等待下一次尝试
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    return false;
  }
  
  // 检查实例状态
  async checkStatus(instanceId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/whatsapp/${instanceId}/status`,
        { headers: this.headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('检查状态错误:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // 发送消息
  async sendMessage(instanceId, phone, message) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/whatsapp/${instanceId}/send`,
        { phone, message },
        { headers: this.headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('发送消息错误:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // 发送图片
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
      console.error('发送图片错误:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // 获取联系人
  async getContacts(instanceId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/whatsapp/${instanceId}/contacts`,
        { headers: this.headers }
      );
      
      return response.data.contacts;
    } catch (error) {
      console.error('获取联系人错误:', error.response?.data || error.message);
      return [];
    }
  }
  
  // 监控收到的消息
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
        console.error('监控消息错误:', error.message);
      }
    };
    
    // 启动定时检查新消息的间隔
    const intervalId = setInterval(checkMessages, interval);
    
    // 返回停止监控的函数
    return () => clearInterval(intervalId);
  }
}

// 使用示例
async function main() {
  const whatsapp = new WhatsAppAPI(apiKey, baseUrl);
  
  try {
    // 创建新实例
    const instance = await whatsapp.createInstance(
      '测试实例',
      '通过 Node.js SDK 创建',
      'https://webhook.example.com/whatsapp'
    );
    
    const instanceId = instance.id;
    console.log(`实例已创建，ID: ${instanceId}`);
    
    // 获取并显示二维码
    if (await whatsapp.getAndDisplayQR(instanceId)) {
      console.log('等待扫描二维码...');
      
      // 给扫描留时间
      await new Promise(resolve => setTimeout(resolve, 20000));
      
      // 检查状态
      const status = await whatsapp.checkStatus(instanceId);
      console.log('实例状态:', status);
      
      if (status.ready) {
        // 发送测试消息
        const result = await whatsapp.sendMessage(
          instanceId,
          '79001234567',
          '来自 Node.js 的测试消息'
        );
        
        console.log(`消息已发送，ID: ${result.id}`);
        
        // 启动消息监控
        const stopMonitoring = await whatsapp.monitorMessages(
          instanceId,
          (message) => {
            console.log(`来自 ${message.from} 的新消息: ${message.body}`);
          }
        );
        
        // 1分钟后停止监控
        setTimeout(() => {
          stopMonitoring();
          console.log('监控已停止');
        }, 60000);
      }
    }
  } catch (error) {
    console.error('发生错误:', error.message);
  }
}

main();
```

## 附加信息

### 项目结构

```
├── src/
│   ├── controllers/       # API 控制器
│   ├── middleware/        # Express 中间件
│   ├── models/            # 数据模型
│   ├── routes/            # 路由定义
│   ├── services/          # 业务逻辑
│   ├── utils/             # 工具函数
│   └── app.js             # 应用程序入口点
├── prisma/
│   ├── schema.prisma      # MongoDB 数据库模式
│   └── schema.sqlite.prisma # SQLite 数据库模式
├── public/                # 静态文件和 Web 界面
├── instances/             # 实例数据存储
├── uploads/               # 上传的文件
├── logs/                  # 日志文件
└── docker-compose.yml     # Docker Compose 配置
```

### 许可证

本软件基于 MIT 许可证分发。

---

**⚠️ 注意:** 随着 API 的发展，文档可能会更新。请在项目仓库中查看最新版本。
      "