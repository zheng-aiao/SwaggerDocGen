<template>
  <div class="page-container">
    <div class="content-wrapper">
      <RdappNav />

      <RdappCard
        :name="serviceInfo.name"
        :category="serviceInfo.category"
        :description="serviceInfo.description"
        :icon="serviceInfo.icon"
        :stats="serviceInfo.stats"
      />

      <RdappTable
        :config="tableConfig"
        :data="documentList"
        :pagination="pagination"
        empty-text="暂无文档数据"
        @page-change="handlePageChange"
        @size-change="handleSizeChange"
        @action="handleTableAction"
      >
        <template #header>
          <div class="header-left">
            <h3 class="table-title">服务文档</h3>
            <span class="table-count">共 {{ pagination.total }} 条</span>
          </div>
          <RdappButton @click="handlePublish">
            <el-icon><Upload /></el-icon>
            发布新文档
          </RdappButton>
        </template>
      </RdappTable>

      <!-- 下载文档弹窗 -->
      <DownloadDocumentDialog
        v-model="downloadVisible"
        :document-data="currentDocument"
        @confirm="handleDownloadConfirm"
      />

      <!-- 编辑文档弹窗 -->
      <EditDocumentDialog
        v-model="editVisible"
        :document-data="currentDocument"
        @confirm="handleEditConfirm"
      />

      <!-- 删除文档弹窗 -->
      <DeleteDocumentDialog
        v-model="deleteVisible"
        :document-name="currentDocument.name"
        @confirm="handleDeleteConfirm"
      />

      <!-- 发布文档弹窗 -->
      <PublishDocumentDialog
        v-model="publishVisible"
        @confirm="handlePublishConfirm"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import RdappCard from "@/components/businessComponent/RdappCard.vue";
import RdappTable from "@/components/businessComponent/RdappTable.vue";
import RdappButton from "@/components/basicComponent/RdappButton.vue";
import RdappNav from "@/components/businessComponent/RdappNav.vue";
import EditDocumentDialog from "./dialog/EditDocumentDialog.vue";
import DeleteDocumentDialog from "./dialog/DeleteDocumentDialog.vue";
import PublishDocumentDialog from "./dialog/PublishDocumentDialog.vue";
import DownloadDocumentDialog from "./dialog/DownloadDocumentDialog.vue";

const serviceInfo = ref({
  name: "srm基础服务",
  category: "srm系统",
  description:
    "该服务涵盖了所有核心业务逻辑的API定义与调用规范。主要包括用户鉴权、订单处理、库存同步及第三方支付集成接口。开发者需严格遵守本规范进行系统间调用，确保数据一致性与安全性。",
  icon: "Document",
  stats: [
    { label: "文档总数", value: "15 份" },
    { label: "最新版本", value: "v2.4.0" },
    { label: "最后更新", value: "2023-10-24" },
    { label: "创建者", value: "张管理", type: "creator" },
  ],
});

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 15,
  pageSizes: [10, 20, 50],
});

const documentList = ref([
  {
    id: 1,
    name: "用户鉴权API规范.pdf",
    version: "v2.4.0",
    publisher: "李研发",
    publishTime: "2023-10-24 14:20",
    description: "新增OAuth2.0令牌刷新机制，优化鉴权流程",
  },
  {
    id: 2,
    name: "订单处理接口文档.pdf",
    version: "v2.3.1",
    publisher: "王架构",
    publishTime: "2023-10-20 10:15",
    description: "修复订单状态同步问题，新增批量查询接口",
  },
  {
    id: 3,
    name: "库存同步API说明.pdf",
    version: "v2.3.0",
    publisher: "张管理",
    publishTime: "2023-10-15 16:45",
    description: "优化库存扣减逻辑，支持多仓库同步",
  },
  {
    id: 4,
    name: "支付集成接口规范.pdf",
    version: "v2.2.5",
    publisher: "赵运维",
    publishTime: "2023-10-10 09:20",
    description: "新增银联支付渠道，修复回调通知问题",
  },
  {
    id: 5,
    name: "第三方接口对接指南.pdf",
    version: "v2.2.0",
    publisher: "钱支付",
    publishTime: "2023-10-05 14:00",
    description: "完善第三方接入流程，新增签名验证说明",
  },
]);

// 弹窗状态
const downloadVisible = ref(false);
const editVisible = ref(false);
const deleteVisible = ref(false);
const publishVisible = ref(false);
const currentDocument = ref({});

const tableConfig = computed(() => [
  {
    prop: "name",
    label: "文档名称",
    minWidth: 100,
    cellClass: "doc-name",
  },
  {
    prop: "version",
    label: "版本号",
    width: 120,
    align: "center",
    tag: { type: "info", size: "small", class: "version-tag" },
  },
  {
    prop: "publisher",
    label: "发布人",
    width: 120,
    align: "center",
    cellClass: "publisher-text",
  },
  {
    prop: "publishTime",
    label: "发布时间",
    width: 200,
    align: "center",
    cellClass: "time-text",
  },
  {
    prop: "description",
    label: "发布说明",
    minWidth: 200,
    cellClass: "desc-text",
  },
  {
    prop: "actions",
    label: "操作",
    width: 200,
    align: "center",
    fixed: "right",
    actions: [
      { key: "download", label: "下载", icon: "Download", type: "primary" },
      { key: "edit", label: "编辑", icon: "Edit", type: "primary" },
      { key: "delete", label: "删除", icon: "Delete", type: "danger" },
    ],
  },
]);

const handlePublish = () => {
  publishVisible.value = true;
};

const handlePageChange = (page) => {
  pagination.value.currentPage = page;
};

const handleSizeChange = (size) => {
  pagination.value.pageSize = size;
};

const handleTableAction = ({ action, row }) => {
  currentDocument.value = row;
  switch (action) {
    case "download":
      downloadVisible.value = true;
      break;
    case "edit":
      editVisible.value = true;
      break;
    case "delete":
      deleteVisible.value = true;
      break;
  }
};

// 下载文档处理
const handleDownloadConfirm = (data) => {
  console.log("确认下载文档:", currentDocument.value, data);
  downloadVisible.value = false;
};

// 编辑文档处理
const handleEditConfirm = (data) => {
  console.log("确认编辑文档:", data);
  // 在实际项目中，这里会调用API更新文档
  const index = documentList.value.findIndex((item) => item.id === data.id);
  if (index !== -1) {
    documentList.value[index] = { ...documentList.value[index], ...data };
  }
  editVisible.value = false;
};

// 删除文档处理
const handleDeleteConfirm = () => {
  console.log("确认删除文档:", currentDocument.value);
  // 在实际项目中，这里会调用API删除文档
  documentList.value = documentList.value.filter(
    (item) => item.id !== currentDocument.value.id
  );
  pagination.value.total = documentList.value.length;
  deleteVisible.value = false;
};

// 发布文档处理
const handlePublishConfirm = (data) => {
  console.log("确认发布文档:", currentDocument.value, data);
  publishVisible.value = false;
};
</script>

<style scoped lang="scss">
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;

  .table-title {
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
  }

  .table-count {
    font-size: 14px;
    color: #64748b;
    font-weight: 400;
  }
}

:deep(.data-table-wrapper) {
  .doc-name {
    font-weight: 500;
    color: #1f2937;
  }

  .version-tag {
    background: #f0f7ff;
    color: #0f78f0;
    border: 1px solid #bfdbfe;
  }

  .publisher-text {
    color: #475569;
  }

  .time-text {
    color: #64748b;
    font-size: 13px;
  }

  .desc-text {
    color: #64748b;
    font-size: 13px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
