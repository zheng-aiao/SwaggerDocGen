<template>
  <div class="breadcrumb-section">
    <el-breadcrumb separator="/" class="breadcrumb-nav">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbItems"
        :key="index"
        :to="index === breadcrumbItems.length - 1 ? '' : item.path"
      >
        <el-icon v-if="index === 0 && computedShowIcon" class="breadcrumb-icon">
          <Folder />
        </el-icon>
        <span>{{ item.name }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-button v-if="computedShowBack" class="back-btn" @click="handleBack">
      <el-icon><ArrowLeft /></el-icon>
      {{ computedBackName }}
    </el-button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  showBack: {
    type: Boolean,
    default: undefined,
  },
  showIcon: {
    type: Boolean,
    default: undefined,
  },
  backPath: {
    type: String,
    default: "",
  },
  backName: {
    type: String,
    default: "返回",
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["back"]);

const route = useRoute();
const router = useRouter();

const breadcrumbItems = computed(() => {
  if (props.items.length > 0) {
    return props.items;
  }
  return route.matched
    .filter((r) => r.name)
    .map((r) => ({
      name: r.name,
      path: r.path,
    }));
});

const computedShowBack = computed(() => {
  if (props.showBack !== undefined) {
    return props.showBack;
  }
  return route.meta?.showBack ?? false;
});

const computedShowIcon = computed(() => {
  if (props.showIcon !== undefined) {
    return props.showIcon;
  }
  return route.meta?.showIcon ?? false;
});

const computedBackPath = computed(() => {
  if (props.backPath) {
    return props.backPath;
  }
  return route.meta?.backPath ?? "";
});

const computedBackName = computed(() => {
  return route.meta?.backName ?? props.backName;
});

const handleBack = () => {
  if (computedBackPath.value) {
    router.push(computedBackPath.value);
  } else {
    router.back();
  }
  emit("back");
};
</script>

<style scoped lang="scss">
.breadcrumb-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  min-height: 60px;
  max-height: 60px;
  flex-shrink: 0;
  box-sizing: border-box;
  border-bottom: 1px solid #e2e8f0;

  .breadcrumb-icon {
    margin-right: 4px;
    vertical-align: middle;
  }

  .breadcrumb-nav {
    :deep(.el-breadcrumb__item) {
      .el-breadcrumb__inner {
        display: flex;
        align-items: center;
        color: #64748b;
        font-size: 14px;
        font-weight: 400;

        &.is-link {
          color: #64748b;
          cursor: pointer;

          &:hover {
            color: #3b82f6;
          }
        }
      }

      &:last-child {
        .el-breadcrumb__inner {
          color: #1f2937;
          font-weight: 500;
        }
      }
    }
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: auto;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1;
    color: #64748b;
    background: transparent;
    border: none;
    box-sizing: border-box;

    &:hover {
      color: #0f78f0;
      background: #f0f7ff;
    }
  }
}
</style>
