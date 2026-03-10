<template>
  <TreeSelect
    placeholder="请选择所属区划"
    v-bind="$attrs"
    :load="load"
    :onSearch="search"
    valueKey="areaCode"
    :default-options="defaultOptions"
    :value="props.value"
    v-on="$listeners"
  ></TreeSelect>
</template>

<script setup>
  import TreeSelect from './TreeSelect.vue'
  import { onMounted, ref, watch } from 'vue'
  import service from '@/service'

  const props = defineProps({
    value: {
      type: [String, Number],
      default: ''
    }
  })

  const defaultOptions = ref([])

  onMounted(async () => {
    setDefaultValue()
  })

  watch(
    () => props.value,
    () => {
      setDefaultValue()
    },
    { immediate: false }
  )

  const setDefaultValue = async () => {
    if (!props.value) return
    const { records = [] } = await service.gdsBiz.getDistrictsByIds({ ids: [props.value] })
    defaultOptions.value = records.map((item) => ({ label: item.name, value: item.id }))
  }

  const load = async (node) => {
    const requestConfig = { getAllPage: true }
    const { records = [] } = await service.gdsBiz.getChildDistricts(
      { parentId: node.data?.id ?? '', pageIndex: 1, pageSize: 1000 },
      { ...requestConfig, groupName: 'CancelDistrictRequest' }
    )
    return records
  }

  const search = async (keyword) => {
    service.cancel('CancelDistrictRequest')
    const { records = [] } = await service.gdsBiz.searchDistrictList(
      { keyword, pageSize: 50 },
      { groupName: 'CancelDistrictRequest' }
    )
    return records.map((m) => ({ ...m, isLeaf: true }))
  }
</script>
