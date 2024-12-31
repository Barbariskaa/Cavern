<template>
    <div>
        <!-- Верхняя строка с кнопками, полем поиска и сортировки -->
        <div class="top-row">
            <!-- Кнопки действий без подписей -->
            <div class="action-buttons">
                <button
                    class="action-button"
                    title="Создать персонажа"
                    @click="createCharacter"
                >
                    <i class="fa-solid fa-user-plus"></i>
                </button>
                <button
                    class="action-button"
                    title="Импорт по ссылке"
                    @click="importByLink"
                >
                    <i class="fa-solid fa-link"></i>
                </button>
                <button
                    class="action-button"
                    title="Создать групповой чат"
                    @click="createGroupChat"
                >
                    <i class="fa-solid fa-users"></i>
                </button>
                <!-- Зона загрузки в виде кнопки -->
                <div
                    class="action-button upload-button"
                    @dragover.prevent
                    @drop.prevent="handleDrop"
                    :class="{ dragging: isDragging }"
                    @dragenter.prevent="isDragging = true"
                    @dragleave.prevent="isDragging = false"
                    title="Загрузить персонажей"
                >
                    <input
                        type="file"
                        accept=".json,.png,.avif"
                        @change="handleFiles"
                        multiple
                        class="file-input"
                        ref="fileInput"
                    />
                    <i class="fa-solid fa-upload"></i>
                </div>
            </div>

            <!-- Поле поиска персонажей -->
            <input
                type="search"
                class="search-input"
                placeholder="Поиск..."
                :title="t('searchPlaceholder')"
            />

            <!-- Поле сортировки персонажей -->
            <select
                class="sort-select"
                :title="t('sortTitle')"
            >
                <option disabled selected>{{ t('sortTitle') }}</option>
                <option value="name_asc">{{ t('sortByNameAsc') }}</option>
                <option value="name_desc">{{ t('sortByNameDesc') }}</option>
                <option value="date_new">{{ t('sortByDateNew') }}</option>
                <option value="date_old">{{ t('sortByDateOld') }}</option>
                <!-- Добавьте остальные опции, если необходимо -->
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n({
    useScope: "local",
});

const emit = defineEmits<{
    (e: "upload", formData: FormData): void;
    (e: "import-by-link"): void;
    (e: "create-character"): void;
    (e: "create-group-chat"): void;
}>();

const isDragging = ref<boolean>(false);

function handleFiles(event: Event | DragEvent) {
    const files =
        (event.target as HTMLInputElement).files ||
        (event as DragEvent).dataTransfer?.files;
    if (!files) return;

    const formData = new FormData();
    for (const file of files) {
        formData.append("file", file);
        formData.append("type", file.type);
    }
    emit("upload", formData);
}

function handleDrop(event: DragEvent) {
    isDragging.value = false;
    handleFiles(event);
}

// Функции кнопок действий
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
/* Стили для TopButtons.vue */

/* Верхняя строка с элементами */
.top-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem;
    flex-wrap: wrap;
}

/* Кнопки действий без подписей */
.action-buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.action-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    border-radius: 4px;
}

.action-button:hover {
    background-color: #3d3d3d;
}

.upload-button {
    position: relative;
    overflow: hidden;
}

.upload-button .file-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

/* Поле поиска */
.search-input {
    flex: 1;
    min-width: 100px;
    padding: 0.5rem;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: #2d2d2d;
    color: white;
}

/* Поле сортировки */
.sort-select {
    padding: 0.5rem;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: #2d2d2d;
    color: white;
}

/* Стили при перетаскивании файлов */
.upload-button.dragging {
    border: 2px dashed #4a9eff;
    background: rgba(74, 158, 255, 0.1);
}

/* Адаптивные стили для маленьких экранов */
@media (max-width: 600px) {
    .top-row {
        flex-wrap: wrap;
    }

    .search-input,
    .sort-select {
        flex: 1 1 100%;
        margin-top: 0.5rem;
    }
}
</style>

<i18n lang="json" scoped>
{
    "en": {
        "importByLink": "Import by Link",
        "createCharacter": "Create Character",
        "createGroupChat": "Create Group Chat",
        "searchPlaceholder": "Search...",
        "sortTitle": "Sort characters",
        "sortByNameAsc": "Name (A-Z)",
        "sortByNameDesc": "Name (Z-A)",
        "sortByDateNew": "Newest First",
        "sortByDateOld": "Oldest First"
    },
    "ru": {
        "importByLink": "Импорт по ссылке",
        "createCharacter": "Создать персонажа",
        "createGroupChat": "Создать групповой чат",
        "searchPlaceholder": "Поиск...",
        "sortTitle": "Сортировка персонажей",
        "sortByNameAsc": "Имя (А-Я)",
        "sortByNameDesc": "Имя (Я-А)",
        "sortByDateNew": "Новые сначала",
        "sortByDateOld": "Старые сначала"
    }
}
</i18n>