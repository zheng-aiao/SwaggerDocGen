<!--
 * @Description: 文件预览列表
-->
<template>
  <div id="BizLookFiles" class="biz">
    <div v-if="fileList.length > 1" class="file-list">
      <div class="title">
        <span class="fold-el">文件列表({{ fileList.length }})</span>
        <rdapp-button second @click="foldHandle">
          <em class="iconfont" v-html="isFold ? '&#xe6b2;' : '&#xe6b0;'"></em>
        </rdapp-button>
      </div>
      <div class="list fold-el">
        <rdapp-tooltip v-for="(item, index) in fileList" :key="item.link" :content="item.name">
          <div
            :class="['item', { active: currentIndex === index }]"
            @click="fileClick(item, index)"
          >
            <span>{{ item.name }}</span>
          </div>
        </rdapp-tooltip>
      </div>
    </div>
    <!-- 文件信息 -->
    <div
      v-loading="loading"
      class="file-content"
      element-loading-text="拼命加载中..."
      element-loading-spinner="el-icon-loading"
    >
      <div
        v-iframe="{
          fileId: fileList[currentIndex]?.fileId,
          url: fileLink,
          token: `${$store.state.token}`,
          mode: modeMap[theme],
          autoPlay: 1,
          successHandle: () => (loading = false),
          errorHandle: () => (loading = false)
        }"
        class="content"
      ></div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watchPostEffect } from 'vue'
  import { useTheme } from '@/hooks'

  const props = defineProps({
    fileList: { type: Array, required: true },
    fileCurrentIndex: { type: Number, default: 0 }
  })

  const { theme } = useTheme()
  const modeMap = {
    dark: 'dark',
    light: 'normal'
  }

  const loading = ref(true)
  const fileLink = ref('')

  const currentIndex = ref(props.fileCurrentIndex)

  watchPostEffect(() => {
    fileLink.value =
      props.fileList[currentIndex.value]?.fullPath ??
      props.fileList[currentIndex.value]?.fileUrl ??
      '' // 初始化赋值  fileLink
  })

  // 文件点击
  const fileClick = (item, index) => {
    if (currentIndex.value === index) return // 点击同一文件不处理
    const { fullPath, fileUrl } = item ?? {}
    currentIndex.value = index
    loading.value = true
    fileLink.value = fileUrl ?? fullPath
  }

  const isFold = ref(false) // 是否折叠
  const foldHandle = () => {
    isFold.value = !isFold.value
    const elementList = document.querySelectorAll('.fold-el')
    elementList.forEach((el) => {
      el.style.display = isFold.value ? 'none' : 'flex'
    })
  }

  // 下载
  const downloadFile = () => {
    const element = document.createElement('a')
    if (props.fileList[currentIndex.value]?.name) {
      element.download = props.fileList[currentIndex.value]?.name
    }
    element.href =
      props.fileList[currentIndex.value]?.fullPath ?? props.fileList[currentIndex.value]?.fileUrl
    element.click()
    element.remove()
  }

  defineExpose({
    downloadFile
  })
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;

  #BizLookFiles {
    @include wh;
    display: flex;
    flex-direction: row;
    justify-content: left;

    .file-list {
      $width: 324px;
      width: fit-content;
      display: flex;
      flex-direction: column;
      color: var(--textColor-1);
      margin-right: 16px;

      .title {
        @include fontStyle(2);
        @include flexCenter(space-between);
        margin-bottom: 12px;

        .theme-btn {
          @include wh(32px);
          padding: 6px 10px;

          .q-btn__wrapper {
            padding: 0;
            min-height: unset;
          }

          em {
            display: block;
            @include fontStyle(1);
            font-weight: 400;
            color: var(--textColor-1);
          }
        }
      }

      .list {
        @include flexCenter(left, center, true);
        gap: 12px;
        width: $width;
        height: calc(100% - pxToRem(48px));
        overflow: auto;
      }

      .item {
        @include fontStyle(3);
        width: 100%;
        padding: pxToRem(12px);
        border-radius: pxToRem(8px);
        border: 2px solid rgba(var(--color), 0.1);
        background-color: rgba(var(--color), 0.1);
        transition:
          background-color,
          border-color var(--duration);
        cursor: pointer;
        min-height: auto;

        &.active {
          font-weight: bold;
          border: 2px solid rgba(var(--color), 1);
          background-color: rgba(var(--color), 0.5);
        }

        span {
          display: block;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--textColor-1);
        }
      }
    }

    .file-content {
      flex: 1;

      .content {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }

    iframe {
      width: 100%;
      height: 100%;
      background: transparent;
    }
  }
</style>
