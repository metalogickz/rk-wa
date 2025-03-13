# WhatsApp Multi-Instance API

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue.svg)](https://www.docker.com/)

A powerful and flexible API service that allows you to manage multiple WhatsApp connections within a single application. Designed for businesses and developers who need to integrate WhatsApp messaging capabilities into their systems.

## ✨ Features

- **Multi-Instance Support**: Create and manage multiple WhatsApp instances with a single API
- **Dual Authentication**: Choose between JWT tokens or API keys for authentication
- **Dual Database Support**: Seamlessly switch between MongoDB and SQLite based on your needs
- **Media Handling**: Send and receive text messages, images, videos, documents, and other media
- **Webhook Integration**: Real-time notifications for message delivery, receipt, and connection status
- **Detailed Statistics**: Track usage metrics for each instance
- **Docker Support**: Easy deployment with Docker and Docker Compose
- **Comprehensive Documentation**: Detailed API documentation in multiple languages

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- MongoDB database or SQLite (dual database support)
- For Docker installation: Docker and Docker Compose

### Installation

#### Standard Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/0101001001001011/rk-wa.git
   cd whatsapp-multi-instance-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the example:
   ```bash
   cp .env.example .env
   ```

4. Modify the `.env` file with your configuration:
   ```
   PORT=3000
   NODE_ENV=development
   DATABASE_PROVIDER=mongodb  # or sqlite
   DATABASE_URL="mongodb://username:password@localhost:27017/whatsapp-api?authSource=admin"
   SQLITE_DATABASE_URL="file:./data/whatsapp-api.db"
   JWT_SECRET="your-jwt-secret-key-here"
   JWT_EXPIRATION="24h"
   ```

5. Initialize the database:
   ```bash
   # For both databases
   npm run prisma:generate:all
   node scripts/init-databases.js
   
   # Or for a specific database
   npm run setup:mongodb
   # or
   npm run setup:sqlite
   ```

6. Start the server:
   ```bash
   npm start
   ```

#### Docker Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/0101001001001011/rk-wa.git
   cd whatsapp-multi-instance-api
   ```

2. Customize the `docker-compose.yml` file if needed.

3. Start the container:
   ```bash
   docker-compose up -d
   ```

### Configuration

The API can be configured using environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port number | 3000 |
| NODE_ENV | Environment (development/production) | development |
| DATABASE_PROVIDER | Database type (mongodb/sqlite) | mongodb |
| DATABASE_URL | MongoDB connection string | - |
| SQLITE_DATABASE_URL | SQLite database file path | - |
| JWT_SECRET | Secret key for JWT tokens | - |
| JWT_EXPIRATION | JWT token expiration time | 24h |
| LOG_LEVEL | Logging level (debug, info, warn, error) | info |
| CORS_ORIGIN | CORS allowed origins | * |

## 📚 API Documentation

Full API documentation is available in multiple languages:

- [English](./docs/whatsapp-multi-instance-api-documentation-english.md)
- [Russian](./docs/whatsapp-multi-instance-api-documentation-russian.md)
- [Chinese](./docs/whatsapp-multi-instance-api-documentation-chinese.md)
- [Korean](./docs/whatsapp-multi-instance-api-documentation-korean.md)

### Dual Database Documentation

- [English](./docs/whatsapp-multi-instance-dual-db-english.md)
- [Russian](./docs/whatsapp-multi-instance-dual-db-russian.md)
- [Chinese](./docs/whatsapp-multi-instance-dual-db-chinese.md)
- [Korean](./docs/whatsapp-multi-instance-dual-db-korean.md)

### Authentication

The API supports two authentication methods:

1. **JWT Token Authentication**:
   ```bash
   curl -X POST https://your-api-url.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"user@example.com","password":"strongpassword"}'
   ```

2. **API Key Authentication**:
   ```bash
   curl -X GET https://your-api-url.com/api/instances \
     -H "x-api-key: your-api-key"
   ```

### Basic Usage Examples

#### Creating a WhatsApp Instance

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

#### Sending a Message

```bash
curl -X POST https://your-api-url.com/api/whatsapp/{instanceId}/send \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "79001234567",
    "message": "Hello! This is a test message."
  }'
```

#### Switching Database Provider

```bash
curl -X POST https://your-api-url.com/api/db/switch \
  -H "x-api-key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "sqlite"
  }'
```

## 📱 Client Libraries

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

## 📊 Statistics and Monitoring

The API provides endpoints for gathering usage statistics:

- **User Statistics**: `/api/stats/user`
- **Instance Statistics**: `/api/stats/instances/{instanceId}`
- **System Statistics**: `/api/stats/system` (admin only)

## 🔒 Security Recommendations

1. Always use HTTPS for API communication
2. Store API keys securely and do not include them in client-side code
3. Regularly rotate credentials (passwords and API keys)
4. Configure IP restrictions for API access when possible
5. Monitor activity logs for suspicious activity

## 🔧 Troubleshooting

### Common Issues

1. **Connection Problems**:
   - Ensure your WhatsApp account is not connected elsewhere
   - Delete the authentication files and reconnect if needed

2. **QR Code Scanning Issues**:
   - Make sure your WhatsApp app is up to date
   - Ensure stable internet connectivity when scanning

3. **Rate Limiting and Blocks**:
   - Be mindful of WhatsApp's rate limits and guidelines
   - Implement automatic retry mechanisms with exponential backoff

4. **Database Issues**:
   - For SQLite: Check file permissions and handle "Database is locked" errors
   - For MongoDB: Verify connection string and proper authentication

## 📝 Development Roadmap

We have prepared a detailed roadmap for the future development of the WhatsApp Multi-Instance API. Check it out in your preferred language:

- [English](./docs/roadmap-english.md)
- [Russian](./docs/roadmap-russian.md)
- [Chinese](./docs/roadmap-chinese.md)
- [Korean](./docs/roadmap-korean.md)

We welcome your feedback and contributions to help prioritize our development efforts!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/0101001001001011/rk-wa/issues).

---

Made with ❤️ by RK with assistance from Anthropic