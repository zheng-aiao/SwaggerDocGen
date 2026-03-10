import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang

function loadLibav() {
  return new Promise((resolve) => {
    const libavWebUrl = `${window.location.origin}/libavWeb`

    const script = document.createElement('script')
    script.onload = () => {
      const script2 = document.createElement('script')
      script2.onload = () => {
        resolve()
      }
      script2.src = `${libavWebUrl}/dist/locale/lang/zh-CN.js`
      script2.type = 'module'
      document.body.appendChild(script2)
    }

    script.src = `${libavWebUrl}/dist/locale/lang/en.js`
    script.type = 'module'
    document.body.appendChild(script)
  })
}

// 先创建基础的 i18n 实例（使用 element-ui 语言包）
const messages = {
  'zh-CN': {
    ...elementZhLocale
  },
  'en-US': {
    ...elementEnLocale
  }
}

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: store.state.config?.language ?? 'zh-CN',
  messages
})

// 异步加载 libav 语言包并更新 messages
loadLibav()
  .then(() => {
    // 更新 messages，合并 libav 的语言包
    i18n.setLocaleMessage('zh-CN', {
      ...elementZhLocale,
      ...window.libavI18nCn
    })
    i18n.setLocaleMessage('en-US', {
      ...elementEnLocale,
      ...window.libavI18nEn
    })
  })
  .catch(() => {
    // 如果加载失败，继续使用默认的 element-ui 语言包
    console.warn('Failed to load libav locale files')
  })

// libav bug处理
Vue.prototype.$t = function (key) {
  var values = [],
    len = arguments.length - 1
  while (len-- > 0) values[len] = arguments[len + 1]
  return i18n._t.apply(i18n, [key, i18n.locale, i18n._getMessages(), this].concat(values))
}

export default i18n
