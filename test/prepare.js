const fs = require('fs');
const path = require('path');
const config = require('./config');

// Создаем директорию для тестовых инстансов
const targetDir = path.join(config.testInstancesPath, config.testInstanceId, 'auth');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Копируем файлы аутентификации
const sourceDir = path.join(__dirname, '../instances', config.testInstanceId, 'auth');
if (fs.existsSync(sourceDir)) {
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    fs.copyFileSync(
      path.join(sourceDir, file),
      path.join(targetDir, file)
    );
  });
   
  console.log(`Copied ${files.length} authentication files for testing`);
} else {
  console.warn(`Source directory ${sourceDir} not found. Tests may fail if authentication is required.`);
}