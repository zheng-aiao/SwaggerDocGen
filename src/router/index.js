import { createRouter, createWebHistory } from 'vue-router'
import DocumentManage from '../views/DocumentManage.vue'
import DocumentConfig from '../views/DocumentConfig.vue'

const routes = [
  {
    path: '/',
    redirect: '/document-manage'
  },
  {
    path: '/document-manage',
    name: 'DocumentManage',
    component: DocumentManage,
    meta: { title: '文档管理' }
  },
  {
    path: '/document-config',
    name: 'DocumentConfig',
    component: DocumentConfig,
    meta: { title: '文档配置' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/document-manage'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title || 'SwaggerDocGen'
  next()
})

export default router

export { router }
