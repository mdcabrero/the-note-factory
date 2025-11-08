<script setup>
import { ref } from 'vue'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
uiStore.setActiveView('knowledge')

// Placeholder data
const knowledgeItems = ref([
  {
    id: 1,
    title: 'Welcome to The Note Factory',
    description: 'Your personal productivity and notes application',
    category: 'Getting Started'
  },
  {
    id: 2,
    title: 'Example Knowledge Item',
    description: 'This is where your knowledge base items will appear',
    category: 'Examples'
  }
])
</script>

<template>
  <div class="knowledge-view">
    <header class="view-header">
      <h1 class="view-title">Knowledge</h1>
      <p class="view-subtitle">Your personal knowledge base</p>
    </header>

    <div class="content-section">
      <div class="action-bar">
        <button class="btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Add Knowledge</span>
        </button>

        <div class="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <input type="text" placeholder="Search knowledge..." />
        </div>
      </div>

      <div class="knowledge-grid">
        <article
          v-for="item in knowledgeItems"
          :key="item.id"
          class="knowledge-card"
        >
          <div class="card-header">
            <span class="category-badge">{{ item.category }}</span>
          </div>
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-description">{{ item.description }}</p>
          <div class="card-actions">
            <button class="btn-ghost">View</button>
            <button class="btn-ghost">Edit</button>
          </div>
        </article>

        <!-- Empty state when no items -->
        <div v-if="knowledgeItems.length === 0" class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 2C7 2 5 4 5 6.5V18C5 20.21 6.79 22 9 22H18C19.1 22 20 21.1 20 20V7L14 2H9.5Z"
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3>No knowledge items yet</h3>
          <p>Start building your knowledge base by adding your first item</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.knowledge-view {
  width: 100%;
  max-width: 1400px;
}

.view-header {
  margin-bottom: var(--space-2xl);
}

.view-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.view-subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
}

.content-section {
  width: 100%;
}

.action-bar {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
  flex-wrap: wrap;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-lg);
  background: linear-gradient(135deg, var(--green-600), var(--green-500));
  color: var(--text-primary);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--green-500), var(--green-400));
  box-shadow: var(--glow-green-md);
  transform: translateY(-1px);
}

.search-box {
  flex: 1;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast);
}

.search-box:focus-within {
  border-color: var(--green-500);
}

.search-box svg {
  color: var(--text-tertiary);
  flex-shrink: 0;
}

.search-box input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-size: var(--text-sm);
}

.search-box input::placeholder {
  color: var(--text-tertiary);
}

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-lg);
}

.knowledge-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: all var(--transition-base);
  cursor: pointer;
}

.knowledge-card:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-accent);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-header {
  margin-bottom: var(--space-md);
}

.category-badge {
  display: inline-block;
  padding: var(--space-xs) var(--space-sm);
  background: var(--bg-hover);
  color: var(--text-accent);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.card-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-lg);
  line-height: 1.6;
}

.card-actions {
  display: flex;
  gap: var(--space-sm);
}

.btn-ghost {
  padding: var(--space-xs) var(--space-md);
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
}

.btn-ghost:hover {
  background: var(--bg-hover);
  color: var(--text-accent);
  border-color: var(--border-accent);
}

.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-4xl);
  text-align: center;
  color: var(--text-tertiary);
}

.empty-state svg {
  margin-bottom: var(--space-lg);
  opacity: 0.5;
}

.empty-state h3 {
  font-size: var(--text-xl);
  color: var(--text-secondary);
  margin-bottom: var(--space-sm);
}

.empty-state p {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}
</style>
