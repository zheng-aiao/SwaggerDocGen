<template>
  <RdappDialog
    v-model="visible"
    v-bind="$attrs"
    content-class="audit-confirm"
    :title="props.title"
    @input="close"
    @confirm="confirm"
  >
    <el-form ref="formRef" :model="params" :rules="rules" label-position="top">
      <el-form-item v-if="isShowAudit" :label="auditTitle" prop="audit" required>
        <RdappOptionGroup
          v-model="params.audit"
          :disabled="readonly"
          :options="auditOptions"
          inline
        ></RdappOptionGroup>
      </el-form-item>
      <el-form-item v-if="isShowContent" :label="contentTitle" prop="content" required>
        <RdappInput
          v-model="params.content"
          type="textarea"
          :show-word-limit="true"
          :maxlength="maxlength"
          :disabled="readonly"
        ></RdappInput>
      </el-form-item>
    </el-form>
  </RdappDialog>
</template>

<script setup>
  import { ref, nextTick, reactive } from 'vue'
  import { VALIDATE_RULES } from 'src/utils/validateRules.js'

  const props = defineProps({
    value: {
      type: Object,
      default: () => {}
    },
    readonly: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '审核'
    },

    isShowAudit: {
      type: Boolean,
      default: true
    },
    auditTitle: {
      type: String,
      default: '审核结果'
    },
    auditOptions: {
      type: Array,
      default: () => [
        { label: '通过', value: true },
        { label: '驳回', value: false }
      ]
    },

    isShowContent: {
      type: Boolean,
      default: true
    },
    contentTitle: {
      type: String,
      default: '审核意见'
    },
    maxlength: {
      type: Number,
      default: 200
    }
  })
  const emit = defineEmits(['handleConfirm', 'handleClose'])

  const visible = ref(false)
  const formRef = ref(null)
  const params = ref({})
  const rules = reactive({
    content: [VALIDATE_RULES.required(props.contentTitle)]
  })

  nextTick(() => {
    visible.value = true
    if (props.value) params.value = { ...props.value }
  })

  const close = () => {
    visible.value = false
    const timer = setTimeout(() => {
      emit('handleClose')
      clearTimeout(timer)
    }, 320)
  }
  const confirm = () => {
    formRef.value.validate((valid) => {
      if (valid) {
        visible.value = false

        const timer = setTimeout(() => {
          emit('handleConfirm', params.value)
          clearTimeout(timer)
        }, 320)
      }
    })
  }
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .audit-confirm {
    min-height: fit-content;
    .dialog-content {
      height: fit-content !important;
      min-height: fit-content !important;
    }
  }
</style>
