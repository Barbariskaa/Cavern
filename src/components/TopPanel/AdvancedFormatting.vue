<template>
    <div id="AdvancedFormatting" class="drawer-content">
        <div class="section-buttons">
            <button
                v-for="section in sections"
                :key="section.key"
                @click="activeSection = section.key"
                :class="{ active: activeSection === section.key }"
            >
                {{ t(section.title) }}
            </button>
        </div>

        <div v-if="activeSection === 'contextTemplate'" class="section">
            <ContextTemplate />
        </div>
        <div v-else-if="activeSection === 'instructTemplate'" class="section">
            <InstructTemplate />
        </div>
        <div v-else-if="activeSection === 'systemPrompt'" class="section">
            <SystemPrompt />
        </div>
        <div
            v-else-if="activeSection === 'customStoppingStrings'"
            class="section"
        >
            <CustomStoppingStrings />
        </div>
        <div v-else-if="activeSection === 'tokenizer'" class="section">
            <Tokenizer />
        </div>
        <div v-else-if="activeSection === 'miscellaneous'" class="section">
            <Miscellaneous />
        </div>
        <!-- Добавьте другие разделы по необходимости -->
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

// Импорт подкомпонентов
import ContextTemplate from "./AdvancedFormatting/ContextTemplate.vue";
import InstructTemplate from "./AdvancedFormatting/InstructTemplate.vue";
import SystemPrompt from "./AdvancedFormatting/SystemPrompt.vue";
import CustomStoppingStrings from "./AdvancedFormatting/CustomStoppingStrings.vue";
import Tokenizer from "./AdvancedFormatting/Tokenizer.vue";
import Miscellaneous from "./AdvancedFormatting/Miscellaneous.vue";

const { t } = useI18n({
    useScope: "local",
});

const activeSection = ref("contextTemplate");

const sections = [
    { key: "contextTemplate", title: "Context Template" },
    { key: "instructTemplate", title: "Instruct Template" },
    { key: "systemPrompt", title: "System Prompt" },
    { key: "customStoppingStrings", title: "Custom Stopping Strings" },
    { key: "tokenizer", title: "Tokenizer" },
    { key: "miscellaneous", title: "Miscellaneous" },
    // Добавьте другие разделы по необходимости
];
</script>

<i18n lang="json">
{
    "en": {
        "Context Template": "Context Template",
        "Instruct Template": "Instruct Template",
        "System Prompt": "System Prompt",
        "Custom Stopping Strings": "Custom Stopping Strings",
        "Tokenizer": "Tokenizer",
        "Miscellaneous": "Miscellaneous"
    },
    "ru": {
        "Context Template": "Шаблон контекста",
        "Instruct Template": "Шаблон Instruct",
        "System Prompt": "Системный промпт",
        "Custom Stopping Strings": "Пользовательские Стоп-строки",
        "Tokenizer": "Токенайзер",
        "Miscellaneous": "Разное"
    }
}
</i18n>

<style scoped>
.drawer-content {
    padding: 1rem;
}

.section-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.section-buttons button {
    padding: 0.5rem;
    background: #444;
    border: none;
    color: white;
    cursor: pointer;
}

.section-buttons button.active {
    background: #666;
}

.section {
    margin-bottom: 1rem;
}

/* Добавьте дополнительные стили по необходимости */
</style>