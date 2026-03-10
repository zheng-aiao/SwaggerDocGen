import Vue from 'vue'
import SelectMapPoint from './SelectMapPoint.vue'
import { vueInstance } from '@/vue'

/**
 * 动态调用地图选点组件
 * @param {Object} props - 选点配置
 * @returns {Promise<{center: number[], address: string, areaCode: string,namePath: string}>}
 */
const pickPoint = (props = {}) => {
  return new Promise((resolve) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const options = {
      parent: vueInstance.app,
      render(h) {
        return h(SelectMapPoint, {
          props,
          on: {
            confirm: ({ center, address, mapPlotting }) => {
              resolve({ center, address, mapPlotting })
              this.$destroy()
            },
            close: () => {
              resolve({ center: [], address: '', mapPlotting: [] })
              this.$destroy()
            }
          }
        })
      },
      beforeDestroy() {
        this.$el.remove()
        container.remove()
      }
    }

    new Vue(options).$mount(container)
  })
}

export default { pickPoint }
