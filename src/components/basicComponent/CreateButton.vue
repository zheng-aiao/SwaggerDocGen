<template>
  <el-button 
    type="primary" 
    class="create-btn"
    @click="handleClick"
  >
    <el-icon><Plus /></el-icon>
    {{ buttonText || '新增' }}
  </el-button>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  buttonText: {
    type: String,
    default: '新增'
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped lang="scss">
.create-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  height: 40px;
  background: #0f78f0;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #0d6efd;
  }

  .el-icon {
    color: #ffffff;
    font-size: 13.5px;
  }
}
</style>