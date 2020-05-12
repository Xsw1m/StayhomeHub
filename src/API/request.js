import axios from 'axios'

import router from '../router.js'
// import qs from 'qs'

/* 请求拦截器 */
const Axios = axios.create({
  timeout: 5000 // 请求超时时间
})
// creatr()在原有的对象上创建新的对象，包含原有的属性以及数据
// const  声明一个无法更改的常量
const service = axios.create({
  // baseURL: process.env.BASE_URL,  // api的base_url
  timeout: 5000 // 请求超时时间
})

service.interceptors.request.use(function (config) { // 每次请求时会从localStorage中获取token
  // let token = Storage.localGet('token')
  const token = localStorage.getItem('authorization_token')

  if (token) {
    // token = "Bearer "+ token.replace(/'|"/g, '') // 把token加入到默认请求参数中 ？？？
    // token = "Bearer "+ token // 把token加入到默认请求参数中
    // console.log(token)
    config.headers.common.authorization_token = token // ？？？
  } else {
    router.replace({
      path: '/login' // 到登录页重新获取token
    })
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

/* 响应拦截器 */

// service.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
// if (response.data.code === 1000 || response.data.code === 1001) {
//     localStorage.removeItem('authorization_token') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
//     router.replace({
//         path: '/login' // 到登录页重新获取token
//     })
// } else if (response.data.result.user_session) { // 判断token是否存在，如果存在说明需要更新token
//     // Storage.localSet('token', response.data.token) // 覆盖原来的token(默认一天刷新一次)
//     localStorage.removeItem('authorization_token')
//     localStorage.setItem("authorization_token",response.data.result.user_session)
// }
//     return response
// }, function (error) {
//     return Promise.reject(error)
// })
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.removeItem('token')
          router.replace({
            path: '/login' // 到登录页重新获取token
          })
      }
      console.log(error.response)
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  })

export default service
