import { getCSSVariable } from '@/utils/publicMethod.js'

export const getPieLineOption = (props) => {
  const textColor = getCSSVariable('--textColor-1')
  const total = Array.isArray(props.data)
    ? props.data.reduce((a, b) => a + b, 0)
    : props.data.data.reduce((a, b) => a + b, 0)

  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'center',
      top: 10,
      itemWidth: 12,
      itemHeight: 8,
      textStyle: { color: textColor }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        label: {
          show: true,
          formatter: `{c}${props.unit}`,
          color: textColor
        },
        itemStyle: {
          borderRadius: 5
        },
        data: Array.isArray(props.data)
          ? props.category.map((c, i) => ({
              value: props.data[i],
              name: c
            }))
          : props.category.map((c, i) => ({
              value: props.data.data[i],
              name: c
            }))
      }
    ]
  }
}
