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
      <label class="config-label">字重</label>
      <RdappSelect
        v-model="config.fontWeight"
        :options="fontWeightOptions"
        placeholder="选择字重"
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
      <label class="config-label">行高</label>
      <RdappSelect
        v-model="config.lineHeight"
        :options="lineHeightOptions"
        placeholder="选择行高"
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
  { value: "Inter", label: "Inter" },
  { value: "WenQuanYi Zen Hei", label: "文泉驿正黑" },
  { value: "SimHei", label: "黑体" },
  { value: "SimSun", label: "宋体" },
];

const fontSizeOptions = [
  { value: "24", label: "24px" },
  { value: "26", label: "26px" },
  { value: "28", label: "28px" },
  { value: "30", label: "30px" },
  { value: "32", label: "32px" },
];

const fontWeightOptions = [
  { value: "400", label: "常规" },
  { value: "500", label: "中等" },
  { value: "600", label: "半粗" },
  { value: "700", label: "粗体" },
];

const lineHeightOptions = [
  { value: "1.2", label: "1.2" },
  { value: "1.4", label: "1.4" },
  { value: "1.6", label: "1.6" },
  { value: "1.8", label: "1.8" },
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
