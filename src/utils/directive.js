import Vue from 'vue'
import { throttle } from 'lodash-es'
import { getStyle } from 'element-ui/src/utils/dom'

const elTooltipAutoShow = {
  bind(el, { value = {} }, vnode) {
    const { disable = false } = value
    if (!disable) {
      el.addEventListener(
        'mouseenter',
        throttle(() => {
          const defaultSilent = !!Vue.config.silent
          Vue.config.silent = true
          vnode.componentInstance.disabled = true
          const range = document.createRange()
          range.setStart(el, 0)
          range.setEnd(el, el.childNodes.length)
          const rangeWidth = Math.round(range.getBoundingClientRect().width)
          const padding =
            (parseInt(getStyle(el, 'paddingLeft')) || 0) +
            (parseInt(getStyle(el, 'paddingRight')) || 0)
          if (rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth) {
            vnode.componentInstance.disabled = false
          }
          Vue.config.silent = defaultSilent
        }, 50)
      )
    }
  }
}

const empty = {
  bind(el, { value }) {
    const div = document.createElement('div')
    div.classList.add('rdapp-empty')
    el.emptyInstance = div
    if (!value) return // 如果有值，不显示
    el.classList.add('empty-relative')
    el.appendChild(div)
  },
  componentUpdated(el, binding) {
    if (binding.value === binding.oldValue) {
      return
    }
    if (binding.value) {
      el.appendChild(el.emptyInstance)
    } else {
      el.contains(el.emptyInstance) && el.removeChild(el.emptyInstance)
      el.classList.remove('empty-relative')
    }
  }
}

const debounceClick = {
  inserted(el, binding) {
    const handleDebounceClick = () => {
      if (!el.disabled) {
        el.disabled = true
        el.classList.add('is-disabled')
        const timer = setTimeout(() => {
          el.disabled = false
          el.classList.remove('is-disabled')
          clearTimeout(timer)
        }, binding.value || 1000)
      }
    }
    el.handleDebounceClick = handleDebounceClick
    el.addEventListener('click', handleDebounceClick)
  },
  unbind(el) {
    el.removeEventListener('click', el.handleDebounceClick)
  }
}

// 格式化input输入框中的数字为千分位格式
const thousands = {
  inserted(el, _, vnode) {
    const component = vnode.componentInstance
    const input = el.querySelector('input')

    if (!input || !component) return

    const format = (val) => {
      const num = Number(val)
      return isNaN(num)
        ? ''
        : num.toLocaleString('zh', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
    }

    // 初始化
    input.value = format(component.value)

    // 监听组件值变化（解决按钮点击问题）
    const unwatch = component.$watch('value', (newVal) => {
      input.value = format(newVal)
    })

    // 聚焦/失焦处理
    const handleFocus = () => {
      input.value = component.value
    }

    const handleBlur = () => {
      input.value = format(component.value)
    }

    input.addEventListener('focus', handleFocus)
    input.addEventListener('blur', handleBlur)

    // 保存引用以便解绑
    el._thousandsCleanup = () => {
      unwatch()
      input.removeEventListener('focus', handleFocus)
      input.removeEventListener('blur', handleBlur)
    }
  },
  unbind(el) {
    el._thousandsCleanup?.()
  }
}

export { elTooltipAutoShow, empty, debounceClick, thousands }
