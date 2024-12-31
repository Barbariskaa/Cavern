<template>
    <div>
      <!-- Здесь размести содержимое настроек для Chat Translation -->
      <h4>{{ t("chatTranslation") }}</h4>
      <!-- Остальной код настроек -->
    </div>
  </template>
  
  <script setup>
  import { useI18n } from "vue-i18n";
  const { t } = useI18n();
  </script>
  
  <style scoped>
  /* Стили для TranslationContainer.vue при необходимости */
  </style>
  
  <i18n lang="json">
  {
    "en": {
      "chatTranslation": "Chat Translation"
    },
    "ru": {
      "chatTranslation": "Перевод чата"
    }
  }
  </i18n>