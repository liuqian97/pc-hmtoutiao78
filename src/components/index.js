// 封装一个vue插件,目的是将components下的组件都注册为全局组件
import breadNav from '@/components/bread-nav'
import myChannel from '@/components/my-channel'
import myImage from '@/components/my-image'
import comA from '@/components/A'
import comB from '@/components/B'

export default {
  install (Vue) {
    Vue.component(breadNav.name, breadNav)
    Vue.component(myChannel.name, myChannel)
    Vue.component(myImage.name, myImage)
    Vue.component(comA.name, comA)
    Vue.component(comB.name, comB)
  }
}
