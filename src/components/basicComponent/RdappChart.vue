<script setup>
  import { ref, defineExpose } from 'vue'
  import Index from './chart/Index.vue'

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
    },
    title: { type: String, default: '' }
  })

  const emit = defineEmits(['click'])

  const chartRef = ref(null)

  const handleClick = (params) => {
    emit('click', params)
  }

  // Expose methods
  defineExpose({
    getChartInstance: () => chartRef.value?.getChartInstance(),
    showLoading: () => chartRef.value?.showLoading(),
    hideLoading: () => chartRef.value?.hideLoading()
  })
</script>

<template>
  <div class="RdappChart">
    <div v-if="title" class="chart-title">
      <span class="text">{{ title }}</span>
    </div>
    <div class="chart-wrap">
      <Index
        ref="chartRef"
        :type="type"
        :data="data"
        :category="category"
        :unit="unit"
        :color="color"
        :option-formatter="optionFormatter"
        @click="handleClick"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .RdappChart {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .chart-title {
    height: pxToRem(24);
  }
  .chart-wrap {
    flex: 1;
  }
</style>
