<template>
  <div class="document-config-page">
    <div class="config-container">
      <div class="page-header">
        <h1>文档配置</h1>
        <p>配置文档模板和管理规则</p>
      </div>
      <div class="config-content">
        <div class="config-card">
          <h3>模板管理</h3>
          <p>管理文档模板和版本配置</p>
        </div>
        <div class="config-card">
          <h3>权限设置</h3>
          <p>配置文档访问和编辑权限</p>
        </div>
        <div class="config-card">
          <h3>工作流配置</h3>
          <p>设置文档审批和发布流程</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentConfig'
}
</script>

<style scoped>
.document-config-page {
  min-height: 100vh;
  background: var(--bg-gray);
  padding: 24px;
}

.config-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-header p {
  color: var(--text-secondary);
}

.config-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.config-card {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s;
  cursor: pointer;
}

.config-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.config-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.config-card p {
  font-size: 14px;
  color: var(--text-secondary);
}
</style>
