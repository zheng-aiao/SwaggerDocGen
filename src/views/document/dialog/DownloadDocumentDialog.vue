<template>
  <RdappDialog
    v-model="visible"
    title="下载"
    width="560px"
    :show-footer="false"
    @close="handleClose"
  >
    <div class="download-dialog">
      <!-- 头部信息区域 -->
      <div class="document-info">
        <div class="info-row">
          <span class="doc-name">{{
            documentData?.name || "云计算核心基础服务"
          }}</span>
          <span class="doc-divider">|</span>
          <span class="doc-version">{{
            documentData?.version || "v2.4.0"
          }}</span>
        </div>
        <div class="doc-description">
          {{ documentData?.description || "API 参考手册指南文档资料库" }}
        </div>
      </div>

      <!-- 格式选择区域 -->
      <div class="format-section">
        <div class="section-title">
          <span class="required">*</span>
          <span>格式选择</span>
        </div>
        <div class="format-options">
          <div
            v-for="format in formatList"
            :key="format.value"
            class="format-option"
            :class="{ active: formData.format === format.value }"
            @click="selectFormat(format.value)"
          >
            <div class="checkbox-wrapper">
              <div
                class="checkbox"
                :class="{ checked: formData.format === format.value }"
              >
                <svg
                  v-if="formData.format === format.value"
                  class="check-icon"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3.5 8L6.5 11L12.5 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <span class="format-label">{{ format.label }}</span>
          </div>
        </div>
      </div>

      <!-- 底部按钮区域 -->
      <div class="dialog-footer">
        <button class="btn-cancel" @click="handleCancel">取消</button>
        <button class="btn-confirm" @click="handleConfirm">确认下载</button>
      </div>
    </div>
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
  format: "html",
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
    documentId: props.documentData?.id,
    documentName: props.documentData?.name,
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
.download-dialog {
  padding: 0;
}

// 文档信息区域
.document-info {
  padding: 16px;
  background: rgba(239, 246, 255, 0.5);
  border: 1px solid rgba(219, 234, 254, 1);
  border-radius: 8px;
  margin-bottom: 24px;

  .info-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;

    .doc-name {
      font-size: 12px;
      font-weight: 600;
      color: rgba(37, 99, 235, 1);
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }

    .doc-divider {
      font-size: 12px;
      font-weight: 600;
      color: rgba(191, 219, 254, 1);
      letter-spacing: 0.6px;
    }

    .doc-version {
      font-size: 12px;
      font-weight: 600;
      color: rgba(37, 99, 235, 1);
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }
  }

  .doc-description {
    font-size: 16px;
    font-weight: 600;
    color: rgba(17, 24, 39, 1);
    line-height: 24px;
  }
}

// 格式选择区域
.format-section {
  margin-bottom: 24px;

  .section-title {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: 700;
    color: rgba(17, 24, 39, 1);

    .required {
      color: rgba(220, 38, 38, 1);
      font-size: 18px;
      font-weight: 700;
    }
  }

  .format-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    background: rgba(249, 250, 251, 1);
    border: 1px solid rgba(229, 231, 235, 1);
    border-radius: 8px;
  }

  .format-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(243, 244, 246, 1);
    }

    &.active {
      .checkbox {
        background: rgba(15, 120, 240, 1);
        border-color: rgba(15, 120, 240, 1);
      }

      .format-label {
        color: rgba(15, 120, 240, 1);
        font-weight: 500;
      }
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .checkbox {
      width: 16px;
      height: 16px;
      border: 1px solid rgba(209, 213, 219, 1);
      border-radius: 4px;
      background: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &.checked {
        background: rgba(15, 120, 240, 1);
        border-color: rgba(15, 120, 240, 1);
      }

      .check-icon {
        width: 12px;
        height: 12px;
        color: white;
      }
    }

    .format-label {
      font-size: 14px;
      color: rgba(55, 65, 81, 1);
      transition: all 0.2s ease;
    }
  }
}

// 底部按钮区域
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(229, 231, 235, 1);

  .btn-cancel {
    min-width: 88px;
    height: 36px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(75, 85, 99, 1);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(209, 213, 219, 1);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(249, 250, 251, 1);
      border-color: rgba(156, 163, 175, 1);
    }
  }

  .btn-confirm {
    min-width: 104px;
    height: 36px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    background: rgba(15, 120, 240, 1);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(14, 109, 218, 1);
    }
  }
}
</style>
