<template>
  <fragment>
    <!-- 非 iframe 页面 -->
    <ChildLayout v-if="!isIframeComponent" />
    <!-- iframe 页面 -->
    <transition
      v-for="(item, index) in stayAliveList"
      :key="index"
      name="fade-transform"
      mode="out-in"
    >
      <RdappIframe
        v-if="item.status !== IFRAME_STATUS.IDLE"
        :key="index"
        :ref="item.key + index"
        :base-id="item.key"
        :base-query="item.config"
        :is-active="item.key === activeIframeKey"
        @iframe-loaded="onIframeLoaded"
      />
    </transition>
  </fragment>
</template>

<script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useStore, useRouter } from '@/hooks'
  import ChildLayout from '@/vue/layout/ChildLayout.vue'
  import { appConfig } from '@/config'

  /* ---------------- 常量 ---------------- */
  const IFRAME_STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    READY: 'ready'
  }

  const store = useStore()
  const router = useRouter()

  const activeRouter = computed(() => store.state.system.activeRouter)

  const isIframeComponent = computed(() => {
    return !!activeRouter.value?.meta?.query?.baseUrl
  })

  /* ---------------- iframe 缓存池 ---------------- */
  const stayAliveList = ref([])
  const activeIframeKey = ref(null)
  const loadingKey = ref(null)
  const iframePoolReady = ref(false)

  /* ---------------- 初始化 iframe 池 ---------------- */
  const initIframePool = () => {
    const map = new Map()

    router.getRoutes().forEach((route) => {
      const { baseUrl, type } = route.meta?.query || {}
      if (!baseUrl || !type) return

      if (!map.has(type)) {
        map.set(type, {
          ...route.meta?.query,
          baseUrl,
          type,
          path: route.path
        })
      }
    })

    stayAliveList.value = Array.from(map.entries()).map(([key, config]) => ({
      key,
      config,
      status: IFRAME_STATUS.IDLE
    }))

    stayAliveList.value.push({
      key: 'default',
      config: {
        type: 'default',
        baseUrl: '/'
      },
      status: IFRAME_STATUS.IDLE
    })

    iframePoolReady.value = true
  }

  onMounted(() => {
    initIframePool()
  })

  /* ---------------- 当前路由处理逻辑 ---------------- */
  const handleActiveRoute = () => {
    if (!iframePoolReady.value) return

    const routerVal = activeRouter.value
    const query = routerVal?.meta?.query || {}
    const type = query.type

    if (!type) {
      activeIframeKey.value = null
      return
    }

    activeIframeKey.value = type

    // 激活 iframe 立即加载
    const target = stayAliveList.value.find((i) => i.key === type)
    if (target && target.status === IFRAME_STATUS.IDLE) {
      startLoading(target)
    }
  }

  /* ---------------- 统一加载函数 ---------------- */
  const startLoading = (item) => {
    loadingKey.value = item.key
    item.status = IFRAME_STATUS.LOADING
    console.log(`🟢 开始加载 iframe -> ${item.key}`, stayAliveList.value)
  }

  const tryLoadNextIframe = () => {
    if (loadingKey.value) return

    // 顺序预加载下一个 idle iframe
    const next = stayAliveList.value.find((i) => i.status === IFRAME_STATUS.IDLE)
    if (!next) return

    startLoading(next)
  }

  /* ---------------- iframe loaded 回调 ---------------- */
  const onIframeLoaded = (baseId) => {
    if (!loadingKey.value) return
    const item = stayAliveList.value.find((i) => i.key === baseId)
    if (!item) return

    if (item.status !== IFRAME_STATUS.READY) {
      item.status = IFRAME_STATUS.READY
    }

    if (loadingKey.value === baseId) {
      loadingKey.value = null
    }

    console.log(`✅ iframe 加载完成 -> ${baseId}`, stayAliveList.value)

    // 顺序加载下一个 idle iframe
    const next = stayAliveList.value.find((i) => i.status === IFRAME_STATUS.IDLE)
    if (next) {
      setTimeout(() => {
        startLoading(next)
      }, appConfig.value?.iframeTime || 8000)
    }
  }

  /* ---------------- 路由变化触发 ---------------- */
  watch(
    () => activeRouter.value,
    () => {
      handleActiveRoute()
      tryLoadNextIframe()
    },
    { immediate: true }
  )

  /* ---------------- iframe 池 ready 时补跑一次 ---------------- */
  watch(iframePoolReady, (ready) => {
    if (ready) {
      handleActiveRoute()
      tryLoadNextIframe()
    }
  })
</script>
