<!-- components/LeftPanel/Presets.vue -->
<template>
  <div class="presets">
    <h4>{{ t('openAIPresets') }}</h4>
    <div class="preset-controls">
      <select v-model="selectedPreset" class="select-input">
        <option
          v-for="preset in openAIPresets"
          :key="preset.value"
          :value="preset.value"
        >
          {{ preset.name }}
        </option>
      </select>
      <div class="preset-buttons">
        <button @click="updatePreset" :title="t('updatePreset')" class="icon-button">
          <i class="fa-solid fa-save"></i>
        </button>
        <button @click="savePresetAs" :title="t('savePresetAs')" class="icon-button">
          <i class="fa-solid fa-file-circle-plus"></i>
        </button>
        <button @click="importPreset" :title="t('importPreset')" class="icon-button">
          <i class="fa-solid fa-file-import"></i>
        </button>
        <button @click="exportPreset" :title="t('exportPreset')" class="icon-button">
          <i class="fa-solid fa-file-export"></i>
        </button>
        <button @click="deletePreset" :title="t('deletePreset')" class="icon-button">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
    <!-- Добавьте остальные элементы управления пресетами, если необходимо -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'local'
})

const selectedPreset = ref(null)
const openAIPresets = ref([
  { name: 'Default', value: 'default' },
  { name: 'Claude', value: 'claude' },
  // Добавьте остальные пресеты
])

const updatePreset = () => {
  // Ваш код для обновления пресета
}

const savePresetAs = () => {
  // Ваш код для сохранения пресета
}

const importPreset = () => {
  // Ваш код для импорта пресета
}

const exportPreset = () => {
  // Ваш код для экспорта пресета
}

const deletePreset = () => {
  // Ваш код для удаления пресета
}
</script>

<i18n>
{
  "en": {
    "openAIPresets": "Presets for OpenAI",
    "updatePreset": "Update current preset",
    "savePresetAs": "Save preset as",
    "importPreset": "Import preset",
    "exportPreset": "Export preset",
    "deletePreset": "Delete preset"
  },
  "ru": {
    "openAIPresets": "Пресеты для OpenAI",
    "updatePreset": "Обновить текущий пресет",
    "savePresetAs": "Сохранить пресет как",
    "importPreset": "Импортировать пресет",
    "exportPreset": "Экспортировать пресет",
    "deletePreset": "Удалить пресет"
  }
}
</i18n>

<style scoped>
.presets {
  background: #3a3a3a;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.preset-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.select-input {
  flex: 1;
  padding: 0.5rem;
  background: #444;
  border: 1px solid #555;
  color: white;
  border-radius: 4px;
}

.preset-buttons {
  display: flex;
  gap: 0.5rem;
}

.icon-button {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.2s, color 0.2s;
}

.icon-button:hover {
  background: #555;
  color: #fff;
}
</style>