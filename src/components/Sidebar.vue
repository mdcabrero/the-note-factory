<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside class="sidebar">
    <!-- Logo Section -->
    <figure class="logo">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Note/Document icon for The Note Factory -->
        <rect x="10" y="6" width="20" height="28" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <line x1="14" y1="12" x2="26" y2="12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="14" y1="17" x2="26" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="14" y1="22" x2="22" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </figure>

    <!-- Navigation Links -->
    <nav class="actions">
      <RouterLink to="/knowledge" class="nav-link" data-tooltip="Knowledge">
        <!-- Brain/Knowledge icon -->
        <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 2C7 2 5 4 5 6.5V18C5 20.21 6.79 22 9 22H18C19.1 22 20 21.1 20 20V7L14 2H9.5Z"
                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 2V7H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 12H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M9 16H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </RouterLink>

      <RouterLink to="/prompt-templates" class="nav-link" data-tooltip="Prompt Templates">
        <!-- Template/Grid icon -->
        <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
          <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 4em;
  background: var(--color-gray-100);
  border-right: 1px solid var(--border-color);
  z-index: var(--z-sticky);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: var(--space-6);
  gap: var(--space-2);
}

.logo {
  width: 2.5em;
  height: auto;
  color: var(--color-accent);
  transition: transform var(--transition-base), color var(--transition-fast);
  cursor: pointer;
}

.logo:hover {
  transform: scale(1.05);
  color: var(--color-accent-hover);
}

.logo svg {
  width: 100%;
  height: 100%;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: var(--space-8);
  gap: var(--space-4);
  width: 100%;
  padding-inline: var(--space-2);
}

.nav-link {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  padding: var(--space-2);
  transition: all var(--transition-base);
  color: var(--color-text-secondary);
}

/* Tooltip */
.nav-link::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: var(--color-gray-200);
  color: var(--color-text);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  white-space: nowrap;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);

  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity var(--transition-base), visibility var(--transition-base);
  z-index: var(--z-tooltip);
}

.nav-link:hover {
  background: var(--color-gray-300);
  color: var(--color-accent);
}

.nav-link:hover::after {
  opacity: 1;
  visibility: visible;
}

/* Active state */
.nav-link.router-link-exact-active {
  background: var(--color-accent);
  color: #000000;
  box-shadow: var(--shadow-accent);
}

.nav-link.router-link-exact-active:hover {
  background: var(--color-accent-hover);
  box-shadow: var(--shadow-accent);
}

.icon {
  width: 1.5em;
  height: auto;
  opacity: var(--opacity-90);
  transition: opacity var(--transition-fast);
}

.nav-link:hover .icon,
.nav-link.router-link-exact-active .icon {
  opacity: var(--opacity-100);
}
</style>
