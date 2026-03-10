<template>
  <el-tabs :class="['RdappTabBar', classNames]" v-bind="$attrs" v-on="$listeners">
    <template v-for="(item, index) in props.buttons">
      <el-tab-pane
        v-if="item.hasOwnProperty('isShow') ? item.isShow : true"
        :key="index"
        class="button-item"
        :name="String(item.name ?? index)"
        v-bind="item"
      >
        <template #label>
          <em v-if="item.icon" class="iconfont" v-html="item.icon"></em>
          <span :class="['text', classNames]">{{ item.label }}</span>
        </template>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    // 按钮列表
    buttons: { type: Array, required: true },
    // 是否需要选中高亮效果
    needActive: { type: Boolean, default: true },
    // 是否圆角风格
    round: { type: Boolean, default: false },
    // 是否填充按钮背景
    fillBackground: { type: Boolean, default: false },
    // 大小
    size: {
      type: String,
      default: 'large',
      validator: (value) => ['large', 'small'].includes(value)
    }
  })
  const classNames = computed(() => ({
    round: props.round,
    fill: props.fillBackground,
    notActive: !props.needActive,
    [props.size]: true
  }))
</script>

<style lang="scss"></style>
