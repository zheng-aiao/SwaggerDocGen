<template>
  <div class="selectSystemData" :data-placeholder="!rows.length && '新增数据'" @click="selectData">
    <RdappTag
      v-for="(item, index) in rows"
      :key="item._rowId || index"
      :closable="!props.readonly"
      @close.stop="deleteData(item)"
    >
      {{ getTagLabel(item) }}
    </RdappTag>

    <RdappButton
      v-if="rows.length && !props.readonly"
      class="clear"
      type="close"
      icon-btn
      @click.stop="clearAll"
    ></RdappButton>

    <RdappDialog
      v-model="dialogShow"
      content-class="FormBuilderDialog"
      :title="props.title"
      tableDialog
      appendToBody
      :readonly="props.readonly"
      @hide="hideModel"
      @confirm="confirm"
    >
      <div class="search-bar">
        <div v-if="!props.readonly" class="btn-content">
          <RdappButton type="add" @click="addRow"></RdappButton>
        </div>
      </div>
      <div class="table-container">
        <el-form ref="formRef" :model="rows" label-position="top" class="custom-data-form">
          <el-table :data="rows" border class="rdappTable" style="width: 100%">
            <el-table-column
              v-for="item in props.tableColumns"
              :key="item.prop"
              :label="item.label"
              :min-width="item.minWidth || 130"
              :width="item.maxWidth || 130"
              class-name="row-item"
            >
              <template #default="{ row, $index }">
                <el-form-item :prop="`[${$index}].${item.prop}`" :rules="item.rules || []">
                  <template v-if="row._editing && !props.readonly">
                    <component
                      :is="getComponent(item.type)"
                      v-model="rows[$index][item.prop]"
                      v-bind="getComponentProps(item)"
                      :disabled="item.readonly || readonly"
                      :readonly="item.readonly || readonly"
                      v-on="item.events"
                      @change="() => handleFieldChange($index, item.prop)"
                    >
                    </component>
                  </template>
                  <template v-else>
                    <div v-if="item.type === 'selectDict'">
                      <RdappTableDictTag
                        :dictValue="formatDisplayValue(row[item.prop])"
                        :dictKey="item.dictKey"
                      ></RdappTableDictTag>
                    </div>
                    <div v-else-if="item.type === 'dateTime'">
                      {{
                        formatTime(
                          formatDisplayValue(row[item.prop]),
                          item.dateFormat || 'YYYY-MM-DD HH:mm:ss'
                        )
                      }}
                    </div>
                    <div v-else-if="item.type === 'date'">
                      {{
                        formatTime(
                          formatDisplayValue(row[item.prop]),
                          item.dateFormat || 'YYYY-MM-DD'
                        )
                      }}
                    </div>
                    <div v-else class="text">{{ formatDisplayValue(row[item.prop]) }}</div>
                  </template>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column v-if="!props.readonly" label="操作" class-name="row-item" :width="130">
              <template #default="{ row, $index }">
                <div class="operate-btn">
                  <RdappButton
                    :type="row._editing ? 'right' : 'edit'"
                    :tableBtn="true"
                    :label="row._editing ? '保存' : '修改'"
                    @click="toggleEditRow($index)"
                  ></RdappButton>
                  <RdappButton type="del" :tableBtn="true" @click="removeRow($index)">
                  </RdappButton>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </RdappDialog>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted, nextTick, computed } from 'vue'
  import {
    ComponentMap,
    DefaultProps,
    validateFile,
    validateMapPosition
  } from './RdappFormBuilder/formConfig.js'
  import RdappButton from '@/components/basicComponent/RdappButton.vue'
  import { Message } from 'element-ui'
  import { omit } from 'lodash-es'
  import { formatTime } from '@/utils/publicMethod'

  const props = defineProps({
    value: { type: Array, default: () => [] },
    readonly: { type: Boolean, default: false },
    title: { type: String, default: '选择数据' },
    tableColumns: { type: Array, default: () => [] },
    labelKey: { type: String, default: 'name' }
  })

  const emit = defineEmits(['input', 'customEvent'])

  const dialogShow = ref(false)
  const rows = ref([])
  const formRef = ref(null)
  let rowIdSeed = 0

  const buildInnerRows = (val) => {
    const source = Array.isArray(val) ? val : []
    rows.value = source.map((item) => ({
      ...item,
      _editing: false,
      _rowId: item._rowId || ++rowIdSeed
    }))
  }

  onMounted(() => {
    buildInnerRows(props.value || [])
  })

  watch(
    () => props.value,
    (val) => {
      buildInnerRows(val || [])
    },
    { deep: true }
  )

  // 表单标签
  const formatDisplayValue = (val) => {
    if (val === undefined || val === null || val === '') return '--'
    return val
  }

  const getTagLabel = (row) => {
    if (!props.tableColumns.length) return ''
    const key = props.labelKey || props.tableColumns[0].prop
    return formatDisplayValue(row[key])
  }

  const deleteData = (data) => {
    const index = rows.value.findIndex((row) => row._rowId === data._rowId)
    if (index !== -1) {
      rows.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    rows.value = []
    emit('input', [])
  }

  // 获取组件
  const getComponent = (type) => {
    if (!ComponentMap[type]) {
      console.warn(`未找到类型为${type}的组件，使用默认输入框`)
      return ComponentMap.text
    }
    return ComponentMap[type]
  }

  const getComponentProps = (item) => {
    // 合并默认属性与用户配置
    const baseProps = DefaultProps[item.type] || {}
    const userProps = omit(item, ['rules', 'events', 'viewConfig']) || {}

    // 过滤无用字段
    const filteredProps = omit({ ...baseProps, ...userProps })
    console.log('filteredProps', filteredProps)
    // 补充通用属性
    const res = {
      ...filteredProps,
      placeholder: filteredProps.placeholder || `请输入${item.label}`,
      readonly: filteredProps.readonly || props.readonly,
      maxlength: filteredProps.maxlength || filteredProps.maxLength || 255
    }
    return res
  }

  // 数据操作
  const addRow = async () => {
    if (props.readonly) return
    const isEditing = rows.value.some((row) => row._editing === true)
    if (isEditing) {
      Message.error('请先保存正在编辑的行')
      return
    }

    const newRow = {}
    props.tableColumns.forEach((col) => {
      newRow[col.prop] = col?.defaultValue || ''
    })

    rows.value.unshift({
      ...newRow,
      _editing: true,
      _rowId: ++rowIdSeed
    })
    nextTick(() => {
      formRef.value && formRef.value.clearValidate()
    })
  }

  const removeRow = (index) => {
    rows.value.splice(index, 1)
    nextTick(() => {
      formRef.value && formRef.value.clearValidate()
    })
  }

  // 数据校验
  const buildFieldPath = (rowIndex, prop) => `[${rowIndex}].${prop}`

  const handleFieldChange = (rowIndex, prop) => {
    if (formRef.value) {
      formRef.value.validateField(buildFieldPath(rowIndex, prop), () => {})
    }
  }

  const validateRow = (rowIndex) => {
    if (!formRef.value) return Promise.resolve(true)
    const fields = props.tableColumns
      .filter((col) => Array.isArray(col.rules) && col.rules.length)
      .map((col) => buildFieldPath(rowIndex, col.prop))

    if (!fields.length) return Promise.resolve(true)

    // element-ui: validateField(field, cb) 一次只可靠校验一个 field
    // 这里按行聚合校验结果，避免数组字段回调覆盖/短路导致误判
    return Promise.all(
      fields.map(
        (field) =>
          new Promise((resolve) => {
            formRef.value.validateField(field, (errorMessage) => resolve(!errorMessage))
          })
      )
    ).then((results) => results.every(Boolean))
  }

  const toggleEditRow = async (index) => {
    const row = rows.value[index]
    if (!row) return
    if (row._editing) {
      const valid = await validateRow(index)
      console.log('toggleEditRow valid', valid)
      if (valid) {
        row._editing = false
      } else {
        Message.warning('请修正表单错误后再保存')
      }
    } else {
      row._editing = true
    }
  }

  // 弹窗
  const selectData = () => {
    dialogShow.value = true
  }

  const hideModel = () => {
    dialogShow.value = false
  }

  const confirm = async () => {
    rows.value && rows.value.length > 0 && (await validateRow(0))
    const isEditing = rows.value.some((row) => row._editing === true)
    if (isEditing) {
      Message.error('请先保存正在编辑的行')
      return
    }
    emit('input', rows.value)
    emit('customEvent', rows.value)
    hideModel()
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/scss/rules' as *;
  * {
    @include lightTheme {
      :deep(.dialog-content) {
        background:
          linear-gradient(0deg, rgba(var(--color), 0.1) 0%, rgba(var(--color), 0.1) 100%), #fff;
      }
    }
  }
  .operate-btn {
    display: flex;
    gap: 10px;
  }

  .table-container {
    @include foregroundStyle;
    height: 100%;
    padding: 20px;

    :deep(.el-table) {
      border: none;
      height: 100%;
      .el-table__header-wrapper {
        .el-table__header {
          width: 100% !important;
        }
      }

      .el-table__body-wrapper {
        .el-table__body {
          width: 100% !important;

          .el-table__cell {
            padding: 0;
            border-right: none;
            .el-form-item {
              margin-bottom: 0;
              .el-form-item__content {
                margin: pxToRem(18) 0;
              }
            }

            &:last-child {
              .iconfont {
                @include iconfontButton;
              }
            }

            .text {
              @include fontStyle(5);
              width: 100%;
              float: left;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }

            .copy-icon {
              position: absolute;
              right: 0;
              top: pxToRem(3);
              color: colorValue(color, 1);
            }
          }
        }
      }
    }
  }
</style>
