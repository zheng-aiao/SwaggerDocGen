<template>
  <div class="header-right">
    <button class="icon-btn" title="通知">
      <IconSvg name="bell" :size="20" />
    </button>
    <button class="icon-btn" title="设置">
      <IconSvg name="settings" :size="20" />
    </button>
    <ThemeSwitcher />
    <UserInfo />
  </div>
</template>

<script setup>
  import ThemeSwitcher from './ThemeSwitcher.vue'
  import UserInfo from './UserInfo.vue'
  import IconSvg from './IconSvg.vue'
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .header-right {
    @include flexCenter(flex-end, center);
    gap: pxToRem(16);
  }

  .icon-btn {
    @include flexCenter(center, center);
    width: pxToRem(32);
    height: pxToRem(32);
    border-radius: 50%;
    border: 1px solid var(--foreBorderColor);
    background: var(--foregroundColor);
    cursor: pointer;
    transition: all var(--duration);
    padding: 0;

    &:hover {
      border-color: colorValue(color, 0.4);
      box-shadow: 0 0 pxToRem(8) 0 colorValue(color, 0.2);
    }
  }
</style>
