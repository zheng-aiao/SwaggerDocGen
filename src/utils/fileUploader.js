import * as tus from 'tus-js-client'
import { v4 as uuidV4 } from 'uuid'
import service from '@/service'
import store from '@/store'

class FileUploader {
  constructor(options) {
    this.directoryId = null // id
    this.storageType = 2 // 公共云存储
    this.token = options?.token || ''
  }

  /**
   * 上传文件到FSS服务（支持分片上传）
   * @param {Object} options 配置项
   * @param {string} [options.directoryId] 指定目录ID（优先级最高）
   * @param {Array} options.fileList 文件列表（格式：[{ file: File对象, status?: string, progress?: number }]）
   * @param {number} [options.storageType=2] 存储类型（0:公共, 1:私有, 2:群组）
   * @param {string} [options.fileType] 文件类型标识（用于扩展元数据）
   * @returns {Promise<{ hasError: boolean, records?: Array, error?: any, directoryId?: string }>}
   */
  async uploadFileToFss(options) {
    const { directoryId: folderId, fileList = [], storageType = 2, fileType } = options ?? {}
    if (!fileList.length) {
      return { hasError: true, records: [], directoryId: folderId || '' }
    }

    // 存储类型映射
    const storageTypeMap = {
      0: 'Public',
      1: 'Private',
      2: 'Group'
    }

    // 已存在的文件（无需重复上传）
    const existingFiles = fileList.filter((item) => item.id)
    // 需要上传的新文件
    const newFiles = fileList.filter((item) => !item.id)

    // 确定目录ID（优先级：传入(指定目录) > 已经上传过文件的目录ID > 自动生成）
    const directoryId = folderId || existingFiles.at(0)?.directoryInfo.id || uuidV4()

    // 上传任务队列
    const uploadPromises = []
    const uploadedFileIds = [] // 按顺序存储上传成功的文件ID

    for (const [index, item] of newFiles.entries()) {
      const promise = new Promise((resolve, reject) => {
        // 初始化上传状态
        item.status = 'uploading'
        item.progress = 0

        const metadata = {
          name: item.name,
          contentType: item.type || 'application/octet-stream',
          directoryId,
          storageType: storageTypeMap[storageType]
        }

        if (fileType) {
          metadata.extension = JSON.stringify({ type: fileType })
        }
        const upload = new tus.Upload(item.raw || item.file || item, {
          endpoint: '/fssfiles/',
          chunkSize: 10485760, // 10MB分片
          parallelUploads: 1,
          retryDelays: [0, 1000, 3000, 5000],
          metadata,
          headers: { Authorization: `Bearer ${store.state.token}` },
          onError: (error) => {
            item.status = 'failed'
            reject(error)
          },
          onProgress: (bytesSent, bytesTotal) => {
            item.progress = Math.floor((bytesSent / bytesTotal) * 100)
            // 实时更新UI（如果需要在外部监听进度）
            if (options.onProgress) {
              options.onProgress(index, item.progress)
            }
          },
          onSuccess: () => {
            item.status = 'success'
            resolve()
          },
          onBeforeRequest: (request) => {
            const { _method, _url } = request
            if (_method === 'PATCH') {
              const fileId = _url.split('/').at(-1)
              uploadedFileIds[index] = fileId // 按原始顺序记录文件ID
            }
          }
        })

        upload.start()
      })

      uploadPromises.push(promise)
    }

    try {
      // 等待所有上传完成
      await Promise.all(uploadPromises)

      // 获取上传成功的文件详情
      const fileDetails = await Promise.all(
        uploadedFileIds.map((id) => service.fssBiz.getFilesById(id))
      )

      // 合并结果（已存在文件 + 新上传文件）
      const records = [
        ...existingFiles,
        ...fileDetails.map((detail, index) => ({
          ...newFiles[index],
          ...detail,
          status: 'success'
        }))
      ]

      return {
        hasError: false,
        records,
        directoryId: records.at(0)?.directoryInfo.id || directoryId // 使用上传成功后的某一个文件的目录ID
      }
    } catch (error) {
      log.error('Upload failed :>> ', error)
      return { hasError: true }
    }
  }

  getStorageType(storageKind) {
    // storageKind 公共云存储 参数
    const map = new Map([
      [0, 'Public'],
      [1, 'Private'],
      [2, 'Group']
    ])
    return map.get(storageKind)
  }

  async getFiles(directoryId, storageKind) {
    // 获取文件信息
    const { records, hasError } = await service.aggsBiz.getFiles({
      directoryId: directoryId,
      storageKind: storageKind || this.getStorageType(this.storageType),
      page: 1,
      per_page: 100
    })
    if (hasError) {
      log.error('Get files error :>> ', hasError)
      return null
    }
    return records // 返回 records
  }

  // 通过id删除文件
  async fileDel(fileId) {
    const { hasError } = await service.fssBiz.deleteFiles(fileId)
    return !hasError
  }

  // 删除目录
  async fileDirectoryDel(directoryId) {
    const { hasError } = await service.fssBiz.deleteDirectories(directoryId)
    return !hasError
  }
}

export default new FileUploader()
