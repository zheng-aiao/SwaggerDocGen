import service from '@/service'
import store from '@/store'

const appAuth = {
  permissions: [] // 权限
}

/**
 * 验证权限
 * @param unique 权限code, 匹配前缀, 父: 700100, 子: 700100100
 * @returns {boolean}
 */
function verifyAuth(unique) {
  // 无权限码
  if (!unique) return true
  const code = String(unique).trim()
  // 统一处理单个或多个权限码的情况
  const authCodesToCheck = code.includes(',') ? code.split(',') : [code]

  // 检查用户是否有任一匹配权限
  return authCodesToCheck.some((requiredAuth) => {
    return appAuth.permissions.some(
      (userAuth) =>
        userAuth?.data?.startsWith(requiredAuth) || requiredAuth?.startsWith(userAuth?.data)
    )
  })
}

/**
 * 获取用户权限
 * @param functionRootIds
 * @param sendConfig
 * @returns {Promise<{allItems: [], hasError: boolean, status: string}>}
 */
async function getUserPermissions(functionRootIds, sendConfig) {
  let allItems = []
  let hasError = false
  let status = ''
  const originalGetAllPage = sendConfig.getAllPage
  const originalPageSize = sendConfig.data.pageSize

  for (const functionRootId of functionRootIds) {
    sendConfig.getAllPage = originalGetAllPage
    sendConfig.data.pageSize = originalPageSize
    sendConfig.data.functionRootId = functionRootId
    if (functionRootId === 100601) {
      sendConfig.getAllPage = false
      sendConfig.data.pageSize = 1
    }
    const {
      items = [],
      hasError: currentHasError,
      status: currentStatus
    } = await service.authBiz.getPermissionData.cache(
      {
        type: 4,
        functionRootId: functionRootId
      },
      sendConfig
    )

    if (currentHasError) {
      hasError = true
      status = currentStatus
      break
    }
    allItems = allItems.concat(items)
  }

  return { allItems, hasError, status }
}

async function init(config) {
  const waitText = document.querySelector('#waitText')
  await setUrlParams()
  // 获取当前用户权限
  const functionRootIds = Array.isArray(config.functionRootId)
    ? config.functionRootId
    : [500, 800, 100]
  const sendConfig = {
    getAllPage: true,
    pageInfo: { dataKey: 'items', perPageKey: 'pageSize', pageKey: 'pageIndex' },
    data: { pageSize: 256 }
  }

  const { allItems, hasError, status } = await getUserPermissions(functionRootIds, sendConfig)
  if (hasError) {
    waitText.innerHTML = `${status}: 获取权限失败，停止页面加载!`
    return false
  }
  appAuth.permissions = allItems
}

/**
 * 获取 isHiddenHeader/redirect 的值（优先从 URL 参数获取，其次从 localStorage 获取）
 */
async function setUrlParams() {
  try {
    // 设置回调页面
    window.localStorage.setItem('returnUrl', window.location.href)
    // 1. 从 URL 参数获取
    const urlParams = new URLSearchParams(window.location.search)
    const urlHeaderValue = urlParams.get('isHiddenHeader')
    const urlMenuValue = urlParams.get('isHiddenMenu')
    const redirect = urlParams.get('redirect')
    window.localStorage.setItem('redirect', redirect || '')
    window.localStorage.setItem('isHiddenHeader', urlHeaderValue || '')
    window.localStorage.setItem('isHiddenMenu', urlMenuValue || '')
  } catch (error) {
    log.error('Error parsing search params:', error)
  }
}

export { init, appAuth, verifyAuth }
