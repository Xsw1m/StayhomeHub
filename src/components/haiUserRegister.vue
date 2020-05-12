<template>
    <div class="registerContainer" >
        <!-- <h1>这是注册界面</h1> -->
        <div class="top" style="">

            <div class="inUser" style="">
                <span style="font-size:16px;color:#FFFFFF">HAIER员工</span>
            </div>

            <router-link to="/register" style="text-decoration:none">           
                <div class="outUser" style="">
                    <span style="font-size:16px;color:#999999">外部用户</span>
                </div>
            </router-link>

        </div>
        <div class="haiUsermain" style="">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                
                <el-form-item prop="userName" style="margin-bottom:0px;height:54px">
                    <el-input class="outUserInput" v-model="ruleForm.userName" placeholder="请输入真实姓名"></el-input>
                </el-form-item>

                <el-form-item style="margin-bottom:0px;height:54px;box-sizing:border-box" prop="mobile">
                    <el-input class="outUserInput" v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
        
                <!-- <div style="width:340px;height:0.5px;background-color:#37BAA0"></div> -->

                <div style="display:flex;justify-content:space-between">
                <el-form-item style="margin-bottom:0px;height:54px" prop="country">
                <el-select class="el-select_myself" @change="getAllProvince()"  v-model="ruleForm.country" placeholder="国家" style="height:54px;width:100px;box-sizing: border-box;padding-top: 18px;">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                    </el-option>
                </el-select>
                </el-form-item>

                <el-form-item style="margin-bottom:0px;height:54px" prop="province">
                <el-select class="el-select_myself" @change="getAllCity()" v-model="ruleForm.province" placeholder="请选择省" style="height:54px;width:100px;box-sizing: border-box;padding-top: 18px;">
                    <el-option
                        v-for="item in options2"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                        >
                    </el-option>
                </el-select>
                </el-form-item>

                <el-form-item style="margin-bottom:0px;height:54px" prop="city">
                <el-select class="el-select_myself" v-model="ruleForm.city" placeholder="请选择市" style="height:54px;width:100px;box-sizing: border-box;padding-top: 18px;">
                    <el-option
                        v-for="item in options3"
                        :key="item.id"
                        :label="item"
                        :value="item"
                        >
                    </el-option>
                </el-select>
                </el-form-item>
                </div>
                
                <!-- <div style="width:340px;height:0.5px;background-color:#37BAA0"></div> -->

                <el-form-item style="margin-bottom:0px;height:54px;box-sizing:border-box" prop="from">
                    <el-input class="outUserInput" v-model="ruleForm.from" placeholder="请输入所在小微"></el-input>
                </el-form-item>
                
                <!-- <div style="width:340px;height:1px;background-color:#37BAA0"></div> -->

                <el-form-item prop="password" style="margin-bottom:0px;height:55px;width:100%">
                    <el-input class="outUserInput" v-model="ruleForm.password" placeholder="密码长度为6-20位，字母，数字，字符至少两种" show-password></el-input>
                </el-form-item>

                <el-form-item style="margin-bottom:0px;height:54px;box-sizing:border-box" prop="passwordag">
                    <el-input class="outUserInput" v-model="ruleForm.passwordag" placeholder="请再次输入密码" show-password></el-input>
                </el-form-item>

                <el-form-item prop="email" style="margin-bottom:0px;height:55px;width:100%">
                    <el-input class="outUserInput" v-model="ruleForm.email" placeholder="请输入邮箱" ></el-input>
                </el-form-item>
                
                <!-- <div style="width:340px;height:0.5px;background-color:#37BAA0"></div> -->

                <div style="display:flex;">
                    <el-form-item prop="mobileMessCode" style="margin-bottom:0px;height:55px;display:flex;width:75%">
                        <el-input class="outUserInput" v-model="ruleForm.mobileMessCode" placeholder="请输入短信验证码" style="width:100%"></el-input>
                    </el-form-item>
                    <div style="height:55px;width:25%;display:flex;border-bottom: 1px #37BAA0 solid;box-sizing:border-box">
                        <div style="border:0px;padding:31px 0 9px 3px;background-color:white;display:flex">
                            <span class="aSty" v-show="show"  @click="submit()" style="font-size:14px;line-height:1">获取验证码</span>
                            <span v-show="!show" class="count" style="font-size:14px;line-height:1">重新发送({{count}})</span>
                        </div>
                    </div>
                </div>

                <div class="userAgreement" style="">
                    <img v-if="checked == false" @click="on3();"  src="../images/autologin-off.png" alt="" >
                    <img v-if="checked == true" @click="on3();"  src="../images/autologin-on.png" alt="" >
                    <div class="agreement">
                        <span style="font-size:12px;color:#999999;line-height:1">已阅读并同意</span>
                        <a href="" style="color:#37BAA0;font-size:12px;line-height:1;text-decoration: none" @click.prevent="userAg()">《用户注册协议》</a>
                    </div>
                </div>
          </el-form>
        </div>
        <div class="tlr" style="">
            <div class="toLogin" style="">
                <span style="font-size:14px;color:#C4C4C4;line-height:1">已有账号，立即
                    <router-link to="/login">
                        <a href="" style="color:#37BAA0;">登录</a>
                    </router-link>            
                </span>
            </div>
            <div  style="width:160px;height:48px">
                <button class="registerBtn" style="" type="primary" @click="submitForm('ruleForm')">注册</button>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from 'axios';
import region from '../json/region.json'
import service from '../API/request';
import configAPI from '../API/configAPI';
import { log } from 'util';
import Qs from 'qs'
export default {
    data(){
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (!(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(value))) {
              callback(new Error('输入密码格式错误'))
          }
          callback();
        }
      };
       var validatePass4 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if (!(/^([a-zA-Z]|[0-9])(\w|\-|\.)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value))) {
          callback(new Error('邮箱格式不正确!'));
        } else {
          callback();
        }
      };



      var validatePass3 = (rule,value,callback) =>{
          if(value === ''){
              callback(new Error('请输入手机号'));
          }else if(!(/^1[3-9][0-9]{9}$/.test(value))){
              callback(new Error('输入手机号错误'))
          }else{
              callback();
          }
      }
        return{
            show:true,
            pageTipe:'注册',
            checked:true,
            count: '',
            timer: null,
            options: [
                {
                value: '国内',
                label: '国内'
                }, {
                value: '国外',
                label: '国外'
                },
            ],
            options2:'',
            options3:'',
            value: '',       
            ruleForm:{
                userName:'',
                country:'',
                mobile:'',
                province:'',
                city:'',
                from:'',
                passwordag:'',
                password:'',
                email:'',
                mobileMessCode:'',
            },         
            rules: {
                userName:[
                    { required: true, message: '请填写真实姓名', trigger: 'blur' }
                ],
                country:[
                    { required: true, message: '请填写国家', trigger: 'blur' }
                ],
                mobile:[
                    {validator:validatePass3,trigger:'blur'}
                ],
                province: [
                    { required: true, message: '请填写省', trigger: 'blur' }
                ],
                city: [
                    { required: true, message: '请填写城市', trigger: 'blur' }
                ],
                from:[
                    { required: true, message: '请填写所在小微', trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                passwordag:[
                    { validator: validatePass4, trigger: 'blur' }
                ],
                email:[
                    { validator: validatePass2, trigger: 'blur'}
                ],
                mobileMessCode:[
                    { required: true, message: '请填写短信验证码', trigger: 'blur' }
                ],
            }   
        }
    },
    methods: {
        ok(){
            console.log('ok')
        },
        on3(){
            this.checked = !this.checked;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) { 
                    console.log('这是成功')
                    // console.log(result.result.msg)
                    if(this.checked){
                        //发送注册请求
                    // group_name=1&group_leader=1&group_country=1&group_province=1&group_city=1&code=1
                    let data = Qs.stringify({
                        type:'2',
                        real_name:this.ruleForm.userName,
                        phone:this.ruleForm.mobile,
                        email:this.ruleForm.email,
                        password:this.ruleForm.password,
                        group_name:this.ruleForm.from,
                        // group_leader:this.ruleForm.boss,
                        group_country:this.ruleForm.country,
                        group_province:this.ruleForm.province,
                        group_city:this.ruleForm.city,
                        code:this.ruleForm.mobileMessCode,
                    });
                    console.log(data)
                    Axios.post(configAPI.userRegister_url + data,{
                        
                    }).then(result=>{
                        // console.log(result)
                        this.registerSucc(formName)
                    }).catch((err)=>{
                        console.log(err)
                        // this.$message.error(err.msg)
                        this.$message.error('注册出错!')
                    })
                    }else{
                        this.$message.error('请同意用户注册协议')
                    }       
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        registerSucc(formName){
            this.$confirm('注册信息已提交，请等待审核通过！')
            .then(()=> {
                // done();
                console.log('ok')
                this.$router.push({ path: '/login'})
            })
            .catch(() => {
                // console.log('no')
                this.$refs[formName].resetFields();
            });
        },
        userAg(){
            this.$router.push({path:'/userAgreement'})
        },
        sendMsg(){
            this.$emit('func',this.pageTipe)
        },
        getAllProvince(){
            if(this.ruleForm.country == '国内'){
                this.options2 = region
                this.ruleForm.province = ''
                this.ruleForm.city = ''
            }else{
                this.ruleForm.province = '无'
                this.ruleForm.city = '无'
            }

        },
        getAllCity(){
            
            this.ruleForm.city = ''

            // console.log(this.ruleForm.province)
        
            this.options2.forEach(element => {
                // console.log(element)
                if(element.name == this.ruleForm.province){
                    this.options3 = element.son;
                }
            });

            console.log(this.ruleForm.province)
        },
        submit(){
            if (this.ruleForm.mobile == '') {
                    console.log('no')
                    console.log(this.mobile)
                    return
                }else{
                    if((/^1[3-9][0-9]{9}$/.test(this.ruleForm.mobile))){
                        // console.log(this.ruleForm.mobile)
                        // console.log('ok')
                        Axios.get(configAPI.getMobileCode_url,{
                            params:{
                                phone:this.ruleForm.mobile
                            }
                        }).then(result=>{
                            console.log(result)
                        })
                        this.$message.success({
                            dangerouslyUseHTMLString: true,
                            duration:6000,
                            message:'手机验证码服务尚未开通，默认手机验证码为 <strong>" 987023 "</strong>'
                        })
                        this.getCode()
                    }
                    else{
                        console.log('输入手机号格式错误')
                    }
                }
            // console.log('ok')
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
                    }
                }, 1000)
            }
                // this.show = false;

        }, 
    },
    created(){
        this.sendMsg()
}
}
</script>
<style scoped>
    .registerContainer{
        width: 460px;
        height: 650px;
        margin: 0 auto;
        border: 10px solid black;
        background-color: #fff;
        border-radius: 16px;
        box-sizing: border-box;
    }
    .registerBtn{
        border:0px;color:#FFFFFF;width:100%;height:100%;border-radius: 24px;background-color:#37BAA0;
    }
    .registerBtn:focus{
        outline: none
    }
    .registerBtn:active{
        background-color: rgb(42, 139, 120)
    }
    button:focus{
        outline: none
    }
    .top{
        width:440px;height:60px;display:flex;
    }
    .outUser{
        width:220px;height:60px;background:#E5EEEC;display:flex;align-items:center;justify-content:center
    }
    .inUser{
        width:220px;height:60px;background:#37BAA0;display:flex;align-items:center;justify-content:center
    }
    .haiUsermain{
        width:440px;height:500px;padding:19px 50px 0px 50px;box-sizing: border-box;
    }
    .userAgreement{
        height:36px;width:100%;padding:19px  131px 0px 0px;box-sizing:border-box;display:flex
    }
    .agreement{
        width:193px;height:12px;padding:3px 0px 2px 6px;display:flex;justify-content:space-between
    }
    .tlr{
        height:48px;width:100%;padding:0 50px;box-sizing:border-box;display:flex
    }
    .toLogin{
        width:180px;height:48px;padding:17px 43px 16px 0px;box-sizing:border-box;display:flex
    }
    .aSty{
        cursor:pointer
    }
</style>
<style>
    .haiUsermain input{
        /* border-bottom: 1px solid #37BAA0!important; */
        -webkit-appearance:none; /*去除input默认样式*/
        line-height: 1;
    }
    .el-input_myself{
        height: 54px;
    }
    .el-input_myself > input{
        padding: 31px 9px 9px 10px;
        height: 54px;
        border: 0px;
        border-radius: 0px;
        -webkit-appearance:none; /*去除input默认样式*/
    }       
    .el-input_myself ~ div{
        left: 10px
    }
    .el-select_myself ~ div{
        left: 10px
    }
    .el-form-item__content{
        height: 54px
    }
    .el-select_myself div{
        height: 37px;
    }
    /* .el-select_myself2 > div{
        height: 37px;
    } */
    .el-select_myself input{
        padding:0 0 0px 10px;
        border: 0px;
        border-bottom: 1px #E5E5E5 solid;
        border-radius: 0px;
        height: 37px;
        -webkit-appearance:none; /*去除input默认样式*/
        line-height: 1;
    }
</style>



