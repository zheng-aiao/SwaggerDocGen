import { createRouter, createWebHistory } from 'vue-router'
import LayoutDocument from '@/vue/layout/LayoutDocument.vue'
import LayoutConfig from '@/vue/layout/LayoutConfig.vue'
import DocumentManage from '@/views/documentManage/Index.vue'
import DocumentConfig from '@/views/documentConfig/Index.vue'

const routes = [
  {
    path: '/',
    redirect: '/document-manage'
  },
  {
    path: '/document-manage',
    component: LayoutDocument,
    children: [
      {
        path: '',
        name: 'DocumentManage',
        component: DocumentManage,
        meta: { title: '文档管理' }
      }
    ]
  },
  {
    path: '/document-config',
    component: LayoutConfig,
    children: [
      {
        path: '',
        name: 'DocumentConfig',
        component: DocumentConfig,
        meta: { title: '文档配置' }
      }
    ]
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
