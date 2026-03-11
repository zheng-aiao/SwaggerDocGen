<template>
  <div
    v-show="!props.isDialog"
    class="selectSystemData"
    :class="[{ disabled: props.readonly }]"
    :data-placeholder="!newValue.length && '请选择数据'"
    @click="selectData"
  >
    <RdappTag
      v-for="item in newValue"
      :key="item[props.bindKey]"
      :closable="!props.readonly && !isClosable"
      @close="deleteData(item)"
    >
      {{ transferPropValue(item) }}
    </RdappTag>

    <RdappButton
      v-if="newValue.length && !props.readonly"
      class="clear"
      type="close"
      icon-btn
      @click="
        (emit('input', props.needsStringConversion ? '' : []),
        emit('select', props.needsStringConversion ? '' : []))
      "
    ></RdappButton>

    <RdappDialog
      v-model="dialogShow"
      content-class="selectSystemDataDialog"
      :title="props.title"
      tableDialog
      appendToBody
      @hide="hideModel"
      @confirm="confirm"
    >
      <div class="search-bar">
        <el-input
          v-model="keyword"
          :placeholder="getSearch"
          clearable
          prefixIcon="el-icon-search"
          @input="search"
        >
        </el-input>

        <RdappButton :disabled="!keyword" second type="reset" @click="reset"></RdappButton>
      </div>

      <RdappTable
        ref="tableRef"
        v-loading="tableLoading"
        :showSelection="props.showSelection"
        class="pageTable"
        highlightCurrentRow
        :data="tableData"
        :tableColumns="tableColumns"
        :pageIndex="pageIndex"
        :pageSize="pageSize"
        :totalCount="totalCount"
        @currentChange="pageChange"
        @sizeChange="sizeChange"
        @selectChangeMultiple="
          (value, row) => selectMultiple(row, { isSingle, ref: tableRef.elTableRef })
        "
      >
      </RdappTable>
    </RdappDialog>
  </div>
</template>

<script setup>
  import service from 'src/service'
  import { ref, computed, onMounted, watch, nextTick } from 'vue'
  import { debounce } from 'lodash-es'
  import { Message } from 'element-ui'
  import { useTable } from '@/hooks'
  import { SYSTEM_DATA_SOURCE } from '@/enum/constant'

  const props = defineProps({
    value: { type: [String, Array], default: () => '' },
    readonly: { type: Boolean, default: false },
    isSingle: { type: Boolean, default: true },
    isDialog: { type: Boolean, default: false },
    isClosable: { type: Boolean, default: false },

    title: { type: String, default: '选择数据' },
    tableColumns: { type: Array, default: () => [] },
    source: { type: String, default: 'areaManage' },
    order: { type: String, default: 'createTime desc' },
    andCondition: { type: Array, default: () => [] },
    orCondition: { type: Array, default: () => [] },
    bindKey: { type: String, default: 'id' },
    labelKey: { type: String, default: 'name' },
    needsStringConversion: { type: Boolean, default: false },
    rowFormat: { type: Function, default: null },
    showSelection: { type: Boolean, default: true },
    extraParameter: { type: Object, default: () => {} } // 额外参数
  })
  const emit = defineEmits(['input'])

  const newValue = ref([])
  const dialogShow = ref(false)
  const getSearch = computed(() => {
    let searchPla = ''
    for (let i = 0; i < tableColumns.value.length; i++) {
      if (tableColumns.value[i].search || i === 0) {
        searchPla += tableColumns.value[i].label + '、'
      }
    }
    searchPla = searchPla.slice(0, -1)
    return searchPla
  })
  const keyword = ref('')
  const tableRef = ref(null)
  const tableColumns = computed(() => SYSTEM_DATA_SOURCE[props.source].tableColumns)

  onMounted(() => {
    if (props.value && !props.isDialog) getValueData()
  })

  watch(
    () => props.value,
    () => {
      if (!props.isDialog) getValueData()
    },
    { immediate: false }
  )

  const selectData = async () => {
    if (props.readonly) return
    pageIndex.value = 1
    dialogShow.value = true

    const promiseList = []
    promiseList.push(getTableData)
    if (props.isDialog) promiseList.push(getValueData)
    Promise.all(promiseList.map((promise) => promise())).then((res) => {
      nextTick(() => {
        tabletSelection.value = newValue.value
        toggleRowSelection(tableRef.value?.elTableRef, props.bindKey)
      })
    })
  }
  // 解决切换源和打开弹窗同时进行，导致请求数据错误问题
  const openDialog = () => {
    nextTick(() => {
      selectData()
    })
  }

  const search = debounce(() => {
    pageIndex.value = 1
    getTableData()
  }, 300)

  const reset = () => {
    keyword.value = ''
    pageIndex.value = 1
    getTableData()
  }

  const getValue = (key, item) => {
    if (!key) return '--'
    return key.split('.').reduce((prev, current) => prev[current] ?? '', item)
  }

  const transferPropValue = (item) => {
    let rowValue = props.labelKey.includes('.')
      ? getValue(props.labelKey, item)
      : item[props.labelKey]
    return [null, undefined, ''].includes(rowValue) ? '--' : rowValue
  }

  const {
    tableLoading,
    tableData,
    totalCount,
    pageIndex,
    pageSize,
    getTableData,
    pageChange,
    sizeChange,
    selectMultiple, // 选择事件
    toggleRowSelection, // 回显事件
    tabletSelection // 选中数据
  } = useTable((...rest) => getTableList(...rest), {
    errMsg: '查询列表失败',
    immediate: false
  })

  const getValueData = async () => {
    const ids = props.value
      ? Array.isArray(props.value)
        ? props.value
        : typeof props.value === 'string'
          ? props.value.split(',')
          : [props.value]
      : []
    if (!ids.length) {
      newValue.value = []
      return
    }
    const query = {
      pageNum: 1,
      pageSize: ids.length,
      andCondition: [
        {
          type: 11,
          key: props.bindKey || 'id',
          value: ids
        }
      ]
    }
    const data = await service[SYSTEM_DATA_SOURCE[props.source].service][
      SYSTEM_DATA_SOURCE[props.source].urlName
    ]({ query: JSON.stringify(query), ...props.extraParameter })
    newValue.value = data.list
  }
  const getTableList = async (params) => {
    const { pageIndex, pageSize } = params

    const query = {
      pageNum: pageIndex,
      pageSize: pageSize,
      order: props.order,
      andCondition: [...props.andCondition],
      orCondition: [...props.orCondition]
    }
    if (keyword.value) {
      const searchList = []
      for (let i = 0; i < tableColumns.value.length; i++) {
        if (tableColumns.value[i].search || i === 0) {
          searchList.push({
            type: 2,
            key: tableColumns.value[i].prop,
            value: keyword.value
          })
        }
      }
      query.orCondition.push(...searchList)
    }
    const data = await service[SYSTEM_DATA_SOURCE[props.source].service][
      SYSTEM_DATA_SOURCE[props.source].urlName
    ]({ query: JSON.stringify(query), ...props.extraParameter })
    toggleRowSelection(tableRef.value?.elTableRef, props.bindKey)
    return {
      records: props.rowFormat ? data.list.map(props.rowFormat) : data.list,
      totalCount: data.total,
      ...data
    }
  }

  const deleteData = (data) => {
    let ids = props.value ? props.value : []
    if (!Array.isArray(props.value)) {
      ids = props.value.split(',')
    }
    const index = ids.findIndex((item) => item === data[props.bindKey])
    const result = [...ids]
    const arr = toSpliced(result, index, 1)
    emit('input', props.needsStringConversion ? arr.join(',') : arr)
  }
  const toSpliced = (array, start, deleteCount, ...items) => {
    return [...array.slice(0, start), ...items, ...array.slice(start + deleteCount)]
  }

  const hideModel = () => {
    dialogShow.value = false
    emit('update:showPopup', false)
  }
  const confirm = () => {
    emit(
      'input',
      props.isSingle
        ? tabletSelection.value[0]?.[props.bindKey] || ''
        : props.needsStringConversion
          ? tabletSelection.value.map((e) => e[props.bindKey]).join(',')
          : tabletSelection.value.map((e) => e[props.bindKey])
    )
    emit('select', tabletSelection.value)
    emit('change')
    hideModel()
  }

  defineExpose({
    openDialog
  })
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;
  .selectSystemData {
    position: relative;
    border-radius: 8px;
    background: rgba(var(--color), 0.1);
    border: 1px solid rgba(var(--color), 0.2);
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 5px 15px;
    flex: 1;
    min-height: 38px;
    max-height: 80px;
    height: fit-content;
    overflow-y: auto;
    cursor: pointer;
    line-height: 1;

    @include lightTheme {
      background: rgba(var(--color), 0.1);
      border: 1px solid rgba(var(--color), 0.3);
    }

    @include darkTheme {
      background: rgba(var(--color), 0.2);
      border: 1px solid rgba(var(--color), 0.2);
    }

    @include before {
      content: attr(data-placeholder);
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--textColor-2);
    }

    &.disabled {
      border: 1px solid rgba(var(--color), 0.1);
      background-color: rgba(var(--color), 0.1);
      cursor: not-allowed;
    }

    .clear {
      position: absolute;
      right: 15px;
      top: 10px;

      @include hover {
        @include baseTransition;
        color: var(--textColor-2);
      }
    }

    .el-tag {
      padding: 0.1rem 0.75rem;
    }
  }

  .selectSystemDataDialog {
    @include wh;

    .el-input__suffix {
      > .el-icon-circle-close {
        display: none;
      }
    }

    #rdappTable {
      .el-table__header-wrapper .el-checkbox {
        display: none;
      }
    }
  }
</style>
