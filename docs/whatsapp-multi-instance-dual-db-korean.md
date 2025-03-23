# 이중 데이터베이스 지원 (MongoDB 및 SQLite)

WhatsApp 다중 인스턴스 API는 MongoDB와 SQLite 두 가지 데이터베이스 유형을 지원합니다. 이를 통해 사용자는 필요와 자원에 따라 최적의 솔루션을 선택할 수 있습니다.

## 데이터베이스 비교

| 기능 | MongoDB | SQLite |
|---------|---------|--------|
| 대용량 데이터 성능 | 높음 | 중간 |
| 자원 요구사항 | 높음 | 낮음 |
| 분산 배포 | 가능 | 불가능 |
| 구성 | 복잡함 | 간단함 |
| 백업 | 간단함 (단일 파일) | 간단함 (단일 파일) |
| 서버 부하 | 중간 | 낮음 |
| 수평적 확장 | 가능 | 불가능 |

## 구성

### 1. 환경 변수

두 데이터베이스를 지원하기 위해 `.env` 파일에서 다음 변수가 사용됩니다:

```
# 데이터베이스 제공자 선택: mongodb 또는 sqlite
DATABASE_PROVIDER=mongodb

# MongoDB URL
DATABASE_URL="mongodb://username:password@localhost:27017/whatsapp-api?authSource=admin"

# SQLite URL (파일 경로)
SQLITE_DATABASE_URL="file:./data/whatsapp-api.db"
```

프로젝트와 함께 제공된 `.env` 및 `.env.docker` 파일에서 이러한 구성의 예를 확인할 수 있습니다.

### 2. 데이터베이스 초기화

애플리케이션이 시작될 때 데이터베이스가 자동으로 초기화됩니다. 초기화 과정은 `DBConnector` 클래스에 의해 관리되며 다음을 수행합니다:

- 데이터베이스 디렉토리 생성 (SQLite용)
- 기존 데이터베이스 파일 백업 (SQLite용)
- Prisma 마이그레이션 실행
- 초기 관리자 사용자 생성

적절한 DATABASE_PROVIDER 환경 변수를 설정하여 애플리케이션을 실행함으로써 수동으로 데이터베이스를 초기화할 수도 있습니다.

## 데이터베이스 간 전환

### 방법 1: API를 통한 전환

API는 현재 제공자를 보고 전환하기 위한 엔드포인트를 제공합니다:

```
GET /api/db/status - 현재 데이터베이스 제공자 반환
POST /api/db/switch - 제공자 전환 (요구사항: "provider": "mongodb" 또는 "sqlite")
```

SQLite로 전환하는 요청 예:

```bash
curl -X POST http://localhost:3000/api/db/switch \
  -H "Content-Type: application/json" \
  -d '{"provider": "sqlite"}'
```

API는 다음을 수행합니다:
1. 현재 데이터베이스에서 연결 해제
2. 새 제공자로 전환
3. 새 데이터베이스에 대한 연결 초기화
4. 후속 재시작을 위한 환경 변수 업데이트

### 방법 2: .env 파일 수정

`.env` 파일에서 `DATABASE_PROVIDER` 값을 수동으로 변경한 다음 서버를 재시작할 수 있습니다.

## JSON 데이터 작업

SQLite는 네이티브 JSON 저장을 지원하지 않기 때문에, 애플리케이션은 JSON 데이터 변환을 자동으로 처리합니다:

1. `DBConnector` 클래스는 JSON 데이터를 직렬화하고 역직렬화하는 `handleJsonData()` 메서드를 제공
2. SQLite에 JSON을 저장할 때는 문자열 표현으로 변환됨
3. SQLite에서 JSON을 검색할 때는 다시 객체로 파싱됨
4. 이는 `instance.service.js` 등의 서비스에서 투명하게 처리됨

이는 다음과 같은 여러 데이터 유형에 영향을 미칩니다:
- 웹훅 헤더
- 메시지 메타데이터
- 활동 로그 세부 정보

## 사용 특성

### MongoDB

- 많은 사용자가 있는 고부하 시스템에 더 적합
- 대용량 데이터가 있는 프로덕션 환경에 권장
- MongoDB 서버 설치 및 구성 필요
- 네이티브 JSON 데이터 저장 지원

### SQLite

- 데모, 개발 및 테스트에 이상적
- 제한된 리소스가 있는 머신에서 잘 작동
- 추가 소프트웨어가 필요 없음 - 전체 데이터베이스가 단일 파일
- 모든 데이터가 로컬에 저장되어 백업이 간단
- 병렬 쿼리 및 대용량 데이터에 제한이 있음

## 백업

### MongoDB

MongoDB 백업은 표준 도구를 사용합니다:

```bash
# 백업 생성
mongodump --uri="mongodb://username:password@localhost:27017/whatsapp-api" --out=./backup

# 복원
mongorestore --uri="mongodb://username:password@localhost:27017/whatsapp-api" ./backup
```

### SQLite

SQLite의 경우, 백업은 초기화 중에 자동으로 처리되어 타임스탬프가 있는 백업 파일을 생성합니다. 데이터베이스 파일을 수동으로 복사할 수도 있습니다:

```bash
# 데이터베이스 파일 경로가 ./data/whatsapp-api.db라고 가정
cp ./data/whatsapp-api.db ./backup/whatsapp-api-$(date +%Y%m%d).db
```

## Docker 지원

프로젝트는 두 데이터베이스 유형 모두에 대한 Docker 지원을 포함합니다. Docker 사용 시:

1. docker-compose.yml 파일에서 데이터베이스 제공자를 지정할 수 있습니다
2. 컨테이너가 선택한 데이터베이스를 자동으로 초기화합니다
3. SQLite 데이터는 영구 볼륨에 저장됩니다

docker-compose.yml의 예:
```yaml
environment:
  - DATABASE_PROVIDER=sqlite
  - DATABASE_URL=mongodb://whatsapp:whatsapp-password@mongodb:27017/whatsapp-api?authSource=admin
  - SQLITE_DATABASE_URL=file:/usr/src/app/data/whatsapp-api.db
```

## 권장 사항

1. **개발 및 테스트**: 설정이 간단하기 때문에 SQLite가 더 좋습니다
2. **저부하 프로덕션**: 소규모 설치에는 SQLite가 충분할 수 있습니다
3. **고부하 프로덕션**: MongoDB가 더 나은 성능을 제공합니다
4. **Docker 배포**: SQLite는 별도의 데이터베이스 서비스가 필요하지 않아 컨테이너화가 더 쉽습니다

## 문제 해결

### SQLite 문제

- **"데이터베이스가 잠겼습니다" 오류**: 동시 액세스 시 발생합니다. SQLite는 하나의 쓰기 프로세스만 지원합니다.
- **파일 권한 문제**: 프로세스가 데이터베이스 파일에 대한 읽기/쓰기 권한이 있는지 확인하세요.
- **파일 크기**: 데이터베이스 파일이 1GB를 초과하면 SQLite가 느려질 수 있습니다. 오래된 데이터를 정기적으로 보관하세요.

### MongoDB 문제

- **연결 오류**: MongoDB 서버가 실행 중이고 지정된 URL에서 접근 가능한지 확인하세요.
- **인증**: DATABASE_URL의 자격 증명이 올바른지 확인하세요.
- **인덱싱 오류**: 대용량 데이터에서 더 나은 성능을 위해 인덱스를 생성하세요.

## 모니터링

API의 `/health` 엔드포인트는 현재 데이터베이스 제공자 및 연결 상태에 대한 정보를 포함합니다.

샘플 응답:
```json
{
  "status": "ok",
  "timestamp": "2023-01-01T12:00:00.000Z",
  "dbProvider": "sqlite"
}
```