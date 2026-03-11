<!-- 
 - tableBtn: { type: Boolean, default: false }
  是否为表格内部按钮，若为 true，将使用全局 config 配置
  全局配置路径：configStore.tableBtn
  {
    btnType: 'iconBtn', // 列表按钮类型 iconBtn-图标按钮 textBtn-纯文本按钮 iconTextBtn-图标+文本按钮
    iconPosition: 'left' // 图标位置  left-图标在文本左边 top-图标在文本上
  }
-->
<template>
  <div v-if="verifyAuth(props.verifyAuth)">
    <span
      v-if="showType === 'iconBtn' && stopClick"
      :title="props.label || btnData.label"
      class="iconfont"
      style="color: rgb(var(--color))"
      :class="btnData.class || 'biz-primary'"
      @click.stop="handleClick"
      v-html="btnData.icon"
    >
    </span>
    <span
      v-if="showType === 'iconBtn' && !stopClick"
      :title="props.label || btnData.label"
      class="iconfont"
      :class="btnData.class || 'biz-primary'"
      @click="handleClickStop"
      v-html="btnData.icon"
    >
    </span>
    <el-button
      v-if="showType !== 'iconBtn'"
      :class="[
        btnData.class || 'biz-primary',
        { topIconButton: showType === 'iconTextBtn' && iconPosition === 'top' }
      ]"
      :disabled="innerDisabled || disabled"
      v-bind="$attrs"
      :second="props.tableBtn || $attrs.second"
      :type="props.tableBtn ? 'primary' : $attrs.btnType"
      :link="props.tableBtn"
      @click="handleClick"
    >
      <slot>
        <span v-if="showType === 'textBtn'" class="name">{{ props.label || btnData.label }}</span>

        <div v-if="showType === 'iconTextBtn'" :class="{ iconTextBtn: iconPosition === 'left' }">
          <span class="btnIconFont" v-html="btnData.icon"> </span>
          <div>{{ props.label || btnData.label }}</div>
        </div>
      </slot>
    </el-button>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useConfigStore } from '@/store'
  import { iconData } from '@/assets/iconData.js'

  const emit = defineEmits(['click'])

  const props = defineProps({
    tableBtn: { type: Boolean, default: false },
    iconBtn: { type: Boolean, default: false },
    textBtn: { type: Boolean, default: false },
    iconTextBtn: { type: Boolean, default: false },
    iconPosition: { type: String, default: 'left' },
    type: { type: String, default: 'add' },
    label: { type: String, default: '' },
    verifyAuth: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    debounce: { type: Boolean, default: true },
    debounceTime: { type: Number, default: 1000 },
    stopClick: { type: Boolean, default: true }
  })

  const configStore = useConfigStore()

  const showType = computed(() => {
    if (props.tableBtn) {
      return configStore.tableBtn?.btnType ?? 'textBtn'
    }

    if (props.iconBtn) return 'iconBtn'

    if (props.textBtn) return 'textBtn'

    return 'iconTextBtn'
  })

  const iconPosition = computed(() => {
    if (props.tableBtn) {
      return configStore.tableBtn?.iconPosition ?? 'left'
    } else {
      return props.iconPosition
    }
  })

  const btnData = computed(() => {
    return iconData[props.type] || { icon: '', label: '' }
  })

  const innerDisabled = ref(false)

  const handleClick = (e) => {
    if (props.debounce && !innerDisabled.value) {
      innerDisabled.value = true
      setTimeout(() => {
        innerDisabled.value = false
      }, props.debounceTime)
    }
    emit('click', e)
  }

  const handleClickStop = (e) => {
    e.stopPropagation()
    handleClick(e)
  }

  function verifyAuth(unique) {
    if (!unique) return true
    return true
  }
</script>

<style lang="scss" scoped>
  .el-button {
    > span {
      display: inline-block !important;

      .iconTextBtn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }

  .topIconButton {
    height: 100% !important;
  }

  .btnIconFont {
    font-family: 'iconfont', sans-serif !important;
    font-size: 1.125rem;
    line-height: 1;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: pointer;
  }
</style>
