<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 主导航菜单
const mainNavItems = [
  { id: 'home', name: '首页', path: '/service' },
  { id: 'service', name: '服务管理', path: '/service' },
  { id: 'docs', name: '文档生成配置', path: '/config' }
]

const activeNav = ref('home')

const handleNavClick = (item) => {
  activeNav.value = item.id
  router.push(item.path)
}

// 用户菜单
const handleCommand = (command) => {
  console.log('用户操作:', command)
}
</script>

<template>
  <header class="top-header">
    <div class="header-left">
      <!-- Logo -->
      <div class="logo" @click="router.push('/document')">
        <div class="logo-icon">
          <el-icon :size="24" color="#FFFFFF"><Document /></el-icon>
        </div>
        <span class="logo-text">文档管理</span>
      </div>
      
      <!-- Main Navigation -->
      <nav class="header-nav">
        <div 
          v-for="item in mainNavItems" 
          :key="item.id"
          class="nav-item"
          :class="{ active: activeNav === item.id }"
          @click="handleNavClick(item)"
        >
          {{ item.name }}
        </div>
      </nav>
    </div>
    
    <!-- Header Right -->
    <div class="header-right">
      <el-button class="header-btn" circle>
        <el-icon :size="18"><Bell /></el-icon>
      </el-button>
      <el-button class="header-btn" circle>
        <el-icon :size="18"><QuestionFilled /></el-icon>
      </el-button>
      
      <!-- User Dropdown -->
      <el-dropdown @command="handleCommand" trigger="click">
        <div class="user-info">
          <el-avatar :size="32" icon="UserFilled" />
          <el-icon class="dropdown-icon"><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="settings">账号设置</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<style scoped lang="scss">
.top-header {
  height: 64px;
  background: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  .header-left {
    display: flex;
    align-items: center;
    gap: 48px;

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;

      .logo-icon {
        width: 36px;
        height: 36px;
        background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .logo-text {
        font-size: 18px;
        font-weight: 600;
        color: #1F2937;
      }

      &:hover {
        .logo-text {
          color: #3B82F6;
        }
      }
    }

    .header-nav {
      display: flex;
      align-items: center;
      gap: 8px;

      .nav-item {
        padding: 8px 16px;
        font-size: 14px;
        color: #64748B;
        cursor: pointer;
        border-radius: 6px;
        transition: all 0.2s;

        &:hover {
          color: #3B82F6;
          background: #F0F7FF;
        }

        &.active {
          color: #3B82F6;
          font-weight: 500;
        }
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;

    .header-btn {
      width: 36px;
      height: 36px;
      border: none;
      background: transparent;
      color: #64748B;

      &:hover {
        color: #3B82F6;
        background: #F0F7FF;
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-left: 8px;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;

      &:hover {
        background: #F8FAFC;
      }

      .dropdown-icon {
        font-size: 12px;
        color: #94A3B8;
      }
    }
  }
}
</style>
