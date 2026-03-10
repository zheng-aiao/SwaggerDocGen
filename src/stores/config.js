import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const tableBtn = ref({
    btnType: 'textBtn',
    iconPosition: 'left'
  })

  const theme = ref(localStorage.getItem('theme') || 'light')
  const themeColor = ref(localStorage.getItem('themeColor') || '64, 158, 255')
  const documentTitle = ref(localStorage.getItem('documentTitle') || '安全风险智能管控平台')

  function setTableBtnConfig(config) {
    tableBtn.value = { ...tableBtn.value, ...config }
  }

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
    tableBtn,
    theme,
    themeColor,
    documentTitle,
    setTableBtnConfig,
    setTheme,
    setThemeColor,
    setDocumentTitle
  }
}, {
  persist: true
})
