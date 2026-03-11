<script setup>
defineProps({
  serviceInfo: {
    type: Object,
    default: () => ({
      name: 'srm基础服务',
      category: 'srm系统',
      description: '该服务涵盖了所有核心业务逻辑的API定义与调用规范。主要包括用户鉴权、订单处理、库存同步及第三方支付集成接口。开发者需严格遵守本规范进行系统间调用，确保数据一致性与安全性。',
      docCount: 15,
      latestVersion: 'v2.4.0',
      lastUpdate: '2023-10-24',
      creator: '张管理'
    })
  }
})
</script>

<template>
  <div class="service-intro-card">
    <div class="card-content">
      <!-- Left: Background Image Area -->
      <div class="image-section">
        <div class="gradient-bg">
          <div class="gradient-overlay"></div>
          <div class="service-icon">
            <el-icon :size="48" color="#FFFFFF"><Document /></el-icon>
          </div>
        </div>
      </div>

      <!-- Right: Content Area -->
      <div class="content-section">
        <!-- Header -->
        <div class="content-header">
          <h1 class="service-name">{{ serviceInfo.name }}</h1>
          <div class="service-tag">
            <span class="tag-text">{{ serviceInfo.category }}</span>
          </div>
        </div>

        <!-- Description -->
        <p class="service-description">{{ serviceInfo.description }}</p>

        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">文档总数</span>
            <span class="stat-value">{{ serviceInfo.docCount }} 份</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">最新版本</span>
            <span class="stat-value version">{{ serviceInfo.latestVersion }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">最后更新</span>
            <span class="stat-value">{{ serviceInfo.lastUpdate }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">创建者</span>
            <div class="creator-info">
              <el-avatar :size="20" icon="UserFilled" />
              <span class="stat-value">{{ serviceInfo.creator }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.service-intro-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 24px;
}

.card-content {
  display: flex;
  min-height: 280px;
}

// Left Image Section
.image-section {
  width: 280px;
  flex-shrink: 0;

  .gradient-bg {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;

    .gradient-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(180deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.9) 100%);
    }

    .service-icon {
      position: relative;
      z-index: 1;
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
    }
  }
}

// Right Content Section
.content-section {
  flex: 1;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
}

.content-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  .service-name {
    font-size: 20px;
    font-weight: 600;
    color: #1F2937;
  }

  .service-tag {
    display: inline-flex;
    align-items: center;
    padding: 2px 10px;
    background: #F0FDF4;
    border: 1px solid #86EFAC;
    border-radius: 9999px;

    .tag-text {
      font-size: 12px;
      color: #16A34A;
      font-weight: 500;
    }
  }
}

.service-description {
  font-size: 14px;
  line-height: 1.6;
  color: #4B5563;
  margin-bottom: 20px;
  flex: 1;
}

// Stats Grid
.stats-grid {
  display: flex;
  gap: 40px;
  padding-top: 16px;
  border-top: 1px solid #E2E8F0;

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .stat-label {
      font-size: 12px;
      color: #94A3B8;
    }

    .stat-value {
      font-size: 14px;
      font-weight: 500;
      color: #1F2937;

      &.version {
        color: #3B82F6;
      }
    }

    .creator-info {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
}
</style>
