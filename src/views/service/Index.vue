<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import LeftSidebar from "@/layout/LeftSidebar.vue";
import DataTable from "@/components/DataTable.vue";

const router = useRouter();

const searchForm = ref({
  keyword: "",
});

const serviceList = ref([
  {
    id: 1,
    name: "srm基础服务",
    category: "srm系统",
    description:
      "该服务涵盖了所有核心业务逻辑的API定义与调用规范。主要包括用户鉴权、订单处理、库存同步及第三方支付集成接口。",
    docCount: 15,
    latestVersion: "v2.4.0",
    lastUpdate: "2023-10-24",
    creator: "张管理",
    status: "published",
  },
  {
    id: 2,
    name: "srm认证服务",
    category: "srm系统",
    description:
      "提供统一的身份认证和授权服务，支持OAuth2.0、JWT等多种认证方式，确保系统安全访问。",
    docCount: 8,
    latestVersion: "v2.3.1",
    lastUpdate: "2023-10-20",
    creator: "李开发",
    status: "published",
  },
  {
    id: 3,
    name: "srm订单服务",
    category: "srm系统",
    description:
      "处理订单全生命周期管理，包括订单创建、支付、发货、退款等流程的API接口。",
    docCount: 12,
    latestVersion: "v2.3.0",
    lastUpdate: "2023-10-15",
    creator: "王架构",
    status: "draft",
  },
  {
    id: 4,
    name: "srm库存服务",
    category: "srm系统",
    description:
      "实时库存管理与同步服务，支持多仓库、多SKU的库存查询、扣减、回滚等操作。",
    docCount: 6,
    latestVersion: "v2.2.5",
    lastUpdate: "2023-10-10",
    creator: "赵运维",
    status: "published",
  },
  {
    id: 5,
    name: "srm支付服务",
    category: "srm系统",
    description:
      "集成多种支付渠道，提供统一的支付接口，支持微信支付、支付宝、银联等支付方式。",
    docCount: 10,
    latestVersion: "v2.2.0",
    lastUpdate: "2023-10-05",
    creator: "钱支付",
    status: "published",
  },
]);

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 5,
  pageSizes: [10, 20, 50],
});

const tableConfig = computed(() => [
  {
    prop: "name",
    label: "服务名称",
    minWidth: 100,
    cellClass: "name-text",
  },
  {
    prop: "docCount",
    label: "文档数量",
    width: 100,
    align: "center",
    cellClass: "doc-count",
  },
  {
    prop: "latestVersion",
    label: "最新版本",
    width: 100,
    align: "center",
    tag: {
      type: "info",
      size: "small",
      class: "version-tag",
    },
  },
  {
    prop: "category",
    label: "所属分类",
    width: 100,
    align: "center",
    cellClass: "category-text",
  },
  {
    prop: "description",
    label: "服务描述",
    minWidth: 240,
    cellClass: "desc-text",
  },
  {
    prop: "lastUpdate",
    label: "最近更新时间",
    width: 140,
    align: "center",
    cellClass: "time-text",
  },
  {
    prop: "actions",
    label: "操作",
    width: 240,
    align: "center",
    fixed: "right",
    actions: [
      { key: "view", label: "查看", icon: "View", type: "primary" },
      { key: "edit", label: "编辑", icon: "Edit", type: "primary" },
      { key: "copy", label: "复制", icon: "CopyDocument", type: "primary" },
      { key: "delete", label: "删除", icon: "Delete", type: "danger" },
    ],
  },
]);

const handleSearch = () => {
  console.log("搜索:", searchForm.value);
};

const handlePageChange = (page) => {
  pagination.value.currentPage = page;
};

const handleSizeChange = (size) => {
  pagination.value.pageSize = size;
};

const handleTableAction = ({ action, row }) => {
  switch (action) {
    case "view":
      router.push("/service");
      break;
    case "edit":
      console.log("编辑服务:", row);
      break;
    case "copy":
      console.log("复制服务:", row);
      break;
    case "delete":
      console.log("删除服务:", row);
      break;
  }
};
</script>

<template>
  <div class="service-manage-page">
    <LeftSidebar
      title="服务分类"
      :category-list="[
        { id: 'all', name: '全部服务', count: 12 },
        { id: 'srm', name: 'SRM系统', count: 5 },
        { id: 'erp', name: 'ERP系统', count: 3 },
        { id: 'crm', name: 'CRM系统', count: 2 },
        { id: 'other', name: '其他服务', count: 2 },
      ]"
    >
      <template #footer>
        <el-button class="add-category-btn" text>
          <el-icon><Plus /></el-icon>
          新增分类
        </el-button>
      </template>
    </LeftSidebar>

    <main class="right-content">
      <div class="breadcrumb-wrapper">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <el-icon class="breadcrumb-icon"><Folder /></el-icon>
            <span>文档管理</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>全部服务</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="action-row">
        <div class="search-box">
          <el-input
            v-model="searchForm.keyword"
            placeholder="搜索服务名称..."
            clearable
            class="search-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
        <el-button type="primary" class="create-btn">
          <el-icon><Plus /></el-icon>
          新增服务
        </el-button>
      </div>

      <DataTable
        :config="tableConfig"
        :data="serviceList"
        :pagination="pagination"
        empty-text="暂无服务数据"
        @page-change="handlePageChange"
        @size-change="handleSizeChange"
        @action="handleTableAction"
      />
    </main>
  </div>
</template>

<style scoped lang="scss">
.service-manage-page {
  display: flex;
  width: 100%;
  height: 100%;
}

:deep(.left-sidebar) {
  width: 20%;
}

.right-content {
  width: 80%;
  overflow-y: auto;
  padding: 24px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.breadcrumb-wrapper {
  .breadcrumb-icon {
    margin-right: 4px;
    vertical-align: middle;
  }

  :deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
      display: flex;
      align-items: center;
      color: #64748b;
      font-size: 14px;

      &:hover {
        color: #3b82f6;
      }
    }

    &:last-child .el-breadcrumb__inner {
      color: #1f2937;
      font-weight: 500;
    }
  }
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search-box {
    width: 320px;

    .search-input {
      :deep(.el-input__wrapper) {
        border-radius: 8px;
        box-shadow: 0 0 0 1px #e2e8f0 inset;

        &:hover,
        &.is-focus {
          box-shadow: 0 0 0 1px #3b82f6 inset;
        }
      }
    }
  }

  .create-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    background: #3b82f6;
    border: none;
    border-radius: 8px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;

    &:hover {
      background: #2563eb;
    }
  }
}

:deep(.data-table-wrapper) {
  flex: 1;
  min-height: 0;

  .name-text {
    font-weight: 500;
    color: #1f2937;
  }

  .doc-count {
    color: #3b82f6;
    font-weight: 500;
  }

  .version-tag {
    background: #dbeafe;
    color: #3b82f6;
    border: none;
  }

  .category-text {
    color: #64748b;
  }

  .desc-text {
    color: #64748b;
    font-size: 13px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .time-text {
    color: #64748b;
    font-size: 13px;
  }
}
</style>
