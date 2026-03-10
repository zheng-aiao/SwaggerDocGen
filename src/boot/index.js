import { init as initApplication } from './application'
import { init as initAuth } from './auth'
import { init as initPrefetch } from './prefetch'
import { useTheme } from '@/hooks'
import oneClickDispatch from './oneClickDispatch'
import srmEvent from './srmEvent'
import iframeMessage from './iframeMessage'
async function init(config) {
  await initApplication(config)

  await useTheme().init(config)

  await initAuth(config)

  await oneClickDispatch.init(config)

  srmEvent.init()

  iframeMessage.isIframe && iframeMessage.init(config)

  initPrefetch(config)
}

export { init }
