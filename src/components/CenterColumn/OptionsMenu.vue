<!-- src/components/CenterColumn/OptionsMenu.vue -->
<template>
    <div
        v-show="visible"
        class="context-menu"
        :style="position"
        @mouseleave="$emit('update:visible', false)"
    >
        <a class="menu-item" @click="onStartNewChat">
            <i class="fa-lg fa-solid fa-comments"></i>
            <span>{{ t("startNewChat") }}</span>
        </a>

        <a class="menu-item" @click="onShowAllChats">
            <i class="fa-lg fa-solid fa-address-book"></i>
            <span>{{ t("allChats") }}</span>
        </a>

        <a class="menu-item" @click="onCloseChat">
            <i class="fa-lg fa-solid fa-times"></i>
            <span>{{ t("closeChat") }}</span>
        </a>

        <hr class="menu-separator" />

        <a class="menu-item" @click="onDeleteMessages">
            <i class="fa-lg fa-solid fa-trash-can"></i>
            <span>{{ t("deleteMessages") }}</span>
        </a>

        <a class="menu-item" @click="onRegenerateMessage">
            <i class="fa-lg fa-solid fa-repeat"></i>
            <span>{{ t("regenerate") }}</span>
        </a>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({ useScope: "local" });

interface MenuPosition {
    bottom: string;
    left: string;
}

const props = defineProps<{
    visible: boolean;
    position: MenuPosition;
}>();

const emit = defineEmits<{
    (e: "update:visible", value: boolean): void;
    (e: "start-new-chat"): void;
    (e: "show-all-chats"): void;
    (e: "close-chat"): void;
    (e: "delete-messages"): void;
    (e: "regenerate-message"): void;
}>();

function onStartNewChat() {
    emit("start-new-chat");
    emit("update:visible", false);
}

function onShowAllChats() {
    emit("show-all-chats");
    emit("update:visible", false);
}

function onCloseChat() {
    emit("close-chat");
    emit("update:visible", false);
}

function onDeleteMessages() {
    emit("delete-messages");
    emit("update:visible", false);
}

function onRegenerateMessage() {
    emit("regenerate-message");
    emit("update:visible", false);
}
</script>

<i18n lang="json">
{
    "en": {
        "startNewChat": "Start new chat",
        "allChats": "All chats",
        "closeChat": "Close chat",
        "deleteMessages": "Delete messages",
        "regenerate": "Regenerate"
    },
    "ru": {
        "startNewChat": "Начать новый чат",
        "allChats": "Все чаты",
        "closeChat": "Закрыть чат",
        "deleteMessages": "Удалить сообщения",
        "regenerate": "Повторная генерация"
    }
}
</i18n>

<style scoped>
.context-menu {
    position: fixed;
    background: white;
    border-radius: 8px;
    padding: 8px 0;
    min-width: 200px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: slideUp 0.2s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    color: #333;
    cursor: pointer;
    transition: background-color 0.2s;
    text-decoration: none;
}

.menu-item:hover {
    background-color: #f5f5f5;
}

.menu-item i {
    width: 20px;
    margin-right: 8px;
}

.menu-separator {
    margin: 8px 0;
    border: none;
    border-top: 1px solid #eee;
}

.menu-item span {
    flex: 1;
}
</style>