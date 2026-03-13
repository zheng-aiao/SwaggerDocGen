<template>
  <aside class="config-sidebar">
    <div class="sidebar-header">
      <h3 class="sidebar-title">文档配置</h3>
    </div>
    <nav class="config-nav">
      <router-link
        v-for="item in configList"
        :key="item.id"
        :to="item.path"
        class="config-item"
        :class="{ active: isActive(item.id) }"
      >
        <div class="config-icon">
          <el-icon :size="20">
            <component :is="item.icon" />
          </el-icon>
        </div>
        <span class="config-name">{{ item.name }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  activeId: {
    type: String,
    default: "cover",
  },
});

const emit = defineEmits(["change"]);

const configList = [
  { id: "cover", name: "封面样式", icon: "Document", path: "/config/cover" },
  { id: "catalog", name: "目录样式", icon: "List", path: "/config/catalog" },
  {
    id: "header-footer",
    name: "页眉页脚",
    icon: "DocumentCopy",
    path: "/config/header-footer",
  },
  { id: "content", name: "正文样式", icon: "EditPen", path: "/config/content" },
];

const isActive = (id) => {
  return route.path.includes(id);
};
</script>

<style scoped lang="scss">
.config-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;

  .sidebar-header {
    padding: 24px 20px 16px;
    border-bottom: 1px solid #f1f5f9;

    .sidebar-title {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }
  }

  .config-nav {
    flex: 1;
    padding: 12px 0;

    .config-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      margin: 4px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      color: inherit;

      &:hover {
        background: #f8fafc;
      }

      &.active {
        background: #f0f7ff;

        .config-icon {
          color: #3b82f6;
        }

        .config-name {
          color: #3b82f6;
          font-weight: 500;
        }
      }

      .config-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: #f1f5f9;
        color: #64748b;
        transition: all 0.2s;
      }

      .config-name {
        font-size: 14px;
        color: #4b5563;
        transition: all 0.2s;
      }
    }
  }
}
</style>
