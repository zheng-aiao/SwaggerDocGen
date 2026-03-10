<template>
  <el-badge class="NoticeButton" :value="noticeBadgeCount" :hidden="!noticeBadgeCount" :max="999">
    <div class="badge-content" @click="noticeClick">
      <RdappButton type="notification" iconBtn></RdappButton>
      <span>通知</span>
    </div>
  </el-badge>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { Message } from 'element-ui'

  const noticeBadgeCount = computed(() => {
    return 0
  })
  onMounted(() => {})

  const noticeClick = () => {
    Message.info('功能开发中...')
  }
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;
  @use '@/assets/scss/elementUi/RdappElButton.scss';

  .NoticeButton {
    .badge-content {
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

    @include lightTheme {
      .badge-content {
        border: 1px solid rgba(var(--color), 0.2);
        background: rgba(var(--color), 0.1);
      }
    }

    .el-badge__content {
      background-color: rgb(var(--error));
      color: colorValue(white, 1);
      border: none;
      transform: translateY(-50%) translateX(60%);
    }
  }
</style>
