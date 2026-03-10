<template>
  <div class="form-group">
    <RdappFormBuilder
      ref="formBuilderItem"
      v-model="params"
      :v-bind="$attrs"
      :formItems="formItems"
      :v-on="$listeners"
    >
      <template #worker>
        <slot name="worker"></slot>
      </template>
    </RdappFormBuilder>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'
  import { VALIDATE_RULES } from '@/utils/validateRules.js'

  const FILE_EXT_DATA = {
    word: ['.doc', '.docx'],
    excel: ['.xls', '.xlsx'],
    ppt: ['.ppt', '.pptx'],
    txt: ['.txt', '.md', '.markdown'],
    image: ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.bmp', '.heif', '.heic', '.avif'],
    video: [
      '.mp4',
      '.avi',
      '.mkv',
      '.mov',
      '.wmv',
      '.flv',
      '.webm',
      '.vob',
      '.m4v',
      '.3gp',
      '.3g2',
      '.mpg',
      '.mpeg'
    ],
    audio: [
      '.mp3',
      '.wav',
      '.aac',
      '.flac',
      '.ogg',
      '.alac',
      '.wma',
      '.aiff',
      '.m4a',
      '.amr',
      '.opus'
    ],
    pdf: ['.pdf']
  }

  const props = defineProps({
    value: { type: Object, required: true },
    formConfig: { type: Array, default: () => [] },
    readonly: { type: Boolean, default: false }
  })
  const emit = defineEmits(['input'])

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
    // computed set只能赋值整个对象的时候触发
    set: (val) => {
      emit('input', buildReturnValue(val))
    }
  })

  const formBuilderItem = ref(null)
  const formItems = computed(() => {
    return props.formConfig.map((formItem) => {
      const rules = []
      if (formItem.props.required) {
        rules.push(VALIDATE_RULES.required(formItem.label, ['blur', 'change']))
      }

      const data = {
        label: formItem.label,
        prop: formItem.value,
        span: formItem.col,
        type: formItem.props.type || formItem.type,
        readonly: formItem.props.readonly || props.readonly,
        class: formItem.props.showType?.includes('web') ?? true ? '' : 'hidden'
      }
      // 文本框处理
      if (formItem.type === 'input') {
        if (formItem.props.type === 'text') {
          rules.push(VALIDATE_RULES.maxLength(formItem.props.maxLength))
        } else {
          data.maxlength = formItem.props.maxLength
        }
        if (formItem.props.rules) {
          formItem.props.rules.forEach((ruleItem) => {
            rules.push({
              validator: (rule, value, callback) => {
                const reg = new RegExp(ruleItem.rule)
                if (!reg.test(value)) {
                  callback(new Error(ruleItem.error))
                  return
                }
                callback()
              },
              trigger: ['blur']
            })
          })
        }
      }
      // 数字类型处理
      if (formItem.type === 'number') {
        if (formItem.props.type === 'number') {
          rules.push(VALIDATE_RULES.floatString({ isEmpty: !formItem.props.required }, 'blur'))
        } else if (formItem.props.type === 'inputNumber') {
          data.step = 1
          data['step-strictly'] = true
        }
        // 取值范围校验：formItem.props.min / max
        if (formItem.props.min != null || formItem.props.max != null) {
          const minRaw = formItem.props.min
          const maxRaw = formItem.props.max
          const minNum = minRaw != null ? Number(minRaw) : null
          const maxNum = maxRaw != null ? Number(maxRaw) : null
          const label = formItem.label
          rules.push({
            validator: (rule, value, callback) => {
              if (value === '' || value === undefined || value === null) {
                callback()
                return
              }
              const num = Number(value)
              if (Number.isNaN(num)) {
                callback(new Error('请输入有效的数字'))
                return
              }
              if (minNum != null && !Number.isNaN(minNum) && num < minNum) {
                callback(new Error(`${label}不能小于${minRaw}`))
                return
              }
              if (maxNum != null && !Number.isNaN(maxNum) && num > maxNum) {
                callback(new Error(`${label}不能大于${maxRaw}`))
                return
              }
              callback()
            },
            trigger: ['blur', 'change']
          })
        }
      }
      // 字典key赋值
      if (
        formItem.type === 'selectDict' ||
        formItem.type === 'selectResource' ||
        formItem.type === 'optionGroup'
      ) {
        data.dictKey = formItem.props.dictKey
      }
      // 日期类型处理：根据 formItem.props.filterType 设置时间禁用
      if (formItem.type === 'date' && formItem.props.filterType) {
        const filterType = formItem.props.filterType
        if (filterType === 'before') {
          data.pickerOptions = {
            disabledDate(time) {
              return time && time.valueOf() > Date.now()
            }
          }
        } else if (filterType === 'after') {
          data.pickerOptions = {
            disabledDate(time) {
              return time && time.valueOf() < new Date(new Date().toDateString()).valueOf()
            }
          }
        }
        data.valueFormat = formItem.props?.valueFormat ?? 'timestamp'
      }
      // 人员选择：根据 formItem.props.max 设置最多选人
      if (formItem.type === 'selectUser' && formItem.props.max != null) {
        const maxNum = Number(formItem.props.max)
        if (!Number.isNaN(maxNum) && maxNum > 0) {
          data.maxLength = maxNum
        }
      }
      // 地图类型赋值
      if (formItem.type === 'map') {
        if (formItem.props.mapType === 'point') {
          data.onlyPoint = true
        } else if (formItem.props.mapType === 'polygon') {
          data.onlyZone = true
        }
      }
      // 文件类型赋值
      if (formItem.type === 'file') {
        data.folder = formItem.props.folder
        data.maxLength = formItem.props.num
        const fileTypes = formItem.props.fileType || []
        data.accept = fileTypes.flatMap((e) => FILE_EXT_DATA[e] || []).join(',')
      }
      // 文件类型赋值
      if (formItem.type === 'systemData') {
        data.isSingle = formItem.props?.isSingle ?? true
      }
      data.rules = rules
      return data
    })
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
    const formProps = formItems.value.map((item) => item.prop)
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
    return formItems.value.map((item) => {
      return { ...item, prop: item.prop.replaceAll('.', '-|-') }
    })
  })

  watch(
    () => formItems.value,
    () => {
      const data = { ...params.value }
      formItems.value.forEach((formItem) => {
        if (params.value[formItem.prop] === undefined) {
          switch (formItem.type) {
            case 'checkbox':
            case 'selectUser':
            case 'file':
              data[formItem.prop] = []
              break
            case 'map':
              data[formItem.prop] = { address: '', lngLat: '' }
              break
            default:
              data[formItem.prop] = ''
          }
        }
      })
      emit('input', buildReturnValue(data))
    }
  )

  const validate = () => {
    return formBuilderItem.value.validate()
  }

  defineExpose({ validate })
</script>

<style lang="scss"></style>
