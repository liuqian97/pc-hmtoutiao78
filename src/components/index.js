// 封装一个vue插件,目的是将components下的组件都注册为全局组件
import breadNav from '@/components/bread-nav'
import myChannel from '@/components/my-channel'

export default {
  install (Vue) {
    Vue.component(breadNav.name, breadNav)
    Vue.component(myChannel.name, myChannel)
  }
}
