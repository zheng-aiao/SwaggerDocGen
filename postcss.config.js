export default {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        '> 1%'
      ]
    },
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: ['el-', 'van-', 'no-rem-']
    }
  }
}
