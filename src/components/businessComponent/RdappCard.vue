<template>
  <div class="service-card">
    <div class="service-icon-wrapper">
      <div class="service-icon" :style="iconStyle">
        <el-icon :size="24" color="#FFFFFF">
          <component :is="icon" />
        </el-icon>
      </div>
    </div>
    <div class="service-info">
      <div class="service-header">
        <h2 class="service-name">{{ name }}</h2>
        <span v-if="category" class="service-category">{{ category }}</span>
      </div>
      <p v-if="description" class="service-desc">{{ description }}</p>
      <div v-if="stats && stats.length > 0" class="service-stats">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-item"
        >
          <span class="stat-label">{{ stat.label }}</span>
          <div v-if="stat.type === 'creator'" class="creator-info">
            <el-avatar :size="20" icon="UserFilled" />
            <span class="stat-value">{{ stat.value }}</span>
          </div>
          <span v-else class="stat-value">{{ stat.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'Document'
  },
  iconBgColor: {
    type: String,
    default: ''
  },
  stats: {
    type: Array,
    default: () => []
  }
})

const iconStyle = computed(() => {
  if (props.iconBgColor) {
    return { background: props.iconBgColor }
  }
  return { background: 'linear-gradient(135deg, #0f78f0 0%, #0066cc 100%)' }
})
</script>

<style scoped lang="scss">
.service-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  .service-icon-wrapper {
    flex-shrink: 0;

    .service-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .service-info {
    flex: 1;
    min-width: 0;

    .service-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;

      .service-name {
        font-size: 18px;
        font-weight: 600;
        color: #0f172a;
        margin: 0;
      }

      .service-category {
        display: inline-flex;
        align-items: center;
        padding: 4px 12px;
        background: #f0f7ff;
        border: 1px solid #bfdbfe;
        border-radius: 16px;
        font-size: 12px;
        color: #0f78f0;
        font-weight: 500;
      }
    }

    .service-desc {
      font-size: 14px;
      color: #64748b;
      line-height: 1.6;
      margin: 0 0 16px 0;
    }

    .service-stats {
      display: flex;
      gap: 32px;
      padding-top: 16px;
      border-top: 1px solid #f1f5f9;

      .stat-item {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .stat-label {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 400;
        }

        .stat-value {
          font-size: 14px;
          color: #1f2937;
          font-weight: 500;
        }

        .creator-info {
          display: flex;
          align-items: center;
          gap: 8px;

          .stat-value {
            color: #1f2937;
          }
        }
      }
    }
  }
}
</style>
