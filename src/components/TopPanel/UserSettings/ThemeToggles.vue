<template>
    <div class="section">
      <!-- Тогглы тем оформления -->
      <h4 class="section-subheader">{{ t("Theme Toggles") }}</h4>
      <div class="checkbox-group">
        <label class="checkbox-label" :title="t('Disables animations and transitions')">
          <input
            id="reduced_motion"
            type="checkbox"
            v-model="settings.reducedMotion"
          />
          {{ t("Reduced Motion") }}
        </label>
        <label class="checkbox-label" :title="t('Removes blur from window backgrounds')">
          <input
            id="fast_ui_mode"
            type="checkbox"
            v-model="settings.fastUIMode"
          />
          {{ t("No Blur Effect") }}
        </label>
        <!-- Добавьте остальные переключатели по необходимости -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { inject } from "vue";
  import { useI18n } from "vue-i18n";
  
  const settings = inject("settings"); // Теперь settings доступен
  
  const { t } = useI18n({
    useScope: "local",
  });
  </script>  
  
  <i18n>
  {
    "en": {
      "Theme Toggles": "Theme Toggles",
      "Reduced Motion": "Reduced Motion",
      "No Blur Effect": "No Blur Effect",
      "Disables animations and transitions": "Disables animations and transitions",
      "Removes blur from window backgrounds": "Removes blur from window backgrounds"
    },
    "ru": {
      "Theme Toggles": "Переключатели темы",
      "Reduced Motion": "Отключить анимации",
      "No Blur Effect": "Без размытия",
      "Disables animations and transitions": "Отключает анимации и переходы",
      "Removes blur from window backgrounds": "Убирает размытие заднего фона окна"
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