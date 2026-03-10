/** * ElTimePicker二次封装组件 * 透明传递所有属性、事件和插槽给原生el-time-picker组件 */
<template>
  <el-time-picker
    ref="elTimeRef"
    placeholder="请选择时间"
    v-bind="$attrs"
    :start-placeholder="$attrs.startPlaceholder || '开始日期'"
    :end-placeholder="$attrs.endPlaceholder || '结束日期'"
    :range-separator="$attrs.rangeSeparator || '至'"
    :editable="$attrs.editable || false"
    v-on="$listeners"
  >
  </el-time-picker>
</template>
<script setup>
  import { ref, defineExpose } from 'vue'

  const elTimeRef = ref(null)

  // 转发el-time的方法
  defineExpose({
    focus: () => elTimeRef.value?.focus(),
    blur: () => elTimeRef.value?.blur(),
    change: () => elTimeRef.value?.change()
  })
</script>
