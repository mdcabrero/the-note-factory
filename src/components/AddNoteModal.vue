<script setup>
import { ref, computed, watch } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { useUiStore } from '@/stores/ui'
import ModalContainer from './ModalContainer.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  initialCategory: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const notesStore = useNotesStore()
const uiStore = useUiStore()

const title = ref('')
const category = ref('')
const content = ref('')
const errors = ref({})
const showNewCategoryInput = ref(false)
const newCategoryName = ref('')
const contentTextarea = ref(null)

const categories = computed(() => notesStore.allCategories)

watch(() => props.show, (newValue) => {
  if (newValue) {
    resetForm()
    if (props.initialCategory) {
      category.value = props.initialCategory
    }
  }
})

const resetForm = () => {
  title.value = ''
  category.value = props.initialCategory || ''
  content.value = ''
  errors.value = {}
  showNewCategoryInput.value = false
  newCategoryName.value = ''
}

const validateForm = () => {
  errors.value = {}

  if (!title.value.trim()) {
    errors.value.title = 'Title is required'
  }

  if (!category.value && !newCategoryName.value.trim()) {
    errors.value.category = 'Please select or create a category'
  }

  if (!content.value.trim()) {
    errors.value.content = 'Content is required'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) return

  let selectedCategory = category.value

  // If creating a new category
  if (showNewCategoryInput.value && newCategoryName.value.trim()) {
    selectedCategory = newCategoryName.value.trim()
    notesStore.addCategory(selectedCategory)
  }

  // Add the note
  notesStore.addNote(selectedCategory, {
    title: title.value.trim(),
    content: content.value.trim()
  })

  uiStore.addNotification({
    type: 'success',
    message: 'Note added successfully!',
    duration: 3000
  })

  emit('close')
}

const handleCancel = () => {
  resetForm()
  emit('close')
}

const toggleNewCategory = () => {
  showNewCategoryInput.value = !showNewCategoryInput.value
  if (showNewCategoryInput.value) {
    category.value = ''
  } else {
    newCategoryName.value = ''
  }
}

const insertCodeBlock = () => {
  const textarea = contentTextarea.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = content.value.substring(start, end)

  const codeBlock = selectedText
    ? `\`\`\`\n${selectedText}\n\`\`\``
    : `\`\`\`\n\n\`\`\``

  // Insert the code block
  content.value = content.value.substring(0, start) + codeBlock + content.value.substring(end)

  // Set cursor position after insertion
  setTimeout(() => {
    if (selectedText) {
      // If text was selected, place cursor after the code block
      textarea.selectionStart = textarea.selectionEnd = start + codeBlock.length
    } else {
      // If no text was selected, place cursor inside the empty code block
      const cursorPos = start + 4
      textarea.selectionStart = textarea.selectionEnd = cursorPos
    }
    textarea.focus()
  }, 0)
}
</script>

<template>
  <ModalContainer :show="show" title="Add New Note" size="large" @close="handleCancel">
    <form @submit.prevent="handleSubmit" class="note-form">
      <!-- Title Input -->
      <div class="form-group">
        <label for="note-title" class="form-label">
          Title <span class="required">*</span>
        </label>
        <input
          id="note-title"
          v-model="title"
          type="text"
          class="form-input"
          :class="{ 'error': errors.title }"
          placeholder="Enter note title..."
          autocomplete="off"
        />
        <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
      </div>

      <!-- Category Selection -->
      <div class="form-group">
        <div class="category-header">
          <label for="note-category" class="form-label">
            Category <span class="required">*</span>
          </label>
          <button
            type="button"
            class="btn-new-category"
            @click="toggleNewCategory"
          >
            {{ showNewCategoryInput ? 'Select Existing' : '+ New Category' }}
          </button>
        </div>

        <select
          v-if="!showNewCategoryInput"
          id="note-category"
          v-model="category"
          class="form-select"
          :class="{ 'error': errors.category }"
        >
          <option value="" disabled>Select a category...</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <input
          v-else
          v-model="newCategoryName"
          type="text"
          class="form-input"
          :class="{ 'error': errors.category }"
          placeholder="Enter new category name..."
          autocomplete="off"
        />

        <span v-if="errors.category" class="error-message">{{ errors.category }}</span>
      </div>

      <!-- Content Textarea -->
      <div class="form-group">
        <div class="content-header">
          <label for="note-content" class="form-label">
            Content <span class="required">*</span>
          </label>
          <button
            type="button"
            class="btn-code-block"
            @click="insertCodeBlock"
            title="Insert code block"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Code Block</span>
          </button>
        </div>

        <textarea
          ref="contentTextarea"
          id="note-content"
          v-model="content"
          class="form-textarea"
          :class="{ 'error': errors.content }"
          placeholder="Write your note content here..."
          rows="12"
        ></textarea>

        <span v-if="errors.content" class="error-message">{{ errors.content }}</span>
      </div>
    </form>

    <template #footer>
      <button type="button" class="btn-secondary" @click="handleCancel">
        Cancel
      </button>
      <button type="submit" class="btn-primary" @click="handleSubmit">
        Add Note
      </button>
    </template>
  </ModalContainer>
</template>

<style scoped>
.note-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text);
  padding-right: 1em;
}

.required {
  color: #ff4444;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: var(--space-2) var(--space-4);
  background: var(--color-background);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--color-text);
  font-size: var(--text-sm);
  font-family: inherit;
  transition: all var(--transition-fast);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--border-color-focus);
  box-shadow: 0 0 0 2px rgba(127, 238, 100, 0.1);
}

.form-input.error,
.form-select.error,
.form-textarea.error {
  border-color: #ff4444;
}

.form-select {
  cursor: pointer;
  padding-right: 2.5rem;
  /* Remove browser default arrow */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  /* Add custom dropdown arrow */
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23A1A1A1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
}

.form-textarea {
  resize: vertical;
  min-height: 180px;
  font-family: var(--font-mono);
  line-height: var(--leading-relaxed);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#note-category {
  padding-right: 1em;
}

.btn-new-category {
  font-size: var(--text-xs);
  color: var(--color-accent);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  font-weight: var(--font-medium);
}

.btn-new-category:hover {
  background: var(--color-gray-300);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
}

.error-message {
  font-size: var(--text-xs);
  color: #ff4444;
}

.btn-primary {
  padding: var(--space-2) var(--space-6);
  background: var(--color-accent);
  color: #000000;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: all var(--transition-base);
  box-shadow: var(--shadow-base);
}

.btn-primary:hover {
  background: var(--color-accent-hover);
  box-shadow: var(--shadow-accent);
  transform: translateY(-1px);
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

.btn-code-block {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  background: var(--color-gray-200);
  color: var(--color-text-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
}

.btn-code-block:hover {
  background: var(--color-gray-300);
  color: var(--color-accent);
  border-color: var(--border-color-focus);
}

.btn-code-block svg {
  flex-shrink: 0;
}
</style>
