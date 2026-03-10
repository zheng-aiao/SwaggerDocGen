import { router } from '@/router'
import { useTheme } from '@/hooks'
import service from '@/service'
import oneClickDispatch from '@/boot/oneClickDispatch'
import { appConfig } from '@/config'
import Vue from 'vue'
import store from '@/store'

/**
 * Iframe消息处理类 - 用于处理iframe与父页面之间的通信
 * 主要功能包括：
 * - 监听来自父页面的消息
 * - 处理不同类型的消息指令
 * - 向父页面发送状态通知
 */
class IframeMessage {
  constructor() {
    this.type = 'srm' // SRM消息类型
  }

  /**
   * 判断当前是否在iframe环境中
   * @returns {boolean} 是否在iframe中
   */
  get isIframe() {
    return window.self !== window.top // 判断是否在iframe中
  }

  init() {
    // 如果不在iframe中，则不执行后续逻辑
    if (!this.isIframe) {
      log.warn('This script should be run in an iframe context.')
      return
    }
    // 监听来自父页面的消息
    window.addEventListener('message', (event) => {
      const { action, type: messageType, ...payload } = event.data ?? {}
      // 只处理指定类型的消息
      if (messageType !== this.type) return
      // action: 操作标识, type: SRM消息类型, payload: 其他数据
      log.info(`🚀 ~ SRM ~ iframeMessage ~ event -> `, event.data)
      // 检查是否有对应的处理方法
      if (!this[action]) {
        log.warn('Unknown action:', action)
        return
      }
      // 执行对应的处理函数
      this[action](payload)
    })
  }

  // 通知父页面iframe已加载完成
  notifyMounted() {
    this.sendMessage({ action: 'initComplete', status: 'ready' })
  }

  sendMessage(data) {
    window.parent.postMessage({ type: this.type, ...data }, '*')
  }

  /**
   * 跳转到指定路由
   * @param {Object} data - 路由数据示例： { type: 'srm', action: 'gotoRoute', path: '/xxx' }
   * @param {string} data.path - 目标路由路径
   */
  gotoRoute(data) {
    const { path, isHiddenHeader, isHiddenMenu } = data ?? {}
    if (isHiddenHeader !== null && isHiddenHeader !== undefined) {
      store.commit('setIsHiddenHeader', !isHiddenHeader)
    }
    if (isHiddenMenu !== null && isHiddenMenu !== undefined) {
      store.commit('setIsHiddenMenu', !isHiddenMenu)
    }
    if (!path) return
    router.value.push(path)
  }

  /**
   * 踢出当前用户示例： { type: 'srm', action: 'kickOutUser' }
   * @param data
   * @returns {Promise<void>}
   */
  async kickOutUser(data) {
    const kickData = await service.edmsBiz.kickOutUser({ type: 0 })
    if (!kickData?.hasError) {
      log.info(`🚀 iframeMessage kickOutUser ~ SRM ~ rcs ~ init -> `)
      const proxy = Vue.prototype
      await proxy.$rcs.init({
        ...proxy.$dispatchConfig,
        store,
        isReconnection: true
      })
    }
  }

  /**
   * 切换主题和主题色
   * @param {Object} data - 主题配置数据示例： { action: 'changeTheme', type: 'srm', themeColor: '12,33,422',  主题色 themeMode: 'dark' }
   * @param {string} [data.themeColor] - 主题颜色（12,33,422）
   * @param {string} [data.themeMode] - 主题模式（如light/dark） dark：黑夜 | light：白天
   * @param {boolean} [data.applyTransition=false] - 是否应用过渡动画
   * @param {boolean} [data.updateUserConfig=false] - 是否更新用户持久化配置
   */
  changeTheme(data) {
    const { setTheme, setThemeColor, setCareModel } = useTheme()
    const {
      themeColor,
      themeMode,
      applyTransition = false,
      updateUserConfig = false,
      careModel = false
    } = data ?? {}
    if (themeColor) setThemeColor(themeColor, updateUserConfig)
    if (themeMode) setTheme(themeMode, updateUserConfig, applyTransition)
    setCareModel(careModel)
  }

  /**
   * 修改:root上的CSS变量
   * @param {Object} data - CSS变量数据
   * @param {Object} data.variables - CSS变量键值对 { '--color': '0, 172, 222', '--textColor-1': '#333' }
   */
  updateRootVariables(data) {
    const { variables } = data ?? {}
    if (!variables || typeof variables !== 'object') {
      log.warn('Invalid CSS variables data:', variables)
      return
    }

    // 获取根元素
    const root = document.documentElement

    // 遍历并设置所有变量
    Object.entries(variables).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        root.style.setProperty(key, value)
      }
    })

    this.sendMessage({ action: 'cssVariablesUpdated', variables })
  }
}

window.iframeMessage = new IframeMessage()
export default window.iframeMessage
