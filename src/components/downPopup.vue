<template>
    <div>
        <el-dialog
                title="视频下载备案"
                :visible.sync="dialogVisible"
                width="30%"
                :close-on-click-modal='false'
                :lock-scroll="false"
                >
                <!-- <span>这是一段信息</span> -->
                <el-form :label-position='left' :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
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

                </el-form>
                <div class="btnDiv">
                    <div class="aSty" style="background-color:#DFF1EE" @click="dialogVisible = false;resetForm('ruleForm')"> 
                        <span  style="color:#7B8D89" >取消</span>
                    </div>
                    <div  class="aSty" style="background-color:#37BAA0" @click="submitForm('ruleForm')">
                        <span  style="color:#FFFFFF" >提交</span>
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
        //       callback(new Error('请填写使用用途'));
        //   }else if(value.length > 30){
        //     let overNub = value.length - 20
        //       callback(new Error('文字已超出' + overNub + '个'))
        //   }else{
        //       callback();
        //   }
        // }
      return {
        checkColl:true,
        checkDown:true,
        dialogVisible:false,
        left:'left',
        ruleForm: {
        name: '',
        user: '1',
        activity:'',
        channel:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入媒体名称', trigger: 'blur' },
          ],
          user: [
            { required: true, message: '请填写使用渠道', trigger: 'blur' }
          ],
          activity:[
              { required:true, message: '请填写使用用途',trigger:'blur'}
          ],
          channel:[
              { required:true,message:'请填写播放渠道',trigger:'blur'}
          ]
        }
        };
    },
    // 从调用下载组建的父组件中传递过来的视频的id
    props:['parentVideoId'],
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                // alert('submit!');
                console.log(this.parentVideoId + '下载提醒组件我的视频id')
                let params = {}
                if (this.parentVideoId)  params["video_id"] = this.parentVideoId
                if (this.ruleForm.user)  params["use_mode"] = this.ruleForm.user
                if (this.ruleForm.activity)  params["use_reason"] = this.ruleForm.activity
                if (this.ruleForm.channel)  params["play_way"] = this.ruleForm.channel
                if (this.ruleForm.name)  params["media_name"] = this.ruleForm.name
                console.log(params)

                service.post(configAPI.addDown_url +  Qs.stringify(params),{
                   
                }).then( result =>{
                    console.log(result)
                    this.$message.success('申请已提交，请等待审核，并注意查收系统消息及邮件通知!')
                    this.dialogVisible = false;
                    this.$refs[formName].resetFields();
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
        }
    }
}
</script>
<style scoped>
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
</style>
<style>
    .el-dialog__headerbtn{
        display: none
    }
    .el-dialog__header{
        text-align: center
    }
    .el-dialog__title{
        font-size: 0.9375vw;
        line-height: 1
    }
    .xixi > div{
        margin-left: 0px!important;
        box-sizing: border-box;
        padding-left: 100px;
    }
    .el-select{
        width: 100%
    }
    /* textarea{
        max-height: 80px!important;
        min-height: 40px!important;
    } */
    .el-dialog{
        border-radius: 10px
    }
    .xixi textarea{
        max-height: 4.89vw!important;
        min-height: 4.89vw!important;
        height: 4.89vw;
    }
</style>