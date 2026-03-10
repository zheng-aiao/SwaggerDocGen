<script setup>
  import { ref, onMounted, onBeforeUnmount, defineExpose, watch } from 'vue'
  import { useStore } from '@/hooks'
  import * as echarts from 'echarts'
  import { debounce } from 'lodash-es'
  import { getChartTypeOption } from './configs/index.js'

  const props = defineProps({
    type: {
      type: String,
      default: 'barAngle'
    },
    data: {
      type: [Object, Array],
      default: () => []
    },
    category: {
      type: Array,
      default: () => []
    },
    unit: {
      type: String,
      default: () => ''
    },
    color: {
      type: [String, Array],
      default: () => [
        '#007CFF',
        '#24FCFF',
        '#20ED59',
        '#FAFA1E',
        '#FF9900',
        '#FF4D4D',
        '#FF3DFF',
        '#9C38FF'
      ]
    },
    optionFormatter: {
      type: Function,
      default: null
    }
  })

  const store = useStore()

  const emit = defineEmits(['click'])

  const chart = ref(null)
  const chartInstance = ref(null)
  const resizeObserver = ref(null)

  // 初始化图表
  const initChart = () => {
    if (!chart.value) return

    if (chartInstance.value) {
      chartInstance.value.dispose()
    }

    chartInstance.value = echarts.init(chart.value)
    const option = getChartOption()
    chartInstance.value.setOption(option)

    chartInstance.value.on('click', handleClick)
  }

  // 根据类型生成图表配置
  const getChartOption = () => {
    const baseOption = {
      color: Array.isArray(props.color) ? props.color : [props.color],
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: 50,
        containLabel: true
      },
      tooltip: {
        trigger: props.type.indexOf('pie') === 0 ? 'item' : 'axis'
      }
    }

    const chartOption = getChartTypeOption(props.type, props)
    return props.optionFormatter
      ? props.optionFormatter({ ...baseOption, ...chartOption }, props)
      : { ...baseOption, ...chartOption }
  }

  // 设置尺寸监听
  const setupResizeObserver = () => {
    if (chart.value) {
      resizeObserver.value = new ResizeObserver(
        debounce(() => {
          chartInstance.value?.resize()
        }, 100)
      )
      resizeObserver.value.observe(chart.value)
    }
  }

  // 销毁图表
  const destroyChart = () => {
    if (chartInstance.value) {
      chartInstance.value.dispose()
      chartInstance.value = null
    }
  }

  // 点击事件处理
  const handleClick = (params) => {
    emit('click', params)
  }

  // Watchers
  watch(
    () => [props.type, props.data, props.color, store.state.theme],
    () => {
      initChart()
    },
    { deep: true }
  )

  // Lifecycle hooks
  onMounted(() => {
    initChart()
    setupResizeObserver()
  })

  onBeforeUnmount(() => {
    destroyChart()
    if (resizeObserver.value) {
      resizeObserver.value.disconnect()
    }
  })

  // Expose methods
  defineExpose({
    getChartInstance: () => chartInstance.value,
    showLoading: () => chartInstance.value?.showLoading(),
    hideLoading: () => chartInstance.value?.hideLoading()
  })
</script>

<template>
  <div ref="chart" class="echart-container"></div>
</template>

<style scoped>
  .echart-container {
    width: 100%;
    height: 100%;
  }
</style>
