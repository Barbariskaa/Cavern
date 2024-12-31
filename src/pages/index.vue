<template>
    <Head>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
    </Head>

    <ProgressBar
        :show="uploadProgress.total > 0"
        :progress="progressPercentage"
        :current="uploadProgress.current"
        :total="uploadProgress.total"
    />

    <div class="wrapper">
        <Transition name="slide-left">
            <LeftPanel v-if="showLeftPanel" class="fixed-left-panel" />
        </Transition>

        <Transition name="slide-right">
            <RightPanel
                v-show="showRightPanel"
                :characters="characters"
                @upload="handleFileUpload"
                @select-char="startChat"
                @delete="deleteCharacter"
                class="fixed-right-panel"
            />
        </Transition>

        <div class="center-container">
            <TopPanel
                @toggleLeftPanel="toggleLeftPanel"
                @toggleRightPanel="toggleRightPanel"
            />
            <CenterColumn
                :current-chat="currentChat"
                :messages="messages"
                @send-message="handleMessage"
                @update:currentChat="(value) => (currentChat = value)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import ProgressBar from "~/components/ProgressBar.vue";
import TopPanel from "~/components/TopPanel.vue";
import LeftPanel from "~/components/LeftPanel.vue";
import CenterColumn from "~/components/CenterColumn.vue";
import RightPanel from "~/components/RightPanel.vue";

// Define interfaces for typings
interface Character {
    id: string;
    displayName: string;
    avatarPath?: string;
    cardPath?: string;
    // Add other properties as needed
}

interface UploadProgress {
    current: number;
    total: number;
}

interface Chat {
    id: string;
    name: string;
    chatId?: string;
}

interface Message {
    id: string;
    content: string;
    role: string;
    timestamp: number;
    chatId?: string;
    parentId?: string;
    branches?: Record<string, any>;
}

// Reactive references with types
const characters = ref<Character[]>([]);
const showLeftPanel = ref<boolean>(true);
const showRightPanel = ref<boolean>(true);
const uploadProgress = ref<UploadProgress>({ current: 0, total: 0 });
const currentChat = ref<Chat | null>(null);
const messages = ref<Message[]>([]);

// Computed property for progress percentage
const progressPercentage = computed(() => {
    if (uploadProgress.value.total === 0) return 0;
    return (uploadProgress.value.current / uploadProgress.value.total) * 100;
});

// Function to start chat with a character
function startChat(charId: string) {
    const char = characters.value.find((c) => c.id === charId);
    if (!char) {
        console.error("Character not found");
        return;
    }
    currentChat.value = { id: charId, name: char.displayName };
    messages.value = [];
    createChat(charId);
}

async function createChat(characterId: string) {
    try {
        const responseChar = await fetch(
            `/api/characters/${encodeURIComponent(characterId)}/full`,
        );
        const charData = await responseChar.json();

        const responseChat = await fetch(
            `/api/characters/${encodeURIComponent(characterId)}/chats`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstMessage:
                        charData.data?.first_mes || charData.first_mes || "",
                }),
            },
        );
        const chatData = await responseChat.json();

        // Replace the entire currentChat object to trigger reactivity
        currentChat.value = {
            ...currentChat.value!,
            chatId: chatData.id,
        };
    } catch (err) {
        console.error("Failed to create chat:", err);
    }
}

async function handleFileUpload(formData: FormData) {
    try {
        // Update progress
        if (uploadProgress.value.total === 0) {
            uploadProgress.value.total = 1;
        }

        const response = await fetch("/api/characters", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        if (result.success) {
            characters.value.push(result.character);
            uploadProgress.value.current++;
        }

        // Reset progress after a short delay
        if (uploadProgress.value.current === uploadProgress.value.total) {
            setTimeout(() => {
                uploadProgress.value = { current: 0, total: 0 };
            }, 1000);
        }
    } catch (err) {
        console.error("Ошибка загрузки файла:", err);
        // Reset progress on error
        uploadProgress.value = { current: 0, total: 0 };
    }
}

async function deleteCharacter(characterId: string) {
    try {
        await fetch(`/api/characters/${encodeURIComponent(characterId)}`, {
            method: "DELETE",
        });
        characters.value = characters.value.filter((c) => c.id !== characterId);
    } catch (err) {
        console.error("Error deleting character:", err);
    }
}

function toggleLeftPanel(value: boolean) {
    showLeftPanel.value = value;
}

function toggleRightPanel(value: boolean) {
    showRightPanel.value = value;
}

// Message handler
async function handleMessage(message: Message) {
    // Add user's message to UI
    messages.value.push(message);

    try {
        // Placeholder for bot response (you can enhance this by integrating a real response)
        const botResponse: Message = {
            id: `msg_${Date.now() + 1}`,
            content: `*отвечает на сообщение* <q>"${message.content}"</q>`,
            role: "assistant",
            timestamp: Date.now() + 1,
            parentId: message.id,
            chatId: message.chatId,
            branches: {
                [message.chatId || ""]: null,
            },
        };

        // Add bot's message to UI
        messages.value.push(botResponse);
    } catch (err) {
        console.error("Failed to handle bot response:", err);
    }
}

// Load characters on mount
onMounted(async () => {
    try {
        // Загружаем персонажей
        const response = await fetch("/api/characters");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        characters.value = data;

        // Загружаем сохранённый фон
        const bgResponse = await fetch('/api/backgrounds/current');
        if (bgResponse.ok) {
            const { background } = await bgResponse.json();
            if (background) {
                // Применяем фон
                document.body.style.backgroundImage = `url(${background.url})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundRepeat = 'no-repeat';
            }
        }
    } catch (err) {
        console.error("Ошибка загрузки данных:", err);
        characters.value = [];
    }
});
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    overflow: hidden;
}

.wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    position: relative;
}

/* Fixed side panels */
.fixed-left-panel {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 300px;
    z-index: 100;
}

.fixed-right-panel {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 300px;
    z-index: 100;
}

/* Center container */
.center-container {
    width: 50vw;
    flex-shrink: 0;
    position: relative;
}

/* Animations */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
    transform: translateX(-100%);
}

.slide-right-enter-from,
.slide-right-leave-to {
    transform: translateX(100%);
}
</style>
