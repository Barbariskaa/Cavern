<template>
    <div
        id="SystemPromptColumn"
        class="system-prompt-settings"
    >
        <h4 class="standout-header title-restorable">
            <div>
                <span>{{ t("System Prompt") }}</span>
            </div>
            <div class="icon-buttons">
                <label
                    id="sysprompt_enabled_label"
                    for="sysprompt_enabled"
                    class="checkbox-label"
                    :title="t('sysprompt_enabled')"
                >
                    <input
                        id="sysprompt_enabled"
                        type="checkbox"
                        style="display: none"
                    />
                    <small>
                        <i
                            class="fa-solid fa-power-off icon-button"
                            tabindex="0"
                        ></i>
                    </small>
                </label>
            </div>
        </h4>
        <div id="SystemPromptBlock">
            <div
                class="preset-selector"
                :title="t('select_current_system_prompt')"
            >
                <select
                    id="sysprompt_select"
                    data-preset-manager-for="sysprompt"
                    class="select-input"
                >
                    <!-- Опции системных промптов -->
                </select>
                <PresetManagerButtons type="sysprompt" />
            </div>
            <div class="form-group">
                <label for="sysprompt_content" class="label-with-icon">
                    <span>{{ t("Prompt Content") }}</span>
                    <i
                        class="editor-maximize fa-solid fa-maximize icon-button"
                        data-for="sysprompt_content"
                        :title="t('expand_editor')"
                        tabindex="0"
                    ></i>
                </label>
                <textarea
                    id="sysprompt_content"
                    class="textarea-input"
                ></textarea>
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

<style scoped>
.system-prompt-settings {
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
    align-items: center;
    justify-content: space-between;
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
    min-height: 120px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
}

.form-group {
    margin-bottom: 1rem;
}
</style>