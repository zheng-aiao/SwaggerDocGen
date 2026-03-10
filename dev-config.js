const path = require('path')
const fs = require('fs')

function generateProxyRules(paths, target, extraOptions = {}) {
  const rules = {}
  paths.forEach((path) => {
    rules[path] = { target, changeOrigin: true, secure: false, ...extraOptions }
  })
  return rules
}

module.exports = {
  port: 10090,
  open: false,
  client: {
    overlay: false
  },
  proxy: {
    // 通用代理规则配置
    ...generateProxyRules(
      [
        '/auth/api',
        '/dcs/api',
        '/das/api',
        '/orgs/api',
        '/gds/api',
        '/rrs/api',
        '/aggs/api',
        '/ets/api',
        '/vfs/api',
        '/apts/api',
        '/ats/api',
        '/ss/api',
        '/gcs/api',
        '/fss/api',
        '/fssfiles',
        '/gas/api',
        '/cgs/api',
        '/edms/api',
        '/pas/api',
        '/vcs/api',
        '/mas/api',
        '/sdus/api',
        '/vss/api',
        '/agw/api',
        '/ims/api',
        '/mmt/api',
        '/prometheus/api',
        '/resource/api',
        '/resource/egis',
        '/resource/workmap',
        '/msg/api',
        '/map/mbview',
        '/map/geowebcache',
        '/resource/map',
        '/xims/api/',
        '/xgmeet/api',
        '/lais/api',
        '/kkfileView',
        '/prometheus/api',
        '/libavWeb',
        '/srm/abs/api',
        '/srm/sebs/api',
        '/srm/dws/api',
        '/srm/sts/api',
        '/srm/olms/api',
        '/srm/ils/api',
        '/srm/cts/api'
      ],
      'https://newdev.rdapp.com:10090'
    ),
    // WebSocket 代理
    ...generateProxyRules(
      [
        '/das/signalr',
        '/vfs/api/ws/gb',
        '/vfs/api/ws',
        '/vfs/api/live/ws/gb',
        '/vfs/api/live/ws',
        '/gcs/ws',
        '/cbs/ws',
        '/edms/ws',
        '/rcs/ws',
        '/vss/ws',
        '/agw/ws',
        '/xims/ws/'
      ],
      'https://newdev.rdapp.com:10090',
      { ws: true }
    )
    // 特殊代理配置
    // '/srm/sts/api': {
    //   target: 'http://192.168.12.144:9008',
    //   changeOrigin: true,
    //   rewrite: (path) => path.replace(/^\/srm\/sts\/api/, '')
    // }
  }
}
