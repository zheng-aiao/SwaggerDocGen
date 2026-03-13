<template>
  <div class="style-config">
    <div class="config-row">
      <label class="config-label">最大宽度</label>
      <RdappSelect
        v-model="config.maxWidth"
        :options="widthOptions"
        placeholder="选择宽度"
      />
    </div>
    <div class="config-row">
      <label class="config-label">对齐方式</label>
      <RdappSelect
        v-model="config.alignment"
        :options="alignOptions"
        placeholder="选择对齐"
      />
    </div>
    <div class="config-row">
      <label class="config-label">显示标题</label>
      <div class="switch-wrapper">
        <el-switch v-model="config.caption" />
        <span class="switch-label">{{ config.caption ? '显示' : '隐藏' }}</span>
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

const widthOptions = [
  { value: "50", label: "50%" },
  { value: "75", label: "75%" },
  { value: "100", label: "100%" },
];

const alignOptions = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
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
      width: 80px;
      font-size: 13px;
      color: #6b7280;
      flex-shrink: 0;
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
