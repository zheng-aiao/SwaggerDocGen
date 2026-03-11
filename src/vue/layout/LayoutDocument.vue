<template>
  <div class="layout-document">
    <LayoutHeader />
    <main class="document-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
  import LayoutHeader from './LayoutHeader.vue'
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .layout-document {
    @include wh;
    display: flex;
    flex-direction: column;
    background: var(--bgColor);

    .document-main {
      flex: 1;
      overflow: auto;
      padding: pxToRem(20);
    }
  }
</style>
