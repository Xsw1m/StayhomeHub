import VueRouter from 'vue-router'

// 导入对应的登录路由组件
// import homePage from './views/homePage.vue'
import fristPage from './views/fristPage.vue'
import login from './components/login.vue'
import register from './components/register.vue'
import retrievePassword from './views/retrievePassword.vue'
import getMesscode from './components/getMesscode.vue'
import resetpassword from './components/resetPassword.vue'
import passwordSuccess from './components/passwordSuccess.vue'
import personalCenter from './views/personalCenter.vue'
import upVideoOne from './components/upVideoOne.vue'
import upVideoTwo from './components/upVideoTwo.vue'
import haiUserRegister from './components/haiUserRegister.vue'
import playRecord from './components/playRecord.vue'
import myCollection from './components/myCollection.vue'
import myDown from './components/myDown.vue'
import videoAdmin from './components/videoAdmin.vue'
import newsMid from './components/newsMid.vue'
import personalSetting from './components/personalSetting.vue'
import userAgreement from './components/userAgreement.vue'
import video from './views/video.vue'
import retrieveMobile from './components/retrieveMobile.vue'
import myPlase from './components/myPlase.vue'
import othersPlase from './components/othersPlase.vue'

import homepage from './homepage.vue'
import videolist from './children/videolist.vue'
import process from './children/process.vue'
import ecocivilization from './children/ecocivilization/ecocivilization.vue'
import selected from './children/selected.vue'
import time_axis from './children/time_axis.vue'
import search from './children/search.vue'
import sharevideo from './views/sharevideo.vue'

import Vue from 'vue'
import { Message } from 'element-ui'
Vue.prototype.$message = Message

// 创建路由对象
var router = new VueRouter({
  // base:'/HaierVideo',
  // mode: 'history',
  routes: [ // 配置路由规则
    { path: '/', redirect: '/fristPage' },
    {
      path: '/fristPage',
      component: fristPage,
      children: [
        { path: '/', component: login },
        { path: '/login', component: login },
        { path: '/register', component: register },
        { path: '/haiUserRegister', component: haiUserRegister },
        {
          path: '/retrievePassword',
          component: retrievePassword,
          children: [
            { path: '/', component: getMesscode },
            { path: '/resetpassword', component: resetpassword, name: 'resetpassword' },
            { path: '/passwordSuccess', component: passwordSuccess }
          ]
        },
        { path: '/retrieveMobile', component: retrieveMobile }
      ]
    },
    { path: '/userAgreement', component: userAgreement },

    // {path:'/homePage',component:homePage},
    {
      path: '/homepage',
      component: homepage,
      children: [
        { path: '/homepage', redirect: '/selected' },
        {
          path: '/personalCenter',
          component: personalCenter,
          children: [
            { path: '/', component: playRecord },
            { path: '/playRecord', component: playRecord },
            { path: '/myDown', component: myDown },
            { path: '/myCollection', component: myCollection },
            { path: '/upVideoOne', component: upVideoOne },
            { path: '/upVideoTwo', component: upVideoTwo },
            { path: '/videoAdmin', component: videoAdmin },
            { path: '/newsMid', component: newsMid },
            { path: '/personalSetting', component: personalSetting },
            { path: '/myPlase', component: myPlase },
            { path: '/othersPlase', component: othersPlase }
          ]
        },
        { path: '/selected', name: 'selected', component: selected },
        { path: '/propaganda', name: 'propaganda', component: videolist },
        { path: '/time_axis', name: 'time_axis', component: time_axis, meta: { keepAlive: true } },
        { path: '/ecocivilization', name: 'ecocivilization', component: ecocivilization, meta: { keepAlive: true } },
        { path: '/process', name: 'process', component: process },
        { path: '/search', name: 'search', component: search },
        { path: '/video', component: video, name: 'video' }

      ]
    },
    { path: '/sharevideo', component: sharevideo, name: sharevideo }
  ],
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  console.log('路由跳转', to)
  const whiteList = ['/login', '/register', '/haiUserRegister', '/retrievePassword', '/resetpassword', '/passwordSuccess', '/userAgreement', '/sharevideo'] // todo
  if (whiteList.indexOf(to.path) > -1) {
    next()
  } else {
    const token = localStorage.getItem('authorization_token')
    if (!token) {
      Message.error('身份信息已经失效,请重新登陆')
      setTimeout(function () {
        next({ path: '/login' })
      }, 1000)
    } else {
      next()
    }
  }
})

// 把路由对象暴露出去
export default router
