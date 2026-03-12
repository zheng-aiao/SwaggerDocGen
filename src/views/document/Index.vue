<template>
  <div class="document-page">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">文档管理</h1>
        <p class="page-subtitle">管理和查看所有文档的历史版本</p>
      </div>
      <div class="header-actions">
        <el-button type="primary" @click="handleUpload">
          <el-icon><Upload /></el-icon>
          上传文档
        </el-button>
      </div>
    </div>

    <!-- Filter Section -->
    <div class="filter-section">
      <div class="filter-row">
        <SearchInput 
          v-model="searchForm.keyword" 
          placeholder="搜索文档名称..."
          @input="handleSearch"
        />
        <el-select v-model="searchForm.type" placeholder="文档类型" clearable>
          <el-option label="API文档" value="api" />
          <el-option label="Swagger文档" value="swagger" />
          <el-option label="Markdown文档" value="markdown" />
        </el-select>
        <el-date-picker
          v-model="searchForm.dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
    </div>

    <!-- Data Table -->
    <div class="table-section">
      <el-table
        :data="documentList"
        style="width: 100%"
        :header-cell-style="{
          background: '#F8FAFC',
          color: '#64748B',
          fontWeight: '600',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.6px'
        }"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="文档名称" min-width="200">
          <template #default="{ row }">
            <div class="doc-name-cell">
              <el-icon class="doc-icon"><Document /></el-icon>
              <div class="doc-info">
                <span class="doc-name">{{ row.name }}</span>
                <span class="doc-version">{{ row.version }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="getTagType(row.type)" size="small">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="serviceName" label="所属服务" min-width="150" />
        <el-table-column prop="updateTime" label="更新时间" width="160" align="center" />
        <el-table-column prop="creator" label="创建人" width="100" align="center" />
        <el-table-column label="操作" width="280" align="center" fixed="right">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button link type="primary" @click="handlePreview(row)">
                <el-icon><View /></el-icon>预览
              </el-button>
              <el-button link type="primary" @click="handleDownload(row)">
                <el-icon><Download /></el-icon>下载
              </el-button>
              <el-button link type="primary" @click="handleHistory(row)">
                <el-icon><Clock /></el-icon>历史
              </el-button>
              <el-button link type="danger" @click="handleDelete(row)">
                <el-icon><Delete /></el-icon>删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Pagination -->
    <div class="pagination-wrapper">
      <div class="pagination-left">
        <span class="total-text">显示第 1 至 8 条，共 15 条结果</span>
      </div>
      <div class="pagination-right">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50]"
          layout="sizes, prev, pager, next, jumper"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import SearchInput from '@/components/basicComponent/SearchInput.vue'

const router = useRouter()

// 搜索表单
const searchForm = reactive({
  keyword: '',
  type: '',
  dateRange: null
})

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 15
})

// 文档列表数据
const documentList = ref([
  {
    id: 1,
    name: '用户认证API文档',
    version: 'v2.4.0',
    type: 'API文档',
    serviceName: 'srm认证服务',
    updateTime: '2023-10-24 14:30',
    creator: '张三'
  },
  {
    id: 2,
    name: '订单处理Swagger',
    version: 'v2.3.1',
    type: 'Swagger文档',
    serviceName: 'srm订单服务',
    updateTime: '2023-10-20 10:15',
    creator: '李四'
  },
  {
    id: 3,
    name: '支付接口文档',
    version: 'v2.3.0',
    type: 'API文档',
    serviceName: 'srm支付服务',
    updateTime: '2023-10-15 16:45',
    creator: '王五'
  },
  {
    id: 4,
    name: '库存管理API',
    version: 'v2.2.5',
    type: 'API文档',
    serviceName: 'srm库存服务',
    updateTime: '2023-10-10 09:20',
    creator: '赵六'
  },
  {
    id: 5,
    name: '用户手册',
    version: 'v1.0.0',
    type: 'Markdown文档',
    serviceName: 'srm基础服务',
    updateTime: '2023-10-05 14:00',
    creator: '钱七'
  }
])

// 获取标签类型
const getTagType = (type) => {
  const typeMap = {
    'API文档': 'success',
    'Swagger文档': 'warning',
    'Markdown文档': 'info'
  }
  return typeMap[type] || 'info'
}

// 搜索处理
const handleSearch = () => {
  console.log('搜索条件:', searchForm)
}

// 上传处理
const handleUpload = () => {
  console.log('上传文档')
}

// 预览处理
const handlePreview = (row) => {
  console.log('预览文档:', row)
}

// 下载处理
const handleDownload = (row) => {
  console.log('下载文档:', row)
}

// 历史记录处理
const handleHistory = (row) => {
  console.log('查看历史:', row)
  router.push('/document')
}

// 删除处理
const handleDelete = (row) => {
  console.log('删除文档:', row)
}
</script>

<style scoped lang="scss">
.document-page {
  padding: 32px 40px;
  background: #f8fafc;
  min-height: 100vh;
}

// 页面标题区
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;

  .header-left {
    .page-title {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 8px 0;
    }

    .page-subtitle {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }
  }
}

// 筛选区
.filter-section {
  background: #ffffff;
  padding: 20px 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .filter-row {
    display: flex;
    gap: 16px;
    align-items: center;
  }
}

// 表格区
.table-section {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  :deep(.el-table) {
    .el-table__header-wrapper {
      th {
        background: #F8FAFC;
        color: #64748B;
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        border-bottom: 1px solid #e2e8f0;
      }
    }
  }
}

// 文档名称单元格
.doc-name-cell {
  display: flex;
  align-items: center;
  gap: 12px;

  .doc-icon {
    font-size: 24px;
    color: #3b82f6;
  }

  .doc-info {
    display: flex;
    flex-direction: column;

    .doc-name {
      font-weight: 500;
      color: #1e293b;
      font-size: 14px;
    }

    .doc-version {
      font-size: 12px;
      color: #64748b;
    }
  }
}

// 操作按钮
.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;

  .el-button {
    font-size: 13px;

    .el-icon {
      margin-right: 4px;
      font-size: 14px;
    }
  }
}

// 分页
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;

  .pagination-left {
    .total-text {
      font-size: 14px;
      color: #64748b;
    }
  }

  .pagination-right {
    :deep(.el-pagination) {
      .el-pagination__sizes,
      .el-pagination__jump {
        font-size: 14px;
        color: #475569;
      }

      .el-pager li {
        min-width: 32px;
        height: 32px;
        line-height: 30px;
        border-radius: 4px;
        font-size: 14px;
        color: #475569;
        border: 1px solid #e2e8f0;
        background: #ffffff;

        &.active {
          background: #0f78f0;
          color: #ffffff;
          border-color: #0f78f0;
        }

        &:hover:not(.active) {
          color: #0f78f0;
          border-color: #0f78f0;
        }
      }
    }
  }
}
</style>
