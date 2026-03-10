<template>
  <div class="GlobalModule">
    <!-- 一键调度 -->
    <rd-one-click-dispatch-dialog></rd-one-click-dispatch-dialog>
  </div>
</template>

<script setup>
  // 引入组件
</script>

<style lang="scss">
  @use '@/assets/scss/index' as *; // 在组件挂载的时候再去加载基础样式覆盖组件库内的

  .GlobalModule {
    .rd-one-click-dispatch-dialog-mask {
      .rd-dispatch-common-module-dialog.scifi {
        // 暗色模式下背景色太亮, 迎合本系统设计稿, 叠加一层黑色(类似于本系统的前景色)
        background: linear-gradient(
            180deg,
            rgba(var(--ocdThemeColor), 0.3),
            rgba(var(--ocdThemeColor), 0.05)
          ),
          rgba(var(--black), 0.3);
      }
    }
  }
</style>
