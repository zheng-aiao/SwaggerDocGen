<template>
  <div class="key-value-container">
    <el-row type="flex" :gutter="gutter">
      <!-- 遍历列配置数组，渲染每一列 -->
      <el-col
        v-for="(column, index) in columns"
        :key="index"
        :span="getColumnSpan(column)"
        :class="['key-value-col', column.class]"
      >
        <!-- 整个列的插槽：优先级最高，用于完全自定义列渲染 -->
        <template v-if="slots[`view-${column.prop}`]">
          <slot :name="`view-${column.prop}`" :column="column" :value="column" />
        </template>
        <template v-else>
          <!-- 键部分：显示字段标签 -->
          <div :class="['key', `label-${column.prop}`]">
            <template v-if="slots[`label-${column.prop}`]">
              <slot :name="`label-${column.prop}`" :column="column" />
            </template>
            <template v-else>
              <RdappTooltip :content="column.label">
                <span>{{ column.label }} </span>
              </RdappTooltip>
            </template>
          </div>

          <!-- 值部分：显示字段内容 -->
          <div :class="['value', `label-${column.prop}`]">
            <template v-if="slots[`value-${column.prop || index}`]">
              <slot :name="`value-${column.prop || index}`" :column="column" />
            </template>
            <template v-else>
              <!-- 异步值渲染器：处理同步/异步值渲染 -->
              <AsyncValueRenderer :column="column" :data="data" />
            </template>

            <!-- 标签：显示额外状态标签 -->
            <el-tag v-if="column.tag" :class="column.tag.class || ''">
              {{ column.tag.content }}
            </el-tag>
          </div>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
  import {
    h,
    defineComponent,
    useSlots,
    ref,
    watch,
    onMounted,
    getCurrentInstance,
    reactive
  } from 'vue'
  import { isFunction, get, isObject, isPlainObject } from 'lodash-es'
  import { Fragment } from 'vue-fragment'
  import RdappTooltip from '@/components/basicComponent/RdappTooltip.vue'
  import RdappLoadingIcon from '@/components/basicComponent/RdappLoadingIcon.vue'

  const props = defineProps({
    /**
     * 列配置数组，每个元素配置一列的显示和行为
     * 每列配置项说明：
     * @property {string} label - 字段标签文本，显示在左侧键部分
     * @property {string} prop - 字段标识，用于关联数据和插槽命名
     * @property {Function|any} [value] - 自定义值处理逻辑，支持同步值或返回Promise的异步函数
     * @property {number} [span] - 列宽度，可选值：1,2,3,4,6,8,12,24（基于24分栏布局）
     * @property {string} [class] - 自定义列CSS类名
     * @property {Object} [tag] - 预置显示的标签配置(设计稿已定义)
     * @property {string} tag.content - 标签文本内容
     * @property {string} tag.class - 标签CSS类名
     */
    columns: {
      type: Array,
      required: true,
      validator: (value) => value.every((item) => Reflect.has(item, 'label'))
    },
    /**
     * 数据源对象，通过prop属性从该对象中获取对应值
     */
    data: {
      type: Object,
      default: () => ({})
    },
    /**
     * 每行显示的列数，影响默认列宽度计算
     * 可选值：1,2,3,4,6,8,12,24
     */
    columnsPerRow: {
      type: Number,
      default: 2,
      validator: (value) => [1, 2, 3, 4, 6, 8, 12, 24].includes(value)
    },
    /**
     * 列之间的间距（像素）
     */
    gutter: {
      type: Number,
      default: 16
    }
  })

  const { proxy } = getCurrentInstance()
  const slots = useSlots()
  // 判断是否为Vue虚拟节点
  const isVNode = (val) => isObject(val) && Reflect.has(val, 'componentInstance')

  // 获取列跨度（宽度）
  const getColumnSpan = (column) => {
    // 优先使用column配置的span，否则根据每行列数计算
    if (column.span && [1, 2, 3, 4, 6, 8, 12, 24].includes(column.span)) {
      return column.span
    }
    return 24 / props.columnsPerRow
  }

  // 通用值渲染器：处理不同类型的内容渲染
  const ResolveRenderer = defineComponent({
    props: {
      content: { type: [String, Number, Object], required: true }
    },
    setup(props) {
      const { content } = props

      return () => {
        // 如果是渲染函数，直接执行并返回结果
        if (isFunction(content)) {
          return content({ ...props })
        }
        // 如果是组件配置对象，渲染为组件
        if (isPlainObject(content) && Reflect.has(content, 'setup')) {
          return h(content, { props: { data: props.data } })
        }
        // 如果是虚拟DOM，直接返回
        if (isVNode(content)) {
          return content
        }
        // 普通值转为字符串渲染
        return h(Fragment, null, String(content))
      }
    }
  })

  // 异步值渲染器：处理同步/异步值的加载和渲染
  const AsyncValueRenderer = {
    props: ['column', 'data'],
    setup(props) {
      const content = ref(null) // 存储最终渲染的值
      const loading = ref(true) // 加载状态

      // 获取值的逻辑：处理同步/异步值
      const getValue = () => {
        const { column, data } = props

        // 如果配置了自定义value函数，优先使用
        if (isFunction(column.value)) {
          const propValue = column.prop ? get(data, column.prop) : null
          // 传递上下文参数：值、数据源、列配置、h函数
          return column.value({
            value: propValue,
            data,
            column,
            h: (...rest) => proxy.$createElement(...rest)
          })
        }
        // 直接使用配置的value值
        if (Reflect.has(column, 'value')) return column.value
        // 从数据源中获取值
        if (column.prop && data) return get(data, column.prop)
        return ''
      }

      // 加载数据：支持异步加载
      const loadData = async (prop) => {
        try {
          loading.value = true
          const result = await Promise.resolve(getValue()) // 等待同步/异步结果
          content.value = result
        } catch (err) {
          console.error(`异步${prop}渲染出错, err:`, err)
          content.value = null
        } finally {
          loading.value = false
        }
      }

      // 初始化加载
      onMounted(() => loadData(props.column.prop))

      // 监听数据或列配置变化，重新加载
      watch(
        () => [props.data, props.column],
        () => loadData(props.column.prop)
      )

      // 渲染逻辑
      return () => {
        return loading.value
          ? h(RdappLoadingIcon) // 加载中状态
          : h(
              RdappTooltip,
              {
                props: reactive({
                  // 非字符串/数字类型禁用tooltip
                  disable: !['string', 'number'].includes(typeof content.value)
                }),
                attrs: { content: content.value ?? '-' }
              },
              [h('span', null, [h(ResolveRenderer, { props: { content: content.value ?? '-' } })])]
            )
      }
    }
  }
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .key-value-container {
    width: 100%;

    .el-row {
      width: 100%;
      flex-wrap: wrap;
      row-gap: pxToRem(20);
    }

    .key-value-col {
      @include fontStyle(5);
      $line-width: #{pxToRem(96)};
      $line-height: #{pxToRem(28)};
      height: $line-height;
      display: flex;
      align-items: center;
      gap: pxToRem(4);

      // 特殊处理包含文件预览列表的列
      &:has(.preview-file-list) {
        height: fit-content;

        .value {
          height: fit-content;
        }
      }

      .el-tooltip {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .key {
        min-width: $line-width;
        width: fit-content;
        height: $line-height;
        line-height: $line-height;
        color: var(--textColor-2);
      }

      .value {
        display: flex;
        align-items: center;
        gap: pxToRem(5);
        max-width: calc(100% - #{$line-width});
        height: $line-height;
        line-height: $line-height;
      }
    }
  }
</style>
