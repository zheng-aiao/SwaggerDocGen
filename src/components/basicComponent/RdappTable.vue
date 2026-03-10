<template>
  <div id="rdappTable">
    <div :class="['table-container', { showPagination }]">
      <el-table
        ref="elTableRef"
        v-bind="$attrs"
        :data="data"
        class="rdappTable"
        :row-key="rowKey"
        lazy
        :max-height="computedMaxHeight"
        :load="handleLoad"
        @selection-change="handleSelectionChange"
        @current-change="handleCurrentChange"
        @select="handleSelect"
      >
        <template v-if="tableColumns.length && showSelection">
          <el-table-column
            width="65"
            type="selection"
            :selectable="(row) => row.isDisabled !== 'disabled'"
          />
        </template>
        <template v-if="tableColumns.length && showIndex">
          <el-table-column width="55" type="index" label="序号" />
        </template>
        <template v-for="(item, index) in tableColumns" :key="`${item.prop}${index}`">
          <el-table-column
            v-bind="item"
            :show-overflow-tooltip="getShowTooltip(item)"
            class-name="row-item"
          >
            <template #header>
              <slot :name="`${item.prop}-header`">{{ item.label }}</slot>
            </template>
            <template #default="scope">
              <slot
                :name="item.prop"
                v-bind="{ ...scope, item, rowValue: transferPropValue(scope.row, item) }"
              >
                <div v-if="item.type === 'dict' || item.type === 'resource'">
                  <RdappTableDictTag
                    :dictValue="transferPropValue(scope.row, item)"
                    :dictType="item.type"
                    :dictKey="item.dictKey"
                    :valueKey="item.type === 'dict' ? 'dictValue' : 'id'"
                  />
                </div>
                <div v-else-if="item.type === 'button'" class="action">
                  <RdappButton
                    v-for="button in item.buttons(scope.row)"
                    :key="button.authCode"
                    :class="button.class"
                    tableBtn
                    :verifyAuth="button.authCode"
                    :type="button.type"
                    :label="button.label"
                    @click="button.click(scope.row)"
                  />
                </div>
                <div v-else-if="item.type === 'dateTime'">
                  {{ formatTime(transferPropValue(scope.row, item), item.dateFormat || 'YYYY-MM-DD HH:mm:ss') }}
                </div>
                <div v-else-if="item.type === 'date'">
                  {{ formatTime(transferPropValue(scope.row, item), item.dateFormat || 'YYYY-MM-DD') }}
                </div>
                <div v-else class="text">{{ transferPropValue(scope.row, item) }}</div>
              </slot>
            </template>
          </el-table-column>
        </template>
        <template #append>
          <slot name="append" />
        </template>
      </el-table>
    </div>
    <el-pagination
      v-if="showPagination"
      :key="pageIndex"
      :layout="layout"
      :total="totalCount"
      :pager-count="pagerCount"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :current-page="pageIndex"
      :hide-on-single-page="$attrs['hide-on-single-page'] || false"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { formatTime } from '@/utils/publicMethod'

const props = defineProps({
  data: { type: Array, required: true },
  tableColumns: { type: Array, required: true },
  rowKey: { type: String, default: 'id' },
  pageIndex: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  pageSizes: { type: Array, default: () => [10, 20, 50, 100] },
  totalCount: { type: Number, default: 0 },
  pagerCount: { type: Number, default: 7 },
  showPagination: { type: Boolean, default: true },
  showSelection: { type: Boolean, default: false },
  showIndex: { type: Boolean, default: false },
  handlerOptions: { type: Object, default: () => ({ show: false, list: [] }) },
  isWheelLayout: { type: [Boolean, Object], default: null },
  maxHeight: { type: [Number, String], default: null },
  layout: {
    type: String,
    default: 'total, prev, pager, next, sizes, jumper'
  }
})

const emit = defineEmits([
  'load',
  'selectionChange',
  'currentRowChange',
  'selectChangeMultiple',
  'currentChange',
  'sizeChange',
  'prevClick',
  'nextClick',
  'update:isWheelLayout'
])

const elTableRef = ref()
const rootFontSize = ref(16)

const computedMaxHeight = computed(() => {
  if (!props.maxHeight) return undefined
  const max = +props.maxHeight - 42
  return (max / 16) * rootFontSize.value
})

const getShowTooltip = (item) =>
  !item.showCopyIcon && (Reflect.has(item, 'tooltip') ? item.tooltip : true)

const getValue = (key, item) => {
  if (!key) return '--'
  return key.split('.').reduce((prev, current) => prev[current] ?? '', item)
}

const transferPropValue = (row, item) => {
  const { prop, format } = item
  let rowValue = prop.includes('.') ? getValue(prop, row) : row[prop]
  if (format && typeof format === 'function') {
    rowValue = format(rowValue, row)
  }
  return [null, undefined, ''].includes(rowValue) ? '--' : rowValue
}

const handleLoad = (tree, treeNode, resolve) => {
  emit('load', tree, treeNode, resolve)
}

const handleSelectionChange = (selection) => {
  emit('selectionChange', selection)
}

const handleCurrentChange = (currentRow, oldCurrentRow) => {
  emit('currentRowChange', currentRow, oldCurrentRow)
}

const handleSelect = (selection, row) => {
  emit('selectChangeMultiple', selection, row)
}

const handlePageChange = (page) => {
  emit('currentChange', page)
}

const handleSizeChange = (size) => {
  emit('sizeChange', size)
}

const handlePrevClick = () => {
  emit('prevClick')
}

const handleNextClick = () => {
  emit('nextClick')
}

function wheelHandle(e) {
  const tableBodyEl = elTableRef.value?.$el?.querySelector('.el-table__body-wrapper')
  if (!tableBodyEl) return
  
  const scrollTop = tableBodyEl.scrollTop || 0
  const direction = e.deltaY > 0 ? 'down' : 'up'
  const isShow = !(scrollTop < 10 && direction === 'up')
  emit('update:isWheelLayout', isShow)

  if (tableBodyEl.scrollHeight > tableBodyEl.clientHeight) {
    tableBodyEl.style.overflowY = 'scroll'
  } else {
    tableBodyEl.style.overflowY = 'visible'
  }
}

onMounted(() => {
  const fontSize = document.documentElement.style.fontSize
  if (fontSize) {
    rootFontSize.value = Number(fontSize.replace('px', ''))
  }
  
  if (props.isWheelLayout !== null && elTableRef.value?.$el) {
    const tableBodyWrapper = elTableRef.value.$el.querySelector('.el-table__body-wrapper')
    if (tableBodyWrapper) {
      tableBodyWrapper.addEventListener('wheel', wheelHandle)
    }
  }
})

onBeforeUnmount(() => {
  if (props.isWheelLayout !== null && elTableRef.value?.$el) {
    const tableBodyWrapper = elTableRef.value.$el.querySelector('.el-table__body-wrapper')
    if (tableBodyWrapper) {
      tableBodyWrapper.removeEventListener('wheel', wheelHandle)
    }
  }
})

defineExpose({
  elTableRef,
  clearSelection: () => elTableRef.value?.clearSelection(),
  toggleRowSelection: (row, selected) => elTableRef.value?.toggleRowSelection(row, selected),
  toggleAllSelection: () => elTableRef.value?.toggleAllSelection(),
  setCurrentRow: (row) => elTableRef.value?.setCurrentRow(row),
  clearSort: () => elTableRef.value?.clearSort(),
  clearFilter: (columnKey) => elTableRef.value?.clearFilter(columnKey),
  doLayout: () => elTableRef.value?.doLayout(),
  sort: (prop, order) => elTableRef.value?.sort(prop, order)
})
</script>

<style lang="scss" scoped>
#rdappTable {
  .table-container {
    &.showPagination {
      height: calc(100% - 32px);
    }
  }

  .rdappTable {
    width: 100%;
  }

  .action {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
