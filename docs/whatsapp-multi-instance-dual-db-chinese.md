# 双数据库支持 (MongoDB 和 SQLite)

WhatsApp 多实例 API 支持两种数据库类型：MongoDB 和 SQLite。这使您能够根据需求和资源选择最佳解决方案。

## 数据库比较

| 功能 | MongoDB | SQLite |
|---------|---------|--------|
| 大数据量性能 | 高 | 中 |
| 资源需求 | 高 | 低 |
| 分布式部署 | 支持 | 不支持 |
| 配置 | 复杂 | 简单 |
| 备份 | 简单（单文件） | 简单（单文件） |
| 服务器负载 | 中等 | 低 |
| 水平扩展 | 支持 | 不支持 |

## 配置

### 1. 环境变量

为支持两种数据库，`.env` 文件中使用以下变量：

```
# 数据库提供者选择：mongodb 或 sqlite
DATABASE_PROVIDER=mongodb

# MongoDB 的 URL
DATABASE_URL="mongodb://username:password@localhost:27017/whatsapp-api?authSource=admin"

# SQLite 的 URL（文件路径）
SQLITE_DATABASE_URL="file:./data/whatsapp-api.db"
```

您可以在项目提供的 `.env` 和 `.env.docker` 文件中看到这些配置的示例。

### 2. 数据库初始化

应用程序启动时会自动初始化数据库。初始化过程由 `DBConnector` 类管理，它执行以下操作：

- 创建数据库目录（针对 SQLite）
- 备份现有数据库文件（针对 SQLite）
- 运行 Prisma 迁移
- 创建初始管理员用户

您也可以通过设置适当的 DATABASE_PROVIDER 环境变量运行应用程序来手动初始化数据库。

## 数据库切换

### 方法 1：通过 API

API 提供了查看和切换当前提供者的端点：

```
GET /api/db/status - 返回当前数据库提供者
POST /api/db/switch - 切换提供者（需要 "provider": "mongodb" 或 "sqlite"）
```

切换到 SQLite 的请求示例：

```bash
curl -X POST http://localhost:3000/api/db/switch \
  -H "Content-Type: application/json" \
  -d '{"provider": "sqlite"}'
```

API 将：
1. 断开与当前数据库的连接
2. 切换到新提供者
3. 初始化与新数据库的连接
4. 更新环境变量以便后续重启

### 方法 2：通过修改 .env 文件

您可以手动更改 `.env` 文件中的 `DATABASE_PROVIDER` 值，然后重启服务器。

## 使用 JSON 数据

由于 SQLite 不支持原生 JSON 存储，应用程序会自动处理 JSON 数据转换：

1. `DBConnector` 类提供了一个 `handleJsonData()` 方法，用于序列化和反序列化 JSON 数据
2. 在 SQLite 中存储 JSON 时，它会被转换为字符串表示
3. 从 SQLite 检索 JSON 时，它会被解析回对象
4. 这在 `instance.service.js` 等服务中透明处理

这会影响几种数据类型：
- Webhook 头部
- 消息元数据
- 活动日志详情

## 使用特性

### MongoDB

- 更适合有大量用户的高负载系统
- 推荐用于有大量数据的生产环境
- 需要安装和配置 MongoDB 服务器
- 支持原生 JSON 数据存储

### SQLite

- 非常适合演示、开发和测试
- 在资源有限的机器上运行良好
- 不需要额外软件 - 整个数据库在单个文件中
- 所有数据本地存储，简化备份
- 在并行查询和大数据量方面有限制

## 备份

### MongoDB

对于 MongoDB 备份，使用标准工具：

```bash
# 创建备份
mongodump --uri="mongodb://username:password@localhost:27017/whatsapp-api" --out=./backup

# 恢复
mongorestore --uri="mongodb://username:password@localhost:27017/whatsapp-api" ./backup
```

### SQLite

对于 SQLite，初始化期间会自动处理备份，创建带时间戳的备份文件。您也可以手动复制数据库文件：

```bash
# 假设数据库文件路径是 ./data/whatsapp-api.db
cp ./data/whatsapp-api.db ./backup/whatsapp-api-$(date +%Y%m%d).db
```

## Docker 支持

该项目包含两种数据库类型的 Docker 支持。使用 Docker 时：

1. 您可以在 docker-compose.yml 文件中指定数据库提供者
2. 容器将自动初始化所选数据库
3. SQLite 数据存储在持久卷中

docker-compose.yml 示例：
```yaml
environment:
  - DATABASE_PROVIDER=sqlite
  - DATABASE_URL=mongodb://whatsapp:whatsapp-password@mongodb:27017/whatsapp-api?authSource=admin
  - SQLITE_DATABASE_URL=file:/usr/src/app/data/whatsapp-api.db
```

## 建议

1. **开发和测试**：SQLite 更好，因为设置简单
2. **低负载生产**：对于小型安装，SQLite 可能足够
3. **高负载生产**：MongoDB 将提供更好的性能
4. **Docker 部署**：SQLite 更容易容器化，因为它不需要单独的数据库服务

## 故障排除

### SQLite 问题

- **"数据库被锁定"错误**：在并发访问时发生。SQLite 只支持一个写入进程。
- **文件权限问题**：确保进程对数据库文件有读/写权限。
- **文件大小**：当数据库文件超过 1GB 时，SQLite 可能会变慢。定期归档旧数据。

### MongoDB 问题

- **连接错误**：检查 MongoDB 服务器是否在指定 URL 上运行和可访问。
- **身份验证**：确保 DATABASE_URL 中的凭据正确。
- **索引错误**：为大数据量创建索引以提高性能。

## 监控

API 的 `/health` 端点包括当前数据库提供者和连接状态的信息。

示例响应：
```json
{
  "status": "ok",
  "timestamp": "2023-01-01T12:00:00.000Z",
  "dbProvider": "sqlite"
}
```