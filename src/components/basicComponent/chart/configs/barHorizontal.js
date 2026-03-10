import { getCSSVariable } from '@/utils/publicMethod.js'

export const getBarHorizontalOption = (props) => {
  const textColor = getCSSVariable('--textColor-1')
  const lineColor = `rgb(${getCSSVariable('--color')})`

  return {
    color: Array.isArray(props.color) ? props.color : [props.color],
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: {} },
      splitLine: { lineStyle: { type: 'dashed', color: lineColor } },
      axisLabel: { color: textColor }
    },
    yAxis: {
      type: 'category',
      data: props.category,
      axisLine: { lineStyle: { color: lineColor } },
      axisLabel: { color: textColor },
      splitLine: { show: false },
      axisTick: { show: false }
    },
    series: Array.isArray(props.data)
      ? props.data.map((s) => ({
          name: s.name,
          type: 'bar',
          barWidth: 12,
          barCategoryGap: '80%',
          itemStyle: {
            borderRadius: [0, 8, 8, 0]
          },
          data: s.data || s
        }))
      : [
          {
            type: 'bar',
            barWidth: 12,
            barCategoryGap: '80%',
            itemStyle: {
              borderRadius: [0, 8, 8, 0]
            },
            data: props.data.data
          }
        ]
  }
}
