// 引入全局loading
import { Loading } from 'element-ui'
// 页面加载中开始
export function pageLoadingOn() {
  this.pageLoadingInstance = Loading.service({
    lock: true,
    text: '拼命加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.8)'
  })
}
// 页面加载中关闭
export function pageLoadingOff() {
  this.pageLoadingInstance && this.pageLoadingInstance.close()
}
