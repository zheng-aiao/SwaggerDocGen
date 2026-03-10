<template>
  <div class="item">
    <span v-if="title" class="label">{{ title }}</span>
    <el-select
      popper-class="RdappSelect"
      :value="props.value"
      v-bind="$attrs"
      :clearable="props.clearable"
      :popper-append-to-body="false"
      filterable
      :multiple="props.multiple"
      :collapse-tags="props.multiple"
      @change="onInput"
    >
      <!-- 确保下拉框能正确显示 -->
      <div class="tree-container">
        <el-option
          v-for="item in selfOptions"
          :key="item[props.valueKey]"
          :label="item[props.labelKey]"
          :value="item[props.valueKey]"
        >
          <RdappTag v-if="item[props.listClass] && itemLabelStyle" :class="item[props.listClass]">
            {{ item[props.labelKey] }}
          </RdappTag>
          <span v-else>{{ item[props.labelKey] }}</span>
        </el-option>
      </div>
    </el-select>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { highlightKeyword } from '@/utils/publicMethod'
  import RdappTag from '@/components/basicComponent/RdappTag.vue'
  import { useStore } from '@/hooks'
  import { getDictDataByType } from '@/utils/publicMethod'

  const store = useStore()
  const emit = defineEmits(['input'])
  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Array, Number],
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: null
    },
    beforeOptions: {
      type: Array,
      default: null
    },
    dictKey: {
      type: String,
      default: ''
    },
    valueKey: {
      type: String,
      default: 'dictValue'
    },
    labelKey: {
      type: String,
      default: 'dictLabel'
    },
    listClass: {
      type: String,
      default: 'listClass'
    },
    itemLabelStyle: {
      type: Boolean,
      default: false
    },
    /** 为 true 时，获取到字典/选项后若当前值为空，则默认选中第一项 */
    defaultFirst: {
      type: Boolean,
      default: false
    }
  })

  const selfOptions = ref([])

  const onInput = (value) => {
    emit('input', value ?? '')
  }

  const initOptions = async () => {
    selfOptions.value = []
    // 优先处理 beforeOptions
    if (props.beforeOptions) {
      selfOptions.value = window.structuredClone(props.beforeOptions)
    }

    // 处理 options
    if (props.options) {
      selfOptions.value.push(...props.options)
      tryDefaultFirst()
      return
    }
    // 处理 dictKey
    if (props.dictKey) {
      let data = []
      data = await getDictDataByType(props.dictKey)

      selfOptions.value = data.map((e) => ({
        ...e,
        [props.labelKey]: e[props.labelKey],
        [props.valueKey]: e[props.valueKey]
      }))
    }
    emit('loaded', selfOptions.value)
    tryDefaultFirst()
  }

  const tryDefaultFirst = () => {
    const isEmpty =
      props.value === '' ||
      props.value == null ||
      (Array.isArray(props.value) && props.value.length === 0)
    if (props.defaultFirst && isEmpty && selfOptions.value.length > 0) {
      const first = selfOptions.value[0][props.valueKey]
      emit('input', props.multiple ? [first] : first)
    }
  }

  initOptions()

  watch(
    () => props.options,
    () => {
      initOptions()
    },
    { immediate: true, deep: true }
  )

  watch(
    () => props.dictKey,
    () => {
      initOptions()
    },
    { immediate: false }
  )
</script>

<style lang="scss" scoped>
  .RdappSelect {
    .list-container {
      max-height: 240px;
      overflow: auto;
    }
  }
</style>
