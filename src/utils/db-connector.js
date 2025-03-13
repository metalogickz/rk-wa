const { PrismaClient: MongoDBPrismaClient } = require('@prisma/client');
const { PrismaClient: SQLitePrismaClient } = require('../../prisma/generated/sqlite-client');
const logger = require('./logger');

/**
 * Database connector factory that provides the appropriate Prisma client
 * based on the selected database provider
 */
class DBConnector {
  constructor() {
    this.mongoClient = null;
    this.sqliteClient = null;
    this.activeProvider = process.env.DATABASE_PROVIDER || 'mongodb';
    
    logger.info(`Initializing database connector with provider: ${this.activeProvider}`);
  }

  /**
   * Get the appropriate Prisma client instance based on the active provider
   * @returns {PrismaClient} The Prisma client instance
   */
  getClient() {
    if (this.activeProvider === 'sqlite') {
      if (!this.sqliteClient) {
        logger.info('Creating new SQLite Prisma client');
        this.sqliteClient = new SQLitePrismaClient({
          datasources: {
            db: {
              url: process.env.SQLITE_DATABASE_URL || 'file:./data/whatsapp-api.db'
            }
          },
          log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
        });
      }
      return this.sqliteClient;
    } else {
      // Default to MongoDB
      if (!this.mongoClient) {
        logger.info('Creating new MongoDB Prisma client');
        this.mongoClient = new MongoDBPrismaClient({
          datasources: {
            db: {
              url: process.env.DATABASE_URL
            }
          },
          log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
        });
      }
      return this.mongoClient;
    }
  }

  /**
   * Switch the active database provider
   * @param {string} provider - The database provider ('mongodb' or 'sqlite')
   */
  switchProvider(provider) {
    if (provider !== 'mongodb' && provider !== 'sqlite') {
      throw new Error(`Unsupported database provider: ${provider}. Supported providers are 'mongodb' and 'sqlite'.`);
    }
    
    logger.info(`Switching database provider from ${this.activeProvider} to ${provider}`);
    this.activeProvider = provider;
    
    // Return the appropriate client
    return this.getClient();
  }

  /**
   * Disconnect from all database clients
   */
  async disconnect() {
    if (this.mongoClient) {
      logger.info('Disconnecting MongoDB Prisma client');
      await this.mongoClient.$disconnect();
      this.mongoClient = null;
    }
    
    if (this.sqliteClient) {
      logger.info('Disconnecting SQLite Prisma client');
      await this.sqliteClient.$disconnect();
      this.sqliteClient = null;
    }
  }

  /**
   * Handles JSON data conversion for SQLite
   * SQLite doesn't support native JSON storage, so we need to serialize/deserialize
   * 
   * @param {Object|string} data - Data to process
   * @param {boolean} toJson - Whether to convert to JSON string (true) or parse from JSON string (false)
   * @returns {string|Object} - Processed data
   */
  handleJsonData(data, toJson = true) {
    if (this.activeProvider !== 'sqlite') {
      return data; // No conversion needed for MongoDB
    }
    
    try {
      if (toJson && data && typeof data === 'object') {
        // Convert object to JSON string for SQLite
        return JSON.stringify(data);
      } else if (!toJson && data && typeof data === 'string') {
        // Parse JSON string from SQLite
        return JSON.parse(data);
      }
    } catch (error) {
      logger.error('Error handling JSON data conversion', {
        error: error.message,
        data: typeof data
      });
    }
    
    return data;
  }
}

// Export singleton instance
module.exports = new DBConnector();