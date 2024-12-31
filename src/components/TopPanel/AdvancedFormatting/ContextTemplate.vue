<template>
    <div
        id="ContextSettings"
        class="context-settings"
    >
        <div>
            <h4 class="standout-header title-restorable">
                <div>
                    <span>{{ t("Context Template") }}</span>
                </div>
                <div class="icon-buttons">
                    <label
                        for="context_derived"
                        class="checkbox-label"
                        :title="t('context_derived_tip')"
                    >
                        <input
                            id="context_derived"
                            type="checkbox"
                            style="display: none"
                        />
                        <small>
                            <i
                                class="fa-solid fa-bolt icon-button"
                                tabindex="0"
                            ></i>
                        </small>
                    </label>
                </div>
            </h4>
            <div
                class="preset-selector"
                :title="t('select_current_context_template')"
            >
                <select
                    id="context_presets"
                    data-preset-manager-for="context"
                    class="select-input"
                >
                    <!-- Опции шаблонов контекста -->
                </select>
                <PresetManagerButtons type="context" />
            </div>
            <div class="form-group">
                <label for="context_story_string" class="label-with-icon">
                    <span>{{ t("Story String") }}</span>
                    <i
                        class="editor-maximize fa-solid fa-maximize icon-button"
                        data-for="context_story_string"
                        :title="t('expand_editor')"
                        tabindex="0"
                    ></i>
                </label>
                <textarea
                    id="context_story_string"
                    class="textarea-input"
                ></textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="context_example_separator">
                        {{ t("Example Separator") }}
                    </label>
                    <textarea
                        id="context_example_separator"
                        class="textarea-input"
                    ></textarea>
                </div>
                <div class="form-group">
                    <label for="context_chat_start">
                        {{ t("Chat Start") }}
                    </label>
                    <textarea
                        id="context_chat_start"
                        class="textarea-input"
                    ></textarea>
                </div>
            </div>
            <div>
                <h4 class="standout-header">
                    {{ t("Context Formatting") }}
                </h4>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input
                            id="always-force-name2-checkbox"
                            type="checkbox"
                        />
                        {{ t("Always add character's name to prompt") }}
                    </label>
                    <label class="checkbox-label">
                        <input id="single_line" type="checkbox" />
                        {{ t("Generate only one line per request") }}
                    </label>
                    <label class="checkbox-label">
                        <input
                            id="collapse-newlines-checkbox"
                            type="checkbox"
                        />
                        {{ t("Collapse Consecutive Newlines") }}
                    </label>
                    <label class="checkbox-label">
                        <input id="trim_spaces" type="checkbox" />
                        {{ t("Trim spaces") }}
                        <i
                            class="fa-sm fa-solid fa-exclamation-triangle warning-icon"
                            :title="t('disabling_not_recommended')"
                        ></i>
                    </label>
                    <label class="checkbox-label">
                        <input
                            id="trim_sentences_checkbox"
                            type="checkbox"
                        />
                        {{ t("Trim Incomplete Sentences") }}
                    </label>
                    <label
                        class="checkbox-label"
                        :title="
                            t(
                                'add_chat_start_example_separator_as_stop_strings_tip',
                            )
                        "
                    >
                        <input
                            id="context_use_stop_strings"
                            type="checkbox"
                        />
                        {{ t("Separators as Stop Strings") }}
                    </label>
                    <label
                        class="checkbox-label"
                        :title="
                            t('add_char_user_names_as_stop_strings_tip')
                        "
                    >
                        <input
                            id="context_names_as_stop_strings"
                            type="checkbox"
                        />
                        {{ t("Names as Stop Strings") }}
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label
                    class="checkbox-label"
                    :title="
                        t('context_allow_post_history_instructions_tip')
                    "
                >
                    <input
                        id="context_allow_jailbreak"
                        type="checkbox"
                    />
                    {{ t("Allow Post-History Instructions") }}
                </label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import PresetManagerButtons from "./PresetManagerButtons.vue";

const { t } = useI18n({
    useScope: "local",
});
</script>

<i18n>
{
    "en": {
        "Context Template": "Context Template",
        "context_derived_tip": "Derive from Model Metadata, if possible.",
        "select_current_context_template": "Select your current Context Template",
        "Story String": "Story String",
        "expand_editor": "Expand the editor",
        "Example Separator": "Example Separator",
        "Chat Start": "Chat Start",
        "Context Formatting": "Context Formatting",
        "Always add character's name to prompt": "Always add character's name to prompt",
        "Generate only one line per request": "Generate only one line per request",
        "Collapse Consecutive Newlines": "Collapse Consecutive Newlines",
        "Trim spaces": "Trim spaces",
        "disabling_not_recommended": "Disabling is not recommended.",
        "Trim Incomplete Sentences": "Trim Incomplete Sentences",
        "add_chat_start_example_separator_as_stop_strings_tip": "Add Chat Start and Example Separator to a list of stopping strings.",
        "Separators as Stop Strings": "Separators as Stop Strings",
        "add_char_user_names_as_stop_strings_tip": "Add Character and User names to a list of stopping strings.",
        "Names as Stop Strings": "Names as Stop Strings",
        "context_allow_post_history_instructions_tip": "Includes Post-History Instructions at the end of the prompt, if defined in the character card AND ''Prefer Char. Instructions'' is enabled.\nTHIS IS NOT RECOMMENDED FOR TEXT COMPLETION MODELS, CAN LEAD TO BAD OUTPUT.",
        "Allow Post-History Instructions": "Allow Post-History Instructions"
    },
    "ru": {
        "Context Template": "Шаблон контекста",
        "context_derived_tip": "Использовать из метаданных модели, если возможно.",
        "select_current_context_template": "Выберите текущий Шаблон Контекста",
        "Story String": "Строка истории",
        "expand_editor": "Развернуть редактор",
        "Example Separator": "Разделитель примеров",
        "Chat Start": "Начало чата",
        "Context Formatting": "Форматирование контекста",
        "Always add character's name to prompt": "Всегда добавлять имя персонажа к промпту",
        "Generate only one line per request": "Генерировать только одну строку за запрос",
        "Collapse Consecutive Newlines": "Сворачивать последовательные новые строки",
        "Trim spaces": "Обрезать пробелы",
        "disabling_not_recommended": "Отключение не рекомендуется.",
        "Trim Incomplete Sentences": "Обрезать незаконченные предложения",
        "add_chat_start_example_separator_as_stop_strings_tip": "Добавить Начало чата и Разделитель примеров в список стоп-строк.",
        "Separators as Stop Strings": "Разделители как стоп-строки",
        "add_char_user_names_as_stop_strings_tip": "Добавить имена Персонажа и Пользователя в список стоп-строк.",
        "Names as Stop Strings": "Имена как стоп-строки",
        "context_allow_post_history_instructions_tip": "Добавляет инструкции после истории в конце промпта, если они определены в карточке персонажа И «Предпочитать Инструкции Персонажа» включено.\nЭТО НЕ РЕКОМЕНДУЕТСЯ ДЛЯ МОДЕЛЕЙ ЗАВЕРШЕНИЯ ТЕКСТА, МОЖЕТ ПРИВЕСТИ К ПЛОХОМУ ВЫВОДУ.",
        "Allow Post-History Instructions": "Разрешить инструкции после истории"
    }
}
</i18n>

<style scoped>
.context-settings {
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
    justify-content: space-between;
    align-items: center;
}

.icon-buttons {
    display: flex;
    gap: 0.5rem;
}

.icon-button {
    cursor: pointer;
    color: #007bff;
    transition: color 0.2s;
}

.icon-button:hover {
    color: #0056b3;
}

.preset-selector {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.select-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.label-with-icon {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.editor-maximize {
    cursor: pointer;
    color: #007bff;
    transition: color 0.2s;
}

.editor-maximize:hover {
    color: #0056b3;
}

.textarea-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    min-height: 60px;
}

.form-group {
    margin-bottom: 1rem;
}

.form-row {
    display: flex;
    gap: 1rem;
}

.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.warning-icon {
    color: #ffc107;
    margin-left: 0.5rem;
}

</style>