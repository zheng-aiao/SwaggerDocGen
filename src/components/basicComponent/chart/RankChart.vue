<template>
  <div class="rank-chart">
    <div v-for="(item, index) in rankData" :key="index" class="rank-item">
      <div class="rank-row-top">
        <div class="rank-left">
          <span class="rank-number" :style="getRankColor(index)">No.{{ index + 1 }}</span>
          <span class="rank-category">{{ item.name }}</span>
        </div>
        <div class="rank-right">
          <span class="rank-value">{{ item.value }}</span>
          <span class="rank-unit">{{ unit }}</span>
        </div>
      </div>
      <div class="rank-row-bottom">
        <div class="rank-bar" :style="{ width: item.percent + '%' }"></div>
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
    },
    unit: {
      type: String,
      default: () => ''
    }
  })

  // 计算排名数据
  const rankData = computed(() => {
    const dataArray = Array.isArray(props.data) ? props.data : props.data.data
    const maxValue = Math.max(...dataArray) || 100

    // 将 data 和 category 组合并排序
    const combined = props.category.map((cat, index) => ({
      name: cat,
      value: dataArray[index]
    }))

    // 按数据大小降序排序
    combined.sort((a, b) => b.value - a.value)

    // 计算百分比
    return combined.map((item) => ({
      ...item,
      percent: (item.value / maxValue) * 100
    }))
  })

  // 获取排名颜色
  const getRankColor = (index) => {
    const colorMap = {
      0: 'rgb(var(--error))',
      1: 'rgb(var(--warning))',
      2: 'rgb(var(--yellow))'
    }
    return {
      color: colorMap[index] || 'rgb(var(--color))'
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .rank-chart {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: pxToRem(10) 0 pxToRem(40) 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: pxToRem(10);

    .rank-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .rank-row-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: pxToRem(6);

        .rank-left {
          display: flex;
          align-items: center;
          gap: pxToRem(10);

          .rank-number {
            font-weight: bold;
            min-width: pxToRem(40);
          }

          .rank-category {
            color: var(--textColor-1);
          }
        }

        .rank-right {
          .rank-value {
            font-weight: bold;
            color: rgb(var(--color));
          }
          .rank-unit {
            font-weight: 300;
            color: var(--textColor-1);
          }
        }
      }

      .rank-row-bottom {
        border: pxToRem(1) solid rgb(var(--color));
        border-radius: pxToRem(20);
        padding: pxToRem(4);
        .rank-bar {
          height: pxToRem(12);
          border-radius: pxToRem(20);
          background: linear-gradient(to right, rgba(var(--color), 0), rgba(var(--color), 1));
          transition: width 0.3s ease;
        }
      }
    }
  }
</style>
