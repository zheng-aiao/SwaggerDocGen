<template>
  <header class="layout-header">
    <div class="header-left">
      <LogoTitle />
      <PrimaryNav :items="navItems" />
    </div>
    <HeaderRight />
  </header>
</template>

<script setup>
  import { ref } from 'vue'
  import LogoTitle from './components/LogoTitle.vue'
  import PrimaryNav from './components/PrimaryNav.vue'
  import HeaderRight from './components/HeaderRight.vue'

  const title = ref('SwaggerDocGen')

  const navItems = [
    { name: '文档管理', path: '/document-manage', icon: '&#xe6aa;' },
    { name: '文档配置', path: '/document-config', icon: '&#xe6b5;' }
  ]
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
    }
  }
</style>
