import axios from 'axios'
// import { Notification } from 'element-ui'
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'

const Axios = axios.create({
    // 线上地址
    baseURL: "http://39.106.98.246/api/v1",
    // 测试地址
    // baseURL: "/api",
    timeout: 5000
})

// Axios.interceptors.request.use(config => {
//   const store = window.$store.getState();
//   const accessToken = store.user.token;
//   config.headers.common["Authorization"] = "Bearer " + accessToken;
//   return config;
// })

// Axios.interceptors.response.use(
//   response => {
//     // if (response.config.responseType === "blob") {
//     //   return response.data;
//     // }
//     // if (response.status !== 200) {
//     //   //   message.error("请求失败，status=" + response.status);
//     //   return Promise.resolve(null);
//     // }
//     // if (response.data.code !== 0) {
//     //   return Promise.reject(response.data)
//     // }
//     // if (response.data.code === 0) {
//     //   return response.data
//     // } else {
//       // Notification.error({
//       //   title: response.data.message
//       // });
//       return Promise.reject(response)
//     // }
//   },
//   error => {
//     console.log(error.message)
//     // Notification.error({
//     //   title: error.message
//     // })
//     // return Promise.resolve(null);

//     if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
//       console.log('错误回调', error)
//       // Notification.error({
//       //   title: error.message,
//       //   body: '登陆失败'
//       // })
//       return Promise.reject(error) // reject这个错误信息
//     }
//     return Promise.reject(error)
//   }
// )
Axios.interceptors.response.use(
    response => {
      if (response.status === 200 || 201) {            
          return Promise.resolve(response);        
      } else {            
          return Promise.reject(response);        
      } 
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
        console.log('出错了', error.response)
      }
      return Promise.reject(error.response) // 返回接口返回的错误信息
    })
export default Axios