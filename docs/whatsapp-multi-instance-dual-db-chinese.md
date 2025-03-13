# 双数据库支持 (MongoDB 和 SQLite)

WhatsApp 多实例 API 现在支持两种数据库：MongoDB 和 SQLite。这使您能够根据自己的需求和资源选择最优解决方案。

## 数据库对比

| 功能 | MongoDB | SQLite |
|---------|---------|--------|
| 大数据量性能 | 高 | 中等 |
| 资源需求 | 高 | 低 |
| 分布式部署 | 支持 | 不支持 |
| 配置 | 复杂 | 简单 |
| 备份 | 复杂 | 简单（单文件） |
| 服务器负载 | 中等 | 低 |
| 水平扩展 | 支持 | 不支持 |

## 配置

### 1. 环境变量

要支持两种数据库，请在 `.env` 文件中添加以下变量：

```
# 数据库提供者选择：mongodb 或 sqlite
DATABASE_PROVIDER=mongodb

# MongoDB URL
DATABASE_URL="mongodb://username:password@localhost:27017/whatsapp-api?authSource=admin"

# SQLite URL（文件路径）
SQLITE_DATABASE_URL="file:./data/whatsapp-api.db"
```

### 2. 数据库初始化

要初始化两个数据库，请运行以下命令：

```bash
# 为两种数据库类型生成 Prisma 客户端
npm run prisma:generate:all

# 初始化数据库并创建管理员用户
node scripts/init-databases.js
```

`init-databases.js` 脚本将在两个数据库中创建必要的表/集合，并创建初始管理员用户。

## 在数据库间切换

### 方法 1：通过 API

API 提供了查看和切换当前提供者的端点：

```
GET /api/db/status - 返回当前数据库提供者
POST /api/db/switch - 切换提供者（需要参数 "provider": "mongodb" 或 "sqlite"）
```

切换到 SQLite 的请求示例：

```bash
curl -X POST http://localhost:3000/api/db/switch \
  -H "Content-Type: application/json" \
  -d '{"provider": "sqlite"}'
```

### 方法 2：修改 .env 文件

您可以手动更改 `.env` 文件中的 `DATABASE_PROVIDER` 值，然后重启服务器。

### 方法 3：命令行工具

系统提供了一个专用工具便于切换：

```bash
node scripts/switch-database.js
```

该工具将以交互方式引导您完成数据库切换过程。

## 在数据库间迁移数据

如果您已经在一个数据库中有数据，并想将其转移到另一个数据库，可以使用迁移脚本：

```bash
node scripts/migrate-database.js
```

该脚本提供了一个交互式界面，使您能够：
1. 选择迁移方向（MongoDB → SQLite 或 SQLite → MongoDB）
2. 选择要迁移的数据类型（用户、实例、消息等）
3. 为大型数据集设置限制（消息、活动日志）

## 使用特点

### MongoDB

- 更适合有大量用户的高负载系统
- 推荐用于大数据量的生产环境
- 需要安装和配置 MongoDB 服务器
- 支持原生 JSON 数据存储

### SQLite

- 非常适合演示、开发和测试
- 在资源有限的机器上表现良好
- 不需要额外软件 – 整个数据库在单个文件中
- 所有数据本地存储，简化备份
- 对并行查询和较大数据量有限制

## 处理 JSON 数据

由于 SQLite 不支持原生 JSON 存储：

1. 在写入/读取时，JSON 数据会自动序列化/反序列化
2. 如果使用 JSON 内部字段，某些 SQLite 过滤操作可能会较慢
3. SQLite 中嵌套事务数量有限制

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

对于 SQLite，备份只需复制数据库文件：

```bash
# 假设数据库文件路径为 ./data/whatsapp-api.db
cp ./data/whatsapp-api.db ./backup/whatsapp-api-$(date +%Y%m%d).db
```

## 建议

1. **开发和测试**：由于设置简单，SQLite 更合适
2. **低负载生产**：对于小型安装，SQLite 可能足够
3. **高负载生产**：MongoDB 会提供更好的性能
4. **Docker 部署**：SQLite 更容易容器化，因为不需要单独的数据库服务

## 故障排除

### SQLite 问题

- **"Database is locked" 错误**：并发访问时发生。SQLite 只支持一个写入进程。
- **文件权限问题**：确保进程对数据库文件有读/写权限。
- **文件大小**：当数据库文件超过 1GB 时，SQLite 可能会变慢。定期归档旧数据。

### MongoDB 问题

- **连接错误**：检查 MongoDB 服务器是否正在运行并可在指定 URL 访问。
- **认证**：确保 DATABASE_URL 中的凭据正确。
- **索引错误**：为大数据量创建索引以提高性能。

## 监控

对于数据库运行监控：

- **MongoDB**：使用 MongoDB Compass 或 MongoDB Atlas 进行监控
- **SQLite**：使用 SQLite Browser 查看和编辑数据

API 的 `/health` 端点包含当前数据库提供者的信息