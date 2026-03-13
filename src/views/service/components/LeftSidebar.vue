<script setup>
import { ref, nextTick } from "vue";

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

const emit = defineEmits(["add-category"]);

const activeCategory = ref("all");
const isAddingCategory = ref(false);
const newCategoryName = ref("");
const inputRef = ref(null);

const handleCategoryClick = (category) => {
  activeCategory.value = category.id;
};

const handleAddClick = () => {
  isAddingCategory.value = true;
  newCategoryName.value = "";
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const handleConfirmAdd = () => {
  const name = newCategoryName.value.trim();
  if (name) {
    emit("add-category", {
      id: `category_${Date.now()}`,
      name,
      count: 0,
    });
  }
  isAddingCategory.value = false;
  newCategoryName.value = "";
};

const handleCancelAdd = () => {
  isAddingCategory.value = false;
  newCategoryName.value = "";
};

const handleInputKeydown = (e) => {
  if (e.key === "Enter") {
    handleConfirmAdd();
  } else if (e.key === "Escape") {
    handleCancelAdd();
  }
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

    <!-- 新增分类输入框 -->
    <div v-if="isAddingCategory" class="add-category-input-wrapper">
      <div class="add-category-input-container">
        <div class="input-section">
          <svg class="folder-icon" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 4C2 3.44772 2.44772 3 3 3H6L8 5H13C13.5523 5 14 5.44772 14 6V12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12V4Z"
              fill="currentColor"
            />
          </svg>
          <input
            ref="inputRef"
            v-model="newCategoryName"
            type="text"
            placeholder="分类名称..."
            class="category-input"
            @keydown="handleInputKeydown"
          />
        </div>
        <div class="action-buttons">
          <button class="btn-confirm" @click="handleConfirmAdd">
            <svg viewBox="0 0 12 10" fill="none">
              <path
                d="M1 5L4 8L11 1"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button class="btn-cancel" @click="handleCancelAdd">
            <svg viewBox="0 0 10 10" fill="none">
              <path
                d="M1 1L9 9M9 1L1 9"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
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

// 新增分类输入框样式
.add-category-input-wrapper {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 1);

  .add-category-input-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(15, 120, 240, 0.3);
    border-radius: 8px;

    .input-section {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      flex: 1;

      .folder-icon {
        width: 13.33px;
        height: 16.67px;
        color: rgba(15, 120, 240, 1);
        flex-shrink: 0;
      }

      .category-input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        font-size: 14px;
        font-family: "WenQuanYi Zen Hei-Medium", sans-serif;
        font-weight: 400;
        color: rgba(17, 24, 39, 1);

        &::placeholder {
          color: rgba(148, 163, 184, 1);
        }
      }
    }

    .action-buttons {
      display: flex;
      flex-direction: row;
      gap: 6px;
      align-items: center;

      .btn-confirm,
      .btn-cancel {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;

        svg {
          width: 12px;
          height: 12px;
        }
      }

      .btn-confirm {
        background: rgba(15, 120, 240, 1);
        color: white;

        &:hover {
          background: rgba(14, 109, 218, 1);
        }
      }

      .btn-cancel {
        background: transparent;
        color: rgba(100, 116, 139, 1);

        &:hover {
          background: rgba(241, 245, 249, 1);
          color: rgba(71, 85, 105, 1);
        }
      }
    }
  }
}
</style>
