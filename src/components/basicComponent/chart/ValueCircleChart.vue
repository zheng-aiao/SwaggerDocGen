<template>
  <div class="value-circle-chart">
    <div class="value-circle-container">
      <!-- SVG 背景图 -->
      <svg
        width="260"
        height="108"
        viewBox="0 0 260 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M241.316 82.3191C247.227 78.0314 250 73.6741 250 69.472C250 65.2699 247.227 60.9126 241.316 56.6249C235.43 52.3556 226.76 48.4107 215.823 45.0553C193.974 38.3521 163.631 34.1664 130 34.1664C96.3686 34.1664 66.0256 38.3521 44.1772 45.0553C33.2403 48.4107 24.5695 52.3556 18.6838 56.6249C12.7727 60.9126 10 65.2699 10 69.472C10 73.6741 12.7727 78.0314 18.6838 82.3191C24.5695 86.5884 33.2403 90.5333 44.1772 93.8888C66.0256 100.592 96.3686 104.778 130 104.778C163.631 104.778 193.974 100.592 215.823 93.8888C226.76 90.5333 235.43 86.5884 241.316 82.3191ZM130 107.055C197.655 107.055 252.5 90.2287 252.5 69.472C252.5 48.7153 197.655 31.8887 130 31.8887C62.3451 31.8887 7.5 48.7153 7.5 69.472C7.5 90.2287 62.3451 107.055 130 107.055Z"
          fill="url(#paint0_linear_1097_19469)"
        />
        <path
          d="M217.5 63.7777C217.5 78.8735 178.325 91.111 130 91.111C81.6751 91.111 42.5 78.8735 42.5 63.7777C42.5 48.6819 81.6751 36.4443 130 36.4443C178.325 36.4443 217.5 48.6819 217.5 63.7777Z"
          :fill="color"
          fill-opacity="0.5"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M209.05 72.6476C213.185 69.5933 215 66.5821 215 63.7777C215 60.9732 213.185 57.962 209.05 54.9078C204.935 51.8688 198.828 49.0311 191.061 46.6047C175.551 41.7597 153.963 38.7221 130 38.7221C106.037 38.7221 84.4491 41.7597 68.939 46.6047C61.1717 49.0311 55.0652 51.8688 50.9504 54.9078C46.8149 57.962 45 60.9732 45 63.7777C45 66.5821 46.8149 69.5933 50.9504 72.6476C55.0652 75.6865 61.1717 78.5243 68.939 80.9506C84.4491 85.7957 106.037 88.8332 130 88.8332C153.963 88.8332 175.551 85.7957 191.061 80.9506C198.828 78.5243 204.935 75.6865 209.05 72.6476ZM130 91.111C178.325 91.111 217.5 78.8735 217.5 63.7777C217.5 48.6819 178.325 36.4443 130 36.4443C81.6751 36.4443 42.5 48.6819 42.5 63.7777C42.5 78.8735 81.6751 91.111 130 91.111Z"
          :fill="color"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M220.618 52.9974C225.401 49.6489 227.5 46.3438 227.5 43.2776C227.5 40.2114 225.401 36.9063 220.618 33.5578C215.871 30.2342 208.844 27.1429 199.938 24.5056C182.153 19.2392 157.426 15.9443 130 15.9443C102.574 15.9443 77.8474 19.2392 60.062 24.5056C51.1556 27.1429 44.1291 30.2342 39.3817 33.5578C34.5987 36.9063 32.5 40.2114 32.5 43.2776C32.5 46.3438 34.5987 49.6489 39.3817 52.9974C44.1291 56.321 51.1556 59.4123 60.062 62.0496C77.8474 67.316 102.574 70.6109 130 70.6109C157.426 70.6109 182.153 67.316 199.938 62.0496C208.844 59.4123 215.871 56.321 220.618 52.9974ZM130 72.8887C185.228 72.8887 230 59.6314 230 43.2776C230 26.9238 185.228 13.6665 130 13.6665C74.7715 13.6665 30 26.9238 30 43.2776C30 59.6314 74.7715 72.8887 130 72.8887Z"
          fill="url(#paint1_linear_1097_19469)"
        />
        <path
          d="M260 0H0L42.5 63.7778C42.5 48.6819 81.6751 36.4444 130 36.4444C178.325 36.4444 217.5 48.6819 217.5 63.7778L260 0Z"
          fill="url(#paint2_linear_1097_19469)"
          fill-opacity="0.5"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1097_19469"
            x1="130"
            y1="31.8887"
            x2="130"
            y2="107.055"
            gradientUnits="userSpaceOnUse"
          >
            <stop :stop-color="color" stop-opacity="0" />
            <stop offset="1" :stop-color="color" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1097_19469"
            x1="130"
            y1="13.6665"
            x2="130"
            y2="72.8887"
            gradientUnits="userSpaceOnUse"
          >
            <stop :stop-color="color" stop-opacity="0" />
            <stop offset="1" :stop-color="color" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_1097_19469"
            x1="130"
            y1="0"
            x2="130"
            y2="63.7778"
            gradientUnits="userSpaceOnUse"
          >
            <stop :stop-color="color" stop-opacity="0" />
            <stop offset="1" :stop-color="color" />
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

  .value-circle-chart {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .value-circle-container {
      position: relative;
      width: pxToRem(300);
      height: pxToRem(300);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .value-circle-svg {
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
