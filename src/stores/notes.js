import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import notesData from '@/data/notes.json'

export const useNotesStore = defineStore('notes', () => {
  // State
  const notes = ref({})
  const initialized = ref(false)

  // Load notes from localStorage or default data
  const loadNotes = () => {
    try {
      const stored = localStorage.getItem('notes-data')
      if (stored) {
        notes.value = JSON.parse(stored)
      } else {
        notes.value = { ...notesData }
      }
      initialized.value = true
    } catch (error) {
      console.error('Failed to load notes:', error)
      notes.value = { ...notesData }
      initialized.value = true
    }
  }

  // Save notes to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem('notes-data', JSON.stringify(notes.value))
    } catch (error) {
      console.error('Failed to save notes:', error)
    }
  }

  // Computed
  const categories = computed(() => {
    return Object.keys(notes.value).map((category) => ({
      name: category,
      count: notes.value[category]?.length || 0
    }))
  })

  const allCategories = computed(() => Object.keys(notes.value))

  // Get notes by category
  const getNotesByCategory = (category) => {
    return notes.value[category] || []
  }

  // Get total notes count
  const totalNotesCount = computed(() => {
    return Object.values(notes.value).reduce((total, categoryNotes) => {
      return total + (categoryNotes?.length || 0)
    }, 0)
  })

  // Actions
  const addNote = (category, noteData) => {
    if (!notes.value[category]) {
      notes.value[category] = []
    }

    const newNote = {
      id: `${category.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      title: noteData.title,
      content: noteData.content,
      createdAt: new Date().toISOString()
    }

    // Add to the TOP of the array
    notes.value[category].unshift(newNote)
    saveToStorage()

    return newNote
  }

  const deleteNote = (category, noteId) => {
    if (!notes.value[category]) return false

    const index = notes.value[category].findIndex((note) => note.id === noteId)
    if (index > -1) {
      notes.value[category].splice(index, 1)
      saveToStorage()
      return true
    }

    return false
  }

  const updateNote = (category, noteId, updates) => {
    if (!notes.value[category]) return false

    const index = notes.value[category].findIndex((note) => note.id === noteId)
    if (index > -1) {
      notes.value[category][index] = {
        ...notes.value[category][index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      saveToStorage()
      return true
    }

    return false
  }

  const searchNotes = (category, query) => {
    if (!category || !notes.value[category]) return []

    const lowerQuery = query.toLowerCase().trim()
    if (!lowerQuery) return notes.value[category]

    return notes.value[category].filter((note) => {
      return (
        note.title.toLowerCase().includes(lowerQuery) ||
        note.content.toLowerCase().includes(lowerQuery)
      )
    })
  }

  const exportNotes = () => {
    const dataStr = JSON.stringify(notes.value, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `notes-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const addCategory = (categoryName) => {
    if (!notes.value[categoryName]) {
      notes.value[categoryName] = []
      saveToStorage()
      return true
    }
    return false
  }

  // Initialize on store creation
  if (!initialized.value) {
    loadNotes()
  }

  return {
    // State
    notes,
    initialized,

    // Computed
    categories,
    allCategories,
    totalNotesCount,

    // Actions
    loadNotes,
    addNote,
    deleteNote,
    updateNote,
    getNotesByCategory,
    searchNotes,
    exportNotes,
    addCategory,
    saveToStorage
  }
})
