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
          @input="handleSearch"
        />
        <el-button type="primary" @click="handleAddService">
          <el-icon><Plus /></el-icon>
          新增服务
        </el-button>
      </div>
    </div>

    <div class="main-container">
      <div class="sidebar">
        <div class="sidebar-header">
          <span class="sidebar-title">服务分类</span>
          <el-button text @click="startAddCategory">
            <el-icon><Plus /></el-icon>
          </el-button>
        </div>
        
        <div v-if="isAddingCategory" class="add-category-input">
          <el-input
            v-model="newCategoryName"
            placeholder="输入分类名称"
            size="small"
            @keyup.enter="saveNewCategory"
            @keyup.esc="cancelNewCategory"
          />
          <div class="add-actions">
            <el-button size="small" type="primary" @click="saveNewCategory">确定</el-button>
            <el-button size="small" @click="cancelNewCategory">取消</el-button>
          </div>
        </div>

        <div class="category-list">
          <div
            v-for="category in categories"
            :key="category.id"
            :class="['category-item', { active: category.id === currentCategory }]"
            @click="handleSelectCategory(category.id)"
          >
            <div v-if="editingCategoryId === category.id" class="edit-input">
              <el-input
                v-model="editingCategoryName"
                size="small"
                @keyup.enter="saveCategoryEdit"
                @keyup.esc="cancelCategoryEdit"
              />
              <el-button size="small" type="primary" text @click="saveCategoryEdit">
                <el-icon><Check /></el-icon>
              </el-button>
              <el-button size="small" text @click="cancelCategoryEdit">
                <el-icon><Close /></el-icon>
              </el-button>
            </div>
            <template v-else>
              <span class="category-name">{{ category.name }}</span>
              <span class="category-count">{{ category.count }}</span>
            </template>
          </div>
        </div>
      </div>

      <div class="content">
        <RdappTable
          :data="filteredServices"
          :table-columns="tableColumns"
          :show-pagination="false"
        >
          <template #name="{ row }">
            <span class="service-name">{{ row.name }}</span>
          </template>
          <template #docCount="{ row }">
            <el-tag type="info">{{ row.docCount }} 篇</el-tag>
          </template>
          <template #version="{ row }">
            <el-tag :type="getVersionTagType(row.versionType)">{{ row.version }}</el-tag>
          </template>
          <template #description="{ row }">
            <el-tooltip :content="row.description" placement="top">
              <span class="desc-text">{{ row.description }}</span>
            </el-tooltip>
          </template>
          <template #updateTime="{ row }">
            <span class="time-text">{{ row.updateTime }}</span>
          </template>
          <template #action="{ row }">
            <el-button type="primary" link @click="handleView(row)">查看</el-button>
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </RdappTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDocumentStore } from '@/stores'
import { Plus, Check, Close } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const documentStore = useDocumentStore()

const searchKeyword = ref('')
const editingCategoryId = ref(null)
const editingCategoryName = ref('')
const isAddingCategory = ref(false)
const newCategoryName = ref('')

const categories = computed(() => documentStore.categories)
const currentCategory = computed(() => documentStore.currentCategory)
const filteredServices = computed(() => documentStore.filteredServices)

const tableColumns = [
  { prop: 'name', label: '服务名称', minWidth: 180 },
  { prop: 'docCount', label: '文档数量', width: 100 },
  { prop: 'version', label: '版本', width: 100 },
  { prop: 'category', label: '分类', width: 100 },
  { prop: 'description', label: '描述', minWidth: 200 },
  { prop: 'updateTime', label: '更新时间', width: 160 },
  { prop: 'action', label: '操作', width: 180, fixed: 'right' }
]

const getVersionTagType = (type) => {
  const types = {
    blue: '',
    green: 'success',
    orange: 'warning'
  }
  return types[type] || ''
}

const handleSearch = () => {
  documentStore.setSearchKeyword(searchKeyword.value)
}

const handleSelectCategory = (categoryId) => {
  documentStore.setCurrentCategory(categoryId)
}

const startAddCategory = () => {
  isAddingCategory.value = true
  newCategoryName.value = ''
}

const saveNewCategory = () => {
  if (newCategoryName.value.trim()) {
    documentStore.addCategory(newCategoryName.value.trim())
    ElMessage.success('分类添加成功')
  }
  isAddingCategory.value = false
  newCategoryName.value = ''
}

const cancelNewCategory = () => {
  isAddingCategory.value = false
  newCategoryName.value = ''
}

const saveCategoryEdit = () => {
  documentStore.saveCategoryName()
  ElMessage.success('分类名称已更新')
}

const cancelCategoryEdit = () => {
  documentStore.cancelEditCategory()
}

const handleAddService = () => {
  ElMessage.info('新增服务功能开发中...')
}

const handleView = (row) => {
  ElMessage.info(`查看服务: ${row.name}`)
}

const handleEdit = (row) => {
  ElMessage.info(`编辑服务: ${row.name}`)
}

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要删除服务 "${row.name}" 吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  }).catch(() => {})
}

onMounted(() => {
  documentStore.setCurrentCategory('all')
})
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

.add-category-input {
  padding: 12px 16px;
  border-bottom: 1px solid #e4e7ed;
}

.add-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
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

.edit-input {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
}

.content {
  flex: 1;
  padding: 24px;
  overflow: auto;
}

.service-name {
  font-weight: 500;
  color: #303133;
}

.desc-text {
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  max-width: 300px;
}

.time-text {
  color: #909399;
  font-size: 13px;
}
</style>
