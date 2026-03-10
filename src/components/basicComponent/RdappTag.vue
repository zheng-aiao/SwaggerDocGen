/** * ElTag二次封装组件 * 透明传递所有属性、事件和插槽给原生el-tag组件 * 默认设置size="small" */
<template>
  <el-tag ref="elTagRef" size="small" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-tag>
</template>

<script setup>
  import { ref, defineExpose } from 'vue'

  const elTagRef = ref(null)

  // 转发el-tag的常用方法
  defineExpose({
    // 获取原生标签元素
    click: () => elTagRef.value?.click(),
    close: () => elTagRef.value?.close()
  })
</script>
