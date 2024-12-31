// stores/tokenizer.ts

import { defineStore } from 'pinia';

export const useTokenizerStore = defineStore('tokenizer', () => {
  const tokenizers = [
    { value: 'o200k_base', label: 'OpenAI (o200k_base)', key: 'o200k_base' },
    { value: 'Claude1/2', label: 'Anthropic Claude1/2', key: 'Claude1/2' },
    // Добавь другие токенайзеры по необходимости
  ];

  // Устанавливаем значение по умолчанию на 'o200k_base'
  const selectedTokenizer = ref<string>(tokenizers[0].value);

  return {
    tokenizers,
    selectedTokenizer,
  };
});