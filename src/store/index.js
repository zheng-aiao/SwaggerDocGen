import { useDocumentStore, useConfigStore } from '@/stores'

export function useStore() {
  return {
    state: {
      get document() {
        const store = useDocumentStore()
        return {
          categories: store.categories,
          services: store.services,
          currentCategory: store.currentCategory,
          searchKeyword: store.searchKeyword
        }
      },
      get config() {
        const store = useConfigStore()
        return {
          tableBtn: store.tableBtn,
          theme: store.theme,
          themeColor: store.themeColor
        }
      }
    },
    dispatch: () => {},
    commit: () => {},
    getters: {}
  }
}

export default {
  useStore
}
