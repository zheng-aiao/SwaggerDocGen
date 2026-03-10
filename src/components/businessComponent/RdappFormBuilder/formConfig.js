import RdappInput from 'src/components/basicComponent/RdappInput.vue'
import RdappInputNumber from 'src/components/basicComponent/RdappInputNumber.vue'
import RdappMap from 'src/components/basicComponent/RdappMap.vue'
import RdappTime from 'src/components/basicComponent/RdappTime.vue'
import RdappDateTimePicker from 'src/components/basicComponent/RdappDateTimePicker.vue'
import RdappOptionGroup from 'src/components/basicComponent/RdappOptionGroup.vue'
import RdappUserSelect from 'src/components/businessComponent/RdappUserSelect.vue'
import RdappListSelect from 'src/components/businessComponent/RdappListSelect.vue'
import RdappTreeSelect from 'src/components/businessComponent/RdappTreeSelect/RdappTreeSelect.vue'
import RdappFileUpload from 'src/components/businessComponent/RdappFileUpload.vue'
import RdappSystemData from 'src/components/businessComponent/RdappSystemData.vue'
import RdappServiceData from '@/components/businessComponent/RdappServiceData.vue'
import RdappTableCustomData from '@/components/businessComponent/RdappTableCustomData.vue'
import { Autocomplete } from 'element-ui'

// 组件映射表：type → 对应的组件
export const ComponentMap = {
  text: RdappInput,
  textarea: RdappInput,
  number: RdappInput,
  inputNumber: RdappInputNumber,
  map: RdappMap,
  selectDict: RdappListSelect,
  selectArea: RdappTreeSelect,
  selectOrgs: RdappTreeSelect,
  selectResource: RdappTreeSelect,
  time: RdappTime,
  date: RdappDateTimePicker,
  datetime: RdappDateTimePicker,
  daterange: RdappDateTimePicker,
  datetimerange: RdappDateTimePicker,
  selectUser: RdappUserSelect,
  radio: RdappOptionGroup,
  checkbox: RdappOptionGroup,
  file: RdappFileUpload,
  systemData: RdappSystemData,
  serviceData: RdappServiceData,
  customData: RdappTableCustomData,
  autocomplete: Autocomplete
}

export const DefaultProps = {
  text: { type: 'text', clearable: true },
  textarea: { type: 'textarea', showWordLimit: true, clearable: true },
  number: { type: 'number', clearable: true },
  inputNumber: { controlsPosition: 'right', min: 0, max: 100000000 },
  selectArea: { district: true },
  selectOrgs: { orgs: true },
  selectResource: { dict: true },
  date: {
    type: 'date',
    valueFormat: 'yyyy-MM-dd',
    format: 'yyyy-MM-dd',
    disabledDate: (date) => date && date.valueOf() > Date.now()
  },
  datetime: {
    type: 'datetime',
    valueFormat: 'yyyy-MM-dd HH:mm',
    format: 'yyyy-MM-dd HH:mm',
    disabledDate: (date) => date && date.valueOf() > Date.now()
  },
  daterange: {
    type: 'daterange',
    valueFormat: 'yyyy-MM-dd',
    format: 'yyyy-MM-dd'
  },
  datetimerange: {
    type: 'datetimerange',
    valueFormat: 'yyyy-MM-dd HH:mm',
    format: 'yyyy-MM-dd HH:mm'
  },
  time: { valueFormat: 'HH:mm:ss', format: 'HH:mm:ss' },
  radio: { inline: true },
  checkbox: { type: 'checkbox', inline: true },
  map: { placeholder: '点击图标打开地图进行定位' },
  file: { multiple: false } // 默认单文件上传
}

// 地图类型校验
export const validateMapPosition = (item, currentRules, formData) => {
  if (!item.prop) return currentRules

  const baseMapRules = [
    {
      validator: (_, value, callback) => {
        // 非必填项处理
        if (!item.rules?.some((s) => s.required)) {
          callback()
        }

        // 校验地址文本
        if (!value) {
          return callback(new Error(`请输入${item.label}地址`))
        }

        // 校验经纬度和区域编码
        if (!formData[item.prop].lngLat || !formData[item.prop].lngLat.length) {
          return callback(new Error(`${item.label}经纬度不能为空，请选择点击图标，补全经纬度信息`))
        }

        // 校验通过
        callback()
      },
      trigger: ['blur'] // 增加mapChange触发时机
    }
  ]

  // 合并现有规则
  const existingRules = currentRules[item.prop] ?? []
  const mapRules = [...existingRules, ...baseMapRules]

  return { ...currentRules, [item.prop]: mapRules }
}

// 文件类型校验
export const validateFile = (item, currentRules, fileInstance, formInstance) => {
  if (!item.prop || !item.rules?.length) return currentRules

  const fileRules = item.rules.map((rule) => {
    if (!rule.required) return rule
    item.events = { ...item.event, onChangeFile: () => formInstance.validateField(item.prop) }
    const validator = (_, __, callback) => {
      const instance = fileInstance?.get(item.prop) ?? null
      if (!instance?.uploadRef.uploadFiles?.length) {
        return callback(new Error(rule.message || `请上传${item.label}`))
      }
      callback()
    }
    return { ...rule, validator }
  })

  return { ...currentRules, [item.prop]: fileRules }
}
