<template>
  <el-popover trigger="click" :visible-arrow="false" popper-class="homeMorePopover">
    <div class="home-more-menu">
      <RdappButton
        v-for="item in jumpExternalLinks"
        v-show="verifyAuth(item.authCode)"
        :key="item.link"
        second
        class="item"
        @click.stop="jumpLink(item)"
      >
        {{ item.title }}
      </RdappButton>
      <RdappButton second class="item" @click.stop="router.push('/system/dictManagement')">
        系统维护
      </RdappButton>
      <RdappButton
        v-if="isDev"
        second
        class="item"
        @click.stop="router.push('/system/development')"
      >
        开发demo
      </RdappButton>
      <div v-if="version" class="item version">
        <div :title="version">{{ version }}</div>
      </div>
    </div>
    <template #reference>
      <RdappButton type="more" second :debounce="false"></RdappButton>
    </template>
  </el-popover>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore, useRouter } from '@/hooks'
  import { jumpLink, isDev } from '@/utils/publicMethod.js'
  import { verifyAuth } from '@/boot/auth'

  const router = useRouter()
  const store = useStore()

  const version = computed(() => store.state.version ?? 'dev')
  const jumpExternalLinks = computed(() => store.state.config.jumpExternalLinks)
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;
  @use '@/assets/scss/elementUi/RdappElButton.scss';

  .more-btn {
    @include RdappElButton.secondButtonStyle;
    @include wh(fit-content, 34px);
    @include flexCenter;
    gap: 8px;
    position: relative;
    cursor: pointer;
    padding: 0 12px;

    span {
      @include fontStyle(5);
    }

    .iconfont {
      color: inherit;
      font-size: 20px;
    }
  }

  .el-popover.homeMorePopover {
    @include dialogStyle;
    width: 132px;
    min-width: 132px;
    border-radius: 12px;
    padding: 0;
    transform: translateY(10px);

    .home-more-menu {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;

      .item > .el-button:not(.version) {
        @include wh(100%, 40px);
        @include fontStyle(3);
        display: flex;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        color: var(--textColor-1);
        transition: all var(--duration);
        border: 2px solid transparent;
        background-color: transparent;

        &:active {
          background: colorValue(color, 0.3);
        }
      }

      .version {
        @include fontStyle(5);
        color: rgb(var(--color));
        padding: 6px;

        div {
          @include textHidden(1);
          background-color: rgba(var(--color), 0.35);
          padding: 4px 6px;
          border-radius: 99px;
          text-align: center;
        }
      }
    }
  }
</style>
