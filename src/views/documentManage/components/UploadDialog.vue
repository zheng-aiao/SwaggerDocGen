<template>
  <RdappDialog v-model="visible" title="上传文档" width="600px">
    <div class="upload-body">
      <div class="placeholder">
        <em class="iconfont">&#xe82c;</em>
        <span>上传控件待接入</span>
      </div>
    </div>
    <template #footer>
      <RdappButton type="close" label="关闭" @click="close" />
    </template>
  </RdappDialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import RdappDialog from '@/components/basicComponent/RdappDialog.vue'
import RdappButton from '@/components/basicComponent/RdappButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'uploaded'])
const visible = ref(false)

watch(
  () => props.modelValue,
  (v) => (visible.value = v),
  { immediate: true }
)

watch(
  () => visible.value,
  (v) => emit('update:modelValue', v)
)

const submit = async () => {}

const close = () => {
  visible.value = false
}
</script>

<style lang="scss" scoped>
.upload-body {
  padding: 12px 0;
}
.placeholder {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--textColor-4);
}
</style>
