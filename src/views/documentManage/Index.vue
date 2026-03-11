<template>
  <div class="document-manage">
    <div class="layout">
      <aside class="left-panel">
        <CategorySidebar
          v-model="selectedCategoryId"
          :categories="categoryList"
          @create="createCategory"
          @rename="renameCategory"
          @remove="removeCategory"
        />
      </aside>
      <main class="right-panel">
        <div class="top-actions">
          <RdappButton type="primary" label="新建文档" @click="handleCreate" />
          <RdappButton type="primary" label="上传" @click="openUpload" />
          <RdappButton type="default" label="批量操作" @click="handleBatch" />
        </div>
        <RdappTable
          :data="list"
          :tableColumns="columns"
          :totalCount="total"
          :pageIndex="page"
          :pageSize="pageSize"
          :showSelection="false"
          @currentChange="(p) => handlePageChange(p, pageSize)"
          @sizeChange="(ps) => handlePageChange(page, ps)"
        >
          <template #name="{ row }">
            <div class="name-cell">
              <span class="name">{{ row.name }}</span>
              <RdappTag type="primary">{{ row.type }}</RdappTag>
            </div>
          </template>
          <template #operations="{ row }">
            <div class="ops">
              <RdappButton type="default" label="预览" @click="handlePreview(row)" />
              <RdappButton type="default" label="编辑" @click="handleEdit(row)" />
              <RdappButton type="close" label="删除" @click="handleRemove(row)" />
            </div>
          </template>
        </RdappTable>
      </main>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import RdappButton from '@/components/basicComponent/RdappButton.vue'
  import RdappTag from '@/components/basicComponent/RdappTag.vue'
  import RdappTable from '@/components/basicComponent/RdappTable.vue'
  import CategorySidebar from './components/CategorySidebar.vue'

  const loading = ref(false)
  const list = ref([])
  const total = ref(0)
  const page = ref(1)
  const pageSize = ref(10)
  const selectedCategoryId = ref('all')
  const categoryList = ref([
    { id: 'all', label: '全部服务', count: 57 },
    { id: 'srm', label: 'SRM服务', count: 28 },
    { id: 'pems', label: 'PEMS服务', count: 29 }
  ])

  const columns = [
    { label: '名称', prop: 'name', slotName: 'name', minWidth: 240 },
    { label: '大小', prop: 'size', width: 120 },
    { label: '更新时间', prop: 'updatedAt', width: 200 },
    { label: '所有者', prop: 'owner', width: 120 },
    { label: '操作', prop: 'operations', slotName: 'operations', width: 220, fixed: 'right' }
  ]

  const fetchList = async () => {
    loading.value = true
    const start = (page.value - 1) * pageSize.value
    const type = selectedCategoryId.value
    list.value = Array.from({ length: pageSize.value }, (_, i) => {
      const id = start + i + 1
      return {
        id,
        name: `文档_${id}`,
        type: id % 2 ? '接口' : '模板',
        size: `${(Math.random() * 10 + 1).toFixed(2)} MB`,
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        owner: '管理员'
      }
    }).filter((row) => {
      if (type === 'all') return true
      if (type === '接口' || type === '模板') return row.type === type
      return true
    })
    total.value = 57
    loading.value = false
  }

  const createCategory = () => {}
  const renameCategory = () => {}
  const removeCategory = () => {}

  const handleCreate = () => {}
  const openUpload = () => {}
  const handleBatch = () => {}
  const handlePreview = (row) => {}
  const handleEdit = (row) => {}
  const handleRemove = (row) => {}

  const handlePageChange = (p, ps) => {
    page.value = p
    pageSize.value = ps
    fetchList()
  }

  fetchList()
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .document-manage {
    @include wh;
    display: block;
    background: var(--bgColor);
  }

  .layout {
    @include wh;
    display: flex;
    gap: pxToRem(12);
  }

  .left-panel {
    flex-shrink: 0;
    width: pxToRem(280);
    background: var(--foregroundColor);
    border: 1px solid var(--foreBorderColor);
    border-radius: pxToRem(8);
    overflow: hidden;
  }

  .panel-header {
    @include flexCenter(flex-start, center);
    @include fontStyle(4);
    padding: pxToRem(12) pxToRem(16);
    border-bottom: 1px solid var(--foreBorderColor);
    color: var(--textColor-1);
  }

  .panel-body {
    display: flex;
    flex-direction: column;
    gap: pxToRem(12);
    padding: pxToRem(12) pxToRem(16);
  }

  .panel-actions {
    @include flexCenter(flex-end, center);
    gap: pxToRem(8);
  }

  .right-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: pxToRem(12);
  }

  .top-actions {
    @include flexCenter(flex-end, center);
    gap: pxToRem(8);
  }

  .name-cell {
    @include flexCenter(flex-start, center);
    gap: pxToRem(8);
  }

  .ops {
    @include flexCenter(flex-start, center);
    gap: pxToRem(8);
  }
</style>
