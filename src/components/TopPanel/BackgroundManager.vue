<template>
  <div class="background-manager" :class="{ open: isOpen }">
    <div class="manager-header">
      <h3>{{ t('backgroundManagement') }}</h3>
      <div class="header-controls">
        <input
          type="text"
          v-model="searchQuery"
          :placeholder="t('searchBackground')"
          class="search-input"
        >
        <button class="auto-select" :title="t('autoSelectBackground')" @click="autoSelectBackground">
          <i class="fa-solid fa-wand-magic"></i>
          {{ t('autoSelect') }}
        </button>
      </div>
    </div>

    <div class="backgrounds-container">
      <h4>{{ t('systemBackgrounds') }}</h4>

      <!-- Upload new background -->
      <label class="upload-bg">
        <input
          type="file"
          @change="handleFileUpload"
          accept="image/*"
          multiple
          hidden
        >
        <div class="upload-placeholder">
          <i class="fa-solid fa-plus"></i>
          <span>{{ t('addBackground') }}</span>
        </div>
      </label>

      <!-- Backgrounds grid -->
      <div class="backgrounds-grid">
        <div
          v-for="bg in filteredBackgrounds"
          :key="bg.id"
          class="bg-item"
          :style="{ backgroundImage: `url(${bg.thumbnail})` }"
          @click="selectBackground(bg)"
        >
          <div class="bg-controls">
            <button
              class="bg-btn copy"
              :title="t('copyToSystem')"
              @click.stop="copyToSystem(bg)"
            >
              <i class="fa-solid fa-file-arrow-up"></i>
            </button>
            <button
              class="bg-btn edit"
              :title="t('rename')"
              @click.stop="renameBackground(bg)"
            >
              <i class="fa-solid fa-pencil"></i>
            </button>
            <button
              class="bg-btn lock"
              :title="t('toggleLock')"
              @click.stop="toggleLock(bg)"
            >
              <i :class="bg.locked ? 'fa-lock' : 'fa-lock-open'" class="fa-solid"></i>
            </button>
            <button
              class="bg-btn delete"
              :title="t('delete')"
              @click.stop="deleteBackground(bg)"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
          <div class="bg-name">{{ bg.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n' // Import for internationalization

// Initialize translation function
const { t } = useI18n({
  useScope: 'local'
})

const props = defineProps({
  isOpen: Boolean,
  modelValue: Boolean
})

const emit = defineEmits(['update:isOpen', 'select-background', 'update:modelValue', 'someEvent'])

const backgrounds = ref([])
const searchQuery = ref('')

// Fetch backgrounds when the component is mounted
onMounted(async () => {
  try {
    const response = await fetch('/api/backgrounds')
    if (response.ok) {
      const data = await response.json()
      backgrounds.value = data
    } else {
      console.error('Failed to fetch backgrounds')
    }
  } catch (error) {
    console.error('Error fetching backgrounds:', error)
  }
})

// Filtered backgrounds
const filteredBackgrounds = computed(() => {
  if (!searchQuery.value) return backgrounds.value
  const query = searchQuery.value.toLowerCase()
  return backgrounds.value.filter(bg =>
    bg.name.toLowerCase().includes(query)
  )
})

// Upload backgrounds
async function handleFileUpload(event) {
  const files = Array.from(event.target.files)

  for (const file of files) {
    const formData = new FormData()
    formData.append('background', file)

    try {
      const response = await fetch('/api/backgrounds', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const newBg = await response.json()
        backgrounds.value.push(newBg)
      }
    } catch (err) {
      console.error(t('backgroundUploadError'), err)
    }
  }
}

// Select background
async function selectBackground(bg) {
  try {
    // Save selection to config
    const response = await fetch('/api/backgrounds/select', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selectedBackground: bg.id,
        lastModified: Date.now()
      })
    })

    if (response.ok) {
      // Apply background
      document.body.style.backgroundImage = `url(${bg.url})`
      document.body.style.backgroundSize = 'cover'
      document.body.style.backgroundPosition = 'center'
      document.body.style.backgroundRepeat = 'no-repeat'

      emit('select-background', bg)
    }
  } catch (err) {
    console.error('Error selecting background:', err)
  }
}

// Rename background
async function renameBackground(bg) {
  const newName = prompt(t('enterNewName'), bg.name)
  if (!newName) return

  try {
    const response = await fetch(`/api/backgrounds/${bg.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName })
    })

    if (response.ok) {
      const index = backgrounds.value.findIndex(b => b.id === bg.id)
      backgrounds.value[index].name = newName
    }
  } catch (err) {
    console.error(t('renameError'), err)
  }
}

// Delete background
async function deleteBackground(bg) {
  if (!confirm(t('deleteBackgroundConfirm'))) return

  try {
    const response = await fetch(`/api/backgrounds/${bg.id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      backgrounds.value = backgrounds.value.filter(b => b.id !== bg.id)
    }
  } catch (err) {
    console.error(t('deleteError'), err)
  }
}

// Lock/Unlock background
function toggleLock(bg) {
  bg.locked = !bg.locked
}

// Additional methods
function autoSelectBackground() {
  // Logic for auto-selecting background
}

function copyToSystem(bg) {
  // Logic for copying to system
}
</script>

<i18n lang="json">
{
  "en": {
    "backgroundManagement": "Background Management",
    "searchBackground": "Search background...",
    "autoSelectBackground": "Auto-select background",
    "autoSelect": "Auto-select",
    "systemBackgrounds": "System Backgrounds",
    "addBackground": "Add Background",
    "copyToSystem": "Copy to System",
    "rename": "Rename",
    "toggleLock": "Toggle Lock",
    "delete": "Delete",
    "enterNewName": "Enter new name:",
    "backgroundUploadError": "Error uploading background:",
    "renameError": "Error renaming background:",
    "deleteBackgroundConfirm": "Delete background?",
    "deleteError": "Error deleting background:"
  },
  "ru": {
    "backgroundManagement": "Управление фонами",
    "searchBackground": "Поиск фона...",
    "autoSelectBackground": "Автоматический выбор фона",
    "autoSelect": "Авто-выбор",
    "systemBackgrounds": "Системные фоны",
    "addBackground": "Добавить фон",
    "copyToSystem": "Копировать в системные",
    "rename": "Переименовать",
    "toggleLock": "Переключить блокировку",
    "delete": "Удалить",
    "enterNewName": "Введите новое имя:",
    "backgroundUploadError": "Ошибка загрузки фона:",
    "renameError": "Ошибка переименования:",
    "deleteBackgroundConfirm": "Удалить фон?",
    "deleteError": "Ошибка удаления фона:"
  }
}
</i18n>

<style scoped>
/* Your styles remain unchanged */
.background-manager {
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 50vw;
  background: #2d2d2d;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 999;
  transition: all 0.3s ease;
  max-height: 0;
  opacity: 0;
  visibility: hidden;
  overflow: hidden;
}

.background-manager.open {
  opacity: 1;
  visibility: visible;
  max-height: calc(100vh - 60px);
  overflow-y: auto;
}

.manager-header {
  padding: 1rem;
  border-bottom: 1px solid #444;
}

.header-controls {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #444;
  border-radius: 4px;
  background: #333;
  color: #fff;
}

.auto-select {
  padding: 0.5rem 1rem;
  background: #4a9eff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.backgrounds-container {
  padding: 1rem;
}

.backgrounds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.bg-item {
  aspect-ratio: 16/9;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}

.bg-controls {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.bg-item:hover .bg-controls {
  opacity: 1;
}

.bg-btn {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.bg-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.bg-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 0.9rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.upload-bg {
  display: block;
  cursor: pointer;
}

.upload-placeholder {
  aspect-ratio: 16/9;
  border: 2px dashed #444;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #888;
  transition: all 0.2s;
}

.upload-placeholder:hover {
  border-color: #4a9eff;
  color: #4a9eff;
}
</style>