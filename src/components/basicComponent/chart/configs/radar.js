import { getCSSVariable } from '@/utils/publicMethod.js'

export const getRadarOption = (props) => {
  const textColor = getCSSVariable('--textColor-1')

  // 计算所有系列数据的最大值
  const dataArray = Array.isArray(props.data)
    ? props.data.map((s) => s.data || s).flat()
    : props.data.data
  const maxValue = Math.max(...dataArray) || 100

  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'center',
      top: 10,
      itemWidth: 12,
      itemHeight: 8,
      textStyle: { color: textColor },
      data: Array.isArray(props.data) ? props.data.map((s) => s.name) : []
    },
    radar: {
      indicator: props.category.map((c) => ({ name: c, max: maxValue })),
      radius: '60%',
      axisName: {
        color: textColor
      },
      axisLabel: {
        show: false,
        showMaxLabel: true,
        showMinLabel: true,
        color: textColor
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.08)']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(0,0,0,0.2)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0,0,0,0.2)'
        }
      }
    },
    series: [
      {
        name: '雷达图',
        type: 'radar',
        data: Array.isArray(props.data)
          ? props.data.map((s, i) => ({
              value: s.data || s,
              name: s.name,
              label: {
                show: false
              },
              areaStyle: {
                opacity: 0.1
              }
            }))
          : [
              {
                value: props.data.data,
                name: '数据',
                label: {
                  show: false
                },
                areaStyle: {
                  opacity: 0.1
                }
              }
            ]
      }
    ]
  }
}
