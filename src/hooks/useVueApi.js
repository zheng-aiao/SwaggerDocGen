import { getCurrentInstance } from 'vue'
import { useStore as usePiniaStore } from 'pinia'

export const useStore = () => {
  return usePiniaStore()
}

export const useRouter = () => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy.$router
}

export const useRoute = () => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy.$route
}

export const useAttrs = () => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy.$attrs
}

export const useSlots = () => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')
  return vm.proxy.$slots
}
