<template>
  <div
    v-show="props.isActive"
    class="RdappIframeContainer"
    :class="{ 'iframe-active': props.isActive }"
  >
    <iframe
      :id="baseIframe.id"
      :src="baseIframe.url"
      frameborder="0"
      allow="camera; fullscreen; microphone; speaker; frame-ancestors; picture-in-picture"
      class="iframe-content"
      @load="onIframeLoad"
      @error="handleIframeError"
    ></iframe>
  </div>
</template>
<script setup>
  import {
    onBeforeUnmount,
    ref,
    watch,
    onMounted,
    nextTick,
    getCurrentInstance,
    watchPostEffect,
    computed
  } from 'vue'
  import { jumpLink } from '@/utils/publicMethod'
  import { useStore } from '@/hooks'
  import service from '@/service'
  import iframeMessage from '@/boot/iframeMessage'
  import { debounce } from 'lodash-es'
  import { appConfig } from '@/config'

  const { proxy } = getCurrentInstance()

  const store = useStore()

  const props = defineProps({
    // iframe id
    baseId: {
      type: String,
      default: 'iframe-content'
    },
    // 跳转参数
    baseQuery: {
      type: Object,
      default: () => {}
    },
    // 激活状态：false  非激活状态：true 激活状态
    isActive: {
      type: Boolean,
      default: false
    }
  })

  /**
   * iframe对象
   */
  const baseIframe = ref({
    // iframe的唯一标识符，从组件的props中获取baseId属性
    id: props.baseId,
    // iframe要加载的URL地址，初始为空字符串
    url: '',
    // iframe的类型，默认为空字符串
    type: props.baseQuery?.type || '',
    // 是否显示iframe，从组件的props中获取isActive属性
    isShow: props?.isActive || false,
    // 是否踢出用户，默认为false
    kickOutUser: props.baseQuery?.kickOutUser || false,
    // 是否不预加载，默认为false
    notPreload: props.baseQuery?.notPreload || false,
    // 是否为跳转链接
    link: props.baseQuery?.link || false
  })

  // 当前路由信息
  const routerInfo = ref(null)

  // 从 Vuex 获取主题状态
  const currentTheme = computed(() => store.state.theme?.theme || 'dark')
  const currentThemeColor = computed(() => store.state.theme?.themeColor || '71,164,255')
  const currentCareModel = computed(() => store.state.theme?.careModel || false)
  // 监听 isActive 变化，更新容器样式和 iframe 状态
  watch(
    () => props.isActive,
    (newVal) => {
      baseIframe.value.isShow = newVal
    }
  )
  // 监听 Vuex 主题状态变化，同步到 iframe
  watch(
    [currentTheme, currentThemeColor, currentCareModel],
    ([theme, themeColor, careModel]) => {
      if (props.isActive) {
        syncThemeToIframe({ theme, themeColor, careModel })
      }
    },
    { deep: true }
  )

  // 单独引用监听
  watchPostEffect(() => {
    const iframe = document.getElementById(props.baseQuery.type)
    const baseUrl = props.baseQuery?.baseUrl
    if (!baseUrl) return
    if (props.baseQuery?.link && !props.baseQuery?.notPreload) {
      nextTick(() => {
        baseIframe.value.url = jumpLink({ link: baseUrl, type: 'router' }, true)
      })
    } else {
      if (iframe?.contentWindow) {
        debounce(async () => {
          const path = baseUrl.replace(/^[^/]+?\//, '/')
          const message = {
            type:
              props.baseQuery?.type === 'CW' || props.baseQuery?.type === 'Resource'
                ? 'changRouter'
                : props.baseQuery?.type,
            action: 'gotoRoute',
            path: path,
            route: path
          }
          iframe.contentWindow.postMessage(message, '*')
          // 再次调用加载完成
          onIframeLoad()
          log.info(`🚀 onIframeLoad ~ iframe.postMessage ~ gotoRoute -> `, message, props.baseQuery)
        }, 200)
      } else {
        log.info(`🚀 ××× ~ unknown jump props -> `, baseUrl, props.baseQuery)
      }
    }
  })

  onMounted(() => {
    const baseUrl = props.baseQuery.baseUrl
    baseIframe.value = {
      id: props.baseId,
      type: props.baseQuery.type,
      isShow: props.isActive,
      kickOutUser: props.baseQuery?.kickOutUser || false,
      notPreload: props.baseQuery?.notPreload || false
    }
    baseIframe.value.url = props.baseQuery?.notPreload
      ? ''
      : jumpLink({ link: baseUrl, type: 'router' }, true)
  })

  watch(
    () => store.state.system.activeRouter,
    (newRoute, oldRoute) => {
      const oldQuery = oldRoute?.meta?.query || {}
      if (
        oldQuery?.kickOutUser &&
        oldQuery.type === baseIframe.value.type &&
        oldQuery.type !== newRoute?.meta?.query?.type
      ) {
        // 只有类型不同时才踢出
        kickOutUserFun(true)
      }
      const query = newRoute?.meta?.query || {}
      // 忽略不为当前类型的数据
      if (!(query?.baseUrl && query?.type) || baseIframe.value.type !== query.type) {
        return
      }
      const baseUrl = `${query?.baseUrl}`

      if (baseUrl) {
        if (baseIframe.value.type === query.type) {
          routerInfo.value = query
          // 注：存在link时，直接跳转baseUrl 不做发送消息
          if (!query.link && baseIframe.value.url !== '') {
            console.log('up')
            // 同类型下 postMessage 跳转路由
            const iframe = document.getElementById(query.type)
            if (iframe) {
              const path = baseUrl.replace(/^[^/]+?\//, '/')
              const message = {
                type: query?.type === 'CW' ? 'changRouter' : query?.type,
                action: 'gotoRoute',
                path: path,
                route: path
              }
              iframe.contentWindow.postMessage(message, '*')
              // 再次调用加载完成
              if (oldQuery?.kickOutUser !== query?.kickOutUser) {
                onIframeLoad()
              }
              log.info(`🚀 onIframeLoad ~ iframe.postMessage ~ gotoRoute -> `, message, query)
            }
          } else {
            // 直接跳转路由
            nextTick(() => {
              baseIframe.value.url = jumpLink({ link: baseUrl, type: 'router' }, true)
            })
          }
        }
      }
    },
    {
      immediate: true
    }
  )

  /**
   * 同步主题到 iframe
   * @param {Object} theme - 主题配置
   */
  const syncThemeToIframe = (theme = {}) => {
    const iframe = document.getElementById(baseIframe.value.type)
    if (iframe?.contentWindow) {
      const message = {
        type: 'srm',
        action: 'changeTheme',
        themeColor: theme.themeColor || currentThemeColor.value,
        themeMode: theme.theme || currentTheme.value,
        careModel: theme.careModel || currentCareModel.value,
        applyTransition: true,
        updateUserConfig: true
      }

      try {
        iframe.contentWindow.postMessage(message, '*')
        log.info(`🚀 syncThemeToIframe ~ iframe.postMessage ~ changeTheme -> `, message)
      } catch (error) {
        console.warn('无法向 iframe 发送主题消息:', error)
      }
    }
  }

  /**
   * 处理 iframe 加载完成事件
   */
  const onIframeLoad = () => {
    const iframe = document.getElementById(baseIframe.value.type)
    emit('iframe-loaded', props.baseId)
    if (iframe?.contentWindow) {
      console.log(`🚀 onIframeLoad ~ iframe.contentWindow -> `, iframe.contentWindow)

      // iframe 加载完成时同步当前主题
      syncThemeToIframe({
        theme: currentTheme.value,
        themeColor: currentThemeColor.value,
        careModel: currentCareModel.value
      })

      // 判断是否需要踢出用户
      if (baseIframe.value?.kickOutUser && routerInfo.value?.type === baseIframe.value?.type) {
        const message = { type: baseIframe.value?.type || 'DV9000', action: 'kickOutUser' }
        iframe.contentWindow.postMessage(message, '*')
        log.info(
          `🚀 onIframeLoad ~ iframe.postMessage ~ kickOutUser -> `,
          message,
          baseIframe.value
        )
      }
    }
  }

  // 处理加载错误
  const handleIframeError = (error) => {
    emit('iframe-error', {
      baseId: baseIframe.value.id,
      error: error,
      errorMessage: `iframe加载失败`
    })
  }

  /**
   * 在组件卸载前执行的清理操作
   */
  onBeforeUnmount(async () => {
    kickOutUserFun()
  })

  /**
   * 踢出其它客户端用户
   * @param isOutUser
   * @returns {Promise<void>}
   */
  const kickOutUserFun = async (isOutUser) => {
    console.log(
      `🚀 kickOutUserFun ~ isOutUser -> `,
      (baseIframe.value?.kickOutUser &&
        routerInfo.value?.kickOutUser !== baseIframe.value?.kickOutUser &&
        routerInfo.value?.type === baseIframe.value?.type) ||
        isOutUser
    )
    if (
      (baseIframe.value?.kickOutUser &&
        routerInfo.value?.kickOutUser !== baseIframe.value?.kickOutUser &&
        routerInfo.value?.type === baseIframe.value?.type) ||
      isOutUser
    ) {
      // 销毁对方用户
      const data = await service.edmsBiz.kickOutUser({ type: 0 })
      if (!data?.hasError) {
        log.info(`🚀 kickOutUserFun ~ PEMS ~ rcs ~ init -> `, data)
        await proxy.$rcs.init({
          ...proxy.$dispatchConfig,
          store,
          isReconnection: true
        })
      }
    }
  }

  const emit = defineEmits(['iframe-loaded', 'iframe-error'])
</script>

<style lang="scss" scoped>
  .RdappIframeContainer {
    position: relative;
    overflow: hidden;
    // width: 0;
    // height: 0;

    &.iframe-active,
    .iframe-content {
      width: 100%; /* 激活时宽度100% */
      height: 100%; /* 激活时高度100% */
    }
  }
</style>
