import store from '@/store'

const appConfig = {
  value: null
}

const appRoutesConfig = {
  value: []
}

function initConfig() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `/config.js?${Date.now()}`
    script.onload = () => {
      const config = window.globalSrmConfig
      appConfig.value = config
      store.commit('setConfig', config) // 兼容一键调度
      resolve({ ...config })
      delete window.globalSrmConfig
    }
    script.onerror = () => {
      reject(new Error('加载config.js失败'))
    }
    document.body.appendChild(script)
  })
}

function initRoutesConfig() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `/routes.js?${Date.now()}`
    script.onload = () => {
      const routesConfig = window.globalSrmRoutesConfig
      appRoutesConfig.value = routesConfig
      resolve([...routesConfig])
      delete window.globalSrmRoutesConfig
    }
    script.onerror = () => {
      reject(new Error('routes.js失败'))
    }
    document.body.appendChild(script)
  })
}

export { initConfig, initRoutesConfig, appConfig, appRoutesConfig }
