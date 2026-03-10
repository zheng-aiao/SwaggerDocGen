import PubSub from 'pubsub-js'
import store from '../store'
import callbackBizNames from '../service/callbackBizNames'
import { Message } from 'element-ui'

/** 事件模块, 处理相关的业务逻辑 */
class SrmEvent {
  init() {
    this.watchEventCallback()
  }

  // 监听事件的回调
  watchEventCallback() {
    const { eventBiz } = callbackBizNames
    // key: 回调名称, value: 执行函数
    const effectMap = new Map([
      [eventBiz.bizSrmNoticeType, 'noticeMutation'],
      [eventBiz.role, 'userAreaDataMutation'],
      [eventBiz.roleDistrictArea, 'userAreaDataMutation'],
      [eventBiz.district, 'userAreaDataMutation'],
      [eventBiz.contactRole, 'userAreaDataMutation']
    ])
    Object.values(eventBiz).forEach((watchName) => {
      PubSub.subscribe(watchName, (msg, data) => {
        console.log('>>>>>>>>>>>>>>pubsub.subscribe ~ data -- eventBiz -', msg, data)
        const { BizName } = data ?? {}
        if (effectMap.get(BizName)) {
          this[effectMap.get(BizName)](BizName, data)
        }
      })
    })
  }

  noticeMutation(BizName, data) {
    // todo 刷新未读消息数量
  }

  userAreaDataMutation(BizName, data) {
    const { eventBiz } = callbackBizNames
    // 过滤非自己的用户角色变更通知
    if (BizName === eventBiz.contactRole && data.Id !== store.getters.getCurrentUser.id) {
      return
    }
    // todo 弹窗提示刷新
    Message.warning('用户角色权限变更！！！')
  }
}

export default new SrmEvent()
