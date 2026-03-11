<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    default: () => ({
      keyword: '',
      service: '',
      version: '',
      startTime: '',
      endTime: ''
    })
  }
})

const emit = defineEmits(['update:form', 'search', 'reset'])

const serviceOptions = [
  { label: '全部服务', value: '' },
  { label: 'srm基础服务', value: 'srm-core' },
  { label: 'srm认证服务', value: 'srm-auth' },
  { label: 'srm订单服务', value: 'srm-order' },
  { label: 'srm库存服务', value: 'srm-inventory' },
  { label: 'srm支付服务', value: 'srm-payment' }
]

const versionOptions = [
  { label: '全部版本', value: '' },
  { label: 'v2.4.0', value: 'v2.4.0' },
  { label: 'v2.3.x', value: 'v2.3' },
  { label: 'v2.2.x', value: 'v2.2' },
  { label: 'v2.1.x', value: 'v2.1' },
  { label: 'v2.0.x', value: 'v2.0' }
]

const handleSearch = () => {
  emit('search', props.form)
}

const handleReset = () => {
  emit('update:form', {
    keyword: '',
    service: '',
    version: '',
    startTime: '',
    endTime: ''
  })
  emit('reset')
}

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
</script>

<template>
  <div class="search-form-card">
    <div class="search-form">
      <div class="form-row">
        <div class="form-item keyword-item">
          <el-input
            :model-value="form.keyword"
            @update:model-value="$emit('update:form', { ...form, keyword: $event })"
            placeholder="请输入文档名称或关键词"
            clearable
            class="keyword-input"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <div class="form-item">
          <el-select
            :model-value="form.service"
            @update:model-value="$emit('update:form', { ...form, service: $event })"
            placeholder="所属服务"
            clearable
            class="select-input"
          >
            <el-option
              v-for="item in serviceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="form-item">
          <el-select
            :model-value="form.version"
            @update:model-value="$emit('update:form', { ...form, version: $event })"
            placeholder="版本号"
            clearable
            class="select-input"
          >
            <el-option
              v-for="item in versionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="form-row second-row">
        <div class="form-item date-item">
          <el-date-picker
            :model-value="[form.startTime, form.endTime]"
            @update:model-value="$emit('update:form', { 
              ...form, 
              startTime: $event?.[0] || '', 
              endTime: $event?.[1] || '' 
            })"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :shortcuts="shortcuts"
            class="date-picker"
          />
        </div>

        <div class="form-item actions">
          <el-button class="reset-btn" @click="handleReset">
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
          <el-button type="primary" class="search-btn" @click="handleSearch">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-form-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 24px 32px;
  margin-bottom: 24px;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  gap: 16px;
  align-items: center;

  &.second-row {
    justify-content: space-between;
  }
}

.form-item {
  &.keyword-item {
    flex: 1;
    max-width: 320px;
  }

  &.date-item {
    flex: 1;
    max-width: 480px;
  }

  &.actions {
    display: flex;
    gap: 8px;
  }
}

.keyword-input,
.select-input {
  width: 100%;

  :deep(.el-input__wrapper) {
    border-radius: 8px;
    box-shadow: 0 0 0 1px #E2E8F0 inset;

    &:hover {
      box-shadow: 0 0 0 1px #3B82F6 inset;
    }

    &.is-focus {
      box-shadow: 0 0 0 1px #3B82F6 inset;
    }
  }

  :deep(.el-input__inner) {
    font-size: 14px;
    color: #1F2937;

    &::placeholder {
      color: #9CA3AF;
    }
  }

  :deep(.el-input__prefix) {
    color: #9CA3AF;
  }
}

.date-picker {
  width: 100%;

  :deep(.el-input__wrapper) {
    border-radius: 8px;
    box-shadow: 0 0 0 1px #E2E8F0 inset;

    &:hover {
      box-shadow: 0 0 0 1px #3B82F6 inset;
    }

    &.is-focus {
      box-shadow: 0 0 0 1px #3B82F6 inset;
    }
  }
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background: #FFFFFF;
  color: #4B5563;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #3B82F6;
    color: #3B82F6;
    background: #F0F7FF;
  }
}

.search-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: #3B82F6;
  border: none;
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #2563EB;
  }
}
</style>
