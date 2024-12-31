<!-- src/components/CenterColumn.vue -->
<template>
    <div class="center-column">
        <div class="content" ref="chatContainer">
            <div v-if="showChatList">
                <!-- Список чатов -->
                <button
                    class="close-chat-list-btn"
                    @click="showChatList = false"
                >
                    {{ t("closeChatList") }}
                </button>
                <div class="chat-list">
                    <div
                        class="chat-item"
                        v-for="chat in chatList"
                        :key="chat.id"
                        @click="selectChat(chat.id)"
                    >
                        <div class="chat-item-header">
                            <span class="chat-item-name">{{ chat.id }}</span>
                            <span class="chat-item-date">{{
                                formatDate(chat.updatedAt)
                            }}</span>
                        </div>
                        <div class="chat-item-preview">
                            {{ getChatPreview(chat) }}
                        </div>
                    </div>
                </div>
            </div>
            <ChatMessages
                v-else-if="props.currentChat"
                :messages="localMessages"
            />
            <div v-else class="no-chat">
                {{ t("selectCharacter") }}
            </div>
        </div>

        <SendForm
            :isGenerating="isGenerating"
            @send-message="handleSendMessage"
            @start-new-chat="startNewChat"
            @show-all-chats="showAllChats"
            @close-chat="closeChat"
            @delete-messages="deleteMessages"
            @regenerate-message="regenerateMessage"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed, inject } from "vue";
import { useI18n } from "vue-i18n";
import ChatMessages from "./CenterColumn/ChatMessages.vue";
import SendForm from "./CenterColumn/SendForm.vue";

// Импортируем функцию подсчёта токенов
import { getTokenCount } from "@/utils/tokenizers";

// Получаем выбранный токенайзер из хранилища Pinia
import { useTokenizerStore } from "@/stores/tokenizer";
const tokenizerStore = useTokenizerStore();

// Используем функцию `t` для переводов
const { t } = useI18n({ useScope: "local" });

// Определение типов сообщений и чата
interface Message {
  id: string;
  content: string;
  role: string;
  timestamp: number;
  parentId?: string;
  branches?: Record<string, any>;
  tokenCounts?: Record<string, number>; // Добавляем поле для токенов
}

interface Chat {
  id: string;
  name: string;
  chatId?: string;
}

interface ChatData {
  id: string;
  messages: Record<string, Message>;
  updatedAt: number;
  currentState: {
    branchId: string;
    timestamp: number;
  };
}

// Пропсы
const props = defineProps<{
  currentChat: Chat | null;
  messages: Message[];
}>();

// События
const emit = defineEmits<{
  (e: "send-message", message: Message): void;
  (e: "update:messages", messages: Message[]): void;
  (e: "select-chat", chatId: string): void;
  (e: "update:currentChat", chat: Chat): void;
}>();

// Состояние компонента
const chat = ref<ChatData | null>(null);
const isGenerating = ref<boolean>(false);
const chatContainer = ref<HTMLDivElement | null>(null);

// Локальные сообщения
const localMessages = ref<Message[]>([]);

// Список чатов
const showChatList = ref<boolean>(false);
const chatList = ref<any[]>([]);

// Поле ввода сообщения
const message = ref<string>("");

// Функция обработки отправки сообщения
function handleSendMessage(messageContent: string) {
  message.value = messageContent;
  sendMessage();
}

// Функция отправки сообщения
async function sendMessage() {
  if (!message.value.trim()) return;

  try {
    if (!chat.value) {
      console.error("Чат не инициализирован");
      return;
    }

    // Получение времени сервера
    const timeResponse = await fetch("/api/time");
    const timeData = await timeResponse.json();
    const serverTimestamp = timeData.timestamp;

    // Создание сообщения
    const msgId = `msg_${serverTimestamp}_${Math.random()
      .toString(36)
      .substr(2, 5)}`;
    const newMessage: Message = {
      id: msgId,
      content: message.value,
      role: "user",
      timestamp: serverTimestamp,
      parentId: Object.keys(chat.value.messages).pop(),
      branches: {
        [chat.value.currentState.branchId]: null,
      },
      tokenCounts: {}, // Добавляем поле для токенов
    };

    // Подсчёт токенов
    const tokenCount = getTokenCount(
      newMessage.content,
      tokenizerStore.selectedTokenizer
    );
    newMessage.tokenCounts![tokenizerStore.selectedTokenizer] = tokenCount;

    // Добавление сообщения в чат
    chat.value.messages[msgId] = newMessage;

    // Сохранение чата на сервере
    await fetch(
      `/api/characters/${encodeURIComponent(
        props.currentChat?.name || ""
      )}/chats/${chat.value.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chat.value),
      }
    );

    // Обновление чата с сервера
    const updatedResponse = await fetch(
      `/api/characters/${encodeURIComponent(
        props.currentChat?.name || ""
      )}/chats/${chat.value.id}`
    );
    chat.value = await updatedResponse.json();

    // Обновление локальных сообщений
    localMessages.value = Object.values(chat.value.messages).sort(
      (a, b) => a.timestamp - b.timestamp
    );

    // Очистка поля ввода
    message.value = "";
  } catch (err) {
    console.error("Не удалось сохранить сообщение:", err);
  }
}

// Функции работы со списком чатов
async function showAllChats() {
  showChatList.value = true;
  await loadChatList();
}

async function loadChatList() {
  if (!props.currentChat) return;

  try {
    const response = await fetch(
      `/api/characters/${encodeURIComponent(props.currentChat.name)}/chats`
    );
    chatList.value = await response.json();
  } catch (err) {
    console.error("Не удалось загрузить список чатов:", err);
  }
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

function getChatPreview(chatItem: any): string {
  // Получение последних сообщений для превью
  const messages = Object.values(chatItem.messages || {}).sort(
    (a: any, b: any) => b.timestamp - a.timestamp
  );
  const lastMessage = messages[0];
  return lastMessage ? lastMessage.content.slice(0, 100) + "..." : "";
}

async function selectChat(chatId: string) {
  try {
    // Получение выбранного чата
    const chatResponse = await fetch(
      `/api/characters/${encodeURIComponent(
        props.currentChat?.name || ""
      )}/chats/${chatId}`
    );
    chat.value = await chatResponse.json();

    // Обновление локальных сообщений
    localMessages.value = Object.values(chat.value.messages).sort(
      (a, b) => a.timestamp - b.timestamp
    );

    showChatList.value = false; // Скрыть список чатов

    // Обновление текущего чата
    emit("update:currentChat", {
      id: props.currentChat?.id || "",
      name: props.currentChat?.name || "",
      chatId: chatId,
    });
  } catch (err) {
    console.error("Не удалось загрузить выбранный чат:", err);
  }
}

// Дополнительные функции
function startNewChat() {
  // Реализуйте начало нового чата
  console.log("Начать новый чат");
}

function closeChat() {
  // Реализуйте закрытие текущего чата
  console.log("Закрыть чат");
}

function deleteMessages() {
  // Очистка сообщений из UI
  localMessages.value = [];
}

function regenerateMessage() {
  // Реализуйте повторную генерацию сообщения
  console.log("Повторная генерация сообщения");
}

// Наблюдение за изменениями текущего чата
watch(
  () => props.currentChat,
  async (newVal) => {
    if (newVal?.chatId) {
      try {
        // Получение полного чата с сервера
        const chatResponse = await fetch(
          `/api/characters/${encodeURIComponent(
            newVal.name
          )}/chats/${newVal.chatId}`
        );
        chat.value = await chatResponse.json();

        // Обновление локальных сообщений
        localMessages.value = Object.values(chat.value.messages).sort(
          (a, b) => a.timestamp - b.timestamp
        );
      } catch (err) {
        console.error("Не удалось загрузить чат:", err);
      }
    } else {
      chat.value = null;
      localMessages.value = [];
    }
  },
  { immediate: true }
);

// Автоскролл при добавлении нового сообщения
watch(
  () => localMessages.value.length,
  () => {
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    });
  }
);
</script>

<i18n lang="json">
{
    "en": {
        "selectCharacter": "Select a character to start a dialogue",
        "closeChatList": "Back to Chat"
    },
    "ru": {
        "selectCharacter": "Выберите персонажа для начала диалога",
        "closeChatList": "Вернуться к чату"
    }
}
</i18n>

<style scoped>
.center-column {
    width: 100%;
    height: 100vh;
    background-color: #e2e2e2;
    display: flex;
    flex-direction: column;
    padding-top: 40px; /* Высота топ-панели */
}

.content {
    flex: 1;
    overflow-y: auto;
}

.no-chat {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #666;
    font-size: 1.2rem;
}

.chat-list {
    padding: 1rem;
}

.chat-item {
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
}

.chat-item:hover {
    background-color: #f5f5f5;
}

.chat-item-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
}

.chat-item-name {
    font-size: 1rem;
}

.chat-item-date {
    font-size: 0.8rem;
    color: #999;
}

.chat-item-preview {
    font-size: 0.9rem;
    color: #555;
    margin-top: 0.5rem;
}

.close-chat-list-btn {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background-color: #4a9eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>