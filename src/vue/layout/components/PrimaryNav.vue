<template>
  <nav class="primary-nav">
    <router-link
      v-for="item in items"
      :key="item.path"
      :to="item.path"
      :class="['nav-item', { active: isActive(item.path) }]"
    >
      <em class="iconfont" v-html="item.icon"></em>
      <span>{{ item.name }}</span>
    </router-link>
  </nav>
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const props = defineProps({
    items: { type: Array, required: true }
  })

  const isActive = computed(() => (path) => route.path.startsWith(path))
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .primary-nav {
    @include flexCenter(flex-start, center);
    gap: pxToRem(4);
    height: 100%;

    .nav-item {
      @include flexCenter(center, center);
      gap: pxToRem(8);
      height: 100%;
      padding: 0 pxToRem(20);
      color: var(--textColor-2);
      text-decoration: none;
      position: relative;
      transition: all var(--duration);

      .iconfont {
        @include fontStyle(3);
      }

      span {
        @include fontStyle(5);
        font-weight: 500;
      }

      &:hover {
        color: var(--textColor-1);
        background: colorValue(color, 0.05);
      }

      &.active {
        color: colorValue(color, 1);

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: pxToRem(40);
          height: 2px;
          background: colorValue(color, 1);
          border-radius: 1px;
        }

        .iconfont {
          color: colorValue(color, 1);
        }
      }
    }
  }
</style>
