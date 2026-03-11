<template>
  <div id="MainApp">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@use '@/assets/scss/rules' as *;

#MainApp {
  @include wh;
  background: var(--bgColor);
}
</style>
