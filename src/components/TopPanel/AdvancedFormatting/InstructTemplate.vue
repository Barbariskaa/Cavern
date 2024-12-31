<template>
    <div
        id="InstructSettingsColumn"
        class="instruct-settings"
    >
        <h4 class="standout-header title-restorable">
            <div>
                <span>{{ t("Instruct Template") }}</span>
            </div>
            <div class="icon-buttons">
                <label
                    for="instruct_derived"
                    class="checkbox-label"
                    :title="t('instruct_derived_tip')"
                >
                    <input
                        id="instruct_derived"
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
                <label
                    for="instruct_bind_to_context"
                    class="checkbox-label"
                    :title="t('instruct_bind_to_context_tip')"
                >
                    <input
                        id="instruct_bind_to_context"
                        type="checkbox"
                        style="display: none"
                    />
                    <small>
                        <i
                            class="fa-solid fa-link icon-button"
                            tabindex="0"
                        ></i>
                    </small>
                </label>
                <label
                    id="instruct_enabled_label"
                    for="instruct_enabled"
                    class="checkbox-label"
                    :title="t('instruct_enabled_tip')"
                >
                    <input
                        id="instruct_enabled"
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
        <div id="instructSettingsBlock">
            <div
                class="preset-selector"
                :title="t('select_current_instruct_template')"
            >
                <select
                    id="instruct_presets"
                    data-preset-manager-for="instruct"
                    class="select-input"
                >
                    <!-- Опции шаблонов instruct -->
                </select>
                <PresetManagerButtons type="instruct" />
            </div>
            <div class="form-group">
                <label class="label-with-icon">
                    <span>{{ t("Activation Regex") }}</span>
                    <span
                        class="fa-solid fa-circle-question info-icon"
                        :title="t('instruct_template_activation_regex_desc')"
                    ></span>
                </label>
                <input
                    type="text"
                    id="instruct_activation_regex"
                    class="input-text"
                    :placeholder="t('activation_regex_placeholder')"
                />
            </div>
            <div class="checkbox-group">
                <label class="checkbox-label">
                    <input id="instruct_wrap" type="checkbox" />
                    {{ t("Wrap Sequences with Newline") }}
                </label>
                <label class="checkbox-label">
                    <input id="instruct_macro" type="checkbox" />
                    {{ t("Replace Macro in Sequences") }}
                </label>
                <label class="checkbox-label">
                    <input
                        id="instruct_skip_examples"
                        type="checkbox"
                    />
                    {{ t("Skip Example Dialogues Formatting") }}
                </label>
                <div class="form-group">
                    <label>{{ t("Include Names") }}</label>
                    <select id="instruct_names_behavior" class="select-input">
                        <option value="none">{{ t("Never") }}</option>
                        <option value="force">
                            {{ t("Groups and Past Personas") }}
                        </option>
                        <option value="always">
                            {{ t("Always") }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Instruct Sequences -->
        <div
            id="InstructSequencesColumn"
            class="instruct-sequences"
        >
            <h4 class="standout-header title-restorable">
                <b>{{ t("Instruct Sequences") }}</b>
            </h4>
            <details open>
                <summary>{{ t("User Message Sequences") }}</summary>
                <div class="sequence-group">
                    <div class="form-group" :title="t('user_prefix_tip')">
                        <label>{{ t("User Prefix") }}</label>
                        <textarea
                            id="instruct_input_sequence"
                            class="textarea-input"
                        ></textarea>
                    </div>
                    <div class="form-group" :title="t('user_suffix_tip')">
                        <label>{{ t("User Suffix") }}</label>
                        <textarea
                            id="instruct_input_suffix"
                            class="textarea-input"
                        ></textarea>
                    </div>
                </div>
            </details>
            <details open>
                <summary>{{ t("Assistant Message Sequences") }}</summary>
                <div class="sequence-group">
                    <div class="form-group" :title="t('assistant_prefix_tip')">
                        <label>{{ t("Assistant Prefix") }}</label>
                        <textarea
                            id="instruct_output_sequence"
                            class="textarea-input"
                        ></textarea>
                    </div>
                    <div class="form-group" :title="t('assistant_suffix_tip')">
                        <label>{{ t("Assistant Suffix") }}</label>
                        <textarea
                            id="instruct_output_suffix"
                            class="textarea-input"
                        ></textarea>
                    </div>
                </div>
            </details>
            <!-- Добавьте остальные details по аналогии -->
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
.instruct-settings {
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

.info-icon {
    color: #6c757d;
    margin-left: 0.5rem;
    cursor: pointer;
}

.input-text {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.instruct-sequences {
    margin-top: 1rem;
}

.sequence-group {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.form-group {
    flex: 1;
    margin-bottom: 1rem;
}

.textarea-input {
    width: 100%;
    min-height: 60px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
}
</style>