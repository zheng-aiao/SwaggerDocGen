<template>
  <TreeSelect
    placeholder="请选择组织架构"
    v-bind="$attrs"
    :load="load"
    :onSearch="search"
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
    const { records = [] } = await service.orgsBiz.getOrganizationsByIdV2({ id: props.value })
    defaultOptions.value = records.map((item) => ({ label: item.name, value: item.id }))
  }

  const load = async (node) => {
    if (!node.level) {
      const { records = [] } = await service.orgsBiz.getAllRootList(
        { per_page: service.pageSize },
        service.getConfig
      )
      return records
    }
    const params = {
      pid: node.data.id,
      type: 1, // 只查询部门
      page: 1,
      per_page: service.pageSize
    }
    const { records = {} } = await service.orgsBiz.getAllDepartmentsMembersV2(params)
    const { departmentsData = [] } = records ?? {}
    return [...departmentsData.map((item) => ({ ...item, isLeaf: item.isLeafGroup }))]
  }

  const formatPaths = (paths) => {
    return JSON.parse(paths)
      .map((item) => item.Name)
      .join('/')
  }
  const search = async (keyword) => {
    const groupName = 'CancelOrgSearchRequest'
    service.cancel(groupName)
    const params = {
      keyword,
      type: 3,
      limit: 50
    }
    const { records = {} } = await service.orgsBiz.searchKeyWordOrPidV2(params, { groupName })
    if (!props.showFullPath) {
      return records.departments.map((m) => ({ ...m, isLeaf: true }))
    }
    const result = records.departments.map((e) => {
      return {
        ...e,
        name: formatPaths(e.path),
        isLeaf: true
      }
    })
    return result
  }
</script>
