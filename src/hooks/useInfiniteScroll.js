import { computed, reactive, shallowRef, toRefs } from 'vue'
import { Message } from 'element-ui'

/**
 * 无限滚动
 * @param loadMore 获取数据的方法
 * @param [options] 配置项
 * @param [options.errMsg] 错误提示信息
 */
export function useInfiniteScroll(loadMore, options) {
  const { errMsg } = options ?? {}
  const list = shallowRef([])
  const state = reactive({
    loading: false,
    notMore: false,
    pageIndex: 0,
    pageSize: options.pageSize ?? 50
  })
  const disabled = computed(() => state.loading || state.notMore)

  const getInfiniteData = async () => {
    if (state.loading) return
    state.loading = true
    const {
      records = [],
      totalCount = 0,
      hasError,
      status
    } = await loadMore({ pageIndex: ++state.pageIndex, pageSize: state.pageSize })
    hasError && Message.error(`${status}: ${errMsg || '获取数据失败!'}`)
    list.value = [...list.value, ...records]
    state.notMore = totalCount <= state.pageIndex * state.pageSize
    state.loading = false
  }

  const reloadList = () => {
    state.pageIndex = 0
    state.notMore = false
    list.value = []
    getInfiniteData()
  }

  return {
    ...toRefs(state),
    list,
    disabled,
    getInfiniteData,
    reloadList
  }
}
