<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import ApiConnector from "./TopPanel/ApiConnector.vue";
import BackgroundManager from "./TopPanel/BackgroundManager.vue";
import PersonaManager from "./TopPanel/PersonaManager.vue";
import AdvancedFormatting from "./TopPanel/AdvancedFormatting.vue";
import Extensions from "./TopPanel/Extensions.vue";
import WorldInfo from "./TopPanel/WorldInfo.vue"; // Импортируем новый компонент
import UserSettings from "./TopPanel/UserSettings.vue"; // Импортируем новый компонент

// Инициализируем функцию перевода
const { t } = useI18n({
    useScope: "local",
});

const isPanelOpen = ref(false);
const currentPanel = ref(null);
const isRightPanelOpen = ref(true);
const isLeftPanelOpen = ref(true);

// Эмит надо сохранить
const emit = defineEmits(["toggleLeftPanel", "toggleRightPanel"]);

// Функция для определения, является ли кнопка особенной
function isSpecialButton(panel) {
    return panel === "left-panel" || panel === "right-panel";
}

function togglePanel(panelName) {
    console.log("togglePanel called with:", panelName);
    console.log("current state:", {
        isPanelOpen: isPanelOpen.value,
        currentPanel: currentPanel.value,
    });

    if (isSpecialButton(panelName)) {
        console.log("Special button, skipping");
        return;
    }

    if (isPanelOpen.value) {
        if (currentPanel.value === panelName) {
            console.log("Closing panel");
            isPanelOpen.value = false;
            currentPanel.value = null;
        } else {
            console.log("Switching panel");
            currentPanel.value = panelName;
        }
    } else {
        console.log("Opening panel");
        isPanelOpen.value = true;
        currentPanel.value = panelName;
    }

    console.log("new state:", {
        isPanelOpen: isPanelOpen.value,
        currentPanel: currentPanel.value,
    });
}

function toggleLeftPanel() {
    isLeftPanelOpen.value = !isLeftPanelOpen.value;
    emit("toggleLeftPanel", isLeftPanelOpen.value);

    // Закрываем дропдаун если открыт
    isPanelOpen.value = false;
    currentPanel.value = null;
}

function toggleRightPanel() {
    isRightPanelOpen.value = !isRightPanelOpen.value;
    emit("toggleRightPanel", isRightPanelOpen.value);

    // Закрываем дропдаун если открыт
    isPanelOpen.value = false;
    currentPanel.value = null;
}

// Переносим массив элементов навигации в скрипт для использования функции t()
const navItems = [
    { icon: "fa-plug", titleKey: "apiConnections", panel: "api-connector" },
    {
        icon: "fa-font",
        titleKey: "aiResponseFormat",
        panel: "advanced-formatting",
    },
    { icon: "fa-book-atlas", titleKey: "worldInfo", panel: "world-info" },
    { icon: "fa-user-cog", titleKey: "userSettings", panel: "user-settings" },
    { icon: "fa-panorama", titleKey: "changeBackground", panel: "backgrounds" },
    { icon: "fa-cubes", titleKey: "extensions", panel: "extensions" },
    { icon: "fa-face-smile", titleKey: "personaManagement", panel: "persona" },
];
</script>

<template>
    <div class="top-panel floating">
        <!-- Левая панель -->
        <div
            class="drawer"
            :title="t('aiResponseSettings')"
            @click="toggleLeftPanel"
        >
            <i
                class="fa-solid fa-sliders drawer-icon"
                :class="{ active: isLeftPanelOpen }"
            ></i>
        </div>

        <!-- Остальные кнопки -->
        <div
            v-for="(item, index) in navItems"
            :key="index"
            class="drawer"
            :title="t(item.titleKey)"
            @click="togglePanel(item.panel)"
        >
            <i
                :class="[
                    'fa-solid',
                    item.icon,
                    'drawer-icon',
                    { active: isPanelOpen && currentPanel === item.panel },
                ]"
            ></i>
        </div>

        <!-- Правая панель -->
        <div
            class="drawer"
            :title="t('characterManagement')"
            @click="toggleRightPanel"
        >
            <i
                class="fa-solid fa-address-card drawer-icon"
                :class="{ active: isRightPanelOpen }"
            ></i>
        </div>
    </div>

    <!-- Выпадающая панель -->
    <Transition name="slide">
        <div v-show="isPanelOpen" class="dropdown-panel">
            <div style="color: white; padding: 20px">
                DEBUG: {{ currentPanel }}
            </div>
            <ApiConnector
                v-if="currentPanel === 'api-connector'"
                :is-open="isPanelOpen"
                @update:is-open="isPanelOpen = $event"
            />
            <BackgroundManager
                v-if="currentPanel === 'backgrounds'"
                :is-open="isPanelOpen"
                @update:is-open="isPanelOpen = $event"
            />
            <Extensions
                v-if="currentPanel === 'extensions'"
                :is-open="isPanelOpen"
                @update:is-open="isPanelOpen = $event"
            />
            <PersonaManager
                v-if="currentPanel === 'persona'"
                :is-open="isPanelOpen"
                @update:is-open="isPanelOpen = $event"
            />
            <AdvancedFormatting
                v-if="currentPanel === 'advanced-formatting'"
                :is-open="isPanelOpen"
                @update:is-open="isPanelOpen = $event"
            />
            <WorldInfo
                v-if="currentPanel === 'world-info'"
                :is-open="isPanelOpen"
                @update:is-open="isPanelOpen = $event"
            />
            <UserSettings
                v-if="currentPanel === 'user-settings'"
                :is-open="isPanelOpen"
                @update:is-open="isPanelOpen = $event"
            />
        </div>
    </Transition>
</template>

<i18n lang="json">
{
    "en": {
        "aiResponseSettings": "AI Response Settings",
        "apiConnections": "API Connections",
        "aiResponseFormat": "AI Response Format",
        "worldInfo": "World Information",
        "userSettings": "User Settings",
        "changeBackground": "Change Background",
        "extensions": "Extensions",
        "personaManagement": "Persona Management",
        "characterManagement": "Character Management"
    },
    "ru": {
        "aiResponseSettings": "Настройка ответа ИИ",
        "apiConnections": "Соединения с API",
        "aiResponseFormat": "Формат ответа ИИ",
        "worldInfo": "Информация о мире",
        "userSettings": "Настройки пользователя",
        "changeBackground": "Изменить фон",
        "extensions": "Расширения",
        "personaManagement": "Управление персоной",
        "characterManagement": "Управление персонажами"
    }
}
</i18n>

<style scoped>
/* Ваши стили остаются без изменений */
.top-panel {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    background: rgba(32, 32, 32, 0.85);
    backdrop-filter: blur(5px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1000;
}

.top-panel.floating {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50vw; /* Ширина центральной колонки */
    z-index: 1000;
}

.drawer {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    flex: 1;
}

.drawer:last-child {
    border-right: none;
}

.drawer::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #4a9eff;
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.drawer:hover::after {
    transform: scaleX(1);
}

.drawer-icon {
    color: #fff;
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.drawer:hover {
    background: rgba(255, 255, 255, 0.1);
}

.drawer:hover .drawer-icon {
    transform: translateY(-2px);
    color: #4a9eff;
}

/* Добавляем анимацию появления панели */
@keyframes slideDown {
    from {
        transform: translate(-50%, -100%);
        opacity: 0;
    }
    to {
        transform: translate(-50%, 0);
        opacity: 1;
    }
}

.top-panel.floating {
    animation: slideDown 0.3s ease forwards;
}

.drawer-icon.active {
    color: #4a9eff;
}

.dropdown-panel {
    position: fixed;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 50vw;
    background: #2d2d2d;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 999;
    padding: 20px;

    /* Настройки высоты в правильном порядке */
    height: fit-content;
    max-height: calc(100vh - 60px);

    /* Контент */
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.api-connector,
.background-manager {
    width: 100%;
    height: auto;
    min-height: 200px; /* Минимальная высота компонентов */
}

.dropdown-panel.open {
    opacity: 1;
    transform: translate(-50%, 0);
}

/* Стилизация скроллбара */
.dropdown-panel::-webkit-scrollbar {
    width: 6px;
}

.dropdown-panel::-webkit-scrollbar-track {
    background: #1e1e1e;
}

.dropdown-panel::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 3px;
}

.dropdown-panel::-webkit-scrollbar-thumb:hover {
    background: #555;
}

/* Анимация для выпадающей панели */
.slide-enter-active,
.slide-leave-active {
    transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translate(-50%, -20px);
}

.slide-enter-to,
.slide-leave-from {
    opacity: 1;
    transform: translate(-50%, 0);
}
</style>
