import { createRouter, createWebHistory } from 'vue-router'
import DocumentManage from '../views/DocumentManage.vue'

const routes = [
  {
    path: '/',
    redirect: '/document-manage'
  },
  {
    path: '/document-manage',
    name: 'DocumentManage',
    component: DocumentManage
  },
  {
    path: '/document-config',
    name: 'DocumentConfig',
    component: () => import('../views/DocumentConfig.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

export { router }
