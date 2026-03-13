<template>
  <el-button
    :type="buttonType"
    :class="['rdapp-btn', `rdapp-btn--${type}`]"
    v-bind="$attrs"
    @click="handleClick"
  >
    <el-icon v-if="icon && showIcon">
      <component :is="icon" />
    </el-icon>
    <slot>{{ text }}</slot>
  </el-button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'create', 'default', 'danger', 'success', 'warning'].includes(value)
  },
  text: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  showIcon: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['click'])

const buttonType = computed(() => {
  const typeMap = {
    primary: 'primary',
    create: 'primary',
    danger: 'danger',
    success: 'success',
    warning: 'warning',
    default: 'default'
  }
  return typeMap[props.type] || 'primary'
})

const handleClick = (e) => {
  emit('click', e)
}
</script>

<style scoped lang="scss">
.rdapp-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  .el-icon {
    font-size: 14px;
  }

  &--primary {
    background: #0f78f0;
    color: #ffffff;

    &:hover {
      background: #0066cc;
    }

    &:active {
      background: #0055aa;
    }
  }

  &--create {
    background: #0f78f0;
    color: #ffffff;
    font-weight: 700;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    &:hover {
      background: #0d6efd;
    }

    &:active {
      background: #0a58ca;
    }
  }

  &--default {
    background: #ffffff;
    color: #64748b;
    border: 1px solid #e2e8f0;

    &:hover {
      color: #0f78f0;
      border-color: #0f78f0;
      background: #f0f7ff;
    }
  }

  &--danger {
    background: #ef4444;
    color: #ffffff;

    &:hover {
      background: #dc2626;
    }
  }

  &--success {
    background: #22c55e;
    color: #ffffff;

    &:hover {
      background: #16a34a;
    }
  }

  &--warning {
    background: #f59e0b;
    color: #ffffff;

    &:hover {
      background: #d97706;
    }
  }
}
</style>
