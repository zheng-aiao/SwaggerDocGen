<template>
  <div class="logo">
    <img v-if="systemIcon" :src="systemIcon" class="system-icon" alt="logo" />
    <span class="system-title">{{ title }}</span>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useThemeStore } from '@/store/theme'

  const store = useThemeStore()
  const title = computed(() => store.documentTitle || 'SwaggerDocGen')
  const systemIcon = ref('')

  onMounted(() => {
    const iconLink = document.querySelector('link[rel*="icon"]')
    if (iconLink) {
      systemIcon.value = iconLink.href
    }
  })
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .logo {
    @include flexCenter(flex-start, center);
    gap: pxToRem(8);
    height: 100%;

    .system-icon {
      width: pxToRem(28);
      height: pxToRem(28);
    }

    .system-title {
      @include fontStyle(2);
      color: var(--textColor-1);
      font-weight: 700;
      white-space: nowrap;
    }
  }
</style>
