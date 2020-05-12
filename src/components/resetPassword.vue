<template>
    <div class="acceptcodeContainer">
        <el-form :model="ruleForm2"  :rules="rules2" ref="ruleForm2">
            <el-form-item prop="password" style="margin-bottom:0px;height:64px;width:100%;border-bottom:1px solid #37BAA0">        
                <el-input class="resetPasswordInput" v-model="ruleForm2.password" placeholder="密码长度为6-20位，字母，数字，字符至少两种"  show-password></el-input>
            </el-form-item>      

            <!-- <div style="width:100%;height:1px;background-color:#37BAA0"></div> -->

            <el-form-item prop="checkPassword" style="margin-bottom:0px;height:64px;width:100%;border-bottom:1px solid #37BAA0">        
                <el-input  class="resetPasswordInput" v-model="ruleForm2.checkPassword" placeholder="请确认新密码"  show-password></el-input>
            </el-form-item>       
            
            <!-- <div style="width:100%;height:1px;background-color:#37BAA0"></div> -->

            <div style="width:100%;height:152px;padding-top:104px;display:flex;justify-content:space-between">
                <button class="btn"  @click.prevent="submit()">下一步</button>
                <button class="btn"  @click.prevent="submit2()">返回</button>
            </div>
        </el-form>
    </div>
</template>
<script>
import service from '../API/request';
import configAPI from '../API/configAPI';
import Axios from 'axios';
import Qs from 'qs'
export default {
    data(){
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(value))){
          callback(new Error('密码格式不正确'));
        }else{
          if (this.ruleForm2.checkPassword !== '') {
            this.$refs.ruleForm2.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return{
            active:2,
            ruleForm2:{
                password:'',
                checkPassword:'',
                sonMobile:'',
                sonCode:''
            },
            rules2: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        submit(ruleForm2){
            this.$refs["ruleForm2"].validate((valid) => {
                if (valid) {
                    let params = Qs.stringify({
                        phone:this.ruleForm2.sonMobile,
                        password:this.ruleForm2.checkPassword,
                        code:this.ruleForm2.sonCode
                    })
                    console.log(params)
                    Axios.put(configAPI.changPassword_url + params,{

                    }).then(result => {
                        console.log(result)
                        this.$router.push({path:'/passwordSuccess'});
                    }).catch((err)=>{
                        console.log(err)
                        this.$message.error(err.msg)
                    })
                   
                }else{}
            });
        },
        submit2(){
            this.$router.push({path:'/retrievePassword'});
        },
        sendMsg(){
            this.$emit('func',this.active)
        } 
    },
    created(){
        this.sendMsg()
        var cs = this.$route.params;
        console.log(cs)
        this.ruleForm2.sonMobile = cs.sonMobile,
        this.ruleForm2.sonCode = cs.sonCode
    }

}
</script>
<style scoped>
    .acceptcodeContainer{
        width: 440px;
        padding:0px 50px 0px 50px;
        height: 130px;
        box-sizing: border-box; 
    }
    button:focus{
        outline: none
    }
    .btn{
        border:0px;background-color:#37BAA0;color:white;width:160px;height:48px;border-radius: 24px;
        -webkit-appearance:none; /*去除input默认样式*/
    }
    .btn:active{
        background-color: rgb(42, 139, 120)
    }
</style>
<style>
    .resetPasswordInput{
        height: 64px;
        padding-top: 41px;
        box-sizing: border-box;
        display: flex;
        -webkit-appearance:none; /*去除input默认样式*/
    }
    .resetPasswordInput input{
        height: 23px;
        border: 0px;
        padding: 0px 0px 9px 9px;
        -webkit-appearance:none; /*去除input默认样式*/
        line-height: 20px
    }
    .resetPasswordInput ~ div{
        left:10px;
        position: relative;
        top: 5px
    }
    .resetPasswordInput span{
        padding-top: 25px;
        height: 25px;
    }
</style>
