<template>
  <RdappDialog
    v-model="visible"
    :title="null"
    width="896px"
    :show-footer="false"
    custom-class="online-preview-dialog"
    @close="handleClose"
  >
    <template #header>
      <div class="preview-header">
        <span class="preview-title">在线预览</span>
        <div class="format-tabs">
          <span
            v-for="tab in formatTabs"
            :key="tab.value"
            class="format-tab"
            :class="{ active: activeFormat === tab.value }"
            @click="activeFormat = tab.value"
          >
            {{ tab.label }}
          </span>
        </div>
      </div>
    </template>

    <div class="preview-content">
      <div class="preview-document">
        <div class="doc-header">
          <h1 class="doc-title">{{ previewData.title }}</h1>
          <div class="doc-divider"></div>
        </div>

        <div class="doc-body">
          <div class="doc-intro">
            <p v-for="(text, index) in previewData.intro" :key="index">{{ text }}</p>
          </div>

          <div class="doc-tip">
            <span class="tip-label">提示：</span>
            <span class="tip-text">本预览仅供参考，实际部署请参照正式发布版本。</span>
          </div>

          <div
            v-for="(section, index) in previewData.sections"
            :key="index"
            class="doc-section"
          >
            <h3 class="section-title">{{ section.title }}</h3>
            <p class="section-content">{{ section.content }}</p>
            <div v-if="section.bars" class="section-bars">
              <div
                v-for="(bar, barIndex) in section.bars"
                :key="barIndex"
                class="bar-item"
                :style="{ width: bar.width + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="preview-footer">
        <el-button class="close-btn" @click="handleClose">
          关闭
        </el-button>
      </div>
    </template>
  </RdappDialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import RdappDialog from '@/components/basicComponent/RdappDialog.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  serviceData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const activeFormat = ref('html')

const formatTabs = [
  { label: 'HTML', value: 'html' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'Word', value: 'word' },
  { label: 'PDF', value: 'pdf' }
]

const previewData = computed(() => {
  return {
    title: props.serviceData.name ? `${props.serviceData.name} v${props.serviceData.latestVersion || '1.0.0'}` : '企业级云服务集成指南 v2.1',
    intro: [
      '本文档旨在为企业开发者提供关于如何高效集成云端 API 服务的详细指南。通过本文档，您将',
      '了解到核心架构设计、鉴权流程以及高并发场景下的性能优化策略。'
    ],
    sections: [
      {
        title: '1. 技术架构概览',
        content: '底层采用微服务架构，基于容器化技术进行部署，确保了系统的高可用性与可扩展性。各模块之间通过异步消息队列进行解耦，提升了整体响应速度。',
        bars: [
          { width: 100 },
          { width: 70 },
          { width: 45 }
        ]
      },
      {
        title: '2. 身份认证 (Authentication)',
        content: '系统支持标准的 OAuth 2.0 协议。所有请求必须携带合法的 Access Token。'
      },
      {
        title: '3. API 调用限制',
        content: '为了保障服务公平性，每个账号每秒请求数 (QPS) 默认为 100。',
        bars: [
          { width: 100 },
          { width: 90 }
        ]
      }
    ]
  }
})

const handleClose = () => {
  visible.value = false
  emit('close')
}

watch(visible, (newVal) => {
  if (newVal) {
    activeFormat.value = 'html'
  }
})
</script>

<style scoped lang="scss">
.online-preview-dialog {
  :deep(.el-dialog) {
    border-radius: 8px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  :deep(.el-dialog__header) {
    padding: 0;
    margin: 0;
    border-bottom: 1px solid #f3f4f6;
  }

  :deep(.el-dialog__body) {
    padding: 0;
    background: #f9fafb;
  }

  :deep(.el-dialog__footer) {
    padding: 0;
    border-top: 1px solid #f3f4f6;
  }
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #fff;
}

.preview-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  line-height: 28px;
}

.format-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  background: rgba(243, 244, 246, 0.8);
  border-radius: 8px;
}

.format-tab {
  padding: 4px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  line-height: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  &.active {
    background: #0f78f0;
    color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
}

.preview-content {
  padding: 32px 64px;
  min-height: 500px;
}

.preview-document {
  background: #fff;
  border-radius: 4px;
  border: 1px solid #f3f4f6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 48px;
}

.doc-header {
  margin-bottom: 32px;
}

.doc-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 24px 0;
  line-height: 1.4;
}

.doc-divider {
  height: 1px;
  background: #e5e7eb;
}

.doc-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.doc-intro {
  p {
    font-size: 14px;
    color: #4b5563;
    line-height: 1.6;
    margin: 0 0 8px 0;
  }
}

.doc-tip {
  padding: 12px 16px;
  background: #fffbeb;
  border-radius: 6px;
  border-left: 3px solid #f59e0b;
  font-size: 14px;
  line-height: 1.6;

  .tip-label {
    color: #d97706;
    font-weight: 500;
  }

  .tip-text {
    color: #92400e;
  }
}

.doc-section {
  .section-title {
    font-size: 18px;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 12px 0;
    line-height: 28px;
  }

  .section-content {
    font-size: 16px;
    color: #4b5563;
    line-height: 26px;
    margin: 0 0 16px 0;
  }

  .section-bars {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;

    .bar-item {
      height: 10px;
      background: #f3f4f6;
      border-radius: 9999px;
    }
  }
}

.preview-footer {
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  background: #fff;
}

.close-btn {
  min-width: 80px;
  height: 40px;
  padding: 8px 24px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  background: #1890ff;
  border: none;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #40a9ff;
  }
}
</style>
