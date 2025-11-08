<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium', // small, medium, large
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
})

const emit = defineEmits(['close'])

// Track if mousedown started on backdrop to prevent accidental closes during text selection
const mouseDownOnBackdrop = ref(false)

const handleEscape = (e) => {
  if (e.key === 'Escape' && props.show) {
    emit('close')
  }
}

const handleBackdropMouseDown = (e) => {
  // Track if mousedown happened on backdrop (not on modal content)
  mouseDownOnBackdrop.value = (e.target === e.currentTarget)
}

const handleBackdropClick = (e) => {
  // Only close if BOTH mousedown and click happened on backdrop
  // This prevents accidental closes when dragging text selection outside modal
  if (e.target === e.currentTarget && mouseDownOnBackdrop.value) {
    emit('close')
  }
  // Reset tracking
  mouseDownOnBackdrop.value = false
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @mousedown="handleBackdropMouseDown" @click="handleBackdropClick">
        <div class="modal-container" :class="`modal-${size}`" role="dialog" aria-modal="true">
          <div class="modal-header" v-if="title || $slots.header">
            <slot name="header">
              <h2 class="modal-title">{{ title }}</h2>
            </slot>
            <button class="btn-close" @click="emit('close')" aria-label="Close modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <slot></slot>
          </div>

          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
}

.modal-container {
  background: var(--color-gray-100);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg), 0 0 40px rgba(127, 238, 100, 0.1);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.modal-small {
  max-width: 400px;
}

.modal-medium {
  max-width: 600px;
}

.modal-large {
  max-width: 750px;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.modal-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
  margin: 0;
}

.btn-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.btn-close:hover {
  color: var(--color-text);
  background: var(--color-gray-300);
}

.modal-body {
  padding: var(--space-6);
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: var(--space-2);
  justify-content: flex-end;
  flex-shrink: 0;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--transition-base);
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all var(--transition-base);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95) translateY(-20px);
}

/* Scrollbar styling */
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: var(--color-gray-200);
  border-radius: var(--radius-sm);
}

.modal-body::-webkit-scrollbar-thumb {
  background: var(--color-gray-600);
  border-radius: var(--radius-sm);
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent);
}
</style>
