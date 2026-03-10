import { getBarAngleOption } from './barAngle.js'
import { getBarCircleOption } from './barCircle.js'
import { getBarHorizontalOption } from './barHorizontal.js'
import { getBarCubeOption } from './barCube.js'
import { getLineOption } from './line.js'
import { getPieNightingaleOption } from './pieNightingale.js'
import { getPieDoughnutOption } from './pieDoughnut.js'
import { getPieLineOption } from './pieLine.js'
import { getRadarOption } from './radar.js'
import { getBarStackOption } from './barStack.js'

export const chartConfigMap = {
  barAngle: getBarAngleOption,
  barCircle: getBarCircleOption,
  barHorizontal: getBarHorizontalOption,
  barCube: getBarCubeOption,
  barStack: getBarStackOption,
  line: getLineOption,
  pieNightingale: getPieNightingaleOption,
  pieDoughnut: getPieDoughnutOption,
  pieLine: getPieLineOption,
  radar: getRadarOption
}

export const getChartTypeOption = (type, props) => {
  const configFn = chartConfigMap[type]
  if (configFn) {
    return configFn(props)
  }
  return chartConfigMap.barAngle(props) // 默认返回斜角柱状图
}
