<!-- components/ModelSettings/OtherModelSettings.vue -->
<template>
    <div class="model-settings">
      <!-- Контекст (в токенах) -->
      <div class="setting-item">
        <label>{{ t('contextSize') }}</label>
        <input
          type="range"
          v-model="contextSize"
          :min="512"
          :max="8192"
          step="64"
        />
        <input
          type="number"
          v-model="contextSize"
          :min="512"
          :max="8192"
          step="64"
        />
      </div>
  
      <!-- Top K -->
      <div class="setting-item">
        <label>{{ t('topK') }}</label>
        <input
          type="range"
          v-model="topK"
          min="0"
          max="100"
          step="1"
        />
        <input
          type="number"
          v-model="topK"
          min="0"
          max="100"
          step="1"
        />
      </div>
  
      <!-- Typical P -->
      <div class="setting-item">
        <label>{{ t('typicalP') }}</label>
        <input
          type="range"
          v-model="typicalP"
          min="0"
          max="1"
          step="0.001"
        />
        <input
          type="number"
          v-model="typicalP"
          min="0"
          max="1"
          step="0.001"
        />
      </div>
  
      <!-- Repetition Penalty -->
      <div class="setting-item">
        <label>{{ t('repetitionPenalty') }}</label>
        <input
          type="range"
          v-model="repetitionPenalty"
          min="1"
          max="3"
          step="0.01"
        />
        <input
          type="number"
          v-model="repetitionPenalty"
          min="1"
          max="3"
          step="0.01"
        />
      </div>
  
      <!-- Добавь другие настройки для других моделей -->
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  const { t } = useI18n({
    useScope: 'local'
  });
  
  const contextSize = ref(2048);
  const topK = ref(40);
  const typicalP = ref(0.95);
  const repetitionPenalty = ref(1.1);
  
  // Добавь другие переменные настроек для других моделей
  </script>
  
  <i18n>
  {
    "en": {
      "contextSize": "Context Size (tokens)",
      "topK": "Top K",
      "typicalP": "Typical P",
      "repetitionPenalty": "Repetition Penalty"
    },
    "ru": {
      "contextSize": "Контекст (в токенах)",
      "topK": "Top K",
      "typicalP": "Typical P",
      "repetitionPenalty": "Штраф за повтор"
    }
  }
  </i18n>
  
  <style scoped>
  .model-settings {
    /* Стили для настроек моделей */
  }
  
  .setting-item {
    margin-bottom: 1rem;
  }
  
  .setting-item label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .setting-item input[type='range'] {
    width: 100%;
  }
  
  .setting-item input[type='number'] {
    width: 100%;
    padding: 0.25rem;
    margin-top: 0.5rem;
    background: #444;
    border: none;
    color: white;
  }
  </style>