<template>
    <div class="imgcodeContainer">
        <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" style="width:1005">
        <!-- <p>{{ruleForm2.mobile}}</p> -->
        <el-form-item prop="mobile" style="margin-bottom:0px;height:64px;width:100%">
            <el-input class="findMobileInput inputBorder" v-model="ruleForm.mobile" placeholder="请输入手机号"  ></el-input>
        </el-form-item>
        
        <!-- <div style="width:100%;height:0.5px;background-color:#37BAA0"></div> -->

        <div style="display:flex;border-bottom:1px #37BAA0 solid">
            <el-form-item prop="mobileMessCode" style="margin-bottom:0px;height:64px;display:flex;width:240px">
                <el-input class="findMobileInput" v-model="ruleForm.mobileMessCode" placeholder="请输入短信验证码"  ></el-input>
            </el-form-item>
            <div style="height:64px;width:104px;display:flex">
                <div  style="border:0px;padding:41px 0 9px 3px;background-color:white;display:flex">
                    <span v-show="show" class="aSty" @click="submit()" style="font-size:14px;line-height:1">获取验证码</span>
                    <span v-show="!show" class="count aSty" style="font-size:14px;line-height:1">重新发送({{count}})</span>
                </div>
            </div>
        </div>

        <!-- <div style="width:100%;height:1px;background-color:#37BAA0"> </div> -->

        <div style="height:32px;width:100%;padding:20px 29px 0px 10px;box-sizing: border-box; ">
            <span v-if="checkMessTip" style="font-size:12px;color:#999999">短信验证码已发送至{{this.$store.state.mobile}}，请查看并输入验证码</span>
        </div>

        <div style="width:100%;height:120px;padding:72px 0px 0px 184px;box-sizing:border-box">
                <button class="btn" @click.prevent="checkMessCode()">
                    下一步
                </button>
        </div>

        </el-form>
    </div>
</template>
<script>
import service from '../API/request';
import configAPI from '../API/configAPI';
// import Axios from 'axios';
import Axios from '../API/http.js'
import Qs from 'qs'
export default {
    data(){
        var validatePass3 = (rule,value,callback) =>{
          if(value === ''){
              callback(new Error('请输入手机号'));
          }else if(!(/^1[3-9][0-9]{9}$/.test(value))){
              callback(new Error('输入手机号错误'))
          }else{
              callback()
          }
        }
        return{
            checkMessTip:false,
            show: true,
            count: '',
            timer: null,
            active:1,
            ruleForm:{
                mobile:'',
                key: '',
                mobileMessCode:'' 
            },   
            rules2: {
                mobile:[
                    {validator:validatePass3,trigger:'blur'}
                ],
                // mobileMessCode:[
                //     {required: true, message: '请填写短信验证码', trigger: 'blur' }
                // ],
            } 
        }
    },
    methods:{
            // this.$store.state.mobile = this.ruleForm2.mobile;
        submit(ruleForm){
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                    console.log('ok')
                    console.log(this.ruleForm.mobile)
                    this.$store.state.mobile = this.ruleForm.mobile;
                    this.$store.state.mobile = this.$store.state.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
                    //获取手机验证码
                        let params = {
                            phone:this.ruleForm.mobile
                        }
                        Axios.post(configAPI.getMobileCode_url,
                            Qs.stringify(params)
                        ).then(result=>{
                            console.log('',result)
                            this.ruleForm.key = result.data.result.key
                            console.log('验证码key', this.ruleForm.key)
                        })
                        this.$message.success({
                            dangerouslyUseHTMLString: true,
                            duration:5000,
                            // message:'手机验证码服务尚未开通，默认手机验证码为 <strong>" 1234 "</strong>'
                            message:'请查收并填写短信验证码♥'
                        })
                    this.getCode()
                }else{
                    return
                }
            });
        },
        sendMsg(){
            this.$emit('func',this.active)
        },
        getCode(){
            const TIME_COUNT = 60;
            if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
                
            if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
                } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                // this.checkMessTip = !this.checkMessTip
                // this.checkMessTip = false
                }
            }, 1000)
            }
            console.log('ok')
            this.checkMessTip = true
            // this.checkMessTip = !this.checkMessTip
            
        },  
        checkMessCode(ruleForm){
            // this.$router.push({path:'/resetpassword'});
            this.$refs["ruleForm"].validate((valid) => {
                // console.log(valid)
                if(this.ruleForm.mobileMessCode == 0){
                    return
                }else{
                    // console.log('ok')
                    // Axios.get(configAPI.checkMesscode_url,{
                    //     params:{
                    //         phone:this.ruleForm.mobile,
                    //         code:this.ruleForm.mobileMessCode
                    //     }
                    // }).then(result=>{
                        // console.log(result)
                        //把手机号和验证码传过去
                        var person = {
                            sonMobile:this.ruleForm.mobile,
                            sonCode:this.ruleForm.mobileMessCode,
                            key: this.ruleForm.key
                        }
                        this.$router.push({name:'resetpassword',params:person});
                    // }).catch((err)=>{
                    //     console.log(err)
                    //     this.$message.error(err.msg)
                    // })
                }
            });
        }  
    },
    created(){
        this.sendMsg()
    }
            
}
</script>
<style scoped>
    .imgcodeContainer{
        width: 100%;
        height: 170px;
        box-sizing: border-box; 
        padding:0 48px 0 48px;
    }
    button:focus{
        outline: none
    }
    .btn{
        border:0px;background-color:#37BAA0;color:white;width:100%;height:100%;border-radius: 24px;
    }
    .btn:active{
        background-color: rgb(42, 139, 120)
    }
    .aSty{
        cursor:pointer
    }
</style>
<style>
    .findMobileInput{
        height: 64px;
        padding-top: 41px;
        box-sizing: border-box;
        display: flex;
    }
    .findMobileInput input{
        height: 23px;
        border: 0px;
        padding: 0px 0px 9px 9px;
        line-height: 20px
    }
    .findMobileInput ~ div{
        left:10px;
        position: relative;
        top: 5px
    }
    .inputBorder input{
        border-bottom: #37BAA0 solid 1px;
        border-radius: 0px;
    }
</style>

