<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useNotesStore } from '@/stores/notes'
import AddNoteModal from '@/components/AddNoteModal.vue'

const router = useRouter()
const uiStore = useUiStore()
const notesStore = useNotesStore()

uiStore.setActiveView('knowledge')

const showAddNoteModal = ref(false)

const categories = computed(() => notesStore.categories)

const navigateToCategory = (categoryName) => {
  router.push({
    name: 'category',
    params: { category: encodeURIComponent(categoryName) }
  })
}

const openAddNoteModal = () => {
  showAddNoteModal.value = true
}

const closeAddNoteModal = () => {
  showAddNoteModal.value = false
}
</script>

<template>
  <div class="directory-view">
    <header class="view-header">
      <div class="header-content">
        <div>
          <h1 class="view-title">Knowledge Base</h1>
          <p class="view-subtitle">Your personal knowledge base</p>
        </div>
        <button class="btn-add-note" @click="openAddNoteModal" aria-label="Add new note">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </header>

    <div class="content-section">
      <!-- Category Grid -->
      <div class="categories-grid" v-if="categories.length > 0">
        <article
          v-for="category in categories"
          :key="category.name"
          class="category-card"
          @click="navigateToCategory(category.name)"
          role="button"
          tabindex="0"
          @keypress.enter="navigateToCategory(category.name)"
        >
          <div class="card-content">
            <h2 class="category-name">{{ category.name }}</h2>
            <p class="note-count">
              {{ category.count }}
              {{ category.count === 1 ? 'note' : 'notes' }}
            </p>
          </div>
          <div class="card-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 2C7 2 5 4 5 6.5V18C5 20.21 6.79 22 9 22H18C19.1 22 20 21.1 20 20V7L14 2H9.5Z"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h3>No categories yet</h3>
        <p>Start building your knowledge base by adding your first note</p>
        <button class="btn-primary" @click="openAddNoteModal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Add First Note</span>
        </button>
      </div>
    </div>

    <!-- Add Note Modal -->
    <AddNoteModal :show="showAddNoteModal" @close="closeAddNoteModal" />
  </div>
</template>

<style scoped>
.directory-view {
  width: 100%;
  max-width: var(--container-xl);
}

.view-header {
  margin-bottom: var(--space-12);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
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

.btn-add-note {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--color-accent);
  color: #000000;
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  box-shadow: var(--shadow-base);
  flex-shrink: 0;
}

.btn-add-note:hover {
  background: var(--color-accent-hover);
  box-shadow: var(--shadow-accent);
  transform: translateY(-2px) rotate(90deg);
}

.content-section {
  width: 100%;
}

.action-bar {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
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

.btn-secondary {
  display: flex;
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
}

.btn-secondary:hover {
  background: var(--color-gray-300);
  color: var(--color-accent);
  border-color: var(--border-color-focus);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
}

.category-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-gray-100);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  transition: all var(--transition-base);
  cursor: pointer;
  min-height: 160px;
}

.category-card:hover {
  background: var(--color-gray-200);
  border-color: var(--border-color-hover);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.category-card:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.card-content {
  flex: 1;
}

.category-name {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.note-count {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}

.card-arrow {
  color: var(--color-gray-600);
  opacity: var(--opacity-50);
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.category-card:hover .card-arrow {
  color: var(--color-accent);
  opacity: 1;
  transform: translateX(4px);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16);
  text-align: center;
  color: var(--color-gray-600);
  min-height: 400px;
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
  margin-bottom: var(--space-6);
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-add-note {
    position: fixed;
    bottom: var(--space-6);
    right: var(--space-6);
    z-index: 100;
  }
}
</style>
