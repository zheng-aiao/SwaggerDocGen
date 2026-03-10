<!--
 * @Author: zhengxiaoying zhengxiaoying@genew.com
 * @Date: 2025-10-31 10:48:21
 * @LastEditors: zhengxiaoying zhengxiaoying@genew.com
 * @LastEditTime: 2025-11-04 16:19:10
 * @FilePath: \srm-web\src\biz\confirmModel\TooltipConfirm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <RdappDialog
    v-model="visible"
    v-bind="$attrs"
    :title="props.title"
    :is-close="props.isClose"
    :is-close-icon="props.isCloseIcon"
    @input="close"
    @confirm="confirm"
  >
    <div class="tooltip-confirm-content">
      <div v-if="typeof content === 'function'">
        <render-vnode :vnode="content()" />
      </div>
      <div v-else v-html="content"></div>
    </div>
  </RdappDialog>
</template>

<script setup>
  import { ref, nextTick } from 'vue'

  const props = defineProps({
    title: { type: String, default: '确定' },
    content: { type: [String, Function], required: true },
    isClose: { type: Boolean, default: true },
    isCloseIcon: { type: Boolean, default: true }
  })

  // 用来渲染 VNode 的小组件
  const RenderVnode = {
    functional: true,
    props: ['vnode'],
    render: (h, ctx) => ctx.props.vnode
  }
  const emit = defineEmits(['handleConfirm', 'handleClose'])

  const visible = ref(false)

  nextTick(() => {
    visible.value = true
  })
  const confirm = () => {
    visible.value = false

    const timer = setTimeout(() => {
      emit('handleConfirm')
      clearTimeout(timer)
    }, 320)
  }

  const close = () => {
    visible.value = false
    const timer = setTimeout(() => {
      emit('handleClose')
      clearTimeout(timer)
    }, 320)
  }

  defineExpose({ open })
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;

  .tooltip-confirm-content {
    @include fontStyle(3);
    word-wrap: break-word;
  }
</style>
