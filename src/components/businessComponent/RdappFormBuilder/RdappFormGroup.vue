<template>
  <div class="form-group">
    <div v-for="groupItem in formGroup" :key="groupItem.title" class="system-card">
      <div class="system-card-title">{{ groupItem.title }}</div>
      <div class="system-card-content">
        <RdappFormBuilder
          ref="formBuilderItem"
          v-model="$attrs.value"
          :v-bind="$attrs"
          :formItems="groupItem.formItems"
          :readonly="$attrs.readonly"
          :v-on="$listeners"
          @input="$emit('input', $event)"
        >
        </RdappFormBuilder>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onUnmounted, nextTick } from 'vue'

  const props = defineProps({
    formGroup: { type: Array, required: true }
  })
  const emit = defineEmits(['input'])

  const formBuilderItem = ref(null)

  const validate = () => {
    return new Promise((resolve) => {
      let valid = new Array(formBuilderItem.value.length).fill(false)
      formBuilderItem.value.forEach(async (item, index) => {
        valid[index] = await item.validate()

        if (index === formBuilderItem.value.length - 1) {
          resolve(valid.every((item) => item))
        }
      })
    })
  }

  defineExpose({ validate })
</script>

<style lang="scss" scope>
  @use '@/assets/scss/rules' as *;
  .form-group {
    display: flex;
    flex-direction: column;
    gap: pxToRem(16);
  }
</style>
