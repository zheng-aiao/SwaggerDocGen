<template>
  <div class="router-container">
    <!-- 只有最后一级子组件才进行过渡, 否则效果会叠加 -->
    <template v-if="$route.redirect">
      <router-view />
    </template>
    <transition v-else name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script setup></script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;
  @use '@/assets/scss/globalPublic.scss' as *;

  .router-container {
    @include wh;
    color: var(--textColor-1);
  }
</style>
