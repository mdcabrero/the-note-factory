import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import templatesData from '@/data/templates.json'

export const useTemplatesStore = defineStore('templates', () => {
  // State
  const templates = ref([])
  const initialized = ref(false)

  // Load templates from localStorage or default data
  const loadTemplates = () => {
    try {
      const stored = localStorage.getItem('templates-data')
      if (stored) {
        templates.value = JSON.parse(stored)
      } else {
        templates.value = [...templatesData.templates]
      }
      initialized.value = true
    } catch (error) {
      console.error('Failed to load templates:', error)
      templates.value = [...templatesData.templates]
      initialized.value = true
    }
  }

  // Save templates to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem('templates-data', JSON.stringify(templates.value))
    } catch (error) {
      console.error('Failed to save templates:', error)
    }
  }

  // Computed
  const templateCount = computed(() => templates.value.length)

  const allTags = computed(() => {
    const tagsSet = new Set()
    templates.value.forEach((template) => {
      template.tags?.forEach((tag) => tagsSet.add(tag))
    })
    return Array.from(tagsSet).sort()
  })

  // Actions
  const addTemplate = (templateData) => {
    const newTemplate = {
      id: `tmpl-${Date.now()}`,
      title: templateData.title,
      description: templateData.description,
      tags: templateData.tags || [],
      content: templateData.content,
      createdAt: new Date().toISOString()
    }

    templates.value.push(newTemplate)
    saveToStorage()

    return newTemplate
  }

  const updateTemplate = (templateId, updates) => {
    const index = templates.value.findIndex((t) => t.id === templateId)
    if (index > -1) {
      templates.value[index] = {
        ...templates.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      saveToStorage()
      return true
    }
    return false
  }

  const deleteTemplate = (templateId) => {
    const index = templates.value.findIndex((t) => t.id === templateId)
    if (index > -1) {
      templates.value.splice(index, 1)
      saveToStorage()
      return true
    }
    return false
  }

  const getTemplateById = (templateId) => {
    return templates.value.find((t) => t.id === templateId)
  }

  const searchTemplates = (query) => {
    const lowerQuery = query.toLowerCase().trim()
    if (!lowerQuery) return templates.value

    return templates.value.filter((template) => {
      return (
        template.title.toLowerCase().includes(lowerQuery) ||
        template.description.toLowerCase().includes(lowerQuery) ||
        template.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
        template.content.toLowerCase().includes(lowerQuery)
      )
    })
  }

  const copyToClipboard = async (templateId) => {
    const template = getTemplateById(templateId)
    if (!template) return false

    try {
      await navigator.clipboard.writeText(template.content)
      return true
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      // Fallback for older browsers
      try {
        const textarea = document.createElement('textarea')
        textarea.value = template.content
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        return true
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError)
        return false
      }
    }
  }

  const exportTemplates = () => {
    const dataStr = JSON.stringify({ templates: templates.value }, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `templates-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Initialize on store creation
  if (!initialized.value) {
    loadTemplates()
  }

  return {
    // State
    templates,
    initialized,

    // Computed
    templateCount,
    allTags,

    // Actions
    loadTemplates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplateById,
    searchTemplates,
    copyToClipboard,
    exportTemplates,
    saveToStorage
  }
})
