<template>
  <div class="srm-new-home">
    <div class="header">
      <div class="center">
        <img src="~@/assets/img/home/TopBackground.png" alt="" srcset="" />
        <div class="title">{{ getTitle() }}</div>
      </div>
    </div>
    <video autoplay loop muted>
      <source src="/webResource/background.mp4" type="video/mp4" />
    </video>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
  import { onMounted, ref, watch, getCurrentInstance, onBeforeMount } from 'vue'
  import { debounce } from 'lodash-es'
  import { appConfig } from '@/config'
  import { jumpLink } from '@/utils/publicMethod'
  import { verifyAuth } from '@/boot/auth'

  const { proxy } = getCurrentInstance()

  let width = 0
  let height = 0
  let canvas = null
  const canvasItems = ref([])

  const getTitle = () => window.adminTitle ?? '安全风险智能管控平台'

  const homeMiddleItems = ref(
    appConfig.value.homeItem?.filter((item) =>
      Reflect.has(item, 'authCode') ? verifyAuth(item.authCode, true) : true
    )
  )
  const resizeObserver = new ResizeObserver(
    debounce(() => {
      canvas && setCanvasItem()
    }, 50)
  )
  const stopWatch = watch(homeMiddleItems, () => setCanvasItem())
  onMounted(() => {
    setCanvasItem()
    setClick()
    setCursor()
    resizeObserver.observe(document.documentElement)
  })

  onBeforeMount(() => {
    stopWatch()
    resizeObserver.unobserve(document.documentElement)
  })

  const setCanvasItem = () => {
    const { clientHeight, clientWidth } = document.documentElement
    canvas = document.querySelector('#canvas')

    if (!canvas) return

    const middleItemsDivTop = clientHeight / 4 - 40
    height = middleItemsDivTop / 2 - 10 > 100 ? 100 : middleItemsDivTop / 2 - 10
    if (!homeMiddleItems.value.length) {
      canvasItems.value = []
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, clientWidth, clientHeight)
    }
    homeMiddleItems.value.forEach((_, index) => {
      const position = getHomeItemLocate(index)
      const pointTop = getCrossoverPoint(position.top + middleItemsDivTop, position.isLeft)
      const pointBottom = getCrossoverPoint(
        position.top + height + middleItemsDivTop,
        position.isLeft
      )
      setCanvas(index, pointTop, pointBottom, position)
    })
  }

  const setCanvas = (index, pointTop, pointBottom, position) => {
    const { clientHeight, clientWidth } = document.documentElement
    if (!canvas || index === 0) {
      canvasItems.value = []
      canvas.width = clientWidth
      canvas.height = clientHeight
    }
    const ctx = canvas.getContext('2d')

    ctx.beginPath()

    let startPointX = position.left // 上下边框线，x轴位置
    if (!position.isLeft) {
      startPointX = position.left + width // 右侧需加上自身宽度
    }
    // 上边框线
    ctx.moveTo(startPointX, pointTop.y)
    ctx.lineTo(pointTop.x, pointTop.y)

    // 下边框线
    ctx.moveTo(startPointX, pointBottom.y)
    ctx.lineTo(pointBottom.x, pointBottom.y)

    ctx.moveTo(startPointX, pointTop.y)
    ctx.lineTo(startPointX, pointBottom.y)

    // [{左上角x，y}， {右上角x，y}，{右下角x，y} ,{左下角x，y}]
    canvasItems.value.push([
      [startPointX, pointTop.y],
      [pointTop.x, pointTop.y],
      [pointBottom.x, pointBottom.y],
      [startPointX, pointBottom.y]
    ])
    ctx.lineWidth = 5

    ctx.arc(
      clientWidth / 2 + 5, // 圆中心点x
      clientHeight / 2 - 42, // 圆中心点y
      clientWidth / 4 - 20, // 圆半径
      pointBottom.angle, // 矩形顶边与圆交点，点于圆的角度
      pointTop.angle, // 矩形底边与圆交点，点于圆的角度
      !position.isLeft // true逆时针画，false顺时针
    )
    ctx.closePath()
    ctx.lineWidth = 3

    let gradientX = position.left // 上下边框线，x轴位置
    if (!position.isLeft) {
      gradientX = position.left + width // 右侧需加上自身宽度
    }
    const gradientTop = ctx.createLinearGradient(
      gradientX || 0,
      pointTop.y || 0,
      pointTop.x || 0,
      pointTop.y || 0
    )
    gradientTop.addColorStop(0, 'rgba(84, 197, 255, 0)')
    gradientTop.addColorStop(1, '#54C5FF')
    ctx.strokeStyle = gradientTop
    ctx.stroke()

    //  绘制背景
    const gradient = ctx.createLinearGradient(
      gradientX || 0,
      pointTop.y || 0,
      pointTop.x || 0,
      pointTop.y || 0
    )
    gradient.addColorStop(0, 'rgba(0, 66, 131, 0)')
    gradient.addColorStop(0.6, '#004283')
    gradient.addColorStop(1, 'rgb(0,169,255, 0.8)')
    ctx.fillStyle = gradient
    ctx.fill()

    //  绘制文字
    const itemTitle = homeMiddleItems.value[index].title
    let minLeft = pointTop.x >= pointBottom.x ? pointBottom.x : pointTop.x // 以最短一边为主
    if (!position.isLeft) {
      minLeft = pointTop.x <= pointBottom.x ? pointBottom.x : pointTop.x
    }
    ctx.font = `700 ${clientWidth / 50}px Microsoft YaHei UI`
    ctx.fillStyle = '#FFFFFF'
    const itemTitleWidth = ctx.measureText(itemTitle).width
    let itemTitleLeft = minLeft - clientWidth / 50 - itemTitleWidth
    if (!position.isLeft) {
      itemTitleLeft = minLeft + clientWidth / 50
    }
    ctx.textBaseline = 'middle'
    ctx.fillText(itemTitle, itemTitleLeft, height / 2 + pointTop.y + 3)

    return canvas.getBoundingClientRect()
  }
  const setClick = () => {
    canvas.addEventListener('click', (e) => {
      const rect = decisionPointsInRect([e.clientX, e.clientY])
      if (rect.class === 'pointer') {
        clickTopic(homeMiddleItems.value[rect.index])
      }
    })
  }
  const setCursor = () => {
    canvas.addEventListener('mousemove', (e) => {
      const adjustedPoint = [e.clientX, e.clientY + verticalOffset]
      const rect = decisionPointsInRect(adjustedPoint)
      if (canvas.style.cursor !== rect.class) {
        canvas.style.cursor = rect.class
      }
    })
  }
  // 获取每一项定位👇
  const getHomeItemLocate = (index) => {
    const { clientHeight, clientWidth } = document.documentElement
    const position = { top: 0, left: 0, isLeft: true }
    const middleIndex = Math.ceil(homeMiddleItems.value.length / 2)

    const leftItemTop = (clientHeight * 0.6) / (middleIndex + 1)
    const rightItemTop = (clientHeight * 0.6) / (homeMiddleItems.value.length - middleIndex + 1)
    const circleRadius = clientWidth / 4 - 20
    width = height * 3.6 > 360 ? 360 : height * 3.6

    // 数量多的放左边
    if (index < middleIndex) {
      position.top = (index + 1) * leftItemTop - height
      position.left = clientWidth / 2 - circleRadius - width
      position.isLeft = true
      return position
    }
    // 右边
    position.top = (index - middleIndex + 1) * rightItemTop - height
    position.left = clientWidth / 2 + circleRadius + 10
    position.isLeft = false
    return position
  }
  // 返回交点于圆的角度👇
  const getCrossoverPoint = (y, isLeft) => {
    const { clientHeight, clientWidth } = document.documentElement
    const centerTop = clientHeight / 2 - 42
    const centerLeft = clientWidth / 2 + 5
    const circleRadius = clientWidth / 4 - 20
    const point = {
      x: 0, // 距离页面左侧距离
      y: y, // 距离页面顶部距离
      angle: 0 // x,y于圆的角度系数
    }

    // 根据勾股定理得到x值（左负右正）
    const x =
      Math.sqrt(circleRadius * circleRadius - (point.y - centerTop) * (point.y - centerTop)) +
      centerLeft
    if (isLeft) {
      point.x = -x + 2 * centerLeft // 左侧交点x值
    } else {
      point.x = x // 右侧交点x值
    }
    const angle = Math.atan2(point.y - centerTop, point.x - centerLeft)
    point.angle = (angle + 2 * Math.PI) % (2 * Math.PI)

    return point
  }

  // 系统检测和偏移量设置
  const isUnionTechOS = () => {
    return (
      navigator.userAgent.includes('UnionTech') ||
      navigator.userAgent.includes('UOS') ||
      (navigator.platform.includes('Linux') &&
        document.documentElement.clientHeight / window.innerHeight > 1.05)
    )
  }

  // 根据系统设置垂直偏移量
  const verticalOffset = isUnionTechOS() ? appConfig.value?.verticalOffset || -20 : 0

  // 射线法判断点是否在四边形内
  const decisionPointsInRect = (point) => {
    // 应用垂直偏移校正
    const adjustedPoint = [point[0], point[1] + verticalOffset]

    const rect = {
      class: 'default',
      index: 0
    }
    for (let i = 0; i < canvasItems.value.length; i++) {
      rect.index = i
      const val = canvasItems.value[i]
      let xinters = 0
      // 遍历多边形的每条边
      for (let i = 0, j = val.length - 1; i < val.length; j = i++) {
        const p1 = val[i]
        const p2 = val[j]

        // 检查点是否在多边形的边上
        if (
          ((p1[1] <= adjustedPoint[1] && adjustedPoint[1] < p2[1]) ||
            (p2[1] <= adjustedPoint[1] && adjustedPoint[1] < p1[1])) &&
          adjustedPoint[0] <
            ((p2[0] - p1[0]) * (adjustedPoint[1] - p1[1])) / (p2[1] - p1[1]) + p1[0]
        ) {
          xinters++ // 射线与边相交
        }

        // 检查点是否恰好在多边形的一个顶点上
        if (p1[0] === adjustedPoint[0] && p1[1] === adjustedPoint[1]) return true // 点在多边形顶点上
      }

      // 如果交点数量为奇数，则点在多边形内部
      if (xinters % 2 !== 0) {
        rect.class = 'pointer'
        return rect
      }
      if (i === canvasItems.value.length - 1) {
        rect.class = 'default'
        return rect
      }
    }
  }

  // 路由跳转
  const clickTopic = (route) => {
    jumpLink(route)
  }
</script>

<style lang="scss">
  .srm-new-home {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    inset: 0;

    .header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      height: fit-content;

      .center {
        display: flex;
        justify-content: center;

        > img {
          width: 100%;
        }
      }

      .title {
        position: absolute;
        top: 0;
        font-size: 42px;
        font-weight: bold;
        line-height: 42px;
        letter-spacing: 8.4px;
        background: linear-gradient(180deg, rgb(var(--white)) 0%, rgb(var(--blue)) 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transform: translateY(25px);
      }

      .more {
        position: relative;
      }
    }

    video {
      position: fixed;
      top: 0;
      min-width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .more-cascader {
      position: absolute;
      top: 50px;
    }

    canvas {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
    }
  }
</style>
