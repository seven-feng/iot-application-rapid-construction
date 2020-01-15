// 引入全局loading
import { Loading } from 'element-ui'

let pageLoadingInstance

export default {
  on() {
    pageLoadingInstance = Loading.service({
      lock: true,
      text: '拼命加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
    })
  },
  off() {
    pageLoadingInstance && pageLoadingInstance.close()
  }
}
