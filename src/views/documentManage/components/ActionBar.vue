<template>
  <div class="action-bar">
    <div class="left">
      <RdappButton type="primary" label="新建文档" @click="emit('create')" />
      <RdappButton type="primary" label="上传" @click="emit('upload')" />
      <RdappButton type="default" label="批量操作" @click="emit('batch')" />
    </div>
    <div class="right">
      <RdappOptionGroup v-model="viewMode" type="radio" :options="modes" :inline="true" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RdappButton from '@/components/basicComponent/RdappButton.vue'
import RdappOptionGroup from '@/components/basicComponent/RdappOptionGroup.vue'

const emit = defineEmits(['create', 'upload', 'batch'])
const viewMode = ref('table')
const modes = [
  { label: '列表', value: 'table' },
  { label: '卡片', value: 'card' }
]
</script>

<style lang="scss" scoped>
@use '@/assets/scss/rules' as *;

.action-bar {
  @include flexCenter(space-between, center);
  gap: pxToRem(12);
}

.left {
  @include flexCenter(flex-start, center);
  gap: pxToRem(8);
}

.right {
  @include flexCenter(flex-end, center);
}
</style>
