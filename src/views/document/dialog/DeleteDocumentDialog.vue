<template>
  <RdappDialog
    v-model="visible"
    :title="null"
    width="520px"
    :show-footer="true"
    custom-class="delete-document-dialog"
    @close="handleClose"
  >
    <template #header>
      <div class="modal-header">
        <span class="header-title">删除文档</span>
      </div>
    </template>

    <div class="modal-body">
      <div class="warning-icon">
        <el-icon :size="20"><Warning /></el-icon>
      </div>
      <div class="content-wrapper">
        <h4 class="warning-title">确认删除 {{ documentName }} ?</h4>
        <p class="warning-desc">删除后，该文档将被永久移除，此操作不可撤销。</p>
      </div>
    </div>

    <template #footer>
      <div class="modal-footer">
        <el-button class="cancel-btn" @click="handleCancel"> 取消 </el-button>
        <el-button class="confirm-btn" @click="handleConfirm">
          确认删除
        </el-button>
      </div>
    </template>
  </RdappDialog>
</template>

<script setup>
import { computed } from "vue";
import { Warning } from "@element-plus/icons-vue";
import RdappDialog from "@/components/basicComponent/RdappDialog.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  documentName: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const handleClose = () => {
  visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
  emit("cancel");
};

const handleConfirm = () => {
  emit("confirm");
  visible.value = false;
};
</script>

<style scoped lang="scss">
.delete-document-dialog {
  :deep(.el-dialog) {
    border-radius: 8px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.04), 0 20px 25px rgba(0, 0, 0, 0.1);
  }

  :deep(.el-dialog__header) {
    padding: 0;
    border-bottom: 1px solid #f3f4f6;
  }

  :deep(.el-dialog__body) {
    padding: 32px;
  }

  :deep(.el-dialog__footer) {
    padding: 0;
    background: #f9fafb;
    border-radius: 0 0 8px 8px;
  }
}

.modal-header {
  padding: 16px 24px;
  display: flex;
  align-items: center;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  line-height: 24px;
}

.modal-body {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.warning-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: #fff7ed;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f97316;
}

.content-wrapper {
  flex: 1;
  min-width: 0;
}

.warning-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  line-height: 24px;
}

.warning-desc {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 22.75px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
}

.cancel-btn {
  min-width: 78px;
  height: 38px;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;

  &:hover {
    color: #374151;
    background: #f9fafb;
    border-color: #9ca3af;
  }
}

.confirm-btn {
  min-width: 104px;
  height: 38px;
  padding: 9px 24px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background: #ef4444;
  border: none;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #dc2626;
  }
}
</style>
