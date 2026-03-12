<template>
  <el-breadcrumb separator="/" class="breadcrumb-nav">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbItems"
      :key="index"
      :to="index === breadcrumbItems.length - 1 ? '' : item.path"
    >
      <span>{{ item.name }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbItems = computed(() => {
  // 从路由 matched 生成面包屑，从根路由到当前路由
  return route.matched
    .filter(r => r.name) // 只保留有 name 的路由
    .map(r => ({
      name: r.name,
      path: r.path
    }))
})
</script>

<style scoped lang="scss">
.breadcrumb-nav {
  :deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #64748B;
      font-size: 14px;
      font-weight: 400;

      &.is-link {
        color: #64748B;
        cursor: pointer;

        &:hover {
          color: #3B82F6;
        }
      }
    }

    &:last-child {
      .el-breadcrumb__inner {
        color: #1F2937;
        font-weight: 500;
      }
    }
  }
}
</style>
