<!-- src/components/CenterColumn/ChatMessages.vue -->
<template>
    <div class="messages">
        <div
            v-for="msg in messages"
            :key="msg.id"
            :class="['message', msg.role]"
        >
            <div
                class="message-content"
                v-html="formatMessage(msg.content)"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useI18n } from "vue-i18n";

interface Message {
    id: string;
    content: string;
    role: string;
}

const props = defineProps<{
    messages: Message[];
}>();

function formatMessage(text: string): string {
    if (!text) return "";
    let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");
    return formattedText;
}
</script>

<style scoped>
.messages {
    padding: 1rem;
}

.message {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    max-width: 80%;
}

.message.assistant {
    background: #3a3a3a;
    color: #fff;
    margin-right: auto;
}

.message.user {
    background: #4a9eff;
    color: #fff;
    margin-left: auto;
}

.message-content {
    line-height: 1.5;
}

.message-content em {
    font-style: italic;
    opacity: 0.8;
}
</style>