<template>
  <div class="page-container">
    <div class="left-sidebar">
      <ConfigSidebar :active-id="activeConfig" @change="handleConfigChange" />
    </div>

    <div class="right-content">
      <div class="config-content">
        <div class="config-form-section">
          <div class="form-header">
            <h2 class="form-title">封面样式</h2>
          </div>

          <div class="form-body">
            <div class="form-item">
              <label class="form-label">选择封面模板</label>
              <div class="template-grid">
                <div
                  v-for="template in templates"
                  :key="template.id"
                  class="template-card"
                  :class="{ active: selectedTemplate === template.id }"
                  @click="selectedTemplate = template.id"
                >
                  <div class="template-preview">
                    <div class="preview-header"></div>
                    <div class="preview-body">
                      <div class="preview-line"></div>
                      <div class="preview-line short"></div>
                    </div>
                  </div>
                  <div
                    class="template-check"
                    v-if="selectedTemplate === template.id"
                  >
                    <el-icon><Check /></el-icon>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-item">
              <label class="form-label">上传Logo</label>
              <RdappUpload
                tip="点击或拖拽上传 PNG/JPG"
                accept="image/png,image/jpeg"
                @success="handleUploadSuccess"
              />
            </div>

            <div class="form-item">
              <label class="form-label">标题字体设置</label>
              <div class="font-setting-row">
                <RdappSelect
                  v-model="fontFamily"
                  :options="fontOptions"
                  placeholder="选择字体"
                  width="200px"
                />
                <RdappSelect
                  v-model="fontSize"
                  :options="fontSizeOptions"
                  placeholder="字号"
                  width="120px"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="preview-section">
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

          <div
            class="preview-container"
            :style="{ transform: `scale(${zoomLevel / 100})` }"
          >
            <div class="paper-mockup">
              <div class="paper-content">
                <div class="paper-header">
                  <div class="company-logo">
                    <el-icon :size="32"><OfficeBuilding /></el-icon>
                  </div>
                  <span class="company-name">Enterprise Solutions</span>
                </div>

                <div class="paper-body">
                  <div class="title-block">
                    <h1 class="main-title">数字化转型</h1>
                    <h2 class="sub-title">实施方案手册</h2>
                  </div>
                  <p class="description">2024 年度战略规划核心文档</p>
                </div>

                <div class="paper-footer">
                  <div class="footer-row">
                    <div class="footer-item">
                      <span class="footer-label">版本号</span>
                      <span class="footer-value">V2.4.0-Stable</span>
                    </div>
                    <div class="footer-item">
                      <span class="footer-label">编写团队</span>
                      <span class="footer-value">数字化运营中心 - 方案组</span>
                    </div>
                  </div>
                  <div class="footer-row">
                    <div class="footer-item">
                      <span class="footer-label">更新日期</span>
                      <span class="footer-value">2024-03-15</span>
                    </div>
                    <div class="footer-item">
                      <span class="footer-label">文档编号</span>
                      <span class="footer-value">DOC-2024-0042</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import RdappNav from "@/components/businessComponent/RdappNav.vue";
import RdappSelect from "@/components/basicComponent/RdappSelect.vue";
import RdappUpload from "@/components/basicComponent/RdappUpload.vue";
import ConfigSidebar from "./components/ConfigSidebar.vue";

const activeConfig = ref("cover");
const selectedTemplate = ref("template1");
const fontFamily = ref("alibaba");
const fontSize = ref("24");
const zoomLevel = ref(85);

const templates = [
  { id: "template1", name: "模板1" },
  { id: "template2", name: "模板2" },
];

const fontOptions = [
  { value: "alibaba", label: "阿里巴巴普惠体 (推荐)" },
  { value: "pingfang", label: "苹方字体" },
  { value: "simhei", label: "黑体" },
  { value: "simsun", label: "宋体" },
];

const fontSizeOptions = [
  { value: "18", label: "18px" },
  { value: "20", label: "20px" },
  { value: "24", label: "24px" },
  { value: "28", label: "28px" },
  { value: "32", label: "32px" },
];

const handleConfigChange = (item) => {
  activeConfig.value = item.id;
  console.log("切换配置项:", item);
};

const handleUploadSuccess = ({ file }) => {
  console.log("上传成功:", file);
};

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
.page-container {
  width: 100%;
  height: 100%;
  display: flex;
  background: #f8fafc;
}

.left-sidebar {
  width: 240px;
  min-width: 240px;
  flex-shrink: 0;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
}

.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  padding: 0;
  gap: 0;
}

.config-content {
  flex: 1;
  display: flex;
  gap: 24px;
  padding: 24px;
  overflow: hidden;
}

.config-form-section {
  width: 380px;
  flex-shrink: 0;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;

  .form-header {
    padding: 20px 24px;
    border-bottom: 1px solid #f1f5f9;

    .form-title {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }
  }

  .form-body {
    flex: 1;
    padding: 24px;
    overflow-y: auto;

    .form-item {
      margin-bottom: 24px;

      &:last-child {
        margin-bottom: 0;
      }

      .form-label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: #374151;
        margin-bottom: 12px;
      }
    }
  }
}

.template-grid {
  display: flex;
  gap: 12px;

  .template-card {
    position: relative;
    width: 120px;
    height: 160px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
    transition: all 0.2s;
    background: #ffffff;

    &:hover {
      border-color: #cbd5e1;
    }

    &.active {
      border-color: #3b82f6;
      background: #f0f7ff;
    }

    .template-preview {
      width: 100%;
      height: 100%;
      background: #f9fafb;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      padding: 8px;
      gap: 8px;

      .preview-header {
        height: 16px;
        background: #e5e7eb;
        border-radius: 2px;
      }

      .preview-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding-top: 12px;

        .preview-line {
          height: 8px;
          background: #d1d5db;
          border-radius: 2px;

          &.short {
            width: 60%;
          }
        }
      }
    }

    .template-check {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 20px;
      height: 20px;
      background: #3b82f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-size: 12px;
    }
  }
}

.font-setting-row {
  display: flex;
  gap: 12px;
}

.preview-section {
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

.paper-mockup {
  width: 657px;
  min-height: 930px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 25px 50px -12px rgba(226, 232, 240, 1);
  display: flex;
  flex-direction: column;

  .paper-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 96px 64px 80px;
  }

  .paper-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 80px;

    .company-logo {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }

    .company-name {
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
      font-family: "Inter", sans-serif;
    }
  }

  .paper-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;

    .title-block {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .main-title {
        font-size: 48px;
        font-weight: 700;
        color: #111827;
        margin: 0;
        line-height: 1.2;
        letter-spacing: -0.02em;
      }

      .sub-title {
        font-size: 32px;
        font-weight: 500;
        color: #4b5563;
        margin: 0;
        line-height: 1.3;
      }
    }

    .description {
      font-size: 16px;
      color: #6b7280;
      margin: 0;
    }
  }

  .paper-footer {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding-top: 32px;
    border-top: 1px solid #e5e7eb;

    .footer-row {
      display: flex;
      gap: 120px;

      .footer-item {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .footer-label {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
        }

        .footer-value {
          font-size: 14px;
          color: #374151;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
