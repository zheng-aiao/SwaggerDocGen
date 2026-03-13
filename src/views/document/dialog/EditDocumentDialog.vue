<template>
  <RdappDialog
    v-model="visible"
    title="编辑文档"
    width="520px"
    :show-footer="true"
    @close="handleClose"
  >
    <div class="edit-content">
      <!-- 文档名称 -->
      <div class="form-item">
        <div class="form-label">
          <span class="required">*</span>
          <span>文档名称</span>
        </div>
        <el-input
          v-model="formData.name"
          placeholder="请输入文档名称"
          maxlength="30"
          show-word-limit
          class="form-input"
        />
      </div>

      <!-- 版本号 -->
      <div class="form-item">
        <div class="form-label">
          <span class="required">*</span>
          <span>版本号</span>
        </div>
        <el-input
          v-model="formData.version"
          placeholder="例如: v2.0.1"
          maxlength="10"
          class="form-input"
        />
      </div>

      <!-- 发布说明 -->
      <div class="form-item">
        <div class="form-label">
          <span>发布说明</span>
        </div>
        <div class="custom-textarea">
          <textarea
            v-model="formData.description"
            placeholder="请输入本次修改的发布说明..."
            maxlength="200"
            rows="4"
          ></textarea>
          <div class="char-count">{{ formData.description.length }}/200</div>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button class="cancel-btn" @click="handleCancel"> 取消 </el-button>
        <el-button class="confirm-btn" type="primary" @click="handleConfirm">
          确认修改
        </el-button>
      </div>
    </template>
  </RdappDialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import RdappDialog from "@/components/basicComponent/RdappDialog.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  documentData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue", "confirm", "cancel"]);

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const formData = ref({
  name: "",
  version: "",
  description: "",
});

const resetForm = () => {
  formData.value = {
    name: "",
    version: "",
    description: "",
  };
};

const initFormData = () => {
  if (props.documentData && Object.keys(props.documentData).length > 0) {
    formData.value = {
      name: props.documentData.name || "",
      version: props.documentData.version || "",
      description: props.documentData.description || "",
    };
  }
};

const handleClose = () => {
  resetForm();
};

const handleCancel = () => {
  visible.value = false;
  emit("cancel");
  resetForm();
};

const handleConfirm = () => {
  // 基础验证
  if (!formData.value.name.trim() || !formData.value.version.trim()) {
    return;
  }

  emit("confirm", {
    ...formData.value,
    id: props.documentData?.id,
  });
  visible.value = false;
  resetForm();
};

watch(visible, (newVal) => {
  if (newVal) {
    initFormData();
  } else {
    resetForm();
  }
});

watch(
  () => props.documentData,
  () => {
    if (visible.value) {
      initFormData();
    }
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.edit-content {
  padding: 0;
}

.form-item {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;

  .required {
    color: #ef4444;
    font-weight: 600;
  }
}

.form-input {
  :deep(.el-input__wrapper) {
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    box-shadow: none;
    padding: 0 16px;
    height: 40px;
    transition: all 0.2s;

    &:hover {
      border-color: #cbd5e1;
    }

    &.is-focus {
      border-color: #0f78f0;
      box-shadow: 0 0 0 2px rgba(15, 120, 240, 0.1);
    }

    .el-input__inner {
      font-size: 14px;
      color: #1f2937;

      &::placeholder {
        color: #9ca3af;
      }
    }
  }
}

.custom-textarea {
  position: relative;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #fff;
  transition: all 0.2s;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus-within {
    border-color: #0f78f0;
    box-shadow: 0 0 0 2px rgba(15, 120, 240, 0.1);
  }

  textarea {
    width: 100%;
    padding: 12px 16px;
    border: none;
    background: transparent;
    font-size: 14px;
    line-height: 1.5;
    color: #1f2937;
    resize: none;
    outline: none;

    &::placeholder {
      color: #9ca3af;
    }
  }

  .char-count {
    position: absolute;
    bottom: 8px;
    right: 12px;
    font-size: 12px;
    color: #94a3b8;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 8px;

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
