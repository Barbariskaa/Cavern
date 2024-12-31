<!-- pages/admin.vue -->
<template>
    <div class="admin-page">
      <!-- Форма логина -->
      <div v-if="!isAuthenticated" class="login-form">
        <h1>Админ-панель</h1>
        <form @submit.prevent="login">
          <div class="form-group">
            <label>Логин:</label>
            <input type="text" v-model="username" required>
          </div>
          <div class="form-group">
            <label>Пароль:</label>
            <input type="password" v-model="password" required>
          </div>
          <button type="submit">Войти</button>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
  
      <!-- Панель статистики -->
      <div v-else class="admin-panel">
        <div class="header">
          <h1>Статистика сервера</h1>
          <button @click="logout" class="logout-btn">Выйти</button>
        </div>
  
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Система</h3>
            <p>ОС: {{ systemInfo.platform }}</p>
            <p>Время работы ОС: {{ formatUptime(systemInfo.osUptime) }}</p>
            <p>Время работы приложения: {{ formatUptime(systemInfo.appUptime) }}</p>
            <p>Версия Node: {{ systemInfo.nodeVersion }}</p>
          </div>
  
          <div class="stat-card">
            <h3>Память системы</h3>
            <p>Всего: {{ formatBytes(memoryInfo.total) }}</p>
            <p>Использовано: {{ formatBytes(memoryInfo.used) }}</p>
            <p>Свободно: {{ formatBytes(memoryInfo.free) }}</p>
            <div class="memory-bar">
              <div class="memory-used"
                  :style="{ width: `${(memoryInfo.used / memoryInfo.total) * 100}%` }">
              </div>
            </div>
          </div>
  
          <div class="stat-card">
            <h3>Память приложения</h3>
            <p>RSS: {{ formatBytes(memoryInfo.process.rss) }}</p>
            <p>Куча (выделено): {{ formatBytes(memoryInfo.process.heapTotal) }}</p>
            <p>Куча (использовано): {{ formatBytes(memoryInfo.process.heapUsed) }}</p>
            <p>Внешняя память: {{ formatBytes(memoryInfo.process.external) }}</p>
            <div class="memory-bar">
              <div class="memory-used"
                  :style="{ width: `${(memoryInfo.process.heapUsed / memoryInfo.process.heapTotal) * 100}%` }">
              </div>
            </div>
          </div>
  
          <div class="stat-card">
            <h3>CPU</h3>
            <p>Загрузка: {{ cpuInfo.load.toFixed(1) }}%</p>
            <p>Ядра: {{ cpuInfo.cores }}</p>
            <div class="cpu-bar">
              <div class="cpu-used"
                  :style="{ width: `${cpuInfo.load}%` }">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const isAuthenticated = ref(false)
  const username = ref('')
  const password = ref('')
  const error = ref('')
  
  // Системная информация
  const systemInfo = ref({})
  const memoryInfo = ref({})
  const cpuInfo = ref({ load: 0, cores: 0 })
  let statsInterval
  
  // Функции форматирования
  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24))
    const hours = Math.floor((seconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}д ${hours}ч ${minutes}м`
  }
  
  // Авторизация
  async function login() {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value, password: password.value })
      })
  
      if (response.ok) {
        isAuthenticated.value = true
        error.value = ''
        startMonitoring()
      } else {
        error.value = 'Неверный логин или пароль'
      }
    } catch (err) {
      error.value = 'Ошибка авторизации'
    }
  }
  
  function logout() {
    isAuthenticated.value = false
    username.value = ''
    password.value = ''
    stopMonitoring()
  }
  
  // Мониторинг
  async function updateStats() {
    try {
      const response = await fetch('/api/admin/stats')
      const stats = await response.json()
      systemInfo.value = stats.system
      memoryInfo.value = stats.memory
      cpuInfo.value = stats.cpu
    } catch (err) {
      console.error('Ошибка получения статистики:', err)
    }
  }
  
  function startMonitoring() {
    updateStats()
    statsInterval = setInterval(updateStats, 5000)
  }
  
  function stopMonitoring() {
    if (statsInterval) {
      clearInterval(statsInterval)
    }
  }
  
  onUnmounted(() => {
    stopMonitoring()
  })
  </script>
  
  <style scoped>
  .admin-page {
    min-height: 100vh;
    background: #1a1a1a;
    color: #fff;
    padding: 2rem;
  }
  
  .login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background: #2d2d2d;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #444;
    background: #333;
    color: #fff;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 0.75rem;
    background: #4a9eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background: #3a8eef;
  }
  
  .error {
    color: #ff4444;
    margin-top: 1rem;
    text-align: center;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .stat-card {
    background: #2d2d2d;
    padding: 1.5rem;
    border-radius: 8px;
  }
  
  .memory-bar,
  .cpu-bar {
    height: 4px;
    background: #444;
    border-radius: 2px;
    margin-top: 1rem;
    overflow: hidden;
  }
  
  .memory-used,
  .cpu-used {
    height: 100%;
    background: #4a9eff;
    transition: width 0.3s ease;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logout-btn {
    width: auto;
    padding: 0.5rem 1rem;
    background: #ff4444;
  }
  
  .logout-btn:hover {
    background: #ff3333;
  }
  </style>
  