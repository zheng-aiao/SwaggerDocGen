<template>
  <div ref="optionGroupRef" class="rdapp-option-group" :class="{ groupBg: props.isShowBg }">
    <el-radio-group
      v-if="type === 'radio'"
      v-model="selfValue"
      v-bind="$attrs"
      :class="{ inline: props.inline }"
    >
      <el-radio v-for="item in selfOptions" :key="item.value" :label="item.value">
        {{ item.label }}
      </el-radio>
    </el-radio-group>
    <el-checkbox-group
      v-if="type === 'checkbox'"
      v-model="selfValue"
      v-bind="$attrs"
      :class="{ inline: props.inline }"
    >
      <el-checkbox v-for="item in selfOptions" :key="item.value" :label="item.value">
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script setup>
  import service from '@/service'
  import { ref, onMounted, watch } from 'vue'
  import { useStore } from '@/hooks'
  import { getDictDataByType } from '@/utils/publicMethod'

  const store = useStore()
  const props = defineProps({
    value: {
      type: [Array, String, Number],
      default: null
    },
    type: {
      type: String,
      default: 'radio' // 'radio/checkbox'
    },
    dictKey: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: null
    },
    valueKey: {
      type: String,
      default: 'dictValue'
    },
    labelKey: {
      type: String,
      default: 'dictLabel'
    },
    inline: {
      type: Boolean,
      default: false
    },
    isShowBg: {
      type: Boolean,
      default: true
    },
    isMust: {
      type: Boolean,
      default: true
    }
  })
  const emit = defineEmits(['input'])

  const selfValue = ref([])
  const selfOptions = ref([])

  onMounted(async () => {
    await initOptions()
    if (props.value === null || props.value === undefined) {
      if (props.type === 'radio' && props.isMust) {
        selfValue.value = selfOptions.value.length ? selfOptions.value[0].value : ''
      } else if (props.type === 'checkbox') {
        selfValue.value = []
      }
    }
  })
  watch(
    () => props.value,
    (newVal) => {
      selfValue.value = newVal
    },
    { immediate: true }
  )

  watch(
    () => selfValue.value,
    (newVal) => {
      emit('input', newVal)
    }
  )

  const initOptions = async () => {
    selfOptions.value = []

    // 处理 options
    if (props.options) {
      selfOptions.value = props.options
      return
    }

    // 处理 dictKey
    if (props.dictKey) {
      let data = []
      data = await getDictDataByType(props.dictKey)
      selfOptions.value = data.map((e) => ({
        label: e[props.labelKey],
        value: e[props.valueKey]
      }))
    }
  }
</script>
<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .rdapp-option-group {
    @include flexCenter(start);
    width: 100%;
    height: 100%;
    min-height: pxToRem(38);
    border-radius: 8px;
    padding: 0 pxToRem(15);

    .el-radio-group {
      > .el-radio {
        display: block;
      }
    }

    .el-checkbox-group {
      > .el-checkbox {
        display: block;
      }
    }

    .inline {
      > .el-radio {
        display: inline-block;
        .el-radio__label {
          word-wrap: break-word; /* 旧版标准：长单词换行 */
          word-break: break-all; /* 强制任意字符间换行（包括中文） */
          white-space: normal; /* 覆盖默认的nowrap行为 */
        }
      }
      > .el-checkbox {
        display: inline-block;
        .el-checkbox__label {
          word-wrap: break-word; /* 旧版标准：长单词换行 */
          word-break: break-all; /* 强制任意字符间换行（包括中文） */
          white-space: normal; /* 覆盖默认的nowrap行为 */
        }
      }
    }
  }

  .groupBg {
    background: rgba(var(--color), 0.1);
    border: 1px solid rgba(var(--color), 0.2);

    @include lightTheme {
      background: rgba(var(--color), 0.1);
      border: 1px solid rgba(var(--color), 0.3);
    }
  }
</style>
