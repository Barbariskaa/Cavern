<!-- components/TopPanel/ApiConnector/ApiSourceSelector.vue -->
<template>
    <div class="api-selection-item">
        <label>{{ t("apiSource") }}</label>
        <select v-model="apiSource" class="api-select">
            <!-- For Chat Completion -->
            <template v-if="apiType === 'chat-completion'">
                <optgroup label="Standard APIs">
                    <option value="openai">{{ t("openai") }}</option>
                    <option value="custom" disabled>{{ t("customOpenAI") }}</option>
                </optgroup>
                <optgroup label="Other APIs">
                    <option value="01ai" disabled>01.AI (Yi)</option>
                    <option value="ai21" disabled>AI21</option>
                    <option value="blockentropy" disabled>Block Entropy</option>
                    <option value="claude">{{ t("anthropicClaude") }}</option>
                    <option value="cohere" disabled>{{ t("cohere") }}</option>
                    <option value="groq" disabled>Groq</option>
                    <option value="makersuite" disabled>Google AI Studio</option>
                    <option value="mistralai" disabled>MistralAI</option>
                    <option value="nanogpt" disabled>NanoGPT</option>
                    <option value="openrouter">{{ t("openrouter") }}</option>
                    <option value="perplexity" disabled>Perplexity</option>
                    <option value="scale" disabled>Scale</option>
                    <option value="windowai" disabled>{{ t("windowAI") }}</option>
                </optgroup>
            </template>
            <!-- For Text Completion -->
            <template v-else-if="apiType === 'text-completion'">
                <optgroup label="Standard APIs">
                    <option value="textgen" disabled>{{ t("textGeneration") }}</option>
                    <option value="openai" disabled>{{ t("openai") }}</option>
                </optgroup>
                <optgroup label="Other APIs">
                    <option value="cohere" disabled>{{ t("cohere") }}</option>
                    <option value="horde" disabled>{{ t("koboldAIHorde") }}</option>
                    <option value="kobold" disabled>{{ t("koboldAI") }}</option>
                    <option value="novel" disabled>{{ t("novelAI") }}</option>
                    <option value="openrouter" disabled>{{ t("openrouter") }}</option>
                    <!-- Add other API sources as necessary -->
                </optgroup>
            </template>
            <!-- Other API types -->
            <template v-else>
                <!-- Add corresponding options for other API types -->
            </template>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
    apiType: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

const apiSource = ref(props.modelValue);

watch(apiSource, (newValue) => {
    emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
    apiSource.value = newValue;
});

const { t } = useI18n({ useScope: "local" });
</script>

<style scoped>
/* Styles for ApiSourceSelector component */
</style>

<i18n lang="json">
{
    "en": {
        "apiSource": "API Source",
        "openai": "OpenAI",
        "anthropicClaude": "Anthropic Claude",
        "novelAI": "NovelAI",
        "koboldAIHorde": "KoboldAI Horde",
        "koboldAI": "KoboldAI",
        "textGeneration": "Text Generation Web UI",
        "cohere": "Cohere",
        "ai21": "AI21",
        "groq": "Groq",
        "mistralAI": "MistralAI",
        "windowAI": "Window AI",
        "openrouter": "OpenRouter",
        "customOpenAI": "Custom (OpenAI-compatible)"
    },
    "ru": {
        "apiSource": "Источник API",
        "openai": "OpenAI",
        "anthropicClaude": "Anthropic Claude",
        "novelAI": "NovelAI",
        "koboldAIHorde": "KoboldAI Horde",
        "koboldAI": "KoboldAI",
        "textGeneration": "Text Generation Web UI",
        "cohere": "Cohere",
        "ai21": "AI21",
        "groq": "Groq",
        "mistralAI": "MistralAI",
        "windowAI": "Window AI",
        "openrouter": "OpenRouter",
        "customOpenAI": "Кастомный (OpenAI-совместимый)"
    }
}
</i18n>