// utils/validateRules.js
export const VALIDATE_RULES = {
  /**
   * 不能为空校验
   * @param name 名称
   * @param _trigger 触发方式
   * @param type 数据类型（可选）：
   *   - string: 字符串类型（默认）
   *   - number: 数字类型
   *   - boolean: 布尔类型
   *   - method: 函数类型
   *   - regexp: 正则表达式
   *   - integer: 整数
   *   - float: 浮点数
   *   - array: 数组类型
   *   - object: 对象类型
   *   - enum: 枚举类型
   *   - date: 日期
   *   - url: URL链接
   *   - hex: 十六进制
   *   - email: 邮箱格式
   * @param message 自定义提示信息（可选）
   * */
  required: (name, _trigger, type, message) => {
    const rule = {
      required: true,
      message: message || `${name}不能为空`,
      trigger: _trigger || 'blur'
    }
    // 如果传入了 type，则添加到规则中
    if (type) {
      rule.type = type
    }
    return rule
  },
  /**
   * 字符长度校验
   * @param min 最小字符长度
   * @param max 最大字符长度
   * @param _trigger 触发方式
   * */
  minMaxLength: (min, max, _trigger) => {
    if (min !== max) {
      return { min, max, message: `长度在 ${min} 到 ${max} 个字符`, trigger: _trigger || 'blur' }
    } else {
      return { min, max, message: `长度应为 ${max} 个字符`, trigger: _trigger || 'blur' }
    }
  },
  /**
   * 字符长度校验
   * @param min 最小字符长度
   * @param _trigger 触发方式
   * */
  minLength: (min, _trigger) => {
    return { min, message: `至少 ${min} 个字符`, trigger: _trigger || 'blur' }
  },
  /**
   * 字符长度校验
   * @param max 最大字符长度
   * @param _trigger 触发方式
   * */
  maxLength: (max, _trigger) => {
    return { max, message: `最多 ${max} 个字符`, trigger: _trigger || 'blur' }
  },
  /**
   * 正整数字符串校验
   * */
  unsignedString: (options = { isEmpty: true }, _trigger) => {
    return { validator: validateUnsignedString(options), trigger: _trigger || ['blur', 'change'] }
  },
  /**
   * 整数字符串校验
   * */
  signedString: (options = { isEmpty: true }, _trigger) => {
    return { validator: validateSignedString(options), trigger: _trigger || ['blur', 'change'] }
  },
  /**
   * 浮点数字符串校验
   * */
  floatString: (options = { isEmpty: true }, _trigger) => {
    return { validator: validateFloatString(options), trigger: _trigger || ['blur', 'change'] }
  },
  /**
   * 手机号码校验
   * */
  mobilePhone: (options = { isEmpty: true }, _trigger) => {
    return {
      validator: validateMobilePhone(options),
      trigger: _trigger || ['blur', 'change']
    }
  },
  /**
   * 座机号码校验
   * */
  telPhone: (options = { isEmpty: true }, _trigger) => {
    return {
      validator: validateTelephone(options),
      trigger: _trigger || ['blur', 'change']
    }
  },
  /**
   * 手机/座机号码校验
   * */
  mobileOrTelPhone: (options = { isEmpty: true }, _trigger) => {
    return {
      validator: validateMobileOrTelephone(options),
      trigger: _trigger || ['blur', 'change']
    }
  },
  /**
   * 邮编校验
   * */
  postCode: (isEmpty = true, _trigger) => {
    return { validator: validatePostcode(isEmpty), trigger: _trigger || ['blur', 'change'] }
  },
  /**
   * 统一社会信用代码校验
   * */
  socialCreditCode: (isEmpty = true) => {
    return { validator: validateSocialCreditCodeReg(isEmpty), trigger: 'blur' }
  },
  /**
   * 数字校验：包含整数和小数
   * @param {number} integerDigit 整数位数（默认10位，必须大于0）
   * @param {number} decimalDigit 小数位数（默认0位，不支持负数）
   * */
  numberWithDecimal: (integerDigit, decimalDigit, _trigger) => {
    return {
      validator: numberWithDecimalReg(integerDigit, decimalDigit),
      trigger: _trigger || ['blur', 'change']
    }
  },
  /**
   * 密码校验：8~15位包含特殊字符+大小写字母+数字
   * */
  password: (options = { isEmpty: true }, _trigger) => {
    return {
      validator: passwordReg(options),
      trigger: _trigger || ['blur', 'change']
    }
  },
  /**
   * 人员证件号码校验（T开头+18位身份证号）
   * @param {Object} options 选项
   * @param {Object} options.isEmpty 是否允许为空
   * @param {Object} options.tip 校验提示
   */
  personnelCertificate: (options = { isEmpty: false }, _trigger) => {
    return {
      validator: validatePersonnelCertificate(options),
      trigger: _trigger || ['blur', 'change']
    }
  },
  /**
   * 身份证号码校验（18位通用身份证号）
   * @param {Object} options 选项
   * @param {Object} options.isEmpty 是否允许为空
   * @param {Object} options.tip 校验提示
   */
  idCard: (options = { isEmpty: false }, _trigger) => {
    return {
      validator: validateIdCard(options),
      trigger: _trigger || ['blur', 'change']
    }
  }
}

/**
 * @param {Object} options 选项
 * @param {Object} options.isEmpty 是否允许为空
 * @param {Object} options.tip 校验提示
 * @description 验证正整数字符串
 */
export function validateUnsignedString(options) {
  const { isEmpty, tip, max } = options ?? {}

  return (_, value, callback) => {
    if (isEmpty && (value === '' || value === undefined || value === null)) {
      callback()
      return
    }
    const numberReg = /^(0|[1-9]\d*)$/ // 不允许前导0
    if (!numberReg.test(value)) {
      callback(new Error(tip ?? '请输入正确的正整数'))
      return
    }
    if (max && value > max) {
      callback(new Error(tip ?? `输入值不能大于${max}`))
      return
    }
    callback()
  }
}

/**
 * @param {Object} options 选项
 * @param {Object} options.isEmpty 是否允许为空
 * @param {Object} options.tip 校验提示
 * @description 验证正负整数字符串
 */
export function validateSignedString(options) {
  const { isEmpty, tip } = options ?? {}

  return (_, value, callback) => {
    if (isEmpty && (value === '' || value === undefined || value === null)) {
      callback()
      return
    }
    const numberReg = /^-?\d+$/
    if (!numberReg.test(value)) {
      callback(new Error(tip ?? '请输入正确的整数'))
      return
    }
    callback()
  }
}

/**
 * @param {Object} options 选项
 * @param {Object} options.isEmpty 是否允许为空
 * @param {Object} options.tip 校验提示
 * @description 验证浮点数字符串
 */
export function validateFloatString(options) {
  const { isEmpty, tip } = options ?? {}

  return (_, value, callback) => {
    if (isEmpty && (value === '' || value === undefined || value === null)) {
      callback()
      return
    }
    const numberReg = /^-{0,1}\d+(.[\d]+){0,1}$/
    if (!numberReg.test(value)) {
      callback(new Error(tip ?? '请输入正确的数字'))
      return
    }
    callback()
  }
}

/**
 * @param {Object} options 选项
 * @param {Object} options.isEmpty 是否允许为空
 * @param {Object} options.tip 校验提示
 * @description 验证手机号
 */
export function validateMobilePhone(options) {
  const { isEmpty, tip } = options ?? {}

  return (_, value, callback) => {
    if (isEmpty && (value === '' || value === undefined || value === null)) {
      callback()
      return
    }
    const mobilePhoneReg = /^(1[3456789]\d{9})$/
    if (!mobilePhoneReg.test(value)) {
      callback(new Error(tip ?? '请输入正确的手机号码'))
      return
    }
    callback()
  }
}

/**
 * @param {Object} options 选项
 * @param {Object} options.isEmpty 是否允许为空
 * @param {Object} options.tip 校验提示
 * @description 验证座机号
 */
export function validateTelephone(options) {
  const { isEmpty, tip } = options ?? {}

  return (_, value, callback) => {
    if (isEmpty && (value === '' || value === undefined || value === null)) {
      callback()
      return
    }
    const telephoneReg = /(^(\d{4,6}))$|(^(\d{3,4}-)\d{7,8})$/
    if (!telephoneReg.test(value)) {
      callback(new Error(tip ?? '请输入正确的座机号码'))
      return
    }
    callback()
  }
}

/**
 * @param {Object} options 选项
 * @param {Object} options.isEmpty 是否允许为空
 * @param {Object} options.tip 校验提示
 * @description 验证手机号/座机号
 */
export function validateMobileOrTelephone(options) {
  const { isEmpty, tip } = options ?? {}

  return (_, value, callback) => {
    if (isEmpty && (value === '' || value === undefined || value === null)) {
      callback()
      return
    }
    const mobilePhoneReg = /^(1[3456789]\d{9})$/
    const telephoneReg = /(^(\d{4,6}))$|(^(\d{3,4}-)?\d{7,8})$/
    if (!mobilePhoneReg.test(value) && !telephoneReg.test(value)) {
      callback(new Error(tip ?? '请输入正确的手机号码或座机号码'))
      return
    }
    callback()
  }
}

/**
 * 邮政编码验证规则
 * @param {boolean} isEmpty - 是否允许为空
 * @description 验证中国邮政编码（6位数字，首位不为0）
 */
export function validatePostcode(isEmpty = false) {
  return (rule, value, callback) => {
    // 处理允许为空的情况
    if (isEmpty && !value) {
      return callback()
    }

    // 中国邮政编码正则（6位数字，首位不为0）
    const postcodeReg = /^[1-9]\d{5}$/

    if (!postcodeReg.test(value)) {
      callback(new Error('请输入有效的6位邮政编码'))
    } else {
      callback()
    }
  }
}

/**
 * 统一社会信用代码校验
 * 统一社会信用代码由18位数字或者大写字母组成，但是字母不包括 I、O、Z、S、V
 * 一共由五部分组成
 * 第一部分：登记管理部门代码1位 (数字或大写英文字母)
 * 第二部分：机构类别代码1位 (数字或大写英文字母)
 * 第三部分：登记管理机关行政区划码6位 (数字)
 * 第四部分：主体标识码（组织机构代码）9位 (数字或大写英文字母)
 * 第五部分：校验码1位 (数字或大写英文字母)
 *
 * 目前还有老的工商注册代码，也就是15位的社会信用代码
 * @param {boolean} isEmpty 是否允许为空
 * */
export function validateSocialCreditCodeReg(isEmpty) {
  return (rule, value, callback) => {
    // 处理允许为空的情况
    if (isEmpty && !value) {
      return callback()
    }
    const newCodeReg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
    const oldReg = /^[1-9]\d{14}$/
    if (!newCodeReg.test(value) && !oldReg.test(value)) {
      callback(new Error('请输入有效的社会信用代码'))
    } else {
      callback()
    }
  }
}

/**
 * 数字校验：包含整数和小数
 * @param {number} integerDigit 整数位数（默认10位）
 * @param {number} decimalDigit 小数位数（默认0位）
 */
export function numberWithDecimalReg(integerDigit = 10, decimalDigit = 0) {
  return (rule, value, callback) => {
    let reg = ''
    let decimalErrorMessage = ``
    if (decimalDigit === 0) {
      // 小数部分为0，纯整数校验
      reg = new RegExp(`^(0|[1-9]\\d{0,${integerDigit - 1}})$`)
    } else {
      reg = new RegExp(`^(0|[1-9]\\d{0,${integerDigit - 1}})(\\.\\d{1,${decimalDigit}})?$`)
      decimalErrorMessage = `,小数位不超过${decimalDigit}位`
    }
    if (!reg.test(value)) {
      callback(new Error(`只能是数值，且整数不超过${integerDigit}位${decimalErrorMessage}`))
    } else {
      callback()
    }
  }
}

/**
 * 经度校验
 * */
export function longitude(val, options) {
  const { tip } = options ?? {}
  const longReg =
    /^([-+])?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,12})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,12}|180)$/
  if (longReg.test(val)) {
    return true
  } else {
    return tip ?? '经度整数部分为-180~180,小数不超过12位!'
  }
}

/**
 * 纬度校验
 * */
export function latitude(val, options) {
  const { tip } = options ?? {}
  const latReg = /^([-+])?([0-8]?\d\.\d{0,12}|90\.0{0,12}|[0-8]?\d|90)$/
  if (latReg.test(val)) {
    return true
  } else {
    return tip ?? '纬度整数部分为-90~90,小数不超过12位!'
  }
}

/**
 * 密码校验：含特殊字符
 * 密码规则，特殊字符+数字+大写或小写字母，必须包含特殊字符：!@#$%&*，不能纯数子+特殊字符，有效的密码例如：Nucleus!,123@abcd,abc#efghi
 * */
export function passwordReg(options) {
  const { isEmpty, tip } = options ?? {}
  return (_, value, callback) => {
    if (isEmpty && (value === '' || value === undefined || value === null)) {
      callback()
      return
    }
    const postcode = /^(?=.*[a-zA-Z])(?=.*[!@#$%&*])[\da-zA-Z!@#$%&*]{8,15}$/
    if (!postcode.test(value)) {
      callback(new Error(tip ?? '密码：8~15位特殊字符（!@#$%&*）+数字+大写或小写字母'))
      return
    }
    callback()
  }
}

/**
 * 基础身份证号码校验
 * 规则：18位身份证，前17位为数字，第18位为数字或X/x
 * 校验码验证：前17位乘以权重求和，取余数，根据余数获取校验码
 * @param {string} idCardNumber 18位身份证号码
 * @param {Object} options 选项
 * @param {Object} options.isEmpty 是否允许为空
 * @param {Object} options.tip 校验提示
 * @param {Function} callback 校验回调
 */
function validateIdCardBase(idCardNumber, options, callback) {
  const { isEmpty, tip } = options ?? {}

  // 处理允许为空的情况
  if (isEmpty && (idCardNumber === '' || idCardNumber === undefined || idCardNumber === null)) {
    callback()
    return
  }

  // 验证是否为18位，且前17位为数字，第18位为数字或X/x
  if (!/^\d{17}([\dXx])$/.test(idCardNumber)) {
    callback(new Error(tip ?? '请输入正确的身份证号码!'))
    return
  }

  // 验证身份证号码的校验码
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 前17位权重
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验码对应表

  // 计算前17位的加权和
  let sum = 0
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idCardNumber[i]) * weights[i]
  }

  // 计算校验码
  const checkCodeIndex = sum % 11
  const expectedCheckCode = checkCodes[checkCodeIndex]
  const actualCheckCode = idCardNumber[17].toUpperCase()

  // 验证校验码
  if (actualCheckCode !== expectedCheckCode) {
    callback(new Error(tip ?? '请输入正确的身份证号码!'))
    return
  }

  // 所有验证通过
  callback()
}

/**
 * 人员证件号码校验（T开头+18位身份证号）
 * 规则：T + 18位身份证，前17位为数字，第18位为数字或X/x
 * 校验码验证：前17位乘以权重求和，取余数，根据余数获取校验码
 * @param {Object} options 选项
 * @param {Object} options.isEmpty 是否允许为空
 * @param {Object} options.tip 校验提示
 */
export function validatePersonnelCertificate(options) {
  const { isEmpty, tip } = options ?? {}

  return (_, value, callback) => {
    // 处理允许为空的情况
    if (isEmpty && (value === '' || value === undefined || value === null)) {
      callback()
      return
    }

    // 证件号码必须以T开头
    if (value[0] !== 'T') {
      callback(new Error(tip ?? '请输入正确的证件号码!'))
      return
    }

    // 提取身份证号码部分（后18位）并验证
    validateIdCardBase(value.substring(1), { isEmpty: false, tip }, callback)
  }
}

/**
 * 身份证号码校验（18位通用身份证号）
 * 规则：18位身份证，前17位为数字，第18位为数字或X/x
 * 校验码验证：前17位乘以权重求和，取余数，根据余数获取校验码
 * @param {Object} options 选项
 * @param {Object} options.isEmpty 是否允许为空
 * @param {Object} options.tip 校验提示
 */
export function validateIdCard(options) {
  return (_, value, callback) => {
    validateIdCardBase(value, options, callback)
  }
}
