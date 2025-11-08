<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useNotesStore } from '@/stores/notes'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml' // HTML
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/atom-one-dark.css'

// Register languages
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('python', python)
hljs.registerLanguage('vue', xml)

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()
const notesStore = useNotesStore()

uiStore.setActiveView('knowledge')

const categoryName = computed(() => decodeURIComponent(route.params.category))
const searchQuery = ref('')
const showDeleteDialog = ref(false)
const noteToDelete = ref(null)

const allNotes = computed(() => notesStore.getNotesByCategory(categoryName.value))

const filteredNotes = computed(() => {
  if (!searchQuery.value.trim()) {
    return allNotes.value
  }
  return notesStore.searchNotes(categoryName.value, searchQuery.value)
})

const goBack = () => {
  router.push({ name: 'knowledge' })
}

const confirmDelete = (note) => {
  noteToDelete.value = note
  showDeleteDialog.value = true
}

const handleDeleteNote = () => {
  if (noteToDelete.value) {
    const success = notesStore.deleteNote(categoryName.value, noteToDelete.value.id)
    if (success) {
      uiStore.addNotification({
        type: 'success',
        message: 'Note deleted successfully',
        duration: 3000
      })
    }
    noteToDelete.value = null
  }
}

const cancelDelete = () => {
  noteToDelete.value = null
}

// Process content with code highlighting
const processContent = (content) => {
  if (!content) return ''

  // Replace code blocks with highlighted versions
  return content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'javascript'
    try {
      const highlighted = hljs.highlight(code.trim(), { language }).value
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
    } catch (e) {
      return `<pre><code>${code.trim()}</code></pre>`
    }
  })
}

onMounted(() => {
  // Verify category exists
  if (!notesStore.allCategories.includes(categoryName.value)) {
    router.push({ name: 'knowledge' })
  }
})
</script>

<template>
  <div class="category-view">
    <!-- Header with Back Button -->
    <header class="view-header">
      <button class="btn-back" @click="goBack" aria-label="Back to knowledge base">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Back</span>
      </button>

      <div class="header-info">
        <h1 class="view-title">{{ categoryName }} Notes</h1>
        <p class="view-subtitle">
          {{ filteredNotes.length }}
          {{ filteredNotes.length === 1 ? 'note' : 'notes' }}
        </p>
      </div>
    </header>

    <!-- Search Bar -->
    <div class="search-section">
      <div class="search-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search notes in this category..."
          aria-label="Search notes"
        />
      </div>
    </div>

    <!-- Notes Container (Document-like Layout) -->
    <div class="notes-container">
      <article
        v-for="note in filteredNotes"
        :key="note.id"
        class="note-card"
      >
        <div class="note-header">
          <h2 class="note-title"># {{ note.title }}</h2>
          <button
            class="btn-delete"
            @click="confirmDelete(note)"
            aria-label="Delete note"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="note-content" v-html="processContent(note.content)"></div>
      </article>

      <!-- Empty State -->
      <div v-if="filteredNotes.length === 0 && !searchQuery" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 2C7 2 5 4 5 6.5V18C5 20.21 6.79 22 9 22H18C19.1 22 20 21.1 20 20V7L14 2H9.5Z"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3>No notes in this category</h3>
        <p>Start adding notes to {{ categoryName }}</p>
      </div>

      <!-- No Search Results -->
      <div v-else-if="filteredNotes.length === 0 && searchQuery" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <h3>No results found</h3>
        <p>Try different search terms</p>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      :show="showDeleteDialog"
      title="Delete Note"
      message="Are you sure you want to delete this note? This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      variant="danger"
      @confirm="handleDeleteNote"
      @cancel="cancelDelete"
      @close="showDeleteDialog = false"
    />
  </div>
</template>

<style scoped>
.category-view {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.view-header {
  margin-bottom: var(--space-8);
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--color-gray-100);
  color: var(--color-text-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
  margin-bottom: var(--space-6);
}

.btn-back:hover {
  background: var(--color-gray-300);
  color: var(--color-accent);
  border-color: var(--border-color-focus);
  transform: translateX(-2px);
}

.header-info {
  margin-bottom: var(--space-2);
}

.view-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.view-subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}

.search-section {
  margin-bottom: var(--space-8);
}

.search-box {
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
  box-shadow: 0 0 0 2px rgba(127, 238, 100, 0.1);
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

.notes-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.note-card {
  background: var(--color-gray-100);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  transition: all var(--transition-base);
}

.note-card:hover {
  border-color: var(--border-color-hover);
  box-shadow: var(--shadow-md);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-color);
}

.note-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
  line-height: var(--leading-tight);
  flex: 1;
}

.btn-delete {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.btn-delete:hover {
  background: rgba(255, 68, 68, 0.1);
  color: #ff4444;
  border-color: rgba(255, 68, 68, 0.3);
}

.note-content {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Code block styling */
.note-content :deep(pre) {
  background: var(--color-background);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  overflow-x: auto;
  margin-top: 1em;
  margin-bottom: -0.5em;
}

.note-content :deep(code) {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
}

.note-content :deep(pre code) {
  background: none;
  padding: 0;
  border: none;
}

/* Inline code */
.note-content :deep(code:not(pre code)) {
  background: var(--color-gray-300);
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-sm);
  font-size: 0.9em;
  color: var(--color-accent);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16);
  text-align: center;
  color: var(--color-gray-600);
  min-height: 300px;
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

@media (max-width: 768px) {
  .category-view {
    max-width: 100%;
  }

  .note-card {
    padding: var(--space-6);
  }

  .note-title {
    font-size: var(--text-xl);
  }
}
</style>
