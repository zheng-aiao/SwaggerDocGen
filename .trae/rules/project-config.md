---
alwaysApply: false
description: 项目规则
---

# ===========================================
# 文档管理系统文档管理系统 - AI 编程规则
# ===========================================

## 项目身份
- 项目名称：文档管理系统
- 技术栈：Vue3 + Element plus  + pinia + Vue Router 4
- 语言：JavaScript（非 TypeScript）
- 构建工具：Vite

## 强制约束

- src/view/ 目录下面必须优先使用项目内src/components/下的Rdapp* 组件，禁止直接使用 Element UI 原生组件
- 优先抽离为组件。基础元素如按钮、输入框、日期选择器 抽离出基础组件。弹窗组件、表格组件、表单组件等抽离出业务组件
- 基础组件路径：src/components/basicComponent/ ；业务组件路径: src/components/businessComponent/
- 使用Frgma mcp，参考设计图生产代码时，优先实现设计图中的功能
- 命名规则要求 目录/JS 文件名：小驼峰 ； Vue 组件名：大驼峰；常量：SNAKE_CASE
- 组件命名约定：
  - 页面入口文件：`Index.vue` 本页面相关弹窗组件命名：`*Dialog.vue`（如 `UserDialog.vue`），业务组件为`*Component.vue`（如 `TableViewComponent.vue`）
  - 组件目录：，在src/view/下按功能模块划分新建目录，每个模块对应目录包含 `Index.vue` 和相关弹窗及组件


## src/ 源码目录
```
src/
├── main.js                    # 应用入口
├── App.vue                    # 根组件
├── assets/                    # 静态资源
│   ├── css/                   # 公共样式
│   ├── img/                   # 图片资源（按模块分类）
│   └── scss/                  # SCSS 样式（Element UI 主题覆盖）
├── components/                # 公共通用组件
├── layout/                     # 布局组件
├── utils/                     # 工具函数
├── language/                  # 国际化配置
├── router/                    # 路由配置
├── store/                     # Pinna 状态管理
├── utils/                     # 工具函数
└── views/                     # 路由组件，页面视图
```


## 禁止事项
- 禁止在模板中编写复杂逻辑，应使用 computed 或 methods
- 禁止直接操作 DOM，使用 Vue 的 ref 或指令
- 禁止在生命周期钩子中使用箭头函数（会导致 this 指向错误）
- 禁止直接使用 Element UI 组件，必须使用 Rdapp* 封装组件，没有则优先封装
- 禁止在 data 中直接定义响应式对象，应使用函数返回


