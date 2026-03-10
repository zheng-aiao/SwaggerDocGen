import { upperFirst, camelCase } from 'lodash-es'

const componentModules = import.meta.glob(['./**/Rdapp*.vue', './**/Rdapp*.js'], { eager: true })

function initComponents(app) {
  for (const filePath in componentModules) {
    const componentConfig = componentModules[filePath]
    
    const fileName = filePath
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')
    
    const componentName = upperFirst(camelCase(fileName))
    
    if (componentConfig.default) {
      app.component(componentName, componentConfig.default)
    }
  }
}

export { initComponents }
