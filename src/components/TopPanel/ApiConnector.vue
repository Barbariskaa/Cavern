<!-- components/TopPanel/ApiConnector.vue -->
<template>
    <div class="api-connector" :class="{ open: isOpen }">
        <div class="api-header">
            <h3>{{ t("apiConnections") }}</h3>
            <div class="api-status">
                <div
                    class="status-indicator"
                    :class="{
                        connecting: isConnecting,
                        connected: !isConnecting && isConnected,
                    }"
                />
                <span>
                    <template v-if="isConnecting">{{
                        t("connecting")
                    }}</template>
                    <template v-else-if="isConnected">{{
                        t("connected")
                    }}</template>
                    <template v-else>{{ t("notConnected") }}</template>
                </span>
            </div>
        </div>

        <!-- Сообщение об ошибке, если есть -->
        <div v-if="errorMessage" style="color: #ff4444">{{ errorMessage }}</div>

        <div class="api-content">
            <!-- Новая строка выбора -->
            <div class="api-selection-row">
                <ApiTypeSelector v-model="selectedApiType" />
                <ApiSourceSelector v-model="selectedApi" :apiType="selectedApiType" />
                <ModelSelector v-model="modelName" :apiSource="selectedApi" />
            </div>

            <!-- Формы API -->
            <div class="api-form">
                <!-- Форма OpenAI -->
                <div v-if="selectedApi === 'openai'" class="api-form-section">
                    <input
                        type="text"
                        v-model="apiKey"
                        :placeholder="t('enterApiKey')"
                        class="api-input"
                    />
                    <input
                        type="text"
                        v-model="proxyUrl"
                        :placeholder="t('enterProxyUrl')"
                        class="api-input"
                    />
                    <!-- Удалили выбор модели отсюда -->
                </div>

                <!-- Форма Claude -->
                <div v-if="selectedApi === 'claude'" class="api-form-section">
                    <input
                        type="text"
                        v-model="apiKey"
                        :placeholder="t('enterApiKey')"
                        class="api-input"
                    />
                    <!-- Добавьте другие поля необходимые для Claude -->
                </div>

                <!-- Форма NovelAI -->
                <div v-if="selectedApi === 'novel'" class="api-form-section">
                    <input
                        type="text"
                        v-model="apiKey"
                        :placeholder="t('enterApiKey')"
                        class="api-input"
                    />
                    <!-- Добавьте другие поля необходимые для NovelAI -->
                </div>

                <!-- Форма Text Generation Web UI -->
                <div v-if="selectedApi === 'textgen'" class="api-form-section">
                    <input
                        type="text"
                        v-model="apiUrl"
                        :placeholder="t('enterApiUrlExample')"
                        class="api-input"
                    />
                    <!-- Добавьте другие поля необходимые для TextGen -->
                </div>

                <!-- Другие формы API аналогично -->

                <!-- Кнопки -->
                <div class="api-buttons">
                    <button @click="connect">{{ t("connect") }}</button>
                    <button @click="testConnection">{{ t("test") }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useModelStore } from "@/stores/modelStore";
import { testOpenAIConnection } from "@/utils/openai";

// Импортируем дочерние компоненты
import ApiTypeSelector from "./ApiConnector/ApiTypeSelector.vue";
import ApiSourceSelector from "./ApiConnector/ApiSourceSelector.vue";
import ModelSelector from "./ApiConnector/ModelSelector.vue";

const props = defineProps({
    isOpen: Boolean,
    modelValue: Boolean,
});
const emit = defineEmits(["update:isOpen", "update:modelValue", "someEvent"]);

const { t } = useI18n({ useScope: "local" });

const isConnected = ref(false);
const isConnecting = ref(false);
const errorMessage = ref("");

// **Сначала инициализируем modelStore**
const modelStore = useModelStore();

const selectedApiType = ref(modelStore.apiType || 'chat-completion');
const selectedApi = ref(modelStore.apiSource || 'openai');
const modelName = ref(modelStore.modelName || 'gpt-3.5-turbo');
const apiKey = ref("");
const apiUrl = ref("");
const proxyUrl = ref("");

// Обновляем `modelStore` при изменении выбранных значений
watch(selectedApiType, (newVal) => {
  modelStore.setApiType(newVal);
});

watch(selectedApi, (newVal) => {
  modelStore.setApiSource(newVal);
});

watch(modelName, (newVal) => {
  modelStore.setModelName(newVal);
});

// Наблюдатели для сброса выбора при изменении зависимостей
watch(selectedApiType, () => {
    selectedApi.value = "";
    modelName.value = "";
    apiKey.value = "";
    apiUrl.value = "";
    proxyUrl.value = "";
    errorMessage.value = "";
    isConnected.value = false;
    isConnecting.value = false;
});

watch(selectedApi, () => {
    modelName.value = "";
    apiKey.value = "";
    apiUrl.value = "";
    proxyUrl.value = "";
    errorMessage.value = "";
    isConnected.value = false;
    isConnecting.value = false;
});

// Функция подключения
async function connect() {
    isConnecting.value = true;
    isConnected.value = false;
    errorMessage.value = "";

    if (selectedApi.value === "openai") {
        const ok = await testOpenAIConnection(apiKey.value, proxyUrl.value);
        isConnected.value = ok;
        if (!ok) {
            errorMessage.value = t("connectionFailed");
        }
    } else if (selectedApi.value === "claude") {
        // Логика подключения Claude
    } else if (selectedApi.value === "novel") {
        // Логика подключения NovelAI
    } else if (selectedApi.value === "textgen") {
        // Логика подключения Text Generation Web UI
    } else if (selectedApi.value === "horde") {
        // Логика подключения Horde
    } else if (selectedApi.value === "kobold") {
        // Логика подключения KoboldAI
    } else if (selectedApi.value === "windowai") {
        // Логика подключения WindowAI
    }
    isConnecting.value = false;
}

function testConnection() {
    connect();
}

// Экспортируем методы
defineExpose({
    toggle: () => (isOpen.value = !isOpen.value),
});
</script>

<i18n lang="json">
{
    "en": {
        "apiConnections": "API Connections",
        "connecting": "Connecting...",
        "connected": "Connected",
        "notConnected": "Not Connected",
        "enterApiKey": "Enter API Key",
        "enterProxyUrl": "Enter Proxy URL (optional)",
        "connect": "Connect",
        "test": "Test",
        "connectionFailed": "Connection Failed",
        "enterApiUrlExample": "Enter API URL (e.g., http://127.0.0.1:5000)"
    },
    "ru": {
        "apiConnections": "API Подключения",
        "connecting": "Подключение...",
        "connected": "Подключено",
        "notConnected": "Не подключено",
        "enterApiKey": "Введите API ключ",
        "enterProxyUrl": "Введите Proxy URL (необязательно)",
        "connect": "Подключиться",
        "test": "Тест",
        "connectionFailed": "Не удалось подключиться",
        "enterApiUrlExample": "Введите URL API (например, http://127.0.0.1:5000)"
    }
}
</i18n>

<style scoped>
/* Стили остаются без изменений */
.api-connector {
    position: fixed;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 50vw;
    background: #2d2d2d;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 999;
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    max-height: 0;
}

.api-connector.open {
    opacity: 1;
    visibility: visible;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
}

.api-header {
    padding: 1rem;
    border-bottom: 1px solid #444;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.api-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.status-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ff4444; /* по умолчанию красный (ошибка) */
}
.status-indicator.connecting {
    background: gold; /* или желтый */
}

.status-indicator.connected {
    background: #4caf50; /* зеленый */
}

.api-content {
    padding: 1rem;
    min-height: min-content;
}

.api-selection-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.api-selection-item {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.api-selection-item label {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.api-form-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.api-input,
.api-select {
    padding: 0.5rem;
    border: 1px solid #444;
    border-radius: 4px;
    background: #333;
    color: #fff;
}

.api-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
}

.connect-btn {
    background: #4a9eff;
    color: white;
}

.test-btn {
    background: #666;
    color: white;
}

button:hover {
    opacity: 0.9;
}
</style>