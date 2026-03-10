<template>
  <div id="MainApp" :class="[{ isNavigate }, { hideMenu: showMenu }]">
    <!-- 侧边栏布局 -->
    <el-container v-if="layout === 'side'" key="sideLayout" class="sideLayoutContainer">
      <el-aside v-show="!showMenu" width="auto">
        <LayoutLogo v-show="!isNavigate"></LayoutLogo>
        <LayoutMenu></LayoutMenu>
      </el-aside>
      <el-container>
        <el-header height="">
          <component :is="component[headerComponent]"></component>
        </el-header>
        <el-main class="mainContent">
          <div class="container">
            <LayoutRouterView></LayoutRouterView>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <!-- 顶部布局 -->
    <el-container v-else-if="layout === 'top'" key="topLayout" class="topLayoutContainer">
      <el-header v-show="isHeader" height="">
        <LayoutLogo v-show="!isNavigate"></LayoutLogo>
        <component :is="component[headerComponent]"></component>
      </el-header>
      <el-main class="mainContent">
        <div class="container">
          <LayoutRouterView></LayoutRouterView>
        </div>
      </el-main>
    </el-container>

    <!-- 混合布局 -->
    <el-container v-else key="mixLayout" class="mixLayoutContainer">
      <el-header v-show="isHeader" height="">
        <LayoutLogo v-show="!isNavigate"></LayoutLogo>
        <component :is="component[headerComponent]"></component>
      </el-header>
      <el-container>
        <el-aside v-show="!showMenu" :class="[{ hideMenu: showMenu }]" width="auto">
          <LayoutMenu></LayoutMenu>
        </el-aside>
        <el-main class="mainContent">
          <div class="container">
            <LayoutRouterView></LayoutRouterView>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <GlobalModule></GlobalModule>
  </div>
</template>

<script setup>
  import { computed, nextTick, onMounted, ref, watch } from 'vue'
  import { useRouter, useStore } from '@/hooks'
  import iframeMessage from '@/boot/iframeMessage'
  import LayoutMenu from '@/vue/layout/LayoutMenu.vue'
  import GlobalModule from '@/vue/GlobalModule.vue'
  import LayoutLogo from './layout/LayoutLogo.vue'
  import LayoutHeader from './layout/LayoutHeader.vue'
  import LayoutRouterView from './layout/LayoutRouterView.vue'

  const router = useRouter()
  const store = useStore()

  const component = {
    LayoutHeader
  }
  const {
    model: layoutModel,
    headerComponent = 'LayoutHeader',
    hasLayoutHeader = true
  } = store.state.config.layoutConfig ?? {}

  // 是否为导航页
  const isNavigate = computed(() => store.getters['system/isNavigateRouter'])
  const layout = computed(() => {
    return layoutModel ?? 'mix'
  })

  // 是否显示菜单
  const showMenu = computed(() => {
    if (!store.state.isHiddenMenu) {
      return true
    }
    const { meta } = store.state.system.activeRouter
    return Reflect.has(meta, 'hideRouterMenu') ? meta.hideRouterMenu : isNavigate.value
  })

  const isHeader = ref(hasLayoutHeader)

  onMounted(() => {
    // 跳转到指定路由
    const redirect = window.localStorage.getItem('redirect')
    if (redirect && redirect !== '') router.push({ path: redirect })
    const isHiddenHeader = window.localStorage.getItem('isHiddenHeader')
    if (isHiddenHeader !== null && isHiddenHeader !== undefined && isHiddenHeader !== '') {
      isHeader.value = !(isHiddenHeader === 'true' || isHiddenHeader === true)
      store.commit('setIsHiddenHeader', isHeader.value)
    }
    const isHiddenMenu = window.localStorage.getItem('isHiddenMenu')
    if (isHiddenMenu !== null && isHiddenMenu !== undefined && isHiddenMenu !== '') {
      isHeader.value = !(isHiddenMenu === 'true' || isHiddenMenu === true)
      store.commit('setIsHiddenMenu', isHiddenMenu.value)
    }
    iframeMessage.notifyMounted()
  })

  // 获取头部状态
  watch(
    () => store.state.isHiddenHeader,
    () => {
      const isHiddenHeader = store.state.isHiddenHeader
      if (isHiddenHeader !== null && isHiddenHeader !== undefined) {
        isHeader.value = isHiddenHeader
      }
    },
    { immediate: true }
  )
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  #MainApp {
    @include wh;
    --headerHeight: var(--header-height);

    &.isNavigate {
      --headerHeight: #{pxToRem(110)};
    }

    &.hideMenu {
      .mainContent {
        .container {
          padding: 0;
        }
      }
    }

    > .el-container {
      @include wh;

      // 侧边栏布局
      &.sideLayoutContainer {
        .NewMenu {
          height: calc(100% - var(--headerHeight));
        }
      }

      // 混合布局(默认)
      &.mixLayoutContainer {
        > .el-container {
          height: calc(100% - var(--headerHeight));
        }
        .el-header {
          @include flexCenter(space-between);
        }
        .el-aside {
          overflow: visible;
        }
      }

      // 顶部布局
      &.topLayoutContainer {
        .el-header {
          @include flexCenter;

          .layout-logo {
            flex-shrink: 0;
          }
        }
      }
    }

    .el-header {
      padding: 0;
      height: var(--headerHeight);
      transition: all 0.5s ease-in-out;
    }

    .el-aside {
      opacity: 1;
      transition: opacity 0.3s ease-in-out;

      &.hideMenu {
        opacity: 0;
      }
    }

    .el-main {
      padding: 0;
      overflow: hidden;
    }

    .mainContent {
      height: 100%;
      position: relative;

      .container {
        position: absolute;
        inset: 0;
        padding: pxToRem(16);
      }
    }
  }
</style>
