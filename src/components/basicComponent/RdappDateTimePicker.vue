/** * ElDatePicker二次封装组件 * 透明传递所有属性、事件和插槽给原生el-date-picker组件 */
<template>
  <el-date-picker
    ref="elDatePickerRef"
    v-bind="$attrs"
    :type="$attrs.type || 'datetime'"
    :start-placeholder="$attrs.startPlaceholder || '开始日期'"
    :end-placeholder="$attrs.endPlaceholder || '结束日期'"
    :range-separator="$attrs.rangeSeparator || '至'"
    :editable="$attrs.editable || false"
    v-on="$listeners"
  ></el-date-picker>
</template>
<script setup>
  import { ref, defineExpose } from 'vue'

  const elDatePickerRef = ref(null)

  // 转发el-date-picker的方法
  defineExpose({
    focus: () => elDatePickerRef.value?.focus(),
    blur: () => elDatePickerRef.value?.blur(),
    change: () => elDatePickerRef.value?.change()
  })
</script>
