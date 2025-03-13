# Инструкции по запуску тестов для WhatsApp Multi-Instance API

## Подготовка к тестированию

1. Установите зависимости для тестирования:
   ```bash
   npm install --save-dev jest supertest
   ```

2. Создайте директорию для тестов:
   ```bash
   mkdir -p test/uploads test/data
   ```

3. Создайте файл `.env.test` в корне проекта с тестовыми настройками:
   ```bash
   # Используйте содержимое из файла env-test-file
   ```

4. Убедитесь, что у вас сгенерированы Prisma клиенты для обоих типов баз данных:
   ```bash
   npm run prisma:generate:all
   ```

## Структура тестов

Тесты организованы по функциональным группам:

- `auth.test.js` - Тесты аутентификации (JWT и API ключи)
- `instance.test.js` - Тесты управления инстансами
- `whatsapp.test.js` - Тесты WhatsApp API (отправка сообщений и т.д.)
- `stats.test.js` - Тесты статистики
- `db-switch.test.js` - Тесты переключения базы данных
- `health.test.js` - Тесты проверки состояния приложения

Каждый тест запускается для обоих типов баз данных (MongoDB и SQLite) для обеспечения полного покрытия.

## Запуск тестов

### Запуск всех тестов

```bash
npm test
```

### Запуск с наблюдением за изменениями

```bash
npm run test:watch
```

### Запуск только для MongoDB

```bash
npm run test:mongodb
```

### Запуск только для SQLite

```bash
npm run test:sqlite
```

### Запуск с отчетом о покрытии кода

```bash
npm run test:coverage
```

## Отладка тестов

Если какой-либо тест не проходит, вы можете:

1. Раскомментировать консольные логи в `test/jest.setup.js` для отображения подробной информации
2. Запустить конкретный файл с тестом:
   ```bash
   npx jest test/auth.test.js
   ```
3. Запустить конкретный тест с флагом `--testNamePattern`:
   ```bash
   npx jest --testNamePattern="should login with valid credentials"
   ```

## Особенности тестирования

1. Тесты используют изолированные базы данных, которые не затрагивают вашу основную базу данных
2. Перед запуском тестов создаются тестовые пользователи и инстансы
3. Тесты, требующие реального подключения к WhatsApp, будут возвращать ошибки (это ожидаемое поведение)
4. Для полноценного тестирования можно создать моки для WhatsApp сервиса

## Моделирование реальных подключений WhatsApp

Для более полного тестирования без реальных соединений с WhatsApp, вы можете реализовать моки для `whatsapp-manager.service.js`:

1. Создайте файл `__mocks__/whatsapp-manager.service.js` с имитацией функциональности:
   ```javascript
   module.exports = {
     instances: new Map(),
     initInstance: jest.fn().mockResolvedValue({}),
     stopInstance: jest.fn().mockResolvedValue({}),
     getInstanceStatus: jest.fn().mockReturnValue({ ready: true, status: 'connected', hasQr: false }),
     getInstanceQrCode: jest.fn().mockReturnValue('mock-qr-code'),
     sendMessage: jest.fn().mockResolvedValue({ id: 'mock-message-id' }),
     sendMediaByUrl: jest.fn().mockResolvedValue({ id: 'mock-media-id' }),
     sendMediaFromPath: jest.fn().mockResolvedValue({ id: 'mock-file-id' }),
     getContacts: jest.fn().mockResolvedValue([{ id: '1234567890@s.whatsapp.net', name: 'Test Contact', number: '1234567890' }]),
     logoutInstance: jest.fn().mockResolvedValue({ success: true }),
     sendWebhook: jest.fn().mockResolvedValue({}),
     checkSocketAlive: jest.fn().mockResolvedValue({ alive: true, state: 'open' }),
     checkAllSockets: jest.fn().mockResolvedValue({ 'instance-id': { alive: true } }),
     checkAuthExpiration: jest.fn().mockResolvedValue({})
   };
   ```

2. Настройте Jest для автоматического использования мока:
   ```javascript
   // В test/jest.setup.js добавьте:
   jest.mock('../src/services/whatsapp-manager.service');
   ```

Это позволит более полно тестировать функциональность API без реальных соединений с WhatsApp.
