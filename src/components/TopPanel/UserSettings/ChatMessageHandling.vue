<template>
    <div class="section">
      <h4 class="section-subheader">{{ t("Chat/Message Handling") }}</h4>
      <!-- Добавьте настройки обработки чата и сообщений -->
      <!-- Например, слайдеры, чекбоксы и т.д. -->
      <div class="form-group">
        <label for="chat_truncation">{{ t("Messages to Load") }}</label>
        <input
          type="number"
          id="chat_truncation"
          class="input-number"
          v-model="settings.chatTruncation"
          min="0"
        />
        <small>{{ t("(0 = All)") }}</small>
      </div>
      <!-- Добавьте остальные настройки -->
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
      "Chat/Message Handling": "Chat/Message Handling",
      "Messages to Load": "Messages to Load",
      "(0 = All)": "(0 = All)"
    },
    "ru": {
      "Chat/Message Handling": "Обработка чата и сообщений",
      "Messages to Load": "Сколько сообщений загружать",
      "(0 = All)": "(0 = все)"
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
  
  .input-number {
    width: 100%;
    padding: 0.5rem;
  }
  </style>