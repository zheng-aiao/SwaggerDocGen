<template>
  <header class="layout-header">
    <div class="header-left">
      <div class="logo">
        <img v-if="systemIcon" :src="systemIcon" class="system-icon" alt="logo" />
        <span class="system-title">{{ title }}</span>
      </div>
      <nav class="primary-nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="['nav-item', { active: isActive(item.path) }]"
        >
          <em class="iconfont" v-html="item.icon"></em>
          <span>{{ item.name }}</span>
        </router-link>
      </nav>
    </div>
    <div class="header-right">
      <ThemeSwitcher />
      <UserInfo />
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import UserInfo from './components/UserInfo.vue'

const route = useRoute()

const systemIcon = ref('')
const title = ref('SwaggerDocGen')

const navItems = [
  { name: '文档管理', path: '/document', icon: '&#xe6aa;' },
  { name: '文档配置', path: '/config', icon: '&#xe6b5;' }
]

const isActive = computed(() => (path) => {
  return route.path.startsWith(path)
})

onMounted(() => {
  const iconLink = document.querySelector('link[rel*="icon"]')
  if (iconLink) {
    systemIcon.value = iconLink.href
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/rules' as *;

.layout-header {
  @include flexCenter(space-between, center);
  height: var(--header-height);
  padding: 0 pxToRem(24);
  background: var(--foregroundColor);
  border-bottom: 1px solid var(--foreBorderColor);
  box-shadow: var(--foreShadowColor);

  .header-left {
    @include flexCenter(flex-start, center);
    gap: pxToRem(32);
    height: 100%;

    .logo {
      @include flexCenter(flex-start, center);
      gap: pxToRem(8);
      height: 100%;

      .system-icon {
        width: pxToRem(28);
        height: pxToRem(28);
      }

      .system-title {
        @include fontStyle(2);
        color: var(--textColor-1);
        font-weight: 700;
        white-space: nowrap;
      }
    }

    .primary-nav {
      @include flexCenter(flex-start, center);
      gap: pxToRem(4);
      height: 100%;

      .nav-item {
        @include flexCenter(center, center);
        gap: pxToRem(8);
        height: 100%;
        padding: 0 pxToRem(20);
        color: var(--textColor-2);
        text-decoration: none;
        position: relative;
        transition: all var(--duration);

        .iconfont {
          @include fontStyle(3);
        }

        span {
          @include fontStyle(5);
          font-weight: 500;
        }

        &:hover {
          color: var(--textColor-1);
          background: colorValue(color, 0.05);
        }

        &.active {
          color: colorValue(color, 1);

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: pxToRem(40);
            height: 2px;
            background: colorValue(color, 1);
            border-radius: 1px;
          }

          .iconfont {
            color: colorValue(color, 1);
          }
        }
      }
    }
  }

  .header-right {
    @include flexCenter(flex-end, center);
    gap: pxToRem(16);
  }
}
</style>
