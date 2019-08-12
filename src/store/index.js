// 封装sessionStorage函数,提供给其他模块使用
// 设置key的名字 以键值对的形式存储,存储的数据是字符串格式

const KEY = 'hm-tuotiao-78'
const PSD = 'remember'

// 导出
export default {
  // 设置用户信息函数
  setUser (user) {
    // 存储user对象数据
    const localUser = this.getUser()
    const newUser = { ...localUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(newUser))
  },
  // 获取用户信息函数
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  // 删除用户信息函数
  removeUser () {
    return window.sessionStorage.removeItem(KEY)
  },

  setName (name) {
    console.log(name)
    window.localStorage.setItem(PSD, name)
  },
  getName () {
    return window.localStorage.getItem(PSD) || ''
  }

}
