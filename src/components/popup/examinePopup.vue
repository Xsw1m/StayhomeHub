<template>
    <el-dialog
        class="myDialog"
        title="视频观看、下载申请审核"
        :visible.sync="dialogVisible"
        :close-on-click-modal = false
        width="40%"
        :before-close="handleClose">
    <el-form  :model="ruleForm" status-icon ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm examineDiv">
        <el-form-item class="textarea" label="观看意图：" prop="whyWatch"  >
            <el-input type="textarea" v-model="ruleForm.whyWatch" placeholder="请填写观看意图描述"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="使用渠道：" >
            <el-input v-model="ruleForm.useChannel"  placeholder="请选择视频下载使用渠道" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="播放渠道：" >
            <el-input v-model="ruleForm.playChannel"  placeholder="请填写观看意图描述" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="媒体名称：" >
            <el-input v-model="ruleForm.mediaName"  placeholder="请填写观看意图描述" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item class="textarea" label="使用用途：" >
            <el-input type="textarea" v-model="ruleForm.usePurpose"  placeholder="请填写观看意图描述" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="审核操作：" >
            <el-radio v-model="ruleForm.check" label="1">待审核</el-radio>
            <el-radio v-model="ruleForm.check" label="2">审核通过</el-radio>
            <el-radio v-model="ruleForm.check" label="3">审核拒绝</el-radio>
        </el-form-item>
        <!-- 待审核不用填写,审核通过可不填,审核拒绝一定填 -->
        <el-form-item v-if="ruleForm.check == 2" class="textarea" >
            <el-input type="textarea" v-model="ruleForm.whyPass"  placeholder="请填写审核通过备注(1-100),非必填" maxlength="100" show-word-limit ></el-input>
        </el-form-item>
        <div>
            <el-form-item v-if="ruleForm.check == 3" class="textarea" prop="whyRefuse">
                <el-input type="textarea" v-model="ruleForm.whyRefuse"  placeholder="请填写审核拒绝原因(1-100),必填" maxlength="100" show-word-limit></el-input>
            </el-form-item>
        </div>
        <!-- <el-form-item class="subimDiv">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item> -->
        <div class="subimDiv" >
            <div class="btn aSty" style="background-color: #DFF1EE;" @click="handleClose()">
                <span style="font-size:17px">取消</span>
            </div>
            <div class="btn aSty" style="background-color: #37BAA0;" @click="submitForm('ruleForm')">
                <span style="font-size:17px;color:white">确定</span>                
            </div>
        </div>
    </el-form>
    </el-dialog>
</template>
<script>
export default {
    data() {
      return {
        dialogVisible:false,
        ruleForm: {
            whyWatch: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
            useChannel:'',
            playChannel:'',
            mediaName:'',
            usePurpose:'',
            check:'1',
            whyPass:'',
            whyRefuse:''
        },
        rules: {
          whyRefuse: [
            {required: true, message: '请填写', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      handleClose() {
        this.$confirm('确认关闭？')
          .then(_ => {
            // done();
            this.dialogVisible = false,
            this.clear()
          })
          .catch(_ => {});
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //   resetForm(formName) {
    //     this.$refs[formName].resetFields();
    //   },
      clear(){
            this.whyPass = '',
            this.whyRefuse = ''
      },
      opDialog(){
          this.dialogVisible = true
      }
    }
}
</script>
<style scoped>
    .subimDiv{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width:100%;
        height:50px
    }
    .btn{
        width: 140px;
        height: 80%;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .aSty{
        cursor:pointer;
    }
</style>
<style>
    .examineDiv .el-form-item__content{
        width:80%
    }
    .myDialog  .el-dialog{
        margin-top: 50px!important
    }
    .myDialog  .el-dialog__title{
        font-size: 15px;
        font-weight:bold;
    }
    .textarea > div {
        height: 100px!important
    }
    .textarea textarea{
        max-height: 89px;
        height: 89px;
        min-height: 89px!important
    }
</style>