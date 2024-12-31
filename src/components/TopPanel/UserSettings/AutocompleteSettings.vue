<template>
    <div class="section">
      <div
        class="inline-drawer"
        :class="{ open: isDrawerOpen }"
      >
        <div
          class="inline-drawer-toggle"
          @click="toggleDrawer"
          :title="t('Options for the various autocomplete input boxes.')"
        >
          <b>{{ t("AutoComplete Settings") }}</b>
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
          <!-- Добавьте настройки автозаполнения -->
          <!-- Например, чекбоксы и селекторы -->
          <label class="checkbox-label">
            <input
              id="stscript_autocomplete_autoHide"
              type="checkbox"
              v-model="settings.autoHideAutocomplete"
            />
            {{ t("Automatically hide details") }}
          </label>
          <!-- Добавьте остальные настройки -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { inject, ref } from "vue";
  import { useI18n } from "vue-i18n";
  
  const settings = inject("settings");
  
  const isDrawerOpen = ref(false);
  
  const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value;
  };
  
  const { t } = useI18n({
    useScope: "local",
  });
  </script>
  
  <i18n>
  {
    "en": {
      "AutoComplete Settings": "AutoComplete Settings",
      "Options for the various autocomplete input boxes.": "Options for the various autocomplete input boxes.",
      "Automatically hide details": "Automatically hide details"
    },
    "ru": {
      "AutoComplete Settings": "Настройки автозаполнения",
      "Options for the various autocomplete input boxes.": "Опции для различных полей автозаполнения.",
      "Automatically hide details": "Автоматически скрывать детали"
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
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  </style>