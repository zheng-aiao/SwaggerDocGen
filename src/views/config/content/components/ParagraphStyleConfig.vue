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
      <label class="config-label">行高</label>
      <RdappSelect
        v-model="config.lineHeight"
        :options="lineHeightOptions"
        placeholder="选择行高"
      />
    </div>
    <div class="config-row">
      <label class="config-label">颜色</label>
      <div class="color-picker-wrapper">
        <input type="color" v-model="config.color" class="color-picker" />
        <span class="color-value">{{ config.color }}</span>
      </div>
    </div>
    <div class="config-row">
      <label class="config-label">对齐</label>
      <RdappSelect
        v-model="config.textAlign"
        :options="alignOptions"
        placeholder="选择对齐"
      />
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
  { value: "WenQuanYi Zen Hei", label: "文泉驿正黑" },
  { value: "Inter", label: "Inter" },
  { value: "SimHei", label: "黑体" },
  { value: "SimSun", label: "宋体" },
];

const fontSizeOptions = [
  { value: "12", label: "12px" },
  { value: "13", label: "13px" },
  { value: "14", label: "14px" },
  { value: "15", label: "15px" },
  { value: "16", label: "16px" },
];

const lineHeightOptions = [
  { value: "1.5", label: "1.5" },
  { value: "1.6", label: "1.6" },
  { value: "1.8", label: "1.8" },
  { value: "2.0", label: "2.0" },
];

const alignOptions = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
  { value: "justify", label: "两端对齐" },
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
