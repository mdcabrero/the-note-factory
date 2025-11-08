# Personal Knowledge Base - Vue 3 Note Organization App

## PROJECT OVERVIEW

Create a Vue 3 Composition API application with two main views:

1. **Knowledge Base**: Organize and manage personal development notes across different categories (JavaScript, Vue 3, Astro.js, CSS, Tailwind, Project Management, AI, etc.). Load notes from a JSON structure and allow adding/deleting notes with changes reflected in the JSON data.

2. **Prompt Templates**: Manage reusable prompt templates for common tasks. Each template has a title, description, tags, and can be edited or copied.

---

## DATA STRUCTURE

### Knowledge Base Notes Structure

Create a JSON file structure where:
- Top level contains category objects (e.g., "JavaScript", "Vue3", "CSS", etc.)
- Each category contains an array of note objects
- Each note object has: `id` (unique), `title`, `content` (plain text, may contain code snippets)
- New notes are added to the TOP of their category array

#### Example JSON Structure for Notes:

```json
{
  "JavaScript": [
    {
      "id": "js-001",
      "title": "Array Methods Deep Dive",
      "content": "Notes about map, filter, reduce...\n\n```js\nconst result = array.map(x => x * 2)\n```"
    }
  ],
  "Vue3": [],
  "CSS": []
}
```

### Prompt Templates Structure

Create a separate JSON file for prompt templates:
- Array of template objects
- Each template object has: `id` (unique), `title`, `description`, `tags` (array), `content` (the actual prompt text)

#### Example JSON Structure for Templates:

```json
{
  "templates": [
    {
      "id": "tmpl-001",
      "title": "Code Review Template",
      "description": "Template for conducting thorough code reviews",
      "tags": ["Development", "Review"],
      "content": "Review the following code focusing on:\n1. Code quality\n2. Performance\n3. Security..."
    },
    {
      "id": "tmpl-002",
      "title": "Documentation Writer",
      "description": "Generate comprehensive documentation",
      "tags": ["Documentation", "Writing"],
      "content": "Create detailed documentation for..."
    }
  ]
}
```

---

## MAIN FEATURES

## View Navigation

The app should have two main views accessible via navigation (tabs or sidebar):
1. **Knowledge Base** - Note organization system
2. **Prompt Templates** - Reusable prompt management

---

## KNOWLEDGE BASE FEATURES

### 1. Main Directory View (Landing Page)

- Display all categories as large, clickable cards in a grid layout
- Each card shows: category name, number of notes in that category
- Fixed '+' button (bottom-right corner) to add new notes
- Clean, spacious design with good visual hierarchy

### 2. Category Page View

- Clicking a category card navigates to that category's page
- Display all notes for that category as large cards in a centered, Word-document-like layout (similar to a Google Doc/Word - single column, centered, max-width around 800-900px)
- Each note card shows: title (as heading), content below, delete button
- Include a search bar at the top to filter notes within THIS category only (search by title and content)
- Back button to return to main directory
- Code snippets in note content should have syntax highlighting

### 3. Add Note Modal

- Triggered by '+' button
- Form fields: 
  - Title (required)
  - Category (dropdown of existing categories)
  - Content (textarea - large and comfortable for writing)
- Submit button adds note to the selected category at the TOP
- Cancel button closes modal
- After submission, automatically update JSON data and close modal

### 4. Delete Note Functionality

- Small delete button/icon on each note card
- Confirmation dialog before deleting
- Remove from JSON data and update UI

### 5. Code Syntax Highlighting

- Detect code blocks in note content (wrapped in ```language and ```)
- Apply syntax highlighting using a library like Prism.js or highlight.js
- Support common languages: JavaScript, CSS, HTML, Vue, Python, etc.

---

## PROMPT TEMPLATES FEATURES

### 1. Templates List View

- Display all templates as large cards (similar to the screenshot provided)
- Each card shows: 
  - Template title (prominent)
  - Description (subtitle)
  - Tags (as colored badges/pills)
  - Edit icon button
  - Copy icon button
- '+ New Template' button (top left, green)
- Search bar to filter templates by title, description, or tags
- Hamburger menu icon for additional options
- Dark theme with cards having subtle borders/backgrounds

### 2. Add/Edit Template Modal

- Triggered by '+ New Template' button or Edit icon
- Form fields:
  - Title (required)
  - Description (required)
  - Tags (input field, can add multiple tags)
  - Content (large textarea for the actual prompt)
- Submit button adds/updates template
- Cancel button closes modal
- After submission, update JSON data and close modal

### 3. Template Actions

- **Copy Button**: Copies the template content to clipboard
- **Edit Button**: Opens edit modal with pre-filled data
- **Delete Option**: Available in edit modal or via context menu

### 4. Template Search

- Real-time filtering as user types
- Search matches against title, description, and tags
- Case-insensitive search
- Show "No results" message when search yields nothing

---

## TECHNICAL REQUIREMENTS

### Core Technologies
- Vue 3 with Composition API (script setup syntax)
- Vue Router for navigation between main directory and category pages
- Reactive data management (ref, reactive, computed)

### Component Structure

```
src/
├── App.vue (main container with view navigation)
├── components/
│   ├── Knowledge Base Components:
│   │   ├── DirectoryView.vue (category cards grid)
│   │   ├── CategoryView.vue (individual category page with notes)
│   │   ├── NoteCard.vue (reusable note display component)
│   │   ├── AddNoteModal.vue (modal for adding notes)
│   │   └── CategoryCard.vue (reusable category card for directory)
│   │
│   ├── Prompt Templates Components:
│   │   ├── TemplatesView.vue (templates list)
│   │   ├── TemplateCard.vue (reusable template card)
│   │   └── AddEditTemplateModal.vue (modal for adding/editing templates)
│   │
│   └── Shared Components:
│       └── Navigation.vue (view switcher)
│
├── data/
│   ├── notes.json (note data)
│   └── templates.json (prompt templates data)
└── router/
    └── index.js (Vue Router configuration)
```

---

## STYLING REQUIREMENTS

### General Style
- Clean, minimal, professional aesthetic
- Use dark theme (as shown in the Prompt Templates screenshot)
- Good typography with proper spacing and readability
- Smooth transitions between views
- Responsive design (works on desktop primarily, but adapts to tablets)
- Use plain CSS or Tailwind CSS for styling

### Knowledge Base Specific
- The category page should feel like reading a well-formatted document (think Notion or Google Docs)
- Note cards should have subtle borders/shadows to distinguish them

### Prompt Templates Specific
- Dark theme with high contrast
- Cards with subtle borders/backgrounds
- Green accent color for primary actions ('+ New Template' button)
- Colored tag badges (green with outlined style as shown in screenshot)
- Edit and copy icons clearly visible on hover or always visible

---

## DATA PERSISTENCE

- Load initial data from JSON files (notes.json and templates.json) on app mount
- When adding/deleting notes or templates, update the in-memory JSON objects
- Provide a way to export/download the updated JSON files (button to download the current state for both notes and templates)
- Optional: Use localStorage as backup to preserve changes between sessions for both views

---

## SEARCH FUNCTIONALITY

### Knowledge Base Search
- Search bar in CategoryView only
- Real-time filtering as user types
- Search matches against note titles AND content
- Case-insensitive search
- Show "No results" message when search yields nothing

### Prompt Templates Search
- Search bar at the top of TemplatesView
- Real-time filtering as user types
- Search matches against template title, description, AND tags
- Case-insensitive search
- Show "No results" message when search yields nothing

---

## ADDITIONAL REQUIREMENTS

- Use semantic HTML elements
- Ensure accessibility (proper ARIA labels, keyboard navigation)
- Handle empty states gracefully (empty categories, no search results)
- Add loading states if needed
- Keep the codebase clean and well-commented

---

## DELIVERABLES

1. Complete Vue 3 project structure with all components for both views
2. Sample JSON files:
   - notes.json with 2-3 categories and 4-5 notes total (as examples)
   - templates.json with 3-4 prompt templates (as examples)
3. Instructions for running the project (npm install, npm run dev)
4. Clear comments in code explaining key functionality

---

## PROJECT SETUP

Please set up the project with **Vite**, include all necessary dependencies in package.json, and create a clean, professional UI that makes organizing and reading notes a pleasant experience.

### Key Dependencies Needed:
- Vue 3
- Vue Router
- A syntax highlighting library (Prism.js or highlight.js)
- Any additional utilities as needed

---

## DESIGN NOTES

### Navigation
- Clear view switcher between Knowledge Base and Prompt Templates
- Could be tabs, sidebar links, or top navigation
- Active view should be clearly indicated

### Knowledge Base Layouts

#### Main Directory Layout
- Grid of category cards
- Each card is large and clickable
- Shows category name prominently and note count
- Clean spacing between cards

#### Category Page Layout
- Single-column, centered layout (max-width ~800-900px)
- Document-like appearance
- Notes displayed as stacked cards with breathing room
- Search bar at top
- Back navigation clearly visible

#### Note Cards
- Clear visual separation between notes
- Title as prominent heading
- Content below with proper line-height
- Delete button subtle but accessible
- Code blocks clearly distinguished with syntax highlighting

### Prompt Templates Layout

#### Templates List
- Grid or list of template cards
- Dark theme with cards having subtle background/border
- Each card includes:
  - Bold title at top
  - Description below title (lighter text)
  - Tags as green outlined badges at bottom
  - Edit and copy icons (top right of card)
- '+ New Template' button (green, top left)
- Search bar (center top)
- Hamburger menu icon (top right)

#### Template Cards
- Similar size to category cards
- Hover state to emphasize interactivity
- Icons should be intuitive (pencil for edit, copy icon for copy)

---

## USER FLOW

### Knowledge Base Flow
1. User lands on main directory → sees all categories
2. User clicks '+' button → modal opens to add new note
3. User fills in title, selects category, writes content → submits
4. Note is added to top of selected category
5. User clicks category card → navigates to category page
6. User sees all notes in that category
7. User can search within category to filter notes
8. User can delete notes with confirmation
9. User can navigate back to main directory

### Prompt Templates Flow
1. User navigates to Prompt Templates view → sees all templates
2. User clicks '+ New Template' button → modal opens
3. User fills in title, description, tags, and prompt content → submits
4. Template is added to the list
5. User can search templates by title, description, or tags
6. User clicks copy icon → template content copied to clipboard
7. User clicks edit icon → modal opens with pre-filled data → can modify and save
8. User can delete templates from edit modal