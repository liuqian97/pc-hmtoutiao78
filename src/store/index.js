// 封装sessionStorage函数,提供给其他模块使用
// 设置key的名字 以键值对的形式存储,存储的数据是字符串格式

const KEY = 'hm-tuotiao-78'

// 导出
export default {
  // 设置用户信息函数
  setUser (user) {
    // 存储user对象数据
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  // 获取用户信息函数
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  // 删除用户信息函数
  removeUser () {
    return window.sessionStorage.removeItem(KEY)
  }
}
