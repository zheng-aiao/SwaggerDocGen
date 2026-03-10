import { reactive, toRefs, nextTick } from 'vue'
import { Message } from 'element-ui'
import service from '@/service'
import { formMode } from '@/enum/constant.js'
import { debounce } from 'lodash-es'

/**
 * @description 表格数据处理
 * @param {Function} fetch 请求方法
 * @param {Object} [options]  配置项
 * @param {String} [options.type] 请求类型: get | post
 * @param {String} [options.errMsg] 错误提示信息
 * @param {Boolean} [options.immediate] 是否立即执行
 * @param {String} [options.groupName] 取消请求的名称
 * @param {Object} [options.pageSizesOptions] 分页配置项
 */
function useTable(fetch, options = {}) {
  const {
    type = 'post',
    errMsg,
    immediate = false,
    groupName: gn,
    pageSizesOptions = [10, 20, 50, 100]
  } = options

  const groupName = gn ?? 'bizUseTable'
  const state = reactive({
    tableData: [], // 表格数据
    totalCount: 0, // 表格总数
    pageIndex: 1, // 当前页码
    pageSize: pageSizesOptions[0], // 每页显示条数
    pageSizes: pageSizesOptions, // 每页显示条数选项
    tableLoading: false, // 加载状态
    tabletSelection: [], // 选中行
    isInitTable: false // 是否初始化表格
  })

  /** 获取表格数据 */
  const getTableData = async (options) => {
    const { showLoading = true, delCount = 0 } = options ?? {}
    showLoading && (state.tableLoading = true)
    if (delCount) {
      reloadPageIndex(formMode.Delete, { deleteNumber: delCount, pageIndex: state.pageIndex })
    }
    const sendParams = {
      [type === 'post' ? 'pageIndex' : 'page']: state.pageIndex,
      [type === 'post' ? 'pageSize' : 'per_page']: state.pageSize
    }
    service.cancel(groupName)
    const {
      records = [],
      totalCount = 0,
      hasError,
      status,
      ...rest
    } = await fetch(sendParams, { groupName })
    const code = status ? status : rest.data?.response?.status ?? 0
    if (hasError && status !== -1) {
      // 取消请求的状态码为-1
      Message.error(code ? `${code}: ${errMsg || '获取数据失败'}` : errMsg || '获取数据失败')
    }
    state.tableData = records
    state.totalCount = totalCount
    showLoading && (state.tableLoading = false)
    state.isInitTable = true
  }

  immediate && nextTick(() => getTableData())

  /** 请求表格数据(无loading) */
  const refreshTableData = async () => {
    await getTableData({ showLoading: false })
    state.isInitTable = true
  }

  const pageChange = debounce((pageIndex) => {
    state.pageIndex = pageIndex
    getTableData()
  }, 300)

  const sizeChange = debounce((pageSize) => {
    state.pageIndex = 1
    state.pageSize = pageSize
    getTableData()
  }, 300)

  /**
   * 重新计算页码
   * @param {String} type 操作类型
   * @param {Object} [options] 配置项
   * @param {Number} [options.pageIndex] 指定页码
   * @param {Number} [options.deleteNumber] 删除数量
   */
  const reloadPageIndex = (type, options) => {
    const { pageIndex, deleteNumber = 1 } = options ?? {}
    const map = {
      [formMode.Insert]: () => {
        state.totalCount += 1
        state.pageIndex = pageIndex ? pageIndex : Math.ceil(state.totalCount / state.pageSize)
      },
      [formMode.Delete]: () => {
        if (state.tableData.length === deleteNumber && state.pageIndex > 1) {
          state.pageIndex -= 1
        }
      }
    }
    if (!type || type === formMode.Update || !map[type]) return
    map[type]()
  }

  /**
   * 处理表格选择变化事件，支持强制单选模式
   * @param {Array} value - 当前已选中的行数据数组
   * @param {Object} [options] - 配置选项
   * @param {boolean} [options.isSingle=false] - 是否启用单选模式（true 时强制只保留最后一项选择）
   * @param {Object} [options.ref] - el-table 的组件引用（用于调用 clearSelection 等方法）
   */
  const selectionChange = (value, options) => {
    const { isSingle, ref } = options ?? {}
    if (isSingle && value.length > 1) {
      ref.clearSelection()
      ref.toggleRowSelection(value.at(-1), true)
      state.tabletSelection = [value.at(-1)]
      return
    }
    state.tabletSelection = value
  }

  /**
   * 处理表格勾选，支持强制单选模式-多选
   * @param {Object} value - 当前选中的行数据
   * @param {Object} [options] - 配置选项
   * @param {boolean} [options.isSingle=false] - 是否启用单选模式，启用后只能保留最后一个选中的项
   * @param {boolean} [options.condition=false] - 是否切换页面时，自动选中当前页的选中项（仅限于原数据一致情况下）
   */
  const selectMultiple = (value, { isSingle = false, ref } = {}) => {
    const index = state.tabletSelection.findIndex(({ id }) => id === value.id)
    // 如果是单选模式且当前值不在已选中项中，清除其它选择，只保留当前值
    if (isSingle) {
      ref.clearSelection()
      ref.toggleRowSelection(value, true)
      state.tabletSelection = [value]
    } else {
      // 如果当前项已选中，删除它；否则添加它
      index !== -1 ? state.tabletSelection.splice(index, 1) : state.tabletSelection.push(value)
    }
  }

  /**
   * 处理表格选择变化勾选项，回显
   * @param {Object} value - 当前选中的行数据
   * @param {Object} [ref] - el-table 的组件引用（用于调用 toggleRowSelection 等方法）
   */
  const toggleRowSelection = (ref, bindKey) => {
    const timer = setTimeout(() => {
      // tip: 默认选中逻辑, 需要选中的列必须跟表格数据的引用一致
      const selectedIds = new Set([...state.tabletSelection.map((item) => item[bindKey])])
      const selected = state.tableData.filter((item) => selectedIds.has(item[bindKey]))
      selected.forEach((item) => ref.toggleRowSelection(item, true))
      clearTimeout(timer)
    }, 300)
  }

  return {
    ...toRefs(state),
    getTableData,
    pageChange,
    sizeChange,
    selectionChange,
    reloadPageIndex,
    refreshTableData,
    selectMultiple,
    toggleRowSelection
  }
}

export { useTable }
