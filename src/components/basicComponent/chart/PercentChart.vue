<template>
  <div class="percent-chart">
    <div class="percent-container">
      <!-- 外圈圆环 -->
      <div class="percent-outer-ring"></div>
      <!-- 水球区域 -->
      <div class="percent-water">
        <div class="percent-water-fill">
          <svg
            :style="waveTransform"
            width="149"
            height="298"
            viewBox="0 0 149 149"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_1097_19359"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="149"
              height="298"
            >
              <rect width="149" height="298" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1097_19359)">
              <path
                d="M49.9144 50.2055C20.4381 64.165 4.27364 61.8351 -5.23486 59.7993V290H153.557V72.8872C141.196 60.6725 82.8492 34.6081 49.9144 50.2055Z"
                fill="url(#paint0_linear_1097_19359)"
              />
              <path
                d="M36.6025 72.89C16.0642 72.89 0.153286 63.5835 -5.23486 58.9302V290H153.557V69.4C146.267 62.4202 125.792 48.4604 102.211 48.4604C72.7348 48.4604 62.2755 72.89 36.6025 72.89Z"
                fill="url(#paint1_linear_1097_19359)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_1097_19359"
                x1="74.1611"
                y1="45.3691"
                x2="74.1611"
                y2="290"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="rgb(var(--color))" stop-opacity="0.5" />
                <stop offset="1" stop-color="rgb(var(--color))" stop-opacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1097_19359"
                x1="74.1611"
                y1="48.4604"
                x2="74.1611"
                y2="290"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="rgb(var(--color))" />
                <stop offset="1" stop-color="rgb(var(--color))" stop-opacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <!-- 中心文字 -->
      <div class="percent-text">
        <div>{{ percentData.value }} / {{ percentData.total }}</div>
        <div class="percent-text-name">{{ percentData.name }} / {{ percentData.totalName }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    data: {
      type: [Object, Array],
      default: () => []
    },
    category: {
      type: Array,
      default: () => []
    }
  })

  // 计算百分比数据（水球图）
  const percentData = computed(() => {
    const dataArray = Array.isArray(props.data) ? props.data : props.data.data
    let value = 0
    let total = 0

    // 处理数据：category[0]为数值，category[1]为总数
    if (props.category && props.category.length >= 2) {
      value = Array.isArray(dataArray) ? dataArray[0] : dataArray
      total = Array.isArray(dataArray) ? dataArray[1] : total
    } else {
      total = Array.isArray(dataArray) ? dataArray.reduce((a, b) => a + b, 0) : dataArray
      value = Array.isArray(dataArray) ? dataArray[0] : dataArray
    }

    const percentValue = total > 0 ? ((value / total) * 100).toFixed(2) : 0

    return {
      name: props.category[0],
      value: value,
      total: total,
      totalName: props.category[1],
      percent: percentValue
    }
  })

  // 计算水位高度和波浪变换
  const waveTransform = computed(() => {
    const percent = parseFloat(percentData.value.percent)
    // 由于svg中波浪线并不在中心，所以高度除以1.75而不是2
    return `transform: translate(0, ${-percent / 1.75 + 10}%)`
  })
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .percent-chart {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .percent-container {
      position: relative;
      width: pxToRem(300);
      height: pxToRem(300);
    }

    .percent-outer-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 75%;
      height: 75%;
      border-radius: 50%;
      background: rgba(var(--color), 0.1);
      border: 2px solid var(--color);
    }

    .percent-water {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 65%;
      height: 65%;
      border-radius: 50%;
      overflow: hidden;
      background: rgba(var(--color), 0.1);
      padding: pxToRem(8);
      border: pxToRem(10) solid rgba(var(--color), 0.2);
    }

    .percent-water-fill {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: 50%;
      overflow: hidden;

      svg {
        width: 100%;
        height: 200%;
        display: block;
      }
    }

    .percent-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: pxToRem(25);
      font-weight: bold;
      color: var(--textColor-1);

      .percent-text-name {
        text-align: center;
        font-size: pxToRem(18);
      }
    }
  }
</style>
