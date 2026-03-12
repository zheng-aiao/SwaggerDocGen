<template>
  <div class="service-layout">
    <!-- 左侧导航栏 -->
    <LeftSidebar
      title="服务分类"
      :category-list="[
        { id: 'all', name: '全部服务', count: 12 },
        { id: 'srm', name: 'SRM系统', count: 5 },
        { id: 'erp', name: 'ERP系统', count: 3 },
        { id: 'crm', name: 'CRM系统', count: 2 },
        { id: 'other', name: '其他服务', count: 2 }
      ]"
    >
      <template #footer>
        <el-button class="add-category-btn" text>
          <el-icon><Plus /></el-icon>
          新增分类
        </el-button>
      </template>
    </LeftSidebar>

    <!-- 右侧内容区域 -->
    <div class="right-content">
      <!-- 面包屑导航 -->
      <BreadcrumbNav />

      <!-- 路由视图 -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import LeftSidebar from './LeftSidebar.vue'
import BreadcrumbNav from '@/components/businessComponent/BreadcrumbNav.vue'
</script>

<style scoped lang="scss">
.service-layout {
  display: flex;
  width: 100%;
  height: calc(100vh - 64px);
  overflow: hidden;

  :deep(.left-sidebar) {
    width: 240px;
    flex-shrink: 0;
  }

  .right-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #f8fafc;

    :deep(.breadcrumb-nav) {
      padding: 16px 24px;
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      flex-shrink: 0;
    }

    :deep(> .router-view-wrapper,
           > div:not(.breadcrumb-nav)) {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
    }
  }
}

.add-category-btn {
  width: 100%;
  justify-content: center;
  color: #64748b;
  border: 1px dashed #e2e8f0;
  border-radius: 6px;
  padding: 8px;

  &:hover {
    color: #3b82f6;
    border-color: #3b82f6;
  }

  .el-icon {
    margin-right: 4px;
  }
}
</style>
