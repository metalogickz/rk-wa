// test/jest.setup.js

// Увеличиваем таймаут для тестов
jest.setTimeout(30000);

// Подавляем консольные логи во время тестов
// Чтобы включить логи для отладки, закомментируйте эти строки
const originalConsoleLog = console.log;
const originalConsoleInfo = console.info;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.log = jest.fn();
console.info = jest.fn();
console.warn = jest.fn();
//console.error = jest.fn(); // Оставляем ошибки видимыми для отладки

// Восстанавливаем консоль после завершения всех тестов
afterAll(() => {
  console.log = originalConsoleLog;
  console.info = originalConsoleInfo;
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});