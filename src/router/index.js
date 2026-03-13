import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "首页",
    redirect: "/service",
  },
  {
    path: "/service",
    name: "服务管理",
    redirect: "/service/all",
    children: [
      {
        path: "all",
        name: "全部服务",
        component: () => import("@/views/service/Index.vue"),
        meta: {
          showBack: false,
          showIcon: false,
        },
      },
      {
        path: "document",
        name: "文档管理",
        component: () => import("@/views/document/Index.vue"),
        meta: {
          showBack: true,
          showIcon: false,
          backPath: "/service",
          backName: "返回",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
