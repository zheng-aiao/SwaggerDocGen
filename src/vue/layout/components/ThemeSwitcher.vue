<template>
  <div class="ThemeSwitcher">
    <el-popover trigger="click" :visible-arrow="false" popper-class="homeThemePopover">
      <div class="home-theme-menu">
        <div class="setListItem">
          <span class="label">关怀模式</span>
          <el-switch v-model="careModelStr" @change="changeCareModel"> </el-switch>
        </div>
        <div class="setListItem noneBorder">
          <span class="label">主题色切换</span>
          <el-color-picker
            v-model="themeColorStr"
            size="mini"
            color-format="rgb"
            popper-class="changeSrmThemePanel themePopper"
            @change="changeThemeColor"
          ></el-color-picker>
        </div>
        <div class="setListItem colorList noneBorder">
          <div
            v-for="color in colorList"
            :key="color"
            class="colorItem"
            :class="{ active: themeColorStr === `rgb(${color})` }"
            :style="{ '--color': color }"
            @click="changeThemeColor(color)"
          ></div>
        </div>
      </div>
      <template #reference>
        <RdappButton type="relate" second label="主题切换" :debounce="false"></RdappButton>
      </template>
    </el-popover>
    <div :class="['toggle-theme-model', currentTheme]">
      <em class="iconfont light" @click="setTheme(themeEnum.light)">&#xe6c4;</em>
      <em class="iconfont dark" @click="setTheme(themeEnum.dark)">&#xe6c5;</em>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref, nextTick } from 'vue'
  import { useTheme } from '@/hooks'
  import { themeEnum, themeColorMap } from '@/enum/constant'

  const {
    theme: currentTheme,
    themeColor,
    careModel,
    setTheme,
    setThemeColor,
    setCareModel
  } = useTheme()

  const themeColorStr = computed(() => `rgb(${themeColor.value})`)
  const careModelStr = computed(() => careModel.value)
  const colorList = [
    '71,164,255',
    '22,132,252',
    '0,175,202',
    '43,181,123',
    '25,160,103',
    '4,91,65',
    '31,177,180',
    '10,166,148',
    '22,156,252',
    '178,102,255',
    '116,100,218',
    '122,22,252',
    '218,121,214',
    '230,98,40',
    '235,104,104',
    '229,55,69',
    '196,47,109',
    '160,42,42'
  ]

  const changeThemeColor = (rgbString) => {
    const colorValue = rgbString ? rgbString : themeColorMap.color
    const color = colorValue.match(/\d+/g).map(Number).join(',')
    setThemeColor(color)
  }

  // 关怀模式控制按钮
  const changeCareModel = (val) => {
    setCareModel(val)
  }
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;
  @use '@/assets/scss/elementUi/RdappElButton';

  .ThemeSwitcher {
    @include flexCenter;
    gap: pxToRem(16);

    .color-picker {
      $height: 35px;
      @include wh(fit-content, $height);
      position: relative;

      @include hover {
        .button {
          border-color: colorValue(color, 1);
        }
      }

      .button {
        @include wh;
        @include flexCenter;
        @include baseTransition;
        border-radius: 8px;
        border: 1px solid rgba(var(--color), 0.3);
        background-color: rgba(var(--color), 0.1);
        gap: 8px;
        cursor: pointer;
        padding: 0 12px;

        @include hover {
          border-color: colorValue(color, 1);
        }

        .iconfont {
          font-size: 20px;
        }
      }

      .el-color-picker {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: 1;

        .el-color-picker__trigger {
          width: 100%;
        }
      }
    }

    .toggle-theme-model {
      @include whrem(80, 34);
      @include flexCenter;
      @include baseTransition;
      border-radius: 8px;
      border: 1px solid rgba(var(--color), 0.3);
      background-color: rgba(var(--color), 0.1);
      padding: 4px;

      .iconfont {
        @include wh(36px, 26px);
        @include flexCenter;
        border-radius: inherit;
        cursor: pointer;
      }

      &.light {
        .iconfont {
          &.light {
            color: colorValue(color, 1);
            background-color: colorValue(white, 1);
            box-shadow: 0 0 4px 0 colorValue(color, 0.3);
          }
          &.dark {
            color: colorValue(color, 1);
          }
        }
      }

      &.dark {
        .iconfont {
          &.dark {
            background-color: colorValue(background, 0.5);
            box-shadow: 0 0 4px 0 colorValue(color, 1);
          }
          &.light {
            color: var(--textColor-2);
          }
        }
      }
    }

    @include lightTheme {
      .color-picker .button,
      .toggle-theme-model {
        border: 1px solid rgba(var(--color), 0.2);
        background: rgba(var(--color), 0.1);
      }
    }
  }

  .el-popover.homeThemePopover {
    @include dialogStyle;
    width: pxToRem(230);

    border-radius: 12px;
    padding: 0;
    transform: translateY(10px);
    padding: pxToRem(16);

    .setListItem {
      @include wh(100%, pxToRem(60));
      @include flexCenter(space-between);
      @include fontStyle(4);
      border-bottom: pxToRem(1) solid rgba(var(--color), 0.2);
      color: var(--textColor-1);

      .el-color-picker.el-color-picker--mini {
        @include whrem(24);

        .el-color-picker__trigger {
          @include wh;
          padding: 0;
          overflow: hidden;
          border: none;

          .el-color-picker__color {
            border: none;
            @include wh;

            .el-color-picker__color-inner {
              @include flexCenter;
              @include wh;
            }
          }

          .el-color-picker__icon.el-icon-arrow-down {
            font-size: pxToRem(18);
          }
        }
      }

      &:last-child,
      &.noneBorder {
        border-bottom: pxToRem(1) solid colorValue(lineColor, 0);
      }

      &.colorList {
        height: fit-content;
        margin-bottom: pxToRem(20);
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: pxToRem(10);

        .colorItem {
          @include whrem(26);
          @include flexCenter;
          cursor: pointer;
          margin: 0 pxToRem(2);
          border: pxToRem(2) solid transparent;
          padding: pxToRem(0);
          border-radius: 100%;

          @include after {
            @include wh;
            border-radius: 100%;
            background-color: colorValue(color);
            transition: 0.5s all;
          }

          &.active {
            border: pxToRem(2) solid colorValue(color);
            padding: pxToRem(2);
          }

          @include hover {
            transform: scale(1.15);
          }
        }
      }
    }
  }

  .changeSrmThemePanel {
    @include dialogStyle;
    padding: pxToRem(16);
    margin-top: pxToRem(10);

    .el-color-dropdown__btns {
      margin-top: 12px;

      .el-input__inner {
        width: 230px;
        height: 100%;
      }

      .el-button {
        &:first-of-type {
          display: none;
        }
        &:last-of-type {
          @include wh(52, 38);
          @include RdappElButton.secondButtonStyle;
        }
      }
    }
  }
</style>
