import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDocumentStore = defineStore('document', () => {
  const categories = ref([
    { id: 'all', name: '全部服务', count: 36, active: true },
    { id: 'srm', name: 'SRM服务', count: 24, active: false },
    { id: 'pems', name: 'PEMS服务', count: 12, active: false }
  ])

  const services = ref([
    {
      id: 1,
      name: '采购协作中心',
      docCount: 18,
      version: 'v1.2.4',
      versionType: 'blue',
      category: 'SRM服务',
      description: '提供供应商生命周期管理、采购订单协同、合同管理等功能',
      updateTime: '2023-11-20 14:30'
    },
    {
      id: 2,
      name: '物料需求计划',
      docCount: 12,
      version: 'v2.0.1',
      versionType: 'green',
      category: 'PEMS服务',
      description: '生产制造物料计划算法引擎，支持多工厂协同',
      updateTime: '2023-11-18 09:15'
    },
    {
      id: 3,
      name: '库存预警系统',
      docCount: 6,
      version: 'v1.1.0',
      versionType: 'blue',
      category: 'SRM服务',
      description: '多仓库存实时监控与智能预警通知系统',
      updateTime: '2023-11-15 16:40'
    },
    {
      id: 4,
      name: '财务结算中心',
      docCount: 31,
      version: 'v3.4.2',
      versionType: 'orange',
      category: 'SRM服务',
      description: '支持多维度的财务对账与结算自动化处理',
      updateTime: '2023-11-12 11:00'
    },
    {
      id: 5,
      name: '质量检测引擎',
      docCount: 24,
      version: 'v1.0.5',
      versionType: 'green',
      category: 'PEMS服务',
      description: '产品质量追溯与检测标准管理平台',
      updateTime: '2023-11-10 08:45'
    },
    {
      id: 6,
      name: '供应商门户',
      docCount: 15,
      version: 'v2.1.0',
      versionType: 'blue',
      category: 'SRM服务',
      description: '供应商自助服务与信息交互平台',
      updateTime: '2023-11-08 13:20'
    },
    {
      id: 7,
      name: '生产排程系统',
      docCount: 9,
      version: 'v1.3.2',
      versionType: 'green',
      category: 'PEMS服务',
      description: '智能生产排程与车间调度优化引擎',
      updateTime: '2023-11-05 10:30'
    },
    {
      id: 8,
      name: '合同管理平台',
      docCount: 22,
      version: 'v2.2.1',
      versionType: 'orange',
      category: 'SRM服务',
      description: '电子合同签署与全生命周期管理',
      updateTime: '2023-11-03 15:15'
    }
  ])

  const currentCategory = ref('all')
  const searchKeyword = ref('')
  const editingCategoryId = ref(null)
  const editingCategoryName = ref('')

  const filteredServices = computed(() => {
    let result = services.value
    
    if (currentCategory.value !== 'all') {
      result = result.filter(s => s.category === currentCategory.value)
    }
    
    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase()
      result = result.filter(s => 
        s.name.toLowerCase().includes(keyword) ||
        s.description.toLowerCase().includes(keyword)
      )
    }
    
    return result
  })

  const totalDocCount = computed(() => 
    services.value.reduce((sum, s) => sum + s.docCount, 0)
  )

  function setCurrentCategory(categoryId) {
    currentCategory.value = categoryId
    categories.value.forEach(c => {
      c.active = c.id === categoryId
    })
  }

  function setSearchKeyword(keyword) {
    searchKeyword.value = keyword
  }

  function startEditCategory(categoryId, name) {
    editingCategoryId.value = categoryId
    editingCategoryName.value = name
  }

  function cancelEditCategory() {
    editingCategoryId.value = null
    editingCategoryName.value = ''
  }

  function saveCategoryName() {
    if (editingCategoryId.value && editingCategoryName.value) {
      const category = categories.value.find(c => c.id === editingCategoryId.value)
      if (category) {
        category.name = editingCategoryName.value
      }
    }
    cancelEditCategory()
  }

  function addCategory(name) {
    const newId = Date.now().toString()
    categories.value.push({
      id: newId,
      name,
      count: 0,
      active: false
    })
  }

  function deleteCategory(categoryId) {
    const index = categories.value.findIndex(c => c.id === categoryId)
    if (index > -1) {
      categories.value.splice(index, 1)
    }
  }

  return {
    categories,
    services,
    currentCategory,
    searchKeyword,
    editingCategoryId,
    editingCategoryName,
    filteredServices,
    totalDocCount,
    setCurrentCategory,
    setSearchKeyword,
    startEditCategory,
    cancelEditCategory,
    saveCategoryName,
    addCategory,
    deleteCategory
  }
}, {
  persist: true
})
