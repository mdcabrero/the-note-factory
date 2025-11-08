# Vue 3 Sidebar Application Architecture Guide

## Table of Contents
1. [Overview](#overview)
2. [Architecture Principles](#architecture-principles)
3. [Directory Structure](#directory-structure)
4. [Core Components Breakdown](#core-components-breakdown)
5. [Step-by-Step Setup Guide](#step-by-step-setup-guide)
6. [Design System & Styling](#design-system--styling)
7. [Routing & Navigation](#routing--navigation)
8. [State Management](#state-management)
9. [Best Practices & Patterns](#best-practices--patterns)
10. [Quick Start Template](#quick-start-template)

---

## Overview

This guide documents the architecture of a **Vue 3 sidebar application** with a fixed sidebar navigation pattern. The application is designed to be:

- **Modular**: Each view is a self-contained component
- **Scalable**: Easy to add new views and features
- **Maintainable**: Clear separation of concerns
- **Beautiful**: Neumorphic design with custom CSS variables
- **User-friendly**: Tooltip-enhanced navigation

### Key Technologies
- **Vue 3** (Composition API with `<script setup>`)
- **Vue Router 4** (Client-side routing)
- **Pinia** (State management)
- **Vite** (Build tool and dev server)

---

## Architecture Principles

### 1. Fixed Sidebar + Dynamic Content Pattern
The layout uses a **fixed sidebar** (always visible) with a **dynamic main content area** that changes based on the route.

```
┌──────────┬─────────────────────────┐
│          │                         │
│          │                         │
│ Sidebar  │   Main Content Area     │
│ (Fixed)  │   (RouterView)          │
│          │                         │
│          │                         │
└──────────┴─────────────────────────┘
```

### 2. Component Hierarchy
```
App.vue
├── Sidebar.vue (Fixed navigation)
└── RouterView (Dynamic content)
    ├── HomeView.vue
    ├── JobAnalysisView.vue
    ├── UserProfileView.vue
    └── InterviewView.vue
```

### 3. Separation of Concerns
- **Views**: Route-level components (pages)
- **Components**: Reusable UI elements
- **Stores**: Application state (Pinia)
- **Router**: Navigation configuration
- **Utils**: Helper functions and composables
- **Assets**: Styles, fonts, images

---

## Directory Structure

```
src/
├── assets/                  # Static assets & global styles
│   ├── base.css            # CSS variables & reset styles
│   ├── main.css            # Global styles & imports
│   ├── [feature].css       # Feature-specific styles (optional)
│   └── fonts/              # Custom font files
│
├── components/              # Reusable components
│   ├── Sidebar.vue         # Fixed sidebar navigation
│   ├── [Feature]Widget.vue # Feature-specific widgets
│   └── [feature]/          # Grouped feature components
│       └── Component.vue
│
├── views/                   # Route-level components (pages)
│   ├── HomeView.vue
│   ├── [Feature]View.vue
│   └── ...
│
├── stores/                  # Pinia stores
│   └── ui.js               # UI state management
│
├── router/                  # Vue Router configuration
│   └── index.js            # Route definitions
│
├── utils/                   # Helper functions & composables
│   ├── copy.js             # Custom directives
│   └── use[Feature].js     # Composables
│
├── main.js                  # Application entry point
└── App.vue                  # Root component
```

---

## Core Components Breakdown

### 1. `main.js` - Application Entry Point

**Purpose**: Bootstrap the Vue application with all plugins and configurations.

```javascript
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vCopy } from './utils/copy'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())      // State management
app.use(router)             // Routing
app.directive('copy', vCopy) // Custom directives

app.mount('#app')
```

**Key Actions**:
1. Import global styles
2. Create Vue app instance
3. Register Pinia (state management)
4. Register Vue Router
5. Register custom directives (optional)
6. Mount to DOM

---

### 2. `App.vue` - Root Layout Component

**Purpose**: Define the application shell with sidebar + main content area.

```vue
<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <Sidebar />

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  padding-left: calc(4em); /* Sidebar width compensation */

  /* Background styling */
  background-color: var(--cream);
  background-image: /* Grid pattern */;
  background-size: 120px 120px;
}
</style>
```

**Key Features**:
- **Sidebar**: Fixed position navigation
- **Main**: Dynamic content area with RouterView
- **Padding-left**: Compensates for sidebar width (ensures content is centered)
- **Background**: Optional decorative grid pattern

---

### 3. `Sidebar.vue` - Fixed Navigation Component

**Purpose**: Provide persistent navigation with icons and tooltips.

**Structure**:
```vue
<template>
  <aside class="sidebar">
    <!-- Logo Section -->
    <figure class="logo">
      <svg><!-- Logo SVG --></svg>
    </figure>

    <!-- Navigation Links -->
    <nav class="actions">
      <RouterLink
        to="/job-analysis"
        class="nav-link"
        data-tooltip="Job Analysis"
      >
        <svg class="job-offer"><!-- Icon SVG --></svg>
      </RouterLink>

      <RouterLink to="/profile" class="nav-link" data-tooltip="Profile">
        <svg class="user-profile"><!-- Icon SVG --></svg>
      </RouterLink>

      <!-- Add more navigation links as needed -->
    </nav>
  </aside>
</template>
```

**Key Features**:

1. **Fixed Positioning**:
```css
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 4em;
  z-index: var(--z-sticky);
}
```

2. **Tooltip System** (Pure CSS):
```css
.nav-link::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 100%;
  margin-left: 0.8em;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease;
}

.nav-link:hover::after {
  opacity: 1;
  visibility: visible;
}
```

3. **RouterLink Active State**:
Vue Router automatically adds `.router-link-active` and `.router-link-exact-active` classes.

---

### 4. `router/index.js` - Route Configuration

**Purpose**: Define application routes and their corresponding view components.

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/job-analysis',
      name: 'job-analysis',
      component: () => import('@/views/JobAnalysisView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/UserProfileView.vue')
    },
    {
      path: '/interview',
      name: 'interview',
      component: () => import('@/views/InterviewView.vue')
    }
  ]
})

export default router
```

**Best Practices**:
- Use **lazy loading** (`() => import()`) for better performance
- Name your routes for easier navigation
- Keep paths lowercase with hyphens

---

### 5. `stores/ui.js` - UI State Management

**Purpose**: Centralize UI-related state (loading, modals, notifications, theme, active view).

```javascript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  // State
  const globalLoading = ref(false)
  const activeView = ref('job-analysis')
  const theme = ref('light')
  const showModal = ref(false)
  const modalComponent = ref(null)
  const notifications = ref([])

  // Computed
  const hasNotifications = computed(() => notifications.value.length > 0)
  const isLoading = computed(() => globalLoading.value)

  // Actions
  const setGlobalLoading = (loading) => {
    globalLoading.value = loading
  }

  const setActiveView = (view) => {
    activeView.value = view
  }

  const openModal = (component) => {
    modalComponent.value = component
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
    modalComponent.value = null
  }

  const addNotification = (notification) => {
    const id = Date.now()
    notifications.value.push({
      id,
      type: 'info',
      message: '',
      duration: 5000,
      ...notification
    })

    if (notification.duration > 0) {
      setTimeout(() => removeNotification(id), notification.duration)
    }

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    // State
    globalLoading,
    activeView,
    theme,
    showModal,
    modalComponent,
    notifications,

    // Computed
    hasNotifications,
    isLoading,

    // Actions
    setGlobalLoading,
    setActiveView,
    openModal,
    closeModal,
    addNotification,
    removeNotification,
  }
})
```

**Usage in Components**:
```vue
<script setup>
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

// Access state
console.log(uiStore.activeView)

// Call actions
uiStore.setGlobalLoading(true)
uiStore.addNotification({ message: 'Success!', type: 'success' })
</script>
```

---

### 6. View Components Pattern

**Purpose**: Route-level components that render the main content for each page.

**Example Structure** (`JobAnalysisView.vue`):
```vue
<script setup>
import { ref } from 'vue'
import SomeComponent from '@/components/SomeComponent.vue'
import { useBackendApi } from '@/utils/useBackendApi.js'

// Local state
const data = ref(null)

// Composables
const { fetchData, isLoading, error } = useBackendApi()

// Methods
const handleAction = async () => {
  data.value = await fetchData()
}
</script>

<template>
  <div class="view-container">
    <SomeComponent @action="handleAction" />

    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.view-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

**Best Practices**:
- Keep views **thin** - delegate logic to components and composables
- Use **composition API** for reactivity
- Import only what you need
- Use scoped styles

---

## Step-by-Step Setup Guide

### Phase 1: Project Initialization

#### 1.1 Create Vite + Vue 3 Project
```bash
npm create vite@latest my-sidebar-app -- --template vue
cd my-sidebar-app
```

#### 1.2 Install Dependencies
```bash
npm install
npm install vue-router@4 pinia
```

#### 1.3 Project Configuration

**`vite.config.js`**:
```javascript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
```

**`index.html`**:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Sidebar App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

---

### Phase 2: Design System Setup

#### 2.1 Create `src/assets/base.css`

```css
/* CSS Variables */
:root {
  /* Color System */
  --cream: #f5f4f0;
  --cream-bg: hsl(36, 30%, 97%);
  --cream-dark: #ebe5d6;

  --rust-primary: #C15F3C;
  --rust-primary-hover: #a84f2f;

  /* Neutral Scale */
  --neutral-50: #fafaf8;
  --neutral-100: #f5f4f0;
  --neutral-200: #e8e6e0;
  --neutral-300: #d4d2ca;
  --neutral-400: #b8b6ae;
  --neutral-500: #8a8882;
  --neutral-600: #6b6a64;
  --neutral-700: #4a4944;
  --neutral-800: #2d2c29;
  --neutral-900: #1a1918;

  /* Semantic Colors */
  --success: #68D391;
  --warning: #f6ad55;
  --error: #fc8181;
  --info: #63b3ed;

  /* Neumorphic Shadows */
  --shadow-neu-sm:
    2px 2px 4px rgba(209, 207, 199, 0.3),
    -2px -2px 4px rgba(255, 255, 255, 0.5);

  --shadow-neu-md:
    4px 4px 8px rgba(209, 207, 199, 0.35),
    -3px -3px 6px rgba(255, 255, 255, 0.6);

  --shadow-neu-lg:
    6px 6px 12px rgba(209, 207, 199, 0.4),
    -6px -6px 12px rgba(255, 255, 255, 0.6);

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 15px;
  --radius-xl: 20px;

  /* Z-Index Scale */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-tooltip: 600;
}

/* CSS Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-weight: normal;
}

html {
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

/* Typography */
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

p {
  text-wrap: pretty;
}

h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

/* Link Reset */
a {
  color: inherit;
  text-decoration: inherit;
}

/* Button Reset */
button {
  border: none;
  margin: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  cursor: pointer;
}
```

#### 2.2 Create `src/assets/main.css`

```css
@import './base.css';

body {
  text-rendering: optimizeSpeed;
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  background-color: var(--cream-bg);
  -webkit-font-smoothing: antialiased;
}
```

---

### Phase 3: Routing Setup

#### 3.1 Create `src/router/index.js`

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    // Add more routes here
  ]
})

export default router
```

#### 3.2 Create Basic Views

**`src/views/HomeView.vue`**:
```vue
<script setup>
import { ref } from 'vue'

const message = ref('Welcome to your sidebar app!')
</script>

<template>
  <div class="home-view">
    <h1>{{ message }}</h1>
  </div>
</template>

<style scoped>
.home-view {
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: var(--neutral-800);
}
</style>
```

---

### Phase 4: State Management Setup

#### 4.1 Create `src/stores/ui.js`

```javascript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  // State
  const globalLoading = ref(false)
  const activeView = ref('home')
  const theme = ref('light')

  // Computed
  const isLoading = computed(() => globalLoading.value)

  // Actions
  const setGlobalLoading = (loading) => {
    globalLoading.value = loading
  }

  const setActiveView = (view) => {
    activeView.value = view
  }

  return {
    globalLoading,
    activeView,
    theme,
    isLoading,
    setGlobalLoading,
    setActiveView,
  }
})
```

---

### Phase 5: Sidebar Component

#### 5.1 Create `src/components/Sidebar.vue`

```vue
<template>
  <aside class="sidebar">
    <!-- Logo -->
    <figure class="logo">
      <svg width="40" height="40" viewBox="0 0 40 40">
        <!-- Your logo SVG path here -->
        <circle cx="20" cy="20" r="18" fill="var(--rust-primary)"/>
      </svg>
    </figure>

    <!-- Navigation -->
    <nav class="actions">
      <RouterLink to="/" class="nav-link" data-tooltip="Home">
        <svg class="icon" width="24" height="24">
          <!-- Home icon SVG -->
        </svg>
      </RouterLink>

      <!-- Add more navigation links -->
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
  background: var(--cream);
  border-right: 1px solid var(--neutral-300);
  box-shadow: var(--shadow-neu-sm);
  z-index: var(--z-sticky);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 1em;
}

.logo {
  width: 2.5em;
  height: auto;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo svg {
  width: 100%;
  height: 100%;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5rem;
  gap: 1em;
}

.nav-link {
  position: relative;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5em;
  padding: 0.35em;
  transition: all 0.3s ease;
}

/* Tooltip */
.nav-link::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0.8em;
  padding: 0.4em 0.85em;
  background: var(--neutral-100);
  color: #333;
  font-size: 0.85rem;
  white-space: nowrap;
  border: 1px solid rgba(0, 0, 0, 0.075);
  border-radius: 0.375em;
  box-shadow: var(--shadow-neu-sm);

  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.4s ease, visibility 0.3s ease;
}

.nav-link:hover {
  background: var(--neutral-200);
  box-shadow: var(--shadow-neu-sm);
  transform: translateY(-1px);
}

.nav-link:hover::after {
  opacity: 1;
  visibility: visible;
}

.icon {
  width: 2.3em;
  height: auto;
  opacity: 0.95;
}
</style>
```

---

### Phase 6: Root Component Setup

#### 6.1 Create `src/App.vue`

```vue
<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <Sidebar />

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  padding-left: 4em; /* Sidebar width */
  background-color: var(--cream);
}
</style>
```

---

### Phase 7: Main Entry Point

#### 7.1 Update `src/main.js`

```javascript
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

---

## Design System & Styling

### CSS Variables Philosophy

This architecture uses **CSS Custom Properties** for:
1. **Consistency**: All colors, shadows, and spacing defined once
2. **Maintainability**: Change theme by updating variables
3. **Performance**: No CSS-in-JS overhead
4. **Flexibility**: Easy to create dark mode or themes

### Neumorphic Design Pattern

**What is Neumorphism?**
A design style that creates soft, extruded shapes using subtle shadows.

**Implementation**:
```css
/* Raised element */
.raised {
  background: var(--cream);
  box-shadow: var(--shadow-neu-md);
}

/* Pressed/inset element */
.pressed {
  background: var(--cream);
  box-shadow:
    inset 3px 3px 6px rgba(209, 207, 199, 0.3),
    inset -2px -2px 4px rgba(255, 255, 255, 0.25);
}
```

### Responsive Sidebar Width

The sidebar uses **em units** (4em) which scales with font size:
```css
.sidebar {
  width: 4em; /* ~64px at default font size */
}

main {
  padding-left: 4em; /* Match sidebar width */
}
```

---

## Routing & Navigation

### Adding a New Route

**Step 1**: Create the view component
```vue
<!-- src/views/SettingsView.vue -->
<script setup>
import { ref } from 'vue'

const settings = ref({})
</script>

<template>
  <div class="settings-view">
    <h1>Settings</h1>
  </div>
</template>

<style scoped>
.settings-view {
  padding: 2rem;
}
</style>
```

**Step 2**: Add route to router
```javascript
// src/router/index.js
{
  path: '/settings',
  name: 'settings',
  component: () => import('@/views/SettingsView.vue')
}
```

**Step 3**: Add navigation link to Sidebar
```vue
<!-- src/components/Sidebar.vue -->
<RouterLink to="/settings" class="nav-link" data-tooltip="Settings">
  <svg class="icon"><!-- Settings icon --></svg>
</RouterLink>
```

### Active Link Styling

Vue Router automatically adds classes:
- `.router-link-active`: Partial match
- `.router-link-exact-active`: Exact match

```css
.nav-link.router-link-exact-active {
  background: var(--rust-primary);
  color: white;
}
```

---

## State Management

### When to Use Pinia Stores

**Use Pinia for**:
- Global UI state (loading, modals, notifications)
- User authentication state
- Shared data between components
- Application settings

**Don't use Pinia for**:
- Component-local state (use `ref`/`reactive`)
- Temporary form data
- Computed values that don't need persistence

### Creating a New Store

```javascript
// src/stores/user.js
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => user.value !== null)

  const login = async (credentials) => {
    // Login logic
    user.value = await api.login(credentials)
  }

  const logout = () => {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  }
})
```

---

## Best Practices & Patterns

### 1. Component Naming Conventions
- **Views**: `[Feature]View.vue` (e.g., `HomeView.vue`)
- **Components**: `[Feature][Type].vue` (e.g., `UploadWidget.vue`)
- **Stores**: `[domain].js` (e.g., `ui.js`, `user.js`)

### 2. File Organization
```
Group by feature, not by type:

✅ Good:
components/
  job-analysis/
    SkillsTable.vue
    Responsibilities.vue
  user/
    ProfileCard.vue
    Avatar.vue

❌ Avoid:
components/
  tables/
    SkillsTable.vue
    UserTable.vue
  cards/
    ProfileCard.vue
    JobCard.vue
```

### 3. Composition API Patterns

**Composables** (Reusable logic):
```javascript
// src/utils/useBackendApi.js
import { ref } from 'vue'

export function useBackendApi() {
  const isLoading = ref(false)
  const error = ref(null)

  const fetchData = async (endpoint) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(endpoint)
      return await response.json()
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, error, fetchData }
}
```

**Usage in components**:
```vue
<script setup>
import { useBackendApi } from '@/utils/useBackendApi'

const { isLoading, error, fetchData } = useBackendApi()

const loadData = () => fetchData('/api/data')
</script>
```

### 4. Scoped Styles vs Global Styles

**Scoped** (component-specific):
```vue
<style scoped>
.my-component {
  color: red;
}
</style>
```

**Global** (in `base.css` or `main.css`):
```css
/* Only for truly global styles */
body {
  font-family: sans-serif;
}
```

### 5. Import Alias Usage

Always use `@` alias for cleaner imports:
```javascript
// ✅ Good
import Sidebar from '@/components/Sidebar.vue'

// ❌ Avoid
import Sidebar from '../../components/Sidebar.vue'
```

### 6. Lazy Loading Routes

Always use dynamic imports for routes:
```javascript
// ✅ Good - Code splitting
component: () => import('@/views/HomeView.vue')

// ❌ Avoid - Bundles everything upfront
import HomeView from '@/views/HomeView.vue'
component: HomeView
```

---

## Quick Start Template

### Minimal Sidebar App Checklist

```
□ Create Vite + Vue 3 project
□ Install vue-router and pinia
□ Configure vite.config.js with @ alias
□ Create src/assets/base.css with CSS variables
□ Create src/assets/main.css
□ Create src/router/index.js
□ Create src/stores/ui.js
□ Create src/components/Sidebar.vue
□ Update src/App.vue with sidebar + RouterView layout
□ Update src/main.js with Pinia and Router
□ Create at least one view (HomeView.vue)
□ Run npm run dev
```

### Complete Shell in 10 Steps

```bash
# 1. Create project
npm create vite@latest my-app -- --template vue
cd my-app

# 2. Install dependencies
npm install
npm install vue-router@4 pinia

# 3. Create directory structure
mkdir -p src/{components,views,stores,router,utils,assets/fonts}

# 4. Create base.css (copy from guide)
# 5. Create main.css (copy from guide)
# 6. Create router/index.js (copy from guide)
# 7. Create stores/ui.js (copy from guide)
# 8. Create components/Sidebar.vue (copy from guide)
# 9. Update App.vue (copy from guide)
# 10. Update main.js (copy from guide)

# Run development server
npm run dev
```

---

## Adding Features to Your Sidebar App

### Example: Adding a Dashboard View

**1. Create the view**:
```vue
<!-- src/views/DashboardView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
const stats = ref([])

onMounted(async () => {
  uiStore.setGlobalLoading(true)
  // Fetch dashboard data
  uiStore.setGlobalLoading(false)
})
</script>

<template>
  <div class="dashboard-view">
    <h1>Dashboard</h1>
    <div class="stats-grid">
      <!-- Dashboard content -->
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
</style>
```

**2. Add route**:
```javascript
// src/router/index.js
{
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/views/DashboardView.vue')
}
```

**3. Add sidebar link**:
```vue
<!-- src/components/Sidebar.vue -->
<RouterLink to="/dashboard" class="nav-link" data-tooltip="Dashboard">
  <svg class="icon"><!-- Dashboard icon --></svg>
</RouterLink>
```

---

## Customization Guide

### Changing Colors

Update CSS variables in `base.css`:
```css
:root {
  --cream: #your-color;
  --rust-primary: #your-primary;
  /* ... */
}
```

### Changing Sidebar Width

```css
/* In Sidebar.vue */
.sidebar {
  width: 5em; /* Increase from 4em */
}

/* In App.vue */
main {
  padding-left: 5em; /* Match sidebar width */
}
```

### Adding Dark Mode

**1. Update `stores/ui.js`**:
```javascript
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}
```

**2. Add dark mode CSS variables**:
```css
[data-theme="dark"] {
  --cream: #1a1918;
  --neutral-800: #fafaf8;
  /* Invert colors */
}
```

---

## Summary

This architecture provides:

✅ **Fixed sidebar navigation** with tooltips
✅ **Vue Router** for seamless page transitions
✅ **Pinia store** for global UI state
✅ **CSS variables** for consistent theming
✅ **Neumorphic design** system
✅ **Modular structure** for scalability
✅ **Best practices** from the Vue 3 ecosystem

### Next Steps

1. Customize colors and branding
2. Add your views and features
3. Integrate with your backend API
4. Deploy to production

### Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)

---

**This guide is a living document.** Update it as your application evolves!
