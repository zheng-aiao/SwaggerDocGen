<template>
  <div
    class="selectSystemData"
    :class="[{ disabled: props.readonly }]"
    :data-placeholder="!newValue.length && '请选择数据'"
    @click="selectData"
  >
    <RdappTag
      v-for="item in newValue"
      :key="item.fileId"
      :closable="!props.readonly"
      @close="deleteData(item)"
    >
      {{ item.name }}
    </RdappTag>

    <RdappButton
      v-if="newValue.length && !props.readonly"
      class="clear"
      type="close"
      icon-btn
      @click="emit('input', [])"
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
          placeholder="文件名称"
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
        showSelection
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
  import { SYSTEM_DATA_SOURCE, fileUploadMapper } from '@/enum/constant'

  const props = defineProps({
    value: { type: [String, Array], default: () => '' },
    readonly: { type: Boolean, default: false },
    isSingle: { type: Boolean, default: true },
    title: { type: String, default: '关联文件' },
    needsStringConversion: { type: Boolean, default: false }
  })
  const emit = defineEmits(['input'])

  const newValue = ref([])
  const dialogShow = ref(false)
  const keyword = ref('')
  const tableRef = ref(null)

  const tableColumns = [
    { label: '文件名称', prop: 'name' },
    { label: '日期', prop: 'uploadTime', type: 'dateTime' },
    { label: '上传人', prop: 'userName' }
  ]

  onMounted(() => {
    if (props.value) getValueData()
  })

  watch(
    () => props.value,
    () => {
      getValueData()
    },
    { immediate: false }
  )

  const selectData = async () => {
    if (props.readonly) return
    pageIndex.value = 1
    dialogShow.value = true

    const promiseList = []
    promiseList.push(getTableData)
    Promise.all(promiseList.map((promise) => promise())).then((res) => {
      nextTick(() => {
        tabletSelection.value = newValue.value
        toggleRowSelection(tableRef.value?.elTableRef, 'fileId')
      })
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

    const { hasError, records } = await service.fssBiz.batchSearchFiles({
      ids: ids
    })
    if (hasError) {
      Message.error('获取文件信息失败')
      return
    }
    newValue.value = records
  }
  const getTableList = async (params) => {
    const { pageIndex, pageSize } = params

    const sendParams = {
      page: pageIndex,
      per_page: pageSize,
      storageKind: 2,
      keyword: keyword.value,
      directoryId: fileUploadMapper.LAY_REGULATION
    }
    const { records = [], totalCount, ...rest } = await service.fssBiz.getFiles(sendParams)
    toggleRowSelection(tableRef.value?.elTableRef, 'fileId')
    return { records: records, totalCount: totalCount, ...rest }
  }

  const deleteData = (data) => {
    let ids = []
    if (props.value && Array.isArray(props.value)) {
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
  }
  const confirm = () => {
    emit(
      'input',
      props.isSingle
        ? tabletSelection.value[0]?.fileId || ''
        : props.needsStringConversion
          ? tabletSelection.value.map((e) => e.fileId).join(',')
          : tabletSelection.value.map((e) => e.fileId)
    )
    emit('select', tabletSelection.value)
    dialogShow.value = false
  }
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
