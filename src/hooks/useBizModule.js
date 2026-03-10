import { reactive, toRefs } from 'vue'

const state = reactive({
  rootFontSize: 16
})

/** 公共的业务模块 */
function useBizModule() {
  const setRootFontSize = () => {
    const { fontSize } = document.documentElement.style
    state.rootFontSize = Number(fontSize.replace('px', ''))
  }

  return {
    ...toRefs(state),
    setRootFontSize
  }
}

export { useBizModule }
