<!-- [非懒加载] 普通字典下拉选择, 不带多选框, 用于搜索栏等等 -->
<template>
  <el-select
    v-bind="$attrs"
    ref="NormalDictionaryElSelect"
    v-model="selectValue"
    class="NormalDictionaryElSelect"
    popper-class="NormalDictionary"
    :popper-append-to-body="false"
    :placeholder="props.placeholder"
    clearable
    v-on="$listeners"
    @change="change"
  >
    <!-- 确保下拉框能正确显示 -->
    <el-option v-show="false" value="1" label="1"></el-option>
    <!-- 与树的选择进行联动 -->
    <el-option
      v-for="item in options"
      v-show="false"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
    <el-input
      v-model="keyword"
      maxlength="100"
      placeholder="搜索名称"
      clearable
      prefix-icon="el-icon-search"
      :disabled="loading"
      @input="searchKeyword"
    >
    </el-input>
    <div class="tree-container">
      <el-tree
        ref="treeRef"
        :key="treeKey"
        v-loading="loading"
        v-bind="$attrs"
        :data="treeData"
        class="srm-tree srm-select-tree"
        icon-class="el-icon-arrow-right"
        :node-key="valueKey"
        :props="defaultProps"
        :filter-node-method="filterTree"
        :default-checked-keys="[props.value]"
        v-on="$listeners"
        @node-click="nodeClick"
      >
        <template #default="{ data }">
          <span v-html="highlightKeyword(keyword, data[labelKey])"></span>
        </template>
      </el-tree>
    </div>
  </el-select>
</template>

<script setup>
  import { ref, nextTick, watch, shallowRef, watchEffect } from 'vue'
  import { debounce } from 'lodash-es'
  import { highlightKeyword } from '@/utils/publicMethod'
  import { getDictDataByType } from '@/utils/publicMethod'

  const selectValue = ref('')

  const props = defineProps({
    value: { type: String, default: '' },
    dictKey: { type: String, default: '' }, // 字典key
    valueKey: { type: String, default: 'id' },
    labelKey: { type: String, default: 'name' },
    placeholder: { type: String, default: '请选择' },
    defaultData: { type: Array, default: () => [] }, // 默认传入数据
    includeIds: { type: Array, default: () => [] }, // 需要显示的节点ID集合
    showParentNodes: { type: Boolean, default: false }, // 配合显示节点集合是否显示父节点
    onlySon: { type: Boolean, default: false } // 只选中子节点
  })

  const defaultProps = {
    label: 'name',
    children: 'children',
    isLeaf: 'isLeaf',
    disabled: 'disabled'
  }

  const emit = defineEmits(['input'])
  // 只监听一次即可
  const unwatch = watch(
    () => props.value,
    () => {
      setDefaultValue()
      unwatch()
    }
  )

  // 更新KEY取消选中状态
  watch(
    () => selectValue.value,
    (condition) => {
      if (!condition) {
        treeKey.value = Date.now()
      }
    }
  )

  const treeRef = ref()
  const treeKey = ref(0)
  const loading = ref(false)

  // select⬇️
  const options = ref([])
  // 只有清空操作才会触发
  const change = (value) => {
    emit('input', value ?? '')
  }
  const setDefaultValue = () => {
    if (!props.value) return
    const node = treeRef.value?.getNode(props.value)
    if (!node) {
      nextTick(() => {
        document.querySelector('.NormalDictionaryElSelect .el-input__inner').value = props.value
      })
      return
    }
    options.value = [{ label: node?.data?.[props.labelKey], value: node?.data?.id || props.value }]
    selectValue.value = node?.data?.id || props.value
    treeRef.value.setCheckedKeys([node?.data?.id || props.value])
  }

  // tree
  const groupName = 'CancelRequest'
  const treeData = shallowRef([])

  watchEffect(() => {
    if (!props.value) selectValue.value = ''
  })

  // 递归过滤树形数据（确保子节点能单独显示）
  const filterTreeByIds = (nodes, includeIds, valueKey, showParent) => {
    let result = []
    for (const node of nodes) {
      // 1. 先递归处理子节点
      const filteredChildren = node.children
        ? filterTreeByIds(node.children, includeIds, valueKey, showParent)
        : []

      // 2. 检查当前节点是否在目标集合中
      const isCurrentIncluded = includeIds.includes(node[valueKey])

      // 3. 处理逻辑分两种情况：
      if (showParent) {
        // 情况1：显示父节点时，保留当前节点（如果自身符合或有符合的子节点）
        if (isCurrentIncluded || filteredChildren.length > 0) {
          result.push({
            ...node,
            children: filteredChildren
          })
        }
      } else {
        // 情况2：不显示父节点时
        // a. 如果当前节点符合条件，直接保留（子节点也需过滤）
        if (isCurrentIncluded) {
          result.push({
            ...node,
            children: filteredChildren // 子节点仅保留符合条件的
          })
        }
        // b. 即使当前节点不符合条件，也要把过滤后的子节点加进来（确保子节点能单独显示）
        if (filteredChildren.length > 0) {
          result.push(...filteredChildren)
        }
      }
    }
    return result
  }

  // 按includeIds的顺序排序节点（递归处理子节点）
  const sortByIncludeIds = (nodes, includeIds, valueKey) => {
    // 记录节点原始顺序（用于不在includeIds中的节点，保持相对顺序）
    const originalIndexMap = new Map(nodes.map((node, index) => [node[valueKey], index]))

    // 排序规则：
    // 1. 优先按节点ID在includeIds中的索引排序（索引越小越靠前）
    // 2. 不在includeIds中的节点，按原始顺序排列（放在后面）
    const sorted = [...nodes].sort((a, b) => {
      const indexA = includeIds.indexOf(a[valueKey])
      const indexB = includeIds.indexOf(b[valueKey])
      // 都在includeIds中：按索引比较
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB
      }
      // 只有一个在includeIds中：在的排在前面
      if (indexA !== -1) return -1
      if (indexB !== -1) return 1
      // 都不在：按原始顺序比较
      return originalIndexMap.get(a[valueKey]) - originalIndexMap.get(b[valueKey])
    })

    // 递归排序子节点
    return sorted.map((node) => ({
      ...node,
      children: node.children ? sortByIncludeIds(node.children, includeIds, valueKey) : []
    }))
  }

  const getTreeData = async () => {
    let rawData = []
    // 获取原始数据（优先使用defaultData，否则接口请求）
    if (props.defaultData.length) {
      rawData = props.defaultData
    } else if (props.dictKey) {
      rawData = await getDictDataByType(props.dictKey, 'resource')
    }
    options.value = rawData.length
      ? { label: rawData[0][props.labelKey], value: rawData[0][props.valueKey] }
      : []
    // 如果有需要过滤的ID集合，执行过滤
    const filteredData =
      props.includeIds.length > 0
        ? filterTreeByIds(rawData, props.includeIds, props.valueKey, props.showParentNodes)
        : rawData

    // 2. 按includeIds的顺序排序（如果有配置）
    const sortedData =
      props.includeIds.length > 0
        ? sortByIncludeIds(filteredData, props.includeIds, props.valueKey)
        : filteredData

    treeData.value = sortedData
    nextTick(() => setDefaultValue())
  }

  // defaultData变更时，重新构建树数据
  watch(
    () => props.defaultData,
    () => {
      getTreeData()
    },
    { deep: true }
  )
  getTreeData()
  const NormalDictionaryElSelect = ref(null)
  const nodeClick = (node) => {
    if (props.onlySon && node.children && node.children.length > 0) {
      return
    }
    selectValue.value = node.id
    options.value = [{ label: node[props.labelKey], value: node.id }]
    emit('input', node[props.valueKey], node)
    NormalDictionaryElSelect.value.blur()
  }

  const keyword = ref('')
  const searchKeyword = debounce(async () => {
    treeRef.value.filter(keyword.value)
  }, 300)
  const reset = () => {
    selectValue.value = ''
  }
  const filterTree = (value, data) => {
    if (!value) return true
    return data[props.labelKey].indexOf(value) !== -1
  }

  defineExpose({ treeRef, reset })
</script>

<style lang="scss">
  .NormalDictionary {
    .el-input {
      margin-bottom: 10px;
      height: 2.375rem !important;
    }

    .tree-container {
      height: 240px;
      overflow: auto;

      .srm-tree {
        height: 100%;
      }
    }
  }
</style>
