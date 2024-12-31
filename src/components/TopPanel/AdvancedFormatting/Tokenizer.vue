<!-- src/components/TopPanel/AdvancedFormatting/Tokenizer.vue -->
<template>
    <div class="tokenizer-settings">
      <div class="tokenizer-selector">
        <h4 class="standout-header">
          <span>{{ t("Tokenizer") }}</span>
          <a
            :href="t('tokenizer_link')"
            class="info-link"
            target="_blank"
          >
            <span
              class="fa-solid fa-circle-question info-icon"
            ></span>
          </a>
        </h4>
        <select
          id="tokenizer"
          class="select-input"
          v-model="tokenizerStore.selectedTokenizer"
        >
          <option
            v-for="tokenizer in tokenizerStore.tokenizers"
            :key="tokenizer.value"
            :value="tokenizer.value"
          >
            {{ tokenizer.label }}
          </option>
        </select>
      </div>
      <!-- Остальные элементы -->
    </div>
  </template>
  
  <script setup>
  import { useTokenizerStore } from "@/stores/tokenizer";
  import { useI18n } from "vue-i18n";
  
  const { t } = useI18n({ useScope: "local" });
  const tokenizerStore = useTokenizerStore();
  </script>

<style scoped>
.tokenizer-settings {
    background: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
}

.standout-header {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.info-link {
    color: #007bff;
    text-decoration: none;
}

.info-icon {
    cursor: pointer;
    color: #6c757d;
}

.info-link:hover .info-icon {
    color: #0056b3;
}

.tokenizer-selector {
    margin-bottom: 1rem;
}

.select-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-group {
    margin-bottom: 1rem;
}

.input-text {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>