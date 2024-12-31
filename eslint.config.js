// eslint.config.js

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import js from '@eslint/js';
import vuePlugin from 'eslint-plugin-vue';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Если тебе не нужен __dirname, можешь убрать его использование
// или заменить resolvePluginsRelativeTo: __dirname на process.cwd()

export default [
  // Игнорируем ненужные директории
  {
    ignores: ['node_modules', '.nuxt', '.output', 'dist', 'public', 'date'],
  },
  // Базовые настройки из @eslint/js
  js.configs.recommended,
  // Конфигурация для файлов Vue
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    processor: vuePlugin.processors['.vue'],
    rules: {
      ...vuePlugin.configs['recommended'].rules,
      ...vuePlugin.configs['vue3-recommended'].rules,
      ...typescriptPlugin.configs['recommended'].rules,
      // Твои правила
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
  // Конфигурация для файлов TypeScript и JavaScript
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      import: importPlugin,
    },
    rules: {
      ...typescriptPlugin.configs['recommended'].rules,
      // Твои правила
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
