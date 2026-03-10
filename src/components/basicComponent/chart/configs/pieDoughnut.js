import { getCSSVariable } from '@/utils/publicMethod.js'

export const getPieDoughnutOption = (props) => {
  const textColor = getCSSVariable('--textColor-1')

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
        return name + ' ' + value + props.unit
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        padAngle: 5,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            formatter: `{a|{c}}{b|${props.unit}}\n{c|{b}}`,
            rich: {
              a: {
                color: textColor,
                fontSize: 30,
                fontWeight: 'bold'
              },
              b: {
                color: textColor,
                fontSize: 15,
                verticalAlign: 'bottom'
              },
              c: {
                color: textColor,
                fontSize: 15
              }
            }
          }
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
