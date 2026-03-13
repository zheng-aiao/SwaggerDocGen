---
alwaysApply: false
description: 项目规则
---

# ===========================================

# 文档管理系统文档管理系统 - AI 编程规则

# ===========================================

## 项目身份

- 项目名称：文档管理系统
- 技术栈：Vue3 + Element plus + pinia + Vue Router 4
- 语言：JavaScript（非 TypeScript）
- 构建工具：Vite

## 强制约束

- 使用 Frgma mcp，参考设计图生产代码时，必须获取 Frgma 的各图层结构，严格按照 UI 设计图实现
- 路由组件统一放在 src/view/ 目录下。系统公共组件统一放在 src/components/下，并以 Rdapp\* 开头命名组件
- 路由组件优先使用 src/components/下 Rdapp\* 封装的公共组件实现，没有则优先封装
- 公共组件中，基础元素如按钮、输入框、日期选择器 抽离出基础组件，存放在 src/components/basicComponent/ 目录下。
- 公共组件中，复杂元素，如弹窗组件、表格组件、表单组件等抽离出业务组件，存放在 src/components/businessComponent/ 目录下
- 布局组件统一放在 src/layout/ 目录下。
- 命名规则要求 目录/JS 文件名：小驼峰 ； Vue 组件名：大驼峰；常量：SNAKE_CASE
- 路由组件命名约定：
  - 每个路由组件对应一个目录，目录名与路由路径一致，如 `/user` 对应 `src/view/user/` 目录`
  - 每个模块对应目下包含 `Index.vue` 和相关弹窗及组件。
    - 主页面入口文件：`Index.vue` `src/view/user/Index.vue`
    - 本页面相关弹窗组件命名：`*Dialog.vue`（如 `UserDialog.vue`），存放在 `src/view/xxxx/dialog/` 目录下
    - 本页面相关业务组件为`*Component.vue`（如 `TableViewComponent.vue`），存放在 `src/view/xxxx/component/` 目录下

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

- 禁止直接使用 Element Plus UI 组件，必须使用 Rdapp\* 封装组件，没有则优先封装
- 禁止在模板中编写复杂逻辑，应使用 computed 或 methods
- 禁止直接操作 DOM，使用 Vue 的 ref 或指令
- 禁止在生命周期钩子中使用箭头函数（会导致 this 指向错误）
- 禁止在 data 中直接定义响应式对象，应使用函数返回
