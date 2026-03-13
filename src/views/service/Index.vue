<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import RdappTable from "@/components/businessComponent/RdappTable.vue";
import RdappInput from "@/components/basicComponent/RdappInput.vue";
import RdappButton from "@/components/basicComponent/RdappButton.vue";
import RdappNav from "@/components/businessComponent/RdappNav.vue";
import LeftSidebar from "./components/LeftSidebar.vue";
import ServiceDialog from "./dialog/ServiceDialog.vue";
import OnlinePreviewDialog from "./dialog/OnlinePreviewDialog.vue";
import DeleteServiceDialog from "./dialog/DeleteServiceDialog.vue";
import DownloadDialog from "./dialog/DownloadDialog.vue";
import PublishDocumentDialog from "@/views/document/dialog/PublishDocumentDialog.vue";

const router = useRouter();

const dialogVisible = ref(false);
const dialogMode = ref("create");
const dialogServiceData = ref({});
const previewVisible = ref(false);
const deleteVisible = ref(false);
const downloadVisible = ref(false);
const publishVisible = ref(false);
const currentService = ref(null);

const categoryList = ref([
  { id: "srm", name: "SRM系统" },
  { id: "erp", name: "ERP系统" },
  { id: "crm", name: "CRM系统" },
  { id: "other", name: "其他服务" },
]);

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
    width: 300,
    align: "center",
    fixed: "right",
    actions: [
      { key: "preview", label: "预览", icon: "View", type: "primary" },
      { key: "edit", label: "编辑", icon: "Edit", type: "primary" },
      { key: "download", label: "下载", icon: "Download", type: "primary" },
      { key: "upload", label: "发布", icon: "Upload", type: "primary" },
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
    case "preview":
      currentService.value = row;
      previewVisible.value = true;
      break;
    case "edit":
      dialogMode.value = "edit";
      dialogServiceData.value = { ...row };
      dialogVisible.value = true;
      break;
    case "history":
      router.push("/service/document");
      break;
    case "download":
      currentService.value = row;
      downloadVisible.value = true;
      break;
    case "upload":
      currentService.value = row;
      publishVisible.value = true;
      break;
    case "delete":
      currentService.value = row;
      deleteVisible.value = true;
      break;
  }
};

const handleCreate = () => {
  dialogMode.value = "create";
  dialogServiceData.value = {};
  dialogVisible.value = true;
};

const handleSubmit = (formData) => {
  console.log("提交服务:", formData);
};

const handleDeleteConfirm = () => {
  console.log("确认删除服务:", currentService.value);
};

const handleDownloadConfirm = (downloadData) => {
  console.log("确认下载:", downloadData);
};

const handlePublishConfirm = (publishData) => {
  console.log("确认发布:", publishData);
};
</script>

<template>
  <div class="page-container">
    <!-- 左侧导航栏 -->
    <div class="left-sidebar">
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
    </div>

    <div class="right-content">
      <!-- 面包屑导航 -->
      <RdappNav />
      <!-- 操作栏 -->
      <div class="action-row">
        <RdappInput
          v-model="searchForm.keyword"
          placeholder="搜索服务名称..."
          @input="handleSearch"
        />
        <RdappButton type="create" text="新增服务" @click="handleCreate" />
      </div>

      <RdappTable
        :config="tableConfig"
        :data="serviceList"
        :pagination="pagination"
        empty-text="暂无服务数据"
        @page-change="handlePageChange"
        @size-change="handleSizeChange"
        @action="handleTableAction"
      />
    </div>

    <ServiceDialog
      v-model="dialogVisible"
      :mode="dialogMode"
      :category-list="categoryList"
      :service-data="dialogServiceData"
      @submit="handleSubmit"
    />

    <OnlinePreviewDialog
      v-model="previewVisible"
      :service-data="currentService"
    />

    <DeleteServiceDialog
      v-model="deleteVisible"
      :service-name="currentService?.name || ''"
      @confirm="handleDeleteConfirm"
    />

    <DownloadDialog
      v-model="downloadVisible"
      :service-data="currentService"
      @confirm="handleDownloadConfirm"
    />

    <PublishDocumentDialog
      v-model="publishVisible"
      @confirm="handlePublishConfirm"
    />
  </div>
</template>

<style scoped lang="scss">
.add-category-btn {
  width: 100%;
  justify-content: center;
  color: #64748b;
  border: 1px dashed #e2e8f0;
  border-radius: 6px;
  padding: 8px;

  &:hover {
    color: #3b82f6;
    border-color: #3b82f6;
  }

  .el-icon {
    margin-right: 4px;
  }
}
</style>
