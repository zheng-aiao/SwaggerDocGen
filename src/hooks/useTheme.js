import { reactive, toRefs, watch, computed } from 'vue'
import { themeColorMap, themeEnum } from '@/enum/constant'
import { appConfig } from '@/config'
import store from '@/store'
import service from '@/service'
import { getRootCssVar } from '@/utils/publicMethod'

const { dark, light } = themeEnum

const currentTheme = localStorage.getItem('theme')
const enableCareModel = sessionStorage.getItem('careModel')
const toggleDuration = 700

const state = reactive({
  theme: currentTheme || dark,
  themeColor: themeColorMap.color,
  careModel: enableCareModel || false,
  themeVariables: {}
})

watch(
  () => state.theme,
  (newTheme) => {
    const timer = setTimeout(() => {
      state.themeVariables = {
        color: getRootCssVar('--color'),
        textColor1: getRootCssVar('--textColor-1'),
        textColor2: getRootCssVar('--textColor-2'),
        textColor3: getRootCssVar('--textColor-3'),
        textColor4: getRootCssVar('--textColor-4')
      }
      // 同步到 Vuex
      store.commit('theme/SET_THEME', newTheme)
      store.commit('theme/SET_THEME_VARIABLES', state.themeVariables)
      clearTimeout(timer)
    }, toggleDuration)
  },
  { immediate: true }
)

// 监听主题色变化，同步到 Vuex
watch(
  () => state.themeColor,
  (newThemeColor) => {
    store.commit('theme/SET_THEME_COLOR', newThemeColor)
  }
)

// 监听关怀模式变化，同步到 Vuex
watch(
  () => state.careModel,
  (newCareModel) => {
    store.commit('theme/SET_CARE_MODEL', newCareModel)
  }
)

function useTheme() {
  const userId =
    store.state.currentUser?.profile?.sub ?? appConfig.value?.singleSignConfig?.localUserId

  // 从 Vuex 获取主题状态（可选的，用于同步）
  const vuexTheme = computed(() => store.state.theme)
  const vuexThemeColor = computed(() => store.state.themeColor)
  const vuexCareModel = computed(() => store.state.careModel)

  // 应用主题到DOM和存储
  const applyTheme = () => {
    document.documentElement.style.setProperty('--color', state.themeColor)
    document.documentElement.setAttribute('srm-theme-model', state.theme)
    document.documentElement.setAttribute('srm-care-model', state.careModel)
    localStorage.setItem('theme', state.theme)
    localStorage.setItem('themeColor', state.themeColor)
    sessionStorage.setItem('careModel', state.careModel)
  }

  // 更新用户配置
  const updateUserConfig = () => {
    service.orgsBiz.updateUserConfigsById({
      userId,
      configType: 4,
      configInfo: {
        Color: state.themeColor,
        IsBigScreen: state.theme === dark,
        CareModel: state.careModel
      }
    })
  }

  // 执行主题切换动画
  const performTransition = (isApplyTransition) => {
    if (!document.startViewTransition || !isApplyTransition) {
      applyTheme()
      return
    }

    const transition = document.startViewTransition(() => {
      applyTheme()
    })

    transition.ready.then(() => {
      const clientX = document.body.clientWidth
      const clientY = 0
      const radius = Math.hypot(
        Math.max(clientX, innerWidth - clientX),
        Math.max(clientY, innerHeight - clientY)
      )
      const path = [
        `circle(0 at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`
      ]
      document.documentElement.animate(
        { clipPath: state.theme === dark ? path.reverse() : path },
        {
          duration: toggleDuration,
          pseudoElement:
            state.theme === dark ? '::view-transition-old(root)' : '::view-transition-new(root)'
        }
      )
    })
  }

  const applyFixedTheme = (mode, color) => {
    state.theme = mode
    state.themeColor = color
    applyTheme()
  }

  const init = async (config) => {
    const { rootClassNames, mode, color } = config.themeConfig ?? {}
    rootClassNames && document.documentElement.classList.add(rootClassNames)
    if (mode && color) {
      applyFixedTheme(mode, color)
      // 同步初始状态到 Vuex
      store.commit('theme/UPDATE_THEME', {
        theme: mode,
        themeColor: color,
        careModel: state.careModel
      })
      return
    }
    const { records = [] } = await service.orgsBiz.getUserConfigs({ UserID: userId, type: 4 })
    const { configInfo } = records.at(0) ?? {}
    if (configInfo) {
      const { Color, IsBigScreen, CareModel } = configInfo
      state.themeColor = Color
      state.theme = IsBigScreen ? dark : light
      state.careModel = CareModel
      // 同步初始状态到 Vuex
      store.commit('theme/UPDATE_THEME', {
        theme: state.theme,
        themeColor: state.themeColor,
        careModel: state.careModel
      })
    }
    applyTheme()
  }

  const toggleTheme = () => {
    state.theme = state.theme === dark ? light : dark
    performTransition()
    updateUserConfig()
  }

  const setTheme = (newTheme, isUpdateUserConfig = true, isApplyTransition = true) => {
    state.theme = newTheme
    performTransition(isApplyTransition)
    isUpdateUserConfig && updateUserConfig()
  }

  const setThemeColor = (newThemeColor, isUpdateUserConfig = true) => {
    state.themeColor = newThemeColor
    applyTheme()
    isUpdateUserConfig && updateUserConfig()
  }

  const setCareModel = (newVal) => {
    state.careModel = newVal
    applyTheme()
    updateUserConfig()
  }

  return {
    ...toRefs(state),
    init,
    toggleTheme,
    setTheme,
    setThemeColor,
    setCareModel
  }
}

export { useTheme }
