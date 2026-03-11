import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/service'
  },
  {
    path: '/service',
    name: 'ServiceManage',
    component: () => import('@/views/service/Index.vue')
  }
  // ,
  // {
  //   path: '/document',
  //   name: 'DocumentList',
  //   component: () => import('@/views/document/Index.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
