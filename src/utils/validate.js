export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0 || true
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 固话*/
export function validateTelephone(str) {
  const reg = /^0\d{2,3}-?[1-9]\d{7,8}$/
  return reg.test(str)
}

/* 手机*/
export function validateMobile(str) {
  const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
  return reg.test(str)
}

/* 邮箱*/
export function validateEmail(email) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(email)
}
/* 中文(不含双字节字符)、数字、中横线、下横线、斜线 */
export function validateChinese(str) {
  const reg = /^[\u4e00-\u9fa50-9/_-]+$/
  return reg.test(str)
}
/* 英文、数字、中横线、下横线、斜线 */
export function validateEnglish(str) {
  const reg = /^[A-Za-z0-9/_-]+$/
  return reg.test(str)
}
/* 中文(不含双字节字符)、英文、数字、中横线、下横线、斜线 */
export function validateDefault(str) {
  const reg = /^[\u4e00-\u9fa5A-Za-z0-9/_-]+$/
  return reg.test(str)
}

export function validatePositiveInt(str) {
  const reg = /^[1-9]\d*$/
  return reg.test(str)
}

export function validateNumber(str) {
  const reg = /^(-?[1-9]\d*\.\d*|-0\.\d*[1-9]\d*)|(-?[1-9]\d*|0)$/
  return reg.test(str)
}

export function validateVersion(str) {
  const reg = /^[Vv]([1-9]\d|\d)(\.([1-9]\d|\d)){2}$/
  return reg.test(str)
}

export function validateMobileFunc(rule, value, callback) {
  if (value) {
    if (!validateMobile(value)) {
      callback(new Error('请输入正确的手机号码'))
    } else {
      callback()
    }
  }
  callback()
}
export function validateEmailFunc(rule, value, callback) {
  if (value) {
    if (!validateEmail(value)) {
      callback(new Error('请输入正确的邮箱地址'))
    } else {
      callback()
    }
  }
  callback()
}
export function validateChineseFunc(rule, value, callback) {
  if (value) {
    if (!validateChinese(value)) {
      callback(new Error('只能包含中文字符，数字及/-_'))
    } else {
      callback()
    }
  }
}
export function validateEnglishFunc(rule, value, callback) {
  if (value) {
    if (!validateEnglish(value)) {
      callback(new Error('只能包含英文字符，数字及/-_'))
    } else {
      callback()
    }
  }
}
export function validatePositiveIntFunc(rule, value, callback) {
  if (value) {
    if (!validatePositiveInt(value)) {
      callback(new Error('只能包含正整数'))
    } else {
      callback()
    }
  }
  callback()
}
export function validateNumberFunc(rule, value, callback) {
  if (value) {
    if (!validateNumber(value)) {
      callback(new Error('请输入正确的数字'))
    } else {
      callback()
    }
  }
  callback()
}

export function validateVersionFunc(rule, value, callback) {
  if (value) {
    if (!validateVersion(value)) {
      callback(new Error('请输入正确的版本号(V/v*.*.*)'))
    } else {
      callback()
    }
  }
  callback()
}

export function validateDefaultFunc(rule, value, callback) {
  if (value) {
    if (!validateDefault(String(value))) {
      callback(new Error('只能包含中文字符，英文字符，数字及/-_址'))
    } else {
      callback()
    }
  }
  callback()
}
