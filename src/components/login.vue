<template>
    <div class="loginContainer" >
        <div class="left" >
            <img src="../images/loginbg2.jpg" alt="" style="width:100%;height:100%">
        </div>
        <div class="right" >
            <span class="title" >StayhomeHub 登录</span>
            <input type="text" id="mobileInput" class="mobileInput" placeholder="请输入注册手机号" v-model="mobile">
            <input type="password" class="passwordInput"  placeholder="请输入密码" v-model="password" @keyup.enter="submit()">
            <!-- <span class="loginFalse">{{msg}}</span> -->
            <div style="width:340px;height:17px;position:absolute;top:258px">
                <img class="aSty" v-if="checked == false" @click="on();zidongdenglu()"  src="../images/autologin-off.png" alt="" style="position:absolute;">
                <img class="aSty" v-if="checked == true" @click="on();zidongdenglu()"  src="../images/autologin-on.png" alt="" style="position:absolute;">
                <span class="autologin" style="">自动登录</span>
                <router-link to="/retrievePassword" style="text-decoration:none">
                    <a class="forgetpassword" style="" href="">忘记密码</a>
                </router-link>
            </div>
            <span style="font-size:12.5px;color:#999999;position:absolute;top:349px;">还没有注册账号，立即
                <router-link to="/register">
                    <a href="" style="color:#37BAA0">注册</a>
                </router-link>
            </span>
            <button class="login" style="" @click="submit()">登录</button>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
// 导入API
import configAPI from '../API/configAPI.js'
import homePageVue from '../homepage.vue'
import service from '../API/request.js'
// import Axios from 'axios'
import Axios from '../API/http.js'
// const axios = require('axios')
import Qs from 'qs'
export default {

  name: 'login', // 这个应该是声明login组件的名称name?不是
  data () {
    return {
      checked: false,
      mobile: '',
      password: '',
      // msg:'', //登录失败的警告信息。可能是下面提醒，也能是弹窗
      pageTipe: '登录'
    }
  },
  methods: {
    submit () {
      console.log(this.mobile)
      console.log(this.password)
      // axios.post('http://39.105.29.12:8585/app/v1/login',{
      console.log(configAPI.login_url)
      let params = {
          username: this.mobile,
          password: this.password
      }
      Axios.post(configAPI.login_url, 
        Qs.stringify(params)
      ).then(result => {
        // console.log(result)
        const { data } = result
        console.log('登陆成功', data)
        var Authorization = data.result.access_token
        localStorage.setItem('authorization_token', Authorization)
        localStorage.setItem('real_name', data.result.user_info.name)
        localStorage.setItem('email', data.result.user_info.email)
        localStorage.setItem('avatar', data.result.user_info.avatar)
        localStorage.setItem('phone', data.result.user_info.phone)
        if (data.code === 200) {
          this.$router.push({ path: '/selected' })
        } else {
          console.log('出错了！！！')
          this.$message.error(data.message)
        }
        // console.log(Authorization)
        // this.msg = data.message
        // if (data.code === 200) {
        //   this.$router.push({ path: '/selected' })
        // } else {
        //   console.log('出错了！！！')
        //   this.$message.error(data.message)
        // }
      }).catch((err) => {
        console.log('登录出错', err)
        // if (err.data.code === 401) {
        //   this.$message.error(err.message)
        // }
      })
    },
    changelabel () {
      if (this.label = 0) {
        this.label = 1
      } else {
        this.label = 0
      }
    },

    zidongdenglu () {
      console.log('ok')
      localStorage.setItem('zidongdenglu', this.checked)
    },
    on () {
      this.checked = !this.checked
    },
    ok () {
      console.log('ok')
    },
    sendMsg () {
      this.$emit('func', this.pageTipe)
    }
  },
  created () {
    // console.log(localStorage.getItem("zidongdenglu") )
    // this.checked = localStorage.getItem("zidongdenglu")
    // console.log(typeof(localStorage.getItem("zidongdenglu") )   )
    // console.log(typeof(true))
    if (localStorage.getItem('zidongdenglu') === 'true') {
      // setInterval(function(){
      service.get(configAPI.PlayerRecord_url, {
      }).then(result => {
        const { data } = result // 获取resule的data
        console.log(data)
        console.log(result)
        // this.newsLis t = data.data;
        // console.log(data.code)
        // console.log(this.newsList)
        // console.log(this.newsList[0].short_title)
        console.log(data.code)
        if (data.code == 200) {
          this.$router.push({ path: '/homepage' })
        } else {
          // this.$router.push({path:'/login'})
          this.msg = data.message
          localStorage.setItem('zidongdenglu', 'true')
          // console.log('okoooo')
        }
      })
      console.log('ok')
      // },3000)
    } else {
      console.log(localStorage.getItem('zidongdenglu'))
    }
    this.sendMsg()
  },
  mounted () {
    document.getElementById('mobileInput').focus()
  }
}
</script>
<style scoped>
.loginContainer{
        display: flex;
        width: 860px;
        height: 500px;
        margin: 0 auto;
        border: 10px solid black;
        background-color: #fff;
        border-radius: 16px;
        box-sizing: border-box;
    }
    /* .el-button--medium{
        width: 100%;
    }
    .el-button--text{
        border: 0px;
    }
    .toRegister{
        display:flex;
        justify-content:space-around
    } */
    .left{
        flex:50%;
        /* width:420px; */
        /* height: 480px; */
        /* background-image: url('../images/loginbg518.png'); */
    }
    .right{
        flex:50%;
        /* width: 420px; */
        /* height: 480px; */
        padding: 63px 40px 40px 40px;
        box-sizing: border-box;
        position: relative;
    }
    .title{
        font-family: "黑体";
        font-size: 20px;
        position: absolute;
        top: 63px
    }
    .mobileInput{
        position: absolute;
        top: 153px;
        border-left: 0px;
        border-top:0px;
        border-right: 0px;
        border-bottom: 1px #E5E5E5 solid;
        padding: 9px;
        box-sizing: border-box;
        height: 31px;
        width: 340px;
    }
    .passwordInput{
        position: absolute;
        top: 206px;
        border-left: 0px;
        border-top:0px;
        border-right: 0px;
        border-bottom: 1px #E5E5E5 solid;
        padding: 9px;
        box-sizing: border-box;
        height: 33px;
        width: 340px
    }
    input:focus {
        outline:none;
        border-bottom: 1px #37BAA0 solid;
    }
    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #C4C4C4;
    }
    .forgetpassword{
        text-decoration: none;
        font-size:12.5px;
        position:absolute;
        right:0px;
        color:#999999
    }
    a.forgetpassword:hover{
        color: #37BAA0;
    }
    .login{
        width:120px;
        height:48px;
        position:absolute;
        top:332px;
        right:40px;
        background-color:#37BAA0;
        color:white;
        border:0px;
        border-radius: 24px
    }
    button:focus{
        outline:none;
    }
    button:active{
        /* outline:none; */
        background-color: rgb(42, 139, 120)
    }
    .autologin{
        font-size:12px;
        color:#999999;
        position:absolute;
        left:24px;
    }
    .loginFalse{
        top:240px;
        position: absolute;
        left: 49px;
        font-size: 50%;
        color: red
    }
    .aSty{
        cursor:pointer
    }
</style>
