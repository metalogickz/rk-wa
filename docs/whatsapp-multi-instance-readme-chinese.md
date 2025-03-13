# WhatsApp 多实例 API

[![许可证: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js 版本](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-支持-blue.svg)](https://www.docker.com/)

这是一个强大而灵活的 API 服务，允许您在单个应用程序中管理多个 WhatsApp 连接。专为需要将 WhatsApp 消息功能集成到系统中的企业和开发人员设计。

## ✨ 特点

- **多实例支持**：通过单一 API 创建和管理多个 WhatsApp 实例
- **双重认证**：选择 JWT 令牌或 API 密钥进行认证
- **双数据库支持**：根据需求在 MongoDB 和 SQLite 之间无缝切换
- **媒体处理**：发送和接收文本消息、图片、视频、文档和其他媒体
- **Webhook 集成**：消息传递、接收和连接状态的实时通知
- **详细统计**：跟踪每个实例的使用指标
- **Docker 支持**：通过 Docker 和 Docker Compose 轻松部署
- **全面文档**：多语言详细 API 文档

## 🚀 快速开始

### 前提条件

- Node.js 20.x 或更高版本
- MongoDB 数据库或 SQLite（双数据库支持）
- Docker 安装：Docker 和 Docker Compose

### 安装

#### 标准安装

1. 克隆仓库：
   ```bash
   git clone https://github.com/0101001001001011/rk-wa.git
   cd whatsapp-multi-instance-api
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 基于示例创建 `.env` 文件：
   ```bash
   cp .env.example .env
   ```

4. 修改 `.env` 文件配置：
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
   # 对于两种数据库
   npm run prisma:generate:all
   node scripts/init-databases.js
   
   # 或者对于特定数据库
   npm run setup:mongodb
   # 或
   npm run setup:sqlite
   ```

6. 启动服务器：
   ```bash
   npm start
   ```

#### Docker 安装

1. 克隆仓库：
   ```bash
   git clone https://github.com/0101001001001011/rk-wa.git
   cd whatsapp-multi-instance-api
   ```

2. 如有需要，自定义 `docker-compose.yml` 文件。

3. 启动容器：
   ```bash
   docker-compose up -d
   ```

### 配置

API 可以通过环境变量进行配置：

| 变量 | 描述 | 默认值 |
|----------|-------------|---------|
| PORT | 服务器端口号 | 3000 |
| NODE_ENV | 环境 (development/production) | development |
| DATABASE_PROVIDER | 数据库类型 (mongodb/sqlite) | mongodb |
| DATABASE_URL | MongoDB 连接字符串 | - |
| SQLITE_DATABASE_URL | SQLite 数据库文件路径 | - |
| JWT_SECRET | JWT 令牌的密钥 | - |
| JWT_EXPIRATION | JWT 令牌过期时间 | 24h |
| LOG_LEVEL | 日志级别 (debug, info, warn, error) | info |
| CORS_ORIGIN | CORS 允许的来源 | * |

## 📚 API 文档

完整的 API 文档提供多种语言版本：

- [英文](./docs/whatsapp-multi-instance-api-documentation-english.md)
- [俄文](./docs/whatsapp-multi-instance-api-documentation-russian.md)
- [中文](./docs/whatsapp-multi-instance-api-documentation-chinese.md)
- [韩文](./docs/whatsapp-multi-instance-api-documentation-korean.md)

### 双数据库支持文档

- [英文](./docs/whatsapp-multi-instance-dual-db-english.md)
- [俄文](./docs/whatsapp-multi-instance-dual-db-russian.md)
- [中文](./docs/whatsapp-multi-instance-dual-db-chinese.md)
- [韩文](./docs/whatsapp-multi-instance-dual-db-korean.md)

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
    "name": "主要 WhatsApp",
    "description": "公司账户",
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
    "message": "你好！这是一条测试消息。"
  }'
```

#### 切换数据库提供程序

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

API 提供了收集使用统计数据的端点：

- **用户统计**：`/api/stats/user`
- **实例统计**：`/api/stats/instances/{instanceId}`
- **系统统计**：`/api/stats/system`（仅管理员）

## 🔒 安全建议

1. 始终使用 HTTPS 进行 API 通信
2. 将 API 密钥安全存储，不要包含在客户端代码中
3. 定期更换凭证（密码和 API 密钥）
4. 可能的话，配置 API 访问的 IP 限制
5. 监控活动日志以检测可疑活动

## 🔧 故障排除

### 常见问题

1. **连接问题**：
   - 确保您的 WhatsApp 账户没有在其他地方连接
   - 如有需要，删除认证文件并重新连接

2. **二维码扫描问题**：
   - 确保您的 WhatsApp 应用是最新版本
   - 扫描时确保稳定的互联网连接

3. **速率限制和阻止**：
   - 注意 WhatsApp 的速率限制和准则
   - 实现带有指数退避的自动重试机制

4. **数据库问题**：
   - SQLite：检查文件权限并处理"Database is locked"错误
   - MongoDB：验证连接字符串和正确的认证

## 🤝 贡献

## 📝 开发路线图

我们为 WhatsApp Multi-Instance API 的未来发展准备了详细的路线图。请查看您喜欢的语言版本：

- [英文](./docs/roadmap-english.md)
- [俄文](./docs/roadmap-russian.md)
- [中文](./docs/roadmap-chinese.md)
- [韩文](./docs/roadmap-korean.md)

我们欢迎您的反馈和贡献，以帮助确定我们的开发优先级！

欢迎贡献！请随时提交拉取请求。

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开拉取请求

## 📄 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

## 📞 支持

如果您遇到任何问题或有疑问，请[提出议题](https://github.com/0101001001001011/rk-wa/issues)。

---

由 RK 在 Anthropic 的帮助下用 ❤️ 制作