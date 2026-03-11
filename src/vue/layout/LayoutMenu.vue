<template>
  <aside class="layout-menu">
    <div class="menu-header">
      <span class="title">配置项</span>
    </div>
    <el-menu :default-active="activeMenu" router class="menu-list">
      <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
        <em class="iconfont" v-html="item.icon"></em>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const menuItems = [
    { name: '基础配置', path: '/config/basic', icon: '&#xe6b5;' },
    { name: '接口配置', path: '/config/api', icon: '&#xe6b6;' },
    { name: '模板配置', path: '/config/template', icon: '&#xe6b7;' },
    { name: '导出配置', path: '/config/export', icon: '&#xe6b8;' }
  ]

  const activeMenu = computed(() => route.path)
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .layout-menu {
    @include wh(100%, 100%);
    display: flex;
    flex-direction: column;
    background: var(--foregroundColor);
    border-right: 1px solid var(--foreBorderColor);

    .menu-header {
      @include flexCenter(flex-start, center);
      @include fontStyle(4);
      padding: pxToRem(16) pxToRem(20);
      border-bottom: 1px solid var(--foreBorderColor);
      color: var(--textColor-1);

      .title {
        font-weight: 600;
      }
    }

    .menu-list {
      flex: 1;
      border-right: none;
      padding: pxToRem(8) 0;

      :deep(.el-menu-item) {
        @include fontStyle(5);
        height: pxToRem(48);
        line-height: pxToRem(48);
        color: var(--textColor-2);
        padding-left: pxToRem(20) !important;

        .iconfont {
          margin-right: pxToRem(8);
          @include fontStyle(3);
        }

        &:hover {
          background: colorValue(color, 0.05);
        }

        &.is-active {
          background: colorValue(color, 0.1);
          color: colorValue(color, 1);
          border-right: 2px solid colorValue(color, 1);

          .iconfont {
            color: colorValue(color, 1);
          }
        }
      }
    }
  }
</style>
