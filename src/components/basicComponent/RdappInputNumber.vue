/** * ElInput二次封装组件 * 透明传递所有属性、事件和插槽给原生el-input-number组件 */
<template>
  <el-input-number v-bind="$attrs" ref="elInputNumRef" v-on="$listeners"> </el-input-number>
</template>
<script setup>
  import { ref, defineExpose } from 'vue'

  const elInputNumRef = ref(null)

  // 转发el-input的方法
  defineExpose({
    focus: () => elInputNumRef.value?.change(),
    select: () => elInputNumRef.value?.blur()
  })
</script>
