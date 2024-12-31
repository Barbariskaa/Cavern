<!-- components/LeftPanel/PromptManager.vue -->
<template>
  <div class="prompt-manager">
    <h4>{{ t('promptManager') }}</h4>
    <transition-group name="list" tag="ul" class="prompt-list">
      <li
        v-for="(prompt, index) in prompts"
        :key="prompt.id"
        class="prompt-item"
        draggable="true"
        @dragstart="onDragStart($event, index)"
        @dragover="onDragOver($event, index)"
        @dragenter.prevent
        @dragend="onDragEnd"
        :class="{ dragging: draggedIndex === index }"
      >
        <div class="prompt-content">
          <span class="drag-handle">
            <i class="fa-solid fa-grip-vertical"></i>
          </span>
          <span class="prompt-name">{{ prompt.name }}</span>
          <span class="prompt-controls">
            <i
              class="fa-solid fa-pencil"
              title="Редактировать"
              @click.stop="editPrompt(prompt)"
            ></i>
            <i
              class="fa-solid"
              :class="prompt.enabled ? 'fa-toggle-on' : 'fa-toggle-off'"
              @click.stop="togglePrompt(prompt)"
              :title="prompt.enabled ? t('disable') : t('enable')"
            ></i>
          </span>
          <span class="prompt-tokens">{{ prompt.tokens }}</span>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settingsStore'

const { t } = useI18n({
  useScope: 'local'
})

const settingsStore = useSettingsStore()
const prompts = computed(() => settingsStore.prompts)

const togglePrompt = (prompt) => {
  prompt.enabled = !prompt.enabled
}

const editPrompt = (prompt) => {
  // Ваш код для редактирования промпта
}

// Drag and drop functionality
let draggedItem = null
let draggedIndex = null

const onDragStart = (event, index) => {
  draggedItem = prompts.value[index]
  draggedIndex = index
  event.dataTransfer.effectAllowed = 'move'

  // Убираем "призрачный" элемент
  const img = new Image()
  img.src =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
  event.dataTransfer.setDragImage(img, 0, 0)

  event.currentTarget.classList.add('dragging')
}

const moveItem = (newIndex) => {
  settingsStore.prompts.splice(draggedIndex, 1)
  settingsStore.prompts.splice(newIndex, 0, draggedItem)
  draggedIndex = newIndex
}

const onDragOver = (event, index) => {
  event.preventDefault()

  // Получаем границы элемента и позицию курсора
  const bounding = event.currentTarget.getBoundingClientRect()
  const offset = bounding.top + bounding.height / 2

  // Определяем, двигаемся ли вниз или вверх
  const isMovingDown = event.clientY > offset

  if (isMovingDown && index > draggedIndex) {
    moveItem(index)
  } else if (!isMovingDown && index < draggedIndex) {
    moveItem(index)
  }
}

const onDragEnd = (event) => {
  event.currentTarget.classList.remove('dragging')
  draggedItem = null
  draggedIndex = null
}
</script>

<i18n>
{
  "en": {
    "promptManager": "Prompt Manager",
    "disable": "Disable",
    "enable": "Enable",
    "mainPrompt": "Main Prompt",
    "worldInfoBefore": "World Info (before)",
    "personaDescription": "Persona Description",
    "charDescription": "Character Description",
    "charPersonality": "Character Personality",
    "scenario": "Scenario",
    "enhanceDefinitions": "Enhance Definitions",
    "nsfwPrompt": "NSFW Prompt",
    "worldInfoAfter": "World Info (after)",
    "chatExamples": "Chat Examples",
    "chatHistory": "Chat History",
    "jailbreakPrompt": "Jailbreak Prompt"
  },
  "ru": {
    "promptManager": "Промтменеджер",
    "disable": "Отключить",
    "enable": "Включить",
    "mainPrompt": "Основной Промпт",
    "worldInfoBefore": "Информация о Мире (до)",
    "personaDescription": "Описание Персоны",
    "charDescription": "Описание Персонажа",
    "charPersonality": "Личность Персонажа",
    "scenario": "Сценарий",
    "enhanceDefinitions": "Улучшить Определения",
    "nsfwPrompt": "NSFW Промпт",
    "worldInfoAfter": "Информация о Мире (после)",
    "chatExamples": "Примеры Чата",
    "chatHistory": "История Чата",
    "jailbreakPrompt": "Jailbreak Промпт"
  }
}
</i18n>

<style scoped>
.prompt-manager {
  background: #3a3a3a;
  padding: 1rem;
  border-radius: 8px;
}

.prompt-manager h4 {
  margin-bottom: 1rem;
}

.prompt-list {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.prompt-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background: #4a4a4a;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  cursor: move;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.prompt-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.drag-handle {
  cursor: move;
  margin-right: 0.5rem;
  color: #aaa;
}

.prompt-name {
  flex: 1;
  color: #fff;
}

.prompt-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prompt-controls i {
  cursor: pointer;
  color: #aaa;
}

.prompt-controls i:hover {
  color: #fff;
}

.prompt-tokens {
  margin-left: 1rem;
}

/* Анимации */
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.list-move {
  transition: transform 0.2s ease;
}

.dragging {
  transform: scale(1.05);
  background-color: #5a5a5a;
  z-index: 1;
}
</style>