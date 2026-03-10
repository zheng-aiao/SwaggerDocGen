import Vue, { nextTick } from 'vue'
import ImportExportProgress from './ImportExportProgress.vue'

let instance = null

/**
 * 进度条模态框
 * @param {Object} options
 * @param {String} options.title 标题
 * @param {String} options.content 内容
 * @param {String} options.cancelName 取消请求的名称
 * @param {Function} options.task 任务函数
 * @returns {Promise} 传入的任务执行结果
 * @example startProgressModel({ title: '导入项目', content: '导入深圳项目数据中...', cancelName: 'aggsBiz.exportProject', task: () => {} })
 */
function startProgressModel(options = {}) {
  if (instance) {
    return
  }
  return new Promise((resolve) => {
    const ProgressModel = Vue.extend(ImportExportProgress)
    instance = new ProgressModel({
      propsData: {
        resolve,
        destroyInstance() {
          document.body.removeChild(instance.$el)
          instance.$destroy()
          instance = null
        }
      }
    })
    instance.$mount()
    document.body.appendChild(instance.$el)
    nextTick(() => {
      instance.start(options)
    })
  })
}

export { startProgressModel }
