# WhatsApp 다중 인스턴스 API

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue.svg)](https://www.docker.com/)
[![WhatsApp Library](https://img.shields.io/badge/WhatsApp-Baileys-green.svg)](https://github.com/WhiskeySockets/Baileys)

단일 애플리케이션 내에서 여러 WhatsApp 연결을 관리할 수 있는 강력하고 유연한 API 서비스입니다. 강력한 [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys) 라이브러리를 기반으로 구축되었으며, WhatsApp 메시징 기능을 시스템에 통합해야 하는 기업과 개발자를 위해 설계되었습니다.

## ✨ 기능

- **다중 인스턴스 지원**: 단일 API로 여러 WhatsApp 인스턴스 생성 및 관리
- **이중 인증**: JWT 토큰 또는 API 키 중 선택하여 인증
- **이중 데이터베이스 지원**: 필요에 따라 MongoDB와 SQLite 간 원활한 전환
- **미디어 처리**: 텍스트 메시지, 이미지, 비디오, 문서 및 기타 미디어 전송 및 수신
- **웹훅 통합**: 메시지 전달, 수신 및 연결 상태에 대한 실시간 알림
- **상세 통계**: 각 인스턴스의 사용 지표 추적
- **Docker 지원**: Docker 및 Docker Compose를 통한 간편한 배포
- **포괄적인 문서**: 여러 언어로 된 상세한 API 문서
- **연결 모니터링**: 자동 재연결 및 소켓 상태 확인
- **연락처 관리**: 데이터베이스에 WhatsApp 연락처 저장 및 관리

## 🚀 빠른 시작

### 사전 요구 사항

- Node.js 20.x 이상
- MongoDB 데이터베이스 또는 SQLite (이중 데이터베이스 지원)
- Docker 설치: Docker 및 Docker Compose

### 설치

#### 표준 설치

1. 리포지토리 복제:
   ```bash
   git clone https://github.com/0101001001001011/rk-wa.git
   cd whatsapp-multi-instance-api
   ```

2. 종속성 설치:
   ```bash
   npm install
   ```

3. 예제를 기반으로 `.env` 파일 생성:
   ```bash
   cp .env.example .env
   ```

4. 구성에 맞게 `.env` 파일 수정:
   ```
   PORT=3000
   NODE_ENV=development
   DATABASE_PROVIDER=mongodb  # 또는 sqlite
   DATABASE_URL="mongodb://username:password@localhost:27017/whatsapp-api?authSource=admin"
   SQLITE_DATABASE_URL="file:./data/whatsapp-api.db"
   JWT_SECRET="your-jwt-secret-key-here"
   JWT_EXPIRATION="24h"
   ```

5. 데이터베이스 초기화:
   ```bash
   # 두 데이터베이스 모두
   npm run prisma:generate:all
   node scripts/init-databases.js
   
   # 또는 특정 데이터베이스
   npm run setup:mongodb
   # 또는
   npm run setup:sqlite
   ```

6. 서버 시작:
   ```bash
   npm start
   ```

#### Docker 설치

1. 리포지토리 복제:
   ```bash
   git clone https://github.com/0101001001001011/rk-wa.git
   cd whatsapp-multi-instance-api
   ```

2. 필요한 경우 `docker-compose.yml` 파일 사용자 정의.

3. 컨테이너 시작:
   ```bash
   docker-compose up -d
   ```

### 구성

API는 환경 변수를 사용하여 구성할 수 있습니다:

| 변수 | 설명 | 기본값 |
|----------|-------------|---------|
| PORT | 서버 포트 번호 | 3000 |
| NODE_ENV | 환경 (development/production) | development |
| DATABASE_PROVIDER | 데이터베이스 유형 (mongodb/sqlite) | mongodb |
| DATABASE_URL | MongoDB 연결 문자열 | - |
| SQLITE_DATABASE_URL | SQLite 데이터베이스 파일 경로 | - |
| JWT_SECRET | JWT 토큰용 비밀 키 | - |
| JWT_EXPIRATION | JWT 토큰 만료 시간 | 24h |
| LOG_LEVEL | 로깅 수준 (debug, info, warn, error) | info |
| CORS_ORIGIN | CORS 허용 원본 | * |
| SOCKET_CHECK_CRON | 소켓 상태 확인 일정 | */5 * * * * |
| AUTH_CHECK_CRON | 인증 만료 확인 일정 | 0 12 * * * |
| USAGE_SAVE_CRON | 사용량 지표 저장 일정 | */15 * * * * |
| USAGE_LIMITS_CRON | 사용량 제한 확인 일정 | 0 * * * * |
| SYSTEM_METRICS_CRON | 시스템 지표 수집 일정 | */5 * * * * |

## 📚 API 문서

전체 API 문서는 여러 언어로 제공됩니다:

- [English](./docs/whatsapp-multi-instance-api-documentation-english.md)
- [Russian](./docs/whatsapp-multi-instance-api-documentation-russian.md)
- [Chinese](./docs/whatsapp-multi-instance-api-documentation-chinese.md)
- [Korean](./docs/whatsapp-multi-instance-api-documentation-korean.md)

### 이중 데이터베이스 문서

- [English](./docs/whatsapp-multi-instance-dual-db-english.md)
- [Russian](./docs/whatsapp-multi-instance-dual-db-russian.md)
- [Chinese](./docs/whatsapp-multi-instance-dual-db-chinese.md)
- [Korean](./docs/whatsapp-multi-instance-dual-db-korean.md)

### UI 문서

- [영어](./docs/whatsapp-api-ui-documentation-english.md)
- [러시아어](./docs/whatsapp-api-ui-documentation-russian.md)
- [중국어](./docs/whatsapp-api-ui-documentation-chinese.md)
- [한국어](./docs/whatsapp-api-ui-documentation-korean.md)

### 인증

API는 두 가지 인증 방법을 지원합니다:

1. **JWT 토큰 인증**:
   ```bash
   curl -X POST https://your-api-url.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com","password":"strongpassword"}'
   ```

2. **API 키 인증**:
   ```bash
   curl -X GET https://your-api-url.com/api/instances \
     -H "x-api-key: your-api-key"
   ```

### 기본 사용 예시

#### WhatsApp 인스턴스 생성

```bash
curl -X POST https://your-api-url.com/api/instances \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Main WhatsApp",
    "description": "Corporate account",
    "webhookUrl": "https://your-webhook-url.com/whatsapp"
  }'
```

#### 메시지 전송

```bash
curl -X POST https://your-api-url.com/api/whatsapp/{instanceId}/send \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "79001234567",
    "message": "Hello! This is a test message."
  }'
```

#### 데이터베이스 제공자 전환

```bash
curl -X POST https://your-api-url.com/api/db/switch \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "sqlite"
  }'
```

## 📱 클라이언트 라이브러리

### JavaScript/Node.js

```javascript
const axios = require('axios');

const client = axios.create({
  baseURL: 'https://your-api-url.com/api',
  headers: { 'x-api-key': 'your-api-key' }
});

async function sendMessage(instanceId, phone, message) {
  const response = await client.post(`/whatsapp/${instanceId}/send`, {
    phone,
    message
  });
  return response.data;
}
```

### Python

```python
import requests

class WhatsAppAPI:
    def __init__(self, base_url, api_key):
        self.base_url = base_url
        self.headers = {
            'x-api-key': api_key,
            'Content-Type': 'application/json'
        }
    
    def send_message(self, instance_id, phone, message):
        url = f"{self.base_url}/whatsapp/{instance_id}/send"
        data = {
            "phone": phone,
            "message": message
        }
        response = requests.post(url, headers=self.headers, json=data)
        return response.json()
```

## 📊 통계 및 모니터링

API는 사용 통계를 수집하기 위한 엔드포인트를 제공합니다:

- **사용자 통계**: `/api/stats/user`
- **인스턴스 통계**: `/api/stats/instances/{instanceId}`
- **시스템 통계**: `/api/stats/system` (관리자 전용)

## 🤖 단순화 및 전체 WhatsApp 서비스

이 프로젝트는 두 가지 다른 WhatsApp 서비스 구현을 포함합니다:

1. **전체 WhatsApp 관리자 서비스** (`whatsapp-manager.service.js`): 미디어 처리, 웹훅 지원, 상세 이벤트 추적을 포함한 포괄적인 기능이 있는 기본 구현입니다.

2. **단순화된 WhatsApp 서비스** (`simplified-whatsapp.service.js`): 핵심 메시징 기능에 중점을 둔 경량 구현으로, 더 간단한 사용 사례나 테스트에 적합합니다.

해당 API 엔드포인트를 사용하여 필요에 맞는 적절한 구현을 선택할 수 있습니다.

## 🔒 보안 권장 사항

1. API 통신에는 항상 HTTPS 사용
2. API 키를 안전하게 저장하고 클라이언트 측 코드에 포함하지 않기
3. 정기적으로 자격 증명(비밀번호 및 API 키) 교체
4. 가능한 경우 API 액세스에 대한 IP 제한 구성
5. 의심스러운 활동을 모니터링하기 위해 활동 로그 확인
6. 적절한 웹훅 재시도 제한을 설정하고 웹훅 전달 모니터링
7. 남용을 방지하기 위한 API 엔드포인트 속도 제한 구현

## 🔧 문제 해결

### 일반적인 문제

1. **연결 문제**:
   - WhatsApp 계정이 다른 곳에 연결되어 있지 않은지 확인
   - 필요한 경우 인증 파일을 삭제하고 다시 연결
   - 소켓 확인 엔드포인트를 사용하여 소켓 상태 확인

2. **QR 코드 스캔 문제**:
   - WhatsApp 앱이 최신 버전인지 확인
   - 스캔 시 안정적인 인터넷 연결 확보
   - QR 코드가 표시되지 않는 경우 API를 통해 인스턴스 재연결 시도

3. **속도 제한 및 차단**:
   - WhatsApp의 속도 제한 및 지침을 염두에 두기
   - 지수 백오프가 있는 자동 재시도 메커니즘 구현
   - 잠재적 문제를 조기에 감지하기 위해 사용량 모니터링 기능 활용

4. **데이터베이스 문제**:
   - SQLite의 경우: 파일 권한을 확인하고 "데이터베이스가 잠김" 오류 처리
   - MongoDB의 경우: 연결 문자열 및 적절한 인증 확인
   - 지속적인 문제가 발생하는 경우 데이터베이스 전환 기능 사용

## 📝 개발 로드맵

WhatsApp 다중 인스턴스 API의 향후 개발을 위한 상세한 로드맵을 준비했습니다. 선호하는 언어로 확인하세요:

- [English](./docs/roadmap-english.md)
- [Russian](./docs/roadmap-russian.md)
- [Chinese](./docs/roadmap-chinese.md)
- [Korean](./docs/roadmap-korean.md)

개발 우선순위를 정하는 데 도움이 될 여러분의 피드백과 기여를 환영합니다!

## 🤝 기여하기

기여를 환영합니다! 언제든지 Pull Request를 제출해 주세요.

1. 리포지토리 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경 사항 커밋 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 열기

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 라이선스가 부여됩니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 지원

문제가 발생하거나 질문이 있는 경우 [이슈 열기](https://github.com/0101001001001011/rk-wa/issues)를 통해 알려주세요.

## 🙏 감사의 말

이 프로젝트는 여러 오픈 소스 프로젝트의 놀라운 작업 없이는 불가능했을 것입니다:

- [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API 기능을 제공하는 강력한 라이브러리
- [Prisma](https://www.prisma.io/) - Node.js 및 TypeScript를 위한 차세대 ORM
- [Express](https://expressjs.com/) - Node.js를 위한 빠르고, 간결하며, 유연한 웹 프레임워크
- [MongoDB](https://www.mongodb.com/) - 현대적인 애플리케이션을 위한 데이터베이스
- [SQLite](https://www.sqlite.org/) - 세계에서 가장 많이 사용되는 데이터베이스 엔진

이러한 프로젝트에 시간과 전문 지식을 기여한 모든 개발자들에게 특별한 감사를 드립니다. 이들의 노력이 우리의 작업을 가능하게 했습니다.

---

Anthropic의 Claude AI의 도움을 받아 RK 팀이 ❤️로 만들었습니다