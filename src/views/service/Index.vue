<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LeftSidebar from '@/layout/LeftSidebar.vue'

const router = useRouter()

// 搜索表单
const searchForm = ref({
  keyword: ''
})

// 服务列表数据
const serviceList = ref([
  {
    id: 1,
    name: 'srm基础服务',
    category: 'srm系统',
    description: '该服务涵盖了所有核心业务逻辑的API定义与调用规范。主要包括用户鉴权、订单处理、库存同步及第三方支付集成接口。',
    docCount: 15,
    latestVersion: 'v2.4.0',
    lastUpdate: '2023-10-24',
    creator: '张管理',
    status: 'published'
  },
  {
    id: 2,
    name: 'srm认证服务',
    category: 'srm系统',
    description: '提供统一的身份认证和授权服务，支持OAuth2.0、JWT等多种认证方式，确保系统安全访问。',
    docCount: 8,
    latestVersion: 'v2.3.1',
    lastUpdate: '2023-10-20',
    creator: '李开发',
    status: 'published'
  },
  {
    id: 3,
    name: 'srm订单服务',
    category: 'srm系统',
    description: '处理订单全生命周期管理，包括订单创建、支付、发货、退款等流程的API接口。',
    docCount: 12,
    latestVersion: 'v2.3.0',
    lastUpdate: '2023-10-15',
    creator: '王架构',
    status: 'draft'
  },
  {
    id: 4,
    name: 'srm库存服务',
    category: 'srm系统',
    description: '实时库存管理与同步服务，支持多仓库、多SKU的库存查询、扣减、回滚等操作。',
    docCount: 6,
    latestVersion: 'v2.2.5',
    lastUpdate: '2023-10-10',
    creator: '赵运维',
    status: 'published'
  },
  {
    id: 5,
    name: 'srm支付服务',
    category: 'srm系统',
    description: '集成多种支付渠道，提供统一的支付接口，支持微信支付、支付宝、银联等支付方式。',
    docCount: 10,
    latestVersion: 'v2.2.0',
    lastUpdate: '2023-10-05',
    creator: '钱支付',
    status: 'published'
  }
])

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 5
})

const handleSearch = () => {
  console.log('搜索:', searchForm.value)
}

const handlePageChange = (page) => {
  pagination.value.currentPage = page
}

const handleSizeChange = (size) => {
  pagination.value.pageSize = size
}

const viewService = (row) => {
  router.push('/service')
}

const getStatusType = (status) => {
  const statusMap = {
    'published': 'success',
    'draft': 'info'
  }
  return statusMap[status] || 'info'
}

const getStatusText = (status) => {
  const statusMap = {
    'published': '已发布',
    'draft': '草稿'
  }
  return statusMap[status] || status
}
</script>

<template>
  <div class="service-manage-page">
    <!-- Left Sidebar -->
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

    <!-- Right Content -->
    <main class="right-content">
      <!-- Action Row -->
      <div class="action-row">
        <div class="search-box">
          <el-input
            v-model="searchForm.keyword"
            placeholder="搜索服务名称"
            clearable
            class="search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
        <el-button type="primary" class="create-btn">
          <el-icon><Plus /></el-icon>
          新建服务
        </el-button>
      </div>

      <!-- Service Cards Grid -->
      <div class="service-grid">
        <div
          v-for="item in serviceList"
          :key="item.id"
          class="service-card"
          @click="viewService(item)"
        >
          <div class="card-header">
            <div class="service-icon">
              <el-icon :size="24" color="#FFFFFF"><Document /></el-icon>
            </div>
            <div class="service-info">
              <h4 class="service-name">{{ item.name }}</h4>
              <div class="service-meta">
                <el-tag :type="getStatusType(item.status)" size="small" effect="light">
                  {{ getStatusText(item.status) }}
                </el-tag>
                <span class="version-tag">{{ item.latestVersion }}</span>
              </div>
            </div>
          </div>
          <p class="service-desc">{{ item.description }}</p>
          <div class="card-footer">
            <div class="stat-item">
              <el-icon><Document /></el-icon>
              <span>{{ item.docCount }} 文档</span>
            </div>
            <div class="stat-item">
              <el-icon><User /></el-icon>
              <span>{{ item.creator }}</span>
            </div>
            <div class="stat-item">
              <el-icon><Clock /></el-icon>
              <span>{{ item.lastUpdate }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.service-manage-page {
  display: flex;
  width: 100%;
  height: 100%;
}

:deep(.left-sidebar) {
  width: 20%;
}

.right-content {
  width: 80%;
  overflow-y: auto;
  padding: 24px;
  background: #F8FAFC;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .search-box {
    width: 320px;

    .search-input {
      :deep(.el-input__wrapper) {
        border-radius: 8px;
        box-shadow: 0 0 0 1px #E2E8F0 inset;

        &:hover, &.is-focus {
          box-shadow: 0 0 0 1px #3B82F6 inset;
        }
      }
    }
  }

  .create-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    background: #3B82F6;
    border: none;
    border-radius: 8px;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 500;

    &:hover {
      background: #2563EB;
    }
  }
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.service-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3B82F6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }

  .card-header {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;

    .service-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .service-info {
      flex: 1;
      min-width: 0;

      .service-name {
        font-size: 15px;
        font-weight: 600;
        color: #1F2937;
        margin-bottom: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .service-meta {
        display: flex;
        align-items: center;
        gap: 8px;

        .version-tag {
          font-size: 12px;
          color: #3B82F6;
          background: #DBEAFE;
          padding: 2px 6px;
          border-radius: 4px;
        }
      }
    }
  }

  .service-desc {
    font-size: 13px;
    color: #64748B;
    line-height: 1.6;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-footer {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 12px;
    border-top: 1px solid #F1F5F9;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: #64748B;

      .el-icon {
        font-size: 14px;
      }
    }
  }
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}
</style>
