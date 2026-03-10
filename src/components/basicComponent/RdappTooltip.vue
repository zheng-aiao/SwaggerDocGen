<template>
  <el-tooltip
    v-el-tooltip-auto-show="{ disable: props.disable || disableAutoShow, available: !disable }"
    v-bind="$attrs"
    :placement="props.placement"
    popper-class="rdapp-tooltip"
    :open-delay="600"
    :disabled="props.disable"
    :visible-arrow="false"
  >
    <slot></slot>
  </el-tooltip>
</template>

<script setup>
  const props = defineProps({
    disable: { type: Boolean, default: false },
    disableAutoShow: { type: Boolean, default: false },
    placement: { type: String, default: 'top-start' }
  })
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .el-tooltip__popper.is-dark {
    @include flexCenter;
    @include fontStyle(5);
    @include textHidden(15);
    max-height: pxToRem(345);
    border-radius: pxToRem(10);
    max-width: pxToRem(400);
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;

    @include after {
      display: none;
    }

    &.rdapp-tooltip {
      // 使用该组件才溢出滚轮显示, el-table中的默认要溢出隐藏
      max-height: pxToRem(345);
      display: block;
      overflow: auto;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      background: colorValue(white);

      @include lightTheme {
        background: colorValue(blue);
      }
    }

    .popper__arrow {
      border-top-color: rgb(var(--color));
      &::after {
        border-top-color: inherit;
      }
    }
    background-color: rgb(var(--color));
    color: rgb(var(--white));

    &[aria-hidden='false'],
    &[aria-hidden='true'] {
      top: pxToRem(-300);
    }
    @include lightTheme {
      border-radius: 8px;
      background: rgba(var(--white), 1);
      box-shadow: 0 0 16px 0 colorValue(color, 1);
      color: var(--black);
      .popper__arrow {
        border-top-color: rgb(var(--white));
      }
    }
  }
</style>
