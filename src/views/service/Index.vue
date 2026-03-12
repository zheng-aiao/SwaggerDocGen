<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import DataTable from "@/components/businessComponent/DataTable.vue";
import SearchInput from "@/components/basicComponent/SearchInput.vue";
import CreateButton from "@/components/basicComponent/CreateButton.vue";


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
    width: 150,
    align: "center",
    cellClass: "doc-count",
  },
  {
    prop: "latestVersion",
    label: "最新版本",
    width: 150,
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
    width: 150,
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
    width: 200,
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
      { key: "edit", label: "编辑", icon: "Edit", type: "primary" },
      { key: "download", label: "下载", icon: "Download", type: "primary" },
      { key: "upload", label: "上传", icon: "Upload", type: "primary" },
      { key: "history", label: "历史记录", icon: "Clock", type: "primary" },
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
    case "history":
      // 点击历史记录按钮，跳转到文档管理页面
      router.push("/document");
      break;
    case "delete":
      console.log("删除服务:", row);
      break;
  }
};

const handleCreate = () => {
  console.log("新增服务");
  // 这里可以添加新增服务的逻辑，比如打开弹窗或跳转到新增页面
};
</script>

<template>
  <div class="service-page">
    <!-- 操作栏 -->
    <div class="action-row">
      <SearchInput 
        v-model="searchForm.keyword" 
        placeholder="搜索服务名称..."
        @input="handleSearch"
      />
      <CreateButton 
        button-text="新增服务"
        @click="handleCreate"
      />
    </div>

    <!-- 数据表格 -->
    <DataTable
      :config="tableConfig"
      :data="serviceList"
      :pagination="pagination"
      empty-text="暂无服务数据"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
      @action="handleTableAction"
    />
  </div>
</template>

<style scoped lang="scss">
.service-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

/* DataTable组件内部已包含表格单元格样式 */
</style>
