<template>
  <div class="document-table">
    <RdappTable
      :loading="loading"
      :data="data"
      :tableColumns="columns"
      :pagination="true"
      :totalCount="total"
      :pageIndex="page"
      :pageSize="pageSize"
      @currentChange="(p) => emit('page-change', p, pageSize)"
      @sizeChange="(ps) => emit('page-change', page, ps)"
    >
      <template #name="{ row }">
        <div class="name-cell">
          <span class="name">{{ row.name }}</span>
          <RdappTag type="primary">{{ row.type }}</RdappTag>
        </div>
      </template>
      <template #operations="{ row }">
        <div class="ops">
          <RdappButton type="default" label="预览" @click="emit('preview', row)" />
          <RdappButton type="default" label="编辑" @click="emit('edit', row)" />
          <RdappButton type="close" label="删除" @click="emit('remove', row)" />
        </div>
      </template>
    </RdappTable>
  </div>
</template>

<script setup>
import RdappTable from '@/components/basicComponent/RdappTable.vue'
import RdappButton from '@/components/basicComponent/RdappButton.vue'
import RdappTag from '@/components/basicComponent/RdappTag.vue'

const props = defineProps({
  loading: { type: Boolean, default: false },
  data: { type: Array, default: () => [] },
  total: { type: Number, default: 0 },
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 }
})
const emit = defineEmits(['page-change', 'preview', 'edit', 'remove'])

const columns = [
  { label: '名称', prop: 'name', slotName: 'name', minWidth: 240 },
  { label: '大小', prop: 'size', width: 120 },
  { label: '更新时间', prop: 'updatedAt', width: 200 },
  { label: '所有者', prop: 'owner', width: 120 },
  { label: '操作', prop: 'operations', slotName: 'operations', width: 220, fixed: 'right' }
]
</script>

<style lang="scss" scoped>
@use '@/assets/scss/rules' as *;

.name-cell {
  @include flexCenter(flex-start, center);
  gap: pxToRem(8);
}

.ops {
  @include flexCenter(flex-start, center);
  gap: pxToRem(8);
}
</style>
