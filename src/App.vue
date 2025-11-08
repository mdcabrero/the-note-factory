<script setup>
import { RouterView } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="app-container">
    <Sidebar />

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: var(--color-background);
}

.main-content {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;
  margin-left: 4em; /* Sidebar width */
  padding: var(--space-12);
  overflow-y: auto;
}

/* Subtle grid pattern background */
.main-content::before {
  content: '';
  position: fixed;
  top: 0;
  left: 4em;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(var(--color-gray-200) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-gray-200) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: var(--opacity-30);
  pointer-events: none;
  z-index: 0;
}

.main-content > * {
  position: relative;
  z-index: 1;
}
</style>
