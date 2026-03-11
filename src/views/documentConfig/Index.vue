<template>
  <div class="document-config">
    <LayoutHeader />
    <main class="config-main">
      <div class="placeholder">
        <em class="iconfont">&#xe6be;</em>
        <span>配置页面占位</span>
      </div>
    </main>
  </div>
</template>

<script setup>
  import LayoutHeader from '@/vue/layout/LayoutHeader.vue'
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .document-config {
    @include wh;
    display: flex;
    flex-direction: column;
    background: var(--bgColor);
  }

  .config-main {
    flex: 1;
    overflow: auto;
    padding: pxToRem(20);
  }

  .placeholder {
    @include wh;
    @include flexCenter(center, center, true);
    gap: pxToRem(12);
    color: var(--textColor-4);

    .iconfont {
      @include fontStyle(1);
      opacity: 0.5;
    }

    span {
      @include fontStyle(5);
    }
  }
</style>
