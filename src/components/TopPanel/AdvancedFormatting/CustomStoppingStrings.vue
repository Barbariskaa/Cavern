<template>
    <div class="custom-stopping-strings">
        <h4 class="standout-header">
            <span>{{ t("Custom Stopping Strings") }}</span>
            <a
                :href="t('custom_stop_strings_link')"
                class="info-link"
                target="_blank"
            >
                <span
                    class="fa-solid fa-circle-question info-icon"
                ></span>
            </a>
        </h4>
        <div class="form-group">
            <small>
                {{ t("json_string_list") }}
                <i
                    class="fa-solid fa-question-circle info-icon"
                    :title="t('json_string_list_example')"
                ></i>
            </small>
            <textarea
                id="custom_stopping_strings"
                class="textarea-input monospace"
            ></textarea>
        </div>
        <div class="form-group">
            <label class="checkbox-label">
                <input
                    id="custom_stopping_strings_macro"
                    type="checkbox"
                    checked
                />
                {{ t("Replace Macro in Custom Stopping Strings") }}
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

<style scoped>
.custom-stopping-strings {
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
    align-items: center;
    gap: 0.5rem;
}

.info-link {
    color: #007bff;
    text-decoration: none;
}

.info-icon {
    cursor: pointer;
    color: #6c757d;
    margin-left: 0.5rem;
}

.info-link:hover .info-icon {
    color: #0056b3;
}

.form-group {
    margin-bottom: 1rem;
}

.textarea-input {
    width: 100%;
    min-height: 80px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
}

.monospace {
    font-family: monospace;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>