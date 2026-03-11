<template>
  <div class="user-info">
    <span class="name">{{ title }}</span>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { useThemeStore } from '@/store/theme'

  const store = useThemeStore()
  const title = computed(() => store.documentTitle)
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .user-info {
    @include flexCenter(center, center);
    color: var(--textColor-2);
  }
</style>
