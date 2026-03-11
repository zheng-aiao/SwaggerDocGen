<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '分类'
  },
  categoryList: {
    type: Array,
    default: () => []
  }
})

const activeCategory = ref('all')

const handleCategoryClick = (category) => {
  activeCategory.value = category.id
}
</script>

<template>
  <aside class="left-sidebar">
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
      <slot name="footer">
        <!-- 默认插槽内容 -->
      </slot>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.left-sidebar {
  width: 20%;
  min-width: 200px;
  background: #FFFFFF;
  border-right: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  height: 100%;

  .sidebar-header {
    padding: 0 16px 16px;

    .sidebar-title {
      font-size: 12px;
      font-weight: 600;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
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
        background: #F8FAFC;
      }

      &.active {
        background: #F0F7FF;

        .category-name {
          color: #3B82F6;
          font-weight: 500;
        }

        .category-count {
          background: #3B82F6;
          color: #FFFFFF;
        }
      }

      .category-name {
        font-size: 14px;
        color: #4B5563;
      }

      .category-count {
        font-size: 12px;
        color: #64748B;
        background: #F1F5F9;
        padding: 2px 8px;
        border-radius: 10px;
        min-width: 24px;
        text-align: center;
      }
    }
  }

  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid #F1F5F9;
  }
}
</style>
