import CryptoJS from 'crypto-js'
// 解密方法
export function Decrypt(content, key) {
  content = CryptoJS.AES.decrypt(content, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  content = content.toString(CryptoJS.enc.Utf8)
  return content.toString()
}

// 加密方法
export function Encrypt(content, key) {
  key = CryptoJS.enc.Utf8.parse(key)
  const iv = key
  var encryptContent = CryptoJS.AES.encrypt(content, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encryptContent.toString()
}

// md5
export function MD5(content) {
  return CryptoJS.MD5(content).toString(CryptoJS.enc.Hex)
}
