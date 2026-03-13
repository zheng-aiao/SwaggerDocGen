<template>
  <div class="page-container">
    <div class="left-sidebar">
      <ConfigSidebar :active-id="activeConfig" @change="handleConfigChange" />
    </div>

    <div class="right-content">
      <div class="config-content">
        <div class="config-form-section">
          <div class="form-header">
            <h2 class="form-title">页眉页脚</h2>
          </div>

          <div class="form-body">
            <div class="form-item">
              <label class="form-label">页眉内容</label>
              <RdappInput v-model="headerContent" placeholder="请输入页眉内容" />
            </div>

            <div class="form-item">
              <label class="form-label">页眉位置</label>
              <RdappSelect
                v-model="headerPosition"
                :options="positionOptions"
                placeholder="选择位置"
              />
            </div>

            <div class="form-item">
              <label class="form-label">页脚内容</label>
              <RdappSelect
                v-model="footerType"
                :options="footerOptions"
                placeholder="选择页脚类型"
              />
            </div>

            <div class="form-item">
              <label class="form-label">页码格式</label>
              <RdappSelect
                v-model="pageFormat"
                :options="pageFormatOptions"
                placeholder="选择页码格式"
              />
            </div>

            <div class="form-item">
              <label class="form-label">页码位置</label>
              <RdappSelect
                v-model="pagePosition"
                :options="positionOptions"
                placeholder="选择位置"
              />
            </div>

            <div class="form-item">
              <label class="form-label">显示分隔线</label>
              <div class="switch-row">
                <el-switch v-model="showDivider" />
                <span class="switch-label">{{ showDivider ? '显示' : '隐藏' }}</span>
              </div>
            </div>
          </div>
        </div>

        <PreviewWrapper>
          <div class="paper-mockup">
            <div class="paper-content">
              <div class="page-header" v-if="headerContent">
                <span class="header-text" :class="headerPosition">{{ headerContent }}</span>
                <div class="header-divider" v-if="showDivider"></div>
              </div>

              <div class="page-body">
                <div class="content-placeholder">
                  <div class="placeholder-line"></div>
                  <div class="placeholder-line"></div>
                  <div class="placeholder-line short"></div>
                  <div class="placeholder-line"></div>
                  <div class="placeholder-line"></div>
                  <div class="placeholder-line short"></div>
                  <div class="placeholder-line"></div>
                  <div class="placeholder-line"></div>
                  <div class="placeholder-line short"></div>
                </div>
              </div>

              <div class="page-footer">
                <div class="footer-divider" v-if="showDivider"></div>
                <span class="footer-text" :class="pagePosition">{{ getFooterText }}</span>
              </div>
            </div>
          </div>
        </PreviewWrapper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ConfigSidebar from "../cover/components/ConfigSidebar.vue";
import RdappInput from "@/components/basicComponent/RdappInput.vue";
import RdappSelect from "@/components/basicComponent/RdappSelect.vue";
import PreviewWrapper from "../components/PreviewWrapper.vue";

const activeConfig = ref("header-footer");
const headerContent = ref("API 接口文档");
const headerPosition = ref("center");
const footerType = ref("page-number");
const pageFormat = ref("dash");
const pagePosition = ref("center");
const showDivider = ref(true);

const positionOptions = [
  { value: "left", label: "左侧" },
  { value: "center", label: "居中" },
  { value: "right", label: "右侧" },
];

const footerOptions = [
  { value: "page-number", label: "页码" },
  { value: "total-pages", label: "页码/总页数" },
  { value: "custom", label: "自定义文本" },
];

const pageFormatOptions = [
  { value: "number", label: "1, 2, 3..." },
  { value: "dash", label: "- 1 -, - 2 -..." },
  { value: "page-of", label: "Page 1 of 10" },
  { value: "roman", label: "I, II, III..." },
];

const getFooterText = computed(() => {
  switch (pageFormat.value) {
    case "number":
      return "1";
    case "dash":
      return "- 1 -";
    case "page-of":
      return "Page 1 of 12";
    case "roman":
      return "I";
    default:
      return "1";
  }
});

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

.paper-mockup {
  width: 636px;
  min-height: 900px;
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;

  .paper-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 48px;
  }

  .page-header {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;

    .header-text {
      font-size: 10px;
      color: #94a3b8;
      font-family: "Liberation Mono", monospace;

      &.left {
        text-align: left;
      }
      &.center {
        text-align: center;
      }
      &.right {
        text-align: right;
      }
    }

    .header-divider {
      height: 1px;
      background: #f1f5f9;
      margin-top: 16px;
    }
  }

  .page-body {
    flex: 1;

    .content-placeholder {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .placeholder-line {
        height: 12px;
        background: #f1f5f9;
        border-radius: 2px;

        &.short {
          width: 60%;
        }
      }
    }
  }

  .page-footer {
    display: flex;
    flex-direction: column;
    margin-top: 32px;

    .footer-divider {
      height: 1px;
      background: #f1f5f9;
      margin-bottom: 16px;
    }

    .footer-text {
      font-size: 10px;
      color: #cbd5e1;
      font-family: "Liberation Mono", monospace;

      &.left {
        text-align: left;
      }
      &.center {
        text-align: center;
      }
      &.right {
        text-align: right;
      }
    }
  }
}
</style>
