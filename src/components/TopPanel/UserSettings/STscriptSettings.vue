<template>
    <div class="section">
      <h4 class="section-subheader">{{ t("STscript Settings") }}</h4>
      <!-- Добавьте настройки STscript -->
      <!-- Например, чекбоксы для флагов парсера -->
      <div class="checkbox-group">
        <label class="checkbox-label" :title="t('Explanation for STRICT_ESCAPING')">
          <input
            id="stscript_parser_flag_strict_escaping"
            type="checkbox"
            v-model="settings.strictEscaping"
          />
          {{ t("STRICT_ESCAPING") }}
        </label>
        <!-- Добавьте остальные флаги -->
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
      "STscript Settings": "STscript Settings",
      "Explanation for STRICT_ESCAPING": "Switch to stricter escaping, allowing all delimiting characters to be escaped with a backslash, and backslashes to be escaped as well.",
      "STRICT_ESCAPING": "STRICT_ESCAPING"
    },
    "ru": {
      "STscript Settings": "Настройки STscript",
      "Explanation for STRICT_ESCAPING": "Переключиться на более строгий режим экранирования, позволяющий экранировать все разделительные символы с помощью обратной косой черты, а также экранировать сами обратные косые черты.",
      "STRICT_ESCAPING": "STRICT_ESCAPING"
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