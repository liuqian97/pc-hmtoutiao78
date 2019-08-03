import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import '@/style/index.less'
import axios from 'axios'
Vue.prototype.$http = axios
Vue.use(ElementUI)

// 产品级别提示,选择不开始. 现在是开发级别提示,提示越详细越好
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
