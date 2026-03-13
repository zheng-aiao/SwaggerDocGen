<template>
  <RdappDialog
    v-model="visible"
    title="下载"
    width="560px"
    :show-footer="true"
    @close="handleClose"
  >
    <div class="download-content">
      <!-- 版本选择 -->
      <div class="form-item">
        <div class="form-label">
          <span>导出版本</span>
          <span class="required">*</span>
        </div>
        <RdappSelect
          v-model="formData.version"
          :options="versionOptions"
          placeholder="请选择版本"
          class="form-select"
        />
      </div>

      <!-- 导出格式 -->
      <div class="form-item">
        <div class="form-label">
          <span>导出格式</span>
          <span class="required">*</span>
        </div>
        <div class="format-options">
          <div
            v-for="format in formatList"
            :key="format.value"
            class="format-option"
            :class="{ active: formData.format === format.value }"
            @click="selectFormat(format.value)"
          >
            {{ format.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button class="cancel-btn" @click="handleCancel"> 取消 </el-button>
        <el-button class="confirm-btn" type="primary" @click="handleConfirm">
          确认下载
        </el-button>
      </div>
    </template>
  </RdappDialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import RdappDialog from "@/components/basicComponent/RdappDialog.vue";
import RdappSelect from "@/components/basicComponent/RdappSelect.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  serviceData: {
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
  version: "v2.1.0",
  format: "html",
});

const versionOptions = computed(() => {
  return [
    { label: "v2.1.0 (最新版本)", value: "v2.1.0" },
    { label: "v2.0.0", value: "v2.0.0" },
    { label: "v1.0.0", value: "v1.0.0" },
  ];
});

const formatList = [
  { label: "HTML", value: "html" },
  { label: "MarkDown", value: "markdown" },
  { label: "Word", value: "word" },
  { label: "PDF", value: "pdf" },
];

const selectFormat = (format) => {
  formData.value.format = format;
};

const resetForm = () => {
  formData.value = {
    version: "v2.1.0",
    format: "html",
  };
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
  emit("confirm", {
    serviceId: props.serviceData?.id,
    serviceName: props.serviceData?.name,
    ...formData.value,
  });
  visible.value = false;
  resetForm();
};

watch(visible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});
</script>

<style scoped lang="scss">
.download-content {
  padding: 0;
}

.form-item {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;

  .required {
    color: #ef4444;
    font-weight: 600;
  }
}

.form-select {
  width: 100%;
}

.format-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.format-option {
  min-width: 80px;
  height: 44px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 2px solid #f1f5f9;
  background-color: #f8fafc;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #e2e8f0;
    background-color: #f1f5f9;
  }

  &.active {
    border-color: #0f78f0;
    background-color: rgba(15, 120, 240, 0.05);
    color: #0f78f0;
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
