<template>
  <div class="layout-config">
    <LayoutHeader />
    <div class="config-body">
      <LayoutMenu class="config-sidebar" />
      <main class="config-content">
        <router-view />
      </main>
      <aside class="config-preview">
        <div class="preview-header">
          <span class="title">预览区域</span>
        </div>
        <div class="preview-content">
          <slot name="preview">
            <div class="preview-placeholder">
              <em class="iconfont">&#xe6be;</em>
              <span>配置预览</span>
            </div>
          </slot>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import LayoutHeader from './LayoutHeader.vue'
import LayoutMenu from './LayoutMenu.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/scss/rules' as *;

.layout-config {
  @include wh;
  display: flex;
  flex-direction: column;
  background: var(--bgColor);

  .config-body {
    flex: 1;
    display: flex;
    overflow: hidden;

    .config-sidebar {
      flex-shrink: 0;
      width: var(--side-width);
    }

    .config-content {
      flex: 1;
      overflow: auto;
      padding: pxToRem(20);
      background: var(--bgColor);
    }

    .config-preview {
      @include wh(pxToRem(400), 100%);
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      background: var(--foregroundColor);
      border-left: 1px solid var(--foreBorderColor);

      .preview-header {
        @include flexCenter(flex-start, center);
        @include fontStyle(4);
        padding: pxToRem(16) pxToRem(20);
        border-bottom: 1px solid var(--foreBorderColor);
        color: var(--textColor-1);

        .title {
          font-weight: 600;
        }
      }

      .preview-content {
        flex: 1;
        overflow: auto;
        padding: pxToRem(16);

        .preview-placeholder {
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
      }
    }
  }
}
</style>
