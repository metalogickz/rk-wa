# 이중 데이터베이스 지원 (MongoDB 및 SQLite)

WhatsApp Multi-Instance API는 이제 두 가지 데이터베이스를 지원합니다: MongoDB와 SQLite. 이를 통해 사용자의 요구사항과 자원에 따라 최적의 솔루션을 선택할 수 있습니다.

## 데이터베이스 비교

| 기능 | MongoDB | SQLite |
|---------|---------|--------|
| 대용량 데이터 성능 | 높음 | 중간 |
| 자원 요구 사항 | 높음 | 낮음 |
| 분산 배포 | 가능 | 불가능 |
| 구성 | 복잡함 | 간단함 |
| 백업 | 복잡함 | 간단함 (단일 파일) |
| 서버 부하 | 중간 | 낮음 |
| 수평적 확장 | 가능 | 불가능 |

## 구성

### 1. 환경 변수

두 데이터베이스를 지원하기 위해 `.env` 파일에 다음 변수를 추가하세요:

```
# 데이터베이스 제공자 선택: mongodb 또는 sqlite
DATABASE_PROVIDER=mongodb

# MongoDB URL
DATABASE_URL="mongodb://username:password@localhost:27017/whatsapp-api?authSource=admin"

# SQLite URL (파일 경로)
SQLITE_DATABASE_URL="file:./data/whatsapp-api.db"
```

### 2. 데이터베이스 초기화

두 데이터베이스를 초기화하려면 다음 명령어를 실행하세요:

```bash
# 두 데이터베이스 유형에 대한 Prisma 클라이언트 생성
npm run prisma:generate:all

# 데이터베이스 초기화 및 관리자 사용자 생성
node scripts/init-databases.js
```

`init-databases.js` 스크립트는 두 데이터베이스에 필요한 테이블/컬렉션을 생성하고 초기 관리자 사용자를 만듭니다.

## 데이터베이스 간 전환

### 방법 1: API를 통한 전환

API는 현재 제공자를 확인하고 전환하기 위한 엔드포인트를 제공합니다:

```
GET /api/db/status - 현재 데이터베이스 제공자 반환
POST /api/db/switch - 제공자 전환 (필요 파라미터: "provider": "mongodb" 또는 "sqlite")
```

SQLite로 전환하는 요청 예시:

```bash
curl -X POST http://localhost:3000/api/db/switch \
  -H "Content-Type: application/json" \
  -d '{"provider": "sqlite"}'
```

### 방법 2: .env 파일 수정

`.env` 파일에서 `DATABASE_PROVIDER` 값을 수동으로 변경한 후 서버를 재시작할 수 있습니다.

### 방법 3: 명령줄 유틸리티

편리한 전환을 위한 특별 유틸리티가 제공됩니다:

```bash
node scripts/switch-database.js
```

이 유틸리티는 데이터베이스 전환 과정을 대화식으로 안내합니다.

## 데이터베이스 간 데이터 마이그레이션

이미 한 데이터베이스에 데이터가 있고 다른 데이터베이스로 전송하려면 마이그레이션 스크립트를 사용할 수 있습니다:

```bash
node scripts/migrate-database.js
```

이 스크립트는 다음을 가능하게 하는 대화식 인터페이스를 제공합니다:
1. 마이그레이션 방향 선택 (MongoDB → SQLite 또는 SQLite → MongoDB)
2. 마이그레이션할 데이터 유형 선택 (사용자, 인스턴스, 메시지 등)
3. 대용량 데이터셋에 대한 제한 설정 (메시지, 활동 로그)

## 사용 특성

### MongoDB

- 많은 사용자가 있는 고부하 시스템에 더 적합
- 대용량 데이터가 있는 프로덕션 환경에 권장
- MongoDB 서버 설치 및 구성 필요
- 네이티브 JSON 데이터 저장 지원

### SQLite

- 데모, 개발 및 테스트에 이상적
- 제한된 자원을 가진 머신에서 잘 작동
- 추가 소프트웨어 필요 없음 - 전체 데이터베이스가 단일 파일
- 모든 데이터가 로컬에 저장되어 백업 간소화
- 병렬 쿼리 및 대용량 데이터에 제한 있음

## JSON 데이터 작업

SQLite는 네이티브 JSON 저장을 지원하지 않기 때문에:

1. JSON 데이터는 쓰기/읽기 시 자동으로 직렬화/역직렬화됨
2. JSON 내부 필드를 사용하는 일부 SQLite 필터링 작업은 더 느릴 수 있음
3. SQLite의 중첩 트랜잭션 수에 제한이 있음

## 백업

### MongoDB

MongoDB 백업은 표준 도구를 사용하세요:

```bash
# 백업 생성
mongodump --uri="mongodb://username:password@localhost:27017/whatsapp-api" --out=./backup

# 복원
mongorestore --uri="mongodb://username:password@localhost:27017/whatsapp-api" ./backup
```

### SQLite

SQLite 백업은 데이터베이스 파일을 복사하는 것만으로 가능합니다:

```bash
# 데이터베이스 파일 경로가 ./data/whatsapp-api.db라고 가정
cp ./data/whatsapp-api.db ./backup/whatsapp-api-$(date +%Y%m%d).db
```

## 권장 사항

1. **개발 및 테스트**: 설정이 간단하여 SQLite가 더 적합
2. **저부하 프로덕션**: 작은 설치에는 SQLite로 충분할 수 있음
3. **고부하 프로덕션**: MongoDB가 더 나은 성능 제공
4. **Docker 배포**: SQLite는 별도의 데이터베이스 서비스가 필요 없어 컨테이너화가 더 쉬움

## 문제 해결

### SQLite 문제

- **"Database is locked" 오류**: 동시 접근 시 발생. SQLite는 하나의 쓰기 프로세스만 지원합니다.
- **파일 권한 문제**: 프로세스가 데이터베이스 파일에 대한 읽기/쓰기 권한이 있는지 확인하세요.
- **파일 크기**: 데이터베이스 파일이 1GB를 초과하면 SQLite가 느려질 수 있습니다. 오래된 데이터를 정기적으로 보관하세요.

### MongoDB 문제

- **연결 오류**: MongoDB 서버가 실행 중이고 지정된 URL에서 접근 가능한지 확인하세요.
- **인증**: DATABASE_URL의 자격 증명이 올바른지 확인하세요.
- **인덱싱 오류**: 대용량 데이터에서 성능 향상을 위해 인덱스를 생성하세요.

## 모니터링

데이터베이스 작동 모니터링:

- **MongoDB**: MongoDB Compass 또는 MongoDB Atlas 사용
- **SQLite**: SQLite Browser를 사용하여 데이터 보기 및 편집

API의 `/health` 엔드포인트는 현재 데이터베이스 제공자에 대한 정보를 포함합니다