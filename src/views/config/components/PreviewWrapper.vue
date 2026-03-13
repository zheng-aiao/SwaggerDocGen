<template>
  <div class="preview-wrapper">
    <div class="preview-header-bar">
      <span class="preview-label">预览</span>
      <div class="zoom-controls">
        <el-button class="zoom-btn" @click="handleZoomOut">
          <el-icon><ZoomOut /></el-icon>
        </el-button>
        <span class="zoom-text">{{ zoomLevel }}%</span>
        <el-button class="zoom-btn" @click="handleZoomIn">
          <el-icon><ZoomIn /></el-icon>
        </el-button>
      </div>
    </div>
    <div class="preview-container" :style="{ transform: `scale(${zoomLevel / 100})` }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const zoomLevel = ref(85);

const handleZoomIn = () => {
  if (zoomLevel.value < 150) {
    zoomLevel.value += 10;
  }
};

const handleZoomOut = () => {
  if (zoomLevel.value > 50) {
    zoomLevel.value -= 10;
  }
};
</script>

<style scoped lang="scss">
.preview-wrapper {
  flex: 1;
  background: #f5f7f8;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .preview-header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;

    .preview-label {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }

    .zoom-controls {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #ffffff;
      border-radius: 20px;
      padding: 4px 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

      .zoom-btn {
        padding: 4px;
        border: none;
        background: transparent;
        color: #64748b;

        &:hover {
          color: #3b82f6;
          background: #f0f7ff;
        }
      }

      .zoom-text {
        font-size: 12px;
        font-weight: 600;
        color: #475569;
        min-width: 40px;
        text-align: center;
      }
    }
  }

  .preview-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 48px;
    overflow: auto;
    transform-origin: center center;
    transition: transform 0.2s;
  }
}
</style>
