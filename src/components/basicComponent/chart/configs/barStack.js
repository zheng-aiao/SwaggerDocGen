import * as echarts from 'echarts'
import { hexToRgba, getCSSVariable } from '@/utils/publicMethod.js'

// 堆叠柱状图（标准矩形柱，适配 ECharts 6）
export const getBarStackOption = (props) => {
  const textColor = getCSSVariable('--textColor-1')
  const lineColor = `rgb(${getCSSVariable('--color')})`

  const colors = Array.isArray(props.color) ? props.color : [props.color]

  // 统一把数据整理成「系列数组」的形式，支持：
  // 1）[{ name, stack, data: [...] }, ...]
  // 2）{ name, stack, data: [...] }
  const seriesSource = Array.isArray(props.data) ? props.data : props.data ? [props.data] : []

  return {
    // 每个系列使用渐变色，与其它柱状图保持一致
    color: colors.map(
      (c) =>
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: c },
          { offset: 1, color: hexToRgba(c, 0.2) }
        ])
    ),
    legend: {
      icon: 'roundRect',
      data: seriesSource.map((s) => s.name),
      left: 'center',
      itemWidth: 12,
      itemHeight: 8,
      top: 10,
      textStyle: { color: textColor }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: [
      {
        type: 'category',
        data: props.category,
        axisLine: { show: true, lineStyle: { width: 1, color: lineColor } },
        axisLabel: { color: textColor },
        axisTick: { show: false },
        splitLine: { show: false }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: props.unit,
        nameTextStyle: { color: textColor },
        axisLine: { lineStyle: {} },
        splitLine: { lineStyle: { type: 'dashed', color: lineColor } },
        axisLabel: { color: textColor },
        axisTick: { show: false }
      }
    ],
    series: seriesSource.length
      ? seriesSource.map((s, index) => ({
          name: s.name,
          type: 'bar',
          // 默认都堆叠到同一个 stack 上；如有自定义 stack，则优先用传入的
          stack: s.stack || 'total',
          barWidth: 18,
          barCategoryGap: '40%',
          emphasis: {
            focus: 'series'
          },
          data: s.data || s
        }))
      : []
  }
}
