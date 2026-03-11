<script setup>
import TopHeader from './layout/TopHeader.vue'
</script>

<template>
  <div class="app-layout">
    <TopHeader />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'PingFang SC', 'Microsoft YaHei', 'WenQuanYi Zen Hei', sans-serif;
  background-color: #F5F7F8;
  color: #1F2937;
}

.app-layout {
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-top: 64px; /* 顶部导航栏高度 */
  overflow: auto;
}
</style>
