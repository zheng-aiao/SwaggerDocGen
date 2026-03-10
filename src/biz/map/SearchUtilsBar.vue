<template>
  <div ref="rootElement" class="SearchUtilsBar">
    <div class="search-container">
      <el-input
        v-model="keyword"
        placeholder="请输入搜索关键字"
        clearable
        maxlength="50"
        prefix-icon="el-icon-search"
        @input="search"
        @focus="keyword && (isExpand = true)"
        @blur="blurHandler"
      >
      </el-input>
      <transition name="flexed">
        <div v-show="isExpand" v-loading="loading" class="result-list">
          <div
            v-for="(item, index) in options"
            :key="`${item.uid}${index}`"
            class="item"
            :title="item.name"
            @click.stop="itemClick(item)"
          >
            <span class="name" v-html="highlightKeyword(keyword, item.name)"></span>
            <span class="address">{{ item.address ?? '' }}</span>
          </div>
          <el-empty v-if="!options.length"> </el-empty>
        </div>
      </transition>
    </div>

    <RdappButton
      v-if="!props.onlyPoint && !props.onlyZone"
      type="switch"
      :debounce="false"
      :label="props.drawType === 'point' ? '选择区域' : '选择点'"
      @click="emit('drawType', props.drawType === 'point' ? 'zone' : 'point')"
    ></RdappButton>

    <RdappButton
      v-show="props.drawType === 'zone'"
      type="close"
      label="清除标绘"
      @click="emit('clearDraw')"
    ></RdappButton>
  </div>
</template>
<script setup>
  import { computed, nextTick, ref, watch } from 'vue'
  import service from '@/service'
  import { debounce } from 'lodash-es'
  import { Message } from 'element-ui'
  import { highlightKeyword } from '@/utils/publicMethod'
  import {
    flyToPoint,
    districtLayerController,
    mapDataSearchController,
    baseToolController
  } from '@/biz/map/Index.js'

  const emit = defineEmits(['change', 'drawType', 'clearDraw'])
  const props = defineProps({
    drawType: {
      type: String,
      default: 'point'
    },
    onlyPoint: {
      type: Boolean,
      default: false
    },
    onlyZone: {
      type: Boolean,
      default: false
    }
  })

  const keyword = ref('')
  const options = ref([])
  const isExpand = ref(false)
  const loading = ref(false)
  const search = debounce(async () => {
    if (!keyword.value) {
      options.value = []
      isExpand.value = false
      return
    }
    isExpand.value = true
    loading.value = true
    const params = {
      keyword: keyword.value
    }
    options.value = await mapDataSearchController.searchMapPoiData(params)
    loading.value = false
  }, 300)

  const blurHandler = () => {
    let timer = setTimeout(() => {
      isExpand.value = false
      clearTimeout(timer)
      timer = null
    }, 250)
  }

  const itemClick = async (item) => {
    const { location } = item ?? {}
    const { longitude, latitude } = location ?? {}
    flyToPoint({ longitude, latitude }) // 飞到指定定位
    if (props.drawType === 'point') {
      baseToolController.updatePickPosition(location)
      setAddress(longitude, latitude)
    }
  }

  const setAddress = async (longitude, latitude) => {
    const groupName = 'gasBiz.getGeocodingReverse'
    service.cancel(groupName)
    const { hasError, status, ...rest } = await service.gasBiz.getGeocodingReverse(
      { 'Location.Longitude': longitude, 'Location.Latitude': latitude },
      { groupName }
    )
    if (status === -1) return
    if (hasError) {
      Message.createWarning(`${status}: 解析地址失败，请重新选择点位!`)
    } else {
      emit('change', { longitude, latitude, ...rest })
    }
  }
</script>
<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .SearchUtilsBar {
    position: absolute;
    top: pxToRem(22);
    left: pxToRem(22);
    z-index: 1;
    display: flex;
    gap: 0 pxToRem(8);

    @mixin focusInput {
      border: pxToRem(2) solid colorValue(color, 1);
      box-shadow: 0 0 0 pxToRem(3) colorValue(color, 0.3);
    }

    .el-input {
      input.el-input__inner {
        border: pxToRem(2) solid transparent;
        background: linear-gradient(0deg, colorValue(color, 0.2) 0%, colorValue(color, 0.2) 100%),
          colorValue(model, 0.8);

        @include lightTheme {
          border-color: transparent;
          background: colorValue(white, 1);

          @include hover {
            border: pxToRem(2) solid colorValue(color, 1);
            background: colorValue(white, 1);
          }

          &:focus {
            @include focusInput;
          }
        }
      }

      &.is-focus {
        .el-input__inner {
          @include focusInput;
        }
      }
    }

    .search-container {
      --width: #{pxToRem(320)};
      width: var(--width);
      margin-left: 15px;
      position: relative;

      .el-input__inner {
        width: 100%;
      }

      .el-empty {
        margin: auto;

        .el-empty__image {
          width: 150px;
        }

        .el-empty__description {
          display: none;
        }
      }

      .result-list {
        @include dropdownStyle;
        --itemHeight: 55px;
        position: absolute;
        top: 50px;
        right: 0;
        width: var(--width);
        height: fit-content;
        min-height: var(--itemHeight);
        max-height: 340px;
        color: var(--textColor-1);
        padding: 12px;
        overflow-y: auto;
        transform-origin: center top;

        .item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: pxToRem(8);
          height: var(--itemHeight);
          padding: 0 8px;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background: var(--x-gb-leve-2-color);
          }

          &:active {
            background: var(--x-gb-leve-2-color);
            opacity: 0.8;
          }

          .name,
          .address {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .address {
            opacity: 0.5;
          }
        }
      }

      // 下拉
      .flexed-enter-active,
      .flexed-leave-active {
        transition: all 0.2s;
      }

      .flexed-enter,
      .flexed-leave-to {
        transform: scaleY(0);
      }

      .flexed-enter-to,
      .flexed-leave {
        transform: scaleY(1);
      }
    }
  }
</style>
