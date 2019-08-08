import axios from 'axios'
import store from '@/store'
import JSONBIG from 'json-bigint'

// 基准路径配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 处理最大安全数值
axios.defaults.transformResponse = [(data) => {
  // data在删除接口返回的是null,用JSONBIG去转换null.会报错,所以需要判断一下
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
// 添加请求拦接器
axios.interceptors.request.use((config) => {
  // config是配置对象,在每一个请求前 获取token信息 并设置给请求头
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})
// 添加响应拦截器
axios.interceptors.response.use((res) => {
  return res
}, (err) => {
  if (err.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(err)
})

export default axios
