import Vue from 'vue'
import TooltipConfirm from './TooltipConfirm.vue'
import { vueInstance } from '@/vue'

let vm = null

/**
 * 命令式弹出确认框
 * @returns {Promise<boolean>}
 */
export function openConfirmModel(props, isClose = false) {
  return new Promise((resolve) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    vm = new Vue({
      parent: vueInstance.app,
      beforeDestroy() {
        vm = null
        container.remove()
      },
      render(h) {
        return h(TooltipConfirm, {
          props,
          on: {
            handleConfirm: () => {
              resolve(true)
              vm.$destroy()
            },
            handleClose: () => {
              resolve(false)
              vm.$destroy()
            }
          }
        })
      }
    }).$mount(container)
  })
}
