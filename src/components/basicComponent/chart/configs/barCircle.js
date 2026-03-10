import * as echarts from 'echarts'
import { hexToRgba, getCSSVariable } from '@/utils/publicMethod.js'

export const getBarCircleOption = (props) => {
  const textColor = getCSSVariable('--textColor-1')
  const lineColor = `rgb(${getCSSVariable('--color')})`

  return {
    color: Array.isArray(props.color)
      ? props.color.map(
          (c) =>
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: c },
              { offset: 1, color: hexToRgba(c, 0.2) }
            ])
        )
      : [
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: props.color },
            { offset: 1, color: hexToRgba(props.color, 0.2) }
          ])
        ],
    legend: {
      icon: 'roundRect',
      data: Array.isArray(props.data) ? props.data.map((s) => s.name) : [],
      left: 'center',
      itemWidth: 12,
      itemHeight: 8,
      top: 10,
      textStyle: { color: textColor }
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
    series: Array.isArray(props.data)
      ? props.data.map((s) => ({
          name: s.name,
          type: 'bar',
          barWidth: 18,
          barCategoryGap: '60%',
          itemStyle: {
            borderRadius: [8, 8, 0, 0]
          },
          data: s.data || s
        }))
      : [
          {
            name: props.data.name,
            type: 'bar',
            barWidth: 18,
            barCategoryGap: '60%',
            itemStyle: {
              borderRadius: [8, 8, 0, 0]
            },
            data: props.data.data
          }
        ]
  }
}
