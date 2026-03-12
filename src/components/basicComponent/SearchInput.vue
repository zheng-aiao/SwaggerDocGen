<template>
  <div class="search-input-wrapper">
    <el-input
      v-model="localValue"
      :placeholder="placeholder || '搜索...'"
      :clearable="clearable"
      class="search-input"
      @input="handleInput"
      @clear="handleClear"
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '搜索...'
  },
  clearable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'clear'])

const localValue = ref(props.modelValue)

// 监听props变化，更新本地值
watch(() => props.modelValue, (newVal) => {
  localValue.value = newVal
})

// 监听本地值变化，触发更新事件
watch(localValue, (newVal) => {
  emit('update:modelValue', newVal)
  emit('input', newVal)
})

const handleInput = (value) => {
  emit('input', value)
}

const handleClear = () => {
  emit('clear')
}
</script>

<style scoped lang="scss">
.search-input-wrapper {
  width: 320px;

  .search-input {
    height: 36px;

    :deep(.el-input__wrapper) {
      background-color: #f8fafc;
      border: none;
      border-radius: 8px;
      box-shadow: none;
      padding: 9px 16px 8px 40px;

      &:hover,
      &.is-focus {
        background-color: #f8fafc;
        box-shadow: none;
      }

      .el-input__inner {
        font-size: 14px;
        font-weight: 400;
        color: #6b7280;
        background-color: transparent;
        border: none;
      }

      .el-input__icon {
        color: #94a3b8;
        font-size: 15px;
        left: 12px;
      }
    }
  }
}
</style>