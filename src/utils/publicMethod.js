import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

let zIndex = 1000

export function incrementZIndex() {
  return ++zIndex
}

export function increaseZIndex(options = {}) {
  const { callback } = options
  const newZIndex = incrementZIndex()
  if (callback && typeof callback === 'function') {
    callback(newZIndex)
  }
  return newZIndex
}

export function formatTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!time) return ''

  try {
    const date = dayjs(time)
    if (!date.isValid()) return ''
    return date.format(format)
  } catch (e) {
    return ''
  }
}

export function getUserAvatar(item) {
  const { photoPath } = item?.user || item || {}
  if (!photoPath) {
    return false
  }
  return `/orgs/api${photoPath}`
}

export function highlightKeyword(keyword, value) {
  if (!keyword) return value
  if (value === null || value === undefined) return ''
  const escapedValue = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return value.replace(
    new RegExp(escapedValue, 'gi'),
    `<span class="highLight" style="color: rgb(var(--color))">${keyword}</span>`
  )
}

export function downloadFile(url, filename) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export function throttle(fn, delay = 300) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last > delay) {
      last = now
      fn.apply(this, args)
    }
  }
}

export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof Array) return obj.map((item) => deepClone(item))
  if (obj instanceof Object) {
    const copy = {}
    Object.keys(obj).forEach((key) => {
      copy[key] = deepClone(obj[key])
    })
    return copy
  }
  return obj
}

export function defaultDateRange() {
  const now = dayjs()
  const lastMonth = now.subtract(1, 'month')
  return [lastMonth.format('YYYY-MM-DD'), now.format('YYYY-MM-DD')]
}

export function lastYearDateRange() {
  const now = dayjs()
  const lastYear = now.subtract(1, 'year')
  return [lastYear.format('YYYY-MM-DD'), now.format('YYYY-MM-DD')]
}

export function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

export function getRootCssVar(name) {
  return getCSSVariable(name)
}

export function setRootCssVar(name, value) {
  document.documentElement.style.setProperty(name, value)
}

export function hexToRgba(hex, alpha = 1) {
  if (!hex) return ''
  hex = hex.replace(/^#/, '')
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('')
  }
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function jumpLink(url, options = {}) {
  const { target = '_self' } = options
  window.open(url, target)
}

export function isDev() {
  return import.meta.env.DEV
}

export function getDictDataByType(type) {
  return new Promise((resolve) => {
    resolve([])
  })
}

export function resolveBlob(response, filename) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    resolve()
  })
}

export function apiDownLoad(url, filename) {
  return resolveBlob({ data: url }, filename)
}
