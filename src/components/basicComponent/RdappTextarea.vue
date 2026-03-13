<template>
  <div class="rdapp-textarea-wrapper">
    <el-input
      v-model="modelValue"
      type="textarea"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :maxlength="maxlength"
      :show-word-limit="showWordLimit"
      :resize="resize"
      class="rdapp-textarea"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入内容'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 4
  },
  maxlength: {
    type: Number,
    default: undefined
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  resize: {
    type: String,
    default: 'none'
  }
})

const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleInput = (val) => {
  emit('input', val)
}

const handleFocus = (event) => {
  emit('focus', event)
}

const handleBlur = (event) => {
  emit('blur', event)
}
</script>

<style scoped lang="scss">
.rdapp-textarea-wrapper {
  width: 100%;

  .rdapp-textarea {
    :deep(.el-textarea__inner) {
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      font-size: 14px;
      color: #1f2937;
      padding: 12px 16px;
      line-height: 1.5;
      transition: all 0.2s;

      &::placeholder {
        color: #9ca3af;
      }

      &:hover {
        border-color: #cbd5e1;
      }

      &:focus {
        border-color: #0f78f0;
        box-shadow: 0 0 0 2px rgba(15, 120, 240, 0.1);
      }
    }

    :deep(.el-input__count) {
      color: #9ca3af;
      font-size: 12px;
      background: transparent;
    }
  }
}
</style>
