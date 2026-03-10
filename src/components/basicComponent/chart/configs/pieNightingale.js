import { getCSSVariable } from '@/utils/publicMethod.js'

export const getPieNightingaleOption = (props) => {
  const textColor = getCSSVariable('--textColor-1')
  const total = Array.isArray(props.data)
    ? props.data.reduce((a, b) => a + b, 0)
    : props.data.data.reduce((a, b) => a + b, 0)

  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      top: 'middle',
      itemWidth: 12,
      itemHeight: 8,
      textStyle: { color: textColor },
      formatter: (name) => {
        const value = Array.isArray(props.data)
          ? props.data[props.category.indexOf(name)]
          : props.data.data[props.category.indexOf(name)]
        return name + ' ' + ((value / total) * 100).toFixed(2) + '%'
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['10%', '70%'],
        roseType: 'radius',
        label: {
          show: false,
          position: 'center'
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
