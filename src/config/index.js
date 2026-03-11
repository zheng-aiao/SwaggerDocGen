const appConfig = {
  value: null
}

const appRoutesConfig = {
  value: []
}

function initConfig() {
  return new Promise((resolve) => {
    appConfig.value = {
      title: 'SwaggerDocGen',
      superAdmin: true
    }
    resolve({ ...appConfig.value })
  })
}

function initRoutesConfig() {
  return new Promise((resolve) => {
    appRoutesConfig.value = []
    resolve([])
  })
}

export { initConfig, initRoutesConfig, appConfig, appRoutesConfig }
