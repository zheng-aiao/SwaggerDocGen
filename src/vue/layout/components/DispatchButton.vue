<template>
  <el-badge
    v-show="verifyAuth('100601')"
    class="DispatchButton"
    :value="dispatchUnreadNum"
    :hidden="!+dispatchUnreadNum"
    :max="999"
  >
    <RdappButton
      class="badge-content"
      type="dispatch"
      second
      :label="dispatchTitle"
      :debounce="false"
      @click="openDispatch"
    ></RdappButton>
  </el-badge>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from '@/hooks'
  import { dispatchController } from '@rdapp/one-click-dispatch'
  import { verifyAuth } from '@/boot/auth'

  const store = useStore()
  const dispatchUnreadNum = computed(() =>
    Object.values(store.getters['oneClickDispatchModule/moduleCount'] ?? {}).reduce(
      (prev, current) => prev + (current ?? 0),
      0
    )
  )
  const dispatchTitle = computed(
    () => store.state.config.dispatchConfig.dispatchTitle ?? '一键调度'
  )

  const openDispatch = () => {
    dispatchController.openPanel({ liveList: store.state.liveList })
  }
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;
  @use '@/assets/scss/elementUi/RdappElButton.scss';

  .DispatchButton {
    .el-badge__content {
      background-color: rgb(var(--error));
      color: colorValue(white, 1);
      border: none;
      transform: translateY(-50%) translateX(60%);
    }
  }
</style>
