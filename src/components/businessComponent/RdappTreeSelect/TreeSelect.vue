<!-- 树结构下拉框 -->
<template>
  <el-select
    ref="TreeSelect"
    v-model="selectValue"
    v-bind="$attrs"
    class="TreeSelect"
    :popper-class="`${props.popperClass} TreeSelectPopper`"
    :placeholder="props.placeholder"
    clearable
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
      ref="searchInput"
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
        class="srm-tree srm-select-tree"
        icon-class="el-icon-arrow-right"
        node-key="id"
        v-bind="$attrs"
        :data="treeData"
        :props="defaultProps"
        :default-checked-keys="[props.value]"
        lazy
        :load="loadTree"
        v-on="$listeners"
        @node-click="nodeClick"
      >
        <template #default="{ data }">
          <span v-html="highlightKeyword(keyword, data.name)"></span>
        </template>
      </el-tree>
    </div>
  </el-select>
</template>

<script setup>
  import { ref, watch, onMounted, shallowRef, nextTick } from 'vue'
  import { debounce } from 'lodash-es'
  import { highlightKeyword } from '@/utils/publicMethod'

  const props = defineProps({
    value: { type: Array, default: null },
    placeholder: { type: String, default: '请选择' },
    load: { type: Function, default: () => {} },
    onSearch: { type: [Function, Object], default: null },
    defaultOptions: { type: Array, default: () => [] },
    popperClass: { type: String, default: '' },
    valueKey: { type: String, default: 'id' }
  })
  const emit = defineEmits(['input'])

  const TreeSelect = ref(null)
  const selectValue = ref('')
  const searchInput = ref(null)
  const options = ref([])
  const treeRef = ref()
  const treeKey = ref(0)
  const loading = ref(false)
  const treeData = shallowRef([])
  const defaultProps = {
    label: 'name',
    children: 'children',
    isLeaf: 'isLeaf',
    disabled: 'disabled'
  }

  watch(
    () => props.value,
    () => {
      if (!props.value) {
        selectValue.value = ''
      }
    }
  )
  watch(
    () => props.defaultOptions,
    () => {
      setDefaultValue()
    }
  )
  onMounted(() => {
    setDefaultValue()
  })
  const setDefaultValue = () => {
    const [current] = props.defaultOptions || []
    if (!current) return
    options.value = props.defaultOptions
    selectValue.value = current.value
    setTreeChecked()
  }

  const change = (value) => {
    emit('input', value ?? '')
  }

  // 搜索框相关处理
  const keyword = ref('')
  const searchKeyword = debounce(async () => {
    treeKey.value = Math.random()
  }, 300)

  // 树相关处理
  const setTreeChecked = () => {
    let timer = setTimeout(() => {
      treeRef.value?.setCurrentKey(selectValue.value)
      clearTimeout(timer)
      timer = null
    }, 300)
  }
  const loadTree = async (node, resolve) => {
    if (keyword.value) {
      loading.value = true
      const result = await props.onSearch(keyword.value)
      loading.value = false
      nextTick(() => {
        searchInput.value.focus()
      })
      resolve(result)
      return
    }
    const data = await props.load(node)
    resolve(data)

    setTreeChecked()
  }
  const nodeClick = (node) => {
    selectValue.value = node.id
    options.value = [{ label: node.name, value: node.id }]
    emit('input', node[props.valueKey], node)
    TreeSelect.value.blur()
  }

  defineExpose({ treeRef })
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .TreeSelect {
    cursor: pointer;

    .el-select__tags > span {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;

      .el-tag {
        margin: 0;
      }
    }

    .el-input {
      margin-bottom: 10px;
      height: 2.375rem !important;
    }
  }

  .TreeSelectPopper {
    .el-select-dropdown__list {
      padding: pxToRem(6) pxToRem(3);
    }

    .el-input {
      margin-bottom: pxToRem(10);
    }

    .tree-container {
      height: pxToRem(240);
      overflow: auto;

      .srm-tree {
        height: 100%;
      }
    }
  }
</style>
