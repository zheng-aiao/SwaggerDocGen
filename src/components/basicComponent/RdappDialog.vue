<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :custom-class="customClass"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :destroy-on-close="destroyOnClose"
    :align-center="alignCenter"
    class="rdapp-dialog"
    @close="handleClose"
    @open="handleOpen"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    
    <slot />
    
    <template v-if="showFooter" #footer>
      <slot name="footer">
        <div class="dialog-footer">
          <el-button class="cancel-btn" @click="handleCancel">
            {{ cancelText }}
          </el-button>
          <el-button class="confirm-btn" type="primary" @click="handleConfirm">
            {{ confirmText }}
          </el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: '520px'
  },
  customClass: {
    type: String,
    default: ''
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  destroyOnClose: {
    type: Boolean,
    default: true
  },
  alignCenter: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '确定'
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'open', 'cancel', 'confirm'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleClose = () => {
  emit('close')
}

const handleOpen = () => {
  emit('open')
}

const handleCancel = () => {
  visible.value = false
  emit('cancel')
}

const handleConfirm = () => {
  emit('confirm')
}
</script>

<style scoped lang="scss">
.rdapp-dialog {
  :deep(.el-dialog) {
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }

  :deep(.el-dialog__header) {
    padding: 20px 24px;
    border-bottom: 1px solid #f1f5f9;
    margin-right: 0;

    .el-dialog__title {
      font-size: 18px;
      font-weight: 600;
      color: #0f172a;
    }

    .el-dialog__headerbtn {
      top: 20px;
      right: 20px;
      width: 32px;
      height: 32px;
      background: #f1f5f9;
      border-radius: 8px;
      transition: all 0.2s;

      &:hover {
        background: #e2e8f0;
      }

      .el-dialog__close {
        color: #64748b;
        font-size: 16px;
      }
    }
  }

  :deep(.el-dialog__body) {
    padding: 24px;
  }

  :deep(.el-dialog__footer) {
    padding: 16px 24px;
    border-top: 1px solid #f1f5f9;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  .cancel-btn {
    min-width: 88px;
    height: 40px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    background: #f1f5f9;
    border: none;
    color: #64748b;

    &:hover {
      background: #e2e8f0;
      color: #475569;
    }
  }

  .confirm-btn {
    min-width: 88px;
    height: 40px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    background: #0f78f0;
    border: none;

    &:hover {
      background: #0d6ad9;
    }
  }
}
</style>
