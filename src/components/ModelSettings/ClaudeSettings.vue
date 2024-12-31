<!-- components/ModelSettings/ClaudeSettings.vue -->
<template>
    <div class="model-settings">
      <!-- Настройки, специфичные для Claude -->
      <div class="setting-item">
        <label>{{ t('maxOutputTokens') }}</label>
        <input type="number" v-model="maxOutputTokens" min="1" max="10000" />
      </div>
      <!-- Добавь остальные настройки Claude -->
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  const { t } = useI18n({
    useScope: 'local'
  });
  
  const maxOutputTokens = ref(2048);
  // Объяви остальные переменные для настроек Claude
  </script>
  
  <style scoped>
  /* Стили для настроек моделей */
  .model-settings {
    /* Твои стили */
  }
  </style>
  
  <i18n>
  {
    "en": {
      "maxOutputTokens": "Max Output Tokens"
    },
    "ru": {
      "maxOutputTokens": "Макс. Количество Токенов"
    }
  }
  </i18n>