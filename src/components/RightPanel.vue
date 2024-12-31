<template>
    <div class="right-panel">
        <!-- Обернем компоненты в контейнер с flex свойства -->
        <div class="panel-content">
            <!-- TopButtons компонент -->
            <TopButtons
                @upload="handleUpload"
                @import-by-link="importByLink"
                @create-character="createCharacter"
                @create-group-chat="createGroupChat"
            />

            <!-- CharactersList компонент -->
            <CharactersList
                :characters="characters"
                :uploadProgress="uploadProgress"
                :isLoading="isLoading"
                @delete="deleteCharacter"
                @select-char="selectCharacter"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
// Импортируем новые компоненты
import TopButtons from "./RightPanel/TopButtons.vue";
import CharactersList from "./RightPanel/CharactersList.vue";

const { t } = useI18n({
    useScope: "local",
});

// Типы
interface Character {
    id: string;
    displayName: string;
    avatarPath?: string;
}

interface UploadProgress {
    current: number;
    total: number;
}

// Props
const props = defineProps<{
    characters: Character[];
}>();

const emit = defineEmits<{
    (e: "upload", formData: FormData): void;
    (e: "import-by-link"): void;
    (e: "create-character"): void;
    (e: "create-group-chat"): void;
    (e: "delete", id: string): void;
    (e: "select-char", id: string): void;
}>();

const isLoading = ref<boolean>(true);
const uploadProgress = ref<UploadProgress>({ current: 0, total: 0 });

watch(
    () => props.characters,
    () => {
        isLoading.value = false;
    },
);

// Обработка события загрузки из TopButtons.vue
function handleUpload(formData: FormData) {
    uploadProgress.value.total += 1;
    uploadProgress.value.current += 1;
    emit("upload", formData);

    // Симуляция прогресса загрузки (настрой по своему усмотрению)
    setTimeout(() => {
        uploadProgress.value.current--;
        uploadProgress.value.total--;
    }, 2000);
}

// Перенаправление событий
function deleteCharacter(id: string) {
    emit("delete", id);
}

function selectCharacter(id: string) {
    emit("select-char", id);
}

function createCharacter() {
    emit("create-character");
}

function importByLink() {
    emit("import-by-link");
}

function createGroupChat() {
    emit("create-group-chat");
}
</script>

<style scoped>
.right-panel {
    width: 300px;
    height: 100vh;
    background: #2d2d2d;
    color: white;
    display: flex;
    flex-direction: column;
}

.panel-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
}
</style>