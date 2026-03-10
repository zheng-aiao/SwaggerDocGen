import { getCSSVariable } from '@/utils/publicMethod.js'

export const getLineOption = (props) => {
  const textColor = getCSSVariable('--textColor-1')
  const lineColor = `rgb(${getCSSVariable('--color')})`

  return {
    color: Array.isArray(props.color) ? props.color : [props.color],
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
        boundaryGap: false,
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
      ? props.data.map((s, i) => ({
          type: 'line',
          data: s.data || s,
          name: s.name,
          smooth: !!s.smooth,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 2
          },
          areaStyle: s.shadow
            ? {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: Array.isArray(props.color)
                        ? props.color[i] || props.color[0]
                        : props.color
                    },
                    { offset: 1, color: 'rgba(255, 255, 255, 0.1)' }
                  ]
                }
              }
            : { opacity: 0 }
        }))
      : [
          {
            type: 'line',
            data: props.data.data,
            name: props.data.name,
            smooth: !!props.data.smooth,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              width: 2
            },
            areaStyle: props.data.shadow
              ? {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: Array.isArray(props.color) ? props.color[0] : props.color
                      },
                      { offset: 1, color: 'rgba(255, 255, 255, 0.1)' }
                    ]
                  }
                }
              : { opacity: 0 }
          }
        ]
  }
}
