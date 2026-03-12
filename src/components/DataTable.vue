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
          color: '#475569',
          fontWeight: '500',
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
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.table-container {
  flex: 1;
  overflow: hidden;

  .data-table {
    height: 100%;

    :deep(.el-table__header-wrapper) {
      th {
        background: #f8fafc !important;
        font-weight: 500;
        color: #475569;
        border-bottom: 1px solid #e2e8f0;
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
  gap: 8px;

  .action-btn {
    padding: 4px 8px;

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

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #f1f5f9;
  background: #ffffff;

  :deep(.el-pagination) {
    .el-pagination__total,
    .el-pagination__sizes,
    .el-pagination__jump {
      font-size: 13px;
      color: #64748b;
    }

    .el-pager li {
      min-width: 32px;
      height: 32px;
      line-height: 32px;
      border-radius: 6px;
      font-size: 14px;
      color: #4b5563;

      &.active {
        background: #3b82f6;
        color: #ffffff;
      }

      &:hover:not(.active) {
        color: #3b82f6;
      }
    }

    .btn-prev,
    .btn-next {
      min-width: 32px;
      height: 32px;
      border-radius: 6px;
      color: #4b5563;

      &:hover {
        color: #3b82f6;
      }

      &.disabled {
        color: #d1d5db;
      }
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
