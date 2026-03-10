import Vue from 'vue'
import App from '@/vue/App.vue'
import i18n from '@/language'

const vueInstance = {
  app: null
}

function init(router, store) {
  vueInstance.app = new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App)
  }).$mount('#app')

  window.app = vueInstance.app
}

export { init, vueInstance }
