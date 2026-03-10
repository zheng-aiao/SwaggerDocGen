<template>
  <!--
    el-step 的点击事件不生效，需在最外部 rdapp-steps 容器使用原生事件委托。
    核心：不要在 el-steps 上用@click（不生效），而是在外部最顶层包裹 div 上用 @click
  -->
  <div ref="stepsWrapper" class="rdapp-steps-event-container" @click="handleStepBoxClick">
    <el-steps
      ref="stepBox"
      v-bind="$attrs"
      :active="active"
      :direction="direction"
      align-center
      :simple="simple"
      :finish-status="finishStatus"
      :process-status="processStatus"
    >
      <el-step
        v-for="(step, index) in steps"
        :key="step.id !== undefined ? step.id : index"
        ref="step_item"
        :title="step.title"
        :description="step.description"
        :icon="step.icon"
        :status="step.status"
        :class="step.class"
        v-bind="step.props"
        v-on="step.events"
      >
        <template v-for="slotName in Object.keys(step.slots || {})" #[slotName]="slotProps">
          <slot :name="step.slots[slotName]" v-bind="slotProps" />
        </template>
      </el-step>
      <slot></slot>
    </el-steps>
  </div>
</template>

<script setup>
  import { computed, ref, nextTick, onMounted } from 'vue'

  const props = defineProps({
    steps: {
      type: Array,
      default: () => []
    },
    active: {
      type: [Number, String],
      default: 0
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    alignCenter: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    },
    finishStatus: {
      type: String,
      default: 'success'
    },
    processStatus: {
      type: String,
      default: 'process'
    },
    needClick: {
      type: Boolean,
      default: true
    }
  })

  const emit = defineEmits(['update:active'])

  const stepBox = ref(null)
  const stepsWrapper = ref(null)
  const step_item = ref([])

  /**
   * 真正可靠的点击获取方法：事件委托在外层真实元素(div)，
   * 然后利用 event.target 和 el-step DOM 节点匹配。
   */
  const handleStepBoxClick = (event) => {
    // 寻找 el-step dom 节点（通过外层 wrapper 更可靠，不用依赖 el-stepBox 的 $el/refs 结构）
    // 直接在真正渲染的 dom 中查找
    if (!props.needClick) return

    const wrapper = stepsWrapper.value
    if (!wrapper) return
    // 获取 el-step 的所有 dom 节点
    const stepNodes = wrapper.querySelectorAll('.el-step')
    if (!stepNodes || !stepNodes.length) return

    // 反向：找到最靠近点击目标的 el-step
    let clickedStepEl = event.target
    while (clickedStepEl && clickedStepEl !== wrapper) {
      if (clickedStepEl.classList && clickedStepEl.classList.contains('el-step')) {
        break
      }
      clickedStepEl = clickedStepEl.parentNode
    }
    if (!clickedStepEl || !clickedStepEl.classList || !clickedStepEl.classList.contains('el-step'))
      return

    const index = Array.prototype.indexOf.call(stepNodes, clickedStepEl)
    if (index !== -1) {
      emit('update:active', index)
    }
  }
</script>
