<!-- 基于FSS服务的文件上传, 如果需要上传到其它服务器, 请使用el-upload -->
<template>
  <div :class="['RdappFileUploadContainer', displayMode]" @dragover.prevent @drop.prevent>
    <el-upload
      v-bind="$attrs"
      ref="uploadRef"
      :disabled="props.disabled"
      :accept="newAccept"
      :auto-upload="false"
      :class="uploadClassNames"
      action="#"
      :drag="!isImagesUpload"
      :file-list="newFileList"
      :limit="props.maxLength || $attrs.limit || 5"
      :http-request="httpRequest"
      :on-success="onSuccess"
      :on-error="onError"
      :on-exceed="onExceed"
      :on-preview="onPreview"
      :on-change="onChange"
      :on-remove="(file) => removeFile(file)"
      multiple
      v-on="$listeners"
      @submit="submit"
    >
      <template #default>
        <i
          v-if="isImagesUpload"
          :class="['el-icon-plus', { showUploadIcon: uploadFiles.length < maxLength && !disabled }]"
        ></i>
        <div
          v-if="!isImagesUpload && uploadFiles.length < maxLength && !disabled"
          class="upload-info"
        >
          <rdapp-button second class="upload-btn">
            <em class="iconfont">&#xe82c;</em>
            <span class="tip">上传文件</span>
          </rdapp-button>
          <div class="upload-description">
            <span class="title">点击或者拖拽上传</span>
            <span v-if="props.accept" class="accept"
              >格式支持: {{ props.accept.replace(/\./g, '').replace(/, /g, '/') }}</span
            >
          </div>
        </div>
        <!-- 查看时没有图片的情况 -->
        <div v-if="disabled && !uploadFiles.length" class="empty-info">
          <el-empty :image="emptyImg" description="暂无文件" />
        </div>
      </template>
      <template v-if="!isImagesUpload" #file="{ file }">
        <div class="file-item" @click="onPreview(file)">
          <div class="left">
            <div class="name" :title="file.name">{{ file.name }}</div>
            <em v-if="file.status === 'success'" class="iconfont biz-success">&#xe830;</em>
            <em v-if="file.status === 'fail'" class="iconfont biz-error">&#xe831;</em>
            <template v-if="file.status === 'uploading'">
              <img
                class="loading-icon"
                src="@/assets/img/common/upload-file-loading-icon.png"
                alt="loading"
              />
              <span class="percentage">{{ file.percentage }}%</span>
            </template>
          </div>
          <em
            v-if="!props.disabled"
            class="iconfont biz-error delete"
            @click.stop="deleteButtonClick(file)"
            >&#xe822;</em
          >
        </div>
      </template>
    </el-upload>
    <RdappDialog
      v-model="isPreview"
      title="预览文件"
      content-class="RdappFileUploadPreview"
      not-footer
    >
      <RdappFilePreview :file-list="previewList"></RdappFilePreview>
    </RdappDialog>
  </div>
</template>

<script setup>
  import { ref, computed, onUnmounted, onMounted, getCurrentInstance, nextTick, watch } from 'vue'
  import { useStore, useAttrs } from '@/hooks'
  import { v4 as uuidV4 } from 'uuid'
  import * as tus from 'tus-js-client'
  // service 依赖在当前项目中未使用，移除避免扫描错误
  import { Message } from 'element-ui'
  import emptyImg from '@/assets/img/common/img-error.png'
  import { fileExtensionToMimeTypeMap } from '@/enum/constant.js'
  import { appConfig } from '@/config'

  const props = defineProps({
    prop: { type: String, required: true },
    value: { type: [Array, String], default: null }, // 兼容V2的v-model绑定
    // fileList: { type: Array, default: () => [] },
    directoryId: { type: [String, Object], default: null },
    storageType: { type: Number, default: 2 }, // 存储类型
    fileType: { type: String, default: '' },
    maxLength: { type: Number, default: 5 },
    accept: { type: String, default: '.jpg, .png' },
    disabled: { type: Boolean, default: false },
    displayMode: {
      type: String,
      default: 'box', // 默认盒子样式
      validator: (value) => ['box', 'list'].includes(value)
    },
    maxSize: { type: Number, default: appConfig.value.fileUpload?.maxFileSize ?? 1024 * 1024 * 28 }, // FSS服务默认不超过28M
    immediateRemove: { type: Boolean, default: false }, // 是否立即删除(反之在组件销毁时 | 手动调用删除)
    folder: { type: String, required: true } // 上传目录
  })
  const emit = defineEmits(['onChange', 'register-instance'])
  const { proxy } = getCurrentInstance()

  const store = useStore()
  const attrs = useAttrs()

  onMounted(() => {
    emit('register-instance', 'files', proxy)
    nextTick(() => additionDropAreas(uploadRef.value))
    getFileInfo()
  })

  const isImagesUpload = computed(() => attrs['list-type'] === 'picture-card') // 是否为图片上传
  const uploadClassNames = computed(() => {
    return isImagesUpload.value
      ? ['RdappImagesUpload']
      : [
          'RdappFileUpload',
          { uploadFiles: uploadFiles.value.length },
          { 'is-disabled': props.disabled }
        ]
  })
  const newAccept = computed(() => {
    const accept = props.accept.split(', ')
    return [
      ...accept.map((ext) => ext.toLocaleLowerCase()),
      ...accept.map((ext) => ext.toLocaleUpperCase())
    ].join(', ')
  })

  watch(
    () => props.value,
    () => {
      getFileInfo()
    }
  )

  const getFileInfo = async () => {
    if (!props.value) {
      newFileList.value = []
      return
    }
    let ids = props.value
    if (!Array.isArray(props.value)) {
      ids = props.value.split(',')
    }
    const { hasError, records } = await service.fssBiz.batchSearchFiles({
      ids: ids
    })
    if (hasError) {
      Message.error('获取文件信息失败')
      return
    }
    newFileList.value = records.map((item) => ({ ...item, status: 'success', url: item.fullPath }))
  }
  const newFileList = ref([])
  // 优先提交时指定的目录id, 其次props, 当存在文件列表时，获取第一个文件的目录id
  const currentDirectoryId = computed(() => {
    return submitDirectoryId.value || props.directoryId
  })

  const storageTypeMap = new Map([
    [0, 'Public'],
    [1, 'Private'],
    [2, 'Group']
  ])

  const submitDirectoryId = ref()
  const uploadRef = ref()
  const isPreview = ref(false)
  const previewList = ref([])
  let uploadPromises = [] // 上传列表

  let fileCounter = 0
  const uploadFiles = computed(() => uploadRef.value?.uploadFiles ?? [])

  onUnmounted(() => {
    clearUselessFile()
  })

  const clearUselessFile = () => {
    // 清除无意义文件
    Promise.all(temporaryFiles.map((item) => service.fssBiz.deleteFiles(item.fileId)))
  }

  let todoDeleteList = [] // 待删除列表
  const removeFile = (file) => {
    const { fileId } = file
    if (fileId) {
      if (props.immediateRemove) {
        service.fssBiz.deleteFiles(fileId)
      } else {
        todoDeleteList.push({ ...file, fileId })
      }
    }
    onChange()
  }

  const deleteButtonClick = (file) => {
    uploadRef.value.handleRemove(file, file.raw)
  }

  let workingDirectoryId = '' // 上传中的目录ID
  let uploadFileQueue = [] // 收集所有需要上传的文件

  const httpRequest = (options) => {
    uploadFileQueue.push(options)
  }

  const startTusUpload = (options) => {
    const promise = new Promise((resolve, reject) => {
      let fileId = ''
      options.file.status = 'uploading'
      const metadata = {
        name: options.file.name,
        contentType: options.file.type || 'application/octet-stream',
        directoryId: currentDirectoryId.value || workingDirectoryId || uuidV4(),
        storageType: storageTypeMap.get(props.storageType)
      }

      if (props.fileType) {
        metadata.extension = JSON.stringify({ type: props.fileType })
      }
      const upload = new tus.Upload(options.file, {
        endpoint: `/fssfiles/`,
        chunkSize: 10485760,
        parallelUploads: 1,
        retryDelays: [0, 1000, 3000, 5000],
        metadata,
        headers: { Authorization: `Bearer ${store.state.token}` },
        onError(err) {
          reject(err)
          options.onError(err, options.file)
        },
        onProgress(bytesSent, bytesTotal) {
          options.onProgress(Math.floor((bytesSent / bytesTotal) * 100), options.file)
        },
        onSuccess() {
          resolve({ fileId, ...options.file })
          options.onSuccess(fileId, options.file)
        },
        onBeforeRequest(request) {
          const { _method, _url } = request
          if (_method === 'PATCH') {
            fileId = _url.split('/').at(-1)
          }
        },
        async onAfterResponse(_, res) {
          // 当没有指定目录ID & 首次上传时, 保存上传成功的第一个文件的目录ID, 后续文件都使用这个ID
          if (!workingDirectoryId && fileId && !currentDirectoryId.value) {
            const fileDesc = await service.fssBiz.getFilesById(fileId)
            workingDirectoryId = fileDesc.directoryInfo?.id
          }
          return res
        }
      })
      upload.start()
    })
    uploadPromises.push(promise)
    return promise
  }

  const onExceed = () => {
    Message.warning(`上传文件数量不能超过${props.maxLength}个!`)
  }

  let temporaryFiles = []
  const onPreview = async (file) => {
    if (file.status === 'uploading') return
    // 如果文件已上传直接预览
    if (file.fullPath) {
      previewList.value = [{ ...file, link: file.fullPath }]
      isPreview.value = true
      return
    }
    if (file.fileId) {
      const fileDesc = await service.fssBiz.getFilesById(file.fileId)
      previewList.value = [{ ...fileDesc, link: fileDesc.fullPath }]
      isPreview.value = true
      return
    }
    Message.info('文件正在上传中，请稍候...')

    // 创建上传选项
    const uploadOptions = {
      file: file.raw || file.file || file,
      onProgress: (percent) => {
        file.percentage = percent
        file.status = 'uploading'
      },
      onSuccess: (result) => {
        file.status = 'success'
        file.response = result.fileId // 保存上传后的文件ID
        return result
      },
      onError: (err) => {
        file.status = 'fail'
        file.response = err
        throw err
      }
    }
    // 执行上传
    const { fileId } = await startTusUpload(uploadOptions)

    // 获取上传后的文件详情
    const uploadedFile = await service.fssBiz.getFilesById(fileId)
    const updatedFile = { ...file, ...uploadedFile, response: fileId }

    replaceUploadFile(file.uid, updatedFile)
    previewList.value = [uploadedFile]
    isPreview.value = true
    temporaryFiles.push(updatedFile)
  }

  const replaceUploadFile = (uid, fssFile) => {
    // 替换文件列表中的对应文件
    const files = uploadRef.value.uploadFiles
    const index = files.findIndex((f) => f.uid === uid)
    if (index !== -1) {
      files.splice(index, 1, { ...files[index], ...fssFile })
    }
  }

  const onSuccess = () => {
    fileCounter += 1
    checkAllUploaded()
  }

  const onError = () => {
    fileCounter += 1
    checkAllUploaded()
  }

  let totalToUpload = 0 // 记录总共需要上传的文件数量
  const checkAllUploaded = async () => {
    if (fileCounter !== totalToUpload) {
      return
    }
    try {
      const successList = await Promise.all(uploadPromises)
      const fileTasks = successList.map((item) => service.fssBiz.getFilesById(item.fileId))
      const records = await Promise.all(fileTasks)

      records.forEach((item, index) => replaceUploadFile(successList[index].uid, item))

      submitResolve({ hasError: false })
    } catch (err) {
      submitResolve({ hasError: true })
    } finally {
      uploadPromises = []
      fileCounter = 0
    }
  }

  const startUploadFile = async () => {
    uploadRef.value.submit() // 收集上传的文件
    if (!uploadFileQueue?.length) {
      checkAllUploaded() // 如果没有文件, 则直接检查是否上传完成
      return
    }
    totalToUpload = uploadFiles.value.filter((item) => item.raw && !item.response).length

    const [firstFile, ...restFiles] = uploadFileQueue ?? []
    await startTusUpload(firstFile)
    await Promise.all(restFiles.map((file) => startTusUpload(file)))
    uploadFileQueue = [] // 清空队列
    fileCounter = 0 // 重置计数器
  }

  let submitResolve = null
  /**
   * 1. 没有上传过文件, 目录ID使用上传成功后的第一个文件
   * 2. 有上传过文件, 目录ID使用已经有的目录id
   */
  const submit = (id = props.folder) => {
    submitDirectoryId.value = id
    uploadPromises = [] // 清空上传列表
    temporaryFiles = [] // 提交时预览的文件不要删除
    Promise.all(todoDeleteList.map((item) => service.fssBiz.deleteFiles(item.fileId))) // 提交时清楚点击删除按钮的文件
    const fssList = uploadFiles.value.filter((item) => item.id || item.status === 'success') // 已经上传的要返回(如果是fss对象代表已上传)
    const newFilesCount = uploadFiles.value.length - fssList.length // 需要上传的文件数量(新增加的)
    if (newFilesCount === 0) {
      // 没有上传新文件
      let directoryId = fssList.at(0)?.directoryInfo?.id ?? workingDirectoryId // 默认给第一个已上传文件的目录ID, 没有则为undefine
      if (!uploadFiles.value.length) directoryId = '' // 没有文件时
      if (props.directoryId) directoryId = props.directoryId // 指定了目录ID
      if (id) directoryId = id // 指定了目录ID
      return new Promise((resolve) => resolve({ records: fssList, directoryId: directoryId ?? '' }))
    }
    return new Promise((resolve) => {
      submitResolve = (res) => {
        // const directoryId = props.directoryId ?? id ?? ''
        resolve({ ...res, records: uploadFiles.value })
      }
      startUploadFile()
    })
  }

  const onChange = (file, fileList) => {
    let validate = true
    // 验证类型有内容时，才验证
    const typeList = props.accept.split(',').map((item) => item.trim().replace('.', ''))
    if (props.accept && typeList.length && file?.raw) {
      const fileType = typeList.map((type) => fileExtensionToMimeTypeMap[type]).filter((i) => i)
      if (!fileType.includes(file.raw.type)) {
        Message.warning(
          `只能上传${props.accept.replace(/\./g, '').replace(/, /g, '/')}类型的文件！`
        )
        validate = false
      }
    }

    // 检查文件大小
    if (file?.raw && file.size > props.maxSize) {
      Message.closeAll()
      Message.warning(`文件 "${file.name}" 大小超过限制(${formatFileSize(props.maxSize)})`)
      validate = false
    }

    if (!validate) {
      // 移除不符合要求的文件
      const index = fileList.findIndex((f) => f.uid === file.uid)
      if (index !== -1) {
        uploadRef.value.uploadFiles = fileList.toSpliced(index, 1)
      }
    }
    // 实时返回数据
    emit('onChangeFile', uploadFiles.value)
  }

  const formatFileSize = (size) => {
    if (size < 1024) {
      return `${size} B`
    }
    if (size < Math.pow(1024, 2)) {
      return `${(size / 1024).toFixed(2)} KB`
    }
    if (size < Math.pow(1024, 3)) {
      return `${(size / Math.pow(1024, 2)).toFixed(2)} MB`
    }
    return `${(size / Math.pow(1024, 3)).toFixed(2)} GB`
  }

  // 让列表的区域也可以拖拽上传文件
  const additionDropAreas = (component) => {
    function findDrag(component) {
      if (!component) return null
      if (component.$options?.name === 'ElUploadDrag') {
        return component
      }
      if (Array.isArray(component.$children) && component.$children.length) {
        for (const child of component.$children) {
          const result = findDrag(child)
          if (result) return result // 找到后立即返回，终止递归
        }
      }
      return null
    }
    const result = findDrag(component)
    const el = component.$el?.querySelector('.el-upload-list')
    if (!el || !result) return
    el.addEventListener('drop', (e) => {
      e.preventDefault()
      result.onDrop(e)
    })
    el.addEventListener('dragover', (e) => {
      e.preventDefault()
      result.onDragover()
    })
    el.addEventListener('dragleave', (e) => {
      e.preventDefault()
      result.dragover = false
    })
  }

  defineExpose({
    uploadRef,
    uploadFiles,
    submit,
    clearUselessFile,
    startTusUpload
  })
</script>

<style lang="scss">
  @use '@/assets/scss/rules' as *;

  .RdappFileUploadContainer {
    @include wh;

    // 多文件上传样式
    .RdappFileUpload {
      @include wh(100%);
      @include baseTransition;
      border-radius: pxToRem(8);
      border: pxToRem(1) solid colorValue(color, 0.3);
      background-color: colorValue(color, 0.1);
      line-height: 1;

      &:has(.is-dragover) {
        border-color: colorValue(color, 1);
        background-color: colorValue(color, 0.3);
      }

      &.is-disabled {
        cursor: not-allowed;
        border-color: colorValue(color, 0.1);
        background-color: colorValue(color, 0.1);
      }

      .el-upload {
        @include wh;

        .el-upload-dragger {
          @include wh;
          border-radius: pxToRem(8);
          border-color: transparent;
          background-color: transparent;
        }

        .upload-info {
          @include wh;
          @include fontStyle(5);
          gap: pxToRem(16);
          color: var(--textColor-1);
          padding: pxToRem(16);

          .upload-btn .el-button {
            @include whrem(38);

            .tip {
              display: none;
            }
          }

          .upload-description {
            @include flexCenter(center, center, true);
            margin-top: pxToRem(16);
            gap: pxToRem(16);

            .accept {
              color: var(--textColor-2);
            }
          }
        }

        .empty-info {
          .el-empty__image {
            width: pxToRem(60);
          }
        }
      }

      .el-upload-list {
        padding: 0;
        .el-upload-list__item {
          margin-top: 0;
          cursor: pointer;

          &:hover {
            background-color: transparent;

            .name {
              color: colorValue(color, 1);
            }
          }
        }
        .file-item {
          @include flexCenter(space-between);

          .left {
            @include flexCenter(flex-start, center);
            width: calc(100% - #{pxToRem(80)});
          }

          .name {
            @include fontStyle(5);
            @include baseTransition;
            @include textHidden(1);
            color: var(--textColor-1);
            margin-right: pxToRem(16);
            font-size: pxToRem(16);
          }
          .iconfont {
            @include fontStyle(1);
            color: rgba(var(--color), 1);

            &.delete {
              margin-left: auto;
              @include iconfontButton(error);
            }
          }

          .loading-icon {
            display: block;
            animation: loading-rotate 1s linear infinite; /* 关键：使用 animation 并设置 infinite */
            margin-right: pxToRem(8);
          }

          @keyframes loading-rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
      }

      &.uploadFiles {
        .upload-info {
          @include flexCenter(center, flex-start, true);
          .upload-btn .el-button {
            width: fit-content;
            .tip {
              display: block;
            }
          }
          .upload-description {
            display: none;
          }
        }

        .el-upload-list {
          padding: 0 pxToRem(16) pxToRem(16) pxToRem(16);
        }
      }
    }

    // 仅为图片上传
    .RdappImagesUpload {
      @include wh(100%);
      line-height: 1;
      display: flex;
      justify-content: start;
      flex: 1 0 0;
      align-self: stretch;

      .el-upload--picture-card {
        display: none;
      }
      &:has(.showUploadIcon) {
        .el-upload--picture-card {
          display: block;
        }
      }

      .el-upload-list--picture-card {
        &.is-disabled {
          + .el-upload--picture-card {
            border-radius: 0;
            border: none;
            background: transparent;

            .el-empty {
              padding: 0;
            }
            .el-icon-plus {
              display: none;
            }

            .el-empty__description {
              display: none;
            }
          }
        }
      }

      .el-upload-list__item,
      .el-upload--picture-card {
        width: pxToRem(137);
        height: pxToRem(127);
        line-height: pxToRem(127);
        border: none;
      }

      .el-upload--picture-card {
        border-radius: pxToRem(8);
        border: pxToRem(1) solid rgba(var(--color), 0.2);
        background: rgba(var(--color), 0.2);
      }

      .el-icon-upload-success.el-icon-check {
        position: absolute;
        top: pxToRem(11);
        margin: 0;
        left: pxToRem(13);
      }
    }

    // 列表展示
    &.list {
      .RdappFileUpload {
        border: none;
        background-color: transparent;

        .el-upload {
          pointer-events: none; // 禁用点击, 需手动控制点击事件

          .upload-btn {
            display: none;
          }

          .upload-description {
            margin-top: 0;
            .title {
              display: none;
            }
          }
        }

        .el-upload-list {
          .file-item {
            .name {
              color: colorValue(color, 1);
            }
          }
        }

        &.uploadFiles {
          .el-upload {
            display: none;
          }
        }
      }
    }
  }

  .RdappFileUploadPreview {
    @include whrem(1600, 940);
  }
</style>
