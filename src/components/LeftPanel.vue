<!-- components/LeftPanel.vue -->
<template>
  <div class="left-panel">
    <div class="panel-header">
      <i class="fa-solid fa-grip drag-grabber"></i>
    </div>

    <!-- Компонент Presets перемещён над кнопками секций -->
    <Presets />

    <div class="sections">
      <!-- Кнопки переключения секций -->
      <div class="section-buttons">
        <button
          v-for="section in sections"
          :key="section.key"
          @click="activeSection = section.key"
          :class="{ active: activeSection === section.key }"
        >
          {{ t(section.title) }}
        </button>
      </div>

      <div class="section">
        <!-- Динамический компонент для отображения текущей секции -->
        <component :is="getActiveComponent()" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

// Импорт подкомпонентов
import MainSettings from './LeftPanel/MainSettings.vue'
import PromptManager from './LeftPanel/PromptManager.vue'
import Prompts from './LeftPanel/Prompts.vue' // Новый компонент
import Presets from './LeftPanel/Presets.vue'

const { t } = useI18n({
  useScope: 'local'
})

const activeSection = ref('promptManager')

const sections = [
  { key: 'main', title: 'mainSettings' },
  { key: 'promptManager', title: 'promptManager' },
  { key: 'prompts', title: 'prompts' }
]

const getActiveComponent = () => {
  switch (activeSection.value) {
    case 'main':
      return MainSettings
    case 'promptManager':
      return PromptManager
    case 'prompts':
      return Prompts
    default:
      return null
  }
}
</script>

<i18n lang="json">
{
  "en": {
    "mainSettings": "Main Settings",
    "promptManager": "Prompt Manager",
    "prompts": "Prompts",
    "presets": "Presets"
  },
  "ru": {
    "mainSettings": "Основные",
    "promptManager": "Промтменеджер",
    "prompts": "Промпты",
    "presets": "Пресеты"
  }
}
</i18n>

<style scoped>
.left-panel {
  width: 300px;
  height: 100vh;
  background: #2d2d2d;
  color: white;
  padding: 1rem;
  overflow-y: auto;
}

.panel-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.drag-grabber {
  cursor: move;
  padding: 0.5rem;
}

.sections {
  display: flex;
  flex-direction: column;
}

.section {
  margin-bottom: 1rem;
}

.section-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.section-buttons button {
  flex: 1;
  padding: 0.5rem;
  background: #444;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s, transform 0.1s;
}

.section-buttons button:hover {
  background: #555;
}

.section-buttons button:active {
  transform: scale(0.98);
}

.section-buttons button.active {
  background: #666;
}

.button-icon {
  margin-right: 0.5rem;
}
</style>