# WhatsApp 다중 인스턴스 API - 문서

## 📋 목차

1. [소개](#소개)
2. [시작하기](#시작하기)
3. [인증](#인증)
4. [인스턴스 관리](#인스턴스-관리)
5. [WhatsApp API](#whatsapp-api)
6. [연락처](#연락처)
7. [채팅 및 메시지](#채팅-및-메시지)
8. [통계 및 모니터링](#통계-및-모니터링)
9. [웹훅](#웹훅)
10. [데이터베이스 관리](#데이터베이스-관리)
11. [오류 코드](#오류-코드)
12. [사용 예제](#사용-예제)

## 🚀 소개

WhatsApp 다중 인스턴스 API는 하나의 애플리케이션에서 여러 WhatsApp 연결을 관리할 수 있게 해줍니다. API는 JWT 토큰과 API 키라는 두 가지 인증 방식과 MongoDB 및 SQLite 두 가지 저장 시스템을 지원합니다.

### 주요 기능

- 여러 WhatsApp 인스턴스 관리
- 텍스트 메시지 및 미디어 파일 송수신
- 연락처 관리
- 메시지 기록 저장
- 이벤트를 위한 웹훅 알림
- 사용 통계
- 두 가지 유형의 데이터베이스 지원 (MongoDB/SQLite)
- 사용자 관리

## 🔧 시작하기

### 시스템 요구 사항

- Node.js 18.0 이상
- MongoDB (선택 사항)
- SQLite (선택 사항)

### Docker를 사용한 설치

```bash
# 저장소 복제
git clone https://github.com/your-username/whatsapp-multi-instance-api.git

# 프로젝트 디렉토리로 이동
cd whatsapp-multi-instance-api

# Docker Compose로 실행
docker-compose up -d
```

### 환경 변수 구성

주요 설정:

```
# 데이터베이스 유형
DATABASE_PROVIDER=sqlite  # mongodb 또는 sqlite

# MongoDB 설정
DATABASE_URL=mongodb://username:password@hostname:port/database

# SQLite 설정
SQLITE_DATABASE_URL=file:./data/whatsapp-api.db

# JWT 토큰 비밀키
JWT_SECRET=your-jwt-secret-key-here
JWT_EXPIRATION=24h

# 기본 관리자 데이터
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=User
```

## 🔐 인증

API는 두 가지 인증 방법을 지원합니다:

### JWT 토큰

- `/api/auth/login`을 통해 시스템에 로그인할 때 토큰을 받음
- `Authorization: Bearer <token>` 헤더로 전달
- 토큰 만료 시간은 `JWT_EXPIRATION`으로 구성 가능

### API 키

- 사용자와 연결된 고유 키
- 사용자 생성 시 자동 생성
- `x-api-key: <api_key>` 헤더로 전달

### 인증 경로

#### 로그인

**엔드포인트:** `POST /api/auth/login`

**요청 본문:**
```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

**성공 응답:**
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

#### 현재 사용자 데이터 가져오기

**엔드포인트:** `GET /api/auth/me`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

## 🖥️ 인스턴스 관리

### 인스턴스 생성

**엔드포인트:** `POST /api/instances`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**요청 본문:**
```json
{
  "name": "주요 WhatsApp",
  "description": "회사 계정",
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

**성공 응답:**
```json
{
  "id": "instance_id",
  "name": "주요 WhatsApp",
  "description": "회사 계정",
  "userId": "user_id",
  "status": "connecting",
  "webhookUrl": "https://example.com/webhook",
  "webhookEnabled": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### 인스턴스 목록 가져오기

**엔드포인트:** `GET /api/instances`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "instances": [
    {
      "id": "instance_id",
      "name": "주요 WhatsApp",
      "description": "회사 계정",
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

### 특정 인스턴스 정보 가져오기

**엔드포인트:** `GET /api/instances/{instanceId}`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "id": "instance_id",
  "name": "주요 WhatsApp",
  "description": "회사 계정",
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

### 인스턴스 상태 가져오기

**엔드포인트:** `GET /api/instances/{instanceId}/status`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**성공 응답:**
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

### 인스턴스 업데이트

**엔드포인트:** `PUT /api/instances/{instanceId}`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**요청 본문:**
```json
{
  "name": "새 WhatsApp 이름",
  "description": "업데이트된 설명",
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

**성공 응답:**
```json
{
  "id": "instance_id",
  "name": "새 WhatsApp 이름",
  "description": "업데이트된 설명",
  "webhookUrl": "https://new-example.com/webhook",
  "webhookEnabled": true,
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

### 인스턴스 삭제

**엔드포인트:** `DELETE /api/instances/{instanceId}`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "success": true,
  "message": "Instance instance_id deleted successfully"
}
```

### 인스턴스 재연결

**엔드포인트:** `POST /api/instances/{instanceId}/reconnect`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "success": true,
  "message": "Instance instance_id reconnected"
}
```

### WhatsApp 로그아웃

**엔드포인트:** `POST /api/instances/{instanceId}/logout`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "success": true,
  "message": "Instance instance_id logged out"
}
```

### 인스턴스의 QR 코드 가져오기

**엔드포인트:** `GET /api/instances/{instanceId}/qr`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
}
```

**생성 중 응답:**
```json
{
  "message": "QR code generation in progress. Please try again in a few seconds.",
  "status": "generating"
}
```

### 인스턴스 활동 로그 가져오기

**엔드포인트:** `GET /api/instances/{instanceId}/activity`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**쿼리 매개변수:**
- `limit` - 레코드 수 (기본값 100)
- `skip` - 오프셋 (기본값 0)
- `actions` - 쉼표로 구분된 작업 유형 목록 (예: `connected,disconnected,qr_received`)
- `startDate` - 시작 날짜 (ISO 8601 형식)
- `endDate` - 종료 날짜 (ISO 8601 형식)

**성공 응답:**
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

### 최신 인스턴스 이벤트 가져오기

**엔드포인트:** `GET /api/instances/{instanceId}/events`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**쿼리 매개변수:**
- `since` - 이벤트를 가져올 ISO 8601 형식의 타임스탬프
- `limit` - 최대 이벤트 수 (기본값 20)
- `types` - 쉼표로 구분된 이벤트 유형 (예: `message_sent,message_received,message_status`)

**성공 응답:**
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
        "body": "안녕하세요! 어떻게 지내세요?",
        "hasMedia": false,
        "status": "received",
        "metadata": {
          "pushName": "홍길동",
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

### 인스턴스 상태 가져오기

**엔드포인트:** `GET /api/whatsapp/{instanceId}/status`

**헤더:**
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "ready": true,
  "status": "connected",
  "hasQr": false
}
```

### QR 코드 가져오기

**엔드포인트:** `GET /api/whatsapp/{instanceId}/qr`

**헤더:**
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "qrCode": "1@HbT1Ye1Hhb9eB9KRWwRQbz4IP3wK8ocJ35zzr2z25PinMxWkgZ46Vp8l07Wz9Wl5HmdULhQMvn0g==,some-qr-string-data..."
}
```

### 텍스트 메시지 보내기

**엔드포인트:** `POST /api/whatsapp/{instanceId}/send`

**헤더:**
- `x-api-key: <api_key>`

**요청 본문:**
```json
{
  "phone": "79001234567",
  "message": "안녕하세요! 어떻게 지내세요?"
}
```

**성공 응답:**
```json
{
  "id": "whatsapp_message_id"
}
```

### URL을 통해 미디어 보내기

**엔드포인트:** `POST /api/whatsapp/{instanceId}/send-media`

**헤더:**
- `x-api-key: <api_key>`

**요청 본문:**
```json
{
  "phone": "79001234567",
  "url": "https://example.com/image.jpg",
  "caption": "이미지 설명",
  "filename": "image.jpg"
}
```

**성공 응답:**
```json
{
  "id": "whatsapp_message_id"
}
```

### 파일에서 미디어 보내기

**엔드포인트:** `POST /api/whatsapp/{instanceId}/send-file`

**헤더:**
- `x-api-key: <api_key>`
- `Content-Type: multipart/form-data`

**폼 필드:**
- `phone` - 수신자 전화번호
- `caption` - 파일 설명 (선택 사항)
- `file` - 보낼 파일

**성공 응답:**
```json
{
  "id": "whatsapp_message_id"
}
```

### WhatsApp에서 로그아웃

**엔드포인트:** `POST /api/whatsapp/{instanceId}/logout`

**헤더:**
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "success": true
}
```

## 👥 연락처

### WhatsApp에서 연락처 가져오기

**엔드포인트:** `GET /api/whatsapp/{instanceId}/contacts`

**헤더:**
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "contacts": [
    {
      "id": "79001234567@s.whatsapp.net",
      "name": "홍길동",
      "number": "79001234567",
      "isGroup": false
    },
    {
      "id": "1234567890@g.us",
      "name": "업무 그룹",
      "number": "1234567890",
      "isGroup": true
    }
  ]
}
```

### WhatsApp에 연락처 추가

**엔드포인트:** `POST /api/whatsapp/{instanceId}/contacts/add`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**요청 본문:**
```json
{
  "phone": "79001234567",
  "name": "홍길동"
}
```

**성공 응답:**
```json
{
  "success": true,
  "message": "연락처가 성공적으로 추가되었습니다",
  "contact": {
    "id": "79001234567@s.whatsapp.net",
    "number": "79001234567",
    "name": "홍길동"
  }
}
```

### 데이터베이스에서 연락처 가져오기

**엔드포인트:** `GET /api/instances/{instanceId}/contacts/db` 또는 `GET /api/whatsapp/{instanceId}/contacts/db`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**쿼리 매개변수:**
- `limit` - 연락처 수 (기본값 100)
- `skip` - 오프셋 (기본값 0)
- `search` - 이름 또는 번호 검색 문자열
- `onlyGroups` - 그룹만 필터링 (true/false)

**성공 응답:**
```json
{
  "contacts": [
    {
      "id": "contact_id",
      "instanceId": "instance_id",
      "name": "홍길동",
      "number": "79001234567",
      "remoteJid": "79001234567@s.whatsapp.net",
      "pushName": "길동",
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

### WhatsApp에서 데이터베이스로 연락처 가져오기

**엔드포인트:** `POST /api/instances/{instanceId}/contacts/import` 또는 `POST /api/whatsapp/{instanceId}/contacts/import`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "success": true,
  "message": "25개의 연락처를 성공적으로 가져왔습니다",
  "importedCount": 25
}
```

### 데이터베이스에 연락처 저장 또는 업데이트

**엔드포인트:** `POST /api/instances/{instanceId}/contacts/save` 또는 `POST /api/whatsapp/{instanceId}/contacts/save`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**요청 본문:**
```json
{
  "number": "79001234567",
  "name": "홍길동",
  "pushName": "길동",
  "isGroup": false,
  "profilePicture": "url-to-picture",
  "about": "사용자 상태"
}
```

**성공 응답:**
```json
{
  "id": "contact_id",
  "instanceId": "instance_id",
  "name": "홍길동",
  "number": "79001234567",
  "remoteJid": "79001234567@s.whatsapp.net",
  "pushName": "길동",
  "isGroup": false,
  "profilePicture": "url-to-picture",
  "about": "사용자 상태",
  "lastActivity": "2023-01-01T12:00:00.000Z",
  "createdAt": "2023-01-01T10:00:00.000Z",
  "updatedAt": "2023-01-01T12:00:00.000Z"
}
```

## 💬 채팅 및 메시지

### 채팅 메시지 기록 가져오기

**엔드포인트:** `GET /api/instances/{instanceId}/chats/{chatId}/messages`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**쿼리 매개변수:**
- `limit` - 메시지 수 (기본값 50)
- `skip` - 오프셋 (기본값 0)
- `startDate` - 시작 날짜 (ISO 8601 형식)
- `endDate` - 종료 날짜 (ISO 8601 형식)

**성공 응답:**
```json
{
  "messages": [
    {
      "id": "message_id",
      "instanceId": "instance_id",
      "remoteJid": "79001234567@s.whatsapp.net",
      "fromMe": true,
      "messageType": "text",
      "content": "안녕하세요! 어떻게 지내세요?",
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

## 📊 통계 및 모니터링

### 사용자 통계

**엔드포인트:** `GET /api/stats/user`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**쿼리 매개변수:**
- `period` - 통계 기간 (week, month, year, all, 기본값은 month)

**성공 응답:**
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
      "name": "주요 WhatsApp",
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

### 인스턴스 통계

**엔드포인트:** `GET /api/stats/instances/{instanceId}`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**쿼리 매개변수:**
- `period` - 통계 기간 (today, week, month, all, 기본값은 today)

**성공 응답:**
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

### 시스템 통계

**엔드포인트:** `GET /api/stats/system`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**중요:** 관리자 권한 필요

**성공 응답:**
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

## 🌐 웹훅

시스템은 다양한 이벤트에 대한 웹훅 알림 전송을 지원합니다. 웹훅 설정은 인스턴스 생성 또는 업데이트 시 구성됩니다.

### 이벤트 유형

1. **message_received** - 새 메시지 수신
```json
{
  "event": "message_received",
  "data": {
    "instanceId": "instance_id",
    "messageId": "whatsapp_message_id",
    "from": "79001234567@s.whatsapp.net",
    "body": "안녕하세요! 어떻게 지내세요?",
    "type": "conversation",
    "timestamp": 1672531200,
    "hasMedia": false,
    "pushName": "홍길동"
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

2. **message_sent** - 메시지 전송됨
```json
{
  "event": "message_sent",
  "data": {
    "instanceId": "instance_id",
    "messageId": "whatsapp_message_id",
    "to": "79001234567@s.whatsapp.net",
    "body": "안녕하세요! 잘 지내고 있습니다.",
    "type": "text",
    "timestamp": 1672531200,
    "hasMedia": false
  },
  "timestamp": "2023-01-01T12:01:00.000Z"
}
```

3. **message_status** - 메시지 상태 변경
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

4. **connected** - WhatsApp 연결 설정됨
```json
{
  "event": "connected",
  "data": {
    "instanceId": "instance_id"
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

5. **disconnected** - WhatsApp 연결 종료됨
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

6. **qr_received** - 인증을 위한 QR 코드 수신됨
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

7. **limit_exceeded** - 사용 한도 초과
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

8. **webhook_updated** - 웹훅 설정 업데이트됨
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

### 웹훅 보안

웹훅 보안을 위해 비밀 키를 사용할 수 있습니다. 키가 지정되면 서버는 각 요청에 `X-Webhook-Signature` 헤더를 추가하며, 이 헤더에는 비밀 키를 사용하여 생성된 요청 본문의 HMAC SHA-256 서명이 포함됩니다.

수신측에서의 서명 확인 예제:

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

// Express에서 사용
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const secret = 'your-webhook-secret';
  
  if (!signature || !verifyWebhookSignature(req.body, signature, secret)) {
    return res.status(401).send('유효하지 않은 서명');
  }
  
  // 웹훅 처리
  // ...
  
  res.sendStatus(200);
});
```

## 🔄 데이터베이스 관리

API는 MongoDB와 SQLite 두 가지 유형의 데이터베이스를 지원합니다. 작동 중에도 이들 간에 전환할 수 있습니다.

### 데이터베이스 상태 가져오기

**엔드포인트:** `GET /api/db/status`

**응답:**
```json
{
  "provider": "sqlite",
  "url": "file:./data/whatsapp-api.db"
}
```

### 데이터베이스 제공자 전환

**엔드포인트:** `POST /api/db/switch`

**요청 본문:**
```json
{
  "provider": "mongodb"
}
```

**성공 응답:**
```json
{
  "success": true,
  "message": "Database provider switched to mongodb",
  "provider": "mongodb"
}
```

## 🚫 오류 코드

| 코드 | 설명                    | 가능한 원인                             |
|------|------------------------|----------------------------------------|
| 400  | 잘못된 요청             | 필수 필드 누락, 잘못된 데이터 형식       |
| 401  | 인증되지 않음           | 유효하지 않은 토큰 또는 API 키, 만료된 토큰 |
| 403  | 접근 금지               | 리소스에 접근할 권한 없음               |
| 404  | 리소스를 찾을 수 없음    | 인스턴스가 존재하지 않음, 메시지를 찾을 수 없음 |
| 500  | 내부 서버 오류          | 서버 작동 오류, 데이터베이스 문제        |

## 🚀 사용 예제

### Python

```python
import requests
import qrcode
import time
from io import BytesIO
from PIL import Image

# API 구성
api_key = "YOUR_API_KEY"
base_url = "https://api.example.com/api"

# 인증 헤더
headers = {
    "x-api-key": api_key,
    "Content-Type": "application/json"
}

# 새 인스턴스 생성
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
        raise Exception(f"인스턴스 생성 오류: {response.text}")

# QR 코드 가져오기 및 표시
def get_and_display_qr(instance_id):
    print("QR 코드 가져오는 중...")
    
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
            print("WhatsApp 앱에서 QR 코드를 스캔하세요")
            return True
        elif response.status_code == 202:
            print("QR 코드가 아직 생성 중입니다, 기다리는 중...")
            time.sleep(3)
        else:
            print(f"시도 {attempt+1}/{max_attempts}: QR 코드를 가져오지 못했습니다")
            time.sleep(2)
    
    return False

# 메시지 보내기
def send_message(instance_id, phone, message):
    response = requests.post(
        f"{base_url}/whatsapp/{instance_id}/send", 
        headers=headers, 
        json={"phone": phone, "message": message}
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"메시지 전송 오류: {response.text}")

# 이미지 보내기
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
        raise Exception(f"이미지 전송 오류: {response.text}")

# 수신 메시지 모니터링
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
        print("모니터링이 중지되었습니다")

# 사용 예제
if __name__ == "__main__":
    # 새 인스턴스 생성
    instance = create_instance(
        "테스트 인스턴스", 
        "Python SDK를 통해 생성됨",
        "https://webhook.example.com/whatsapp"
    )
    
    instance_id = instance["id"]
    print(f"인스턴스가 ID: {instance_id}로 생성되었습니다")
    
    # QR 코드 가져오기 및 표시
    if get_and_display_qr(instance_id):
        print("QR 코드 스캔 대기 중...")
        time.sleep(20)  # 스캔을 위한 시간 제공
        
        # 테스트 메시지 전송
        result = send_message(instance_id, "79001234567", "Python에서 보낸 테스트 메시지")
        print(f"메시지 전송됨, ID: {result['id']}")
        
        # 수신 메시지 모니터링 (예제에서는 주석 처리됨)
        # def message_handler(message):
        #     print(f"{message['from']}에서 온 새 메시지: {message['body']}")
        #
        # monitor_messages(instance_id, message_handler)
```

### Node.js

```javascript
const axios = require('axios');
const qrcode = require('qrcode-terminal');

// API 구성
const apiKey = 'YOUR_API_KEY';
const baseUrl = 'https://api.example.com/api';

// 인증 헤더
const headers = {
  'x-api-key': apiKey,
  'Content-Type': 'application/json'
};

// WhatsApp 다중 인스턴스 API를 위한 클래스
class WhatsAppAPI {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.headers = {
      'x-api-key': apiKey,
      'Content-Type': 'application/json'
    };
  }
  
  // 새 인스턴스 생성
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
      console.error('인스턴스 생성 오류:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // QR 코드 가져오기 및 표시
  async getAndDisplayQR(instanceId, maxAttempts = 10) {
    console.log('QR 코드 가져오는 중...');
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await axios.get(
          `${this.baseUrl}/instances/${instanceId}/qr`,
          { headers: this.headers }
        );
        
        if (response.data.qrCode) {
          // 콘솔에 QR 코드 표시
          qrcode.generate(response.data.qrCode);
          console.log('WhatsApp 앱에서 QR 코드를 스캔하세요');
          return true;
        }
      } catch (error) {
        if (error.response?.status === 202) {
          console.log('QR 코드가 아직 생성 중입니다, 기다리는 중...');
        } else {
          console.log(`시도 ${attempt+1}/${maxAttempts}: QR 코드를 가져오지 못했습니다`);
        }
      }
      
      // 다음 시도 전 대기
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    return false;
  }
  
  // 인스턴스 상태 확인
  async checkStatus(instanceId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/whatsapp/${instanceId}/status`,
        { headers: this.headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('상태 확인 오류:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // 메시지 전송
  async sendMessage(instanceId, phone, message) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/whatsapp/${instanceId}/send`,
        { phone, message },
        { headers: this.headers }
      );
      
      return response.data;
    } catch (error) {
      console.error('메시지 전송 오류:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // 이미지 전송
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
      console.error('이미지 전송 오류:', error.response?.data || error.message);
      throw error;
    }
  }
  
  // 연락처 가져오기
  async getContacts(instanceId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/whatsapp/${instanceId}/contacts`,
        { headers: this.headers }
      );
      
      return response.data.contacts;
    } catch (error) {
      console.error('연락처 가져오기 오류:', error.response?.data || error.message);
      return [];
    }
  }
  
  // 수신 메시지 모니터링
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
        console.error('메시지 모니터링 오류:', error.message);
      }
    };
    
    // 새 메시지 확인을 위한 간격 시작
    const intervalId = setInterval(checkMessages, interval);
    
    // 모니터링 중지 함수 반환
    return () => clearInterval(intervalId);
  }
}

// 사용 예제
async function main() {
  const whatsapp = new WhatsAppAPI(apiKey, baseUrl);
  
  try {
    // 새 인스턴스 생성
    const instance = await whatsapp.createInstance(
      '테스트 인스턴스',
      'Node.js SDK를 통해 생성됨',
      'https://webhook.example.com/whatsapp'
    );
    
    const instanceId = instance.id;
    console.log(`인스턴스가 ID: ${instanceId}로 생성되었습니다`);
    
    // QR 코드 가져오기 및 표시
    if (await whatsapp.getAndDisplayQR(instanceId)) {
      console.log('QR 코드 스캔 대기 중...');
      
      // 스캔을 위한 시간 제공
      await new Promise(resolve => setTimeout(resolve, 20000));
      
      // 상태 확인
      const status = await whatsapp.checkStatus(instanceId);
      console.log('인스턴스 상태:', status);
      
      if (status.ready) {
        // 테스트 메시지 전송
        const result = await whatsapp.sendMessage(
          instanceId,
          '79001234567',
          'Node.js에서 보낸 테스트 메시지'
        );
        
        console.log(`메시지 전송됨, ID: ${result.id}`);
        
        // 메시지 모니터링 시작
        const stopMonitoring = await whatsapp.monitorMessages(
          instanceId,
          (message) => {
            console.log(`${message.from}에서 온 새 메시지: ${message.body}`);
          }
        );
        
        // 1분 후 모니터링 중지
        setTimeout(() => {
          stopMonitoring();
          console.log('모니터링이 중지되었습니다');
        }, 60000);
      }
    }
  } catch (error) {
    console.error('오류 발생:', error.message);
  }
}

main();
```

## 추가 정보

### 프로젝트 구조

```
├── src/
│   ├── controllers/       # API 컨트롤러
│   ├── middleware/        # Express 미들웨어
│   ├── models/            # 데이터 모델
│   ├── routes/            # 라우트 정의
│   ├── services/          # 비즈니스 로직
│   ├── utils/             # 유틸리티
│   └── app.js             # 애플리케이션 진입점
├── prisma/
│   ├── schema.prisma      # MongoDB 데이터베이스 스키마
│   └── schema.sqlite.prisma # SQLite 데이터베이스 스키마
├── public/                # 정적 파일 및 웹 인터페이스
├── instances/             # 인스턴스 데이터 저장소
├── uploads/               # 업로드된 파일
├── logs/                  # 로그 파일
└── docker-compose.yml     # Docker Compose 구성
```

### 라이선스

이 소프트웨어는 MIT 라이선스 하에 배포됩니다.

---

**⚠️ 참고:** API가 발전함에 따라 문서가 업데이트될 수 있습니다. 최신 버전은 프로젝트 저장소에서 확인하세요.