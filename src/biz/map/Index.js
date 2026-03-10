import { initMap as init, destroyMap as destroyBaseMap, flyController } from '@rdapp/web-map3d-sdk'
import service from '@/service'
import { Message } from 'element-ui'
import { appConfig } from '@/config'
import store from '@/store'

/** cesium3d地图插件 */
let viewer = null // 底图实例
let instance = null // 业务模块实例

/**
 * 初始化地图
 * @template T - 构造器类型
 * @param {T} [Constructor] - 地图构造器类
 * @param {{ container?: string } & Object} [options] - 初始化配置(包含容器ID和其他构造器参数)
 * @returns {Promise<InstanceType<T> | viewer>} 构造器的实例或 null(只初始化底图)
 */
const createMapInstance = async (Constructor, options) => {
  const { hasError, status, ...result } = await service.gdsBiz.getGeoConfigs.cache({
    ProductId: appConfig.value.productId
  })
  if (hasError) {
    Message.error(`${status}: 服务器异常, 获取地图配置失败!`)
    return null
  }
  const {
    container = 'map',
    initLayersConfig = false,
    leftClickTargetCallBack,
    zoom,
    ...constructorOptions
  } = options || {}

  if (zoom) {
    result.center.zoom = zoom
  }
  viewer = await init({
    ...(appConfig.value.mapConfig ?? {}),
    ...result,
    leftClickTargetCallBack,
    initLayersConfig,
    container,
    currentArea: store.state.userDistricts[0] ?? {},
    enableMouseMoveDebounce: false, // 用于控制鼠标移动事件是否开启防抖
    isInitDV9000MouseEvent: false // 是否初始化DV9000鼠标事件
  })
  return Constructor ? new Constructor(viewer, constructorOptions) : viewer
}

const destroyMapFn = () => {
  instance && instance.destroyed()
  destroyBaseMap()
}

/**
 * 飞行到指定地图点位（支持多种参数格式）
 * @param {Object} options - 飞行配置参数
 * @param {number} [options.longitude] - 目标点经度（小写别名，优先级高）
 * @param {number} [options.Longitude] - 目标点经度（大写别名）
 * @param {number} [options.latitude] - 目标点纬度（小写别名，优先级高）
 * @param {number} [options.Latitude] - 目标点纬度（大写别名）
 * @param {number} [options.height] - 飞行高度（可选）
 */
const flyToPoint = (options) => {
  const { Longitude, Latitude, longitude, latitude, height, ...rest } = options ?? {}
  const lon = Number(longitude || Longitude)
  const lat = Number(latitude || Latitude)
  if (!lon || !lat) {
    return
  }

  flyController.flyToPoint({
    ...rest,
    longitude: lon,
    latitude: lat,
    altitude: height
  })
}

export * from '@rdapp/web-map3d-sdk'
export { createMapInstance, destroyMapFn, flyToPoint }
