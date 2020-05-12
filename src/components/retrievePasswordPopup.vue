<template>
    <div>
        <el-dialog
            :visible.sync="dialogVisible"
            :close-on-click-modal='false'
            :lock-scroll="false"
            class="wode"
            >
            <!-- <h1>这是修改手机号的界面</h1> -->
            <div class="stepdiv">
                <el-steps :active="active" finish-status="success">
                    <el-step title="安全验证" ></el-step>
                    <el-step title="重置密码" ></el-step>
                    <el-step title="操作成功" ></el-step>
                </el-steps>
            </div>
            <br>
            <div v-if="active == 1" style="width:100%">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item prop="oldMobile" style="width:100%;height:40px;padding:0px;margin:0px">
                        <el-input v-model="ruleForm.oldMobile" placeholder="请输入手机号" ></el-input>
                    </el-form-item>
                    <br>
                    <br>
                    <div style="display:flex;justify-content: space-between" >
                        <el-form-item prop="oldMobileCode" style="width:75%;height:40px;padding:0px;margin:0px">
                            <el-input style="width:100%" v-model="ruleForm.oldMobileCode" placeholder="请输入短信验证码" ></el-input>
                        </el-form-item>
                        <div class="getMessCode aSty">
                            <span v-show="show"  @click="getCode()">获取验证码</span>
                            <span v-show="!show" class="count">重新发送({{count}})</span>                        
                        </div>
                    </div>
                    <div class="btnDiv">
                        <div class="aSty" style="background-color:#DFF1EE" @click="dialogVisible = false;resetForm()"> 
                            <span  style="color:#7B8D89" >取消</span>
                        </div>
                        <div  class="aSty" style="background-color:#37BAA0" @click="submitForm()">
                            <span  style="color:#FFFFFF" >下一步</span>
                        </div>
                    </div>
                </el-form>
            </div>

            <div v-if="active == 2" style="width:100%">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item prop="password" style="width:100%;height:40px;padding:0px;margin:0px">
                        <el-input v-model="ruleForm.password" placeholder="密码长度为6-20位，字母，数字，字符至少两种" show-password></el-input>
                    </el-form-item>
                    <br>
                    <br>
                    <el-form-item prop="agPassword" style="width:100%;height:40px;padding:0px;margin:0px">
                        <el-input style="width:100%" v-model="ruleForm.agPassword" placeholder="请再次输入密码" show-password></el-input>
                    </el-form-item>
                    <div class="btnDiv">
                        <div class="aSty" style="background-color:#DFF1EE" @click="dialogVisible = false;resetForm()"> 
                            <span  style="color:#7B8D89" >取消</span>
                        </div>
                        <div  class="aSty" style="background-color:#37BAA0" @click="submitForm2('ruleForm')">
                            <span  style="color:#FFFFFF" >提交</span>
                        </div>
                    </div>
                </el-form>
            </div>
            
            <div v-if="active == 3" style="width:100%;height:100px;display:flex;justify-content: center;align-items: center">
                <span>恭喜你，修改密码成功！(两秒后自动关闭))</span>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
import service from '../API/request';
import configAPI from '../API/configAPI';
import Qs from 'qs'
export default {
    data(){
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (!(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(value))) {
                    this.$message.error(('输入密码格式错误'))
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else if (!(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/.test(value))) {
                    callback(new Error('输入密码格式错误'))
            } else {
                callback();
            }
        };
        return{
            active:1,
            dialogVisible:false,
            show: true,
            count: '',
            timer: null,
            ruleForm:{
                oldMobile:'',
                oldMobileCode:'',
                password:'',
                agPassword:''
            },
            rules:{
                oldMobileCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
                password: [
                    { validator: validatePass , trigger: 'change' },
                ],
                agPassword: [
                    { validator: validatePass2 ,trigger: 'change' },
                ],
            }
        }
    },
    watch: {
        active:{
            handler(newName,oldName){
                if(newName == 3){
                    setTimeout(()=>{
                        this.dialogVisible = false
                        this.active = 1
                        this.ruleForm.oldMobileCode = '',
                        this.ruleForm.password = '',
                        this.ruleForm.agPassword = ''
                    },2000)
                }
            },
      }
    },
    methods:{
        chang(){
          this.dialogVisible = true
        },
        submitForm(formName) {
            if(this.ruleForm.oldMobile == ''){
                console.log('为空')
            }if(this.ruleForm.oldMobileCode == ''){
                console.log('为空')
            }else{
                service.get(configAPI.checkMesscode_url,{
                    params:{
                        phone:this.ruleForm.oldMobile,
                        code:this.ruleForm.oldMobileCode
                    }
                }).then(result=>{
                    console.log(result)
                    this.active ++
                }).catch((err)=>{
                    console.log(err.msg)
                    this.$message.error(err.msg)
                })
            }
        },
        submitForm2(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    let params = Qs.stringify({
                        phone:this.ruleForm.oldMobile,
                        password:this.ruleForm.agPassword,
                        code:this.ruleForm.oldMobileCode
                    })
                    service.put(configAPI.changPassword_url + params,{

                    }).then(result => {
                        console.log(result)
                        this.active++
                    }).catch((err)=>{
                        console.log(err)
                        this.$message.error(err.msg)
                    })
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            this.ruleForm.oldMobile = '',
            this.ruleForm.oldMobileCode = '',
            this.ruleForm.password = '',
            this.ruleForm.agPassword = ''
            this.active = 1
        },
        getCode(){
            if(!(/^1[3-9][0-9]{9}$/.test(this.ruleForm.oldMobile))){
                // console.log('手机号格式不正确')
                this.$message.error('手机号格式不正确')
            }else{
                //获取手机验证码
                service.get(configAPI.getMobileCode_url,{
                    params:{
                        phone:this.ruleForm.oldMobile
                    }
                }).then(result=>{
                    console.log(result)
                })

                this.$message.success({
                    dangerouslyUseHTMLString: true,
                    duration:6000,
                    message:'手机验证码服务尚未开通，默认手机验证码为 <strong>" 987023 "</strong>'
                })

                this.shoeTip = false
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
            }   
        },
    },
    created(){
        // this.ruleForm.oldMobile = localStorage.getItem("phone")
    }

}
</script>
<style scoped>
    .stepdiv{
        width: 100%;
        height: 100px;
        /* margin: 0 auto; */
        box-sizing: border-box;
    }
    .getMessCode{
        width: 20%;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #DCDFE6;
        border-radius:4px
    }
    .aSty{
        cursor:pointer
    }
    .btnDiv{
        width:100%;height:40px;margin-top:3vw;padding: 0 20%;box-sizing:border-box;display: flex;justify-content: space-between
    }
    .btnDiv div{
        width:44.4%;
        height:100%;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center
    }
    .btnDiv span{
        font-size:0.83vw;
        line-height: 1;
    }
</style>
<style >
 .wode .el-dialog__body{
     padding: 30px 5vw
 }
</style>
