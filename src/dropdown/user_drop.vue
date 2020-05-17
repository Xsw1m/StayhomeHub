<template>
    <el-dropdown trigger="hover">
        <div class="avatar">
        <img class="avatar_img" style="border-radius: 50%;width:100%;height:100%" @click="tonewsMid" alt="" :src="avatar">
            <!-- <i class="el-icon-user-solid"></i> -->
        </img>    
        </div>
        
        <el-dropdown-menu slot="dropdown" class="dropdown_user">
            <div class="user_item" style="display:flex;margin-bottom:20px;align-items:center;">
                <div class="user_avatar">
                <img style="border-radius: 50%;width:100%;height:100%" @click="tonewsMid" :src="avatar" alt="">
                    <!-- <i></i> -->
                </img>    
                </div>
                
                <div class="user_data" style="display:flex;flex-flow: column;">
                    <span style="line-height:2;" @click="tonewsMid">{{user_name}}</span>
                    <span style="line-height:2;" @click="tonewsMid">{{user_mobile}}</span>
                </div>
            </div>
            <el-dropdown-item style="">
                <div class="btn_item" style="">
                    <el-button @click.native="topersonalSetting" style="background: #E7F2F0;border-radius: 50px;color:#666666; border:0;font-size:12px;font-weight:400;">修改密码</el-button>
                    <el-button @click.native="loginout" style="background: #37BBA0;border-radius: 50px;color:#FFFFFF;border:0;font-size:12px;font-weight:400;">退出登录</el-button>
                </div>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
import Vue from 'vue'
import { Message } from 'element-ui';
Vue.prototype.$message = Message;

import configAPI from '../API/configAPI.js'
import service from '../API/request.js'
export default {
    data () {
        return {
            user_name:'',
            user_mobile:'',
            avatar:'',  
        }
    },
    mounted() {
        this.$bus.$on('getUserInfo', ()=> {
            this.getUserinfo()
        })
    },
    methods: {
        tonewsMid(){
            this.$router.replace('/newsMid')
            
        },
        topersonalSetting(){
            this.$router.replace('personalSetting')
        },
        loginout(){
           
            service.delete(configAPI.logout,{
                
            }).then((result) => {
                let status = result.data.code
                if (status === 200){
                    window.localStorage.removeItem('authorization_token')
                    Message.success('您已成功退出登录！')
                    this.$router.push('/login')
                    
                }
            }).catch((err) => {
                
            });
        },
        getUserinfo() {
            this.avatar = localStorage.getItem("avatar")
            this.user_name = localStorage.getItem("real_name")
            this.user_mobile = localStorage.getItem("phone")
            console.log('全局修改个人信息成功！！！！！！')
            location.reload()
        }
    },
    created(){
        // this.real_name = localStorage.getItem("real_name")
        this.avatar = localStorage.getItem("avatar")
        // this.phone = localStorage.getItem("phone")
        this.user_name = localStorage.getItem("real_name")
        this.user_mobile = localStorage.getItem("phone")
    }
}
</script>
<style scoped>
    /* 用户头像功能 */
.user{
    width: 10.6557377%;
    height: 2.70834vw;
    margin: 0.729167vw 0px 0.729167vw 0px;
}
.el-dropdown{
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    outline: none;
    border: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.el-dropdown-menu__item{
    padding:0;
}
.user_item span{
    line-height: 2;
    font-size: 12px;
}
.btn_item{
    display: flex;
}
.btn_item button{
    width: 45%;
    font-size: 14px;
    padding: 5% 5%;
    margin-left: 5%
}   
.avatar{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    -webkit-appearance: none;
    outline: none;
    border: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    /* background: url('../img/avatar.png');
    background-repeat:no-repeat;
    background-size:100% 100%; */
}
.avatar_img{
    -webkit-appearance: none;
    outline: none;
    border: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
/* 下拉栏中的头像 */
.user_avatar{
    border-radius: 50%;
    background: url('../img/avatar.png');
    background-repeat:no-repeat;
    background-size:100% 100%;
    /* background-image: url(); */
    /* width: 50%; */
    /* height: 50%; */
    width: 2.70834vw;
    height: 2.70834vw;
    min-width: 46px;
    min-height: 46px;
    margin-right: 10%;
    margin-left: 10%;
}
.dropdown_user{
    width: 10.9375%;
    min-width: 170px;
    border-radius: 10px;
    padding: 0.729167vw 0.729167vw 0.729167vw 0.729167vw;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
    color: 0;
    background: 0;
}
</style>