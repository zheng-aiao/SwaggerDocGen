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

  {
    path: "/config",
    name: "文档配置",
    redirect: "/config/cover",
    children: [
      {
        path: "cover",
        name: "封面",
        component: () => import("@/views/config/cover/Index.vue"),
        meta: {
          showBack: false,
          showIcon: false,
        },
      },
      {
        path: "catalog",
        name: "目录样式",
        component: () => import("@/views/config/catalog/Index.vue"),
        meta: {
          showBack: false,
          showIcon: false,
        },
      },
      {
        path: "header-footer",
        name: "页眉页脚",
        component: () => import("@/views/config/headerFooter/Index.vue"),
        meta: {
          showBack: false,
          showIcon: false,
        },
      },
      {
        path: "content",
        name: "正文样式",
        component: () => import("@/views/config/content/Index.vue"),
        meta: {
          showBack: false,
          showIcon: false,
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
