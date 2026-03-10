<template>
  <div class="rdapp-chart">
    <!-- 排名图 -->
    <RankChart v-if="type === 'rank'" :data="data" :category="category" :unit="unit" />

    <!-- 百分比图 -->
    <PercentChart v-if="type === 'percent'" :data="data" :category="category" />

    <!-- 立方体值图 -->
    <ValueCubeChart v-if="type === 'valueCube'" :data="data" :unit="unit" />

    <!-- 圆形值图 -->
    <ValueCircleChart v-if="type === 'valueCircle'" :data="data" :unit="unit" />

    <!-- ECharts图表 -->
    <EChartsChart
      v-if="
        [
          'barAngle',
          'barStack',
          'barCircle',
          'barHorizontal',
          'barCube',
          'line',
          'pieNightingale',
          'pieDoughnut',
          'pieLine',
          'radar'
        ].includes(type)
      "
      ref="echartsChart"
      :type="type"
      :data="data"
      :category="category"
      :unit="unit"
      :color="color"
      :option-formatter="optionFormatter"
      @click="handleClick"
    />
  </div>
</template>

<script setup>
  import { ref, defineExpose } from 'vue'
  import RankChart from './RankChart.vue'
  import PercentChart from './PercentChart.vue'
  import ValueCubeChart from './ValueCubeChart.vue'
  import ValueCircleChart from './ValueCircleChart.vue'
  import EChartsChart from './EChartsChart.vue'

  const props = defineProps({
    type: {
      type: String,
      default: 'barAngle',
      validator: (value) => {
        const validTypes = [
          'barAngle', // 1. 斜角柱状图
          'barCircle', // 2. 圆角柱状图
          'barHorizontal', // 3. 横向柱状图
          'barCube', // 4. 立方体柱状图
          'line', // 5. 折线图
          'pieNightingale', // 6. 南丁格尔图
          'pieDoughnut', // 7. 环形图
          'pieLine', // 8. 环形带线图
          'radar', // 9. 雷达图
          'rank', // 10. 排名图
          'percent', // 11. 百分比图
          'valueCube', // 12. 立方体值图
          'valueCircle', // 13. 圆形值图
          'barStack' // 14. 堆叠柱图
        ]
        return validTypes.includes(value)
      }
    },
    data: {
      type: [Number, Object, Array],
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

  const emit = defineEmits(['click'])

  const echartsChart = ref(null)

  const handleClick = (params) => {
    emit('click', params)
  }

  // Expose methods
  defineExpose({
    getChartInstance: () => echartsChart.value?.getChartInstance(),
    showLoading: () => echartsChart.value?.showLoading(),
    hideLoading: () => echartsChart.value?.hideLoading()
  })
</script>

<style lang="scss" scoped>
  .rdapp-chart {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
