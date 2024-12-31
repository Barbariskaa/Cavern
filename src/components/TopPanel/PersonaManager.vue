<template>
  <div class="persona-manager">
    <!-- Хедер -->
    <div class="manager-header">
      <div class="flex-container">
        <h3>{{ t('managePersona') }}</h3>
        <a href="#" target="_blank">{{ t('howToUse') }}</a>
      </div>

      <div class="header-controls">
        <button class="menu-btn" @click="exportPersonas">
          <i class="fa-solid fa-file-export"></i>
          <span>{{ t('backup') }}</span>
        </button>

        <label class="menu-btn">
          <i class="fa-solid fa-file-import"></i>
          <span>{{ t('restore') }}</span>
          <input
            type="file"
            accept=".json"
            @change="importPersonas"
            hidden
          >
        </label>
      </div>
    </div>

    <!-- Основной контент -->
    <div class="manager-content">
      <div class="toolbar">
        <button class="menu-btn" @click="createPersona">
          <i class="fa-solid fa-person-circle-question"></i>
          <span>{{ t('create') }}</span>
        </button>

        <input
          v-model="searchQuery"
          type="search"
          :placeholder="t('search')"
          class="search-input"
        >

        <select v-model="sortOrder" class="sort-select">
          <option value="asc">{{ t('sortAsc') }}</option>
          <option value="desc">{{ t('sortDesc') }}</option>
        </select>

        <button
          class="menu-btn icon-only"
          @click="gridView = !gridView"
          :title="gridView ? t('listView') : t('gridView')"
        >
          <i class="fa-solid" :class="gridView ? 'fa-list' : 'fa-table-cells'"></i>
        </button>
      </div>

      <!-- Список/сетка персон -->
      <div :class="['personas-container', { 'grid-view': gridView }]">
        <div
          v-for="persona in filteredPersonas"
          :key="persona.id"
          class="persona-card"
          :class="{ active: currentPersona?.id === persona.id }"
        >
          <div class="avatar">
            <img :src="persona.avatar" alt="Avatar">
          </div>

          <div class="persona-info">
            <div class="persona-name">
              {{ persona.name }}
            </div>

            <div class="persona-description">
              {{ persona.description || t('noDescription') }}
            </div>

            <div class="persona-controls">
              <button
                class="icon-btn"
                :title="t('changeAvatar')"
                @click="uploadAvatar(persona)"
              >
                <i class="fa-solid fa-image"></i>
              </button>

              <button
                class="icon-btn"
                :title="t('setDefault')"
                @click="setDefault(persona)"
              >
                <i class="fa-solid fa-crown"></i>
              </button>

              <button
                class="icon-btn"
                :title="t('duplicate')"
                @click="duplicatePersona(persona)"
              >
                <i class="fa-solid fa-clone"></i>
              </button>

              <button
                class="icon-btn delete"
                :title="t('delete')"
                @click="deletePersona(persona.id)"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Форма редактирования -->
      <div class="edit-form" v-if="currentPersona">
        <h4>{{ t('name') }}</h4>
        <div class="input-group">
          <input
            v-model="editForm.name"
            type="text"
            :placeholder="t('enterName')"
          >
          <button class="icon-btn" @click="savePersona(currentPersona)">
            <i class="fa-solid fa-check"></i>
          </button>
        </div>

        <h4>{{ t('personaDescription') }}</h4>
        <textarea
          v-model="editForm.description"
          :placeholder="t('descriptionExample')"
          rows="8"
        ></textarea>

        <div class="form-controls">
          <div class="position-select">
            <label>{{ t('position') }}:</label>
            <select v-model="editForm.position">
              <option value="9">{{ t('disabled') }}</option>
              <option value="0">{{ t('inHistoryLine') }}</option>
              <option value="2">{{ t('aboveNotes') }}</option>
              <option value="3">{{ t('belowNotes') }}</option>
              <option value="4">{{ t('insertAtDepth') }}</option>
            </select>
          </div>

          <div v-if="editForm.position === '4'" class="depth-controls">
            <div class="input-group">
              <label>{{ t('depth') }}:</label>
              <input
                v-model="editForm.depthValue"
                type="number"
                min="0"
                max="999"
              >
            </div>

            <div class="input-group">
              <label>{{ t('role') }}:</label>
              <select v-model="editForm.depthRole">
                <option value="0">{{ t('system') }}</option>
                <option value="1">{{ t('user') }}</option>
                <option value="2">{{ t('assistant') }}</option>
              </select>
            </div>
          </div>
        </div>

        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="showNotifications"
          >
          <span>{{ t('showNotifications') }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n' // Добавляем импорт

const { t } = useI18n({
  useScope: 'local'
})

// Состояния
const personas = ref([])
const currentPersona = ref(null)
const searchQuery = ref('')
const sortOrder = ref('asc')
const gridView = ref(false)
const showNotifications = ref(true)

// Форма редактирования
const editForm = ref({
  name: '',
  description: '',
  position: '0',
  depthValue: 0,
  depthRole: '0'
})

// Загрузка списка персон при монтировании
onMounted(async () => {
  try {
    const response = await fetch('/api/persona/list')
    const data = await response.json()
    personas.value = data

    // Грузим текущую персону из конфига
    const configResponse = await fetch('/api/config/get?key=currentPersona')
    const config = await configResponse.json()
    if (config.value) {
      currentPersona.value = personas.value.find(p => p.id === config.value)
    }
  } catch (err) {
    console.error(t('failedToLoadPersonas'), err)
  }
})

// Методы управления персонами
async function createPersona() {
  try {
    const response = await fetch('/api/persona/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: t('newPersona'),
        description: '',
        avatar: 'user-default.png'
      })
    })

    const newPersona = await response.json()
    personas.value.push(newPersona)
  } catch (err) {
    console.error(t('failedToCreatePersona'), err)
  }
}

async function deletePersona(id) {
  if (!confirm(t('deleteConfirmation'))) return

  try {
    await fetch(`/api/persona/${id}`, { method: 'DELETE' })
    personas.value = personas.value.filter(p => p.id !== id)
  } catch (err) {
    console.error(t('failedToDeletePersona'), err)
  }
}

async function savePersona(persona) {
  try {
    const response = await fetch(`/api/persona/${persona.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(persona)
    })

    const updated = await response.json()
    const index = personas.value.findIndex(p => p.id === updated.id)
    personas.value[index] = updated
  } catch (err) {
    console.error(t('failedToSavePersona'), err)
  }
}

// Импорт/экспорт
async function exportPersonas() {
  try {
    const response = await fetch('/api/persona/export')
    const blob = await response.blob()

    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'personas-backup.json'
    a.click()
  } catch (err) {
    console.error(t('failedToExportPersonas'), err)
  }
}

async function importPersonas(event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/persona/import', {
      method: 'POST',
      body: formData
    })

    const imported = await response.json()
    personas.value = imported
  } catch (err) {
    console.error(t('failedToImportPersonas'), err)
  }
}
</script>

<i18n lang="json">
{
  "en": {
    "managePersona": "Persona Management",
    "howToUse": "How to use?",
    "backup": "Backup",
    "restore": "Restore",
    "create": "Create",
    "search": "Search...",
    "sortAsc": "A-Z",
    "sortDesc": "Z-A",
    "listView": "List View",
    "gridView": "Grid View",
    "noDescription": "[No description]",
    "changeAvatar": "Change Avatar",
    "setDefault": "Set as Default",
    "duplicate": "Duplicate",
    "delete": "Delete",
    "name": "Name",
    "enterName": "Enter a name",
    "personaDescription": "Persona Description",
    "descriptionExample": "Example: [Alex is a 28-year-old Romanian cat girl.]",
    "position": "Position",
    "disabled": "Disabled",
    "inHistoryLine": "In History Line",
    "aboveNotes": "Above Notes",
    "belowNotes": "Below Notes",
    "insertAtDepth": "Insert at Depth",
    "depth": "Depth",
    "role": "Role",
    "system": "System",
    "user": "User",
    "assistant": "Assistant",
    "showNotifications": "Show notifications when changing persona",
    "failedToLoadPersonas": "Failed to load personas:",
    "failedToCreatePersona": "Failed to create persona:",
    "deleteConfirmation": "Delete this persona?",
    "failedToDeletePersona": "Failed to delete persona:",
    "failedToSavePersona": "Failed to save persona:",
    "failedToExportPersonas": "Failed to export personas:",
    "failedToImportPersonas": "Failed to import personas:",
    "newPersona": "New Persona"
  },
  "ru": {
    "managePersona": "Управление персоной",
    "howToUse": "Как пользоваться?",
    "backup": "Бэкап",
    "restore": "Восстановить",
    "create": "Создать",
    "search": "Поиск...",
    "sortAsc": "A-Я",
    "sortDesc": "Я-A",
    "listView": "Список",
    "gridView": "Сетка",
    "noDescription": "[Нет описания]",
    "changeAvatar": "Сменить аватар",
    "setDefault": "Установить по умолчанию",
    "duplicate": "Дублировать",
    "delete": "Удалить",
    "name": "Имя",
    "enterName": "Введите имя",
    "personaDescription": "Описание персоны",
    "descriptionExample": "Пример: [Алекс - 28-летняя румынская кошка-девочка.]",
    "position": "Положение",
    "disabled": "Отключено",
    "inHistoryLine": "В строке истории",
    "aboveNotes": "Сверху от заметок",
    "belowNotes": "Снизу от заметок",
    "insertAtDepth": "Вставить на глубине",
    "depth": "Глубина",
    "role": "Роль",
    "system": "Система",
    "user": "Пользователь",
    "assistant": "Ассистент",
    "showNotifications": "Показывать уведомления при смене персоны",
    "failedToLoadPersonas": "Не удалось загрузить персоны:",
    "failedToCreatePersona": "Не удалось создать персону:",
    "deleteConfirmation": "Удалить эту персону?",
    "failedToDeletePersona": "Не удалось удалить персону:",
    "failedToSavePersona": "Не удалось сохранить персону:",
    "failedToExportPersonas": "Не удалось экспортировать персоны:",
    "failedToImportPersonas": "Не удалось импортировать персоны:",
    "newPersona": "Новая персона"
  }
}
</i18n>

<style scoped>
.persona-manager {
  color: #fff;
  padding: 20px;
}

.manager-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.flex-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-controls {
  display: flex;
  gap: 0.5rem;
}

.menu-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #444;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.menu-btn:hover {
  background: #555;
}


.menu-btn.icon-only {
  padding: 0.5rem;
}

.toolbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.5rem;
  background: #333;
}
</style>