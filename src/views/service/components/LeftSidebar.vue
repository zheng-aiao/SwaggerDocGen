<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "分类",
  },
  categoryList: {
    type: Array,
    default: () => [],
  },
});

const activeCategory = ref("all");

const handleCategoryClick = (category) => {
  activeCategory.value = category.id;
};
</script>

<template>
  <aside class="left-sidebar-inner">
    <div class="sidebar-header">
      <h3 class="sidebar-title">{{ title }}</h3>
    </div>
    <nav class="category-list">
      <div
        v-for="category in categoryList"
        :key="category.id"
        class="category-item"
        :class="{ active: activeCategory === category.id }"
        @click="handleCategoryClick(category)"
      >
        <span class="category-name">{{ category.name }}</span>
        <span class="category-count">{{ category.count }}</span>
      </div>
    </nav>
    <div class="sidebar-footer">
      <slot name="footer"></slot>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.left-sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px 0;

  .sidebar-header {
    padding: 0 16px 16px;

    .sidebar-title {
      font-size: 12px;
      font-weight: 600;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0;
    }
  }

  .category-list {
    flex: 1;
    overflow-y: auto;

    .category-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      margin: 0 8px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #f8fafc;
      }

      &.active {
        background: #f0f7ff;

        .category-name {
          color: #3b82f6;
          font-weight: 500;
        }

        .category-count {
          background: #3b82f6;
          color: #ffffff;
        }
      }

      .category-name {
        font-size: 14px;
        color: #4b5563;
      }

      .category-count {
        font-size: 12px;
        color: #64748b;
        background: #f1f5f9;
        padding: 2px 8px;
        border-radius: 10px;
        min-width: 24px;
        text-align: center;
      }
    }
  }

  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid #f1f5f9;
  }
}
</style>
