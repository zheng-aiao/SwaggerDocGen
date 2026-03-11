<template>
  <div>
    <div class="panel-header">服务类型</div>
    <div class="panel-body category-sidebar">
      <div class="section">
        <div class="section-title">分类</div>
        <ul class="category-list">
          <li
            v-for="item in categories"
            :key="item.id"
            :class="['cat-item', { active: model === item.id }]"
            @click="model = item.id"
          >
            <span class="name">{{ item.label }}</span>
            <span class="right">
              <span class="count">{{ Number(item.count ?? 0) }}</span>
              <span class="actions">
                <el-button link type="primary" @click.stop="emitRenameItem(item)">编辑</el-button>
                <el-button link type="danger" @click.stop="emitRemoveItem(item)">删除</el-button>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div class="bottom-actions">
        <RdappButton type="primary" label="新增分类" @click="emitCreate" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import RdappButton from '@/components/basicComponent/RdappButton.vue'

  const props = defineProps({
    modelValue: { type: [String, Number], default: 'all' },
    categories: {
      type: Array,
      default: () => [
        { id: 'all', label: '全部服务', count: 0 },
        { id: 'srm', label: 'SRM服务', count: 0 },
        { id: 'pems', label: 'PEMS服务', count: 0 }
      ]
    }
  })
  const emit = defineEmits(['update:modelValue', 'create', 'rename', 'remove'])

  const model = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })

  const emitCreate = () => emit('create')
  const emitRenameItem = (item) => emit('rename', item.id)
  const emitRemoveItem = (item) => emit('remove', item.id)
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;
  .category-sidebar {
    display: flex;
    flex-direction: column;
    gap: pxToRem(12);
  }
  .section-title {
    @include fontStyle(4);
    color: var(--textColor-1);
    margin-bottom: pxToRem(8);
  }
  .category-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: pxToRem(6);
  }
  .cat-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: pxToRem(8) pxToRem(10);
    border-radius: pxToRem(6);
    cursor: pointer;
    color: var(--textColor-1);
    transition: background 0.2s ease;
  }
  .cat-item:hover {
    background: rgba(var(--color), 0.06);
  }
  .cat-item.active {
    background: rgba(var(--color), 0.1);
    color: rgb(var(--color));
  }
  .right {
    display: inline-flex;
    align-items: center;
    gap: pxToRem(8);
    position: relative;
  }
  .count {
    min-width: pxToRem(24);
    text-align: right;
    color: var(--textColor-2);
  }
  .actions {
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .cat-item:hover .actions {
    opacity: 1;
  }
  .bottom-actions {
    margin-top: auto;
    @include flexCenter(flex-start, center);
  }
</style>
