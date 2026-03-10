import Vue from 'vue'
import TooltipConfirm from './auditConfirm.vue'
import { vueInstance } from '@/vue'

let vm = null

/**
 * 命令式弹出确认框
 * @returns {Promise<boolean>}
 */
export function openAuditModel(props, isClose = false) {
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
            handleConfirm: (data) => {
              resolve({ isConfirm: true, auditContent: data })
              vm.$destroy()
            },
            handleClose: () => {
              resolve({ isConfirm: false })
              vm.$destroy()
            }
          }
        })
      }
    }).$mount(container)
  })
}
