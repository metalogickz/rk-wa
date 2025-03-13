const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

async function initializeAdmin() {
  try {
    console.log('Starting admin user initialization...');
    
    // Проверяем, существует ли администратор
    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: 'admin@example.com'
      }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Создаем администратора
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const apiKey = uuidv4();

    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        apiKey
      }
    });

    console.log('Admin user created successfully');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('API Key:', apiKey);
    console.log('Save these credentials securely!');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializeAdmin();