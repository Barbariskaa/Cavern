<!-- components/ProgressBar.vue -->
<template>
    <Transition name="progress">
        <div v-if="show" class="progress-container">
            <div class="progress-bar">
                <div
                    class="progress-fill"
                    :style="{ width: `${progress}%` }"
                ></div>
            </div>
            <div class="progress-text">
                Загружено {{ current }} из {{ total }}
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
interface Props {
    show: boolean;
    progress: number;
    current: number;
    total: number;
}

const props = defineProps<Props>();
</script>

<style scoped>
.progress-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    padding: 0.5rem 1rem;
}

.progress-bar {
    height: 4px;
    background: #333;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 0.25rem;
}

.progress-fill {
    height: 100%;
    background: #4a9eff;
    transition: width 0.3s ease;
}

.progress-text {
    text-align: center;
    font-size: 0.8rem;
    color: #fff;
}

/* Animations */
.progress-enter-active,
.progress-leave-active {
    transition:
        transform 0.3s ease,
        opacity 0.3s ease;
}

.progress-enter-from,
.progress-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
</style>
