<template>
  <div class="style-config">
    <div class="config-row">
      <label class="config-label">表头背景</label>
      <div class="color-picker-wrapper">
        <input type="color" v-model="config.headerBg" class="color-picker" />
        <span class="color-value">{{ config.headerBg }}</span>
      </div>
    </div>
    <div class="config-row">
      <label class="config-label">边框颜色</label>
      <div class="color-picker-wrapper">
        <input type="color" v-model="config.borderColor" class="color-picker" />
        <span class="color-value">{{ config.borderColor }}</span>
      </div>
    </div>
    <div class="config-row">
      <label class="config-label">斑马纹</label>
      <div class="switch-wrapper">
        <el-switch v-model="config.striped" />
        <span class="switch-label">{{ config.striped ? '启用' : '禁用' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue"]);

const config = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<style scoped lang="scss">
.style-config {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .config-row {
    display: flex;
    align-items: center;
    gap: 12px;

    .config-label {
      width: 80px;
      font-size: 13px;
      color: #6b7280;
      flex-shrink: 0;
    }

    .color-picker-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;

      .color-picker {
        width: 32px;
        height: 32px;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        cursor: pointer;
        padding: 2px;
      }

      .color-value {
        font-size: 12px;
        color: #6b7280;
        font-family: monospace;
      }
    }

    .switch-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;

      .switch-label {
        font-size: 13px;
        color: #6b7280;
      }
    }
  }
}
</style>
