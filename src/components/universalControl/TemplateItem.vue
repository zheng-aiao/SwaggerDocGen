<template>
  <div
    class="config-template-item"
    :class="[`span-${control.col}`, { 'sel-control': selControlId === control.id }]"
    @click="handleSelect"
  >
    <div class="template-item-drag" :class="{ noDrag: !isSel }">
      <em class="iconfont">&#xe9ad;</em>
    </div>
    <div class="template-item-content">
      <div class="template-item-label">
        <span v-if="control.props.required" class="required biz-red">*</span>
        {{ control.label }}
      </div>

      <slot :name="control.type">
        <component
          :is="getComponent(control.props.type || control.type)"
          v-bind="getComponentProps(control)"
          :key="timer"
          v-model="params"
          :disabled="true"
          :readonly="true"
        >
        </component>
      </slot>
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted, watch } from 'vue'
  import { omit } from 'lodash-es'

  import {
    ComponentMap,
    DefaultProps
  } from '@/components/businessComponent/RdappFormBuilder/formConfig.js'

  const props = defineProps({
    control: {
      type: Object,
      required: true
    },
    selControlId: {
      type: String,
      default: ''
    },
    isSel: {
      type: Boolean,
      default: true
    }
  })

  const emit = defineEmits(['select'])
  const params = ref(null)
  const timer = ref(0)
  watch(
    () => props.control,
    () => {
      timer.value = Date.parse(new Date())
    }
  )

  if (props.control.type === 'map') {
    params.value = { address: '', lngLat: [] }
  }
  const getComponent = (type) => {
    if (!ComponentMap[type]) {
      console.warn(`未找到类型为${type}的组件，使用默认输入框`)
      return ComponentMap.text
    }
    return ComponentMap[type]
  }

  /**
   * 获取组件的最终属性
   */
  const getComponentProps = (item) => {
    const data = { ...item, ...item.props }
    delete data.props
    // 合并默认属性与用户配置
    const baseProps = DefaultProps[data.type] || {}
    const userProps = omit(data, ['rules', 'events', 'viewConfig']) || {}

    // 过滤无用字段
    const filteredProps = omit({ ...baseProps, ...userProps })
    const inputType = ['text', 'textarea', 'number', 'inputNumber']
    // 补充通用属性
    const res = {
      ...filteredProps,
      placeholder:
        filteredProps.placeholder ||
        `${inputType.includes(data.type) ? '请输入' : '请选择'}${data.label}`,
      readonly: filteredProps.readonly || props.readonly,
      disabled: filteredProps.disabled || props.disabled,
      maxlength: filteredProps.maxlength || filteredProps.maxLength || 255
    }
    return res
  }

  // 选中元素后发出select事件并带上control数据
  function handleSelect() {
    emit('select', props.control)
  }
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;
  .config-template-item {
    @include wh();
    @include flexCenter(space-between, flex-start, false, false);
    border-radius: pxToRem(8);
    padding: pxToRem(12);
    padding-left: pxToRem(8);
    border: pxToRem(1) solid rgba(var(--color), 0);
    gap: 0 pxToRem(8);
    cursor: pointer;

    .template-item-drag {
      @include wh(pxToRem(24));
      @include flexCenter();
      cursor: move;
      user-select: none;

      .iconfont {
        cursor: move;
      }

      &.noDrag {
        opacity: 0.4;

        .iconfont {
          cursor: not-allowed;
        }
      }
    }

    .template-item-content {
      flex: 1;

      .template-item-label {
        @include fontStyle(5);
        height: pxToRem(30);
        line-height: normal;
      }
    }

    &:hover {
      border: pxToRem(1) solid rgba(var(--color), 0.5);
    }
  }

  .sel-control {
    border: pxToRem(1) solid rgb(var(--color));
    background-color: rgba(var(--color), 0.15);
  }
</style>
