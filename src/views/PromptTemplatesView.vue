<script setup>
import { ref, computed } from 'vue'
import { useUiStore } from '@/stores/ui'
import { useTemplatesStore } from '@/stores/templates'
import AddEditTemplateModal from '@/components/AddEditTemplateModal.vue'

const uiStore = useUiStore()
const templatesStore = useTemplatesStore()

uiStore.setActiveView('prompt-templates')

const searchQuery = ref('')
const selectedTemplate = ref(null)
const showTemplateModal = ref(false)
const templateToEdit = ref(null)

const allTemplates = computed(() => templatesStore.templates)

const filteredTemplates = computed(() => {
  if (!searchQuery.value.trim()) {
    return allTemplates.value
  }
  return templatesStore.searchTemplates(searchQuery.value)
})

const selectTemplate = (template) => {
  selectedTemplate.value = template
}

const openNewTemplateModal = () => {
  templateToEdit.value = null
  showTemplateModal.value = true
}

const openEditTemplateModal = (template) => {
  templateToEdit.value = template
  showTemplateModal.value = true
}

const closeTemplateModal = () => {
  showTemplateModal.value = false
  templateToEdit.value = null
}

const handleCopyTemplate = async (templateId) => {
  const success = await templatesStore.copyToClipboard(templateId)
  if (success) {
    uiStore.addNotification({
      type: 'success',
      message: 'Template copied to clipboard!',
      duration: 3000
    })
  } else {
    uiStore.addNotification({
      type: 'error',
      message: 'Failed to copy template',
      duration: 3000
    })
  }
}

const handleExport = () => {
  templatesStore.exportTemplates()
  uiStore.addNotification({
    type: 'success',
    message: 'Templates exported successfully!',
    duration: 3000
  })
}
</script>

<template>
  <div class="templates-view">
    <header class="view-header">
      <h1 class="view-title">Prompt Templates</h1>
      <p class="view-subtitle">Reusable prompt templates for common tasks</p>
    </header>

    <div class="content-section">
      <div class="action-bar">
        <button class="btn-primary" @click="openNewTemplateModal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>New Template</span>
        </button>

        <div class="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search templates..."
            aria-label="Search templates"
          />
        </div>

        <button class="btn-secondary" @click="handleExport" title="Export templates">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="templates-container">
        <!-- Templates List -->
        <div class="templates-list">
          <article
            v-for="template in filteredTemplates"
            :key="template.id"
            class="template-card"
            :class="{ 'active': selectedTemplate?.id === template.id }"
            @click="selectTemplate(template)"
          >
            <div class="card-content">
              <h3 class="card-title">{{ template.title }}</h3>
              <p class="card-description">{{ template.description }}</p>
              <div class="tags" v-if="template.tags && template.tags.length > 0">
                <span v-for="tag in template.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
            <div class="card-actions">
              <button
                class="btn-icon"
                @click.stop="openEditTemplateModal(template)"
                title="Edit template"
                aria-label="Edit template"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button
                class="btn-icon"
                @click.stop="handleCopyTemplate(template.id)"
                title="Copy to clipboard"
                aria-label="Copy to clipboard"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </article>

          <!-- Empty state -->
          <div v-if="allTemplates.length === 0" class="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            <h3>No templates yet</h3>
            <p>Create your first prompt template to get started</p>
            <button class="btn-primary" @click="openNewTemplateModal" style="margin-top: var(--space-4);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>Create Template</span>
            </button>
          </div>

          <!-- No Search Results -->
          <div v-else-if="filteredTemplates.length === 0 && searchQuery" class="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <h3>No results found</h3>
            <p>Try different search terms</p>
          </div>
        </div>

        <!-- Template Preview Panel -->
        <aside v-if="selectedTemplate" class="preview-panel">
          <div class="panel-header">
            <h2>{{ selectedTemplate.title }}</h2>
            <button class="btn-close" @click="selectedTemplate = null">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="panel-content">
            <div class="info-section">
              <label>Description</label>
              <p>{{ selectedTemplate.description }}</p>
            </div>
            <div class="info-section">
              <label>Tags</label>
              <div class="tags">
                <span v-for="tag in selectedTemplate.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
            <div class="info-section">
              <label>Prompt</label>
              <div class="prompt-preview">
                <code>{{ selectedTemplate.prompt }}</code>
              </div>
            </div>
            <div class="panel-actions">
              <button class="btn-primary full-width">Use Template</button>
              <button class="btn-secondary full-width">Edit Template</button>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Add/Edit Template Modal -->
    <AddEditTemplateModal
      :show="showTemplateModal"
      :template="templateToEdit"
      @close="closeTemplateModal"
    />
  </div>
</template>

<style scoped>
.templates-view {
  width: 100%;
  max-width: var(--container-2xl);
}

.view-header {
  margin-bottom: var(--space-12);
}

.view-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.view-subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
}

.content-section {
  width: 100%;
}

.action-bar {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
  flex-wrap: wrap;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: var(--space-2);
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

.btn-primary.full-width {
  width: 100%;
  justify-content: center;
}

.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
  background: var(--color-gray-100);
  color: var(--color-text-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.btn-secondary:hover {
  background: var(--color-gray-300);
  color: var(--color-accent);
  border-color: var(--border-color-focus);
}

.btn-secondary.full-width {
  width: 100%;
}

.search-box {
  flex: 1;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--color-gray-100);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast);
}

.search-box:focus-within {
  border-color: var(--border-color-focus);
}

.search-box svg {
  color: var(--color-gray-600);
  flex-shrink: 0;
}

.search-box input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--color-text);
  font-size: var(--text-sm);
}

.search-box input::placeholder {
  color: var(--color-gray-600);
}

.templates-container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--space-8);
  align-items: start;
}

@media (max-width: 1200px) {
  .templates-container {
    grid-template-columns: 1fr;
  }
}

.templates-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.template-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-gray-100);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--transition-base);
  cursor: pointer;
}

.template-card:hover {
  background: var(--color-gray-200);
  border-color: var(--border-color-hover);
  transform: translateX(4px);
}

.template-card.active {
  background: var(--color-gray-200);
  border-color: var(--border-color-focus);
  box-shadow: var(--shadow-accent);
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text);
  margin-bottom: var(--space-1);
}

.card-description {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-4);
}

.tags {
  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  background: var(--color-gray-300);
  color: var(--color-accent);
  border: 1px solid var(--border-color-focus);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.card-actions {
  display: flex;
  gap: var(--space-2);
  margin-left: var(--space-4);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--color-gray-300);
  color: var(--color-text-secondary);
  border: 1px solid var(--border-color-hover);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.btn-icon:hover {
  background: var(--color-gray-200);
  color: var(--color-accent);
  border-color: var(--border-color-focus);
}

.preview-panel {
  position: sticky;
  top: var(--space-8);
  background: var(--color-gray-100);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-color);
  background: var(--color-gray-200);
}

.panel-header h2 {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
}

.btn-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.btn-close:hover {
  color: var(--color-text);
}

.panel-content {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.info-section label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-accent);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.info-section p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
}

.prompt-preview {
  background: var(--color-background);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.prompt-preview code {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-accent);
  line-height: var(--leading-relaxed);
  word-wrap: break-word;
  white-space: pre-wrap;
}

.panel-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16);
  text-align: center;
  color: var(--color-gray-600);
}

.empty-state svg {
  margin-bottom: var(--space-6);
  opacity: var(--opacity-50);
}

.empty-state h3 {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.empty-state p {
  font-size: var(--text-sm);
  color: var(--color-gray-600);
}
</style>
