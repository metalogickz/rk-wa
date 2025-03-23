# WhatsApp Multi-Instance API Docker 部署指南

本指南提供了使用 Docker 部署 WhatsApp Multi-Instance API 服务的详细说明。该应用程序支持 MongoDB 和 SQLite 作为数据库提供者。

## 目录

- [前提条件](#前提条件)
- [项目概述](#项目概述)
- [快速入门](#快速入门)
- [详细配置](#详细配置)
  - [环境变量](#环境变量)
  - [数据库配置](#数据库配置)
  - [身份验证](#身份验证)
  - [Webhook 设置](#webhook-设置)
  - [定时任务](#定时任务)
- [Docker 部署选项](#docker-部署选项)
  - [使用 Docker Compose](#使用-docker-compose)
  - [使用 Docker CLI](#使用-docker-cli)
- [卷管理](#卷管理)
- [健康检查](#健康检查)
- [日志记录](#日志记录)
- [扩展](#扩展)
- [备份和恢复](#备份和恢复)
- [升级](#升级)
- [故障排除](#故障排除)
- [安全注意事项](#安全注意事项)
- [API 文档](#api-文档)

## 前提条件

- Docker Engine 20.10.0 或更高版本
- Docker Compose 2.0.0 或更高版本 (如果使用 docker-compose)
- 至少 2GB 可用 RAM
- 1GB 可用磁盘空间 (推荐更多用于消息历史)
- 互联网连接 (WhatsApp 连接需要)

## 项目概述

WhatsApp Multi-Instance API 服务允许您:

- 管理多个 WhatsApp 实例
- 发送和接收消息
- 管理联系人
- 发送媒体文件
- 设置 webhook 用于实时通知
- 跟踪使用统计数据

该服务支持两种数据库提供者:
- **MongoDB**: 推荐用于生产部署
- **SQLite**: 适用于开发或小型部署

## 快速入门

使用 Docker Compose 快速启动服务:

1. 为项目创建一个新目录:
   ```bash
   mkdir whatsapp-api && cd whatsapp-api
   ```

2. 创建一个包含以下内容的 `docker-compose.yml` 文件:
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
       image: your-registry/whatsapp-api:latest  # 替换为您的镜像
       # 或者使用 build 从 Dockerfile 构建
       # build: .
       ports:
         - "3000:3000"
       environment:
         - PORT=3000
         - NODE_ENV=production
         - DATABASE_PROVIDER=sqlite  # 或 mongodb
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

3. 运行服务:
   ```bash
   docker-compose up -d
   ```

4. 访问 API: `http://localhost:3000`

5. 默认管理员凭据:
   - 邮箱: admin@example.com
   - 密码: admin123

## 详细配置

### 环境变量

| 变量 | 描述 | 默认值 | 必填 |
|----------|-------------|---------|----------|
| `PORT` | 服务器端口 | `3000` | 否 |
| `NODE_ENV` | 环境 (production, development) | `development` | 否 |
| `DATABASE_PROVIDER` | 数据库提供者 (mongodb, sqlite) | `mongodb` | 否 |
| `DATABASE_URL` | MongoDB 连接字符串 | - | 是 (使用 MongoDB 时) |
| `SQLITE_DATABASE_URL` | SQLite 数据库路径 | `file:./data/whatsapp-api.db` | 否 |
| `JWT_SECRET` | JWT 令牌的密钥 | - | 是 |
| `JWT_EXPIRATION` | JWT 令牌过期时间 | `24h` | 否 |
| `ADMIN_EMAIL` | 管理员邮箱 | `admin@example.com` | 否 |
| `ADMIN_PASSWORD` | 管理员密码 | `admin123` | 否 |
| `ADMIN_FIRST_NAME` | 管理员名字 | `Admin` | 否 |
| `ADMIN_LAST_NAME` | 管理员姓氏 | `User` | 否 |
| `LOG_LEVEL` | 日志级别 (debug, info, warn, error) | `info` | 否 |
| `MAX_FILE_SIZE` | 上传文件最大尺寸 (字节) | `10485760` (10MB) | 否 |
| `UPLOADS_DIR` | 文件上传目录 | `./uploads` | 否 |
| `CORS_ORIGIN` | CORS 允许的来源 | `*` | 否 |

### 数据库配置

#### MongoDB 配置

要使用 MongoDB 作为数据库提供者:

```yaml
environment:
  - DATABASE_PROVIDER=mongodb
  - DATABASE_URL=mongodb://username:password@hostname:port/database?authSource=admin
```

对于副本集或集群:

```yaml
environment:
  - DATABASE_PROVIDER=mongodb
  - DATABASE_URL=mongodb://username:password@host1:port,host2:port,host3:port/database?replicaSet=myReplicaSet&authSource=admin
```

#### SQLite 配置

要使用 SQLite 作为数据库提供者:

```yaml
environment:
  - DATABASE_PROVIDER=sqlite
  - SQLITE_DATABASE_URL=file:/usr/src/app/data/whatsapp-api.db
```

### 身份验证

该服务使用 JWT (JSON Web Tokens) 进行身份验证。配置以下变量:

```yaml
environment:
  - JWT_SECRET=your-strong-secret-key-here
  - JWT_EXPIRATION=24h  # 格式: Xh (小时), Xm (分钟), Xd (天)
```

对于管理员用户:

```yaml
environment:
  - ADMIN_EMAIL=admin@example.com
  - ADMIN_PASSWORD=secure-password
  - ADMIN_FIRST_NAME=Admin
  - ADMIN_LAST_NAME=User
```

### Webhook 设置

可以通过 API 为每个 WhatsApp 实例配置 webhook。全局设置包括:

```yaml
environment:
  - WEBHOOK_RETRY_INTERVAL=60000  # 重试间隔 (毫秒)
  - WEBHOOK_MAX_RETRIES=3         # 最大重试次数
```

### 定时任务

该服务使用几个定时任务进行维护:

```yaml
environment:
  - CLEANUP_CRON=0 0 * * *          # 每天午夜运行
  - SOCKET_CHECK_CRON=*/5 * * * *   # 每 5 分钟运行
  - AUTH_CHECK_CRON=0 12 * * *      # 每天中午运行
  - USAGE_SAVE_CRON=*/15 * * * *    # 每 15 分钟运行
  - USAGE_LIMITS_CRON=0 * * * *     # 每小时运行
  - SYSTEM_METRICS_CRON=*/5 * * * * # 每 5 分钟运行
```

## Docker 部署选项

### 使用 Docker Compose

部署服务的推荐方式是使用 Docker Compose:

1. 保存带有您的配置的 `docker-compose.yml` 文件
2. 运行:
   ```bash
   docker-compose up -d
   ```
3. 查看日志:
   ```bash
   docker-compose logs -f whatsapp-api
   ```
4. 停止服务:
   ```bash
   docker-compose down
   ```

### 使用 Docker CLI

您也可以使用 Docker CLI 运行服务:

```bash
# 创建网络
docker network create whatsapp-network

# 运行 MongoDB
docker run -d \
  --name mongodb \
  --network whatsapp-network \
  -e MONGO_INITDB_ROOT_USERNAME=whatsapp \
  -e MONGO_INITDB_ROOT_PASSWORD=whatsapp-password \
  -v mongodb_data:/data/db \
  mongo:latest

# 运行 WhatsApp API
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

## 卷管理

该服务使用几个 Docker 卷进行持久数据存储:

| 卷 | 用途 | 注意 |
|--------|---------|-------|
| `mongodb_data` | MongoDB 数据库文件 | 仅在使用 MongoDB 时需要 |
| `whatsapp_instances` | WhatsApp 会话数据 | 包含每个实例的认证文件 |
| `whatsapp_uploads` | 媒体文件上传 | 用于发送媒体文件 |
| `whatsapp_logs` | 应用程序日志 | 有助于故障排除 |
| `whatsapp_data` | SQLite 数据库文件 | 仅在使用 SQLite 时需要 |

要使用 Docker CLI 的命名卷:

```bash
docker volume create whatsapp_instances
docker volume create whatsapp_uploads
docker volume create whatsapp_logs
docker volume create whatsapp_data
```

### 卷备份

备份卷:

```bash
# MongoDB 数据
docker run --rm -v mongodb_data:/data -v $(pwd):/backup alpine tar -czf /backup/mongodb_backup.tar.gz /data

# WhatsApp 实例
docker run --rm -v whatsapp_instances:/data -v $(pwd):/backup alpine tar -czf /backup/instances_backup.tar.gz /data

# SQLite 数据
docker run --rm -v whatsapp_data:/data -v $(pwd):/backup alpine tar -czf /backup/sqlite_backup.tar.gz /data
```

### 卷恢复

恢复卷:

```bash
# MongoDB 数据
docker run --rm -v mongodb_data:/data -v $(pwd):/backup alpine sh -c "rm -rf /data/* && tar -xzf /backup/mongodb_backup.tar.gz -C /"

# WhatsApp 实例
docker run --rm -v whatsapp_instances:/data -v $(pwd):/backup alpine sh -c "rm -rf /data/* && tar -xzf /backup/instances_backup.tar.gz -C /"

# SQLite 数据
docker run --rm -v whatsapp_data:/data -v $(pwd):/backup alpine sh -c "rm -rf /data/* && tar -xzf /backup/sqlite_backup.tar.gz -C /"
```

## 健康检查

该服务在 `/health` 提供健康检查端点。您可以配置 Docker 健康检查:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## 日志记录

该服务将日志输出到 stdout/stderr 和 `/usr/src/app/logs` 目录中的文件:

- `combined.log` - 所有日志
- `error.log` - 仅错误日志

查看 Docker 中的日志:

```bash
docker logs -f whatsapp-api
```

自定义日志:

```yaml
environment:
  - LOG_LEVEL=debug  # 选项: debug, info, warn, error
```

## 扩展

该服务可以水平扩展。每个实例应该有自己的数据卷:

```yaml
services:
  whatsapp-api-1:
    image: your-registry/whatsapp-api:latest
    volumes:
      - whatsapp_instances_1:/usr/src/app/instances
      - whatsapp_data_1:/usr/src/app/data
    # 其他设置...

  whatsapp-api-2:
    image: your-registry/whatsapp-api:latest
    volumes:
      - whatsapp_instances_2:/usr/src/app/instances
      - whatsapp_data_2:/usr/src/app/data
    # 其他设置...
```

请注意，每个 WhatsApp 实例应该只由一个服务实例管理，以避免冲突。

## 备份和恢复

### 数据库备份

#### MongoDB 备份

```bash
docker exec -it mongodb mongodump --username whatsapp --password whatsapp-password --authenticationDatabase admin --db whatsapp-api --out /dump
docker cp mongodb:/dump ./backup
```

#### SQLite 备份

```bash
docker exec -it whatsapp-api sh -c "sqlite3 /usr/src/app/data/whatsapp-api.db .dump > /usr/src/app/data/backup.sql"
docker cp whatsapp-api:/usr/src/app/data/backup.sql ./backup.sql
```

### 数据库恢复

#### MongoDB 恢复

```bash
docker cp ./backup mongodb:/dump
docker exec -it mongodb mongorestore --username whatsapp --password whatsapp-password --authenticationDatabase admin /dump
```

#### SQLite 恢复

```bash
docker cp ./backup.sql whatsapp-api:/usr/src/app/data/
docker exec -it whatsapp-api sh -c "cat /usr/src/app/data/backup.sql | sqlite3 /usr/src/app/data/whatsapp-api.db"
```

## 升级

要升级服务:

1. 拉取最新镜像:
   ```bash
   docker-compose pull whatsapp-api
   ```

2. 重启服务:
   ```bash
   docker-compose up -d whatsapp-api
   ```

对于主要升级，请考虑先备份您的数据。

## 故障排除

### 容器无法启动

检查日志:
```bash
docker logs whatsapp-api
```

常见问题:
- 数据库连接问题
- 卷权限问题
- 环境变量配置错误

### 数据库连接问题

对于 MongoDB:
- 验证 MongoDB 容器是否运行: `docker ps`
- 检查 `DATABASE_URL` 中的连接字符串
- 确保凭据正确

对于 SQLite:
- 检查数据目录是否有适当的权限
- 验证 `SQLITE_DATABASE_URL` 是否正确

### WhatsApp 连接问题

- 确保容器有互联网访问权限
- 检查 WhatsApp 实例日志: `/usr/src/app/logs/combined.log`
- 尝试通过 API 重新连接实例

### 二维码不显示

- 通过 API 重启实例
- 检查日志中的错误消息
- 确保浏览器可以访问 API 端点

## 安全注意事项

### 管理员密码

首次登录后立即更改默认管理员密码:

```yaml
environment:
  - ADMIN_EMAIL=admin@example.com
  - ADMIN_PASSWORD=strong-unique-password
```

### JWT Secret

使用强大、唯一的 JWT 密钥:

```yaml
environment:
  - JWT_SECRET=your-very-long-and-secure-random-string
```

### MongoDB 认证

始终为 MongoDB 使用认证:

```yaml
environment:
  - DATABASE_URL=mongodb://username:password@hostname:port/database?authSource=admin
```

### 网络安全

- 使用带有 HTTPS 的反向代理 (如 Nginx 或 Traefik)
- 使用网络规则限制对 API 的访问
- 为生产环境使用 CORS 限制:
  ```yaml
  environment:
    - CORS_ORIGIN=https://your-domain.com
  ```

## API 文档

API 端点可在以下位置使用:

- 认证: `/api/auth/login`
- 实例管理: `/api/instances`
- WhatsApp 功能: `/api/whatsapp/:instanceId/...`
- 简化的 WhatsApp API: `/api/whatsapp-simple/:instanceId/...`
- 统计信息: `/api/stats/...`

有关详细的 API 文档，请参阅 API 文档或在 `/ui/instances` 探索界面。

## 构建自定义 Docker 镜像

如果您需要构建自定义版本的镜像:

1. 克隆仓库:
   ```bash
   git clone https://github.com/your-organization/whatsapp-api.git
   cd whatsapp-api
   ```

2. 根据需要修改代码

3. 构建 Docker 镜像:
   ```bash
   docker build -t your-registry/whatsapp-api:custom .
   ```

4. 更新您的 `docker-compose.yml` 以使用自定义镜像:
   ```yaml
   services:
     whatsapp-api:
       image: your-registry/whatsapp-api:custom
       # 其他设置...
   ```

## 环境变量参考表

| 变量 | 描述 | 默认值 | 必填 |
|----------|-------------|---------|----------|
| `PORT` | 服务器端口 | `3000` | 否 |
| `NODE_ENV` | 环境 (production, development) | `development` | 否 |
| `DATABASE_PROVIDER` | 数据库提供者 (mongodb, sqlite) | `mongodb` | 否 |
| `DATABASE_URL` | MongoDB 连接字符串 | - | 是 (使用 MongoDB 时) |
| `SQLITE_DATABASE_URL` | SQLite 数据库路径 | `file:./data/whatsapp-api.db` | 否 |
| `JWT_SECRET` | JWT 令牌的密钥 | - | 是 |
| `JWT_EXPIRATION` | JWT 令牌过期时间 | `24h` | 否 |
| `ADMIN_EMAIL` | 管理员邮箱 | `admin@example.com` | 否 |
| `ADMIN_PASSWORD` | 管理员密码 | `admin123` | 否 |
| `ADMIN_FIRST_NAME` | 管理员名字 | `Admin` | 否 |
| `ADMIN_LAST_NAME` | 管理员姓氏 | `User` | 否 |
| `LOG_LEVEL` | 日志级别 (debug, info, warn, error) | `info` | 否 |
| `MAX_FILE_SIZE` | 上传文件最大尺寸 (字节) | `10485760` (10MB) | 否 |
| `UPLOADS_DIR` | 文件上传目录 | `./uploads` | 否 |
| `CORS_ORIGIN` | CORS 允许的来源 | `*` | 否 |
| `CLEANUP_CRON` | 清理任务计划 | `0 0 * * *` | 否 |
| `SOCKET_CHECK_CRON` | 套接字健康检查计划 | `*/5 * * * *` | 否 |
| `AUTH_CHECK_CRON` | 认证过期检查计划 | `0 12 * * *` | 否 |
| `USAGE_SAVE_CRON` | 保存使用指标计划 | `*/15 * * * *` | 否 |
| `USAGE_LIMITS_CRON` | 检查使用限制计划 | `0 * * * *` | 否 |
| `SYSTEM_METRICS_CRON` | 收集系统指标计划 | `*/5 * * * *` | 否 |
