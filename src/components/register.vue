<template>
    <div class="registerContainer" >
        <!-- <h1>这是注册界面</h1> -->
        <div class="top" style="">
            <div class="outUser" style="">
                <span style="font-size:16px;color:#FFFFFF">用户注册</span>
            </div>
        </div>
        <div class="main" style="">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item prop="name" style="margin-bottom:0px;height:55px;width:100%">
                    <el-input class="outUserInput" v-model="ruleForm.name" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" style="margin-bottom:0px;height:55px;width:100%">
                    <el-input class="outUserInput" v-model="ruleForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password" style="margin-bottom:0px;height:55px;width:100%">
                    <el-input class="outUserInput" v-model="ruleForm.password" placeholder="密码长度为6-20位，字母，数字，字符至少两种" show-password></el-input>
                </el-form-item>
                <el-form-item prop="passwordag" style="margin-bottom:0px;height:55px;width:100%">
                    <el-input class="outUserInput" v-model="ruleForm.passwordag" placeholder="请再次输入密码" show-password></el-input>
                </el-form-item>
                <el-form-item prop="email" style="margin-bottom:0px;height:55px;width:100%">
                    <el-input class="outUserInput" v-model="ruleForm.email" placeholder="请输入邮箱" ></el-input>
                </el-form-item>
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
                    <a href="" style="color:#37BAA0;font-size:12px;line-height:1;text-decoration: none" @click.prevent="userAgtodo()">《用户注册协议》</a>
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
                <button class="registerBtn" style="" @click="submitForm('ruleForm')">注册</button>
            </div>
        </div>

    </div>
</template>
<script>
import service from '../API/request'
import configAPI from '../API/configAPI'
import Qs from 'qs'
import Axios from '../API/http.js'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (!(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(value))) {
          callback(new Error('输入密码格式错误'))
        }
        callback()
      }
    }

    var validatePass4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!(/^([a-zA-Z]|[0-9])(\w|\-|\.)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value))) {
        callback(new Error('邮箱格式不正确!'))
      } else {
        callback()
      }
    }

    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!(/^1[3-9][0-9]{9}$/.test(value))) {
        callback(new Error('输入手机号错误'))
      } else {
        callback()
      }
    }
    return {
      show: true,
      count: '',
      timer: null,
      checked: true,
      pageTipe: '注册',
      ruleForm: {
        name: '',
        mobile: '',
        key: '',
        verification_code: '',
        password: '',
        passwordag: '',
        email: '',
        mobileMessCode: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        mobile: [
          { validator: validatePass3, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwordag: [
          { validator: validatePass4, trigger: 'blur' }
        ],
        email: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        // invitationCode: [
        //   { required: true, message: '请填写邀请码', trigger: 'blur' }
        // ],
        mobileMessCode: [
          { required: true, message: '请填写短信验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      if (this.ruleForm.mobile == '') {
        console.log('no')
        console.log(this.mobile)
      } else {
        if ((/^1[3-9][0-9]{9}$/.test(this.ruleForm.mobile))) {
          console.log(this.ruleForm.mobile)
          console.log('ok')

          // this.$store.state.mobile = this.ruleForm.mobile;
          // this.$store.state.mobile = this.$store.state.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
          // 获取手机验证码
          let params = {
            phone: this.ruleForm.mobile
          }
          Axios.post(configAPI.getMobileCode_url,
            Qs.stringify(params)
          ).then(result => {
            console.log(result)
            if (result.data.code === 200) {
              this.ruleForm.key = result.data.result.key
              console.log('验证码密钥', this.ruleForm.key)
              this.$message.success({
                dangerouslyUseHTMLString: true,
                duration: 5000,
                // message: '手机验证码服务尚未开通，默认手机验证码为 <strong>" 1234 "</strong>'
                message:'请查收并填写短信验证码♥'
              })
            } else {
              this.$message.error(result.data.msg)
            }
          })
          this.getCode()
        } else {
          console.log('输入手机号格式错误')
        }
      }
      // console.log('ok')
    },
    getCode () {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
      // this.show = false;
    },
    sendMsg () {
      this.$emit('func', this.pageTipe)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('这是成功')
          // console.log(result.result.msg)
          if (this.checked) {
            // 发送注册请求
            const data = Qs.stringify({
              name: this.ruleForm.name,
              phone: this.ruleForm.mobile,
              email: this.ruleForm.email,
              password: this.ruleForm.password,
              verification_code: this.ruleForm.mobileMessCode,
              verification_key: this.ruleForm.key
            })
            console.log(data)
            Axios.post(configAPI.userRegister_url ,data
            ).then(result => {
              // console.log('错误信息1', result)
              if (result.data.code === 200) {
                  this.registerSucc(formName)
              } else {
                  console.log('错误信息1', result)
                  this.$message.error(result.data.msg)
              }
            }).catch((err) => {
              // console.log('错误信息2', err)
              // this.$message.error(err.msg)
              this.$message.error(err.response.data.msg)
            })
          } else {
            this.$message.error('请同意用户注册协议')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    registerSucc (formName) {
      this.$confirm('注册信息已提交，请等待审核通过！ ')
        .then(() => {
          // done();
          console.log('ok')
          this.$router.push({ path: '/login' })
        })
        .catch(() => {
          console.log('no')
          this.$refs[formName].resetFields()
        })
    },
    userAg () {
      this.$router.push({ path: '/userAgreement' })
    },
    on3 () {
      this.checked = !this.checked
    }
  },
  created () {
    this.sendMsg()
  }
}
</script>
<style scoped>
    .registerContainer{
        width: 460px;
        height: 600px;
        margin: 0 auto;
        border: 10px solid black;
        background-color: #fff;
        border-radius: 16px;
        box-sizing: border-box;
    }
    .userInput{
        border-left: 0px;
        border-top:0px;
        border-right: 0px;
        border-bottom: 1px #37BAA0 solid;
        padding: 31px 9px 9px 10px;
        box-sizing: border-box;
        height: 55px;
        width: 340px;
        -webkit-appearance:none; /*去除input默认样式*/
        line-height: 1;
    }
    input:focus {
        outline:none;
        -webkit-appearance:none; /*去除input默认样式*/
    }
    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #C4C4C4;
    }
    /* .eye{
        display:flex;
        justify-content:space-between
    } */
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
    .inUser{
        width:220px;height:60px;background:#E5EEEC;display:flex;align-items:center;justify-content:center
    }
    .outUser{
        width:440px;height:60px;background:#37BAA0;display:flex;align-items:center;justify-content:center
    }
    /* .eyeDiv{
        width:70px;height:55px;border-bottom: 1px #37BAA0 solid;box-sizing:border-box;padding:32px 9px 12px 43px;display:flex
    } */
    /* .MessCodeDiv{
        width:70px;height:55px;border-bottom: 1px #37BAA0 solid;box-sizing:border-box;padding:31px 2px 9px 2px;display:flex
    } */
    .main{
        width:440px;height:453px;padding:19px 50px 0px 50px;box-sizing: border-box;
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
    .outUserInput{
        height: 55px;
        padding-top: 31px;
        box-sizing: border-box;
        display: flex;
        -webkit-appearance:none; /*去除input默认样式*/
        line-height: 1;
    }
    .outUserInput input{
        height: 24px;
        border: 0px;
        padding: 0px 0px 9px 10px;
        border-bottom: 1px #E5E5E5 solid;
        border-radius: 0px;
        -webkit-appearance:none; /*去除input默认样式*/
        line-height: 1;
    }
    .outUserInput ~ div{
        left:10px;
        position: relative;
        top: 5px
    }
    .outUserInput input:focus{
        border-bottom: 1px #37BAA0 solid;
        -webkit-appearance:none; /*去除input默认样式*/
        line-height: 1;
    }
    .outUserInput span{
        padding-top: 18px;
        height: 25px
    }
    .el-form-item__content{
        width:100%
    }
</style>
