# WhatsApp 多实例 API

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue.svg)](https://www.docker.com/)
[![WhatsApp Library](https://img.shields.io/badge/WhatsApp-Baileys-green.svg)](https://github.com/WhiskeySockets/Baileys)

一个功能强大且灵活的 API 服务，可让您在单个应用程序中管理多个 WhatsApp 连接。基于强大的 [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys) 库构建，专为需要将 WhatsApp 消息传递功能集成到其系统中的企业和开发人员设计。

## ✨ 功能

- **多实例支持**：通过单个 API 创建和管理多个 WhatsApp 实例
- **双重认证**：可选择 JWT 令牌或 API 密钥进行认证
- **双数据库支持**：根据需求在 MongoDB 和 SQLite 之间无缝切换
- **媒体处理**：发送和接收文本消息、图像、视频、文档和其他媒体
- **Webhook 集成**：消息传递、接收和连接状态的实时通知
- **详细统计**：跟踪每个实例的使用指标
- **Docker 支持**：通过 Docker 和 Docker Compose 轻松部署
- **全面文档**：多语言详细 API 文档
- **连接监控**：自动重连和套接字健康检查
- **联系人管理**：在数据库中存储和管理 WhatsApp 联系人

## 🚀 快速开始

### 前提条件

- Node.js 20.x 或更高版本
- MongoDB 数据库或 SQLite（双数据库支持）
- 对于 Docker 安装：Docker 和 Docker Compose

### 安装

#### 标准安装

1. 克隆存储库：
   ```bash
   git clone https://github.com/0101001001001011/rk-wa.git
   cd whatsapp-multi-instance-api
   ```

2. 安装依赖项：
   ```bash
   npm install
   ```

3. 基于示例创建 `.env` 文件：
   ```bash
   cp .env.example .env
   ```

4. 根据您的配置修改 `.env` 文件：
   ```
   PORT=3000
   NODE_ENV=development
   DATABASE_PROVIDER=mongodb  # 或 sqlite
   DATABASE_URL="mongodb://username:password@localhost:27017/whatsapp-api?authSource=admin"
   SQLITE_DATABASE_URL="file:./data/whatsapp-api.db"
   JWT_SECRET="your-jwt-secret-key-here"
   JWT_EXPIRATION="24h"
   ```

5. 初始化数据库：
   ```bash
   # 针对两种数据库
   npm run prisma:generate:all
   node scripts/init-databases.js
   
   # 或针对特定数据库
   npm run setup:mongodb
   # 或
   npm run setup:sqlite
   ```

6. 启动服务器：
   ```bash
   npm start
   ```

#### Docker 安装

1. 克隆存储库：
   ```bash
   git clone https://github.com/0101001001001011/rk-wa.git
   cd whatsapp-multi-instance-api
   ```

2. 根据需要自定义 `docker-compose.yml` 文件。

3. 启动容器：
   ```bash
   docker-compose up -d
   ```

### 配置

可以使用环境变量配置 API：

| 变量 | 描述 | 默认值 |
|----------|-------------|---------|
| PORT | 服务器端口号 | 3000 |
| NODE_ENV | 环境（development/production） | development |
| DATABASE_PROVIDER | 数据库类型（mongodb/sqlite） | mongodb |
| DATABASE_URL | MongoDB 连接字符串 | - |
| SQLITE_DATABASE_URL | SQLite 数据库文件路径 | - |
| JWT_SECRET | JWT 令牌的密钥 | - |
| JWT_EXPIRATION | JWT 令牌过期时间 | 24h |
| LOG_LEVEL | 日志级别（debug, info, warn, error） | info |
| CORS_ORIGIN | CORS 允许的来源 | * |
| SOCKET_CHECK_CRON | 套接字健康检查计划 | */5 * * * * |
| AUTH_CHECK_CRON | 身份验证过期检查计划 | 0 12 * * * |
| USAGE_SAVE_CRON | 保存使用指标计划 | */15 * * * * |
| USAGE_LIMITS_CRON | 检查使用限制计划 | 0 * * * * |
| SYSTEM_METRICS_CRON | 收集系统指标计划 | */5 * * * * |

## 📚 API 文档

完整的 API 文档有多种语言版本：

- [English](./docs/whatsapp-multi-instance-api-documentation-english.md)
- [Russian](./docs/whatsapp-multi-instance-api-documentation-russian.md)
- [Chinese](./docs/whatsapp-multi-instance-api-documentation-chinese.md)
- [Korean](./docs/whatsapp-multi-instance-api-documentation-korean.md)

### 双数据库文档

- [English](./docs/whatsapp-multi-instance-dual-db-english.md)
- [Russian](./docs/whatsapp-multi-instance-dual-db-russian.md)
- [Chinese](./docs/whatsapp-multi-instance-dual-db-chinese.md)
- [Korean](./docs/whatsapp-multi-instance-dual-db-korean.md)

### UI 文档

- [英文](./docs/whatsapp-api-ui-documentation-english.md)
- [俄文](./docs/whatsapp-api-ui-documentation-russian.md)
- [中文](./docs/whatsapp-api-ui-documentation-chinese.md)
- [韩文](./docs/whatsapp-api-ui-documentation-korean.md)

### 认证

API 支持两种认证方法：

1. **JWT 令牌认证**：
   ```bash
   curl -X POST https://your-api-url.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com","password":"strongpassword"}'
   ```

2. **API 密钥认证**：
   ```bash
   curl -X GET https://your-api-url.com/api/instances \
     -H "x-api-key: your-api-key"
   ```

### 基本使用示例

#### 创建 WhatsApp 实例

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

#### 发送消息

```bash
curl -X POST https://your-api-url.com/api/whatsapp/{instanceId}/send \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "79001234567",
    "message": "Hello! This is a test message."
  }'
```

#### 切换数据库提供者

```bash
curl -X POST https://your-api-url.com/api/db/switch \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "sqlite"
  }'
```

## 📱 客户端库

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

## 📊 统计和监控

API 提供了收集使用统计的端点：

- **用户统计**：`/api/stats/user`
- **实例统计**：`/api/stats/instances/{instanceId}`
- **系统统计**：`/api/stats/system`（仅管理员）

## 🤖 简化和完整 WhatsApp 服务

项目包括两种不同的 WhatsApp 服务实现：

1. **完整 WhatsApp 管理器服务**（`whatsapp-manager.service.js`）：这是主要实现，具有全面的功能，包括媒体处理、webhook 支持和详细事件跟踪。

2. **简化 WhatsApp 服务**（`simplified-whatsapp.service.js`）：轻量级实现，专注于核心消息传递功能，非常适合更简单的用例或测试。

您可以根据需求使用相应的 API 端点选择适当的实现。

## 🔒 安全建议

1. 始终使用 HTTPS 进行 API 通信
2. 安全存储 API 密钥，不要将其包含在客户端代码中
3. 定期轮换凭据（密码和 API 密钥）
4. 可能时为 API 访问配置 IP 限制
5. 监控活动日志以发现可疑活动
6. 设置适当的 webhook 重试限制并监控 webhook 传递
7. 为 API 端点实施速率限制以防止滥用

## 🔧 故障排除

### 常见问题

1. **连接问题**：
   - 确保您的 WhatsApp 账户没有在其他地方连接
   - 如有需要，删除认证文件并重新连接
   - 使用套接字检查端点检查套接字健康状况

2. **QR 码扫描问题**：
   - 确保您的 WhatsApp 应用程序是最新版本
   - 确保扫描时网络连接稳定
   - 如果 QR 码未显示，尝试通过 API 重新连接实例

3. **速率限制和阻止**：
   - 注意 WhatsApp 的速率限制和指南
   - 实施带有指数退避的自动重试机制
   - 使用使用量监控功能及早检测潜在问题

4. **数据库问题**：
   - 对于 SQLite：检查文件权限并处理"数据库已锁定"错误
   - 对于 MongoDB：验证连接字符串和正确的认证
   - 如果遇到持续问题，请使用数据库切换功能

## 📝 开发路线图

我们已经为 WhatsApp 多实例 API 的未来开发准备了详细的路线图。请查看您首选语言的版本：

- [English](./docs/roadmap-english.md)
- [Russian](./docs/roadmap-russian.md)
- [Chinese](./docs/roadmap-chinese.md)
- [Korean](./docs/roadmap-korean.md)

我们欢迎您的反馈和贡献，以帮助确定我们的开发优先事项！

## 🤝 贡献

欢迎贡献！请随时提交拉取请求。

1. Fork 此存储库
2. 创建您的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启拉取请求

## 📄 许可证

本项目根据 MIT 许可证授权 - 有关详细信息，请参阅 [LICENSE](LICENSE) 文件。

## 📞 支持

如果您遇到任何问题或有疑问，请[开启 issue](https://github.com/0101001001001011/rk-wa/issues)。

## 🙏 致谢

没有以下几个开源项目的令人难以置信的工作，这个项目将不可能实现：

- [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys) - 提供 WhatsApp Web API 功能的强大库
- [Prisma](https://www.prisma.io/) - 为 Node.js 和 TypeScript 提供的下一代 ORM
- [Express](https://expressjs.com/) - 为 Node.js 提供的快速、简洁、灵活的 Web 框架
- [MongoDB](https://www.mongodb.com/) - 现代应用的数据库
- [SQLite](https://www.sqlite.org/) - 世界上使用最广泛的数据库引擎

特别感谢所有为这些项目贡献时间和专业知识的开发人员，使我们的工作成为可能。

---

由 RK 团队在 Anthropic 的 Claude AI 协助下用 ❤️ 制作