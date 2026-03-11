<template>
  <div ref="rootElement" class="rdappDialog">
    <transition name="dialogMaskFade">
      <div v-if="props.value && !props.hideMask" class="dialogMask"></div>
    </transition>
    <transition
      name="dialog-fade"
      @enter="enter"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div
        v-if="props.value"
        v-drag="{ isNotTransform: true, unavailable: !props.hideMask }"
        aria-modal="true"
        :class="[
          'rdapp-dialog-container',
          'themePopper',
          contentClass,
          { 'multi-module': props.multiModule },
          { readonly: props.readonly }
        ]"
      >
        <slot name="header">
          <div class="dialog-header">
            <span class="title">{{ title }}</span>
            <span v-if="isCloseIcon" class="iconfont close-icon" @click.stop="close">&#xe821;</span>
          </div>
        </slot>
        <div v-loading="props.loading" class="dialog-body">
          <div
            :class="[
              'dialog-content',
              { 'no-footer': props.notFooter },
              { 'page-container': tableDialog }
            ]"
          >
            <slot name="default"></slot>
          </div>
          <div v-if="!notFooter" class="dialog-footer">
            <slot name="footer">
              <RdappButton v-if="isClose" second @click.stop="close">
                {{ readonly ? '关闭' : '取消' }}
              </RdappButton>
              <RdappButton v-if="isConfirm && !readonly" :disabled="loading" @click.stop="confirm">
                {{ confirmTitle }}
              </RdappButton>
              <RdappButton v-if="isDownload" :disabled="loading" @click.stop="download">
                下载
              </RdappButton>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
  import { onMounted, onBeforeMount, ref } from 'vue'
  import { increaseZIndex } from '@/utils/publicMethod'
  const props = defineProps({
    title: { type: String, required: true },
    value: { type: Boolean, required: true },
    notFooter: { type: Boolean, default: false },
    hideMask: { type: Boolean, default: false },
    multiModule: { type: Boolean, default: false }, // 多模块内容样式, 如: 关联事件
    loading: { type: Boolean, default: false },
    contentClass: { type: String, default: '' },
    appendToBody: { type: Boolean, default: false },
    confirmTitle: { type: String, default: '确定' },
    isClose: { type: Boolean, default: true },
    isCloseIcon: { type: Boolean, default: true },
    isConfirm: { type: Boolean, default: true }, // 是否显示确定按钮
    isDownload: { type: Boolean, default: false }, // 是否显示下载按钮
    readonly: { type: Boolean, default: false },
    tableDialog: { type: Boolean, default: false }
  })

  const emit = defineEmits(['input', 'confirm', 'show', 'before-show', 'hide'])

  const close = () => {
    emit('input', false)
  }

  const confirm = () => {
    emit('confirm')
  }

  const download = () => {
    emit('download')
  }

  const enter = () => {
    const el = rootElement.value.querySelector('.rdapp-dialog-container')
    increaseZIndex(el)
    emit('before-show')
  }

  const afterEnter = () => {
    emit('show')
  }
  const afterLeave = () => {
    emit('hide')
  }

  const rootElement = ref()
  onMounted(() => {
    if (props.appendToBody) {
      document.body.appendChild(rootElement.value)
    }
  })

  onBeforeMount(() => {
    rootElement.value && rootElement.value.parentNode.removeChild(rootElement.value)
  })
</script>

<style lang="scss">
  @use '@/assets/scss/rules.scss' as *;

  $dlg-min-width: pxToRem(658);
  $dlg-max-width: pxToRem(1308);
  $dlg-min-height: pxToRem(394);
  $dlg-max-height: pxToRem(898);
  $dlg-header-height: pxToRem(58);
  $dlg-footer-height: pxToRem(70);

  .rdapp-dialog-container {
    @include dialogStyle(12);
    @include wh(fit-content);
    min-width: $dlg-min-width;
    min-height: $dlg-min-height;
    max-width: $dlg-max-width;
    max-height: $dlg-max-height;
    margin: auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    color: var(--textColor-1);
    display: flex;
    flex-direction: column;

    @include lightTheme {
      border: none;
    }

    .dialog-header {
      @include fontStyle(2);
      width: 100%;
      height: $dlg-header-height;
      padding: pxToRem(20);
      color: var(--textColor-1);
      border-radius: pxToRem(12) pxToRem(12) 0 0;
      border-bottom: pxToRem(2) solid rgba(var(--white), 0.2);
      background: linear-gradient(180deg, rgba(var(--color), 0.5) 0%, rgba(var(--color), 0) 100%);
      display: flex;
      justify-content: space-between;
      align-items: center;

      @include lightTheme {
        border-bottom: pxToRem(2) solid rgba(var(--color), 0.2);
        background: transparent;
      }

      .close-icon {
        color: var(--textColor-2);
        font-size: pxToRem(24);
        font-weight: 400;
      }
    }

    .dialog-body {
      height: calc(100% - #{$dlg-header-height}); // 弹窗整体高减去头部
      width: 100%;
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .dialog-content {
        height: calc(100% - #{$dlg-footer-height}); // 内容减去底部高度
        max-height: calc(#{$dlg-max-height} - #{$dlg-footer-height} - #{$dlg-header-height});
        min-height: calc(#{$dlg-min-height} - #{$dlg-footer-height} - #{$dlg-header-height});
        width: 100%;
        padding: pxToRem(16);
        position: relative;
        overflow: hidden auto;
        height: calc(100% - #{pxToRem(54)}); // 内容减去底部高度
        border-radius: 0 0 pxToRem(12) pxToRem(12);

        &.no-footer {
          height: 100%;
          max-height: calc(#{$dlg-max-height} - #{$dlg-header-height});
          min-height: calc(#{$dlg-min-height} - #{$dlg-header-height});
        }
      }
    }

    .dialog-footer {
      height: $dlg-footer-height;
      line-height: $dlg-footer-height;
      padding: 0 pxToRem(20);
      @include flexCenter(end);
      gap: pxToRem(16);

      .el-button + .el-button {
        margin-left: pxToRem(16);
      }
    }

    // 二次确认弹窗
    &:has(.tooltip-confirm-content) {
      width: pxToRem(460);
      min-height: unset;
      height: fit-content;

      .dialog-content {
        min-height: unset;
      }

      &:has(.del) {
        .dialog-header {
          @include lightTheme {
            --color: var(--error);

            .title {
              color: colorValue(error);
            }
          }
        }

        .tooltip-confirm-content .del {
          color: rgb(var(--error));
        }

        .el-button {
          --color: var(--error);
        }
      }
    }

    // 多模块内容
    &.multi-module {
      .dialog-body {
        .dialog-content {
          @include lightTheme {
            background:
              linear-gradient(0deg, rgba(var(--color), 0.1) 0%, rgba(var(--color), 0.1) 100%), #fff;
          }
        }
      }
    }
  }

  .dialogMask {
    @include wh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: colorValue(black);
    opacity: 0.5;
    z-index: 1000;
  }

  .dialogMaskFade-enter-active {
    animation: dialogMaskFadeIn var(--duration);
  }

  .dialogMaskFade-leave-active {
    animation: dialogMaskFadeOut var(--duration);
  }

  @keyframes dialogMaskFadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }

  @keyframes dialogMaskFadeOut {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
    }
  }

  .FormBuilderDialog {
    width: var(--width);
    height: var(--height);

    &.readonly {
      height: fit-content !important;
    }

    .dialog-content {
      overflow: auto;
    }
  }
</style>
