<template>
  <div :class="['menu-container', { collapsed: collapsed }]">
    <div class="NewMenu">
      <el-menu :default-active="defaultActive" router>
        <template v-for="(menu, index) in menuList">
          <el-submenu
            v-if="menu.children.length"
            :key="`submenu-${index}-${menu.url}`"
            :index="menu.url"
          >
            <template #title>
              <div class="content">
                <em class="iconfont" v-html="menu.icon" />
                <span>{{ menu.name }}</span>
              </div>
            </template>
            <el-menu-item v-for="sub in menu.children" :key="sub.url" :index="sub.url">
              <div class="content">{{ sub.name }}</div>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :key="`menuitem-${index}-${menu.url}`" :index="menu.url">
            <div class="content">
              <em class="iconfont" v-html="menu.icon" />
              <span>{{ menu.name }}</span>
            </div>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="collapse-button" @click="toggleCollapse">
      <em class="iconfont">
        {{ collapsed ? '&#xe6b2;' : '&#xe6b0;' }}
      </em>
    </div>
  </div>
</template>

<script setup>
  import { computed, watchEffect, ref, onBeforeMount, onMounted } from 'vue'
  import store from '@/store'
  import pubsub from 'pubsub-js'
  import { appRoutesConfig } from '@/config'

  const props = defineProps({
    isAside: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:isAside'])

  const activeRouter = computed(() => store.state.system.activeRouter ?? {})
  const defaultActive = computed(() => activeRouter.value?.path)
  const collapsed = computed(() => planCollapsed.value || isCollapsed.value)

  const generateMenuFromRoutes = (routes, parentPath) => {
    const menu = []
    routes.forEach((route) => {
      const { title, ...rest } = route.meta ?? {}
      if (!title) return // 跳过没有 title 的路由

      const fullPath = parentPath + '/' + route.path
      const menuItem = { ...rest, name: title, url: fullPath, children: [] }
      // 递归处理子路由
      if (route.children) {
        menuItem.children = generateMenuFromRoutes(route.children, fullPath)
      }
      menu.push(menuItem)
    })
    return menu
  }
  const menuList = ref([])
  watchEffect(() => {
    const baseRoute = appRoutesConfig.value.find(
      (item) => item.path === activeRouter.value.matched[0].path
    )
    const timer = setTimeout(() => {
      // 切换路由动画结束后再更新菜单
      menuList.value = generateMenuFromRoutes(baseRoute?.children ?? [], baseRoute?.path)
      clearTimeout(timer)
      emit('update:isAside', !baseRoute?.meta?.hideRouterMenu ?? false) // 动画结束后隐藏是否侧边栏(不延迟隐藏界面会有割裂感)
    }, 350)
  })

  const isCollapsed = ref(false)
  const planCollapsed = ref(false) //预案详情设置的收起
  const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
    planCollapsed.value = isCollapsed.value
  }
  onMounted(() => {
    pubsub.subscribe('toggleLayoutMenu', (_, show) => {
      planCollapsed.value = show
    })
  })

  onBeforeMount(() => {
    pubsub.unsubscribe('toggleLayoutMenu')
  })
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .menu-container {
    @include wh(var(--side-width), 100%);
    position: relative;
    transition: width var(--duration) ease-in-out;

    &.collapsed {
      width: 0;

      .NewMenu {
        padding: 0;
      }

      .collapse-button {
        right: pxToRem(-20);
      }
    }

    .NewMenu {
      @include wh;
      position: relative;
      padding: pxToRem(16);
      border-right: pxToRem(1) solid rgba(var(--white), 0.2);
      background-color: colorValue(color, 0.05);
      transition: padding var(--duration) ease-in-out;
      overflow: auto;

      .el-menu {
        overflow: revert;
      }
    }

    .collapse-button {
      @include whrem(28);
      @include flexCenter;
      position: absolute;
      top: 0;
      right: pxToRem(-12);
      z-index: 1;
      cursor: pointer;
      border-radius: 999px;
      border-right: pxToRem(2) solid colorValue(color, 0.2);
      background: colorValue(color, 0.05);
      backdrop-filter: blur(pxToRem(3));
      transition: right 0.2s ease-in-out;

      @include darkTheme {
        background: linear-gradient(
          180deg,
          colorValue(color, 0.3) 0%,
          colorValue(color, 0.01) 100%
        );
      }

      .iconfont {
        color: var(--textColor-2);
      }
    }
  }

  @include rootLightTheme {
    .NewMenu {
      border-right-color: colorValue(color, 0.2);
    }
  }
</style>
