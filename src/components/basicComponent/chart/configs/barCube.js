import { hexToRgba, getCSSVariable } from '@/utils/publicMethod.js'

export const getBarCubeOption = (props) => {
  const textColor = getCSSVariable('--textColor-1')
  const lineColor = `rgb(${getCSSVariable('--color')})`
  const option = {
    color: Array.isArray(props.color) ? props.color : [props.color],
    tooltip: {
      trigger: 'axis',
      formatter: (parms) => {
        return parms[0].axisValue + ':  ' + (parms[0].value === '' ? 0 : parms[0].value)
      }
    },
    legend: {
      data: Array.isArray(props.data) ? props.data.map((s) => s.name) : [],
      left: 'center',
      top: 10,
      itemWidth: 12,
      itemHeight: 8,
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
    series: []
  }
  if (Array.isArray(props.data)) {
    for (let i = 0; i < props.data.length; i++) {
      const s = props.data[i]
      option.series.push({
        data: s.data || s,
        type: 'bar',
        barMaxWidth: 'auto',
        barWidth: 9,
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: 'linear',
            global: false,
            colorStops: [
              {
                offset: 0,
                color: hexToRgba(
                  Array.isArray(props.color) ? props.color[i] || props.color[0] : props.color,
                  0.8
                )
              },
              {
                offset: 1,
                color: hexToRgba(
                  Array.isArray(props.color) ? props.color[i] || props.color[0] : props.color,
                  0.2
                )
              }
            ]
          }
        }
      })
      option.series.push({
        data: s.data || s,
        type: 'bar',
        barMaxWidth: 'auto',
        barWidth: 10,
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: 'linear',
            global: false,
            colorStops: [
              {
                offset: 0,
                color: hexToRgba(
                  Array.isArray(props.color) ? props.color[i] || props.color[0] : props.color,
                  0.9
                )
              },
              {
                offset: 1,
                color: hexToRgba(
                  Array.isArray(props.color) ? props.color[i] || props.color[0] : props.color,
                  0.2
                )
              }
            ]
          }
        },
        barGap: '-1%'
      })
      option.series.push({
        data: s.data || s,
        type: 'pictorialBar',
        symbolPosition: 'end',
        symbol: 'diamond',
        symbolOffset: [19 * (i + 1 - (props.data.length + 1) / 2), '-50%'],
        symbolSize: [20, 8]
      })
    }
  } else {
    option.series.push({
      data: props.data.data,
      type: 'bar',
      barMaxWidth: 'auto',
      barWidth: 9,
      itemStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          type: 'linear',
          global: false,
          colorStops: [
            {
              offset: 0,
              color: hexToRgba(Array.isArray(props.color) ? props.color[0] : props.color, 0.8)
            },
            {
              offset: 1,
              color: hexToRgba(Array.isArray(props.color) ? props.color[0] : props.color, 0.2)
            }
          ]
        }
      }
    })
    option.series.push({
      data: props.data.data,
      type: 'bar',
      barMaxWidth: 'auto',
      barWidth: 10,
      itemStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          type: 'linear',
          global: false,
          colorStops: [
            {
              offset: 0,
              color: hexToRgba(Array.isArray(props.color) ? props.color[0] : props.color, 0.9)
            },
            {
              offset: 1,
              color: hexToRgba(Array.isArray(props.color) ? props.color[0] : props.color, 0.2)
            }
          ]
        }
      },
      barGap: '-1%'
    })
    option.series.push({
      data: props.data.data,
      type: 'pictorialBar',
      symbolPosition: 'end',
      symbol: 'diamond',
      symbolOffset: [0, '-50%'],
      symbolSize: [20, 8]
    })
  }
  return option
}
