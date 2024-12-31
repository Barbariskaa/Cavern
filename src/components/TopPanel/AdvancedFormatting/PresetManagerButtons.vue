<template>
    <div class="preset-manager-buttons">
        <input
            type="file"
            hidden
            :data-preset-manager-file="type"
            accept=".json, .settings"
        />
        <i
            :data-preset-manager-update="type"
            class="icon-button fa-solid fa-save"
            :title="t('update_current_template')"
            tabindex="0"
        ></i>
        <i
            :data-preset-manager-rename="type"
            class="icon-button fa-solid fa-pencil-alt"
            :title="t('rename_current_template')"
            tabindex="0"
        ></i>
        <i
            :data-preset-manager-new="type"
            class="icon-button fa-solid fa-file-circle-plus"
            :title="t('save_template_as')"
            tabindex="0"
        ></i>
        <i
            :data-preset-manager-import="type"
            class="icon-button fa-solid fa-file-import"
            :title="t('import_template')"
            tabindex="0"
        ></i>
        <i
            :data-preset-manager-export="type"
            class="icon-button fa-solid fa-file-export"
            :title="t('export_template')"
            tabindex="0"
        ></i>
        <i
            :data-preset-manager-restore="type"
            class="icon-button fa-solid fa-undo-alt"
            :title="t('restore_current_template')"
            tabindex="0"
        ></i>
        <i
            :data-preset-manager-delete="type"
            class="icon-button fa-solid fa-trash"
            :title="t('delete_template')"
            tabindex="0"
        ></i>
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { defineProps } from "vue";

const { t } = useI18n({
    useScope: "local",
});

defineProps({
    type: {
        type: String,
        required: true,
    },
});
</script>

<i18n>
{
    "en": {
        "update_current_template": "Update current template",
        "rename_current_template": "Rename current template",
        "save_template_as": "Save template as",
        "import_template": "Import template",
        "export_template": "Export template",
        "restore_current_template": "Restore current template",
        "delete_template": "Delete template"
    },
    "ru": {
        "update_current_template": "Обновить текущий шаблон",
        "rename_current_template": "Переименовать текущий шаблон",
        "save_template_as": "Сохранить шаблон как",
        "import_template": "Импортировать шаблон",
        "export_template": "Экспортировать шаблон",
        "restore_current_template": "Восстановить текущий шаблон",
        "delete_template": "Удалить шаблон"
    }
}
</i18n>

<style scoped>
.preset-manager-buttons {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.icon-button {
    font-size: 1.2rem;
    cursor: pointer;
    color: #007bff;
    transition: color 0.2s;
}

.icon-button:hover {
    color: #0056b3;
}
</style>