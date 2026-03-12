# DataTable 表格组件

一个可复用的表格分页组件，采用上下布局结构，上部为表格展示区域，下部为分页控制组件。

## 功能特性

- 动态列配置，支持多种列类型
- 内置分页组件
- 支持加载状态
- 支持空数据状态展示
- 支持操作按钮配置
- 支持标签样式列
- 支持自定义插槽
- 响应式设计，适配移动端

## Props 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| config | 列配置数组 | `Array` | `[]` |
| data | 表格数据 | `Array` | `[]` |
| pagination | 分页配置 | `Object` | `{ currentPage: 1, pageSize: 10, total: 0, pageSizes: [10, 20, 50] }` |
| loading | 加载状态 | `Boolean` | `false` |
| emptyText | 空数据提示文本 | `String` | `'暂无数据'` |
| showPagination | 是否显示分页 | `Boolean` | `true` |

### config 列配置

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| prop | 列字段名 | `String` | 是 |
| label | 列标题 | `String` | 是 |
| width | 列宽度 | `Number` | 否 |
| minWidth | 最小列宽度 | `Number` | 否 |
| align | 对齐方式 | `'left' \| 'center' \| 'right'` | 否 |
| fixed | 固定列 | `'left' \| 'right'` | 否 |
| sortable | 是否可排序 | `Boolean` | 否 |
| type | 列类型 | `'selection' \| 'index'` | 否 |
| cellClass | 单元格样式类 | `String` | 否 |
| formatter | 格式化函数 | `Function(value, row)` | 否 |
| tag | 标签样式配置 | `Object` | 否 |
| actions | 操作按钮配置 | `Array` | 否 |
| slot | 自定义插槽名 | `String` | 否 |
| render | 渲染函数 | `Function(row)` | 否 |

### tag 标签配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 标签类型 | `'success' \| 'warning' \| 'info' \| 'danger'` | `'info'` |
| size | 标签尺寸 | `'small' \| 'default' \| 'large'` | `'small'` |
| effect | 标签效果 | `'light' \| 'dark' \| 'plain'` | `'light'` |
| class | 自定义样式类 | `String` | - |

### actions 操作按钮配置

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| key | 操作标识 | `String` | 是 |
| label | 按钮提示文本 | `String` | 是 |
| icon | 图标组件名 | `String` | 否 |
| type | 按钮类型 | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` |
| show | 是否显示 | `Boolean` | 否 |

## Events 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| page-change | 页码变化时触发 | `(page: number)` |
| size-change | 页大小变化时触发 | `(size: number)` |
| row-click | 行点击时触发 | `({ row, column, event })` |
| action | 操作按钮点击时触发 | `({ action, row })` |

## 基础用法

```vue
<template>
  <DataTable
    :config="tableConfig"
    :data="tableData"
    :pagination="pagination"
    @page-change="handlePageChange"
    @size-change="handleSizeChange"
    @action="handleAction"
  />
</template>

<script setup>
import { ref } from 'vue'
import DataTable from '@/components/DataTable.vue'

const tableData = ref([
  { id: 1, name: '张三', age: 25, status: 'active' },
  { id: 2, name: '李四', age: 30, status: 'inactive' }
])

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 2
})

const tableConfig = [
  { prop: 'name', label: '姓名', minWidth: 120 },
  { prop: 'age', label: '年龄', width: 100, align: 'center' },
  { prop: 'status', label: '状态', width: 100, tag: { type: 'success' } }
]

const handlePageChange = (page) => {
  pagination.value.currentPage = page
}

const handleSizeChange = (size) => {
  pagination.value.pageSize = size
}

const handleAction = ({ action, row }) => {
  console.log(action, row)
}
</script>
```

## 带操作按钮

```vue
<script setup>
const tableConfig = [
  { prop: 'name', label: '名称', minWidth: 150 },
  { prop: 'version', label: '版本', width: 100, align: 'center' },
  {
    prop: 'actions',
    label: '操作',
    width: 160,
    align: 'center',
    fixed: 'right',
    actions: [
      { key: 'view', label: '查看', icon: 'View', type: 'primary' },
      { key: 'edit', label: '编辑', icon: 'Edit', type: 'primary' },
      { key: 'delete', label: '删除', icon: 'Delete', type: 'danger' }
    ]
  }
]
</script>
```

## 自定义插槽

```vue
<template>
  <DataTable :config="tableConfig" :data="tableData">
    <template #nameSlot="{ row }">
      <span class="custom-name">{{ row.name }}</span>
    </template>
  </DataTable>
</template>

<script setup>
const tableConfig = [
  { prop: 'name', label: '名称', slot: 'nameSlot' },
  { prop: 'age', label: '年龄' }
]
</script>
```

## 格式化函数

```vue
<script setup>
const tableConfig = [
  { prop: 'name', label: '名称' },
  {
    prop: 'price',
    label: '价格',
    formatter: (value) => `¥${value.toFixed(2)}`
  },
  {
    prop: 'createTime',
    label: '创建时间',
    formatter: (value) => new Date(value).toLocaleDateString()
  }
]
</script>
```

## 条件显示操作按钮

```vue
<script setup>
const tableConfig = [
  { prop: 'name', label: '名称' },
  {
    prop: 'actions',
    label: '操作',
    width: 200,
    actions: [
      { key: 'view', label: '查看', icon: 'View' },
      { key: 'edit', label: '编辑', icon: 'Edit' },
      {
        key: 'delete',
        label: '删除',
        icon: 'Delete',
        type: 'danger',
        show: (row) => row.canDelete
      }
    ]
  }
]
</script>
```

## 加载状态

```vue
<template>
  <DataTable
    :config="tableConfig"
    :data="tableData"
    :loading="loading"
  />
</template>

<script setup>
const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 2000)
</script>
```

## 隐藏分页

```vue
<template>
  <DataTable
    :config="tableConfig"
    :data="tableData"
    :show-pagination="false"
  />
</template>
```

## 样式定制

组件支持通过 `:deep()` 选择器覆盖内部样式：

```vue
<style scoped>
:deep(.data-table-wrapper) {
  .name-text {
    font-weight: 500;
    color: #1F2937;
  }

  .version-tag {
    background: #DBEAFE;
    color: #3B82F6;
    border: none;
  }
}
</style>
```

## 完整示例

```vue
<template>
  <DataTable
    :config="tableConfig"
    :data="serviceList"
    :pagination="pagination"
    empty-text="暂无服务数据"
    @page-change="handlePageChange"
    @size-change="handleSizeChange"
    @action="handleTableAction"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import DataTable from '@/components/DataTable.vue'

const serviceList = ref([
  {
    id: 1,
    name: 'srm基础服务',
    category: 'srm系统',
    description: '核心业务逻辑API定义',
    docCount: 15,
    latestVersion: 'v2.4.0',
    lastUpdate: '2023-10-24'
  }
])

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 5,
  pageSizes: [10, 20, 50]
})

const tableConfig = computed(() => [
  { prop: 'name', label: '服务名称', minWidth: 150, cellClass: 'name-text' },
  { prop: 'docCount', label: '文档数量', width: 100, align: 'center', cellClass: 'doc-count' },
  {
    prop: 'latestVersion',
    label: '最新版本',
    width: 100,
    align: 'center',
    tag: { type: 'info', size: 'small', class: 'version-tag' }
  },
  { prop: 'category', label: '所属分类', width: 100, align: 'center', cellClass: 'category-text' },
  { prop: 'description', label: '服务描述', minWidth: 200, cellClass: 'desc-text' },
  { prop: 'lastUpdate', label: '最近更新时间', width: 140, align: 'center', cellClass: 'time-text' },
  {
    prop: 'actions',
    label: '操作',
    width: 160,
    align: 'center',
    fixed: 'right',
    actions: [
      { key: 'view', label: '查看', icon: 'View', type: 'primary' },
      { key: 'edit', label: '编辑', icon: 'Edit', type: 'primary' },
      { key: 'copy', label: '复制', icon: 'CopyDocument', type: 'primary' },
      { key: 'delete', label: '删除', icon: 'Delete', type: 'danger' }
    ]
  }
])

const handlePageChange = (page) => {
  pagination.value.currentPage = page
}

const handleSizeChange = (size) => {
  pagination.value.pageSize = size
}

const handleTableAction = ({ action, row }) => {
  switch (action) {
    case 'view':
      console.log('查看:', row)
      break
    case 'edit':
      console.log('编辑:', row)
      break
    case 'copy':
      console.log('复制:', row)
      break
    case 'delete':
      console.log('删除:', row)
      break
  }
}
</script>
```
