<template>
  <RdappTag v-if="dictDataObj?.listClass" :class="dictDataObj.listClass">
    {{ dictDataObj.dictLabel }}
  </RdappTag>
  <span v-else-if="dictDataObj">
    {{ dictDataObj.dictLabel || dictDataObj.name }}
  </span>
  <span v-else class="status-unknown">
    {{ dictValue }}
  </span>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from '@/hooks'
  import { getDictDataByType } from '@/utils/publicMethod'

  const store = useStore()
  const props = defineProps({
    dictValue: {
      type: [String, Number, Boolean],
      required: true
    },
    dictType: {
      type: String,
      default: 'dict'
    },
    dictKey: {
      type: String,
      default: ''
    },
    dictDataArr: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String,
      default: 'dictValue'
    }
  })

  const selfDictData = ref([])
  const initDictData = async () => {
    if (props.dictDataArr && props.dictDataArr.length) {
      selfDictData.value = props.dictDataArr
      return
    }
    if (props.dictKey) {
      selfDictData.value = await getDictDataByType(props.dictKey, props.dictType)
      return
    }
    return []
  }

  onMounted(async () => {
    await initDictData()
  })

  /** 在树形数据中递归查找匹配项 */
  const findInTree = (list, predicate, childrenKey = 'children') => {
    if (!list?.length) return undefined
    for (const item of list) {
      if (predicate(item)) return item
      const children = item[childrenKey]
      if (children?.length) {
        const found = findInTree(children, predicate, childrenKey)
        if (found) return found
      }
    }
    return undefined
  }

  const dictDataObj = computed(() => {
    return findInTree(selfDictData.value, (item) => {
      return item[props.valueKey] === props.dictValue
    })
  })
</script>
<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;
</style>
