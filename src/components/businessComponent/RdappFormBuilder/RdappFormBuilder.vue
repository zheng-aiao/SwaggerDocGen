<template>
  <Fragment>
    <template v-if="false">
      <!-- 只读模式：以label-value形式展示 -->
      <component :is="ViewComponent"></component>
    </template>
    <el-form
      ref="formRef"
      :model="params"
      :rules="formRules"
      class="FormBuilder"
      :label-position="labelPosition"
      :validate-on-rule-change="false"
    >
      <el-row class="form-container" :gutter="10" type="flex">
        <el-col key="form-item-header" class="form-item" span="24">
          <!-- 自定义插槽：优先使用外部插槽 -->
          <div class="form-title">
            <slot name="form-header"></slot>
          </div>
        </el-col>
        <!-- 遍历所有表单项 -->
        <el-col
          v-for="item in innerFormItems.filter((e) => !e.class || !e.class.includes('hidden'))"
          :key="`form-item-${item.prop}`"
          :class="['form-item', item.class ?? '']"
          :span="item.span ?? 24"
        >
          <!-- 编辑模式：渲染表单控件 -->
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :label-width="item.labelWidth"
            :class="item.formItemClass"
          >
            <!-- 自定义插槽：优先使用外部插槽 -->
            <slot :name="item.prop" :item="item" :value="params[item.prop]">
              <!-- 动态组件：根据 item.type 映射组件 -->
              <component
                :is="getComponent(item.type)"
                v-model="params[item.prop]"
                v-bind="getComponentProps(item)"
                :disabled="item.readonly || readonly"
                :readonly="item.readonly || readonly"
                v-on="item.events"
                @register-instance="(type, instance) => register(item.prop, instance)"
                @change="(...arg) => handleChange(item.prop, ...arg)"
              >
              </component>
            </slot>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </Fragment>
</template>

<script setup>
  import service from 'src/service'
  import { Fragment } from 'vue-fragment'
  import { ref, computed, watch, nextTick, h, reactive, useSlots } from 'vue'
  import { ComponentMap, DefaultProps, validateMapPosition, validateFile } from './formConfig.js'
  import { omit } from 'lodash-es'
  import RdappKeyValueView from 'src/components/businessComponent/RdappKeyValueView.vue'
  import { momentSource } from '@rdapp/web-common-utils'
  import { getDictDataByType } from '@/utils/publicMethod'
  import { SYSTEM_DATA_SOURCE } from '@/enum/constant'

  const slots = useSlots()

  const props = defineProps({
    value: { type: Object, required: true },
    formItems: { type: Array, required: true },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    labelPosition: { type: String, default: 'top' }
  })
  const emit = defineEmits(['input'])
  const ViewComponent = {
    setup() {
      return () =>
        h(RdappKeyValueView, {
          props: reactive({ columns: keyValueColumns.value, data: params.value }),
          scopedSlots: slots
        })
    }
  }

  const formRef = ref(null)
  const params = computed({
    get: () =>
      new Proxy(
        buildModelValue(props.value), // 防止对象引用改变单向数据流
        {
          get: (...rest) => Reflect.get(...rest),
          // 当给深层度的对象赋值时, 触发父组件更新
          set: (target, key, value) => {
            emit('input', buildReturnValue({ ...target, [key]: value }))
            return true
          }
        }
      ),
    // computed set只能在赋值整个对象的时候触发
    set: (val) => {
      emit('input', buildReturnValue(val))
    }
  })
  // 构建返回值对象
  const buildReturnValue = (params) => {
    const returnValue = {}
    for (const key in params) {
      const keys = key.split('-|-')
      let temp = returnValue
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          temp[keys[i]] = params[key]
        } else {
          if (!temp[keys[i]]) {
            temp[keys[i]] = {}
          }
          temp = temp[keys[i]]
        }
      }
    }
    return returnValue
  }
  // 构建内部匹配的对象
  const buildModelValue = (params) => {
    const modelValue = {}
    const formProps = innerFormItems.value.map((item) => item.prop)
    const fillValue = (params, preKey) => {
      if (preKey) preKey += '-|-'
      for (let key in params) {
        const fullKey = preKey + key
        // 若当前键在表单属性中, 直接赋值(仅第一层)
        if (formProps.indexOf(fullKey) !== -1) {
          modelValue[fullKey] = params[key]
        } else {
          // 若表单属性包含并长于完整的key, 递归赋值
          if (formProps.find((item) => item.indexOf(fullKey + '-|-') === 0)) {
            fillValue(params[key], fullKey)
          } else {
            modelValue[fullKey] = params[key]
          }
        }
      }
    }
    fillValue(params, '')
    return modelValue
  }
  const innerFormItems = computed(() => {
    return props.formItems.map((item) => {
      return { ...item, prop: item.prop.replaceAll('.', '-|-') }
    })
  })
  const formRules = computed(() => {
    // 类型处理映射
    const typeHandlers = {
      map: (item, rules) => validateMapPosition(item, rules, params.value),
      file: (item, rules) => validateFile(item, rules, fileInstance, formRef.value)
    }

    return innerFormItems.value.reduce((rules, item) => {
      let currentRules = { ...rules }
      if (item.rules) {
        currentRules[item.prop] = item.rules
      }
      const handler = typeHandlers[item.type]
      return handler ? handler(item, currentRules) : currentRules
    }, {})
  })
  const fileInstance = new Map()

  /**
   * 获取表单项对应的组件
   */
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
    // 合并默认属性与用户配置
    const baseProps = DefaultProps[item.type] || {}
    const userProps = omit(item, ['rules', 'events', 'viewConfig']) || {}

    // 过滤无用字段
    const filteredProps = omit({ ...baseProps, ...userProps })

    // 补充通用属性
    const res = {
      ...filteredProps,
      placeholder: filteredProps.placeholder || `请输入${item.label}`,
      readonly: filteredProps.readonly || props.readonly,
      disabled: filteredProps.disabled || props.disabled,
      maxlength: filteredProps.maxlength || filteredProps.maxLength || 255
    }
    return res
  }

  const register = (key, instance, options = {}) => {
    if (!key || !instance) {
      console.warn('实例key和instance不能为空')
      return false
    }

    fileInstance.set(key, instance)
  }

  /**
   * 提交文件
   * 根据是否指定单个prop或文件实例数量，返回单个对象或对象数组
   * @param {Object} [options={}] - 上传配置选项
   * @param {string} [options.directoryId] - 上传目标目录ID
   * @returns {Promise<SingleFileUploadResult | SingleFileUploadResult[]>} 单个文件返回对象，多个文件返回对象数组
   */
  const submit = () => {
    // 获取文件实例
    const fileInstances = Array.from(fileInstance.entries()).map(([key, instance]) => ({
      instance,
      prop: key
    }))
    // 如果无文件上传，则直接返回空结果
    if (fileInstances.length === 0) return { directoryId: '', records: [], hasError: false }

    // 创建文件处理器, 根据是否有beforeUpload钩子返回不同的处理函数
    const createFileProcessor = () => {
      return async ({ instance, prop: propName }, index, prevResults = []) => {
        let processedInstance = instance

        const uploadResult = await processedInstance.submit()
        return { ...uploadResult, prop: propName }
      }
    }

    // 多文件上传处理
    const handleMultipleFiles = (fileInstances) => {
      const processFile = createFileProcessor()

      // 执行文件上传
      const processConcurrently = async () => {
        const promises = fileInstances.map((file, index) => processFile(file, index))
        return (await Promise.all(promises)).filter(Boolean)
      }

      return processConcurrently()
    }

    // 只有一个文件时返回对象，多个文件时返回数组
    return fileInstances.length === 1
      ? handleMultipleFiles(fileInstances).then((results) => results[0])
      : handleMultipleFiles(fileInstances)
  }

  const handleChange = (prop, ...arg) => {
    nextTick(() => {
      formRef.value.validateField(prop)
    })
    emit('change', ...arg)
  }
  const validate = () => {
    return new Promise((resolve) => {
      formRef.value.validate((valid) => {
        if (valid) {
          if (Array.from(fileInstance.entries()).length) {
            const submitFile = async () => {
              const data = await submit()
              if (Array.isArray(data)) {
                const files = {}
                data.forEach((e) => {
                  files[e.prop] = String(e.records[0]?.fileId || '')
                })
                emit(
                  'input',
                  buildReturnValue({
                    ...params.value,
                    ...files
                  })
                )
              } else {
                emit(
                  'input',
                  buildReturnValue({
                    ...params.value,
                    [data.prop]: data.records.map((e) => e.fileId).join()
                  })
                )
              }
              resolve(valid)
            }
            submitFile()
          } else {
            resolve(valid)
          }
        } else {
          resolve(valid)
        }
      })
    })
  }

  // 将keyValueColumns改为响应式变量
  const keyValueColumns = ref([])

  // 使用watch监听props变化来处理异步操作
  // watch(
  //   () => [props.formItems, props.readonly],
  //   async ([newFormItems, newReadonly]) => {
  //     if (!newReadonly) {
  //       keyValueColumns.value = []
  //       return
  //     }

  //     const columns = []
  //     for (const current of newFormItems) {
  //       if (!current.prop) continue

  //       const column = {
  //         prop: current.prop,
  //         label: current.label,
  //         ...current.keyValueConfig
  //       }

  //       if (Reflect.has(current, 'span')) {
  //         column.span = current.span
  //       }

  //       if (Reflect.has(current, 'dictKey')) {
  //         current.options = await getDictDataByType(
  //           current.dictKey,
  //           current.type === 'selectResource' ? 'resource' : 'dict'
  //         )
  //       }

  //       column.value = ({ value, ...rest }) => {
  //         return getDisplayValue(value, current, column)
  //       }

  //       columns.push(column)
  //     }

  //     keyValueColumns.value = columns
  //   },
  //   { deep: true, immediate: true }
  // )
  // // 默认值处理函数
  // const getDisplayValue = async (value, item) => {
  //   // 空值处理
  //   if (
  //     value === undefined ||
  //     value === null ||
  //     value === '' ||
  //     (Array.isArray(value) && value.length === 0)
  //   ) {
  //     return '-'
  //   }

  //   // 区划回显
  //   if (item.type === 'selectArea') {
  //     const { records = [] } = await service.gdsBiz.getDistrictsByIds({ ids: [value] })
  //     return records[0].name
  //   }

  //   // 组织架构回显
  //   if (item.type === 'selectOrgs') {
  //     const { records = [] } = await service.orgsBiz.getOrganizationsByIdV2({ id: value })
  //     return records[0].name
  //   }

  //   // 选人回显
  //   if (item.type === 'selectUser') {
  //     const ids = value ? (Array.isArray(value) ? value : value.split(',')) : []
  //     const { records = [] } = await service.orgsBiz.searchContacts(ids)
  //     return records.map((user) => user.name).join(',')
  //   }

  //   if (item.type === 'selectResource') {
  //     const options = item.defaultData || item.options
  //     const valueKey = item.valueKey || 'id'
  //     const labelKey = item.labelKey || 'name'

  //     const findTreeValue = (tree, val, key = 'id') => {
  //       let res = null
  //       const dfs = (arr) => {
  //         for (const node of arr) {
  //           if (node[key] === val) {
  //             res = node
  //             return true
  //           }
  //           if (node.children?.length && dfs(node.children)) return true
  //         }
  //         return false
  //       }
  //       dfs(tree)
  //       return res
  //     }
  //     const target = findTreeValue(options, value, valueKey)
  //     return target ? target[labelKey] : value
  //   }

  //   if (item.options && item.options.length) {
  //     const option = item.options.find((opt) => opt.value === value || opt.dictValue === value)
  //     return option ? option.label || option.dictLabel : value
  //   }

  //   if (item.type === 'systemData') {
  //     const ids = value ? (Array.isArray(value) ? value : value.split(',')) : []
  //     const query = {
  //       pageNum: 1,
  //       pageSize: ids.length,
  //       andCondition: [
  //         {
  //           type: 11,
  //           key: item.bindKey || 'id',
  //           value: ids
  //         }
  //       ]
  //     }
  //     const data = await service[SYSTEM_DATA_SOURCE[item.source || 'areaManage'].service][
  //       SYSTEM_DATA_SOURCE[item.source || 'areaManage'].urlName
  //     ]({ query: JSON.stringify(query) })
  //     return data.list.map((e) => e[item.labelKey || 'name']).join(',')
  //   }

  //   // 日期时间格式化
  //   const dateMap = {
  //     date: 'YYYY-MM-DD',
  //     datetime: 'YYYY-MM-DD HH:mm:ss',
  //     time: 'HH:mm:ss'
  //   }
  //   if (Object.keys(dateMap).includes(item.type) && value) {
  //     return momentSource.formatLocalTime(value, dateMap[item.type] || 'YYYY-MM-DD')
  //   }

  //   if (item.type === 'map') {
  //     return value.address
  //   }

  //   if (item.type === 'file') {
  //     const ids = value ? (Array.isArray(value) ? value : value.split(',')) : []
  //     const { records = [] } = await service.fssBiz.batchSearchFiles(ids)
  //     return h(RdappKeyValueView, { props: { fileList: records } })
  //   }

  //   return value
  // }

  const clearValidate = () => {
    formRef.value.clearValidate()
  }
  defineExpose({ validate, submit, clearValidate })
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .FormBuilder {
    .form-container {
      flex-wrap: wrap;
    }
  }
  .form-title {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
  }
</style>
