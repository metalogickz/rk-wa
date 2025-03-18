// Базовый URL для API
const API_BASE_URL = '/api';

// Функция для проверки аутентификации
function checkAuth() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = '/login';
    return false;
  }
  return true;
}

// Получение токена авторизации
function getAuthToken() {
  return localStorage.getItem('authToken');
}

// Загрузка информации о пользователе
async function loadUserInfo() {
  try {
    const userData = await fetchAPI('/auth/me');

    // Обновляем информацию в навигационной панели
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement) {
      userInfoElement.textContent = userData.firstName || userData.email;
    }

    return userData;
  } catch (error) {
    console.error('Error loading user info:', error);
    if (error.status === 401) {
      // Если ошибка авторизации, перенаправляем на страницу входа
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return null;
  }
}

// Функция для выполнения API запросов с аутентификацией
async function fetchAPI(endpoint, options = {}, handleAccepted = false) {
  // Проверка на наличие слеша в начале пути
  if (!endpoint.startsWith('/')) {
    endpoint = '/' + endpoint;
  }

  // Полный URL для запроса
  const url = `/api${endpoint}`;

  // Базовые заголовки
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Добавляем токен авторизации, если он есть
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Настройки запроса
  const fetchOptions = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, fetchOptions);

    // Специальная обработка для статуса 202 (Accepted)
    if (response.status === 202 && handleAccepted) {
      return {
        status: 202,
        data: await response.json()
      };
    }

    // Проверяем статус ответа
    if (!response.ok) {
      // Пытаемся получить сообщение об ошибке из ответа
      let errorMessage = 'API request failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // Если не получилось распарсить JSON, используем статус текст
        errorMessage = response.statusText;
      }

      // Создаем объект ошибки с дополнительной информацией
      const error = new Error(errorMessage);
      error.status = response.status;
      error.response = response;
      throw error;
    }

    // Если ответ успешный и это не HEAD или DELETE запрос,
    // пытаемся распарсить ответ как JSON
    if (options.method !== 'HEAD' && options.method !== 'DELETE') {
      return await response.json();
    }

    return true;
  } catch (error) {
    // Если ошибка авторизации и это не запрос авторизации, перенаправляем на страницу входа
    if (error.status === 401 && !endpoint.includes('/auth/')) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    throw error;
  }
}

// Функция для получения QR-кода с обработкой статуса 202
async function getQrCode(instanceId, onGenerating = null, maxRetries = 5) {
  try {
    // Директно используем fetch, чтобы иметь доступ к статусу ответа
    const response = await fetch(`/api/instances/${instanceId}/qr`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });

    // Если статус 202, значит QR-код генерируется
    if (response.status === 202) {
      const data = await response.json();

      // Если предоставлен callback для обработки состояния генерации, вызываем его
      if (typeof onGenerating === 'function') {
        onGenerating(data);
      }

      // Если достигнуто максимальное количество попыток, возвращаем null
      if (maxRetries <= 0) {
        console.warn('Превышено максимальное количество попыток получения QR-кода');
        return null;
      }

      // Ждем 3 секунды и повторяем запрос
      await new Promise(resolve => setTimeout(resolve, 15000));
      return getQrCode(instanceId, onGenerating, maxRetries - 1);
    }

    // Если статус не 200, выбрасываем ошибку
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка получения QR-кода');
    }

    // Возвращаем данные
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении QR-кода:', error);
    throw error;
  }
}

// Функция для отображения уведомлений
function showAlert(message, type = 'info') {
  // Найти или создать контейнер для уведомлений
  let alertContainer = document.getElementById('alert-container');

  if (!alertContainer) {
    alertContainer = document.createElement('div');
    alertContainer.id = 'alert-container';
    alertContainer.style.position = 'fixed';
    alertContainer.style.top = '20px';
    alertContainer.style.right = '20px';
    alertContainer.style.zIndex = '1000';
    document.body.appendChild(alertContainer);
  }

  // Создать уведомление
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.style.marginBottom = '10px';
  alert.textContent = message;

  // Добавить кнопку закрытия
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.marginLeft = '10px';
  closeBtn.style.float = 'right';
  closeBtn.style.fontWeight = 'bold';
  closeBtn.style.cursor = 'pointer';
  closeBtn.onclick = () => alertContainer.removeChild(alert);
  alert.appendChild(closeBtn);

  // Добавить в контейнер
  alertContainer.appendChild(alert);

  // Автоматически удалить через 5 секунд
  setTimeout(() => {
    if (alertContainer.contains(alert)) {
      alertContainer.removeChild(alert);
    }
  }, 5000);
}

// Функция для форматирования даты
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Выход из системы
function setupLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    });
  }
}

// Функция для выхода
function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('apiKey');
  localStorage.removeItem('user');
  window.location.href = '/login';
}

// Инициализация навигационной панели
function initNavbar() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userInfoElement = document.getElementById('user-info');

  if (userInfoElement && user.email) {
    userInfoElement.textContent = user.email;
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
}

// Функция для получения параметров URL
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Функция для получения ID из пути URL (для routes с :id)
function getIdFromPath() {
  const pathParts = window.location.pathname.split('/');
  const excludedPages = ['chat', 'contacts', 'edit', 'details'];

  // Ищем индекс страницы среди исключенных
  const pageIndex = pathParts.findIndex(part => excludedPages.includes(part));

  // Если страница найдена, возвращаем предыдущий элемент
  if (pageIndex > -1) {
    return pathParts[pageIndex - 1];
  }

  // Если мы на странице деталей инстанса, берем последний элемент
  if (pathParts.includes('instance') && pathParts.length > 2) {
    return pathParts[pathParts.length - 1];
  }

  return null;
}

// Утилита для обновления статуса инстанса в UI
function getStatusBadgeHTML(status) {
  const statusMap = {
    'connected': { class: 'status-connected', text: 'Connected' },
    'disconnected': { class: 'status-disconnected', text: 'Disconnected' },
    'connecting': { class: 'status-connecting', text: 'Connecting' },
    'qr_received': { class: 'status-qr-received', text: 'QR Code' },
    'logged_out': { class: 'status-disconnected', text: 'Logged Out' },
    'error': { class: 'status-disconnected', text: 'Error' }
  };

  const statusInfo = statusMap[status] || { class: '', text: status };

  return `<span class="status-badge ${statusInfo.class}">${statusInfo.text}</span>`;
}

function generateQRCodeImage(data, size = 200) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
}

function getInstanceStatusInfo(status) {
  const statusMap = {
    'connected': {
      class: 'status-connected',
      text: 'Подключено',
      description: 'Инстанс успешно подключен к WhatsApp и готов к работе.'
    },
    'disconnected': {
      class: 'status-disconnected',
      text: 'Отключено',
      description: 'Инстанс отключен от WhatsApp. Нажмите "Переподключить" для восстановления соединения.'
    },
    'connecting': {
      class: 'status-connecting',
      text: 'Подключение',
      description: 'Идет процесс подключения к WhatsApp. Пожалуйста, подождите.'
    },
    'qr_received': {
      class: 'status-qr-received',
      text: 'QR Код',
      description: 'Отсканируйте QR-код с помощью WhatsApp на вашем телефоне для авторизации.'
    },
    'logged_out': {
      class: 'status-disconnected',
      text: 'Выход выполнен',
      description: 'Выполнен выход из WhatsApp. Нажмите "Переподключить" для повторной авторизации.'
    },
    'error': {
      class: 'status-disconnected',
      text: 'Ошибка',
      description: 'Произошла ошибка при подключении к WhatsApp. Проверьте журнал активности.'
    }
  };

  return statusMap[status] || {
    class: '',
    text: status,
    description: 'Статус инстанса неизвестен.'
  };
}

function formatPhoneNumber(number) {
  if (!number) return '';

  // Удаляем все нецифровые символы и @s.whatsapp.net
  let cleaned = number.toString().replace(/\D/g, '').replace('@s.whatsapp.net', '').replace('@c.us', '');

  // Если номер короткий, просто возвращаем его
  if (cleaned.length < 10) return cleaned;

  // Форматирование для российских номеров
  if (cleaned.startsWith('7') && cleaned.length === 11) {
    return `+${cleaned.substring(0, 1)} (${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)}-${cleaned.substring(7, 9)}-${cleaned.substring(9, 11)}`;
  }

  // Общее форматирование
  let result = '+';

  if (cleaned.length > 10) {
    result += cleaned.substring(0, cleaned.length - 10) + ' ';
    cleaned = cleaned.substring(cleaned.length - 10);
  }

  if (cleaned.length === 10) {
    result += `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
  } else {
    result += cleaned;
  }

  return result;
}

function getMessageTypeIcon(type) {
  switch (type) {
    case 'text': return '📝';
    case 'image': return '🖼️';
    case 'video': return '🎬';
    case 'audio': return '🔊';
    case 'document': return '📄';
    case 'location': return '📍';
    case 'contact': return '👤';
    default: return '📋';
  }
}

function getMessageStatusHtml(status) {
  const statusMap = {
    'sent': { class: 'status-connecting', text: 'Отправлено' },
    'delivered': { class: 'status-connecting', text: 'Доставлено' },
    'read': { class: 'status-connected', text: 'Прочитано' },
    'failed': { class: 'status-disconnected', text: 'Ошибка отправки' }
  };

  const statusInfo = statusMap[status] || { class: '', text: status };

  return `<span class="status-badge ${statusInfo.class}">${statusInfo.text}</span>`;
}

async function updateInstanceStatus(instanceId, statusElement) {
  try {
    const statusData = await fetchAPI(`/whatsapp/${instanceId}/status`);

    // Обновляем статус
    statusElement.innerHTML = getStatusBadgeHTML(statusData.status);

    return statusData.status;
  } catch (error) {
    console.error('Ошибка при обновлении статуса:', error);
    return null;
  }
}

// Показать уведомление
function showAlert(message, type = 'info', duration = 3000) {
  // Проверяем, существует ли уже контейнер для уведомлений
  let alertContainer = document.querySelector('.alert-container');

  // Если нет, создаем его
  if (!alertContainer) {
    alertContainer = document.createElement('div');
    alertContainer.className = 'alert-container';
    document.body.appendChild(alertContainer);
  }

  // Создаем элемент уведомления
  const alertElement = document.createElement('div');
  alertElement.className = `alert alert-${type}`;
  alertElement.textContent = message;

  // Добавляем его в контейнер
  alertContainer.appendChild(alertElement);

  // Анимация появления
  setTimeout(() => {
    alertElement.classList.add('show');
  }, 10);

  // Автоматическое закрытие через указанное время
  setTimeout(() => {
    alertElement.classList.remove('show');

    // Удаляем элемент после завершения анимации
    setTimeout(() => {
      alertContainer.removeChild(alertElement);
    }, 300);
  }, duration);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
});