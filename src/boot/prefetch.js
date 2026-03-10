import store from '@/store'
import service from '@/service'

/** 初始化一些系统数据 */
function init(config) {
  service.gdsBiz.getDistricts().then((res) => {
    const { records = [] } = res
    store.commit('setUserDistricts', records)
  })
  if (config.productId) {
    service.gdsBiz
      .getLayersByParentIdV2({
        productId: config.productId // 项目id
      })
      .then(({ records = [] }) => {
        const targetGroup = records.find((item) => item.groupKey === 'EnterpriseInformation')
        store.commit('setEnterpriseLayerId', targetGroup?.id || '')
      })
  }
}

export { init }
