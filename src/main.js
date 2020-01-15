import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import lodash from 'lodash'
import install from '@/utils/install.js'

import '@/icons' // icon
import '@/permission' // permission control

import ace from 'ace-builds'

Vue.use(ace)

Vue.use(ElementUI)
install(Vue, {
  name: 'lodash',
  plugin: lodash
})

Vue.config.productionTip = false

export default new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
