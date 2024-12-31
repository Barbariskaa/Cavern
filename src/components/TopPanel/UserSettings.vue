<!-- UserSettings.vue -->
<template>
    <div id="UserSettings" class="drawer-content">
      <!-- Заголовок и выбор языка интерфейса -->
      <div class="section-header">
        <h3 class="section-title">
          {{ t("User Settings") }}
          <a
            href="https://docs.sillytavern.app/usage/user_settings/"
            class="notes-link"
            target="_blank"
          >
            <i class="fa-solid fa-circle-question note-link-icon"></i>
          </a>
        </h3>
        <!-- Отображаем имя и версию приложения -->
        <small id="version_display">{{ appName }} {{ appVersion }}</small>
      </div>
      <div class="form-group">
        <label for="ui_language_select">{{ t("UI Language") }}</label>
        <select
          id="ui_language_select"
          class="select-input"
          v-model="settings.uiLanguage"
        >
          <option value="">{{ t("Default") }}</option>
          <option value="en">English</option>
          <option value="ar-sa">عربي (Arabic)</option>
          <option value="zh-cn">简体中文 (Simplified Chinese)</option>
          <option value="zh-tw">繁體中文 (Traditional Chinese)</option>
          <option value="nl-nl">Nederlands (Dutch)</option>
          <option value="de-de">Deutsch (German)</option>
          <option value="fr-fr">Français (French)</option>
          <option value="is-is">íslenska (Icelandic)</option>
          <option value="it-it">Italiano (Italian)</option>
          <option value="ja-jp">日本語 (Japanese)</option>
          <option value="ko-kr">한국어 (Korean)</option>
          <option value="pt-pt">Português (Brazilian Portuguese)</option>
          <option value="ru-ru">Русский (Russian)</option>
          <option value="es-es">Español (Spanish)</option>
          <option value="uk-ua">Українська (Ukrainian)</option>
          <option value="vi-vn">Tiếng Việt (Vietnamese)</option>
        </select>
      </div>
      <!-- Кнопки аккаунта и поиск -->
      <div class="account-and-search">
        <div class="account-buttons">
          <button
            id="account_button"
            class="menu-button"
            @click="openAccount"
          >
            <i class="fa-solid fa-user-shield"></i>
            {{ t("Account") }}
          </button>
          <button
            id="admin_button"
            class="menu-button"
            @click="openAdminPanel"
            style="display: none"
          >
            <i class="fa-solid fa-user-tie"></i>
            {{ t("Admin Panel") }}
          </button>
          <button
            id="logout_button"
            class="menu-button"
            @click="logout"
            style="display: none"
          >
            <i class="fa-solid fa-right-from-bracket"></i>
            {{ t("Logout") }}
          </button>
        </div>
        <!-- Поиск по настройкам -->
        <textarea
          id="settingsSearch"
          class="textarea-input"
          rows="1"
          :placeholder="t('Search Settings')"
          v-model="searchQuery"
        ></textarea>
      </div>
  
      <!-- Кнопки разделов -->
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
  
      <!-- Разделы -->
      <div v-if="activeSection === 'uiTheme'" class="section">
        <ui-theme></ui-theme>
      </div>
      <div v-else-if="activeSection === 'themeColors'" class="section">
        <theme-colors></theme-colors>
      </div>
      <div v-else-if="activeSection === 'themeToggles'" class="section">
        <theme-toggles></theme-toggles>
      </div>
      <div v-else-if="activeSection === 'characterHandling'" class="section">
        <character-handling></character-handling>
      </div>
      <div v-else-if="activeSection === 'miscellaneousSettings'" class="section">
        <miscellaneous-settings></miscellaneous-settings>
      </div>
      <div v-else-if="activeSection === 'chatMessageHandling'" class="section">
        <chat-message-handling></chat-message-handling>
      </div>
      <div v-else-if="activeSection === 'autocompleteSettings'" class="section">
        <autocomplete-settings></autocomplete-settings>
      </div>
      <div v-else-if="activeSection === 'stscriptSettings'" class="section">
        <stscript-settings></stscript-settings>
      </div>
      <!-- Добавь другие разделы по необходимости -->
    </div>
  </template>
  
  <script setup>
  import { ref, provide } from "vue";
  import { useI18n } from "vue-i18n";
  import { useRuntimeConfig } from "#app"; // Импортируй useRuntimeConfig
  
  // Импорт подкомпонентов
  import UiTheme from "./UserSettings/UiTheme.vue";
  import ThemeColors from "./UserSettings/ThemeColors.vue";
  import ThemeToggles from "./UserSettings/ThemeToggles.vue";
  import CharacterHandling from "./UserSettings/CharacterHandling.vue";
  import MiscellaneousSettings from "./UserSettings/MiscellaneousSettings.vue";
  import ChatMessageHandling from "./UserSettings/ChatMessageHandling.vue";
  import AutocompleteSettings from "./UserSettings/AutocompleteSettings.vue";
  import STscriptSettings from "./UserSettings/STscriptSettings.vue";
  
  const { t } = useI18n({
    useScope: "local",
  });
  
  const settings = ref({
    uiLanguage: "",
    reducedMotion: false,
    fastUIMode: false,
    // ... другие настройки
  });
  
  provide("settings", settings);

  const runtimeConfig = useRuntimeConfig();
  const appVersion = runtimeConfig.public.appVersion;
  const appName = runtimeConfig.public.appName;
  
  const searchQuery = ref("");
  
  const activeSection = ref("uiTheme");
  
  const sections = [
    { key: "uiTheme", title: "UI Theme" },
    { key: "themeColors", title: "Theme Colors" },
    { key: "themeToggles", title: "Theme Toggles" },
    { key: "characterHandling", title: "Character Handling" },
    { key: "miscellaneousSettings", title: "Miscellaneous" },
    { key: "chatMessageHandling", title: "Chat/Message Handling" },
    { key: "autocompleteSettings", title: "AutoComplete Settings" },
    { key: "stscriptSettings", title: "STscript Settings" },
    // Добавьте другие разделы по необходимости
  ];
  
  // Методы для управления аккаунтом (можешь добавить нужную логику)
  const openAccount = () => {};
  const openAdminPanel = () => {};
  const logout = () => {};
  </script>
  
  <i18n lang="json">
  {
    "en": {
      "UI Theme": "UI Theme",
      "Theme Colors": "Theme Colors",
      "Theme Toggles": "Theme Toggles",
      "Character Handling": "Character Handling",
      "Miscellaneous": "Miscellaneous",
      "Chat/Message Handling": "Chat/Message Handling",
      "AutoComplete Settings": "AutoComplete Settings",
      "STscript Settings": "STscript Settings",
      "User Settings": "User Settings",
      "UI Language": "UI Language",
      "Default": "Default",
      "Account": "Account",
      "Admin Panel": "Admin Panel",
      "Logout": "Logout",
      "Search Settings": "Search Settings",
      "Version": "Version"
    },
    "ru": {
      "UI Theme": "Тема интерфейса",
      "Theme Colors": "Цвета темы",
      "Theme Toggles": "Переключатели темы",
      "Character Handling": "Обработка персонажа",
      "Miscellaneous": "Разное",
      "Chat/Message Handling": "Обработка чата и сообщений",
      "AutoComplete Settings": "Настройки автозаполнения",
      "STscript Settings": "Настройки STscript",
      "User Settings": "Настройки пользователя",
      "UI Language": "Язык интерфейса",
      "Default": "По умолчанию",
      "Account": "Аккаунт",
      "Admin Panel": "Панель администратора",
      "Logout": "Выйти",
      "Search Settings": "Поиск по настройкам",
      "Version": "Версия"
    }
  }
  </i18n>
  
  <style scoped>
  .drawer-content {
    padding: 1rem;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .section-title {
    font-size: 1.5rem;
    margin: 0;
    display: flex;
    align-items: center;
  }
  
  .notes-link {
    margin-left: 0.5rem;
    color: #007bff;
    text-decoration: none;
  }
  
  .notes-link:hover {
    text-decoration: underline;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .textarea-input {
    width: 100%;
    padding: 0.5rem;
    resize: vertical;
    min-height: 40px;
  }
  
  .account-and-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .account-buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .menu-button {
    padding: 0.5rem 1rem;
    background: #444;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .menu-button:hover {
    background: #667;
  }
  
  .section-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .section-buttons button {
    padding: 0.5rem;
    background: #444;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  .section-buttons button.active {
    background: #667;
  }
  
  .section {
    margin-bottom: 1rem;
  }
  </style>