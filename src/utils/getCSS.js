// 辅助函数：获取 CSS 变量的实际值
export function getCSSVariableValue(variableName, defaultValue = '') {
  const computedStyle = getComputedStyle(document.documentElement)
  const rawValue = computedStyle.getPropertyValue(variableName).trim()

  // 如果原始值为空，返回默认值
  if (!rawValue) {
    return defaultValue
  }

  // 如果原始值已经是完整的颜色格式，直接返回
  // 检查是否以颜色函数开头或为十六进制颜色
  const isCompleteColorFormat =
    rawValue.startsWith('rgb(') ||
    rawValue.startsWith('rgba(') ||
    rawValue.startsWith('hsl(') ||
    rawValue.startsWith('hsla(') ||
    rawValue.startsWith('#')

  if (isCompleteColorFormat) {
    return rawValue
  }

  // 如果变量值包含逗号但不是一个完整的颜色函数，说明是 RGB 分量，需要加上 rgb() 前缀
  if (rawValue.includes(',')) {
    return `rgb(${rawValue})`
  }

  // 其他情况直接返回原始值
  return rawValue
}
