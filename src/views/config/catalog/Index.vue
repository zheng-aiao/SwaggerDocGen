<template>
  <div class="page-container">
    <div class="left-sidebar">
      <ConfigSidebar :active-id="activeConfig" @change="handleConfigChange" />
    </div>

    <div class="right-content">
      <div class="config-content">
        <div class="config-form-section">
          <div class="form-header">
            <h2 class="form-title">目录样式</h2>
          </div>

          <div class="form-body">
            <div class="form-item">
              <label class="form-label">目录标题</label>
              <RdappInput v-model="catalogTitle" placeholder="请输入目录标题" />
            </div>

            <div class="form-item">
              <label class="form-label">目录层级</label>
              <RdappSelect
                v-model="catalogLevel"
                :options="levelOptions"
                placeholder="选择层级"
              />
            </div>

            <div class="form-item">
              <label class="form-label">显示页码</label>
              <div class="switch-row">
                <el-switch v-model="showPageNumber" />
                <span class="switch-label">{{ showPageNumber ? '显示' : '隐藏' }}</span>
              </div>
            </div>

            <div class="form-item">
              <label class="form-label">页码对齐方式</label>
              <RdappSelect
                v-model="pageAlign"
                :options="alignOptions"
                placeholder="选择对齐方式"
              />
            </div>

            <div class="form-item">
              <label class="form-label">目录样式</label>
              <div class="style-grid">
                <div
                  v-for="style in catalogStyles"
                  :key="style.id"
                  class="style-card"
                  :class="{ active: selectedStyle === style.id }"
                  @click="selectedStyle = style.id"
                >
                  <div class="style-preview">
                    <div class="preview-line"></div>
                    <div class="preview-line short"></div>
                    <div class="preview-line"></div>
                    <div class="preview-line shorter"></div>
                  </div>
                  <div class="style-check" v-if="selectedStyle === style.id">
                    <el-icon><Check /></el-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PreviewWrapper>
          <div class="paper-mockup">
            <div class="paper-content">
              <div class="catalog-header">
                <h1 class="catalog-title">{{ catalogTitle || '目录' }}</h1>
              </div>

              <div class="catalog-body">
                <div class="catalog-item level-1">
                  <span class="item-title">1. 项目概述</span>
                  <span class="item-dots"></span>
                  <span class="item-page">1</span>
                </div>
                <div class="catalog-item level-2">
                  <span class="item-title">1.1 项目背景</span>
                  <span class="item-dots"></span>
                  <span class="item-page">2</span>
                </div>
                <div class="catalog-item level-2">
                  <span class="item-title">1.2 项目目标</span>
                  <span class="item-dots"></span>
                  <span class="item-page">3</span>
                </div>
                <div class="catalog-item level-1">
                  <span class="item-title">2. 需求分析</span>
                  <span class="item-dots"></span>
                  <span class="item-page">4</span>
                </div>
                <div class="catalog-item level-2">
                  <span class="item-title">2.1 功能需求</span>
                  <span class="item-dots"></span>
                  <span class="item-page">5</span>
                </div>
                <div class="catalog-item level-2">
                  <span class="item-title">2.2 非功能需求</span>
                  <span class="item-dots"></span>
                  <span class="item-page">6</span>
                </div>
                <div class="catalog-item level-1">
                  <span class="item-title">3. 系统设计</span>
                  <span class="item-dots"></span>
                  <span class="item-page">7</span>
                </div>
                <div class="catalog-item level-2">
                  <span class="item-title">3.1 架构设计</span>
                  <span class="item-dots"></span>
                  <span class="item-page">8</span>
                </div>
              </div>

              <div class="paper-footer">
                <span class="footer-text">- 1 -</span>
              </div>
            </div>
          </div>
        </PreviewWrapper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ConfigSidebar from "../cover/components/ConfigSidebar.vue";
import RdappInput from "@/components/basicComponent/RdappInput.vue";
import RdappSelect from "@/components/basicComponent/RdappSelect.vue";
import PreviewWrapper from "../components/PreviewWrapper.vue";

const activeConfig = ref("catalog");
const catalogTitle = ref("目录");
const catalogLevel = ref("3");
const showPageNumber = ref(true);
const pageAlign = ref("right");
const selectedStyle = ref("style1");

const levelOptions = [
  { value: "2", label: "2级" },
  { value: "3", label: "3级" },
  { value: "4", label: "4级" },
];

const alignOptions = [
  { value: "left", label: "左对齐" },
  { value: "right", label: "右对齐" },
  { value: "center", label: "居中" },
];

const catalogStyles = [
  { id: "style1", name: "样式1" },
  { id: "style2", name: "样式2" },
];

const handleConfigChange = (item) => {
  activeConfig.value = item.id;
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

.switch-row {
  display: flex;
  align-items: center;
  gap: 12px;

  .switch-label {
    font-size: 14px;
    color: #6b7280;
  }
}

.style-grid {
  display: flex;
  gap: 12px;

  .style-card {
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

    .style-preview {
      width: 100%;
      height: 100%;
      background: #f9fafb;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      padding: 12px;
      gap: 8px;

      .preview-line {
        height: 8px;
        background: #d1d5db;
        border-radius: 2px;

        &.short {
          width: 70%;
          margin-left: 16px;
        }

        &.shorter {
          width: 50%;
          margin-left: 16px;
        }
      }
    }

    .style-check {
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

.paper-mockup {
  width: 695px;
  min-height: 984px;
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 0 25px 50px -12px rgba(226, 232, 240, 1);
  display: flex;
  flex-direction: column;

  .paper-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 64px;
  }

  .catalog-header {
    margin-bottom: 48px;

    .catalog-title {
      font-size: 28px;
      font-weight: 700;
      color: #111827;
      margin: 0;
      text-align: center;
    }
  }

  .catalog-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 18px;

    .catalog-item {
      display: flex;
      align-items: center;
      gap: 8px;

      &.level-1 {
        .item-title {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }
      }

      &.level-2 {
        padding-left: 24px;

        .item-title {
          font-size: 13px;
          font-weight: 400;
          color: #374151;
        }
      }

      .item-title {
        flex-shrink: 0;
      }

      .item-dots {
        flex: 1;
        border-bottom: 2px dotted #cbd5e1;
        margin: 0 8px;
      }

      .item-page {
        font-size: 13px;
        color: #374151;
        min-width: 20px;
        text-align: right;
      }
    }
  }

  .paper-footer {
    display: flex;
    justify-content: center;
    padding-top: 32px;

    .footer-text {
      font-size: 12px;
      color: #cbd5e1;
    }
  }
}
</style>
