import { ElMessage } from 'element-plus'

export const Message = {
  warning: (msg) => ElMessage.warning(msg),
  success: (msg) => ElMessage.success(msg),
  error: (msg) => ElMessage.error(msg),
  createWarning: (msg) => ElMessage.warning(msg),
  createSuccess: (msg) => ElMessage.success(msg),
  createError: (msg) => ElMessage.error(msg)
}
