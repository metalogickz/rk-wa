# WhatsApp Multi-Instance API Docker 배포 가이드

이 가이드는 Docker를 사용하여 WhatsApp Multi-Instance API 서비스를 배포하기 위한 자세한 지침을 제공합니다. 이 애플리케이션은 MongoDB 및 SQLite를 데이터베이스 제공자로 지원합니다.

## 목차

- [사전 요구 사항](#사전-요구-사항)
- [프로젝트 개요](#프로젝트-개요)
- [빠른 시작](#빠른-시작)
- [상세 구성](#상세-구성)
  - [환경 변수](#환경-변수)
  - [데이터베이스 구성](#데이터베이스-구성)
  - [인증](#인증)
  - [웹훅 설정](#웹훅-설정)
  - [Cron 작업](#cron-작업)
- [Docker 배포 옵션](#docker-배포-옵션)
  - [Docker Compose 사용](#docker-compose-사용)
  - [Docker CLI 사용](#docker-cli-사용)
- [볼륨 관리](#볼륨-관리)
- [헬스 체크](#헬스-체크)
- [로깅](#로깅)
- [스케일링](#스케일링)
- [백업 및 복원](#백업-및-복원)
- [업그레이드](#업그레이드)
- [문제 해결](#문제-해결)
- [보안 고려 사항](#보안-고려-사항)
- [API 문서](#api-문서)

## 사전 요구 사항

- Docker Engine 20.10.0 이상
- Docker Compose 2.0.0 이상 (docker-compose 사용 시)
- 최소 2GB의 여유 RAM
- 1GB의 여유 디스크 공간 (메시지 기록을 위해 더 많이 권장)
- 인터넷 연결 (WhatsApp 연결에 필요)

## 프로젝트 개요

WhatsApp Multi-Instance API 서비스는 다음과 같은 기능을 제공합니다:

- 여러 WhatsApp 인스턴스 관리
- 메시지 송수신
- 연락처 관리
- 미디어 파일 전송
- 실시간 알림을 위한 웹훅 설정
- 사용 통계 추적

이 서비스는 두 가지 데이터베이스 제공자를 지원합니다:
- **MongoDB**: 프로덕션 배포에 권장
- **SQLite**: 개발 또는 소규모 배포에 적합

## 빠른 시작

Docker Compose를 사용하여 서비스를 빠르게 시작하는 방법:

1. 프로젝트를 위한 새 디렉토리 생성:
   ```bash
   mkdir whatsapp-api && cd whatsapp-api
   ```

2. 다음 내용으로 `docker-compose.yml` 파일 생성:
   ```yaml
   version: '3'

   services:
     mongodb:
       image: mongo:latest
       ports:
         - "27017:27017"
       environment:
         - MONGO_INITDB_ROOT_USERNAME=whatsapp
         - MONGO_INITDB_ROOT_PASSWORD=whatsapp-password
       volumes:
         - mongodb_data:/data/db
       restart: unless-stopped

     whatsapp-api:
       image: your-registry/whatsapp-api:latest  # 귀하의 이미지로 교체
       # 또는 Dockerfile에서 빌드하려면 다음을 사용
       # build: .
       ports:
         - "3000:3000"
       environment:
         - PORT=3000
         - NODE_ENV=production
         - DATABASE_PROVIDER=sqlite  # 또는 mongodb
         - DATABASE_URL=mongodb://whatsapp:whatsapp-password@mongodb:27017/whatsapp-api?authSource=admin
         - SQLITE_DATABASE_URL=file:/usr/src/app/data/whatsapp-api.db
         - JWT_SECRET=your-jwt-secret-key-here
         - JWT_EXPIRATION=24h
         - ADMIN_EMAIL=admin@example.com
         - ADMIN_PASSWORD=admin123
       volumes:
         - whatsapp_instances:/usr/src/app/instances
         - whatsapp_uploads:/usr/src/app/uploads
         - whatsapp_logs:/usr/src/app/logs
         - whatsapp_data:/usr/src/app/data
       depends_on:
         - mongodb
       restart: unless-stopped

   volumes:
     mongodb_data:
     whatsapp_instances:
     whatsapp_uploads:
     whatsapp_logs:
     whatsapp_data:
   ```

3. 서비스 실행:
   ```bash
   docker-compose up -d
   ```

4. API 접근: `http://localhost:3000`

5. 기본 관리자 자격 증명:
   - 이메일: admin@example.com
   - 비밀번호: admin123

## 상세 구성

### 환경 변수

| 변수 | 설명 | 기본값 | 필수 |
|----------|-------------|---------|----------|
| `PORT` | 서버 포트 | `3000` | 아니오 |
| `NODE_ENV` | 환경 (production, development) | `development` | 아니오 |
| `DATABASE_PROVIDER` | 데이터베이스 제공자 (mongodb, sqlite) | `mongodb` | 아니오 |
| `DATABASE_URL` | MongoDB 연결 문자열 | - | 예 (MongoDB 사용 시) |
| `SQLITE_DATABASE_URL` | SQLite 데이터베이스 경로 | `file:./data/whatsapp-api.db` | 아니오 |
| `JWT_SECRET` | JWT 토큰용 비밀 키 | - | 예 |
| `JWT_EXPIRATION` | JWT 토큰 만료 시간 | `24h` | 아니오 |
| `ADMIN_EMAIL` | 관리자 이메일 | `admin@example.com` | 아니오 |
| `ADMIN_PASSWORD` | 관리자 비밀번호 | `admin123` | 아니오 |
| `ADMIN_FIRST_NAME` | 관리자 이름 | `Admin` | 아니오 |
| `ADMIN_LAST_NAME` | 관리자 성 | `User` | 아니오 |
| `LOG_LEVEL` | 로깅 레벨 (debug, info, warn, error) | `info` | 아니오 |
| `MAX_FILE_SIZE` | 업로드 최대 파일 크기 (바이트) | `10485760` (10MB) | 아니오 |
| `UPLOADS_DIR` | 파일 업로드 디렉토리 | `./uploads` | 아니오 |
| `CORS_ORIGIN` | CORS 허용 출처 | `*` | 아니오 |

### 데이터베이스 구성

#### MongoDB 구성

MongoDB를 데이터베이스 제공자로 사용하려면:

```yaml
environment:
  - DATABASE_PROVIDER=mongodb
  - DATABASE_URL=mongodb://username:password@hostname:port/database?authSource=admin
```

복제 세트 또는 클러스터의 경우:

```yaml
environment:
  - DATABASE_PROVIDER=mongodb
  - DATABASE_URL=mongodb://username:password@host1:port,host2:port,host3:port/database?replicaSet=myReplicaSet&authSource=admin
```

#### SQLite 구성

SQLite를 데이터베이스 제공자로 사용하려면:

```yaml
environment:
  - DATABASE_PROVIDER=sqlite
  - SQLITE_DATABASE_URL=file:/usr/src/app/data/whatsapp-api.db
```

### 인증

이 서비스는 인증에 JWT(JSON Web Tokens)를 사용합니다. 다음 변수를 구성하세요:

```yaml
environment:
  - JWT_SECRET=your-strong-secret-key-here
  - JWT_EXPIRATION=24h  # 형식: Xh (시간), Xm (분), Xd (일)
```

관리자 사용자의 경우:

```yaml
environment:
  - ADMIN_EMAIL=admin@example.com
  - ADMIN_PASSWORD=secure-password
  - ADMIN_FIRST_NAME=Admin
  - ADMIN_LAST_NAME=User
```

### 웹훅 설정

웹훅은 API를 통해 각 WhatsApp 인스턴스별로 구성할 수 있습니다. 전역 설정에는 다음이 포함됩니다:

```yaml
environment:
  - WEBHOOK_RETRY_INTERVAL=60000  # 재시도 간격(밀리초)
  - WEBHOOK_MAX_RETRIES=3         # 최대 재시도 횟수
```

### Cron 작업

서비스는 유지 관리 작업을 위해 여러 cron 작업을 사용합니다:

```yaml
environment:
  - CLEANUP_CRON=0 0 * * *          # 매일 자정에 실행
  - SOCKET_CHECK_CRON=*/5 * * * *   # 5분마다 실행
  - AUTH_CHECK_CRON=0 12 * * *      # 매일 정오에 실행
  - USAGE_SAVE_CRON=*/15 * * * *    # 15분마다 실행
  - USAGE_LIMITS_CRON=0 * * * *     # 매 시간마다 실행
  - SYSTEM_METRICS_CRON=*/5 * * * * # 5분마다 실행
```

## Docker 배포 옵션

### Docker Compose 사용

서비스를 배포하는 권장 방법은 Docker Compose를 사용하는 것입니다:

1. 구성이 포함된 `docker-compose.yml` 파일 저장
2. 실행:
   ```bash
   docker-compose up -d
   ```
3. 로그 확인:
   ```bash
   docker-compose logs -f whatsapp-api
   ```
4. 서비스 중지:
   ```bash
   docker-compose down
   ```

### Docker CLI 사용

Docker CLI를 사용하여 서비스를 실행할 수도 있습니다:

```bash
# 네트워크 생성
docker network create whatsapp-network

# MongoDB 실행
docker run -d \
  --name mongodb \
  --network whatsapp-network \
  -e MONGO_INITDB_ROOT_USERNAME=whatsapp \
  -e MONGO_INITDB_ROOT_PASSWORD=whatsapp-password \
  -v mongodb_data:/data/db \
  mongo:latest

# WhatsApp API 실행
docker run -d \
  --name whatsapp-api \
  --network whatsapp-network \
  -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=production \
  -e DATABASE_PROVIDER=mongodb \
  -e DATABASE_URL=mongodb://whatsapp:whatsapp-password@mongodb:27017/whatsapp-api?authSource=admin \
  -e JWT_SECRET=your-jwt-secret-key-here \
  -e JWT_EXPIRATION=24h \
  -e ADMIN_EMAIL=admin@example.com \
  -e ADMIN_PASSWORD=admin123 \
  -v whatsapp_instances:/usr/src/app/instances \
  -v whatsapp_uploads:/usr/src/app/uploads \
  -v whatsapp_logs:/usr/src/app/logs \
  -v whatsapp_data:/usr/src/app/data \
  your-registry/whatsapp-api:latest
```

## 볼륨 관리

이 서비스는 지속적인 데이터 저장을 위해 여러 Docker 볼륨을 사용합니다:

| 볼륨 | 용도 | 참고 |
|--------|---------|-------|
| `mongodb_data` | MongoDB 데이터베이스 파일 | MongoDB 사용 시에만 필요 |
| `whatsapp_instances` | WhatsApp 세션 데이터 | 각 인스턴스의 인증 파일 포함 |
| `whatsapp_uploads` | 미디어 파일 업로드 | 미디어 파일 전송용 |
| `whatsapp_logs` | 애플리케이션 로그 | 문제 해결에 유용 |
| `whatsapp_data` | SQLite 데이터베이스 파일 | SQLite 사용 시에만 필요 |

Docker CLI에서 명명된 볼륨을 사용하려면:

```bash
docker volume create whatsapp_instances
docker volume create whatsapp_uploads
docker volume create whatsapp_logs
docker volume create whatsapp_data
```

### 볼륨 백업

볼륨을 백업하려면:

```bash
# MongoDB 데이터
docker run --rm -v mongodb_data:/data -v $(pwd):/backup alpine tar -czf /backup/mongodb_backup.tar.gz /data

# WhatsApp 인스턴스
docker run --rm -v whatsapp_instances:/data -v $(pwd):/backup alpine tar -czf /backup/instances_backup.tar.gz /data

# SQLite 데이터
docker run --rm -v whatsapp_data:/data -v $(pwd):/backup alpine tar -czf /backup/sqlite_backup.tar.gz /data
```

### 볼륨 복원

볼륨을 복원하려면:

```bash
# MongoDB 데이터
docker run --rm -v mongodb_data:/data -v $(pwd):/backup alpine sh -c "rm -rf /data/* && tar -xzf /backup/mongodb_backup.tar.gz -C /"

# WhatsApp 인스턴스
docker run --rm -v whatsapp_instances:/data -v $(pwd):/backup alpine sh -c "rm -rf /data/* && tar -xzf /backup/instances_backup.tar.gz -C /"

# SQLite 데이터
docker run --rm -v whatsapp_data:/data -v $(pwd):/backup alpine sh -c "rm -rf /data/* && tar -xzf /backup/sqlite_backup.tar.gz -C /"
```

## 헬스 체크

이 서비스는 `/health` 엔드포인트에서 헬스 체크를 제공합니다. Docker 헬스 체크를 구성할 수 있습니다:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## 로깅

이 서비스는 stdout/stderr로 로그를 기록하고 `/usr/src/app/logs` 디렉토리의 파일에도 기록합니다:

- `combined.log` - 모든 로그
- `error.log` - 오류 로그만

Docker에서 로그를 보려면:

```bash
docker logs -f whatsapp-api
```

로깅 사용자 정의:

```yaml
environment:
  - LOG_LEVEL=debug  # 옵션: debug, info, warn, error
```

## 스케일링

이 서비스는 수평적으로 확장할 수 있습니다. 각 인스턴스는 자체 데이터 볼륨을 가져야 합니다:

```yaml
services:
  whatsapp-api-1:
    image: your-registry/whatsapp-api:latest
    volumes:
      - whatsapp_instances_1:/usr/src/app/instances
      - whatsapp_data_1:/usr/src/app/data
    # 기타 설정...

  whatsapp-api-2:
    image: your-registry/whatsapp-api:latest
    volumes:
      - whatsapp_instances_2:/usr/src/app/instances
      - whatsapp_data_2:/usr/src/app/data
    # 기타 설정...
```

각 WhatsApp 인스턴스는 충돌을 방지하기 위해 하나의 서비스 인스턴스에서만 관리해야 합니다.

## 백업 및 복원

### 데이터베이스 백업

#### MongoDB 백업

```bash
docker exec -it mongodb mongodump --username whatsapp --password whatsapp-password --authenticationDatabase admin --db whatsapp-api --out /dump
docker cp mongodb:/dump ./backup
```

#### SQLite 백업

```bash
docker exec -it whatsapp-api sh -c "sqlite3 /usr/src/app/data/whatsapp-api.db .dump > /usr/src/app/data/backup.sql"
docker cp whatsapp-api:/usr/src/app/data/backup.sql ./backup.sql
```

### 데이터베이스 복원

#### MongoDB 복원

```bash
docker cp ./backup mongodb:/dump
docker exec -it mongodb mongorestore --username whatsapp --password whatsapp-password --authenticationDatabase admin /dump
```

#### SQLite 복원

```bash
docker cp ./backup.sql whatsapp-api:/usr/src/app/data/
docker exec -it whatsapp-api sh -c "cat /usr/src/app/data/backup.sql | sqlite3 /usr/src/app/data/whatsapp-api.db"
```

## 업그레이드

서비스를 업그레이드하려면:

1. 최신 이미지 가져오기:
   ```bash
   docker-compose pull whatsapp-api
   ```

2. 서비스 재시작:
   ```bash
   docker-compose up -d whatsapp-api
   ```

주요 업그레이드의 경우 먼저 데이터를 백업하는 것이 좋습니다.

## 문제 해결

### 컨테이너가 시작되지 않음

로그 확인:
```bash
docker logs whatsapp-api
```

일반적인 문제:
- 데이터베이스 연결 문제
- 볼륨 권한 문제
- 환경 변수 구성 오류

### 데이터베이스 연결 문제

MongoDB의 경우:
- MongoDB 컨테이너가 실행 중인지 확인: `docker ps`
- `DATABASE_URL`의 연결 문자열 확인
- 자격 증명이 올바른지 확인

SQLite의 경우:
- 데이터 디렉토리에 적절한 권한이 있는지 확인
- `SQLITE_DATABASE_URL`이 올바른지 확인

### WhatsApp 연결 문제

- 컨테이너에 인터넷 접근 권한이 있는지 확인
- WhatsApp 인스턴스 로그 확인: `/usr/src/app/logs/combined.log`
- API를 통해 인스턴스 재연결 시도

### QR 코드가 표시되지 않음

- API를 통해 인스턴스 재시작
- 오류 메시지에 대한 로그 확인
- 브라우저가 API 엔드포인트에 접근할 수 있는지 확인

## 보안 고려 사항

### 관리자 비밀번호

첫 로그인 후 즉시 기본 관리자 비밀번호 변경:

```yaml
environment:
  - ADMIN_EMAIL=admin@example.com
  - ADMIN_PASSWORD=strong-unique-password
```

### JWT Secret

강력하고 고유한 JWT 비밀을 사용:

```yaml
environment:
  - JWT_SECRET=your-very-long-and-secure-random-string
```

### MongoDB 인증

항상 MongoDB에 인증 사용:

```yaml
environment:
  - DATABASE_URL=mongodb://username:password@hostname:port/database?authSource=admin
```

### 네트워크 보안

- HTTPS를 사용하는 리버스 프록시(Nginx 또는 Traefik과 같은) 사용
- 네트워크 규칙을 사용하여 API에 대한 접근 제한
- 프로덕션에 CORS 제한 사용:
  ```yaml
  environment:
    - CORS_ORIGIN=https://your-domain.com
  ```

## API 문서

API 엔드포인트는 다음 위치에서 사용할 수 있습니다:

- 인증: `/api/auth/login`
- 인스턴스 관리: `/api/instances`
- WhatsApp 기능: `/api/whatsapp/:instanceId/...`
- 간소화된 WhatsApp API: `/api/whatsapp-simple/:instanceId/...`
- 통계: `/api/stats/...`

자세한 API 문서는 API 문서를 참조하거나 `/ui/instances`에서 인터페이스를 탐색하세요.

## 사용자 정의 Docker 이미지 빌드

사용자 정의 버전의 이미지를 빌드해야 하는 경우:

1. 저장소 복제:
   ```bash
   git clone https://github.com/your-organization/whatsapp-api.git
   cd whatsapp-api
   ```

2. 필요에 따라 코드 수정

3. Docker 이미지 빌드:
   ```bash
   docker build -t your-registry/whatsapp-api:custom .
   ```

4. 사용자 정의 이미지를 사용하도록 `docker-compose.yml` 업데이트:
   ```yaml
   services:
     whatsapp-api:
       image: your-registry/whatsapp-api:custom
       # 기타 설정...
   ```

## 환경 변수 참조 표

| 변수 | 설명 | 기본값 | 필수 |
|----------|-------------|---------|----------|
| `PORT` | 서버 포트 | `3000` | 아니오 |
| `NODE_ENV` | 환경 (production, development) | `development` | 아니오 |
| `DATABASE_PROVIDER` | 데이터베이스 제공자 (mongodb, sqlite) | `mongodb` | 아니오 |
| `DATABASE_URL` | MongoDB 연결 문자열 | - | 예 (MongoDB 사용 시) |
| `SQLITE_DATABASE_URL` | SQLite 데이터베이스 경로 | `file:./data/whatsapp-api.db` | 아니오 |
| `JWT_SECRET` | JWT 토큰용 비밀 키 | - | 예 |
| `JWT_EXPIRATION` | JWT 토큰 만료 시간 | `24h` | 아니오 |
| `ADMIN_EMAIL` | 관리자 이메일 | `admin@example.com` | 아니오 |
| `ADMIN_PASSWORD` | 관리자 비밀번호 | `admin123` | 아니오 |
| `ADMIN_FIRST_NAME` | 관리자 이름 | `Admin` | 아니오 |
| `ADMIN_LAST_NAME` | 관리자 성 | `User` | 아니오 |
| `LOG_LEVEL` | 로깅 레벨 (debug, info, warn, error) | `info` | 아니오 |
| `MAX_FILE_SIZE` | 업로드 최대 파일 크기 (바이트) | `10485760` (10MB) | 아니오 |
| `UPLOADS_DIR` | 파일 업로드 디렉토리 | `./uploads` | 아니오 |
| `CORS_ORIGIN` | CORS 허용 출처 | `*` | 아니오 |
| `CLEANUP_CRON` | 정리 작업 일정 | `0 0 * * *` | 아니오 |
| `SOCKET_CHECK_CRON` | 소켓 상태 확인 일정 | `*/5 * * * *` | 아니오 |
| `AUTH_CHECK_CRON` | 인증 만료 확인 일정 | `0 12 * * *` | 아니오 |
| `USAGE_SAVE_CRON` | 사용량 메트릭 저장 일정 | `*/15 * * * *` | 아니오 |
| `USAGE_LIMITS_CRON` | 사용량 제한 확인 일정 | `0 * * * *` | 아니오 |
| `SYSTEM_METRICS_CRON` | 시스템 메트릭 수집 일정 | `*/5 * * * *` | 아니오 |
