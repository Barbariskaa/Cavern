<template>
    <div class="miscellaneous-settings">
        <h4 class="standout-header">{{ t("Miscellaneous") }}</h4>
        <div class="form-group">
            <label>{{ t("Non-markdown Strings") }}</label>
            <input
                id="markdown_escape_strings"
                class="input-text"
                type="text"
                :placeholder="t('comma_delimited_no_spaces')"
            />
        </div>

        <div class="form-group">
            <label>{{ t("Start Reply With") }}</label>
            <textarea
                id="start_reply_with"
                class="textarea-input"
            ></textarea>
            <label
                class="checkbox-label"
                for="chat-show-reply-prefix-checkbox"
            >
                <input
                    id="chat-show-reply-prefix-checkbox"
                    type="checkbox"
                />
                {{ t("Show reply prefix in chat") }}
            </label>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n({
    useScope: "local",
});
</script>

<i18n>
{
    "en": {
        "Miscellaneous": "Miscellaneous",
        "Non-markdown Strings": "Non-markdown Strings",
        "comma_delimited_no_spaces": "comma delimited,no spaces between",
        "Start Reply With": "Start Reply With",
        "Show reply prefix in chat": "Show reply prefix in chat"
    },
    "ru": {
        "Miscellaneous": "Разное",
        "Non-markdown Strings": "Строки без Markdown",
        "comma_delimited_no_spaces": "через запятую, без пробелов",
        "Start Reply With": "Начать ответ с",
        "Show reply prefix in chat": "Показывать префикс ответа в чате"
    }
}
</i18n>

<style scoped>
.miscellaneous-settings {
    background: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
}

.standout-header {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #333;
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

.textarea-input {
    width: 100%;
    min-height: 80px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
}
</style>