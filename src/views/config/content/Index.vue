<template>
  <div class="page-container">
    <div class="left-sidebar">
      <ConfigSidebar :active-id="activeConfig" @change="handleConfigChange" />
    </div>

    <div class="right-content">
      <div class="config-content">
        <div class="config-form-section">
          <div class="form-header">
            <h2 class="form-title">正文样式</h2>
          </div>

          <div class="form-body">
            <div class="config-collapse">
              <div
                v-for="item in configItems"
                :key="item.id"
                class="collapse-item"
                :class="{ active: expandedItem === item.id }"
              >
                <div class="collapse-header" @click="toggleExpand(item.id)">
                  <div class="header-left">
                    <el-icon class="collapse-icon">
                      <component :is="item.icon" />
                    </el-icon>
                    <span class="collapse-title">{{ item.title }}</span>
                  </div>
                  <el-icon class="expand-icon" :class="{ expanded: expandedItem === item.id }">
                    <ArrowRight />
                  </el-icon>
                </div>
                <div class="collapse-content" v-show="expandedItem === item.id">
                  <component :is="item.component" v-model="configData[item.id]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <PreviewWrapper>
          <div class="paper-mockup">
            <div class="paper-content">
              <div class="document-preview">
                <h1 class="doc-title" :style="getTitleStyle">项目概述</h1>
                <p class="doc-paragraph" :style="getParagraphStyle">
                  本文档详细描述了系统的整体架构设计、功能模块划分以及技术实现方案。文档旨在为开发团队提供清晰的技术指导，确保项目按计划高质量交付。
                </p>
                <h2 class="doc-heading" :style="getHeadingStyle">1.1 项目背景</h2>
                <p class="doc-paragraph" :style="getParagraphStyle">
                  随着业务的快速发展，现有系统已无法满足日益增长的业务需求。为提升系统性能和用户体验，需要进行系统重构和功能扩展。
                </p>
                <div class="code-block" :style="getCodeStyle">
                  <code>GET /api/v1/users</code>
                </div>
                <h2 class="doc-heading" :style="getHeadingStyle">1.2 项目目标</h2>
                <p class="doc-paragraph" :style="getParagraphStyle">
                  构建一个高性能、高可用、易扩展的分布式系统架构，支持百万级用户并发访问。
                </p>
              </div>
            </div>
          </div>
        </PreviewWrapper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, markRaw } from "vue";
import ConfigSidebar from "../cover/components/ConfigSidebar.vue";
import PreviewWrapper from "../components/PreviewWrapper.vue";
import RdappSelect from "@/components/basicComponent/RdappSelect.vue";
import TitleStyleConfig from "./components/TitleStyleConfig.vue";
import ParagraphStyleConfig from "./components/ParagraphStyleConfig.vue";
import CodeStyleConfig from "./components/CodeStyleConfig.vue";
import TableStyleConfig from "./components/TableStyleConfig.vue";
import ImageStyleConfig from "./components/ImageStyleConfig.vue";

const activeConfig = ref("content");
const expandedItem = ref("title");

const configData = ref({
  title: {
    fontFamily: "Inter",
    fontSize: "28",
    fontWeight: "700",
    color: "#111827",
    lineHeight: "1.4",
  },
  paragraph: {
    fontFamily: "WenQuanYi Zen Hei",
    fontSize: "14",
    lineHeight: "1.8",
    color: "#374151",
    textAlign: "left",
  },
  code: {
    fontFamily: "Liberation Mono",
    fontSize: "12",
    background: "#f8fafc",
    borderColor: "#e2e8f0",
  },
  table: {
    headerBg: "#f8fafc",
    borderColor: "#e2e8f0",
    striped: true,
  },
  image: {
    maxWidth: "100",
    alignment: "center",
    caption: true,
  },
});

const configItems = [
  {
    id: "title",
    title: "标题样式",
    icon: "EditPen",
    component: markRaw(TitleStyleConfig),
  },
  {
    id: "paragraph",
    title: "正文样式",
    icon: "Document",
    component: markRaw(ParagraphStyleConfig),
  },
  {
    id: "code",
    title: "代码块样式",
    icon: "DocumentCopy",
    component: markRaw(CodeStyleConfig),
  },
  {
    id: "table",
    title: "表格样式",
    icon: "Grid",
    component: markRaw(TableStyleConfig),
  },
  {
    id: "image",
    title: "图片样式",
    icon: "Picture",
    component: markRaw(ImageStyleConfig),
  },
];

const getTitleStyle = computed(() => ({
  fontFamily: configData.value.title.fontFamily,
  fontSize: `${configData.value.title.fontSize}px`,
  fontWeight: configData.value.title.fontWeight,
  color: configData.value.title.color,
  lineHeight: configData.value.title.lineHeight,
}));

const getHeadingStyle = computed(() => ({
  fontFamily: configData.value.title.fontFamily,
  fontSize: `${parseInt(configData.value.title.fontSize) - 8}px`,
  fontWeight: "600",
  color: configData.value.title.color,
}));

const getParagraphStyle = computed(() => ({
  fontFamily: configData.value.paragraph.fontFamily,
  fontSize: `${configData.value.paragraph.fontSize}px`,
  lineHeight: configData.value.paragraph.lineHeight,
  color: configData.value.paragraph.color,
  textAlign: configData.value.paragraph.textAlign,
}));

const getCodeStyle = computed(() => ({
  fontFamily: configData.value.code.fontFamily,
  fontSize: `${configData.value.code.fontSize}px`,
  background: configData.value.code.background,
  borderColor: configData.value.code.borderColor,
}));

const toggleExpand = (id) => {
  expandedItem.value = expandedItem.value === id ? null : id;
};

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
    padding: 16px;
    overflow-y: auto;
  }
}

.config-collapse {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .collapse-item {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s;

    &.active {
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }

    .collapse-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      cursor: pointer;
      background: #ffffff;
      transition: background 0.2s;

      &:hover {
        background: #f8fafc;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 12px;

        .collapse-icon {
          font-size: 18px;
          color: #64748b;
        }

        .collapse-title {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }
      }

      .expand-icon {
        font-size: 14px;
        color: #94a3b8;
        transition: transform 0.2s;

        &.expanded {
          transform: rotate(90deg);
        }
      }
    }

    .collapse-content {
      padding: 16px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
    }
  }
}

.paper-mockup {
  width: 700px;
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

  .document-preview {
    .doc-title {
      margin: 0 0 24px 0;
    }

    .doc-heading {
      margin: 24px 0 16px 0;
    }

    .doc-paragraph {
      margin: 0 0 16px 0;
    }

    .code-block {
      padding: 16px;
      border-radius: 6px;
      border: 1px solid;
      margin: 16px 0;
      overflow-x: auto;

      code {
        color: #1f2937;
      }
    }
  }
}
</style>
