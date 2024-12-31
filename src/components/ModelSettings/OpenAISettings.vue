<!-- components/ModelSettings/OpenAISettings.vue -->
<template>
    <div class="model-settings">
      <!-- Ответ (в токенах) -->
      <div class="setting-item">
        <label>{{ t('responseTokens') }}</label>
        <input
          type="range"
          v-model="responseTokens"
          :min="1"
          :max="maxResponseTokens"
          step="1"
        />
        <input
          type="number"
          v-model="responseTokens"
          :min="1"
          :max="maxResponseTokens"
          step="1"
        />
      </div>
  
      <!-- Неограниченный размер контекста -->
      <div class="setting-item checkbox-item">
        <label>
          <input type="checkbox" v-model="unlimitedContext" />
          {{ t('unlimitedContext') }}
        </label>
      </div>
  
      <!-- Контекст (в токенах) -->
      <div class="setting-item">
        <label>{{ t('contextSize') }}</label>
        <input
          type="range"
          v-model="contextSize"
          :min="minContextSize"
          :max="currentMaxContextSize"
          step="1"
        />
        <input
          type="number"
          v-model="contextSize"
          :min="minContextSize"
          :max="currentMaxContextSize"
          step="1"
        />
        <small>{{ t('contextSizeInfo', { max: currentMaxContextSize }) }}</small>
      </div>
  
      <!-- Температура -->
      <div class="setting-item">
        <label>{{ t('temperature') }}</label>
        <input
          type="range"
          v-model="temperature"
          min="0"
          max="2"
          step="0.01"
        />
        <input
          type="number"
          v-model="temperature"
          min="0"
          max="2"
          step="0.01"
        />
      </div>
  
      <!-- Top P -->
      <div class="setting-item">
        <label>{{ t('topP') }}</label>
        <input
          type="range"
          v-model="topP"
          min="0"
          max="1"
          step="0.01"
        />
        <input
          type="number"
          v-model="topP"
          min="0"
          max="1"
          step="0.01"
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
  
      <!-- Repetition Penalty -->
      <div class="setting-item">
        <label>{{ t('repetitionPenalty') }}</label>
        <input
          type="range"
          v-model="repetitionPenalty"
          min="0.5"
          max="2.0"
          step="0.01"
        />
        <input
          type="number"
          v-model="repetitionPenalty"
          min="0.5"
          max="2.0"
          step="0.01"
        />
      </div>
  
      <!-- Presence Penalty -->
      <div class="setting-item">
        <label>{{ t('presencePenalty') }}</label>
        <input
          type="range"
          v-model="presencePenalty"
          min="-2.0"
          max="2.0"
          step="0.01"
        />
        <input
          type="number"
          v-model="presencePenalty"
          min="-2.0"
          max="2.0"
          step="0.01"
        />
      </div>
  
      <!-- Frequency Penalty -->
      <div class="setting-item">
        <label>{{ t('frequencyPenalty') }}</label>
        <input
          type="range"
          v-model="frequencyPenalty"
          min="-2.0"
          max="2.0"
          step="0.01"
        />
        <input
          type="number"
          v-model="frequencyPenalty"
          min="-2.0"
          max="2.0"
          step="0.01"
        />
      </div>
  
      <!-- Seed -->
      <div class="setting-item">
        <label>{{ t('seed') }}</label>
        <input type="number" v-model="seed" min="-1" max="2147483647" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useModelStore } from '@/stores/modelStore';
  
  const { t } = useI18n({
    useScope: 'local'
  });
  
  const modelStore = useModelStore();
  
  // Значения максимального контекста для разных моделей
  const modelContextSizes: { [key: string]: number } = {
    // GPT-3.5 Turbo
    'gpt-3.5-turbo': 4096,
    'gpt-3.5-turbo-0125': 4096,
    'gpt-3.5-turbo-1106': 4096,
    'gpt-3.5-turbo-0613': 4096,
    'gpt-3.5-turbo-0301': 4096,
    'gpt-3.5-turbo-16k': 16384,
    'gpt-3.5-turbo-16k-0613': 16384,
    'gpt-3.5-turbo-instruct': 4096,
    'gpt-3.5-turbo-instruct-0914': 4096,
  
    // GPT-4
    'gpt-4': 8192,
    'gpt-4-0613': 8192,
    'gpt-4-0314': 8192,
    'gpt-4-32k': 32768,
    'gpt-4-32k-0613': 32768,
    'gpt-4-32k-0314': 32768,
  
    // GPT-4o
    'gpt-4o': 128000,
    'gpt-4o-2024-11-20': 128000,
    'gpt-4o-2024-08-06': 128000,
    'gpt-4o-2024-05-13': 128000,
    'chatgpt-4o-latest': 128000,
  
    // GPT-4o-mini
    'gpt-4o-mini': 128000,
    'gpt-4o-mini-2024-07-18': 128000,
  
    // GPT-4 Turbo
    'gpt-4-turbo': 128000,
    'gpt-4-turbo-2024-04-09': 128000,
    'gpt-4-turbo-preview': 128000,
    'gpt-4-vision-preview': 8192,
    'gpt-4-0125-preview': 8192,
    'gpt-4-1106-preview': 8192,
  
    // o1
    'o1-preview': 128000,
    'o1-mini': 128000,
  
    // Other models
    'text-davinci-003': 4097,
    'text-davinci-002': 4097,
    'text-curie-001': 2049,
    'text-babbage-001': 2049,
    'text-ada-001': 2049,
    'code-davinci-002': 8001,
    // Добавьте другие модели и их контекстные размеры, если необходимо
  };
  
  // Переменная для хранения состояния чекбокса "Неограниченный контекст"
  const unlimitedContext = ref(false);
  
  // Минимальный размер контекста
  const minContextSize = computed(() => {
    return 0;
  });
  
  // Максимальный размер контекста для выбранной модели
  const maxContextSize = computed(() => {
    const model = modelStore.modelName;
    return modelContextSizes[model] || 4096; // По умолчанию 4096
  });
  
  // Текущий максимальный размер контекста (учитывая состояние чекбокса)
  const currentMaxContextSize = computed(() => {
    return unlimitedContext.value ? 2000000 : maxContextSize.value;
  });
  
  // Значения максимального размера ответа
  const maxResponseTokens = computed(() => {
    // Можно установить максимальный размер ответа меньше контекста, если необходимо
    return currentMaxContextSize.value;
  });
  
  // Общий размер контекста (устанавливаем в пределах допустимого диапазона)
  const contextSize = ref(maxContextSize.value);
  
  // Следим за изменением модели и обновляем контекстные размеры
  watch(
    () => modelStore.modelName,
    () => {
      if (!unlimitedContext.value) {
        contextSize.value = maxContextSize.value;
      }
      responseTokens.value = Math.min(responseTokens.value, maxResponseTokens.value);
    }
  );
  
  // Следим за изменением contextSize и ограничиваем его в пределах допустимых значений
  watch(contextSize, (newValue) => {
    if (newValue > currentMaxContextSize.value) {
      contextSize.value = currentMaxContextSize.value;
    } else if (newValue < minContextSize.value) {
      contextSize.value = minContextSize.value;
    }
  });
  
  // Следим за изменением чекбокса unlimitedContext
  watch(unlimitedContext, (newValue) => {
    if (newValue) {
      // Если включен неограниченный контекст, увеличиваем текущий максимальный размер
      contextSize.value = currentMaxContextSize.value;
    } else {
      // Если выключен, возвращаемся к максимальному размеру для модели
      if (contextSize.value > maxContextSize.value) {
        contextSize.value = maxContextSize.value;
      }
    }
  });
  
  // Ответ (в токенах)
  const responseTokens = ref(50);
  const temperature = ref(1.0);
  const topP = ref(0.9);
  const topK = ref(0);
  const repetitionPenalty = ref(1.0);
  const presencePenalty = ref(0.0);
  const frequencyPenalty = ref(0.0);
  const seed = ref(-1);
  </script>
  
  <i18n>
  {
    "en": {
      "unlimitedContext": "Unlimited Context Size",
      "responseTokens": "Response (in tokens)",
      "contextSize": "Context Size (tokens)",
      "contextSizeInfo": "Max context size for this model is {max} tokens.",
      "temperature": "Temperature",
      "topP": "Top P",
      "topK": "Top K",
      "repetitionPenalty": "Repetition Penalty",
      "presencePenalty": "Presence Penalty",
      "frequencyPenalty": "Frequency Penalty",
      "seed": "Seed"
    },
    "ru": {
      "unlimitedContext": "Неограниченный размер контекста",
      "responseTokens": "Ответ (в токенах)",
      "contextSize": "Контекст (в токенах)",
      "contextSizeInfo": "Максимальный размер контекста для этой модели - {max} токенов.",
      "temperature": "Температура",
      "topP": "Top P",
      "topK": "Top K",
      "repetitionPenalty": "Штраф за повторение",
      "presencePenalty": "Штраф за присутствие",
      "frequencyPenalty": "Штраф за частоту",
      "seed": "Зерно"
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
  
  .checkbox-item label {
    display: flex;
    align-items: center;
  }
  
  .checkbox-item input[type='checkbox'] {
    margin-right: 0.5rem;
  }
  
  .small {
    font-size: 0.85rem;
    color: #aaa;
  }
  </style>