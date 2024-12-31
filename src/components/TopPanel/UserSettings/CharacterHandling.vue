<template>
    <div class="section">
      <h4 class="section-subheader">{{ t("Character Handling") }}</h4>
      <div class="form-group">
        <label for="aux_field">{{ t("Char List Subheader") }}</label>
        <select id="aux_field" class="select-input">
          <option value="character_version">{{ t("Character Version") }}</option>
          <option value="creator">{{ t("Created by") }}</option>
        </select>
      </div>
      <!-- Добавьте остальные настройки обработки персонажей -->
      <div class="checkbox-group">
        <label class="checkbox-label" :title="t('Explanation for fuzzy search')">
          <input
            id="fuzzy_search_checkbox"
            type="checkbox"
            v-model="settings.fuzzySearch"
          />
          {{ t("Advanced Character Search") }}
        </label>
        <!-- Добавьте остальные переключатели -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { inject } from "vue";
  import { useI18n } from "vue-i18n";
  
  const settings = inject("settings");
  
  const { t } = useI18n({
    useScope: "local",
  });
  </script>
  
  <i18n>
  {
    "en": {
      "Character Handling": "Character Handling",
      "Char List Subheader": "Char List Subheader",
      "Character Version": "Character Version",
      "Created by": "Created by",
      "Advanced Character Search": "Advanced Character Search",
      "Explanation for fuzzy search": "Use fuzzy matching, and search characters by all data fields, not just by name"
    },
    "ru": {
      "Character Handling": "Обработка персонажа",
      "Char List Subheader": "Подзаголовок в списке персонажей",
      "Character Version": "Версия персонажа",
      "Created by": "Автор",
      "Advanced Character Search": "Расширенный поиск по персонажам",
      "Explanation for fuzzy search": "Искать персонажей по всем полям данных, а не только по имени"
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
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .select-input {
    width: 100%;
    padding: 0.5rem;
  }
  
  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  </style>