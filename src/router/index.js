import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '首页',
    redirect: '/service'
  },
  {
    path: '/service',
    name: '服务管理',
    redirect: '/service/all',
    component: () => import('@/layout/ServiceMainLayout.vue'),
    children: [
      {
        path: 'all',
        name: '全部服务',
        component: () => import('@/views/service/Index.vue')
      }
    ]
  },
  {
    path: '/document',
    name: '文档管理',
    component: () => import('@/views/document/Index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
