<template>
  <el-breadcrumb class="layoutBreadcrumb" separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">
      <span class="iconfont">&#xe6aa;</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :key="index"
      style="cursor: pointer"
      :to="{ path: item.path }"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from '@/hooks'

  const store = useStore()
  const breadcrumbList = computed(() =>
    store.state.system.activeRouter.matched.reduce((prev, current) => {
      return current.meta.title
        ? [...prev, { title: current.meta.title, path: current.path }]
        : prev
    }, [])
  )
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .layoutBreadcrumb.el-breadcrumb {
    @include flexCenter;

    > .el-breadcrumb__item {
      &:first-child {
        @include flexCenter;
      }

      .el-breadcrumb__separator {
        color: var(--textColor-1);
      }

      .el-breadcrumb__inner {
        @include fontStyle(3);
        color: var(--textColor-1);

        &:has(.iconfont) {
          vertical-align: text-bottom;

          .iconfont {
            font-size: pxToRem(20);
            color: var(--textColor-2);
          }
        }
      }
    }
  }
</style>
