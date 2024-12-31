<!-- components/TopPanel/ApiConnector/ModelSelector.vue -->
<template>
    <div class="api-selection-item">
        <label>{{ t("model") }}</label>
        <select v-model="model" class="api-select">
            <!-- Опции моделей на основе apiSource -->
            <!-- Модели OpenAI -->
            <template v-if="apiSource === 'openai'">
                <optgroup label="GPT-3.5 Turbo">
                    <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                    <option value="gpt-3.5-turbo-0125">gpt-3.5-turbo-0125 (2024)</option>
                    <option value="gpt-3.5-turbo-1106">gpt-3.5-turbo-1106 (2023)</option>
                    <option value="gpt-3.5-turbo-0613">gpt-3.5-turbo-0613 (2023)</option>
                    <option value="gpt-3.5-turbo-0301">gpt-3.5-turbo-0301 (2023)</option>
                    <option value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</option>
                    <option value="gpt-3.5-turbo-16k-0613">gpt-3.5-turbo-16k-0613 (2023)</option>
                </optgroup>
                <optgroup label="GPT-3.5 Turbo Instruct">
                    <option value="gpt-3.5-turbo-instruct">gpt-3.5-turbo-instruct</option>
                    <option value="gpt-3.5-turbo-instruct-0914">gpt-3.5-turbo-instruct-0914</option>
                </optgroup>
                <optgroup label="GPT-4">
                    <option value="gpt-4">gpt-4</option>
                    <option value="gpt-4-0613">gpt-4-0613 (2023)</option>
                    <option value="gpt-4-0314">gpt-4-0314 (2023)</option>
                    <option value="gpt-4-32k">gpt-4-32k</option>
                    <option value="gpt-4-32k-0613">gpt-4-32k-0613 (2023)</option>
                    <option value="gpt-4-32k-0314">gpt-4-32k-0314 (2023)</option>
                </optgroup>
                <optgroup label="GPT-4o">
                    <option value="gpt-4o">gpt-4o</option>
                    <option value="gpt-4o-2024-11-20">gpt-4o-2024-11-20</option>
                    <option value="gpt-4o-2024-08-06">gpt-4o-2024-08-06</option>
                    <option value="gpt-4o-2024-05-13">gpt-4o-2024-05-13</option>
                    <option value="chatgpt-4o-latest">chatgpt-4o-latest</option>
                </optgroup>
                <optgroup label="gpt-4o-mini">
                    <option value="gpt-4o-mini">gpt-4o-mini</option>
                    <option value="gpt-4o-mini-2024-07-18">gpt-4o-mini-2024-07-18</option>
                </optgroup>
                <optgroup label="GPT-4 Turbo">
                    <option value="gpt-4-turbo">gpt-4-turbo</option>
                    <option value="gpt-4-turbo-2024-04-09">gpt-4-turbo-2024-04-09</option>
                    <option value="gpt-4-turbo-preview">gpt-4-turbo-preview</option>
                    <option value="gpt-4-vision-preview">gpt-4-vision-preview</option>
                    <option value="gpt-4-0125-preview">gpt-4-0125-preview (2024)</option>
                    <option value="gpt-4-1106-preview">gpt-4-1106-preview (2023)</option>
                </optgroup>
                <optgroup label="o1">
                    <option value="o1-preview">o1-preview</option>
                    <option value="o1-mini">o1-mini</option>
                </optgroup>
                <optgroup label="Other">
                    <option value="text-davinci-003">text-davinci-003</option>
                    <option value="text-davinci-002">text-davinci-002</option>
                    <option value="text-curie-001">text-curie-001</option>
                    <option value="text-babbage-001">text-babbage-001</option>
                    <option value="text-ada-001">text-ada-001</option>
                    <option value="code-davinci-002">code-davinci-002</option>
                </optgroup>
                <!-- Добавьте другие модели OpenAI, если необходимо -->
            </template>
            <!-- Другие API -->
            <!-- ... -->
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
    apiSource: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

const model = ref(props.modelValue);

watch(model, (newValue) => {
    emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
    model.value = newValue;
});

const { t } = useI18n({ useScope: "local" });

// Дополнительные данные для Horde моделей
const hordeModels = ref([
    "-- Horde models not loaded --"
    // Добавьте фактические модели Horde, если они доступны
]);
</script>

<style scoped>
/* Стили для компонента ModelSelector */
</style>

<i18n lang="json">
{
    "en": {
        "model": "Model",
        "useExtensionSettings": "Use Extension Settings"
    },
    "ru": {
        "model": "Модель",
        "useExtensionSettings": "Использовать настройки расширения"
    }
}
</i18n>