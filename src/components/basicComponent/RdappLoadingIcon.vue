<template>
  <img class="loading-icon" src="@/assets/img/common/upload-file-loading-icon.png" alt="loading" />
</template>

<style lang="scss" scoped>
  .loading-icon {
    display: block;
    animation: loading-rotate 1s linear infinite;
  }

  @keyframes loading-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
