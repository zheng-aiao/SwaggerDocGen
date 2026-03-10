<template>
  <el-input
    :value="address"
    :placeholder="$attrs.placeholder || '点击图标打开地图进行定位'"
    :maxlength="$attrs.maxlength || 255"
    :readonly="readonly"
    :disabled="readonly"
    clearable
    @input="input"
  >
    <i slot="prefix" class="iconfont map-icon" @click="openMap">&#xe6be;</i>
  </el-input>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue'
  import mapService from 'src/biz/map/MapService.js'
  const emit = defineEmits(['input'])

  const props = defineProps({
    readonly: { type: Boolean, default: false },
    value: { type: Object, required: true },
    onlyPoint: { type: Boolean },
    onlyZone: { type: Boolean },
    needsStringConversion: { type: Boolean, default: false }
  })

  const address = ref('')
  const internalMapData = ref([])

  watch(
    () => props.value,
    () => {
      setParams(props.value)
    }
  )

  onMounted(() => {
    setParams(props.value)
  })

  const input = (val) => {
    const data = { ...props.value }
    data.address = val
    emit('input', data)
  }

  const setParams = (val = {}) => {
    address.value = val.address || ''

    let pointList = val.lngLat
    if (!pointList) {
      internalMapData.value = []
      return
    }
    if (typeof pointList === 'string') {
      pointList = JSON.parse(pointList)
    }
    if (!Array.isArray(pointList)) {
      pointList = [pointList]
    }

    internalMapData.value = pointList
  }

  const openMap = async () => {
    let { lng, lat } = {}
    if (internalMapData.value.length) {
      const { lngSum, latSum } = internalMapData.value.reduce(
        (acc, point) => {
          acc.lngSum += point.lng
          acc.latSum += point.lat
          return acc
        },
        { lngSum: 0, latSum: 0 }
      )
      lng = truncateTo12Decimals(lngSum / internalMapData.value.length)
      lat = truncateTo12Decimals(latSum / internalMapData.value.length)
    }
    const defaultPoint = { address: address.value }
    if (lng && lat) defaultPoint.center = [lng, lat]
    if (props.value?.areaCode) defaultPoint.areaCode = props.value.areaCode

    const {
      center = [],
      mapPlotting = [],
      address: local
    } = await mapService.pickPoint({
      defaultPoint,
      readonly: props.readonly,
      pointList: internalMapData.value,
      onlyPoint: props.onlyPoint,
      onlyZone: props.onlyZone
    })

    if (local) {
      // address.value = local
      const data = {
        address: local
      }
      if (mapPlotting.length) {
        data.lngLat = mapPlotting.map((e) => ({ lng: e[0], lat: e[1] }))
      }
      if (center.length) {
        data.lngLat = [{ lng: center[0].lng, lat: center[0].lat }]
      }
      if (props.needsStringConversion) data.lngLat = JSON.stringify(data.lngLat)
      emit('input', data)
    }
  }

  const truncateTo12Decimals = (num) => {
    const str = num.toString()
    const dotIndex = str.indexOf('.')
    if (dotIndex === -1) return str // 无小数直接返回
    // 截取到小数点后第12位（不四舍五入）
    const truncated = str.slice(0, dotIndex + 13)
    // 移除末尾的零
    return truncated.replace(/0+$/, '').replace(/\.$/, '')
  }
</script>
