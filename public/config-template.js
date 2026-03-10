// config.js
// 配置
// eslint-disable-next-line no-unused-vars
window.globalSrmConfig = {
  title: '安全风险智能管控平台',
  singleSignConfig: {
    isOpenSingleSign: true, // 开发环境false，线上环境true
    client_id: '418772293305',
    client_secret: 'ed48c0cc-3fe7-4801-b1e8-4dced0536976',
    scope: 'openid profile picture company IdentityServerApi role',
    accessTokenExpiringNotificationTime: 100,
    localUserId: '298995250086',
    localUsername: 'xxr',
    tokenName: 'token',
    userId: 'user_id'
  },
  productId: '800000001000', // 产品ID
  // 首页模块项
  homeItem: [
    {
      title: '安全基础',
      link: '/safeManage',
      authCode: '500001',
      icon: '&#xe6d4;'
    },
    {
      title: '重大危险源',
      link: '/disaste',
      authCode: '500002',
      icon: '&#xe6e1;'
    },
    {
      title: '双重预防',
      link: '/preventDanger',
      authCode: '500003',
      icon: '&#xe6a7;'
    },
    {
      title: '特殊作业',
      link: '/operation',
      authCode: '500004',
      icon: '&#xe6e4;'
    },
    // {
    //   title: '作业巡检',
    //   link: '/specialWorkInspection',
    //   authCode: '800',
    //   icon: '&#xe731;'
    // },
    {
      title: '在线监测',
      link: '/monitor',
      authCode: '500005',
      icon: '&#xe6e7;'
    },
    {
      title: '承包商管理',
      link: '/contractor',
      authCode: '500006',
      icon: '&#xe6a3;'
    },
    {
      title: '智能巡检',
      link: '/inspection',
      authCode: '500007',
      icon: '&#xe6b8;'
    },
    {
      title: '培训考核',
      link: '/training',
      authCode: '500008',
      icon: '&#xe6df;'
    }
  ],
  bizServerDebug: {
    requestDebug: false,
    responseDebug: true,
    maxRequestTimeout: 60000,
    cache: {
      max: 20,
      maxAge: 60,
      open: true,
      cacheAllGetMethods: false
    }
  },
  videoUiConfig: {
    comparisonValue: 0.5,
    playUrlShowType: 0,
    player: {
      camera: {
        h264: 'webrtc',
        h265: 'flv',
        showPopupDialogBtn: false, // 是否显示打开监控外部弹窗
        showFavorite: false // 是否显示收藏
      },
      meeting: {
        h264: 'webrtc'
      },
      live: {
        h264: 'webrtc',
        showPushButton: false,
        showLiveIntercom: false
      },
      record: {
        h264: 'mpegts',
        h265: 'webdecoder',
        showCaptureBtn: false
      },
      debugMode: false
    },
    logLevel: 0,
    recordQueryOffsetHour: 1,
    cameraRecordPlatform: 3
  },
  dispatchConfig: {
    hubUrl: '/edms/ws/messagehub', // 调度服务地址
    smsInputMaxLength: 500, // 短信输入框最大长度
    invitationMenuList: ['组织架构', '预案组', '视频监控', '视频终端', '外部邀请'], //  邀请成员弹窗菜单列表
    useBizServiceCallback: false, // 是否使用业务库的回调(web-biz-service库)
    isUseVideoMonitorFavorite: false, // // 是否需要使用视频监控的收藏夹功能（4.0.0版本有bug）
    dialogDraggable: true, // 是否可拖拽
    // 主题色
    themeColor: {
      r: 8,
      g: 38,
      b: 129
    },
    maxZIndex: 2000 // 最大z-index
  }
  // tableBtn: {
  //   btnType: 'iconBtn', // 表格内按钮样式。iconBtn：仅图标；textBtn：仅文字；iconTextBtn：图标+文字
  //   iconPosition: 'left' // 按钮图标位置。left：图标在左；top：图标在上
  // }
}
