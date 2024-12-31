<!-- components/TopPanel/ApiConnector/ApiTypeSelector.vue -->
<template>
    <div class="api-selection-item">
        <label>{{ t("apiType") }}</label>
        <select v-model="apiType" class="api-select">
            <option value="chat-completion">
                {{ t("chatCompletion") }}
            </option>
            <option value="text-completion" disabled>
                {{ t("textCompletion") }}
            </option>
            <!-- Other API types (disabled) -->
            <option value="novelai" disabled>{{ t("novelAI") }}</option>
            <option value="koboldai" disabled>{{ t("koboldAI") }}</option>
            <option value="koboldai-horde" disabled>{{ t("koboldAIHorde") }}</option>
            <!-- Add other types if necessary -->
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
    modelValue: {
        type: String,
        default: 'chat-completion',
    },
});

const emit = defineEmits(['update:modelValue']);

const { t } = useI18n({ useScope: "local" });

const apiType = ref(props.modelValue);

watch(apiType, (newValue) => {
    emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
    apiType.value = newValue;
});
</script>

<style scoped>
/* Styles for ApiTypeSelector component */
</style>

<i18n lang="json">
{
    "en": {
        "apiType": "API Type",
        "chatCompletion": "Chat Completion",
        "textCompletion": "Text Completion",
        "novelAI": "NovelAI",
        "koboldAI": "KoboldAI",
        "koboldAIHorde": "KoboldAI Horde"
    },
    "ru": {
        "apiType": "Тип API",
        "chatCompletion": "Завершение Чата",
        "textCompletion": "Текстовое Завершение",
        "novelAI": "NovelAI",
        "koboldAI": "KoboldAI",
        "koboldAIHorde": "KoboldAI Horde"
    }
}
</i18n>