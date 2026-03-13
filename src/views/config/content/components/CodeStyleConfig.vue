<template>
  <div class="style-config">
    <div class="config-row">
      <label class="config-label">字体</label>
      <RdappSelect
        v-model="config.fontFamily"
        :options="fontOptions"
        placeholder="选择字体"
      />
    </div>
    <div class="config-row">
      <label class="config-label">字号</label>
      <RdappSelect
        v-model="config.fontSize"
        :options="fontSizeOptions"
        placeholder="选择字号"
      />
    </div>
    <div class="config-row">
      <label class="config-label">背景色</label>
      <div class="color-picker-wrapper">
        <input type="color" v-model="config.background" class="color-picker" />
        <span class="color-value">{{ config.background }}</span>
      </div>
    </div>
    <div class="config-row">
      <label class="config-label">边框色</label>
      <div class="color-picker-wrapper">
        <input type="color" v-model="config.borderColor" class="color-picker" />
        <span class="color-value">{{ config.borderColor }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import RdappSelect from "@/components/basicComponent/RdappSelect.vue";

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

const fontOptions = [
  { value: "Liberation Mono", label: "Liberation Mono" },
  { value: "Consolas", label: "Consolas" },
  { value: "Monaco", label: "Monaco" },
  { value: "Courier New", label: "Courier New" },
];

const fontSizeOptions = [
  { value: "11", label: "11px" },
  { value: "12", label: "12px" },
  { value: "13", label: "13px" },
  { value: "14", label: "14px" },
];
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
      width: 60px;
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
  }
}
</style>
