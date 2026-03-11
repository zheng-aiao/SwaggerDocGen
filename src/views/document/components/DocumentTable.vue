<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  pagination: {
    type: Object,
    default: () => ({
      currentPage: 1,
      pageSize: 10,
      total: 0
    })
  }
})

const emit = defineEmits(['page-change', 'size-change', 'view', 'download'])

const handlePageChange = (page) => {
  emit('page-change', page)
}

const handleSizeChange = (size) => {
  emit('size-change', size)
}

const viewDocument = (row) => {
  emit('view', row)
}

const downloadDocument = (row) => {
  emit('download', row)
}
</script>

<template>
  <div class="document-table-wrapper">
    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th class="col-name">文档名称</th>
            <th class="col-version">版本号</th>
            <th class="col-publisher">发布人</th>
            <th class="col-time">发布时间</th>
            <th class="col-desc">发布说明</th>
            <th class="col-action">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in data" :key="row.id" class="table-row">
            <td class="cell-name">
              <div class="file-info">
                <el-icon class="file-icon" :size="18"><Document /></el-icon>
                <span class="file-name" :title="row.name">{{ row.name }}</span>
              </div>
            </td>
            <td class="cell-version">
              <span class="version-tag">{{ row.version }}</span>
            </td>
            <td class="cell-publisher">
              <div class="publisher-info">
                <el-avatar :size="24" icon="UserFilled" />
                <span>{{ row.publisher }}</span>
              </div>
            </td>
            <td class="cell-time">
              <span class="time-text">{{ row.publishTime }}</span>
            </td>
            <td class="cell-desc">
              <span class="desc-text" :title="row.description">{{ row.description }}</span>
            </td>
            <td class="cell-action">
              <div class="action-btns">
                <el-button link type="primary" @click="viewDocument(row)">
                  <el-icon><View /></el-icon>
                </el-button>
                <el-button link type="primary" @click="downloadDocument(row)">
                  <el-icon><Download /></el-icon>
                </el-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination-wrapper">
      <div class="pagination-info">
        共 {{ pagination.total }} 条
      </div>
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 50]"
        layout="sizes, prev, pager, next"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.document-table-wrapper {
  .table-container {
    padding: 0 32px;
    overflow-x: auto;
  }

  .custom-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;

    thead {
      tr {
        background: #F8FAFC;
        border-bottom: 1px solid #E2E8F0;
      }

      th {
        padding: 14px 16px;
        text-align: left;
        font-weight: 600;
        color: #475569;
        white-space: nowrap;

        &.col-name {
          width: 20%;
        }

        &.col-version {
          width: 10%;
        }

        &.col-publisher {
          width: 12%;
        }

        &.col-time {
          width: 15%;
        }

        &.col-desc {
          width: 28%;
        }

        &.col-action {
          width: 8%;
          text-align: center;
        }
      }
    }

    tbody {
      .table-row {
        border-bottom: 1px solid #F1F5F9;
        transition: background-color 0.2s;

        &:hover {
          background: #FAFBFC;
        }

        td {
          padding: 16px;
          color: #4B5563;
          vertical-align: middle;
        }
      }
    }
  }

  .cell-name {
    .file-info {
      display: flex;
      align-items: center;
      gap: 10px;

      .file-icon {
        color: #3B82F6;
        flex-shrink: 0;
      }

      .file-name {
        color: #1F2937;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 180px;
      }
    }
  }

  .cell-version {
    .version-tag {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      background: #DBEAFE;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      color: #1E40AF;
    }
  }

  .cell-publisher {
    .publisher-info {
      display: flex;
      align-items: center;
      gap: 8px;

      span {
        color: #4B5563;
      }
    }
  }

  .cell-time {
    .time-text {
      color: #6B7280;
      font-size: 13px;
    }
  }

  .cell-desc {
    .desc-text {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: #6B7280;
      font-size: 13px;
      line-height: 1.5;
    }
  }

  .cell-action {
    .action-btns {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;

      .el-button {
        padding: 4px 8px;
        font-size: 16px;

        &:hover {
          background: transparent;
        }
      }
    }
  }

  // Pagination
  .pagination-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 32px;
    border-top: 1px solid #F1F5F9;

    .pagination-info {
      font-size: 14px;
      color: #6B7280;
    }

    :deep(.el-pagination) {
      .el-pagination__sizes {
        margin-right: 12px;
      }

      .el-pager li {
        min-width: 32px;
        height: 32px;
        line-height: 32px;
        border-radius: 6px;
        font-size: 14px;
        color: #4B5563;

        &.active {
          background: #3B82F6;
          color: #FFFFFF;
        }

        &:hover:not(.active) {
          color: #3B82F6;
        }
      }

      .btn-prev,
      .btn-next {
        min-width: 32px;
        height: 32px;
        border-radius: 6px;
        color: #4B5563;

        &:hover {
          color: #3B82F6;
        }

        &.disabled {
          color: #D1D5DB;
        }
      }
    }
  }
}
</style>
