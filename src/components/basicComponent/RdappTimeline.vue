<template>
  <el-timeline style="overflow: hidden" :reverse="props.reverse">
    <el-timeline-item
      v-for="item in data"
      :key="item.id || item[props.keyField]"
      placement="top"
      :timestamp="item[props.dateField]"
      :type="item.type || props.itemType"
      :color="item.color || props.itemColor"
      :size="item.size || props.itemSize"
      :icon="item.icon"
      v-bind="attrs"
    >
      <div class="timeline-wrapper">
        <div v-if="item.title" class="timeline-title">{{ item.title }}</div>
        <slot :item="item" :index="item.id || item[props.keyField]">
          <div v-if="item.content" class="timeline-content timeline-body">
            {{ item.content }}
          </div>
        </slot>
      </div>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
  import { useAttrs } from 'vue'

  const attrs = useAttrs()

  const props = defineProps({
    reverse: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    dateField: {
      type: String,
      default: 'date'
    },
    keyField: {
      type: String,
      default: 'id'
    },
    itemType: {
      type: String,
      default: '',
      validator: (value) => ['', 'primary', 'success', 'warning', 'danger', 'info'].includes(value)
    },
    itemColor: {
      type: String,
      default: ''
    },
    itemSize: {
      type: String,
      default: 'normal',
      validator: (value) => ['normal', 'large'].includes(value)
    }
  })
</script>

<style scoped lang="scss">
  .timeline-title {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 4px;
  }

  .timeline-content {
    font-size: 13px;
    line-height: 1.5;
  }
</style>
