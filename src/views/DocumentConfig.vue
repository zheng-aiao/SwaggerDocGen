<template>
  <div class="document-config-page">
    <div class="page-header">
      <h1 class="page-title">文档配置</h1>
    </div>

    <div class="main-container">
      <div class="sidebar">
        <div class="sidebar-header">
          <span class="sidebar-title">配置项</span>
        </div>
        <div class="menu-list">
          <div
            v-for="item in menuItems"
            :key="item.id"
            :class="['menu-item', { active: currentMenu === item.id }]"
            @click="currentMenu = item.id"
          >
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="config-form">
          <h3 class="form-title">{{ currentConfigTitle }}</h3>
          
          <el-form :model="formData" label-width="120px" v-if="currentMenu === 'basic'">
            <el-form-item label="项目名称">
              <el-input v-model="formData.projectName" placeholder="请输入项目名称" />
            </el-form-item>
            <el-form-item label="项目描述">
              <el-input v-model="formData.projectDesc" type="textarea" :rows="3" placeholder="请输入项目描述" />
            </el-form-item>
            <el-form-item label="API 版本">
              <el-input v-model="formData.apiVersion" placeholder="如: v1.0.0" />
            </el-form-item>
            <el-form-item label="基础路径">
              <el-input v-model="formData.basePath" placeholder="如: /api/v1" />
            </el-form-item>
          </el-form>

          <el-form :model="formData" label-width="120px" v-else-if="currentMenu === 'api'">
            <el-form-item label="Swagger URL">
              <el-input v-model="formData.swaggerUrl" placeholder="请输入 Swagger JSON 地址" />
            </el-form-item>
            <el-form-item label="解析模式">
              <el-select v-model="formData.parseMode" placeholder="请选择解析模式">
                <el-option label="自动解析" value="auto" />
                <el-option label="手动配置" value="manual" />
              </el-select>
            </el-form-item>
            <el-form-item label="自动同步">
              <el-switch v-model="formData.autoSync" />
            </el-form-item>
          </el-form>

          <el-form :model="formData" label-width="120px" v-else-if="currentMenu === 'template'">
            <el-form-item label="文档模板">
              <el-select v-model="formData.template" placeholder="请选择文档模板">
                <el-option label="标准模板" value="standard" />
                <el-option label="简洁模板" value="simple" />
                <el-option label="详细模板" value="detailed" />
              </el-select>
            </el-form-item>
          </el-form>

          <el-form :model="formData" label-width="120px" v-else-if="currentMenu === 'export'">
            <el-form-item label="导出格式">
              <el-checkbox-group v-model="formData.formats">
                <el-checkbox value="html">HTML</el-checkbox>
                <el-checkbox value="pdf">PDF</el-checkbox>
                <el-checkbox value="markdown">Markdown</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="包含示例">
              <el-switch v-model="formData.includeExamples" />
            </el-form-item>
          </el-form>

          <div class="form-actions">
            <el-button type="primary" @click="saveConfig">保存配置</el-button>
            <el-button @click="resetConfig">重置</el-button>
          </div>
        </div>
      </div>

      <div class="preview">
        <div class="preview-header">
          <span class="preview-title">预览区域</span>
        </div>
        <div class="preview-content">
          <div class="preview-placeholder">
            <el-icon :size="48"><Document /></el-icon>
            <span>配置预览</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Setting, Connection, Document, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const currentMenu = ref('basic')

const menuItems = [
  { id: 'basic', name: '基础配置', icon: Setting },
  { id: 'api', name: '接口配置', icon: Connection },
  { id: 'template', name: '模板配置', icon: Document },
  { id: 'export', name: '导出配置', icon: Download }
]

const currentConfigTitle = computed(() => {
  const item = menuItems.find(m => m.id === currentMenu.value)
  return item?.name || ''
})

const formData = ref({
  projectName: '',
  projectDesc: '',
  apiVersion: '',
  basePath: '',
  swaggerUrl: '',
  parseMode: 'auto',
  autoSync: false,
  template: 'standard',
  formats: ['html', 'markdown'],
  includeExamples: true
})

const saveConfig = () => {
  ElMessage.success('配置保存成功')
}

const resetConfig = () => {
  formData.value = {
    projectName: '',
    projectDesc: '',
    apiVersion: '',
    basePath: '',
    swaggerUrl: '',
    parseMode: 'auto',
    autoSync: false,
    template: 'standard',
    formats: ['html', 'markdown'],
    includeExamples: true
  }
}
</script>

<style lang="scss" scoped>
.document-config-page {
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

.main-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 200px;
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

.menu-list {
  flex: 1;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f7fa;
  }

  &.active {
    background-color: #ecf5ff;
    color: var(--el-color-primary);
    border-right: 2px solid var(--el-color-primary);
  }
}

.content {
  flex: 1;
  padding: 24px;
  overflow: auto;
}

.config-form {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
}

.form-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e4e7ed;
}

.preview {
  width: 400px;
  background: #fff;
  border-left: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e4e7ed;
}

.preview-title {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.preview-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #909399;
}
</style>
