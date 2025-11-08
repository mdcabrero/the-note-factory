import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/knowledge'
    },
    {
      path: '/knowledge',
      name: 'knowledge',
      component: () => import('@/views/KnowledgeView.vue')
    },
    {
      path: '/prompt-templates',
      name: 'prompt-templates',
      component: () => import('@/views/PromptTemplatesView.vue')
    }
  ]
})

export default router
