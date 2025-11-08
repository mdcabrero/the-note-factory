import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  // State
  const globalLoading = ref(false)
  const activeView = ref('knowledge')
  const sidebarCollapsed = ref(false)
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

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
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
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    // State
    globalLoading,
    activeView,
    sidebarCollapsed,
    showModal,
    modalComponent,
    notifications,

    // Computed
    hasNotifications,
    isLoading,

    // Actions
    setGlobalLoading,
    setActiveView,
    toggleSidebar,
    openModal,
    closeModal,
    addNotification,
    removeNotification
  }
})
