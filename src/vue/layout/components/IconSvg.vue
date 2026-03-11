<template>
  <img v-if="src" :src="src" :alt="name" class="icon-svg" :style="styleObj" />
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    name: { type: String, required: true },
    size: { type: Number, default: 20 }
  })

  const modules = import.meta.glob('@/assets/icons/*.svg', { eager: true })
  const map = Object.fromEntries(
    Object.entries(modules).map(([path, mod]) => [
      path.split('/').pop().replace('.svg', ''),
      mod.default
    ])
  )

  const src = computed(() => map[props.name])
  const styleObj = computed(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`
  }))
</script>

<style lang="scss" scoped>
  .icon-svg {
    display: inline-block;
  }
</style>
