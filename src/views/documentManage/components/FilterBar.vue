<template>
  <div class="filter-bar">
    <div class="filter-left">
      <RdappInput v-model="local.keyword" placeholder="关键词" clearable />
      <RdappDateTimePicker v-model="local.dateRange" type="daterange" />
    </div>
    <div class="filter-right">
      <RdappButton type="primary" label="查询" @click="emit('search')" />
      <RdappButton type="close" label="重置" @click="reset" />
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import RdappInput from '@/components/basicComponent/RdappInput.vue'
import RdappDateTimePicker from '@/components/basicComponent/RdappDateTimePicker.vue'
import RdappButton from '@/components/basicComponent/RdappButton.vue'

const props = defineProps({
  modelValue: { type: Object, required: true }
})
const emit = defineEmits(['update:modelValue', 'search'])
const local = reactive({ keyword: '', dateRange: [] })

watch(
  () => props.modelValue,
  (v) => Object.assign(local, v),
  { immediate: true, deep: true }
)

watch(
  () => local,
  (v) => emit('update:modelValue', { ...v }),
  { deep: true }
)

const reset = () => {
  local.keyword = ''
  local.dateRange = []
  emit('search')
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/rules' as *;

.filter-bar {
  @include flexCenter(space-between, center);
  gap: pxToRem(12);
  background: var(--foregroundColor);
  border: 1px solid var(--foreBorderColor);
  border-radius: pxToRem(8);
  padding: pxToRem(12);
}

.filter-left {
  @include flexCenter(flex-start, center);
  gap: pxToRem(12);
}

.filter-right {
  @include flexCenter(flex-end, center);
  gap: pxToRem(8);
}
</style>
