import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = ref(localStorage.getItem('theme') || 'light')
    const themeColor = ref(localStorage.getItem('themeColor') || '64, 158, 255')
    const documentTitle = ref(localStorage.getItem('documentTitle') || 'SwaggerDocGen')

    function setTheme(newTheme) {
      theme.value = newTheme
      localStorage.setItem('theme', newTheme)
      document.documentElement.setAttribute('srm-theme-model', newTheme)
    }

    function setThemeColor(color) {
      themeColor.value = color
      localStorage.setItem('themeColor', color)
      document.documentElement.style.setProperty('--color', color)
    }

    function setDocumentTitle(title) {
      documentTitle.value = title
      localStorage.setItem('documentTitle', title)
      document.title = title
    }

    return {
      theme,
      themeColor,
      documentTitle,
      setTheme,
      setThemeColor,
      setDocumentTitle
    }
  },
  {
    persist: true
  }
)

export const useConfigStore = defineStore(
  'config',
  () => {
    const tableBtn = ref({
      btnType: 'textBtn',
      iconPosition: 'left'
    })

    function setTableBtnConfig(config) {
      tableBtn.value = { ...tableBtn.value, ...config }
    }

    return {
      tableBtn,
      setTableBtnConfig
    }
  },
  {
    persist: true
  }
)
