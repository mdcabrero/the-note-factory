# The Note Factory

A personal knowledge management and prompt template library built with Vue 3. Designed for developers, writers, and knowledge workers who need a fast, elegant way to organize code snippets, technical notes, and reusable AI prompts.

## 🎯 Purpose

The Note Factory serves two primary functions:

1. **Knowledge Base** - Organize technical notes, code snippets, and learnings by category with full syntax highlighting
2. **Prompt Templates** - Build and manage a library of reusable AI prompt templates for common tasks

Perfect for maintaining your personal wiki of programming knowledge, design patterns, useful commands, and AI workflows.

## ✨ Key Features

### Knowledge Base System
- 📂 **Category-based organization** - Group notes by topic (JavaScript, Vue, CSS, Python, etc.)
- 🎨 **Syntax highlighting** - Automatic code highlighting for multiple languages using highlight.js
- 🔍 **Search within categories** - Quickly find notes with real-time filtering
- ⚡ **One-click code formatting** - Button to wrap selected text in markdown code blocks
- 💾 **Auto-save** - All notes automatically saved to browser localStorage
- 🗑️ **Safe deletion** - Delete notes with confirmation dialog
- ➕ **Dynamic categories** - Create new categories on-the-fly when adding notes

### Prompt Templates System
- 📝 **Template library** - Store and organize reusable AI prompt templates
- 🏷️ **Tag system** - Categorize templates with custom tags
- 📋 **Copy to clipboard** - One-click copying of template content
- 🔎 **Full-text search** - Search across title, description, tags, and content
- ✏️ **Create & Edit** - Full CRUD operations with rich editing interface
- 💾 **Persistent storage** - Templates saved to localStorage
- 📤 **Export functionality** - Download templates as JSON backup

### User Experience
- 🌙 **Modal.com-inspired dark theme** - Beautiful dark UI optimized for long sessions
- 🎭 **Modal safety** - Smart backdrop detection prevents accidental closes during text selection
- 📱 **Responsive design** - Works seamlessly across desktop sizes
- ⌨️ **Keyboard shortcuts** - ESC to close modals, enter to add tags
- 🔔 **Toast notifications** - Feedback for all user actions

## 🎨 Design System

### Color Palette
The application uses the official Modal.com design system:

```css
/* Background */
--color-background: #000000          /* Pure black */
--color-gray-100: #1A1A1A           /* Card backgrounds */
--color-gray-200: #2A2A2A           /* Hover states */

/* Text */
--color-text: #DDFFDC               /* Pale mint green (primary) */
--color-text-secondary: #A1A1A1     /* Gray (secondary) */

/* Accents */
--color-accent: #7FEE64             /* Bright green (primary actions) */
--color-accent-hover: #6FD954       /* Darker green (hover states) */

/* Borders */
--border-color: #2A2A2A             /* Default borders */
--border-color-hover: #3A3A3A       /* Hover borders */
--border-color-focus: #7FEE64       /* Focus/active borders */
```

### Visual Identity
- **Pure black backgrounds** for optimal contrast and reduced eye strain
- **Pale mint green text** for comfortable long-form reading
- **Bright green accents** for calls-to-action and interactive elements
- **Subtle shadows and glows** for depth and hierarchy
- **Smooth transitions** (200ms) for polished interactions

## 📁 Project Structure

```
the-note-factory/
├── docs/                                  # Documentation & design references
│   ├── PROJECT_SPECS.md                  # Detailed feature specifications
│   ├── SIDEBAR_APP_ARCHITECTURE_GUIDE.md # Architecture documentation
│   ├── knowledge-base.png                # Design mockup (categories grid)
│   └── category-notes.png                # Design mockup (notes view)
│
├── src/
│   ├── assets/                           # Global styles & design tokens
│   │   ├── base.css                      # Modal design system tokens
│   │   └── main.css                      # Global styles & resets
│   │
│   ├── components/                       # Reusable Vue components
│   │   ├── Sidebar.vue                   # Fixed sidebar navigation
│   │   ├── ModalContainer.vue            # Generic modal wrapper
│   │   ├── ConfirmDialog.vue             # Confirmation dialogs
│   │   ├── AddNoteModal.vue              # Add/create note modal
│   │   └── AddEditTemplateModal.vue      # Add/edit template modal
│   │
│   ├── data/                             # Default data & samples
│   │   ├── notes.json                    # Sample notes (6 categories)
│   │   └── templates.json                # Sample prompt templates (5 templates)
│   │
│   ├── router/                           # Vue Router configuration
│   │   └── index.js                      # Route definitions
│   │
│   ├── stores/                           # Pinia state management
│   │   ├── ui.js                         # Global UI state
│   │   ├── notes.js                      # Notes CRUD & localStorage
│   │   └── templates.js                  # Templates CRUD & localStorage
│   │
│   ├── views/                            # Route-level components
│   │   ├── DirectoryView.vue             # Knowledge base landing (categories grid)
│   │   ├── CategoryView.vue              # Notes within a category
│   │   └── PromptTemplatesView.vue       # Prompt templates library
│   │
│   ├── App.vue                           # Root component & layout
│   └── main.js                           # Application entry point
│
├── package.json                          # Dependencies & scripts
├── vite.config.js                        # Vite configuration
└── index.html                            # HTML entry point
```

## 🏗️ Architecture

### Application Layout

```
┌─────────┬──────────────────────────────────────┐
│         │                                      │
│ Sidebar │   Main Content Area                  │
│ (Fixed) │   (Vue Router View)                  │
│         │                                      │
│  Logo   │   Dynamic content based on route     │
│   📄    │   - DirectoryView (categories)       │
│   📋    │   - CategoryView (notes list)        │
│         │   - PromptTemplatesView (templates)  │
└─────────┴──────────────────────────────────────┘
```

### Component Hierarchy

```
App.vue
├── Sidebar.vue (Fixed 4em width)
│   ├── Logo
│   └── Navigation Links
│       ├── Knowledge (active for /knowledge routes)
│       └── Prompt Templates
│
└── RouterView (Dynamic main content)
    ├── DirectoryView (/knowledge)
    │   └── AddNoteModal
    │
    ├── CategoryView (/knowledge/:category)
    │   ├── Search Bar
    │   ├── Note Cards (with syntax highlighting)
    │   └── ConfirmDialog (for deletions)
    │
    └── PromptTemplatesView (/prompt-templates)
        └── AddEditTemplateModal
```

## 🗂️ Data Management

### Notes Store (`src/stores/notes.js`)

**Data Structure:**
```javascript
{
  "JavaScript": [
    {
      id: "js-001",
      title: "Array Methods Deep Dive",
      content: "Markdown content with ```code blocks```",
      createdAt: "2025-11-08T14:00:00.000Z"
    }
  ],
  "Vue3": [...],
  "CSS": [...]
}
```

**Key Actions:**
- `loadNotes()` - Initialize from localStorage or defaults
- `addNote(category, noteData)` - Add note to TOP of category array
- `deleteNote(category, noteId)` - Remove note with confirmation
- `searchNotes(category, query)` - Filter notes by search term
- `getNotesByCategory(category)` - Retrieve all notes in category
- `addCategory(categoryName)` - Create new category dynamically
- `exportNotes()` - Download notes as JSON backup

**Persistence:**
- All changes auto-saved to `localStorage` under key `'notes-data'`
- Graceful fallback to default data if localStorage fails

### Templates Store (`src/stores/templates.js`)

**Data Structure:**
```javascript
{
  "templates": [
    {
      id: "tmpl-001",
      title: "Code Review Template",
      description: "Template for conducting code reviews",
      tags: ["Development", "Review", "Quality"],
      content: "Prompt template content...",
      createdAt: "2025-11-08T14:00:00.000Z"
    }
  ]
}
```

**Key Actions:**
- `loadTemplates()` - Initialize from localStorage or defaults
- `addTemplate(templateData)` - Create new template
- `updateTemplate(id, updates)` - Edit existing template
- `deleteTemplate(id)` - Remove template
- `searchTemplates(query)` - Full-text search across all fields
- `copyToClipboard(id)` - Copy template content to clipboard
- `exportTemplates()` - Download templates as JSON backup

**Persistence:**
- Auto-saved to `localStorage` under key `'templates-data'`
- Clipboard API with fallback for older browsers

### UI Store (`src/stores/ui.js`)

**Global UI State:**
- `globalLoading` - App-wide loading indicator
- `activeView` - Current active view name
- `sidebarCollapsed` - Sidebar collapse state (unused currently)
- `showModal` - Modal visibility state
- `notifications` - Toast notification queue

**Actions:**
- `setGlobalLoading(boolean)` - Toggle loading state
- `setActiveView(viewName)` - Update active view
- `addNotification(config)` - Show toast message
- `removeNotification(id)` - Dismiss notification

## 🛣️ Routing

Routes defined in `src/router/index.js`:

| Path | Component | Description |
|------|-----------|-------------|
| `/` | → `/knowledge` | Redirect to knowledge base |
| `/knowledge` | `DirectoryView.vue` | Categories grid view |
| `/knowledge/:category` | `CategoryView.vue` | Notes within a category |
| `/prompt-templates` | `PromptTemplatesView.vue` | Templates library |

**Navigation Behavior:**
- Sidebar highlights active route using `router-link-active` class
- Category routes are dynamic (e.g., `/knowledge/JavaScript`, `/knowledge/Vue3`)
- All route components use lazy loading for performance

## 🧩 Core Components

### 1. DirectoryView.vue
**Purpose:** Landing page showing all knowledge categories

**Features:**
- Grid layout of category cards (auto-fill, min 320px width)
- Each card displays category name + note count
- Floating "+" button (top-right) to add notes
- Click card to navigate to CategoryView
- Empty state when no categories exist

**Key Interactions:**
- Card click → navigate to `/knowledge/:category`
- "+" button → open AddNoteModal

### 2. CategoryView.vue
**Purpose:** Display and manage notes within a specific category

**Features:**
- Centered, document-like layout (max-width 900px)
- Back button to return to directory
- Search bar for filtering notes
- Stacked note cards with syntax-highlighted code blocks
- Delete button on each note (top-right)

**Code Highlighting:**
- Powered by `highlight.js`
- Supports: JavaScript, CSS, HTML, Vue, Python
- Auto-detects language from markdown code blocks (` ```language `)
- Dark theme: Atom One Dark style

**Key Interactions:**
- Back button → navigate to `/knowledge`
- Search → real-time filtering of notes
- Delete icon → show ConfirmDialog → delete note

### 3. PromptTemplatesView.vue
**Purpose:** Manage library of reusable prompt templates

**Layout:**
- Two-column: Template list (left) + Preview panel (right)
- List shows title, description, tags per template
- Preview panel sticky, shows selected template details

**Features:**
- "New Template" button (top-left)
- Search bar for filtering
- Export button for JSON download
- Edit icon → open AddEditTemplateModal
- Copy icon → copy template to clipboard
- Template selection with active state

**Key Interactions:**
- Click template card → show in preview panel
- Edit icon → open modal with pre-filled data
- Copy icon → clipboard + toast notification

### 4. AddNoteModal.vue
**Purpose:** Modal for creating new notes

**Form Fields:**
- **Title** (required) - Note title
- **Category** (required) - Dropdown or create new
- **Content** (required) - Large textarea with code block button

**Code Block Button:**
- Positioned in header (top-right, next to label)
- One-click wraps selected text in ` ```\n...\n``` `
- If no selection, inserts empty code block at cursor
- No language selection needed (generic blocks)

**Features:**
- Toggle between existing categories or create new
- Form validation with error messages
- Auto-focus on first field
- Submit adds note to TOP of category

### 5. AddEditTemplateModal.vue
**Purpose:** Modal for creating/editing prompt templates

**Form Fields:**
- **Title** (required)
- **Description** (required)
- **Tags** (optional, multi-value)
- **Content** (required, large textarea)

**Features:**
- Reusable for both create and edit modes
- Tag input with Enter to add, click X to remove
- Delete button (only in edit mode)
- Form validation
- Preview tags as styled badges

### 6. ModalContainer.vue
**Purpose:** Generic modal wrapper with smart backdrop behavior

**Features:**
- Teleports to body for z-index isolation
- Three sizes: small (400px), medium (600px), large (900px)
- ESC key to close
- **Smart backdrop click detection:**
  - Tracks both mousedown AND mouseup events
  - Only closes if BOTH events occur on backdrop
  - Prevents accidental closes during text selection across modal boundaries
- Smooth enter/exit transitions
- Scrollable body with custom scrollbar styling

**Props:**
- `show` (boolean) - Visibility state
- `title` (string) - Modal header title
- `size` (string) - 'small' | 'medium' | 'large'

**Slots:**
- `header` - Custom header content
- `default` - Modal body content
- `footer` - Modal footer (typically buttons)

### 7. ConfirmDialog.vue
**Purpose:** Reusable confirmation dialog for destructive actions

**Features:**
- Three variants: danger (red), warning (yellow), info (green)
- Customizable title, message, button labels
- Icon changes based on variant
- Built on top of ModalContainer

**Props:**
- `show` (boolean)
- `title` (string)
- `message` (string)
- `confirmText` (string) - Default: "Confirm"
- `cancelText` (string) - Default: "Cancel"
- `variant` ('danger' | 'warning' | 'info')

**Events:**
- `@confirm` - User confirmed action
- `@cancel` - User cancelled
- `@close` - Dialog closed (any method)

### 8. Sidebar.vue
**Purpose:** Fixed navigation sidebar

**Features:**
- Fixed position (left: 0, 4em width)
- Logo at top with hover scale effect
- Navigation links with CSS tooltips
- Active route highlighting (bright green background)
- Smooth transitions on hover

**Navigation Items:**
- Knowledge (document icon)
- Prompt Templates (grid icon)

## 🎨 Design Tokens

All design tokens defined in `src/assets/base.css`:

### Spacing Scale (4px increments)
```css
--space-1: 0.25rem    /* 4px */
--space-2: 0.5rem     /* 8px */
--space-3: 0.75rem    /* 12px */
--space-4: 1rem       /* 16px */
--space-6: 1.5rem     /* 24px */
--space-8: 2rem       /* 32px */
--space-10: 2.5rem    /* 40px */
--space-12: 3rem      /* 48px */
--space-16: 4rem      /* 64px */
```

### Typography (Major Third Scale - 1.250 ratio)
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
--radius-sm: 0.25rem    /* 4px - Tags, badges */
--radius-md: 0.75rem    /* 12px - Inputs, buttons */
--radius-lg: 1rem       /* 16px - Cards, modals */
--radius-xl: 1.5rem     /* 24px - Large containers */
```

### Shadows
```css
--shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
--shadow-accent: 0 0 20px rgba(127, 238, 100, 0.3)  /* Green glow */
```

### Transitions
```css
--transition-fast: 150ms ease
--transition-base: 200ms ease
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** v20.19.0 or >=22.12.0
- npm (comes with Node.js)

### Installation

```bash
# Clone or download the repository
cd the-note-factory

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5174/`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

Build output will be in the `dist/` directory.

### Development Commands

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint with auto-fix
npm run format   # Format code with Prettier
```

## 📚 Usage Guide

### Adding a New Note

1. Click the **"+"** button (top-right or in empty state)
2. Fill in the title
3. Select an existing category or create a new one
4. Write your content in the textarea
5. **To add code blocks:**
   - Select the code text
   - Click **"Code Block"** button (top-right of textarea)
   - Code is automatically wrapped in ` ```\n...\n``` `
6. Click **"Add Note"**

**Note:** Notes are added to the TOP of the category (most recent first).

### Viewing & Managing Notes

1. From the **Knowledge Base** landing page, click a category card
2. Use the search bar to filter notes
3. Click the **trash icon** on any note to delete (confirmation required)
4. Click **"Back"** to return to categories

### Creating a Prompt Template

1. Navigate to **Prompt Templates** (sidebar)
2. Click **"New Template"** button
3. Fill in:
   - Title (required)
   - Description (required)
   - Tags (optional, press Enter to add)
   - Prompt content (required)
4. Click **"Create Template"**

### Using Templates

1. Click a template card to view in preview panel
2. Click **copy icon** to copy content to clipboard
3. Click **edit icon** to modify the template
4. Use search bar to filter templates

### Exporting Data

**Templates:**
- Click the **download icon** (top-right) in Prompt Templates view
- Downloads `templates-backup-YYYY-MM-DD.json`

**Notes:**
- Notes use localStorage exclusively (no export UI currently)
- Data persists in browser storage

## 🔧 Technical Stack

### Core Technologies
- **Vue 3.5.22** - Progressive JavaScript framework
  - Composition API with `<script setup>` syntax
  - Reactive data with `ref()` and `computed()`
- **Vue Router 4.6.3** - Official router for Vue.js
  - Lazy-loaded route components
  - Dynamic route parameters
- **Pinia 3.0.3** - State management library
  - Composition API style stores
  - TypeScript-friendly

### Build Tools
- **Vite 7.1.11** - Next-generation frontend build tool
  - Lightning-fast HMR (Hot Module Replacement)
  - Optimized production builds
  - Plugin ecosystem

### Libraries
- **highlight.js 11.x** - Syntax highlighting
  - Languages: JavaScript, CSS, HTML, Vue, Python
  - Theme: Atom One Dark
  - Lazy-loaded language modules

### Development Tools
- **ESLint 9.37.0** - Code linting
- **Prettier 3.6.2** - Code formatting
- **Vue DevTools** - Browser extension for debugging

## 💾 Data Persistence

### Browser Storage

All data is stored in browser `localStorage`:

```javascript
// Notes stored under 'notes-data' key
localStorage.setItem('notes-data', JSON.stringify(notesObject))

// Templates stored under 'templates-data' key
localStorage.setItem('templates-data', JSON.stringify(templatesArray))
```

### Data Lifecycle

1. **App initialization** → Stores check localStorage
2. **If data exists** → Load from localStorage
3. **If no data** → Load default data from `/src/data/*.json`
4. **On any change** → Auto-save to localStorage
5. **Export** → Download as JSON file (templates only)

### Backup & Restore

**Creating Backups:**
- Templates: Click download icon in app
- Notes: Use browser DevTools → Application → Local Storage → Copy value

**Restoring from Backup:**
1. Open browser DevTools → Application → Local Storage
2. Find `notes-data` or `templates-data` key
3. Paste JSON content
4. Refresh the page

## 🎯 Code Style Guidelines

### Vue Component Structure

```vue
<script setup>
// 1. Imports (external libraries first, then internal)
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'

// 2. Props & Emits
const props = defineProps({ ... })
const emit = defineEmits(['event'])

// 3. Composables & Stores
const router = useRouter()
const notesStore = useNotesStore()

// 4. Reactive State
const searchQuery = ref('')
const showModal = ref(false)

// 5. Computed Properties
const filteredItems = computed(() => { ... })

// 6. Methods
const handleAction = () => { ... }

// 7. Lifecycle Hooks
onMounted(() => { ... })
</script>

<template>
  <!-- Template with semantic HTML -->
</template>

<style scoped>
/* Component styles using design tokens */
/* Mobile-first responsive design */
</style>
```

### CSS Best Practices

```css
/* ✅ GOOD: Use design tokens */
.button {
  padding: var(--space-4);
  color: var(--color-accent);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

/* ❌ AVOID: Hard-coded values */
.button {
  padding: 16px;
  color: #7FEE64;
  border-radius: 12px;
  transition: all 200ms ease;
}
```

### Naming Conventions

- **Components:** PascalCase (e.g., `AddNoteModal.vue`)
- **Files:** kebab-case or PascalCase matching component name
- **CSS classes:** kebab-case (e.g., `.note-card`, `.btn-primary`)
- **JavaScript variables:** camelCase (e.g., `showModal`, `noteTitle`)
- **Store actions:** camelCase (e.g., `addNote()`, `deleteTemplate()`)

## 🐛 Known Issues & Limitations

### Current Limitations

1. **No backend** - All data stored in browser localStorage only
2. **No sync** - Data doesn't sync across browsers/devices
3. **Size limits** - localStorage typically limited to 5-10MB
4. **No real-time collaboration** - Single-user only
5. **Notes export** - No UI for exporting notes (templates only)

### Browser Compatibility

- **Recommended:** Chrome 90+, Firefox 88+, Safari 14+
- **Required APIs:**
  - localStorage
  - Clipboard API (with fallback)
  - CSS custom properties
  - ES6+ features

## 🔮 Future Enhancements

### Short-term
- [ ] Notes export functionality (similar to templates)
- [ ] Bulk operations (select multiple notes/templates)
- [ ] Keyboard shortcuts (e.g., Cmd+K for search)
- [ ] Note editing (currently create + delete only)
- [ ] Drag & drop file uploads for code

### Medium-term
- [ ] Backend integration (REST API)
- [ ] User authentication
- [ ] Cloud sync across devices
- [ ] Markdown preview mode
- [ ] Custom syntax highlighting themes

### Long-term
- [ ] Collaborative editing
- [ ] Version history
- [ ] Public/private sharing
- [ ] Mobile app (React Native or Progressive Web App)
- [ ] AI-powered tagging and categorization

## 🎓 Learning Resources

### Technologies Used
- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [highlight.js Documentation](https://highlightjs.org/)

### Design Inspiration
- [Modal.com Design System](https://modal.com/)
- [Dark UI Best Practices](https://www.nngroup.com/articles/dark-mode/)

## 📝 Changelog

### Version 1.0.0 (November 2025)

**Initial Release - Complete Knowledge Management System**

**Knowledge Base:**
- ✅ Category-based note organization
- ✅ Syntax highlighting for code blocks (JS, CSS, HTML, Vue, Python)
- ✅ Search functionality within categories
- ✅ One-click code block formatting
- ✅ Create/delete notes with confirmation
- ✅ Dynamic category creation
- ✅ localStorage persistence

**Prompt Templates:**
- ✅ Template library with CRUD operations
- ✅ Tag system for categorization
- ✅ Copy to clipboard functionality
- ✅ Full-text search across all fields
- ✅ Export templates as JSON
- ✅ localStorage persistence

**UI/UX:**
- ✅ Modal.com-inspired dark theme
- ✅ Smart modal backdrop (prevents accidental closes)
- ✅ Responsive grid layouts
- ✅ Toast notifications
- ✅ Empty states
- ✅ Form validation

**Architecture:**
- ✅ Vue 3 with Composition API
- ✅ Pinia state management
- ✅ Vue Router with lazy loading
- ✅ Component-based architecture
- ✅ Design token system

## 📄 License

This project is private and proprietary.

## 👤 Author

Built with Claude Code as a personal productivity tool for developers and knowledge workers.

---

**Version:** 1.0.0
**Last Updated:** November 2025
**Built with:** Vue 3 + Vite + Pinia + highlight.js
