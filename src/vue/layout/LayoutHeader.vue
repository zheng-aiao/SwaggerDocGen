<template>
  <div :class="['srm-header', { isHomeRoute }]">
    <div class="left">
      <Breadcrumb v-if="!isHomeRoute"></Breadcrumb>
    </div>
    <div class="right">
      <NoticeButton></NoticeButton>
      <DispatchButton v-if="verifyAuth('100601')"></DispatchButton>
      <MoreMenu></MoreMenu>
      <ThemeSwitcher v-if="isThemeSwitch() && !isHomeRoute"></ThemeSwitcher>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>
<script setup>
  import { computed } from 'vue'
  import { useStore } from '@/hooks'
  import { appConfig } from '@/config'
  import { verifyAuth } from '@/boot/auth'
  import Breadcrumb from '@/vue/layout/components/Breadcrumb.vue'
  import NoticeButton from '@/vue/layout/components/NoticeButton.vue'
  import DispatchButton from '@/vue/layout/components/DispatchButton.vue'
  import MoreMenu from '@/vue/layout/components/MoreMenu.vue'
  import ThemeSwitcher from '@/vue/layout/components/ThemeSwitcher.vue'
  import UserInfo from '@/vue/layout/components/UserInfo.vue'

  const store = useStore()

  // 是否有主题切换的配置
  const isThemeSwitch = () =>
    Reflect.has(appConfig.value.themeConfig ?? {}, 'styleSwitch')
      ? appConfig.value.themeConfig.styleSwitch
      : true

  // 是否为门户导航页
  const isHomeRoute = computed(() => store.getters['system/isNavigateRouter'])
</script>
<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .srm-header {
    flex: 1;
    height: 100%;
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 pxToRem(24) 0 pxToRem(16);
    border-bottom: pxToRem(1) solid rgba(var(--white), 0.2);

    @include lightTheme {
      border-bottom: pxToRem(1) solid rgba(var(--color), 0.2);
    }

    &.isHomeRoute {
      border: none;
    }

    .left {
      display: flex;
      align-items: center;
    }

    .right {
      @include fontStyle(3);
      width: fit-content;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 16px;
      color: var(--textColor-1);
      margin-left: auto;

      @include lightTheme {
        color: colorValue(color, 1);
      }

      .el-badge__content.is-fixed {
        z-index: 1;
      }
    }
  }
</style>
