<template>
  <RdappDialog
    content-class="SelectMapPoint"
    value
    hide-mask
    :title="readonly ? '地址详情' : '地址选择'"
    :readonly="readonly"
    @confirm="confirm"
    @input="input"
  >
    <div class="map-container">
      <div id="map"></div>
      <el-form ref="formRef" :model="state" class="point-info" label-position="left">
        <el-form-item label="经度" prop="longitude">
          <RdappInput
            v-model.trim="state.longitude"
            :readonly="props.readonly"
            clearable
          ></RdappInput>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <RdappInput
            v-model.trim="state.latitude"
            :readonly="props.readonly"
            clearable
          ></RdappInput>
        </el-form-item>
        <RdappButton v-show="!props.readonly" second class="btn-locate" @click="updatePoint"
          >定位</RdappButton
        >
      </el-form>
    </div>
    <SearchBar
      v-if="!props.readonly"
      ref="searchUtilsBar"
      :only-point="props.onlyPoint"
      :only-zone="props.onlyZone"
      :draw-type="drawType"
      @change="change"
      @drawType="changDrawType"
      @clearDraw="clearDraw"
    ></SearchBar>
    <div class="point-detail">
      <span class="label">地址: </span>
      {{ state.address ?? '-' }}
    </div>
  </RdappDialog>
</template>
<script setup>
  import { ref, reactive, computed, onMounted, nextTick, onBeforeUnmount } from 'vue'
  import { increaseZIndex } from '@/utils/publicMethod'
  import { longitude as longitudeRule, latitude as latitudeRule } from '@/utils/validateRules'
  import { Message } from 'element-ui'
  import {
    baseToolController,
    createMapInstance,
    destroyMapFn,
    flyToPoint,
    mapPlotController
  } from '@/biz/map/Index.js'

  import store from 'src/store'
  import pubSub from 'pubsub-js'
  import service from 'src/service'
  import SearchBar from './SearchUtilsBar.vue'

  const props = defineProps({
    defaultPoint: {
      type: Object,
      default: () => ({
        center: [],
        address: ''
      })
    },
    readonly: {
      type: Boolean,
      default: false
    },
    pointList: {
      type: Array,
      default: () => []
    },
    onlyPoint: {
      type: Boolean
    },
    onlyZone: {
      type: Boolean
    }
  })

  const emit = defineEmits(['close', 'confirm'])

  let state = reactive({
    longitude: 0,
    latitude: 0,
    address: ''
  })
  const userDistricts = computed(() => store.state.userDistricts ?? [])
  const drawType = ref('point')
  const zoneTypeInfo = ref(null)
  const isChangType = ref(false)

  onMounted(async () => {
    increaseZIndex(document.querySelector('.SelectMapPoint'))
    // 获取用户配置行政区域第一条
    const {
      coordinate,
      name: defaultAddress,
      areaCode: defaultAreaCode,
      namePath: defaultPath
    } = userDistricts.value?.at(0) ?? {}
    // 拿到对应行政区域的经纬度
    const { longitude: defaultLon, latitude: defaultLat } = coordinate ?? {}
    // 点击地图选点, 默认中心点优先级: 1.传入的默认点位 2.当前用户所属的权限区域 3.默认北京市
    const {
      center: location = [],
      address: place,
      areaCode: code,
      ...rest
    } = props.defaultPoint ?? {}

    if (validateLocation(location)) {
      state.longitude = location[0]
      state.latitude = location[1]
    } else {
      state.longitude = defaultLon ?? 116.412893
      state.latitude = defaultLat ?? 39.910286
    }

    state.address = place || defaultAddress || '北京市'
    const params = { longitude: state.longitude, latitude: state.latitude }
    // 初始化地图
    await createMapInstance()
    // 飞行到中心点
    flyToPoint(params)

    if (!props.onlyZone && (!props.pointList.length || props.pointList.length === 1)) {
      startPick(params)
      zoneTypeInfo.value = (await mapPlotController.getPlotTypeByKeywords('多边形'))[0]
    } else {
      drawType.value = 'zone'
      zoneTypeInfo.value = (await mapPlotController.getPlotTypeByKeywords('多边形'))[0]
      if (props.pointList.length) {
        const addressList = props.pointList.map((e) => [e.lng, e.lat])
        state = { mapPlotting: addressList, address: state.address }
        const data = {
          type: 'Feature',
          id: 1,
          geometry: JSON.stringify({
            type: 'Polygon',
            coordinates: [[...addressList, addressList[0]]]
          }),
          properties: JSON.stringify({
            customStyles: {},
            isEdit: !props.readonly,
            id: '04caee09-fb92-4bb1-944f-87175c54eb9e',
            drawType: 'draw_polygon',
            drawStep: [...addressList]
          })
        }
        mapPlotController.createPlot(data)
      } else {
        state = { mapPlotting: [], address: '' }
        startPlot()
      }
    }

    if (props.readonly) {
      baseToolController.stopPick()
      mapPlotController.startPlot('simple_select')
    } else {
      pubSub.subscribe('mapDrawCreated', (_, data) => {
        if (isChangType.value) {
          isChangType.value = false
          return
        }
        if (data.properties.drawStep.length > 10) {
          mapPlotController.deleteAllPlot()
          startPlot()
          return Message.warning('区域点位不得大于10个点')
        }
        state.mapPlotting = data.properties.drawStep
        callback(
          { lng: data.properties.drawStep[0][0], lat: data.properties.drawStep[0][1] },
          false
        )
      })
      pubSub.subscribe('mapDrawUpdated', (_, data) => {
        console.log(('Draw ~ pubSub.subscribe ~ data', data))
        if (isChangType.value) {
          isChangType.value = false
          return
        }
        if (data.properties.drawStep.length > 10) {
          mapPlotController.deleteAllPlot()
          startPlot()
          return Message.warning('区域点位不得大于10个点')
        }
        state.mapPlotting = data.properties.drawStep
        callback(
          { lng: data.properties.drawStep[0][0], lat: data.properties.drawStep[0][1] },
          false
        )
      })
    }
  })

  const startPick = (payload = {}) => {
    const params = {
      ...payload,
      icon: '/resource/api/commondata/icons/406000100010.png',
      callback: callback
    }
    baseToolController.startPick(params)
  }
  // 开始绘制区域
  const startPlot = () => {
    mapPlotController.startPlot(zoneTypeInfo.value.type)
  }

  const callback = async (position, isPosition = true) => {
    const { lng, lat } = position
    // 根据经纬度获取地理位置详情
    const groupName = 'gasBiz.getGeocodingReverse'
    service.cancel(groupName)
    const { location, formattedAddress, hasError } = await service.gasBiz.getGeocodingReverse(
      { 'Location.Longitude': lng, 'Location.Latitude': lat },
      { groupName }
    )
    const {
      // records = [],
      hasError1,
      status
    } = await service.gdsBiz.getDistrictsByAnalysis({
      address: formattedAddress,
      coordinate: location
    })
    if (status <= 0) return
    if (hasError || hasError1) {
      Message.error(`${status}: 解析地址失败，请重新选择点位!`)
      return
    }
    // 解析成功, 更新地址和经纬度
    const { longitude, latitude } = location ?? {}

    if (isPosition) {
      state.longitude = longitude || lng
      state.latitude = latitude || lat
    }
    state.address = formattedAddress
  }

  const change = (params) => {
    if (drawType.value === 'point') {
      const { longitude: lng, latitude: lat, formattedAddress } = params ?? {}
      state.longitude = lng
      state.latitude = lat
      state.address = formattedAddress
    }
  }

  // 切换绘制类型
  const changDrawType = (type) => {
    if (type === 'point') {
      isChangType.value = true
      mapPlotController.startPlot('simple_select')
      mapPlotController.deleteAllPlot()
      state = { longitude: '', latitude: '', address: '' }
      nextTick(() => {
        startPick()
      })
    } else {
      baseToolController.clearAll()
      state = { mapPlotting: [], address: '' }
      startPlot()
    }
    drawType.value = type
  }

  // 清除标绘
  const clearDraw = () => {
    mapPlotController.deleteAllPlot()
    state = { mapPlotting: [], address: '' }
    startPlot()
  }

  const updatePoint = () => {
    if (!state.longitude || !state.latitude) {
      Message.warning('请先选择点位')
      return
    }
    const params = { longitude: state.longitude, latitude: state.latitude }
    flyToPoint(params)
    if (!props.readonly) {
      baseToolController.updatePickPosition(params)
      callback({ lng: state.longitude, lat: state.latitude }, false)
    }
  }

  const confirm = () => {
    closeMap()
    const data = {
      address: state.address
    }
    if (state.mapPlotting) {
      data.mapPlotting = state.mapPlotting
    } else if (state.longitude && state.latitude) {
      data.center = [{ lng: state.longitude, lat: state.latitude }]
    }

    emit('confirm', data)
  }
  const closeMap = () => {
    baseToolController.destroyed()
    mapPlotController.destroyPlotHandler()
    destroyMapFn()
    pubSub.unsubscribe('mapDrawCreated')
    pubSub.unsubscribe('mapDrawUpdated')
  }
  const input = () => {
    emit('close')
  }

  const validateLocation = (center) => {
    const [lo, la] = center
    const isLo = longitudeRule(lo)
    const isLa = latitudeRule(la)
    return isLo === true && isLa === true
  }

  onBeforeUnmount(() => {
    closeMap()
  })
</script>
<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .SelectMapPoint {
    width: 1600px;
    height: 940px;

    .map-container {
      width: 100%;
      height: calc(100% - 22px - 16px);
      position: relative;
      #map {
        height: 100%;
      }

      .point-info {
        @include wh(244px, fit-content);
        @include mapCardStyle;
        position: absolute;
        top: 8px;
        right: 8px;
        z-index: 1;
        display: flex;
        flex-direction: column;
        padding: 16px;

        .btn-locate {
          > .el-button {
            width: 100%;
          }
        }
      }
    }
  }
</style>
