import service from '@/service'
import store from '@/store'
import webSSO from '@rdapp/web-sso'
import packageJson from '../../package.json'
import { appConfig } from '@/config'
import { isDev } from '@/utils/publicMethod'
import * as commonService from '@rdapp/web-sso/src/commonService'

const waitText = document.querySelector('#waitText')

/**
 * 设置浏览器标签 logo
 * @param logoUri
 */
function setFavicon(logoUri) {
  let favicon = document.querySelector('link[rel="icon"]')
  if (!favicon) {
    favicon = document.createElement('link')
    favicon.rel = 'icon'
    document.head.appendChild(favicon)
  }
  favicon.href = logoUri
}

/**
 * 设置浏览器标签名称和系统标题
 * @param title 自定义标题
 * @param clientInfo 客户端信息
 */
function setTitleAndAdminTitle(title, clientInfo) {
  if (title) {
    document.title = title
    window.adminTitle = title
  } else {
    document.title = clientInfo.clientName
    window.adminTitle = clientInfo.clientName
  }
  localStorage.setItem('documentTitle', window.adminTitle)
}

/**
 * 设置默认部门及浏览器标签名称和系统标题
 * @param config 系统配置
 * @returns {Promise<void>}
 */
async function setDepartment(config) {
  // 设置应用图标
  const clientInfo = await service.authBiz.getClientConfigById(config.singleSignConfig.client_id)
  if (clientInfo?.applicationLogoUri) {
    const applicationLogoUri = '/auth/api' + clientInfo.applicationLogoUri
    setFavicon(applicationLogoUri)
  }

  // 获取部门权限
  let orgItem = await service.authBiz.getPermissionData(
    { type: 0 },
    {
      pageInfo: { dataKey: 'items', perPageKey: 'pageSize', pageKey: 'pageIndex' },
      data: { pageSize: 2 }
    }
  )

  // 当前用户信息
  const currentUser = store.getters.getCurrentUser ?? {}
  // 赋予的部门权限、如果为全部权限：自身第一个部门(原有逻辑)，如果是部分权限：取返回第一个部门
  let departmentId
  if (!orgItem.hasError && !orgItem.hasAllDataPermission) {
    if (orgItem.items.length > 0) {
      departmentId = orgItem.items[0].data
    }
  } else {
    if (
      currentUser.details?.departmentIds?.length &&
      currentUser.details?.departmentIds?.length > 0
    ) {
      departmentId = currentUser.details.departmentIds[0]
    }
  }
  setTitleAndAdminTitle(null, clientInfo)
}

async function init(config) {
  // 初始化版本信息
  const version = `版本:${packageJson.version}`
  store.commit('setVersion', version)
  console.log('🚀 ~ srm-web Version ~ init ~ e : ', packageJson.version)

  config.singleSignConfig.isOpenSingleSign = !isDev
  console.log('>>>>>>>>>>>store', store)
  const ssoResult = await webSSO.init(config, store)
  if (!ssoResult) {
    waitText.innerHTML = '用户未登录，停止页面加载!'
    return
  }

  // 当前用户信息
  let currentUser = store.getters.getCurrentUser ?? {}
  if (isDev) {
    // 开发环境构建用户信息
    const user = {
      access_token: config.singleSignConfig.localToken,
      profile: {
        sub: currentUser.id,
        idp: 'local'
      }
    }
    if (config.singleSignConfig?.localUsername) {
      // 根据用户名登录
      const tokenInfo = await commonService.connectToken(
        config.singleSignConfig?.localUsername,
        config.singleSignConfig?.localPwd ?? 'Nucleus!123'
      )
      user.access_token = tokenInfo?.access_token ?? user.access_token
      config.singleSignConfig.localToken = user.access_token
      appConfig.value.singleSignConfig.localToken = user.access_token
    }
    store.commit('setToken', user.access_token)
    // 获取当前用户信息
    currentUser = await webSSO._getUserDetails(user)
    currentUser.profile.name = currentUser?.account ?? ''
    store.commit('setCurrentUser', currentUser)
  }

  // 初始化业务库
  await service.init()

  // 设置默认部门及浏览器标签名称和系统标题、应用图标
  await setDepartment(config)
}

export { init }
