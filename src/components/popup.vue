<template>
    <div>
        <!-- title="视频观看，下载备案" -->
        <el-dialog
            class="heihei"
            :visible.sync="dialogVisible"
            width="440px"
            :close-on-click-modal='false'
            :lock-scroll="false"
            >
            <div style="display:flex;justify-content:space-around">
                <div v-if="top == 1" class="Top aSty"  >
                    <span style="color:white">视频观看，下载备案</span>
                </div>
                <div v-if="top == 2" class="TopNo aSty" @click="Gotemporary()">
                    <span>视频观看，下载备案</span>
                </div>
                <div v-if="top == 2" class="Top aSty"  >
                    <span style="color:white">账号临时权限申请</span>
                </div>
                <div v-if="top == 1" class="TopNo aSty"  @click="Go()">
                    <span>账号临时权限申请</span>
                </div>
            </div>
            <br>
            <br>
            <!-- 视频观看，下载备案 -->
            <div v-if="top == 1">
                <el-form :label-position='left' :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >

                    <el-form-item  class="xixi" label="观看意图" prop="whywatch" style="height:4.89vw">
                        <el-input type="textarea" v-model="ruleForm.whywatch" placeholder="请如实填写视频使用详情"></el-input>
                    </el-form-item>

                    <el-form-item style="margin-bottom:0px"  class="xixi" label="是否下载" prop="radio" >
                        <el-radio v-model="ruleForm.radio" label="1">是</el-radio>
                        <el-radio v-model="ruleForm.radio" label="2">否</el-radio>
                    </el-form-item>
                    <span style="color:#999999;margin-left:100px;font-size:0.7vw">所有人不可见：用户需在线申请，待申请通过后方可观看视频</span>

                    <div v-if="ruleForm.radio == 1">
                        <div style="height:18px;width:100%"></div>
                        <el-form-item class="xixi" label="使用渠道" prop="user" style="width:100%">
                            <el-select v-model="ruleForm.user" >
                                <el-option label="集团内部使用" value="1"></el-option>
                                <el-option label="集团外部使用" value="2"></el-option>
                                <el-option label="外部媒体使用" value="3"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item v-if="ruleForm.user == 2" class="xixi" label="播放渠道" prop="channel">
                            <el-input v-model="ruleForm.channel"></el-input>
                        </el-form-item>

                        <el-form-item v-if="ruleForm.user == 3" class="xixi" label="媒体名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>

                        <el-form-item  class="xixi" label="使用用途" prop="activity" >
                            <el-input type="textarea" v-model="ruleForm.activity" placeholder="请如实填写视频使用详情"></el-input>
                        </el-form-item>
                    </div>

                </el-form>
                <div class="btnDiv">
                    <div class="aSty" style="background-color:#DFF1EE" @click="dialogVisible = false;resetForm('ruleForm')"> 
                        <span  style="color:#7B8D89" >取消</span>
                    </div>
                    <div  class="aSty" style="background-color:#37BAA0" @click="submitForm('ruleForm')">
                        <span  style="color:#FFFFFF" >提交</span>
                    </div>
                </div>
            </div>
            <!-- 账号临时权限 -->
            <div v-if="top == 2">
                <div style="height:260px;">
                    <div class="center" style="height:40px">
                        <span style="font-size:5px">临时权限审核通过后可在24小时内查看History视频库网站的全部视频，超时后权限自动关闭</span>
                    </div>
                    <div class="center" style="height:40px">
                        <span style="font-size:9px">申请模板：</span>
                        <a href="" @click.prevent="ok()" style="font-size:9px;color:#37BAA0;text-decoration:none">History视频库账号临时权限申请文档下载</a>
                    </div>
                    <div class="center" style="height:80px">
                        <div class="center aSty" style="height:40%;width:120px;border-radius: 10px;background-color:#37BAA0;"  @click="$refs.inputFile.click()"> 
                            <span style="font-size:12px;color:white">点击上传申请文档</span>
                        </div>
                        <input type="file" name="" id="file" @change="onFileChange" ref="inputFile" style="display:none">
                    </div>
                    <div class="center" style="height:40px">
                        <a v-if="file" href="" @click.prevent="downFile()" style="font-size:9px;color:#37BAA0;text-decoration:none">{{fileName}}上传已加载完成，点击可下载预览</a>
                        <span v-else style="font-size:9px;">如果文件上传成功，此处可显示</span>
                    </div>
                    <div class="center" style="height:60px;justify-content: space-around;padding:0 70px 0 70px;box-sizing:border-box">
                        <div v-if="file" @click="ok()" class="center aSty" style="height:40%;width:80px;border-radius: 10px;background-color:#37BAA0;">
                            <span style="font-size:12px;color:white">提交</span>
                        </div>
                        <div v-else class="center aSty" style="height:40%;width:80px;border-radius: 10px;background-color:#E5EEEC;">
                            <span style="font-size:12px;">暂无文件</span>
                        </div>
                        <div class="center aSty" style="height:40%;width:80px;border-radius: 10px;background-color:#E5EEEC;" @click="dialogVisible = false;claer()">
                            <span style="font-size:12px;">取消</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import service from '../API/request';
import configAPI from '../API/configAPI';
import Qs from 'qs'
export default {
    data(){
        // var validatePass3 = (rule,value,callback) =>{
        //   if(value === ''){
        //       callback(new Error('请填写内容'));
        //   }else if(value.length > 30){
        //     let overNub = value.length - 20
        //       callback(new Error('文字已超出' + overNub + '个'    ))
        //   }else{
        //       callback();
        //   }
        // }
        return{
            dialogVisible:false,
            left:'left',
            top: 1,   // 1 是视频观看，下载备案    2 是账号临时权限申请
            file:'',
            fileName:'',
            ruleForm: {
                name: '',
                user: '1',
                whywatch:'',
                activity:'',
                channel:'',
                radio:'2',
            },
            rules: {
                name: [
                    { required: true, message: '请输入媒体名称', trigger: 'blur' },
                ],
                user: [
                    { required: true, message: '请填写使用渠道', trigger: 'blur' }
                ],
                radio:[
                    { required: true, message: '是否下载', trigger: 'blur' }
                ],
                activity:[
                    { required:true,message: '请填写使用用途',trigger:'blur'}
                ],
                whywatch:[
                    { required:true,message: '请填写观看用途',trigger:'blur'}
                ],
                channel:[
                    { required:true,message:'请填写播放渠道',trigger:'blur'}
                ]
            }
        }
    },
    // 从调用下载组建的父组件中传递过来的视频的id
    props:['videoId'],
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log(this.videoId + '视频观看提醒组件我的视频id')
                if(this.ruleForm.radio == 1){
                    let params = {}
                    if (this.videoId)  params["video_id"] = this.videoId
                    if (this.ruleForm.user)  params["use_mode"] = this.ruleForm.user
                    if (this.ruleForm.activity)  params["use_reason"] = this.ruleForm.activity
                    if (this.ruleForm.channel)  params["play_way"] = this.ruleForm.channel
                    if (this.ruleForm.name)  params["media_name"] = this.ruleForm.name
                    console.log(params)

                    service.post(configAPI.addDown_url +  Qs.stringify(params),{
                    
                    }).then( result =>{
                        console.log(result)
                        this.$message.success('申请已提交，请等待审核，并注意查收系统消息及邮件通知!')
                        // this.dialogVisible = false;
                        // this.$refs[formName].resetFields();
                    }).catch( (err) => {
                        this.$message.error(err.msg)
                    })
                }

                let params = Qs.stringify({
                    video_id:this.videoId,
                    apply_reason:this.ruleForm.whywatch
                })
                service.post(configAPI.addWatch_url + params,{

                }).then(result => {
                    console.log(result)
                    this.dialogVisible = false;
                    this.$refs[formName].resetFields();
                    this.$message.success('观看申请提交成功！')
                }).catch( (err) => {
                    this.$message.error(err.msg)
                })
                
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        chang(){
            this.dialogVisible = true
        },
        Gotemporary(){
            this.top = 1
        },
        Go(){
            this.top = 2
            console.log(this.top)
        },
        onFileChange(e){
            // 拿到了文件
            console.log(e)
            console.log(e.target.files[0])
            console.log(e.target.files[0].name)
            this.file = e.target.files[0]
            this.fileName = e.target.files[0].name
            // var a = window.URL.createObjectURL(e.target.files[0])
        },
        downFile(){
            var aLink = document.createElement('a') 
            aLink.download = '预览文件' 
            aLink.href =  window.URL.createObjectURL(this.file)
            aLink.click() 
            console.log(aLink)
        },
        claer(){
            this.top = 1
            this.file = ''
            this.fileName = ''
            var file = document.getElementById('file');
            file.value = ''; //虽然file的value不能设为有字符的值，但是可以设置为空
        },
        ok(){
            this.$message.error('暂无此功能，请耐心等待更新！')
        }
    }
}
</script>
<style  scoped>
    .aSty{
        cursor:pointer
    }
    .btnDiv{
        width:100%;height:2.08vw;margin-top:3vw;padding: 0 20%;box-sizing:border-box;display: flex;justify-content: space-between
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
    .Top{
        height:40px;
        width:146px;
        display:flex;
        align-items: center;
        background-color:#37BAA0;
        justify-content: center;
        border-radius: 10px;
    }
    .TopNo{
        height:40px;
        width:146px;
        display:flex;
        align-items: center;
        background-color:#E5EEEC;
        justify-content: center;
        border-radius: 10px;
    }
    .center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
<style>
    .heihei  .el-dialog__header{
        display: none
    }
</style>