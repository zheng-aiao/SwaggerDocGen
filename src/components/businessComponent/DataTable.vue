<script setup>
import { computed } from "vue";

const props = defineProps({
  config: {
    type: Array,
    default: () => [],
    validator: (value) => {
      return value.every((col) => col.prop && col.label);
    },
  },
  data: {
    type: Array,
    default: () => [],
  },
  pagination: {
    type: Object,
    default: () => ({
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 50],
    }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  emptyText: {
    type: String,
    default: "暂无数据",
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["page-change", "size-change", "row-click", "action"]);

const tableData = computed(() => props.data);
const columns = computed(() => props.config);
const hasData = computed(() => tableData.value.length > 0);

const handlePageChange = (page) => {
  emit("page-change", page);
};

const handleSizeChange = (size) => {
  emit("size-change", size);
};

const handleRowClick = (row, column, event) => {
  emit("row-click", { row, column, event });
};

const handleAction = (action, row, $event) => {
  $event?.stopPropagation();
  emit("action", { action, row });
};

const getColumnType = (col) => {
  if (col.type) return col.type;
  return "default";
};

const getColumnAlign = (col) => {
  if (col.align) return col.align;
  return "left";
};

const getColumnWidth = (col) => {
  if (col.width) return col.width;
  if (col.minWidth) return;
  return undefined;
};

const renderCell = (row, col) => {
  if (col.formatter) {
    return col.formatter(row[col.prop], row);
  }
  return row[col.prop];
};
</script>

<template>
  <div class="data-table-wrapper">
    <div class="table-container" v-loading="loading">
      <el-table
        :data="tableData"
        :class="['data-table', { 'is-empty': !hasData }]"
        :header-cell-style="{
          background: '#F8FAFC',
          color: '#64748B',
          fontWeight: '600',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
          lineHeight: '16px'
        }"
        :empty-text="emptyText"
        @row-click="handleRowClick"
      >
        <template v-for="col in columns" :key="col.prop">
          <el-table-column
            :prop="col.prop"
            :label="col.label"
            :width="getColumnWidth(col)"
            :min-width="col.minWidth"
            :align="getColumnAlign(col)"
            :fixed="col.fixed"
            :sortable="col.sortable"
            :type="getColumnType(col)"
          >
            <template #default="{ row }" v-if="!col.type">
              <template v-if="col.slot">
                <slot :name="col.slot" :row="row" :column="col"></slot>
              </template>
              <template v-else-if="col.render">
                <component :is="col.render(row)" />
              </template>
              <template v-else-if="col.actions">
                <div class="action-buttons">
                  <template v-for="action in col.actions" :key="action.key">
                    <el-tooltip
                      v-if="action.show !== false"
                      :content="action.label"
                      placement="top"
                    >
                      <el-button
                        link
                        :type="action.type || 'primary'"
                        class="action-btn"
                        @click="handleAction(action.key, row, $event)"
                      >
                        <el-icon v-if="action.icon"
                          ><component :is="action.icon"
                        /></el-icon>
                        <span v-else>{{ action.label }}</span>
                      </el-button>
                    </el-tooltip>
                  </template>
                </div>
              </template>
              <template v-else-if="col.tag">
                <el-tag
                  :type="col.tag.type || 'info'"
                  :size="col.tag.size || 'small'"
                  :effect="col.tag.effect || 'light'"
                  :class="col.tag.class"
                >
                  {{ renderCell(row, col) }}
                </el-tag>
              </template>
              <template v-else>
                <span :class="col.cellClass">{{ renderCell(row, col) }}</span>
              </template>
            </template>
          </el-table-column>
        </template>

        <template #empty>
          <div class="empty-state">
            <el-icon :size="48" color="#D1D5DB"><Document /></el-icon>
            <p class="empty-text">{{ emptyText }}</p>
          </div>
        </template>
      </el-table>
    </div>

    <div v-if="showPagination && hasData" class="pagination-wrapper">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="pagination.pageSizes || [10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.data-table-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.table-container {
  flex: 1;
  overflow: hidden;

  .data-table {
    height: 100%;

    :deep(.el-table__header-wrapper) {
      th {
        background: #f8fafc !important;
        font-weight: 600;
        color: #64748b !important;
        border-bottom: 1px solid #e2e8f0;
        height: 65.5px !important;
        padding: 0 24px !important;
        font-size: 12px !important;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        line-height: 16px;
      }
    }

    :deep(.el-table__body-wrapper) {
      td {
        padding: 12px 0;
        border-bottom: 1px solid #f1f5f9;
      }

      .el-table__row {
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover > td {
          background: #f8fafc !important;
        }
      }
    }

    :deep(.el-table__empty-block) {
      min-height: 200px;
    }
  }
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 2px;

  .action-btn {

    .el-icon {
      font-size: 16px;
    }

    &:hover {
      background: #f1f5f9;
      border-radius: 4px;
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;

  .empty-text {
    margin-top: 12px;
    font-size: 14px;
    color: #9ca3af;
  }
}

/* 表格单元格样式 */
:deep(.name-text) {
  font-weight: 500;
  color: #1f2937;
}

:deep(.doc-count) {
  color: #3b82f6;
  font-weight: 500;
}

:deep(.version-tag) {
  background: #dbeafe;
  color: #3b82f6;
  border: none;
}

:deep(.category-text) {
  color: #64748b;
}

:deep(.desc-text) {
  color: #64748b;
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.time-text) {
  color: #64748b;
  font-size: 13px;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 24px;
  height: 65px;
  box-sizing: border-box;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;

  :deep(.el-pagination) {
    .el-pagination__total,
    .el-pagination__sizes,
    .el-pagination__jump {
      font-size: 14px;
      color: #475569;
      font-family: 'Inter', sans-serif;
      font-weight: 400;
    }

    .el-pager li {
      min-width: 32px;
      height: 32px;
      line-height: 30px;
      border-radius: 4px;
      font-size: 14px;
      color: #475569;
      font-family: 'Inter', sans-serif;
      font-weight: 400;
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

    .btn-prev,
    .btn-next {
      min-width: 32px;
      height: 32px;
      line-height: 30px;
      border-radius: 4px;
      color: #475569;
      border: 1px solid #e2e8f0;
      background: #ffffff;

      &:hover {
        color: #0f78f0;
        border-color: #0f78f0;
      }

      &.disabled {
        color: #d1d5db;
        border-color: #e2e8f0;
        background: #ffffff;
      }
    }

    .el-pagination__sizes .el-input .el-input__wrapper {
      border-radius: 4px;
    }
  }
}

@media screen and (max-width: 768px) {
  .pagination-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 12px;

    :deep(.el-pagination) {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}
</style>
