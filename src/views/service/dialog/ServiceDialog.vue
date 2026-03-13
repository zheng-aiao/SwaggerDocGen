<template>
  <RdappDialog
    v-model="visible"
    :title="dialogTitle"
    width="520px"
    :show-footer="mode !== 'view'"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-position="top"
      class="service-form"
    >
      <el-form-item label="服务名称" prop="name">
        <el-input
          v-model="formData.name"
          :placeholder="getPlaceholder('请输入服务名称')"
          maxlength="50"
          :disabled="isNameReadonly"
          class="form-input"
        />
      </el-form-item>

      <el-form-item label="所属分类" prop="category">
        <RdappSelect
          v-model="formData.category"
          :options="categoryOptions"
          :placeholder="getPlaceholder('请选择所属分类')"
          :disabled="isViewMode"
          class="form-select"
        />
      </el-form-item>

      <el-form-item label="服务描述" prop="description">
        <RdappTextarea
          v-model="formData.description"
          :placeholder="getPlaceholder('请输入服务描述')"
          :rows="5"
          :maxlength="200"
          :show-word-limit="!isViewMode"
          :readonly="isViewMode"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button class="cancel-btn" @click="handleCancel">
          {{ cancelText }}
        </el-button>
        <el-button class="confirm-btn" type="primary" @click="handleConfirm">
          {{ confirmText }}
        </el-button>
      </div>
    </template>
  </RdappDialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import RdappDialog from '@/components/basicComponent/RdappDialog.vue'
import RdappSelect from '@/components/basicComponent/RdappSelect.vue'
import RdappTextarea from '@/components/basicComponent/RdappTextarea.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit', 'view'].includes(value)
  },
  categoryList: {
    type: Array,
    default: () => []
  },
  serviceData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

const formRef = ref(null)

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isCreateMode = computed(() => props.mode === 'create')
const isEditMode = computed(() => props.mode === 'edit')
const isViewMode = computed(() => props.mode === 'view')

const isNameReadonly = computed(() => !isCreateMode.value)

const dialogTitle = computed(() => {
  switch (props.mode) {
    case 'create':
      return '新增服务'
    case 'edit':
      return '编辑服务'
    case 'view':
      return '服务详情'
    default:
      return '服务'
  }
})

const confirmText = computed(() => {
  return isCreateMode.value ? '创建' : '保存'
})

const cancelText = computed(() => {
  return isViewMode.value ? '关闭' : '取消'
})

const formData = ref({
  name: '',
  category: '',
  description: ''
})

const formRules = computed(() => {
  if (isViewMode.value) {
    return {}
  }
  return {
    name: [
      { required: true, message: '请输入服务名称', trigger: 'blur' },
      { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
    ],
    category: [
      { required: !isViewMode.value, message: '请选择所属分类', trigger: 'change' }
    ],
    description: [
      { max: 200, message: '描述不能超过200个字符', trigger: 'blur' }
    ]
  }
})

const categoryOptions = computed(() => {
  return props.categoryList.map(item => ({
    label: item.name,
    value: item.id
  }))
})

const resetForm = () => {
  formData.value = {
    name: '',
    category: '',
    description: ''
  }
  formRef.value?.resetFields()
}

const initFormData = () => {
  if (props.serviceData && Object.keys(props.serviceData).length > 0) {
    formData.value = {
      name: props.serviceData.name || '',
      category: props.serviceData.category || '',
      description: props.serviceData.description || ''
    }
  } else {
    resetForm()
  }
}

const getPlaceholder = (defaultPlaceholder) => {
  return isViewMode.value ? '-' : defaultPlaceholder
}

const handleClose = () => {
  resetForm()
}

const handleCancel = () => {
  visible.value = false
  emit('cancel')
}

const handleConfirm = async () => {
  if (!formRef.value || isViewMode.value) {
    visible.value = false
    return
  }
  
  try {
    await formRef.value.validate()
    emit('submit', { 
      ...formData.value,
      mode: props.mode
    })
    visible.value = false
    resetForm()
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

watch(visible, (newVal) => {
  if (newVal) {
    initFormData()
  } else {
    resetForm()
  }
})

watch(() => props.serviceData, () => {
  if (visible.value) {
    initFormData()
  }
}, { deep: true })
</script>

<style scoped lang="scss">
.service-form {
  :deep(.el-form-item) {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(.el-form-item__label) {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    padding-bottom: 8px;
    line-height: 1;
  }

  .form-input {
    :deep(.el-input__wrapper) {
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      box-shadow: none;
      padding: 0 16px;
      height: 40px;
      transition: all 0.2s;

      &:hover {
        border-color: #cbd5e1;
      }

      &.is-focus {
        border-color: #0f78f0;
        box-shadow: 0 0 0 2px rgba(15, 120, 240, 0.1);
      }

      .el-input__inner {
        font-size: 14px;
        color: #1f2937;

        &::placeholder {
          color: #9ca3af;
        }
      }
    }
  }

  .form-select {
    width: 100%;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 8px;

  .cancel-btn {
    min-width: 88px;
    height: 40px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    background: #f1f5f9;
    border: none;
    color: #64748b;

    &:hover {
      background: #e2e8f0;
      color: #475569;
    }
  }

  .confirm-btn {
    min-width: 88px;
    height: 40px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    background: #0f78f0;
    border: none;

    &:hover {
      background: #0d6ad9;
    }
  }
}
</style>
