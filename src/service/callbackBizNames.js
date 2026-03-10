const callbackBizNames = {
  // 事件中心
  eventBiz: {
    /** 消息通知 */
    bizSrmNoticeType: 'Srm-ResourceChanged-Notice',
    /** 角色信息变更 */
    role: 'Role',
    roleDistrictArea: 'RoleDistrictArea',
    district: 'District',
    contactRole: 'ContactRole'
  },
  mmtBiz: {
    bizMultimediaTransfer: 'MultimediaTransfer'
  },
  msgBiz: {
    /** 短信状态变更 */
    MessageStateChanged: 'MessageStateChanged',
    UploadMessageChanged: 'UploadMessageChanged'
  }
}

export default callbackBizNames
