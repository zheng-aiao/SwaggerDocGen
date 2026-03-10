import Vue from 'vue'

// !!该Bus为了兼容旧代码, 不要使用此模块, 后面会逐渐的移除, 用hook代替该功能
const bus = new Vue()

export default bus
