const dbConnector = require('../src/utils/db-connector');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const prisma = dbConnector.getClient();

async function initializeAdmin() {
  try {
    console.log('Starting admin user initialization...');
    
    // Получаем данные из переменных окружения или используем значения по умолчанию
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminFirstName = process.env.ADMIN_FIRST_NAME || 'Admin';
    const adminLastName = process.env.ADMIN_LAST_NAME || 'User';
    
    // Проверяем, существует ли администратор с таким email
    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: adminEmail
      }
    });

    if (existingAdmin) {
      console.log(`Admin user ${adminEmail} already exists`);
      return;
    }

    // Создаем администратора
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const apiKey = uuidv4();

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        firstName: adminFirstName,
        lastName: adminLastName,
        apiKey,
        isAdmin: true
      }
    });

    console.log('Admin user created successfully');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('API Key:', apiKey);
    console.log('Save these credentials securely!');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

initializeAdmin();