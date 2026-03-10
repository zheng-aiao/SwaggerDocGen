import Vue from 'vue'
import { adaptiveResolution, drag, iframe } from '@rdapp/web-common-utils'
import * as directives from '@/utils/directive'
import ElementUI from 'element-ui'
import { Plugin } from 'vue-fragment'
import { useBizModule } from '@/hooks'

import '@/assets/css/public.css'
import 'element-ui/lib/theme-chalk/index.css'

const { setRootFontSize } = useBizModule()

function init() {
  Vue.use(ElementUI)
  Vue.use(Plugin)

  // 自适应库
  adaptiveResolution.init(setRootFontSize)
  adaptiveResolution.reCalc()

  Object.keys({ ...directives, drag, iframe }).forEach((key) => Vue.directive(key, directives[key]))
}

export { init }
