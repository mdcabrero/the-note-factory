<script setup>
import ModalContainer from './ModalContainer.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  variant: {
    type: String,
    default: 'danger', // danger, warning, info
    validator: (value) => ['danger', 'warning', 'info'].includes(value)
  }
})

const emit = defineEmits(['confirm', 'cancel', 'close'])

const handleConfirm = () => {
  emit('confirm')
  emit('close')
}

const handleCancel = () => {
  emit('cancel')
  emit('close')
}
</script>

<template>
  <ModalContainer :show="show" :title="title" size="small" @close="handleCancel">
    <div class="confirm-content">
      <div class="confirm-icon" :class="`icon-${variant}`">
        <svg v-if="variant === 'danger'" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9v4m0 4h.01M5.07 19.93A10 10 0 1 1 19.93 5.07 10 10 0 0 1 5.07 19.93z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else-if="variant === 'warning'" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16v-4m0-4h.01M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="confirm-message">{{ message }}</p>
    </div>

    <template #footer>
      <button class="btn-secondary" @click="handleCancel">
        {{ cancelText }}
      </button>
      <button class="btn-primary" :class="`btn-${variant}`" @click="handleConfirm">
        {{ confirmText }}
      </button>
    </template>
  </ModalContainer>
</template>

<style scoped>
.confirm-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-4) 0;
}

.confirm-icon {
  margin-bottom: var(--space-4);
  opacity: var(--opacity-90);
}

.icon-danger {
  color: #ff4444;
}

.icon-warning {
  color: #ffbb33;
}

.icon-info {
  color: var(--color-accent);
}

.confirm-message {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  max-width: 400px;
}

.btn-secondary {
  padding: var(--space-2) var(--space-6);
  background: var(--color-gray-100);
  color: var(--color-text-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
}

.btn-secondary:hover {
  background: var(--color-gray-300);
  border-color: var(--border-color-hover);
  color: var(--color-text);
}

.btn-primary {
  padding: var(--space-2) var(--space-6);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-base);
}

.btn-danger {
  background: #ff4444;
  color: #ffffff;
}

.btn-danger:hover {
  background: #cc0000;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-warning {
  background: #ffbb33;
  color: #000000;
}

.btn-warning:hover {
  background: #ff8800;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-info {
  background: var(--color-accent);
  color: #000000;
}

.btn-info:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-accent);
}
</style>
