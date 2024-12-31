<!-- src/components/CenterColumn/SendForm.vue -->
<template>
    <div class="send-form">
        <div class="left-controls">
            <div
                class="options-btn menu-btn"
                :title="t('menu')"
                @click="toggleOptionsMenu"
                ref="menuButton"
            >
                <i class="fa-solid fa-bars"></i>
            </div>

            <!-- Компонент OptionsMenu -->
            <OptionsMenu
                v-if="showOptionsMenu"
                :visible="showOptionsMenu"
                :position="menuPosition"
                @update:visible="showOptionsMenu = $event"
                @start-new-chat="onStartNewChat"
                @show-all-chats="onShowAllChats"
                @close-chat="onCloseChat"
                @delete-messages="onDeleteMessages"
                @regenerate-message="onRegenerateMessage"
            ></OptionsMenu>
        </div>

        <div class="preview-icon" @click="showPreview = true">
            <i class="fa-solid fa-eye"></i>
        </div>

        <textarea
            v-model="message"
            class="message-input"
            :placeholder="t('enterMessage')"
            @keyup.enter.prevent="sendMessage"
            @input="onInput"
        ></textarea>

        <div class="right-controls">
            <!-- Кнопки управления скриптом -->
            <div class="script-controls">
                <button class="control-btn" :title="t('continueScript')">
                    <i class="fa-solid fa-play"></i>
                </button>
                <button class="control-btn" :title="t('pauseScript')">
                    <i class="fa-solid fa-pause"></i>
                </button>
                <button class="control-btn" :title="t('stopScript')">
                    <i class="fa-solid fa-stop"></i>
                </button>
            </div>

            <!-- Кнопка остановки генерации -->
            <button
                class="control-btn stop-btn"
                :title="t('stopGeneration')"
                v-show="isGenerating"
            >
                <i class="fa-solid fa-circle-stop"></i>
            </button>

            <!-- Дополнительные кнопки -->
            <button class="control-btn" :title="t('askAI')">
                <i class="fa-solid fa-user-secret"></i>
            </button>
            <button class="control-btn" :title="t('continueMessage')">
                <i class="fa-solid fa-arrow-right"></i>
            </button>

            <!-- Кнопка отправки -->
            <button
                class="control-btn send-btn"
                :title="t('sendMessage')"
                @click="sendMessage"
            >
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </div>

        <!-- Модальное окно предпросмотра -->
        <div
            v-if="showPreview"
            class="modal-overlay"
            @click.self="showPreview = false"
        >
            <div class="modal-window">
                <!-- Отформатированный текст -->
                <div
                    class="formatted-text"
                    v-html="formatMessage(previewMessage)"
                ></div>
                <!-- Поле ввода текста -->
                <textarea
                    v-model="previewMessage"
                    class="modal-textarea"
                ></textarea>
                <!-- Кнопки управления -->
                <div class="modal-buttons">
                    <button @click="applyPreview" class="apply-btn">
                        {{ t("send") }}
                    </button>
                    <button @click="showPreview = false" class="cancel-btn">
                        {{ t("cancel") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import OptionsMenu from "./OptionsMenu.vue";

const { t } = useI18n({ useScope: "local" });

const props = defineProps<{
    isGenerating: boolean;
}>();

const emit = defineEmits<{
    (e: "send-message", message: string): void;
    (e: "start-new-chat"): void;
    (e: "show-all-chats"): void;
    (e: "close-chat"): void;
    (e: "delete-messages"): void;
    (e: "regenerate-message"): void;
}>();

const message = ref<string>("");

const isGenerating = computed(() => props.isGenerating);
const menuButton = ref<HTMLElement | null>(null);
const showOptionsMenu = ref<boolean>(false);
const menuPosition = ref<{ bottom: string; left: string }>({ bottom: "0", left: "0" });

function toggleOptionsMenu() {
    if (menuButton.value) {
        const buttonRect = menuButton.value.getBoundingClientRect();

        menuPosition.value = {
            bottom: `${window.innerHeight - buttonRect.top + 10}px`,
            left: `${buttonRect.left}px`,
        };

        showOptionsMenu.value = !showOptionsMenu.value;
    }
}

function sendMessage() {
    if (!message.value.trim()) return;
    emit("send-message", message.value);
    message.value = "";
}

function onInput(event: Event) {
    const input = event.target as HTMLTextAreaElement;
    const value = input.value;
    const cursorPos = input.selectionStart || 0;

    // Проверка на незакрытый открывающий тег перед курсором
    const tagMatch = value.slice(0, cursorPos).match(/<([a-zA-Z][^\s<>]*)>$/);
    if (tagMatch) {
        const tagName = tagMatch[1];

        // Вставка закрывающего тега
        const closingTag = `</${tagName}>`;
        const newValue =
            value.slice(0, cursorPos) + closingTag + value.slice(cursorPos);

        // Обновление значения и перемещение курсора
        message.value = newValue;

        nextTick(() => {
            const newCursorPos = cursorPos;
            input.setSelectionRange(newCursorPos, newCursorPos);
        });
    }

    // Автодополнение тройных обратных кавычек
    const backticksMatch = value.slice(0, cursorPos).match(/``` $/);
    if (backticksMatch) {
        const closingBackticks = `\n\n\`\`\``;
        const insertionPos = cursorPos - 1; // Удаление пробела перед курсором

        const newValue =
            value.slice(0, insertionPos) +
            "\n" +
            value.slice(insertionPos, cursorPos - 1) +
            closingBackticks +
            value.slice(cursorPos);

        // Обновление значения и перемещение курсора внутри блока кода
        message.value = newValue;

        nextTick(() => {
            const newCursorPos = insertionPos + 1; // Перемещение курсора на новую строку внутри блока
            input.setSelectionRange(newCursorPos, newCursorPos);
        });
    }
}

const showPreview = ref<boolean>(false);
const previewMessage = ref<string>("");

function applyPreview() {
    message.value = previewMessage.value;
    sendMessage();
    showPreview.value = false;
    previewMessage.value = "";
}

function formatMessage(text: string): string {
    if (!text) return "";
    let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");
    return formattedText;
}

// Перенаправление событий меню
function onStartNewChat() {
    emit("start-new-chat");
}

function onShowAllChats() {
    emit("show-all-chats");
}

function onCloseChat() {
    emit("close-chat");
}

function onDeleteMessages() {
    emit("delete-messages");
}

function onRegenerateMessage() {
    emit("regenerate-message");
}
</script>

<i18n lang="json">
{
    "en": {
        "menu": "Menu",
        "startNewChat": "Start new chat",
        "allChats": "All chats",
        "closeChat": "Close chat",
        "deleteMessages": "Delete messages",
        "regenerate": "Regenerate",
        "enterMessage": "Enter a message, or /? for help",
        "continueScript": "Continue script execution",
        "pauseScript": "Pause script execution",
        "stopScript": "Stop script execution",
        "stopGeneration": "Stop generation",
        "askAI": "Ask AI to write a message for you",
        "continueMessage": "Continue current message",
        "sendMessage": "Send message",
        "send": "Send",
        "cancel": "Cancel"
    },
    "ru": {
        "menu": "Меню",
        "startNewChat": "Начать новый чат",
        "allChats": "Все чаты",
        "closeChat": "Закрыть чат",
        "deleteMessages": "Удалить сообщения",
        "regenerate": "Повторная генерация",
        "enterMessage": "Введите сообщение, или /? для получения справки",
        "continueScript": "Продолжить выполнение скрипта",
        "pauseScript": "Приостановить выполнение скрипта",
        "stopScript": "Прервать выполнение скрипта",
        "stopGeneration": "Прекратить генерацию",
        "askAI": "Попросить ИИ написать сообщение за вас",
        "continueMessage": "Продолжить текущее сообщение",
        "sendMessage": "Отправить сообщение",
        "send": "Отправить",
        "cancel": "Отмена"
    }
}
</i18n>

<style scoped>
.send-form {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #f5f5f5;
    border-top: 1px solid #ddd;
    gap: 10px;
}

.left-controls,
.right-controls {
    display: flex;
    align-items: center;
    gap: 5px;
}

.message-input {
    flex: 1;
    min-height: 37px;
    max-height: 200px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
}

.menu-btn,
.control-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    cursor: pointer;
    color: #666;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.menu-btn:hover,
.control-btn:hover {
    background-color: #ddd;
    color: #333;
}

.script-controls {
    display: flex;
    gap: 2px;
    margin-right: 5px;
}

.stop-btn {
    color: #dc3545;
}

.send-btn {
    color: #28a745;
}

.preview-icon {
    cursor: pointer;
    color: #666;
    margin-right: 10px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-window {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
}

.formatted-text {
    min-height: 100px;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    background: #f9f9f9;
    overflow-y: auto;
}

.modal-textarea {
    width: 100%;
    min-height: 100px;
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    resize: vertical;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.apply-btn,
.cancel-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.apply-btn {
    background-color: #4a9eff;
    color: #fff;
}

.cancel-btn {
    background-color: #ddd;
    color: #333;
}
</style>