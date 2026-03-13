<template>
  <RdappDialog
    v-model="visible"
    title="发布文档"
    width="560px"
    :show-footer="true"
    @close="handleClose"
  >
    <div class="publish-content">
      <!-- Tab 切换 -->
      <div class="tab-section">
        <div class="tab-wrapper">
          <div
            class="tab-item"
            :class="{ active: activeTab === 'url' }"
            @click="activeTab = 'url'"
          >
            <span>URL导入</span>
          </div>
          <div
            class="tab-item"
            :class="{ active: activeTab === 'file' }"
            @click="activeTab = 'file'"
          >
            <span>文件导入</span>
          </div>
        </div>
      </div>

      <!-- URL导入内容 -->
      <div v-if="activeTab === 'url'" class="tab-content">
        <div class="import-section">
          <div class="form-item">
            <div class="form-label">
              <span>Swagger URL</span>
              <span class="required">*</span>
            </div>
            <el-input
              v-model="urlForm.url"
              placeholder="请输入Swagger文档URL地址"
              class="form-input"
            />
          </div>

          <div class="form-item">
            <div class="form-label">
              <span>文档名称</span>
              <span class="required">*</span>
            </div>
            <el-input
              v-model="urlForm.name"
              placeholder="请输入文档名称"
              maxlength="50"
              class="form-input"
            />
          </div>

          <div class="form-item">
            <div class="form-label">
              <span>版本号</span>
              <span class="required">*</span>
            </div>
            <el-input
              v-model="urlForm.version"
              placeholder="例如: v2.0.1"
              maxlength="10"
              class="form-input"
            />
          </div>

          <div class="form-item">
            <div class="form-label">
              <span>发布说明</span>
            </div>
            <RdappTextarea
              v-model="urlForm.description"
              placeholder="请输入本次发布的更新说明内容"
              :rows="4"
              :maxlength="200"
              :show-word-limit="true"
            />
          </div>
        </div>
      </div>

      <!-- 文件导入内容 -->
      <div v-if="activeTab === 'file'" class="tab-content">
        <div class="file-import-section">
          <!-- 文件上传 -->
          <div class="form-item">
            <div class="form-label">
              <span class="required">*</span>
              <span>文件上传</span>
            </div>
            <div class="upload-area">
              <div class="upload-content">
                <div class="upload-icon">
                  <el-icon :size="32" color="#64748b"><Upload /></el-icon>
                </div>
                <div class="upload-text">
                  <p>点击或将文件拖拽到此区域上传</p>
                </div>
                <div class="upload-hint">
                  <p>仅支持上传 JSON 格式文件</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 文档名称 -->
          <div class="form-item">
            <div class="form-label">
              <span class="required">*</span>
              <span>文档名称</span>
            </div>
            <div class="input-wrapper">
              <el-input
                v-model="fileForm.name"
                placeholder="请输入文档名称"
                maxlength="30"
                show-word-limit
                class="form-input"
              />
            </div>
          </div>

          <!-- 版本号 -->
          <div class="form-item">
            <div class="form-label">
              <span class="required">*</span>
              <span>版本号</span>
            </div>
            <div class="input-wrapper">
              <el-input
                v-model="fileForm.version"
                placeholder="例如: v2.0.1"
                maxlength="10"
                class="form-input"
              />
            </div>
          </div>

          <!-- 发布说明 -->
          <div class="form-item">
            <div class="form-label">
              <span>发布说明</span>
            </div>
            <div class="textarea-wrapper">
              <div class="custom-textarea">
                <textarea
                  v-model="fileForm.description"
                  placeholder="请输入本次发布的更新说明内容"
                  maxlength="200"
                  rows="4"
                ></textarea>
                <div class="char-count">
                  {{ fileForm.description.length }}/200
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button class="cancel-btn" @click="handleCancel"> 取消 </el-button>
        <el-button class="confirm-btn" type="primary" @click="handleConfirm">
          {{ activeTab === "url" ? "发布文档" : "确认发布" }}
        </el-button>
      </div>
    </template>
  </RdappDialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { Upload } from "@element-plus/icons-vue";
import RdappDialog from "@/components/basicComponent/RdappDialog.vue";
import RdappTextarea from "@/components/basicComponent/RdappTextarea.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "confirm", "cancel"]);

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const activeTab = ref("file"); // 'url' 或 'file'

// URL导入表单
const urlForm = ref({
  url: "",
  name: "",
  version: "",
  description: "",
});

// 文件导入表单
const fileForm = ref({
  name: "",
  version: "",
  description: "",
});

const resetForm = () => {
  activeTab.value = "file";
  urlForm.value = {
    url: "",
    name: "",
    version: "",
    description: "",
  };
  fileForm.value = {
    name: "",
    version: "",
    description: "",
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
  const formData = activeTab.value === "url" ? urlForm.value : fileForm.value;

  // 基础验证
  if (activeTab.value === "url") {
    if (
      !formData.url.trim() ||
      !formData.name.trim() ||
      !formData.version.trim()
    ) {
      return;
    }
  } else {
    if (!formData.name.trim() || !formData.version.trim()) {
      return;
    }
  }

  emit("confirm", {
    type: activeTab.value,
    ...formData,
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
.publish-content {
  padding: 0;
}

// Tab 切换样式
.tab-section {
  margin-bottom: 24px;
}

.tab-wrapper {
  display: flex;
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
}

.tab-item {
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #475569;
    background-color: rgba(255, 255, 255, 0.5);
  }

  &.active {
    color: #1d4ed8;
    background-color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
}

.tab-content {
  // Tab 内容区域
}

// 表单样式
.form-item {
  margin-bottom: 20px;

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

// 文件导入区域样式
.file-import-section {
  // 文件导入特定样式
}

.upload-area {
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #f8fafc;

  &:hover {
    border-color: #cbd5e1;
    background-color: #f1f5f9;
  }
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.upload-icon {
  margin-bottom: 8px;
}

.upload-text {
  font-size: 14px;
  font-weight: 500;
  color: #475569;
}

.upload-hint {
  font-size: 12px;
  color: #94a3b8;
}

.input-wrapper {
  position: relative;
}

.textarea-wrapper {
  position: relative;
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
