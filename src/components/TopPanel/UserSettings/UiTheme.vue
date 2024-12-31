<template>
    <div class="section">
      <h4 class="section-subheader">{{ t("UI Theme") }}</h4>
      <!-- Управление темами -->
      <div class="preset-manager">
        <div class="preset-selector">
          <select id="themes" class="select-input" v-model="selectedTheme">
            <option v-for="theme in themes" :key="theme" :value="theme">
              {{ theme }}
            </option>
          </select>
          <button
            id="ui-preset-update-button"
            class="icon-button"
            :title="t('Update a theme file')"
            @click="updateTheme"
          >
            <i class="fa-solid fa-save"></i>
          </button>
          <button
            id="ui-preset-save-button"
            class="icon-button"
            :title="t('Save as a new theme')"
            @click="saveThemeAs"
          >
            <i class="fa-solid fa-file-circle-plus"></i>
          </button>
        </div>
        <div class="preset-actions">
          <button
            id="ui_preset_import_button"
            class="icon-button"
            :title="t('Import a theme file')"
            @click="importTheme"
          >
            <i class="fa-solid fa-file-import"></i>
          </button>
          <button
            id="ui_preset_export_button"
            class="icon-button"
            :title="t('Export a theme file')"
            @click="exportTheme"
          >
            <i class="fa-solid fa-file-export"></i>
          </button>
          <button
            id="ui-preset-delete-button"
            class="icon-button"
            :title="t('Delete a theme')"
            @click="deleteTheme"
          >
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
        <!-- Скрытый input для импорта -->
        <input
          type="file"
          id="ui_preset_import_file"
          accept=".json"
          hidden
          @change="handleThemeImport"
        />
      </div>
  
      <!-- Настройки стиля аватаров и чата -->
      <div class="form-group">
        <label for="avatar_style">{{ t("Avatar Style") }}</label>
        <select id="avatar_style" class="select-input">
          <option value="0">{{ t("Circle") }}</option>
          <option value="2">{{ t("Square") }}</option>
          <option value="1">{{ t("Rectangle") }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="chat_display">{{ t("Chat Style") }}</label>
        <select id="chat_display" class="select-input">
          <option value="0">{{ t("Standard") }}</option>
          <option value="1">{{ t("Bubbles") }}</option>
          <option value="2">{{ t("Document") }}</option>
        </select>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  
  const { t } = useI18n({
    useScope: "local",
  });
  
  const themes = [
    "Azure",
    "Cappuccino",
    "Celestial Macaron",
    "Dark Lite",
    "Dark V 1.0",
  ];
  
  const selectedTheme = ref(themes[0]);
  
  // Методы для управления темами
  const importTheme = () => {};
  const exportTheme = () => {};
  const updateTheme = () => {};
  const saveThemeAs = () => {};
  const deleteTheme = () => {};
  const handleThemeImport = () => {};
  </script>
  
  <i18n>
  {
    "en": {
      "UI Theme": "UI Theme",
      "Update a theme file": "Update a theme file",
      "Save as a new theme": "Save as a new theme",
      "Import a theme file": "Import a theme file",
      "Export a theme file": "Export a theme file",
      "Delete a theme": "Delete a theme",
      "Avatar Style": "Avatar Style",
      "Circle": "Circle",
      "Square": "Square",
      "Rectangle": "Rectangle",
      "Chat Style": "Chat Style",
      "Standard": "Standard",
      "Bubbles": "Bubbles",
      "Document": "Document"
    },
    "ru": {
      "UI Theme": "Тема интерфейса",
      "Update a theme file": "Обновить файл темы",
      "Save as a new theme": "Сохранить как новую тему",
      "Import a theme file": "Импортировать файл темы",
      "Export a theme file": "Экспортировать файл темы",
      "Delete a theme": "Удалить тему",
      "Avatar Style": "Стиль аватара",
      "Circle": "Круг",
      "Square": "Квадрат",
      "Rectangle": "Прямоугольник",
      "Chat Style": "Стиль чата",
      "Standard": "Стандартный",
      "Bubbles": "Пузыри",
      "Document": "Документ"
    }
  }
  </i18n>
  
  <style scoped>
  .section {
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .section-subheader {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  .preset-manager {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .preset-selector,
  .preset-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .select-input {
    flex: 1;
    padding: 0.5rem;
  }
  
  .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #007bff;
    font-size: 1.2rem;
  }
  
  .icon-button:hover {
    color: #0056b3;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  </style>