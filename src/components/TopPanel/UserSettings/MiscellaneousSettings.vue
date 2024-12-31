<template>
    <div class="section">
      <h4 class="section-subheader">{{ t("Miscellaneous") }}</h4>
      <!-- Добавьте настройки раздела "Разное" -->
      <div class="form-group">
        <button id="reload_chat" class="menu-button" @click="reloadChat">
          {{ t("Reload Chat") }}
        </button>
        <button id="debug_menu" class="menu-button" @click="openDebugMenu">
          {{ t("Debug Menu") }}
        </button>
      </div>
      <!-- Добавьте остальные настройки -->
    </div>
  </template>
  
  <script setup>
  import { useI18n } from "vue-i18n";
  
  const { t } = useI18n({
    useScope: "local",
  });
  
  const reloadChat = () => {};
  const openDebugMenu = () => {};
  </script>
  
  <i18n>
  {
    "en": {
      "Miscellaneous": "Miscellaneous",
      "Reload Chat": "Reload Chat",
      "Debug Menu": "Debug Menu"
    },
    "ru": {
      "Miscellaneous": "Разное",
      "Reload Chat": "Перезагрузить чат",
      "Debug Menu": "Меню отладки"
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
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .menu-button {
    padding: 0.5rem 1rem;
    background: #444;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  .menu-button:hover {
    background: #666;
  }
  </style>