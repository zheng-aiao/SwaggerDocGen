<!-- 地图绘制组件 -->
<template>
  <div id="fenceMap"></div>
</template>

<script>
  import {
    createMapInstance,
    flyToPoint,
    mapPlotController,
    destroyMapFn
  } from '@/biz/map/Index.js'
  import service from 'src/service'
  import pubSub from 'pubsub-js'
  import store from 'src/store'

  export default {
    name: 'MapPlotting',
    props: {
      readonly: {
        type: Boolean
      },
      routePointList: {
        type: Array,
        default: () => []
      }
    },

    data() {
      return {
        zoneTypeInfo: null,
        mapPlotting: []
      }
    },

    computed: {
      userDistricts() {
        return store.state.userDistricts ?? []
      }
    },

    async mounted() {
      // 获取用户配置行政区域第一条
      const { coordinate, areaCode: defaultAreaCode } = this.userDistricts?.at(0) ?? {}
      // 拿到对应行政区域的经纬度
      const { longitude: defaultLon, latitude: defaultLat } = coordinate ?? {}
      let params = { longitude: defaultLon, latitude: defaultLat }

      const data = await createMapInstance(null, { container: 'fenceMap' })

      // 开启协同标绘
      mapPlotController.openSharePlot(true)
      this.zoneTypeInfo = (await mapPlotController.getPlotTypeByKeywords('多边形'))[0]

      if (this.routePointList.length) {
        const addressList = this.routePointList.map((e) => [e.lng, e.lat])
        this.mapPlotting = window.structuredClone(addressList)
        const data = {
          type: 'Feature',
          id: 1,
          geometry: JSON.stringify({
            type: 'Polygon',
            coordinates: [[...addressList, addressList[0]]]
          }),
          properties: JSON.stringify({
            customStyles: {},
            isEdit: !this.readonly,
            id: '04caee09-fb92-4bb1-944f-87175c54eb9e',
            drawType: 'draw_polygon',
            drawStep: [...addressList]
          })
        }
        mapPlotController.createPlot(data)

        const { lngSum, latSum } = this.routePointList.reduce(
          (acc, point) => {
            acc.lngSum += point.lng
            acc.latSum += point.lat
            return acc
          },
          { lngSum: 0, latSum: 0 }
        )
        const lng = this.truncateTo12Decimals(lngSum / this.routePointList.length)
        const lat = this.truncateTo12Decimals(latSum / this.routePointList.length)
        params = { longitude: lng, latitude: lat }
        flyToPoint(params)
      } else {
        flyToPoint(params)
        this.startPlot()
      }

      if (this.readonly) {
        mapPlotController.startPlot('simple_select')
      } else {
        pubSub.subscribe('mapDrawCreated', (_, data) => {
          if (data.properties.drawStep.length > 10) {
            mapPlotController.deleteAllPlot()
            this.startPlot()
            return this.$Notify.createWarning('区域点位不得大于10个点')
          }
          this.mapPlotting = data.properties.drawStep.map((e) => ({ lng: e[0], lat: e[1] }))
          this.$emit('submit', this.mapPlotting)
        })
        pubSub.subscribe('mapDrawUpdated', (_, data) => {
          if (data.properties.drawStep.length > 10) {
            mapPlotController.deleteAllPlot()
            this.startPlot()
            return this.$Notify.createWarning('区域点位不得大于10个点')
          }
          this.mapPlotting = data.properties.drawStep.map((e) => ({ lng: e[0], lat: e[1] }))
          this.$emit('submit', this.mapPlotting)
        })
      }
    },
    beforeDestroy() {
      mapPlotController.destroyPlotHandler()
      destroyMapFn()
      pubSub.unsubscribe('mapDrawCreated')
      pubSub.unsubscribe('mapDrawUpdated')
    },

    methods: {
      // 开始绘制区域
      startPlot() {
        mapPlotController.startPlot(this.zoneTypeInfo.type)
      },
      repaint() {
        mapPlotController.deleteAllPlot()
        this.mapPlotting = []
        this.startPlot()
        this.$emit('submit', this.mapPlotting)
      },
      truncateTo12Decimals(num) {
        const str = num.toString()
        const dotIndex = str.indexOf('.')
        if (dotIndex === -1) return str // 无小数直接返回
        // 截取到小数点后第12位（不四舍五入）
        const truncated = str.slice(0, dotIndex + 13)
        // 移除末尾的零
        return truncated.replace(/0+$/, '').replace(/\.$/, '')
      }
    }
  }
</script>
<style lang="scss" scoped>
  #fenceMap {
    position: relative;
    width: 100%;
    height: 600px;
  }
</style>
