<!-- components/LeftPanel/Prompts.vue -->
<template>
  <div class="prompts">
    <h4>{{ t('prompts') }}</h4>

    <!-- Раздел быстрого редактирования промптов -->
    <div class="collapsible-section">
      <div
        class="section-header"
        @click="toggleSection('quickEdit')"
      >
        <span>{{ t('quickPromptsEdit') }}</span>
        <i
          :class="[
            'fa-solid',
            sectionOpen.quickEdit ? 'fa-chevron-down' : 'fa-chevron-right'
          ]"
        ></i>
      </div>
      <div
        v-show="sectionOpen.quickEdit"
        class="section-content"
      >
        <div
          class="prompt-item"
          v-for="prompt in quickPrompts"
          :key="prompt.id"
        >
          <label>{{ prompt.name }}</label>
          <textarea
            v-model="prompt.content"
            rows="3"
            placeholder="—"
          ></textarea>
        </div>
      </div>
    </div>
  
      <!-- Раздел служебных промптов -->
      <div class="collapsible-section">
        <div
          class="section-header"
          @click="toggleSection('utilityPrompts')"
        >
          <span>{{ t('utilityPrompts') }}</span>
          <i
            :class="[
              'fa-solid',
              sectionOpen.utilityPrompts ? 'fa-chevron-down' : 'fa-chevron-right'
            ]"
          ></i>
        </div>
        <div
          v-show="sectionOpen.utilityPrompts"
          class="section-content"
        >
          <div class="prompt-item">
            <label>{{ t('impersonationPrompt') }}</label>
            <textarea
              v-model="impersonationPrompt"
              rows="3"
              placeholder="—"
            ></textarea>
          </div>
          <div class="prompt-item">
            <label>{{ t('worldInfoFormat') }}</label>
            <textarea
              v-model="worldInfoFormat"
              rows="3"
              placeholder="—"
            ></textarea>
          </div>
          <div class="prompt-item">
            <label>{{ t('scenarioFormat') }}</label>
            <textarea
              v-model="scenarioFormat"
              rows="3"
              placeholder="—"
            ></textarea>
          </div>
          <div class="prompt-item">
            <label>{{ t('personalityFormat') }}</label>
            <textarea
              v-model="personalityFormat"
              rows="3"
              placeholder="—"
            ></textarea>
          </div>
          <div class="prompt-item">
            <label>{{ t('groupNudgePrompt') }}</label>
            <textarea
              v-model="groupNudgePrompt"
              rows="3"
              placeholder="—"
            ></textarea>
          </div>
          <div class="prompt-item">
            <label>{{ t('newChatPrompt') }}</label>
            <textarea
              v-model="newChatPrompt"
              rows="3"
              placeholder="—"
            ></textarea>
          </div>
          <div class="prompt-item">
            <label>{{ t('newGroupChatPrompt') }}</label>
            <textarea
              v-model="newGroupChatPrompt"
              rows="3"
              placeholder="—"
            ></textarea>
          </div>
          <div class="prompt-item">
            <label>{{ t('newExampleChatPrompt') }}</label>
            <textarea
              v-model="newExampleChatPrompt"
              rows="3"
              placeholder="—"
            ></textarea>
          </div>
          <div class="prompt-item">
            <label>{{ t('continueNudgePrompt') }}</label>
            <textarea
              v-model="continueNudgePrompt"
              rows="3"
              placeholder="—"
            ></textarea>
          </div>
          <div class="prompt-item">
            <label>{{ t('sendIfEmptyPrompt') }}</label>
            <textarea
              v-model="sendIfEmptyPrompt"
              rows="3"
              placeholder="—"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n({
    useScope: 'local'
  })
  
  // Управление состоянием секций (открыты/закрыты)
  const sectionOpen = reactive({
    quickEdit: true,
    utilityPrompts: false
  })
  
  // Функция для переключения видимости секций
  const toggleSection = (section) => {
    sectionOpen[section] = !sectionOpen[section]
  }
  
  // Промпты для быстрого редактирования
  const mainPrompt = ref('')
  const nsfwPrompt = ref('')
  const jailbreakPrompt = ref('')
  
  // Служебные промпты
  const impersonationPrompt = ref('')
  const worldInfoFormat = ref('')
  const scenarioFormat = ref('')
  const personalityFormat = ref('')
  const groupNudgePrompt = ref('')
  const newChatPrompt = ref('')
  const newGroupChatPrompt = ref('')
  const newExampleChatPrompt = ref('')
  const continueNudgePrompt = ref('')
  const sendIfEmptyPrompt = ref('')
  
  // Добавьте методы для сохранения и загрузки промптов, если необходимо
  </script>
  
  <i18n>
  {
    "en": {
      "prompts": "Prompts",
      "quickPromptsEdit": "Quick Prompts Edit",
      "utilityPrompts": "Utility Prompts",
      "mainPrompt": "Main Prompt",
      "nsfwPrompt": "Auxiliary Prompt",
      "jailbreakPrompt": "Post-History Instructions",
      "impersonationPrompt": "Impersonation Prompt",
      "worldInfoFormat": "World Info Format Template",
      "scenarioFormat": "Scenario Format Template",
      "personalityFormat": "Personality Format Template",
      "groupNudgePrompt": "Group Nudge Prompt Template",
      "newChatPrompt": "New Chat",
      "newGroupChatPrompt": "New Group Chat",
      "newExampleChatPrompt": "New Example Chat",
      "continueNudgePrompt": "Continue Nudge",
      "sendIfEmptyPrompt": "Replace Empty Message"
    },
    "ru": {
      "prompts": "Промпты",
      "quickPromptsEdit": "Быстрое редактирование промптов",
      "utilityPrompts": "Служебные промпты",
      "mainPrompt": "Основной Промпт",
      "nsfwPrompt": "Вспомогательный Промпт",
      "jailbreakPrompt": "Инструкции после истории",
      "impersonationPrompt": "Промпт для перевоплощения",
      "worldInfoFormat": "Шаблон оформления информации о мире",
      "scenarioFormat": "Шаблон оформления сценария",
      "personalityFormat": "Шаблон оформления характера",
      "groupNudgePrompt": "Шаблон промпта-подсказки для групп",
      "newChatPrompt": "Новый чат",
      "newGroupChatPrompt": "Новый групповой чат",
      "newExampleChatPrompt": "Новый образец чата",
      "continueNudgePrompt": "Подсказка для продолжения",
      "sendIfEmptyPrompt": "Заменять пустые сообщения"
    }
  }
  </i18n>
  
  <style scoped>
  .prompts {
    /* Стили для раздела Промптов */
  }
  
  .collapsible-section {
    margin-bottom: 1rem;
    background: #3a3a3a;
    border-radius: 8px;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    cursor: pointer;
    background: #444;
    border-radius: 8px;
  }
  
  .section-header:hover {
    background: #555;
  }
  
  .section-content {
    padding: 1rem;
  }
  
  .prompt-item {
    margin-bottom: 1rem;
  }
  
  .prompt-item label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .prompt-item textarea {
    width: 100%;
    padding: 0.5rem;
    background: #444;
    border: 1px solid #555;
    color: white;
    border-radius: 4px;
    resize: vertical;
  }
  </style>