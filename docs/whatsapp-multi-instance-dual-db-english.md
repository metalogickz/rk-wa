# Dual Database Support (MongoDB and SQLite)

WhatsApp Multi-Instance API supports two database types: MongoDB and SQLite. This allows you to choose the optimal solution based on your needs and resources.

## Database Comparison

| Feature | MongoDB | SQLite |
|---------|---------|--------|
| Performance with large data volumes | High | Medium |
| Resource requirements | High | Low |
| Distributed deployment | Yes | No |
| Configuration | Complex | Simple |
| Backup | Simple (single file) | Simple (single file) |
| Server load | Medium | Low |
| Horizontal scaling | Yes | No |

## Configuration

### 1. Environment Variables

To support both databases, the following variables are used in `.env` file:

```
# Database provider selection: mongodb or sqlite
DATABASE_PROVIDER=mongodb

# URL for MongoDB
DATABASE_URL="mongodb://username:password@localhost:27017/whatsapp-api?authSource=admin"

# URL for SQLite (file path)
SQLITE_DATABASE_URL="file:./data/whatsapp-api.db"
```

You can see examples of these configurations in the `.env` and `.env.docker` files provided with the project.

### 2. Database Initialization

The database is automatically initialized when the application starts. The initialization process is managed by the `DBConnector` class which handles:

- Creating the database directory (for SQLite)
- Backing up existing database files (for SQLite)
- Running Prisma migrations
- Creating an initial admin user

You can also manually initialize the database by running the application with the appropriate DATABASE_PROVIDER environment variable set.

## Switching Between Databases

### Method 1: Via API

The API provides endpoints for viewing and switching the current provider:

```
GET /api/db/status - Returns the current database provider
POST /api/db/switch - Switches the provider (requires "provider": "mongodb" or "sqlite")
```

Example request to switch to SQLite:

```bash
curl -X POST http://localhost:3000/api/db/switch \
  -H "Content-Type: application/json" \
  -d '{"provider": "sqlite"}'
```

The API will:
1. Disconnect from the current database
2. Switch to the new provider
3. Initialize the connection to the new database
4. Update the environment variable for subsequent restarts

### Method 2: By Modifying .env File

You can manually change the `DATABASE_PROVIDER` value in the `.env` file, then restart the server.

## Working with JSON Data

Since SQLite doesn't support native JSON storage, the application handles JSON data conversion automatically:

1. The `DBConnector` class provides a `handleJsonData()` method that serializes and deserializes JSON data
2. When storing JSON in SQLite, it's converted to a string representation
3. When retrieving JSON from SQLite, it's parsed back into objects
4. This is handled transparently in services like `instance.service.js` and others

This affects several data types:
- Webhook headers
- Message metadata
- Activity log details

## Usage Specifics

### MongoDB

- Better suited for high-load systems with many users
- Recommended for production environments with large data volumes
- Requires MongoDB server installation and configuration
- Supports native JSON data storage

### SQLite

- Ideal for demonstrations, development, and testing
- Works great on machines with limited resources
- Doesn't require additional software – entire database in a single file
- All data stored locally, simplifying backup
- Has limitations on parallel queries and larger data volumes

## Backup

### MongoDB

For MongoDB backup, use standard tools:

```bash
# Create backup
mongodump --uri="mongodb://username:password@localhost:27017/whatsapp-api" --out=./backup

# Restore
mongorestore --uri="mongodb://username:password@localhost:27017/whatsapp-api" ./backup
```

### SQLite

For SQLite, backup is handled automatically during initialization, creating timestamped backup files. You can also manually copy the database file:

```bash
# Assuming the database file path is ./data/whatsapp-api.db
cp ./data/whatsapp-api.db ./backup/whatsapp-api-$(date +%Y%m%d).db
```

## Docker Support

The project includes Docker support for both database types. When using Docker:

1. You can specify the database provider in the docker-compose.yml file
2. The container will automatically initialize the chosen database
3. SQLite data is stored in a persistent volume

Example from docker-compose.yml:
```yaml
environment:
  - DATABASE_PROVIDER=sqlite
  - DATABASE_URL=mongodb://whatsapp:whatsapp-password@mongodb:27017/whatsapp-api?authSource=admin
  - SQLITE_DATABASE_URL=file:/usr/src/app/data/whatsapp-api.db
```

## Recommendations

1. **Development and Testing**: SQLite is better due to setup simplicity
2. **Production with Low Load**: SQLite may be sufficient for small installations
3. **Production with High Load**: MongoDB will provide better performance
4. **Docker Deployment**: SQLite is easier for containerization as it doesn't require a separate database service

## Troubleshooting

### SQLite Issues

- **"Database is locked" error**: Occurs with concurrent access. SQLite supports only one write process.
- **File permission problems**: Ensure the process has read/write permissions to the database file.
- **File size**: SQLite may slow down when the database file exceeds 1GB. Archive old data regularly.

### MongoDB Issues

- **Connection errors**: Check that the MongoDB server is running and accessible at the specified URL.
- **Authentication**: Ensure credentials in DATABASE_URL are correct.
- **Indexing errors**: Create indexes for better performance with large data volumes.

## Monitoring

The API's `/health` endpoint includes information about the current database provider and connection status.

Sample response:
```json
{
  "status": "ok",
  "timestamp": "2023-01-01T12:00:00.000Z",
  "dbProvider": "sqlite"
}
```