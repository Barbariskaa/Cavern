<template>
    <div class="section">
      <div
        class="inline-drawer"
        :class="{ open: isDrawerOpen }"
      >
        <div
          class="inline-drawer-toggle"
          @click="toggleDrawer"
          :title="t('Specify colors for your theme.')"
        >
          <b>{{ t("Theme Colors") }}</b>
          <i
            class="fa-solid"
            :class="[
              'inline-drawer-icon',
              'interactable',
              isDrawerOpen ? 'fa-circle-chevron-up' : 'fa-circle-chevron-down',
            ]"
            tabindex="0"
          ></i>
        </div>
        <div
          class="inline-drawer-content"
          v-show="isDrawerOpen"
        >
          <!-- Здесь можно добавить настройки цветов темы -->
          <!-- Например, с использованием color-picker компонентов -->
          <div class="color-picker-group">
            <div class="color-picker-item">
              <label>{{ t("Main Text") }}</label>
              <input type="color" v-model="mainTextColor" />
            </div>
            <!-- Добавьте остальные настройки цветов аналогично -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  
  const isDrawerOpen = ref(false);
  
  const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value;
  };
  
  const { t } = useI18n({
    useScope: "local",
  });
  
  // Цвета темы
  const mainTextColor = ref("#DCDCD2");
  // Добавьте остальные цвета
  </script>
  
<i18n>
{
  "en": {
    "Theme Colors": "Theme Colors",
    "Specify colors for your theme.": "Specify colors for your theme.",
    "Main Text": "Main Text"
  },
  "ru": {
    "Theme Colors": "Цвета темы",
    "Specify colors for your theme.": "Настройте цвета для вашей темы.",
    "Main Text": "Основной текст"
  }
}
</i18n>
  
  <style scoped>
  .section {
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .inline-drawer {
    width: 100%;
  }
  
  .inline-drawer-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  
  .inline-drawer-content {
    margin-top: 1rem;
  }
  
  .color-picker-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .color-picker-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .color-picker-item label {
    margin-bottom: 0.5rem;
  }
  </style>