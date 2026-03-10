<template>
  <div class="value-cube-chart">
    <div class="value-cube-container">
      <!-- SVG 背景图 -->
      <svg
        width="260"
        height="104"
        viewBox="0 0 260 104"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M130 13.6362L260 47.7271L130 81.818L0 47.7271L130 13.6362Z"
          :fill="color"
          fill-opacity="0.3"
        />
        <path
          d="M130 0L232.632 23.8636L130 47.7273L27.3687 23.8636L130 0Z"
          :fill="color"
          fill-opacity="0.66"
        />
        <path
          d="M232.632 77.2729V23.8638L130 47.7274V103.409L232.632 77.2729Z"
          :fill="color"
          fill-opacity="0.3"
        />
        <path
          d="M27.3687 77.2729L130 103.409V47.7274L27.3687 23.8638V77.2729Z"
          :fill="color"
          fill-opacity="0.2"
        />
        <path
          d="M130 22.7271L221.228 46.5907L130 70.4543L38.772 46.5907L130 22.7271Z"
          stroke="url(#paint0_linear_1733_3251)"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="2 2"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1733_3251"
            x1="130"
            y1="22.7271"
            x2="130"
            y2="70.4543"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#24FCFF" stop-opacity="0" />
            <stop offset="0.510417" stop-color="#24FCFF" stop-opacity="0.1" />
            <stop offset="1" stop-color="#24FCFF" />
          </linearGradient>
        </defs>
      </svg>

      <!-- 数值 -->
      <div class="value-text">
        <span class="value-number">{{ valueData }}</span>
        <span class="value-unit">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'
  import { useStore } from '@/hooks'
  import { getCSSVariable } from '@/utils/publicMethod'

  const props = defineProps({
    data: {
      type: [Object, Array, Number],
      default: () => []
    },
    unit: {
      type: String,
      default: () => ''
    }
  })

  const store = useStore()

  const color = ref(`rgb(${getCSSVariable('--color')})`)

  // 计算数值数据
  const valueData = computed(() => {
    if (typeof props.data === 'object' && props.data !== null) {
      if (props.data.data !== undefined) {
        return props.data.data
      } else if (props.data.value !== undefined) {
        return props.data.value
      }
    }
    return props.data || 0
  })

  watch(
    () => store.state.theme,
    () => {
      color.value = `rgb(${getCSSVariable('--color')})`
    },
    { deep: true }
  )
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .value-cube-chart {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .value-cube-container {
      position: relative;
      width: pxToRem(300);
      height: pxToRem(300);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .value-cube-svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      display: block;
    }

    .value-text {
      position: absolute;
      top: pxToRem(30);
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: baseline;
      gap: pxToRem(5);
      z-index: 1;

      .value-number {
        font-size: pxToRem(48);
        font-weight: bold;
        color: rgb(var(--color));
      }

      .value-unit {
        font-size: pxToRem(16);
        color: var(--textColor-1);
      }
    }
  }
</style>
