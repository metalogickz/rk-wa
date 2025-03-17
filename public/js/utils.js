// Базовый URL для API
const API_BASE_URL = '/api';

// Функция для проверки аутентификации
function checkAuth() {
  const token = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');

  if (!token && !apiKey) {
    // Если нет ни токена, ни API ключа, перенаправляем на страницу входа
    window.location.href = '/login';
  }

  return { token, apiKey };
}

// Функция для выполнения API запросов с аутентификацией
async function fetchAPI(endpoint, options = {}) {
  const { token, apiKey } = checkAuth();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Добавляем заголовок аутентификации
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else if (apiKey) {
    headers['x-api-key'] = apiKey;
  }

  try {
    console.log('Fetching API:', `${API_BASE_URL}${endpoint}`, 'Options:', options);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    console.log('Response status:', response.status);

    // Если статус 401, сбрасываем аутентификацию и перенаправляем на страницу входа
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('apiKey');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return null;
    }

    // Для всех остальных ошибок просто кидаем исключение
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.error || 'API request failed');
    }

    // Возвращаем данные
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    showAlert(error.message || 'Error communicating with the server', 'danger');
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

// Функция для выхода
function logout() {
  localStorage.removeItem('token');
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
  const path = window.location.pathname;
  const parts = path.split('/');
  return parts[parts.length - 1];
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
});