<!-- components/LeftPanel/MainSettings.vue -->
<template>
  <div class="main-settings">
    <!-- Общие настройки, доступные для всех моделей -->
    <!-- Стриминг текста -->
    <div class="setting-item checkbox-item">
      <label>
        <input type="checkbox" v-model="streamingText" />
        {{ t('streamingText') }}
      </label>
    </div>

    <!-- Динамический компонент настроек модели -->
    <component :is="currentModelSettingsComponent" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useModelStore } from '@/stores/modelStore';

// Импорт компонентов настроек моделей
import OpenAISettings from '@/components/ModelSettings/OpenAISettings.vue';
import OtherModelSettings from '@/components/ModelSettings/OtherModelSettings.vue';
// Добавь другие компоненты настроек по мере необходимости

const { t } = useI18n({
  useScope: 'local'
});

const modelStore = useModelStore();

// Общие настройки
const streamingText = ref(true);
// Добавь другие общие настройки, если есть

// Определяем, какой компонент настроек отображать
const currentModelSettingsComponent = computed(() => {
  const apiSource = modelStore.apiSource;

  if (apiSource === 'openai') {
    return OpenAISettings;
  } else if (apiSource === 'other') {
    return OtherModelSettings;
  }
  // Добавь другие условия для других моделей
  else {
    return null; // Или компонент с сообщением "Настройки недоступны"
  }
});
</script>

<i18n>
{
  "en": {
    "streamingText": "Streaming Text"
  },
  "ru": {
    "streamingText": "Стриминг текста"
  }
}
</i18n>

<style scoped>
.main-settings {
  /* Стили для основных настроек */
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

.checkbox-item label {
  display: flex;
  align-items: center;
}

.checkbox-item input[type='checkbox'] {
  margin-right: 0.5rem;
}
</style>