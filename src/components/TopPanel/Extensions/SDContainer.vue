<template>
    <div>
      <!-- Здесь размести содержимое настроек для Image Generation -->
      <h4>{{ t("imageGeneration") }}</h4>
      <!-- Остальной код настроек -->
    </div>
  </template>
  
  <script setup>
  import { useI18n } from "vue-i18n";
  const { t } = useI18n();
  </script>
  
  <style scoped>
  /* Стили для SDContainer.vue при необходимости */
  </style>
  
  <i18n lang="json">
  {
    "en": {
      "imageGeneration": "Image Generation"
    },
    "ru": {
      "imageGeneration": "Генерация изображений"
    }
  }
  </i18n>