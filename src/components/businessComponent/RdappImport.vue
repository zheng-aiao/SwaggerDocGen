<template>
  <RdappDialog
    content-class="uploadFileImport"
    v-bind="$attrs"
    title="上传数据"
    :loading="loading"
    @hide="hideModel"
    @confirm="confirm"
    v-on="$listeners"
  >
    <RdappFileUpload
      ref="fssUpload"
      accept=".xlsx"
      max-length="1"
      @onChangeFile="onChangeFile"
    ></RdappFileUpload>

    <div v-show="dutyFileInfo.failCount > 0 || dutyFileInfo.real_size > 0" class="fileErrorInfo">
      <div class="count">
        成功： <span class="real text-success">{{ dutyFileInfo.real_size }}</span>
      </div>
      <div class="count">
        失败： <span class="fail text-error">{{ dutyFileInfo.failCount }}</span>
      </div>
      <rdapp-button
        v-show="dutyFileInfo.failCount > 0"
        class="downloadError"
        second
        @click="downloadErrorFile"
      >
        下载提示文件
      </rdapp-button>
    </div>
  </RdappDialog>
</template>
<script setup>
  import service from 'src/service'
  import { ref, reactive, computed, onMounted } from 'vue'
  import { Message } from 'element-ui'
  import { apiDownLoad } from '@/utils/publicMethod'
  import { startProgressModel } from '@/biz/progressModel'
  import { URL_IMPORT } from 'src/enum/url.js'

  const emit = defineEmits(['triggerUpdate'])
  const props = defineProps({
    source: { type: String, required: true }
  })

  const loading = ref(false)
  const fssUpload = ref(null)
  const fileInfo = ref({})
  const dutyFileInfo = ref({})

  const onChangeFile = async (file) => {
    if (!file[0]) {
      fileInfo.value = {}
      dutyFileInfo.value = {}
      return
    }
    fileInfo.value = file
    loading.value = true

    const formData = new FormData()
    formData.append('file', file[0].raw)
    const data =
      await service[URL_IMPORT[props.source].service][URL_IMPORT[props.source].verifyFn](formData)
    dutyFileInfo.value = data
    loading.value = false
  }
  const downloadErrorFile = async () => {
    const object = {
      ext: dutyFileInfo.value.ext,
      folder: dutyFileInfo.value.folder,
      uuid: dutyFileInfo.value.uuid
    }
    const progressParams = {
      title: '提示文件',
      content: `正在下载提示文件中...`,
      cancelName: 'import',
      task: () =>
        service[URL_IMPORT[props.source].service][URL_IMPORT[props.source].errorFn](object, {
          responseType: 'blob'
        })
    }
    await startProgressModel(progressParams)
  }
  const hideModel = (val) => {
    if (val) {
      emit('triggerUpdate')
    }
    fileInfo.value = {}
    dutyFileInfo.value = {}
    emit('input', false)
  }
  const confirm = async () => {
    if (!Object.keys(fileInfo.value).length) {
      Message.warning('请先上传文件!')
      return
    }
    if (!dutyFileInfo.value.real_size) {
      Message.warning('没有正确的数据，请先根据错误文件修改数据后再试!')
      return
    }
    if (dutyFileInfo.value.failCount) {
      Message.warning('此次导入仅会导入正确数据!')
      // return
    }
    loading.value = true
    const params = {
      ext: dutyFileInfo.value.ext,
      folder: dutyFileInfo.value.folder,
      uuid: dutyFileInfo.value.uuid,
      clearData: false
    }
    const { hasError } =
      await service[URL_IMPORT[props.source].service][URL_IMPORT[props.source].importFn](params)
    loading.value = false
    if (hasError) {
      Message.error('导入失败!')
    } else {
      Message.success('导入成功!')
      hideModel(true)
    }
  }
</script>
<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .uploadFileImport {
    min-height: fit-content;

    .dialog-content {
      height: fit-content !important;
      min-height: fit-content !important;
    }
    .fileErrorInfo {
      @include flexCenter(flex-start);
      gap: pxToRem(4);
      position: relative;
      padding: 16px 0 0 0;
      .count {
        @include fontStyle(5);
        width: 100%;
        height: pxToRem(50);
        color: var(--textColor-1);
        font-weight: var(--fontWeight-2);
      }
    }
    .downloadError {
      float: right;
    }
    .text-success {
      color: rgb(var(--success));
    }
    .text-error {
      color: rgb(var(--error));
    }
  }
</style>
