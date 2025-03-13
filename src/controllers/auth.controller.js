const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const dbConnector = require('../utils/db-connector');

class AuthController {
  async login(req, res, next) {
    try {
      const prisma = dbConnector.getClient();
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      
      const user = await prisma.user.findUnique({
        where: { email }
      });
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'default-jwt-secret',
        { expiresIn: process.env.JWT_EXPIRATION || '24h' }
      );
      
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          apiKey: user.apiKey
        }
      });
    } catch (error) {
      next(error);
    }
  }
  
  // Получить информацию о текущем пользователе
  async getCurrentUser(req, res, next) {
    try {
      const user = req.user;
      
      res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();