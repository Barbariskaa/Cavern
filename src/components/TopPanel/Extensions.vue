<template>
    <div class="extensions-panel">
      <!-- Шапка с выпадающим списком -->
      <div class="extensions_block flex-container">
        <div class="alignitemscenter flex-container wide100p">
          <h3 class="margin0 flex1">{{ t("extensions") }}</h3>
          <label
            for="extensions_notify_updates"
            class="checkbox_label flexNoGap"
          >
            <input
              id="extensions_notify_updates"
              type="checkbox"
              v-model="notifyUpdates"
            />
            <span>{{ t("notifyOnExtensionUpdates") }}</span>
          </label>
          <!-- Выпадающий список вместо кнопок -->
          <select v-model="activeExtension" class="select-input">
            <option
              v-for="extension in extensions"
              :key="extension.key"
              :value="extension.key"
            >
              {{ t(extension.title) }}
            </option>
          </select>
        </div>
        <!-- Отображение выбранного расширения -->
        <div class="extension-content">
          <component :is="activeExtensionComponent"></component>
        </div>
        <hr class="wide100p margin0" />
        <div
          class="alignitemscenter flex-container justifyCenter wide100p"
          style="justify-content: space-between"
        >
          <h4 class="margin0">
            <span>{{ t("extrasApi") }}</span>
          </h4>
          <div class="flex-container">
            <div id="extensions_status">{{ connectionStatus }}</div>
            <label
              for="extensions_autoconnect"
              class="checkbox_label flexNoGap"
            >
              <input
                id="extensions_autoconnect"
                type="checkbox"
                v-model="autoConnect"
              />
              <span>{{ t("autoConnect") }}</span>
            </label>
          </div>
        </div>
        <div class="alignitemsflexstart flex-container wide100p">
          <input
            id="extensions_url"
            type="text"
            class="flex1 heightFitContent text_pole widthNatural"
            :placeholder="t('extrasApiUrlPlaceholder')"
            v-model="extensionsUrl"
          />
          <input
            id="extensions_api_key"
            type="text"
            class="flex1 heightFitContent text_pole widthNatural"
            :placeholder="t('extrasApiKeyPlaceholder')"
            v-model="extensionsApiKey"
          />
          <div class="extensions_url_block">
            <div
              id="extensions_connect"
              class="menu_button interactable"
              tabindex="0"
              @click="connectToExtensionsApi"
            >
              {{ t("connect") }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

// Импортируем компоненты расширений
import SDContainer from "./Extensions/SDContainer.vue";
import TranslationContainer from "./Extensions/TranslationContainer.vue";
// Добавьте импорт других компонентов расширений при необходимости

const { t } = useI18n();

// Реактивные данные
const notifyUpdates = ref(false);
const autoConnect = ref(false);
const extensionsUrl = ref("");
const extensionsApiKey = ref("");
const connectionStatus = ref(t("notConnected"));

// Массив доступных расширений
const extensions = [
  { key: "SDContainer", title: "Image Generation" },
  { key: "TranslationContainer", title: "Chat Translation" },
  // Добавьте другие расширения здесь
];

// Текущее активное расширение
const activeExtension = ref(extensions[0].key);

// Объект, сопоставляющий ключи расширений с компонентами
const extensionComponents = {
  SDContainer,
  TranslationContainer,
  // Добавьте другие компоненты здесь
};

// Вычисляемое свойство для получения активного компонента
const activeExtensionComponent = computed(() => {
  return extensionComponents[activeExtension.value];
});

// Методы
function manageExtensions() {
  // Логика управления расширениями
  console.log("Managing extensions...");
}

function installExtension() {
  // Логика установки расширения из Git репозитория
  console.log("Installing extension...");
}

function connectToExtensionsApi() {
  // Логика подключения к Extras API
  if (extensionsUrl.value) {
    // Здесь вы можете реализовать реальное подключение к API
    connectionStatus.value = t("connected");
    console.log("Connected to Extensions API at", extensionsUrl.value);
  } else {
    connectionStatus.value = t("notConnected");
    console.warn("Extensions API URL is required.");
  }
}
</script>

<style scoped>
.extensions-panel {
  /* Ваши стили */
}

.select-input {
  padding: 8px;
  font-size: 14px;
}

.extension-content {
  margin-top: 1rem;
}

/* Остальные стили */
.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.alignitemscenter {
  align-items: center;
}

.wide100p {
  width: 100%;
}

.margin0 {
  margin: 0;
}

.flex1 {
  flex: 1;
}

.checkbox_label {
  display: flex;
  align-items: center;
}

.flexNoGap > * {
  margin-right: 0;
}

.menu_button_icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.interactable {
  cursor: pointer;
}

.wide50p {
  width: 50%;
}

.alignitemsflexstart {
  align-items: flex-start;
}

.heightFitContent {
  height: fit-content;
}

.text_pole {
  padding: 8px;
  font-size: 14px;
}

.widthNatural {
  width: auto;
}

.menu_button {
  display: inline-block;
  padding: 8px 12px;
  background-color: #4a9eff;
  color: #fff;
  border: none;
  cursor: pointer;
  text-align: center;
}

.menu_button:hover {
  background-color: #3a8ed0;
}
</style>

<i18n lang="json">
{
    "en": {
        "extensions": "Extensions",
        "notifyOnExtensionUpdates": "Notify on extension updates",
        "manageExtensions": "Manage extensions",
        "importExtensionFromGitRepo": "Import Extension From Git Repo",
        "installExtension": "Install extension",
        "extrasApi": "Extras API:",
        "notConnected": "Not connected...",
        "connected": "Connected",
        "autoConnect": "Auto-connect",
        "extrasApiUrlPlaceholder": "Extras API URL",
        "extrasApiKeyPlaceholder": "Extras API key (optional)",
        "connect": "Connect"
    },
    "ru": {
        "extensions": "Расширения",
        "notifyOnExtensionUpdates": "Уведомлять об обновлениях расширений",
        "manageExtensions": "Управление расширениями",
        "importExtensionFromGitRepo": "Импортировать расширение из Git Repository",
        "installExtension": "Установить расширение",
        "extrasApi": "Extras API:",
        "notConnected": "Нет подключения...",
        "connected": "Подключено",
        "autoConnect": "Подключаться автоматически",
        "extrasApiUrlPlaceholder": "Extras API URL",
        "extrasApiKeyPlaceholder": "Ключ от Extras API (необязательно)",
        "connect": "Подключиться",
        "Image Generation": "Генерация изображений",
        "Chat Translation": "Перевод чата"
    }
}
</i18n>
