<script setup>
import { ref, computed, watch } from 'vue'
import { useTemplatesStore } from '@/stores/templates'
import { useUiStore } from '@/stores/ui'
import ModalContainer from './ModalContainer.vue'
import ConfirmDialog from './ConfirmDialog.vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  template: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const templatesStore = useTemplatesStore()
const uiStore = useUiStore()

const title = ref('')
const description = ref('')
const tagInput = ref('')
const tags = ref([])
const content = ref('')
const errors = ref({})
const showDeleteDialog = ref(false)

const isEditMode = computed(() => props.template !== null)
const modalTitle = computed(() => isEditMode.value ? 'Edit Template' : 'New Template')

watch(() => props.show, (newValue) => {
  if (newValue) {
    if (isEditMode.value && props.template) {
      loadTemplateData()
    } else {
      resetForm()
    }
  }
})

const loadTemplateData = () => {
  if (props.template) {
    title.value = props.template.title
    description.value = props.template.description
    tags.value = [...(props.template.tags || [])]
    content.value = props.template.content
    tagInput.value = ''
    errors.value = {}
  }
}

const resetForm = () => {
  title.value = ''
  description.value = ''
  tags.value = []
  tagInput.value = ''
  content.value = ''
  errors.value = {}
}

const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag)
    tagInput.value = ''
  }
}

const removeTag = (index) => {
  tags.value.splice(index, 1)
}

const handleTagInputKeydown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    addTag()
  }
}

const validateForm = () => {
  errors.value = {}

  if (!title.value.trim()) {
    errors.value.title = 'Title is required'
  }

  if (!description.value.trim()) {
    errors.value.description = 'Description is required'
  }

  if (!content.value.trim()) {
    errors.value.content = 'Content is required'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) return

  const templateData = {
    title: title.value.trim(),
    description: description.value.trim(),
    tags: tags.value,
    content: content.value.trim()
  }

  if (isEditMode.value) {
    templatesStore.updateTemplate(props.template.id, templateData)
    uiStore.addNotification({
      type: 'success',
      message: 'Template updated successfully!',
      duration: 3000
    })
  } else {
    templatesStore.addTemplate(templateData)
    uiStore.addNotification({
      type: 'success',
      message: 'Template created successfully!',
      duration: 3000
    })
  }

  emit('close')
}

const confirmDelete = () => {
  showDeleteDialog.value = true
}

const handleDelete = () => {
  if (props.template) {
    templatesStore.deleteTemplate(props.template.id)
    uiStore.addNotification({
      type: 'success',
      message: 'Template deleted successfully!',
      duration: 3000
    })
    showDeleteDialog.value = false
    emit('close')
  }
}

const handleCancel = () => {
  resetForm()
  emit('close')
}
</script>

<template>
  <ModalContainer :show="show" :title="modalTitle" size="large" @close="handleCancel">
    <form @submit.prevent="handleSubmit" class="template-form">
      <!-- Title Input -->
      <div class="form-group">
        <label for="template-title" class="form-label">
          Title <span class="required">*</span>
        </label>
        <input
          id="template-title"
          v-model="title"
          type="text"
          class="form-input"
          :class="{ 'error': errors.title }"
          placeholder="Enter template title..."
          autocomplete="off"
        />
        <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
      </div>

      <!-- Description Input -->
      <div class="form-group">
        <label for="template-description" class="form-label">
          Description <span class="required">*</span>
        </label>
        <input
          id="template-description"
          v-model="description"
          type="text"
          class="form-input"
          :class="{ 'error': errors.description }"
          placeholder="Brief description of this template..."
          autocomplete="off"
        />
        <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
      </div>

      <!-- Tags Input -->
      <div class="form-group">
        <label for="template-tags" class="form-label">
          Tags
        </label>
        <div class="tags-input-wrapper">
          <div class="tags-list" v-if="tags.length > 0">
            <span v-for="(tag, index) in tags" :key="index" class="tag">
              {{ tag }}
              <button type="button" class="tag-remove" @click="removeTag(index)" aria-label="Remove tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </span>
          </div>
          <div class="tag-input-group">
            <input
              id="template-tags"
              v-model="tagInput"
              type="text"
              class="form-input"
              placeholder="Add tags (press Enter)..."
              @keydown="handleTagInputKeydown"
              autocomplete="off"
            />
            <button type="button" class="btn-add-tag" @click="addTag">Add</button>
          </div>
        </div>
      </div>

      <!-- Content Textarea -->
      <div class="form-group">
        <label for="template-content" class="form-label">
          Prompt Content <span class="required">*</span>
        </label>
        <textarea
          id="template-content"
          v-model="content"
          class="form-textarea"
          :class="{ 'error': errors.content }"
          placeholder="Write your prompt template here..."
          rows="15"
        ></textarea>
        <span v-if="errors.content" class="error-message">{{ errors.content }}</span>
      </div>
    </form>

    <template #footer>
      <div class="footer-actions">
        <button
          v-if="isEditMode"
          type="button"
          class="btn-delete"
          @click="confirmDelete"
        >
          Delete
        </button>
        <div class="footer-buttons">
          <button type="button" class="btn-secondary" @click="handleCancel">
            Cancel
          </button>
          <button type="submit" class="btn-primary" @click="handleSubmit">
            {{ isEditMode ? 'Update' : 'Create' }} Template
          </button>
        </div>
      </div>
    </template>
  </ModalContainer>

  <!-- Delete Confirmation -->
  <ConfirmDialog
    :show="showDeleteDialog"
    title="Delete Template"
    message="Are you sure you want to delete this template? This action cannot be undone."
    confirm-text="Delete"
    cancel-text="Cancel"
    variant="danger"
    @confirm="handleDelete"
    @cancel="showDeleteDialog = false"
    @close="showDeleteDialog = false"
  />
</template>

<style scoped>
.template-form {
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
}

.required {
  color: #ff4444;
}

.form-input,
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
.form-textarea:focus {
  outline: none;
  border-color: var(--border-color-focus);
  box-shadow: 0 0 0 2px rgba(127, 238, 100, 0.1);
}

.form-input.error,
.form-textarea.error {
  border-color: #ff4444;
}

.form-textarea {
  resize: vertical;
  min-height: 300px;
  line-height: var(--leading-relaxed);
}

.tags-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  background: var(--color-gray-300);
  color: var(--color-accent);
  border: 1px solid var(--border-color-focus);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.tag-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.tag-remove:hover {
  color: #ff4444;
}

.tag-input-group {
  display: flex;
  gap: var(--space-2);
}

.tag-input-group .form-input {
  flex: 1;
}

.btn-add-tag {
  padding: var(--space-2) var(--space-4);
  background: var(--color-gray-100);
  color: var(--color-text-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.btn-add-tag:hover {
  background: var(--color-gray-300);
  border-color: var(--border-color-hover);
  color: var(--color-accent);
}

.error-message {
  font-size: var(--text-xs);
  color: #ff4444;
}

.footer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.footer-buttons {
  display: flex;
  gap: var(--space-2);
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

.btn-delete {
  padding: var(--space-2) var(--space-6);
  background: rgba(255, 68, 68, 0.1);
  color: #ff4444;
  border: 1px solid rgba(255, 68, 68, 0.3);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
}

.btn-delete:hover {
  background: #ff4444;
  color: #ffffff;
  border-color: #ff4444;
}
</style>
