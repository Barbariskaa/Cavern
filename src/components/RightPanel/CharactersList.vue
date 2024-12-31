<template>
    <!-- Добавил класс "characters-list-wrapper" -->
    <div class="characters-list-wrapper">
        <!-- Прогресс загрузки -->
        <div v-if="uploadProgress.total > 0" class="upload-progress">
            <div class="progress-text">
                {{ t("uploaded") }} {{ uploadProgress.current }} {{ t("of") }}
                {{ uploadProgress.total }}
            </div>
            <div class="progress-bar">
                <div
                    class="progress-fill"
                    :style="{ width: progressPercentage + '%' }"
                ></div>
            </div>
        </div>

        <!-- Анимация загрузки -->
        <div v-if="isLoading" class="loading-container">
            <div class="spinner"></div>
            <p>{{ t("loadingCharacters") }}</p>
        </div>

        <!-- Если персонажей нет -->
        <div v-else-if="characters.length === 0" class="no-chars">
            {{ t("noCharacters") }}
        </div>

        <!-- Список персонажей -->
        <div v-else class="characters-container">
            <div class="char-list">
                <div
                    v-for="char in paginatedCharacters"
                    :key="char.id"
                    class="char-item"
                    @click="selectCharacter(char)"
                >
                    <div class="char-info">
                        <div v-if="char.avatarPath" class="avatar">
                            <img
                                :src="char.avatarPath"
                                :alt="getCharDisplayName(char)"
                                loading="lazy"
                            />
                        </div>
                        <span class="char-name">
                            {{ getCharDisplayName(char) }}
                        </span>
                    </div>
                    <!-- Кнопка удаления персонажа -->
                    <button
                        class="delete-btn"
                        @click.stop="deleteCharacter(char.id)"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>

            <!-- Пагинация -->
            <div class="pagination">
                <button
                    @click="currentPage--"
                    :disabled="currentPage === 1"
                    class="page-btn"
                >
                    <i class="fa-solid fa-chevron-left"></i>
                </button>

                <span class="page-info">
                    {{ currentPage }} / {{ totalPages }}
                </span>

                <button
                    @click="currentPage++"
                    :disabled="currentPage === totalPages"
                    class="page-btn"
                >
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";

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
    uploadProgress: UploadProgress;
    isLoading: boolean;
}>();

const emit = defineEmits<{
    (e: "delete", id: string): void;
    (e: "select-char", id: string): void;
}>();

const currentPage = ref<number>(1);
const itemsPerPage = 10;

// Вычисляемое общее количество страниц
const totalPages = computed(() =>
    Math.ceil(props.characters.length / itemsPerPage),
);

// Получаем персонажей для текущей страницы
const paginatedCharacters = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return props.characters.slice(start, end);
});

// Следим за изменением количества персонажей
watch(
    () => props.characters.length,
    (newLength: number) => {
        // Корректируем текущую страницу, если необходимо
        const maxPage = Math.max(1, Math.ceil(newLength / itemsPerPage));
        if (currentPage.value > maxPage) {
            currentPage.value = maxPage;
        }
    },
);

function selectCharacter(char: Character) {
    emit("select-char", char.id);
}

function deleteCharacter(id: string) {
    emit("delete", id);
}

function getCharDisplayName(char: Character): string {
    const name = char.displayName || t("unknownCharacter");
    return name.length > 20 ? name.slice(0, 20) + "..." : name;
}

const progressPercentage = computed(() => {
    if (props.uploadProgress.total === 0) return 0;
    return (props.uploadProgress.current / props.uploadProgress.total) * 100;
});
</script>

<style scoped>
/* Стили для CharactersList.vue */

/* Оболочка для полного заполнения пространства */
.characters-list-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.characters-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.char-list {
    flex: 1;
    overflow-y: auto;
    padding: 0 1rem;
}

.char-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #444;
    cursor: pointer;
    transition: background-color 0.2s;
}

.char-item:hover {
    background-color: #3d3d3d;
}

.char-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 200px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background: #444;
    flex-shrink: 0;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.char-name {
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
}

.delete-btn {
    background: none;
    border: none;
    color: #ff4444;
    cursor: pointer;
    padding: 0.25rem;
    opacity: 0.5;
    transition: opacity 0.2s;
}

.delete-btn:hover {
    opacity: 1;
}

.pagination {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background: #252525;
    border-top: 1px solid #444;
}

.page-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.page-btn:hover:not(:disabled) {
    opacity: 1;
}

.page-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.page-info {
    min-width: 60px;
    text-align: center;
    font-size: 0.9rem;
    color: #888;
}

.upload-progress {
    margin: 0 1rem 1rem;
}

.progress-text {
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #888;
}

.progress-bar {
    height: 4px;
    background: #444;
    border-radius: 2px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: #4a9eff;
    transition: width 0.3s ease;
}

.no-chars {
    text-align: center;
    padding: 2rem;
    color: #888;
}

.loading-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #888;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #444;
    border-top-color: #4a9eff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>

<i18n lang="json" scoped>
{
    "en": {
        "uploaded": "Uploaded",
        "of": "of",
        "loadingCharacters": "Loading characters...",
        "noCharacters": "No characters available. Upload some!",
        "delete": "Delete",
        "unknownCharacter": "Unknown Character"
    },
    "ru": {
        "uploaded": "Загружено",
        "of": "из",
        "loadingCharacters": "Загрузка персонажей...",
        "noCharacters": "Нет персонажей. Загрузите кого-нибудь!",
        "delete": "Удалить",
        "unknownCharacter": "Неизвестный персонаж"
    }
}
</i18n>