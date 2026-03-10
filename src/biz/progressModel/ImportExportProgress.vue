<template>
  <transition name="importExportProgress" @after-leave="onLeaveCancelled">
    <div v-show="state.visible" ref="rootElement" :class="['import-export-progress', state.status]">
      <div class="title">
        <div class="left">
          <em class="iconfont" v-html="statusIcon"></em>
          <span>{{ state.title }}</span>
        </div>
        <em class="iconfont close" @click="close">&#xe821;</em>
      </div>
      <div class="content">
        <div class="text">{{ state.content }}</div>
        <div class="progress">
          <el-progress :status="statusName" :percentage="state.progress"></el-progress>
        </div>
      </div>
      <div v-if="state.status === 'exception'" class="footer">
        <div class="button cancel" @click="close">取消</div>
        <div class="button retry" @click="retry">重试</div>
      </div>
    </div>
  </transition>
</template>

<script setup>
  import { ref, reactive, computed } from 'vue'
  import service from '@/service'
  import { Message } from 'element-ui'
  import { resolveBlob } from '@/utils/publicMethod'
  import FakeProgress from './fake-progress'

  const props = defineProps({
    resolve: { type: Function, required: true },
    destroyInstance: { type: Function, required: true }
  })

  const rootElement = ref(null)
  const workResult = ref({}) // 任务结果
  const state = reactive({
    title: '',
    fake: null,
    progress: 0,
    content: '',
    cancelName: '', // 取消网络请求标识
    visible: false,
    status: 'pending', // [pending, success, exception]
    task: () => {}
  })
  const fake = new FakeProgress({
    callback(progress) {
      state.progress = Math.round(progress * 100)
    }
  })

  const statusName = computed(() => (state.status === 'pending' ? null : state.status))
  const statusIcon = computed(() => {
    const map = {
      pending: '&#xe826;',
      success: '&#xe830;',
      exception: '&#xe831;'
    }
    return map[state.status]
  })

  const start = async (options = {}) => {
    const { title, content, cancelName, task, successTitle, errorTitle } = options
    state.title = title
    state.content = content
    state.cancelName = cancelName || 'cancelRequest'
    state.visible = true
    state.status = 'pending'
    state.task = task
    fake.start()
    const result = await task()
    workResult.value = result
    const { hasError, status, ...rest } = result
    // 当导入时，处理数据异常，下载校验文件，并将状态改成失败
    if (state.cancelName.includes('import') && result instanceof Blob && result.size > 0) {
      resolveBlob(result, '错误文件信息.xlsx', '')
    }
    if (workResult.value.hasError) {
      error({ title: errorTitle ?? `${title}失败` })
    } else {
      end({ title: successTitle ?? `${title}成功` })
    }
  }

  const end = ({ title }) => {
    state.title = title
    state.status = 'success'
    fake.end()
    props.resolve(workResult.value)
    const timer = setTimeout(() => {
      state.visible = false
      clearTimeout(timer)
    }, 3000)
  }

  const error = ({ title }) => {
    state.title = title
    state.status = 'exception'
    fake.stop()
  }

  const retry = async () => {
    await resetProgressStyle()
    state.progress = 0
    start({ ...state })
  }

  // 重置进度条样式
  const resetProgressStyle = () => {
    return new Promise((resolve) => {
      const element = rootElement.value.querySelector('.el-progress-bar__inner')
      const transitionValue = element.style.transition
      if (element) {
        element.style.transition = 'none'
        element.style.width = '0%'
        element.clientWidth // 强制重绘
        const timer = setTimeout(() => {
          element.style.transition = transitionValue
          resolve()
          clearTimeout(timer)
        }, 0)
      }
    })
  }

  const onLeaveCancelled = async () => {
    await resetProgressStyle()
    state.progress = 0
    props.destroyInstance()
  }

  const close = () => {
    fake.stop()
    state.visible = false
    service.cancel(state.cancelName) // 取消网络请求
    // 确保网络请求取消成功的微任务赋值完成后再执行resolve
    const timer = setTimeout(() => {
      props.resolve(workResult.value)
      clearTimeout(timer)
    }, 10)
  }

  defineExpose({
    start
  })
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;

  // 弹窗内容样式
  .import-export-progress {
    --white: 255, 255, 255;
    --textColor-1: rgba(var(--white), 1);
    --textColor-2: rgba(var(--white), 0.85);
    --background: 16, 22, 58;
    @function colorValue($name: '', $opacity: 1, $isImportant: false) {
      @if $isImportant == true {
        @return rgba(var(--#{$name}), $opacity) + ' ' + '!' + important;
      } @else {
        @return rgba(var(--#{$name}), $opacity);
      }
    }
    // 获取主题颜色
    @function themeColor($opacity: 1) {
      @return colorValue(themeColor, $opacity);
    }
    position: fixed;
    top: 65px;
    right: 22px;
    z-index: 2001;
    color: var(--textColor-1);
    width: 408px;
    padding: 16px;
    border-radius: 16px;
    backdrop-filter: blur(4px);
    border: 1px solid themeColor(0.5);
    box-shadow: 0 0 20px themeColor();
    background: linear-gradient(0deg, themeColor(0.3) 0%, themeColor(0.3) 100%),
      colorValue(background, 0.5);
    &.pending {
      --themeColor: var(--color);
    }
    &.success {
      --themeColor: var(--success);
    }
    &.exception {
      --themeColor: var(--error);
    }
    // 标题样式
    .title {
      @include fontStyle(2);
      @include flexCenter(space-between);
      height: 24px;
      color: var(--textColor-2);
      .left {
        @include flexCenter(left);
        .q-icon {
          color: themeColor();
        }
      }
      .iconfont:not(.close) {
        display: block;
        font-size: 22px;
        margin-right: 8px;
        transform: translateY(-1px);
        cursor: pointer;
        color: rgb(var(--themeColor));
      }
      .close {
        color: rgb(var(--white));
      }
    }
    // 内容样式
    .content {
      color: var(--textColor-2);
      padding: 12px 12px 0 32px;
      .text {
        word-break: break-all;
      }
    }
    // 进度条样式
    .progress {
      background-color: var(--textColor-1);
      height: 14px;
      margin-top: 16px;
      border-radius: 12px;
      border: 1px solid themeColor();
      .el-progress {
        line-height: 0;
        padding: 2px;
        .el-progress-bar {
          padding-right: 0;
          .el-progress-bar__outer {
            background-color: var(--textColor-1);
            height: 8px !important;

            .el-progress-bar__inner {
              background-color: themeColor();
            }
          }
        }
        .el-progress__text {
          display: none;
        }
      }
    }
    // 底部按钮样式
    .footer {
      margin-top: 16px;
      padding-right: 12px;
      @include flexCenter(right);
      .button {
        @include fontStyle(5);
        @include flexCenter;
        cursor: pointer;
        width: 82px;
        height: 32px;
        border-radius: 6px;
      }
      .cancel {
        color: themeColor();
        background: themeColor(0.2);
        margin-right: 16px;
      }
      .retry {
        background: themeColor();
        color: var(--textColor-1);
      }
    }
  }
</style>
