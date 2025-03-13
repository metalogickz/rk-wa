# WhatsApp Multi-Instance API 문서

## 📋 목차

1. [소개](#소개)
2. [인증](#인증)
3. [인스턴스 관리](#인스턴스-관리)
4. [WhatsApp API](#whatsapp-api)
5. [통계](#통계)
6. [웹훅](#웹훅)
7. [오류 코드](#오류-코드)
8. [사용 예시](#사용-예시)
9. [보안](#보안)

## 🚀 소개

WhatsApp Multi-Instance API는 하나의 애플리케이션에서 여러 WhatsApp 연결을 관리할 수 있게 해줍니다. API는 JWT 토큰과 API 키라는 두 가지 인증 방식을 지원합니다.

## 🔐 인증

### 인증 유형

#### 1. JWT 토큰
- JSON Web Token 메커니즘을 통한 인증
- 시스템 로그인 시 발급됨
- `Authorization: Bearer <token>` 헤더로 전송

#### 2. API 키
- 사용자에게 연결된 고유 키
- `x-api-key` 헤더로 전송
- 대부분의 엔드포인트에서 작동

### 시스템 로그인

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

### 현재 사용자 정보 받기

**엔드포인트:** `GET /api/auth/me`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**응답:**
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
  "name": "기본 WhatsApp",
  "description": "회사 계정",
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

**성공 응답:**
```json
{
  "id": "instance_id",
  "name": "기본 WhatsApp",
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
      "name": "기본 WhatsApp",
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
  "name": "기본 WhatsApp",
  "description": "회사 계정",
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
    "secret": "new-secret-key"
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

### 인스턴스 QR 코드 가져오기

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

**중요:** QR 코드는 이전에 base64 형식으로 표시된 것과 달리 QR 코드 생성에 사용할 수 있는 문자열 형태로 반환됩니다.

### 인스턴스 활동 로그 가져오기

**엔드포인트:** `GET /api/instances/{instanceId}/activity`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**쿼리 매개변수:**
- `limit` - 레코드 수 (기본값 100)
- `skip` - 오프셋 (기본값 0)
- `actions` - 쉼표로 구분된 작업 유형 목록
- `startDate` - 시작 날짜 (ISO 8601)
- `endDate` - 종료 날짜 (ISO 8601)

**성공 응답:**
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

### 채팅 메시지 기록 가져오기

**엔드포인트:** `GET /api/instances/{instanceId}/chats/{chatId}/messages`

**헤더:**
- `Authorization: Bearer <jwt_token>` 또는
- `x-api-key: <api_key>`

**쿼리 매개변수:**
- `limit` - 메시지 수 (기본값 50)
- `skip` - 오프셋 (기본값 0)
- `startDate` - 시작 날짜 (ISO 8601)
- `endDate` - 종료 날짜 (ISO 8601)

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

**중요:** QR 코드는 base64 형식이 아닌 QR 코드 생성에 사용할 수 있는 문자열 형태로 반환됩니다.

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

### URL을 통한 미디어 전송

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

### 파일에서 미디어 전송

**엔드포인트:** `POST /api/whatsapp/{instanceId}/send-file`

**헤더:**
- `x-api-key: <api_key>`
- `Content-Type: multipart/form-data`

**폼 필드:**
- `phone` - 수신자 전화번호
- `caption` - 파일 설명 (선택 사항)
- `file` - 전송할 파일

**성공 응답:**
```json
{
  "id": "whatsapp_message_id"
}
```

### 연락처 가져오기

**엔드포인트:** `GET /api/whatsapp/{instanceId}/contacts`

**헤더:**
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "contacts": [
    {
      "id": "79001234567@s.whatsapp.net",
      "name": "이반 이바노프",
      "number": "79001234567",
      "isGroup": false
    },
    {
      "id": "1234567890@g.us",
      "name": "작업 그룹",
      "number": "1234567890",
      "isGroup": true
    }
  ]
}
```

### WhatsApp 로그아웃

**엔드포인트:** `POST /api/whatsapp/{instanceId}/logout`

**헤더:**
- `x-api-key: <api_key>`

**성공 응답:**
```json
{
  "success": true
}
```

## 📊 통계

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
      "name": "기본 WhatsApp",
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

**중요:** 관리자 권한이 필요합니다

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

시스템은 다양한 이벤트에 대한 웹훅 알림 전송을 지원합니다.

### 웹훅 설정

웹훅 설정은 인스턴스 생성 또는 업데이트 시 수행됩니다.

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
    "pushName": "이반"
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

2. **message_sent** - 메시지 발송
```json
{
  "event": "message_sent",
  "data": {
    "instanceId": "instance_id",
    "messageId": "whatsapp_message_id",
    "to": "79001234567@s.whatsapp.net",
    "body": "안녕하세요! 잘 지내고 있어요.",
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

4. **connection_opened** - WhatsApp 연결 설정
```json
{
  "event": "connection_opened",
  "data": {
    "instanceId": "instance_id"
  },
  "timestamp": "2023-01-01T12:00:00.000Z"
}
```

5. **connection_closed** - WhatsApp 연결 종료
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

6. **qr_received** - 인증용 QR 코드 수신
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

### 웹훅 보안

웹훅 보안을 위해 비밀 키를 사용할 수 있습니다. 키가 지정되면 서버는 요청 본문의 HMAC SHA-256 서명(비밀 키 사용)이 포함된 `X-Webhook-Signature` 헤더를 각 요청에 추가합니다.

## 🚫 오류 코드

| 코드 | 설명                    | 가능한 원인                                         |
|------|-------------------------|-----------------------------------------------------|
| 400  | 잘못된 요청             | 필수 필드 누락, 잘못된 데이터 형식                   |
| 401  | 인증되지 않음           | 잘못된 토큰 또는 API 키, 만료된 토큰                |
| 403  | 접근 금지               | 리소스에 대한 권한 없음                             |
| 404  | 리소스를 찾을 수 없음   | 인스턴스가 존재하지 않음, 메시지 찾을 수 없음       |
| 500  | 내부 서버 오류          | 서버 작동 오류, 데이터베이스 문제                   |

## 🔒 보안

### 보안 권장 사항

1. **HTTPS**: API와 상호 작용할 때 항상 HTTPS를 사용하세요.
2. **API 키 보호**: API 키를 안전한 장소에 보관하고, 클라이언트 애플리케이션 코드에 포함하지 마세요.
3. **자격 증명 정기 업데이트**: 정기적으로 비밀번호와 API 키를 변경하세요.
4. **접근 제한**: API 접근을 위한 허용 IP 주소 목록을 설정하세요.
5. **모니터링**: 의심스러운 활동 감지를 위해 활동 로그를 모니터링하세요.

## 🚀 사용 예시

### Python

```python
import requests

# 인스턴스 생성
api_key = "YOUR_API_KEY"
base_url = "https://api.example.com/api"

# 인증 헤더
headers = {
    "x-api-key": api_key,
    "Content-Type": "application/json"
}

# 새 인스턴스 생성
instance_data = {
    "name": "기본 WhatsApp",
    "description": "회사 계정",
    "webhookUrl": "https://your-webhook.com/whatsapp"
}

response = requests.post(f"{base_url}/instances", 
                        headers=headers, 
                        json=instance_data)
instance = response.json()
instance_id = instance["id"]

# 메시지 전송
message_data = {
    "phone": "79001234567",
    "message": "안녕하세요! 이것은 테스트 메시지입니다."
}

response = requests.post(f"{base_url}/whatsapp/{instance_id}/send", 
                        headers=headers, 
                        json=message_data)
result = response.json()
print(f"메시지가 전송되었습니다, ID: {result['id']}")
```

### Node.js

```javascript
const axios = require('axios');

// API 설정
const apiKey = 'YOUR_API_KEY';
const baseUrl = 'https://api.example.com/api';

// 인증 헤더
const headers = {
  'x-api-key': apiKey,
  'Content-Type': 'application/json'
};

// 메시지 전송
async function sendMessage(instanceId, phone, message) {
  try {
    const response = await axios.post(
      `${baseUrl}/whatsapp/${instanceId}/send`,
      { phone, message },
      { headers }
    );
    
    console.log(`메시지가 전송되었습니다, ID: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('메시지 전송 중 오류가 발생했습니다:', error.response?.data || error.message);
    throw error;
  }
}

// QR 코드 가져오기
async function getQrCode(instanceId) {
  try {
    const response = await axios.get(
      `${baseUrl}/whatsapp/${instanceId}/qr`,
      { headers }
    );
    
    // QR 코드는 QR 코드 생성에 사용할 수 있는 문자열로 반환됩니다
    const qrCode = response.data.qrCode;
    console.log('QR 코드를 받았습니다:', qrCode);
    return qrCode;
  } catch (error) {
    console.error('QR 코드를 가져오는 중 오류가 발생했습니다:', error.response?.data || error.message);
    throw error;
  }
}

// 사용 예시
(async () => {
  const instanceId = 'YOUR_INSTANCE_ID';
  await sendMessage(instanceId, '79001234567', 'Node.js에서 안녕하세요!');
})();
```

---

**⚠️ 주의:** 문서는 업데이트될 수 있습니다. 항상 최신 버전을 확인하세요.
