<template>
  <div class="items-center justify-center relative">
    <!-- 上传按钮 -->
    <el-upload
      :disabled="operateType === 3"
      :limit="1"
      accept="image/*"
      :auto-upload="false"
      :on-change="handleFileChange"
      :on-remove="handleFileRemove"
      :file-list="fileList"
      :show-file-list="true"
    >
      <el-button type="primary">选择图片</el-button>
    </el-upload>
    <vue-cropper
      ref="cropper"
      :img="option.img"
      :aspectRatio="16 / 9"
      :outputSize="0.8"
      :autoCrop="true"
      outputType="png"
      :autoCropWidth="350"
      :autoCropHeight="200"
      :canMove="true"
      :canMoveBox="true"
      :canScale="true"
      :fixed="true"
      :fixedBox="true"
      :fixedNumber="[16, 9]"
      :background="false"
      :enlarge="1"
      :mode="option.mode"
      :full="true"
      :centerBox="true"
      :original="false"
      class="cropper-container"
      @ready="handleCropperReady"
    ></vue-cropper>
    <!-- 详情页预览 -->
    <el-image
      v-if="operateType === 3 && option.img"
      class="img_container"
      :src="option.img"
      fit="cover"
    ></el-image>
  </div>
</template>

<script>
  import { VueCropper } from 'vue-cropper'
  import { Message } from 'element-ui'
  import service from 'src/service'

  export default {
    name: 'ImageCropper',
    components: { VueCropper },
    props: {
      fileId: { type: [String, Number], default: '' },
      viewFile: { type: Object, default: () => {} },
      operateType: { type: Number, default: 1 } // 1-新增 2-编辑 3-详情
    },
    data() {
      return {
        fileList: [],
        file: null,
        option: { img: '', outputType: 'png', mode: 'contain' }
      }
    },
    mounted() {
      if (this.viewFile) {
        this.destroyCropper()
        this.option.img = this.viewFile.fullPath
        this.file = this.viewFile
        this.fileList = [this.viewFile]
      } else {
        this.getFile()
      }
    },
    methods: {
      // 图片回显
      async getFile() {
        try {
          const res = await service.fssBiz.getFilesById(this.fileId)
          if (res?.fullPath) {
            this.destroyCropper()
            this.option.img = res.fullPath
            this.file = res
            this.fileList = [res]
          }
        } catch (error) {
          Message.error('文件加载失败')
        }
      },

      // 销毁裁剪实例
      destroyCropper() {
        if (this.$refs.cropper) {
          this.$refs.cropper.refresh()
        }
      },

      // 处理文件选择
      handleFileChange(uploadFile) {
        const file = uploadFile.raw
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
          Message.warning('文件大小不能超过5MB')
          this.handleFileRemove()
          return
        }
        this.destroyCropper()
        this.fileList = [uploadFile]
        this.file = file
        this.$emit('file-change', { isChanged: true, fileInfo: file })
        const reader = new FileReader()
        reader.onload = (e) => {
          this.$nextTick(() => {
            this.option.img = e.target.result
          })
        }
        reader.readAsDataURL(file)
      },

      // 处理文件移除
      handleFileRemove() {
        this.destroyCropper()
        this.fileList = []
        this.file = null
        this.option.img = ''
      },

      // 裁剪组件初始化完成（确保图片加载）
      handleCropperReady() {
        if (this.$refs.cropper) {
          this.$refs.cropper.refresh()
        }
      },

      // 裁剪图片
      async cropImage(targetStep) {
        if (this.fileList.length === 0) {
          Message.warning('请上传封面图片')
          this.$emit('getCropImage', false)
        } else {
          this.$nextTick(() => {
            this.$refs.cropper.getCropBlob((blob) => {
              const file = this.blobToFile(blob, this.file.name)
              this.$emit('getCropImage', file, targetStep)
            })
          })
        }
      },

      blobToFile(blob, fileName) {
        blob.lastModifiedDate = new Date()
        blob.name = fileName
        return new File([blob], fileName, {
          type: blob.type,
          lastModified: Date.now()
        })
      }
    },
    expose: ['cropImage']
  }
</script>

<style scoped>
  .cropper-container {
    width: 100%;
    max-width: 1018px;
    min-width: 300px;
    min-height: 169px;
    aspect-ratio: 16/9;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    margin-top: 10px;
  }
  .img_container {
    width: 100%;
    height: 100%;
  }
</style>
