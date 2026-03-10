<template>
  <div class="layout-logo">
    <img
      v-if="systemIcon"
      :src="systemIcon"
      :style="systemStyle"
      class="system-icon"
      alt="系统图标"
    />
    <div class="system-title">{{ getTitle() }}</div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { appConfig } from '@/config'

  const systemIcon = ref('') // 系统图标

  const systemStyle = ref('') // logo 样式

  onMounted(() => {
    systemIcon.value = document.querySelector('link[rel*="icon"]').href
    systemStyle.value = appConfig.value?.systemStyle ?? ''
  })

  const getTitle = () => window.adminTitle ?? '安全风险智能管控平台'
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .layout-logo {
    @include flexCenter(left);
    @include wh(fit-content, var(--headerHeight));
    min-width: var(--side-width);

    gap: 8px;
    padding-left: 20px;

    border-bottom: pxToRem(1) solid rgba(var(--white), 0.2);

    @include lightTheme {
      border-bottom: pxToRem(1) solid rgba(var(--color), 0.2);
    }

    .system-icon {
      min-width: pxToRem(28);
      min-height: pxToRem(28);
      max-height: pxToRem(40);
    }

    .system-title {
      @include fontStyle(1);
      color: var(--textColor-1);
    }
  }
</style>
