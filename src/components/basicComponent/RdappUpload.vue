<template>
  <el-upload
    ref="uploadRef"
    class="rdapp-upload"
    :action="action"
    :auto-upload="autoUpload"
    :show-file-list="showFileList"
    :drag="drag"
    :accept="accept"
    :limit="limit"
    :disabled="disabled"
    :before-upload="handleBeforeUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-change="handleChange"
  >
    <slot>
      <div class="upload-default">
        <el-icon class="upload-icon"><Upload /></el-icon>
        <div class="upload-text">
          <p class="upload-hint">{{ tip }}</p>
        </div>
      </div>
    </slot>
    <template #tip>
      <slot name="tip"></slot>
    </template>
  </el-upload>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  action: {
    type: String,
    default: "#",
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  showFileList: {
    type: Boolean,
    default: false,
  },
  drag: {
    type: Boolean,
    default: true,
  },
  accept: {
    type: String,
    default: "image/png,image/jpeg",
  },
  limit: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  tip: {
    type: String,
    default: "点击或拖拽上传 PNG/JPG",
  },
  maxSize: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["success", "error", "change", "before-upload"]);

const uploadRef = ref(null);

const handleBeforeUpload = (file) => {
  const isImage = file.type.startsWith("image/");
  const isLtSize = file.size / 1024 / 1024 < props.maxSize;

  if (!isImage) {
    console.error("只能上传图片文件!");
    return false;
  }
  if (!isLtSize) {
    console.error(`图片大小不能超过 ${props.maxSize}MB!`);
    return false;
  }

  emit("before-upload", file);
  return true;
};

const handleSuccess = (response, file) => {
  emit("success", { response, file });
};

const handleError = (error, file) => {
  emit("error", { error, file });
};

const handleChange = (file, fileList) => {
  emit("change", { file, fileList });
};

defineExpose({
  uploadRef,
});
</script>

<style scoped lang="scss">
.rdapp-upload {
  width: 100%;

  :deep(.el-upload) {
    width: 100%;
  }

  :deep(.el-upload-dragger) {
    width: 100%;
    height: 100%;
    border: 1px dashed #d1d5db;
    border-radius: 8px;
    background: #f9fafb;
    transition: all 0.2s;

    &:hover {
      border-color: #3b82f6;
      background: #f0f7ff;
    }
  }

  .upload-default {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    gap: 8px;

    .upload-icon {
      font-size: 32px;
      color: #9ca3af;
    }

    .upload-text {
      text-align: center;

      .upload-hint {
        font-size: 14px;
        color: #6b7280;
        margin: 0;
      }
    }
  }
}
</style>
