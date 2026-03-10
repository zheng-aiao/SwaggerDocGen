import Vue, { watchEffect } from 'vue'
import { momentSource, adaptiveResolution } from '@rdapp/web-common-utils'
import oneClickDispatch, { dispatchController } from '@rdapp/one-click-dispatch'
import pubSub from 'pubsub-js'
import store from '../store'
import bus from '@/utils/vueBus'
import service from '../service'
import { useTheme } from '@/hooks'
import { incrementZIndex, setRootCssVar } from '@/utils/publicMethod'
import '@rdapp/one-click-dispatch/dist/one-click-dispatch.css'
import { debounce } from 'lodash-es'
import iframeMessage from '@/boot/iframeMessage'

const handleDispatchZIndex = incrementZIndex({ selector: '.rd-one-click-dispatch-dialog-mask' })

const openPanel = dispatchController.openPanel
Object.defineProperty(dispatchController, 'openPanel', {
  get() {
    return function (...rest) {
      openPanel.call(dispatchController, ...rest)
      handleDispatchZIndex()
    }
  }
})

class Dispatch {
  #styleThemeMap = {
    dark: 'scifi',
    light: 'flat'
  }

  async init(config) {
    const { theme, themeColor: tc } = useTheme()

    const libavWebUrl = `${window.location.origin}/libavWeb`
    let scriptResolve

    const promise = new Promise((resolve) => {
      scriptResolve = resolve
    })

    const script = document.createElement('script')
    script.onload = () => {
      scriptResolve()
    }

    script.src = `${libavWebUrl}/dist/libav.umd.min.js?t=${new Date().getTime()}`

    script.type = 'module'
    document.body.appendChild(script)
    await promise

    const styleElement = document.createElement('style')
    styleElement.type = 'text/css'
    const cssPath = `${libavWebUrl}/dist/libav.css`
    styleElement.innerHTML = `@import url('${cssPath}');`
    document.head.appendChild(styleElement)

    Vue.use(window.libav.default, {
      tokenFactory: () => store.state.token,
      timezone: store.state.config.videoUIConfig?.timezone || '',
      ...store.state.config.videoUIConfig,
      adaptiveResolution,
      bizInitializer: service.bizInitializer,
      moment: momentSource.getMoment()
    })

    const themeColor = tc.value
      ?.split(',')
      ?.reduce((acc, val, i) => ({ ...acc, [['r', 'g', 'b'][i]]: +val }), {})
    await oneClickDispatch.init({
      enableRichCommunicationSuite: !config.dispatchConfig?.isIframeUserRegister
        ? true
        : !iframeMessage.isIframe, // 用于控制是否初始化融合通信相关功能（默认 true）
      dispatchConfig: { ...config.videoUIConfig, ...config.dispatchConfig, themeColor },
      logOption: config.logOption ?? {},
      store,
      bizInitializer: service.bizInitializer,
      moment: momentSource.getMoment(),
      Vue
    })

    watchEffect(() => this.setThemeStyle(theme, tc))
    this.getLivesList()
    this.subscribeLive()
    this.subscribeAppUser()
    // 订阅通话记录事件
    this.subscribeCall()
    // 订阅接听事件
    this.subscribeAnswerCall(config.dispatchConfig)
  }

  setThemeStyle(theme, themeColor) {
    theme.value, themeColor.value // 收集响应式依赖
    setRootCssVar('--ocdThemeColor', themeColor.value)
    const timer = setTimeout(() => {
      // 确保主题切换动画执行
      store.state.oneClickDispatchModule.dispatchConfig.style = this.#styleThemeMap[theme.value]
      clearTimeout(timer)
    }, 50)
  }

  // 获取直播列表
  async getLivesList() {
    const { records = [], totalCount = 0 } = await service.vfsBiz.obtainLive()
    const filterLiveList =
      (totalCount > 0 && records.filter((e) => e.status === 1 && e.userAccount !== 'vfsas')) || []
    dispatchController.updateData('liveList', filterLiveList)
    store.commit('setLiveList', filterLiveList)
  }

  // 直播任务回调
  subscribeLive() {
    const vfsBizNames = service.vfsBiz.getCallbackBizNames()
    pubSub.subscribe(vfsBizNames.bizLive, (_, data) => {
      log.info('Live ~ pubSub.subscribe ~ data', data)
      this.getLivesList()
    })
  }

  // 用户上下线回调
  async subscribeAppUser() {
    pubSub.subscribe('Ims_User_Status', (_, data) => {
      log.info('User ~ pubSub.subscribe Ims_User_Status ~ data', data)
      this.getLivesList()
    })
    pubSub.subscribe('headlineMessage', (_, data) => {
      if (data.biz_name === 'User-Kicked-Out') {
        log.info('User ~ headlineMessage ~ data', data)
        store.commit('setIsUserOut', new Date().getTime())
      }
    })
  }

  subscribeCall() {
    pubSub.subscribe('oneClickDispatchCallOutEvent', (_, data) => {
      log.info('User ~ pubSub.subscribe oneClickDispatchCallOutEvent ~ data', data)
      bus.$emit('oneClickDispatchCallOutEvent', data)
    })
  }

  subscribeAnswerCall(dispatchConfig) {
    if (!dispatchConfig?.isUserAcceptEvent) {
      pubSub.subscribe('oneClickDispatchAcceptEvent', (_, data) => {
        log.info('User ~ pubSub.subscribe oneClickDispatchAcceptEvent ~ data', data)
        dispatchController.open({
          type: '视频通话'
        })
      })
    }
  }

  ONE_CLICK_DISPATCH_ANSWER_CALL
}

export default new Dispatch()
