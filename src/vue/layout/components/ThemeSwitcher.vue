<template>
  <div class="theme-switcher">
    <RdappButton type="switch" :label="label" @click="toggle" />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import RdappButton from '@/components/basicComponent/RdappButton.vue'
  import { useThemeStore } from '@/store/theme'

  const store = useThemeStore()
  const label = computed(() => (store.theme === 'dark' ? '切换为浅色' : '切换为深色'))
  const toggle = () => {
    store.setTheme(store.theme === 'dark' ? 'light' : 'dark')
  }
</script>

<style lang="scss" scoped>
  .theme-switcher {
    display: flex;
  }
</style>
