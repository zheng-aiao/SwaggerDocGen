import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSystemConfigStore = defineStore(
  'systemConfig',
  () => {
    const config = ref(null)

    function setSystemConfig(newConfig) {
      config.value = newConfig
    }

    function getConfig() {
      return config.value
    }

    function getTitle() {
      return config.value?.title || ''
    }

    return {
      config,
      setSystemConfig,
      getConfig,
      getTitle
    }
  },
  {
    persist: true
  }
)
