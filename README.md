# The Note Factory

A personal productivity and notes application built with Vue 3, featuring a sidebar navigation pattern and Modal.com-inspired dark theme design system.

## 🎨 Design System

The application uses the official Modal.com design system with:

- **Pure black background** (`#000000`)
- **Pale mint green text** (`#DDFFDC`)
- **Bright green accents** (`#7FEE64`) for interactive elements
- Comprehensive gray scale (50-900) optimized for dark themes
- Typography using Major Third scale (1.250 ratio)
- Consistent spacing, shadows, and transitions

## 📁 Project Structure

```
the-note-factory/
├── docs/                           # Documentation
│   └── SIDEBAR_APP_ARCHITECTURE_GUIDE.md
├── public/                         # Static assets
├── src/
│   ├── assets/                     # Styles and static files
│   │   ├── base.css               # Modal design system tokens
│   │   └── main.css               # Global styles
│   ├── components/                 # Reusable components
│   │   └── Sidebar.vue            # Fixed sidebar navigation
│   ├── router/                     # Vue Router configuration
│   │   └── index.js               # Route definitions
│   ├── stores/                     # Pinia state management
│   │   └── ui.js                  # UI state store
│   ├── views/                      # Route-level components
│   │   ├── KnowledgeView.vue      # Knowledge base view
│   │   └── PromptTemplatesView.vue # Templates view
│   ├── App.vue                     # Root component
│   └── main.js                     # Application entry point
├── index.html                      # HTML entry point
├── package.json                    # Dependencies
└── vite.config.js                  # Vite configuration
```

## 🏗️ Architecture

### Layout Pattern

The app uses a **fixed sidebar + dynamic content** pattern:

```
┌──────────┬─────────────────────────┐
│          │                         │
│ Sidebar  │   Main Content Area     │
│ (Fixed)  │   (RouterView)          │
│          │                         │
└──────────┴─────────────────────────┘
```

### Component Hierarchy

```
App.vue
├── Sidebar.vue (Fixed navigation)
└── RouterView (Dynamic content)
    ├── KnowledgeView.vue
    └── PromptTemplatesView.vue
```

## 🧩 Core Components

### 1. App.vue
- Root layout component
- Renders fixed sidebar and main content area
- Includes subtle grid pattern background
- Compensates padding for sidebar width (4em)

### 2. Sidebar.vue
- **Location:** `src/components/Sidebar.vue`
- Fixed position navigation (4em width)
- Features:
  - Logo at top
  - Navigation links with tooltips
  - Active state highlighting with bright green background
  - Smooth hover transitions
- Navigation items:
  - Knowledge (document icon)
  - Prompt Templates (grid icon)

### 3. KnowledgeView.vue
- **Location:** `src/views/KnowledgeView.vue`
- **Route:** `/knowledge` (default)
- Features:
  - Card-based grid layout
  - Search functionality
  - "Add Knowledge" button
  - Category badges
  - View/Edit actions per card

### 4. PromptTemplatesView.vue
- **Location:** `src/views/PromptTemplatesView.vue`
- **Route:** `/prompt-templates`
- Features:
  - List view with template cards
  - Sticky preview panel (right side)
  - Tag system
  - Edit/Copy actions
  - Template selection with active state

## 🎯 State Management

### UI Store (`src/stores/ui.js`)

Manages global UI state using Pinia:

**State:**
- `globalLoading` - Loading indicator
- `activeView` - Current active view
- `sidebarCollapsed` - Sidebar collapse state
- `showModal` - Modal visibility
- `notifications` - Notification queue

**Actions:**
- `setGlobalLoading(loading)`
- `setActiveView(view)`
- `toggleSidebar()`
- `openModal(component)`
- `closeModal()`
- `addNotification(notification)`
- `removeNotification(id)`

## 🎨 Design Tokens

All design tokens are defined in `src/assets/base.css`:

### Colors
```css
--color-background: #000000        /* Pure black */
--color-text: #DDFFDC             /* Pale mint green */
--color-text-secondary: #A1A1A1   /* Gray */
--color-accent: #7FEE64           /* Bright green */
--color-accent-hover: #6FD954     /* Darker green */
```

### Spacing Scale (4px increments)
```css
--space-1: 0.25rem    /* 4px */
--space-2: 0.5rem     /* 8px */
--space-4: 1rem       /* 16px */
--space-6: 1.5rem     /* 24px */
--space-8: 2rem       /* 32px */
--space-12: 3rem      /* 48px */
```

### Typography
```css
--text-xs: 0.75rem      /* 12px */
--text-sm: 0.875rem     /* 14px */
--text-base: 1rem       /* 16px */
--text-lg: 1.125rem     /* 18px */
--text-xl: 1.25rem      /* 20px */
--text-2xl: 1.563rem    /* 25px */
--text-3xl: 1.953rem    /* 31px */
--text-4xl: 2.441rem    /* 39px */
```

### Border Radius
```css
--radius-sm: 0.25rem    /* 4px */
--radius-md: 0.75rem    /* 12px */
--radius-lg: 1rem       /* 16px */
--radius-xl: 1.5rem     /* 24px */
```

### Shadows
```css
--shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
--shadow-accent: 0 0 20px rgba(127, 238, 100, 0.3)  /* Green glow */
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.19.0 or >=22.12.0)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server

The app runs on `http://localhost:5173/`

## 🛣️ Routing

Routes are defined in `src/router/index.js`:

| Path | Name | Component | Description |
|------|------|-----------|-------------|
| `/` | - | - | Redirects to `/knowledge` |
| `/knowledge` | knowledge | KnowledgeView | Knowledge base |
| `/prompt-templates` | prompt-templates | PromptTemplatesView | Prompt templates |

All routes use lazy loading for optimal performance:
```javascript
component: () => import('@/views/KnowledgeView.vue')
```

## 🎯 Key Features

### Sidebar Navigation
- **Fixed position** - Always visible during scroll
- **Tooltips** - Pure CSS tooltips on hover
- **Active states** - Bright green background for current route
- **Smooth transitions** - 200ms ease transitions

### Responsive Grid Pattern
- Subtle grid background in main content area
- Grid cells: 60px × 60px
- Opacity: 30% for subtle effect
- Uses CSS variables for consistency

### Card-Based UI
- **Knowledge cards** - Grid layout with auto-fill
- **Template cards** - List layout with hover states
- **Category badges** - Bright green accent borders
- **Action buttons** - Ghost button style

### Interactive Elements
- **Primary buttons** - Bright green (`#7FEE64`) with black text
- **Secondary buttons** - Transparent with borders
- **Search boxes** - Focus state with green border
- **Icons** - 90% opacity, 100% on hover/active

## 🔧 Technical Stack

- **Vue 3** - Composition API with `<script setup>`
- **Vue Router 4** - Client-side routing
- **Pinia** - State management
- **Vite** - Build tool and dev server
- **Modal Design System** - Official CSS tokens

## 📝 Code Style

### Component Structure
```vue
<script setup>
// Imports
// Composables
// Local state
// Methods
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Component styles using design tokens */
</style>
```

### CSS Variable Usage
Always use design tokens instead of hard-coded values:

```css
/* ✅ Good */
padding: var(--space-4);
color: var(--color-accent);
border-radius: var(--radius-md);

/* ❌ Avoid */
padding: 16px;
color: #7FEE64;
border-radius: 12px;
```

## 🎨 Styling Guidelines

### Button Styles

**Primary Button:**
```css
background: var(--color-accent);
color: #000000;
box-shadow: var(--shadow-base);
```

**Secondary Button:**
```css
background: var(--color-gray-100);
border: 1px solid var(--border-color);
```

**Ghost Button:**
```css
background: transparent;
border: 1px solid var(--border-color-hover);
```

### Card Hover States
```css
.card:hover {
  background: var(--color-gray-200);
  border-color: var(--border-color-hover);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

## 🔮 Future Enhancements

- [ ] Add authentication system
- [ ] Implement knowledge base CRUD operations
- [ ] Add prompt template editor
- [ ] Integrate with backend API
- [ ] Add search functionality
- [ ] Implement tag filtering
- [ ] Add dark/light theme toggle
- [ ] Mobile responsive design
- [ ] Export/import functionality

## 📄 License

This project is private and proprietary.

## 👤 Author

Created as a personal productivity tool.

---

**Version:** 1.0.0
**Last Updated:** November 2025
