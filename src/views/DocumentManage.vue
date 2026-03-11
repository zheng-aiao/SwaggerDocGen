<template>
  <div class="document-manage-page">
    <div class="page-header">
      <h1 class="page-title">文档管理服务</h1>
      <div class="header-actions">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索服务名称..."
          prefix-icon="Search"
          clearable
          class="search-input"
        />
        <el-button type="primary">
          <el-icon><Plus /></el-icon>
          新增服务
        </el-button>
      </div>
    </div>

    <div class="main-container">
      <div class="sidebar">
        <div class="sidebar-header">
          <span class="sidebar-title">服务分类</span>
        </div>
        <div class="category-list">
          <div
            v-for="category in categories"
            :key="category.id"
            :class="['category-item', { active: category.id === currentCategory }]"
            @click="currentCategory = category.id"
          >
            <span class="category-name">{{ category.name }}</span>
            <span class="category-count">{{ category.count }}</span>
          </div>
        </div>
      </div>

      <div class="content">
        <el-table :data="filteredServices" style="width: 100%">
          <el-table-column prop="name" label="服务名称" min-width="180" />
          <el-table-column prop="docCount" label="文档数量" width="100">
            <template #default="{ row }">
              <el-tag type="info">{{ row.docCount }} 篇</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="version" label="版本" width="100">
            <template #default="{ row }">
              <el-tag :type="getVersionTagType(row.versionType)">{{ row.version }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="category" label="分类" width="100" />
          <el-table-column prop="description" label="描述" min-width="200" />
          <el-table-column prop="updateTime" label="更新时间" width="160" />
          <el-table-column label="操作" width="180" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link>查看</el-button>
              <el-button type="primary" link>编辑</el-button>
              <el-button type="danger" link>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const searchKeyword = ref('')
const currentCategory = ref('all')

const categories = ref([
  { id: 'all', name: '全部服务', count: 36 },
  { id: 'srm', name: 'SRM服务', count: 24 },
  { id: 'pems', name: 'PEMS服务', count: 12 }
])

const services = ref([
  { id: 1, name: '采购协作中心', docCount: 18, version: 'v1.2.4', versionType: 'blue', category: 'SRM服务', description: '提供供应商生命周期管理、采购订单协同、合同管理等功能', updateTime: '2023-11-20 14:30' },
  { id: 2, name: '物料需求计划', docCount: 12, version: 'v2.0.1', versionType: 'green', category: 'PEMS服务', description: '生产制造物料计划算法引擎，支持多工厂协同', updateTime: '2023-11-18 09:15' },
  { id: 3, name: '库存预警系统', docCount: 6, version: 'v1.1.0', versionType: 'blue', category: 'SRM服务', description: '多仓库存实时监控与智能预警通知系统', updateTime: '2023-11-15 16:40' },
  { id: 4, name: '财务结算中心', docCount: 31, version: 'v3.4.2', versionType: 'orange', category: 'SRM服务', description: '支持多维度的财务对账与结算自动化处理', updateTime: '2023-11-12 11:00' }
])

const filteredServices = computed(() => {
  let result = services.value
  if (currentCategory.value !== 'all') {
    result = result.filter(s => s.category === (currentCategory.value === 'srm' ? 'SRM服务' : 'PEMS服务'))
  }
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(s => s.name.toLowerCase().includes(keyword))
  }
  return result
})

const getVersionTagType = (type) => {
  const types = { blue: '', green: 'success', orange: 'warning' }
  return types[type] || ''
}
</script>

<style lang="scss" scoped>
.document-manage-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  width: 280px;
}

.main-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  background: #fff;
  border-right: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e4e7ed;
}

.sidebar-title {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.category-list {
  flex: 1;
  overflow-y: auto;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f7fa;
  }

  &.active {
    background-color: #ecf5ff;
    color: var(--el-color-primary);
  }
}

.category-name {
  font-size: 14px;
}

.category-count {
  font-size: 12px;
  color: #909399;
  background: #f4f4f5;
  padding: 2px 8px;
  border-radius: 10px;
}

.content {
  flex: 1;
  padding: 24px;
  overflow: auto;
}
</style>
