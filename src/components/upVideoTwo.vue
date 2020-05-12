<template>
    <div class="upVideoTwoContainer">
        <div class="process">
            <p>上传页面中，请勿关闭</p>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
            <div style="display:flex;justify-content:space-between">
                <p>当前上传速度：{{shudu}}M/S</p>
                <p>已上传：{{dangqian}}M/{{yigong}}M</p>
                <p>剩余时间：{{data}}</p>
            </div>
        </div>
        <br>
        <div class="form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                <el-form-item style="width:100%" label="标题：" prop="name" >
                    <el-input v-model="ruleForm.name" placeholder="请输入标题描述（1-20字）"></el-input>
                </el-form-item>
                <div style="display:flex;justify-content:space-between" >
                    <el-form-item label="视频分类：" prop="region1" style="width:20%">
                        <el-select v-model="ruleForm.region1" placeholder="请选择活动区域" >
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>                   
                    </el-form-item>
                    <el-form-item label="标签" prop="region2" style="width:20%">
                        <el-select v-model="ruleForm.region2" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>                   
                    </el-form-item>
                    <el-form-item label="子标签" prop="region3" style="width:20%">
                        <el-select v-model="ruleForm.region3" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>                   
                    </el-form-item>
                </div>
                <el-form-item label="拍摄时间：" required >
                    <el-col :span="24">
                        <el-form-item >
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="拍摄地点：" required>
                    <el-col :span="24">
                        <el-form-item prop="place">
                            <el-cascader v-model="ruleForm.place" :options="options" clearable style="width: 100%;"></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="封面图："  prop="imageUrl" style="height:193px">
                    <el-upload
                        class="avatar-uploader   myupload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        >
                        <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" > 
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <br>

                <el-form-item class="textareaDiv" label="描述：" prop="desc" >
                    <el-input type="textarea" v-model="ruleForm.desc" placeholder="描述是对视频的详细说明，不少于十个字，不多于300字" ></el-input>
                </el-form-item>


                <el-form-item label="视频观看：" prop="resource">
                    <el-radio v-model="ruleForm.resource" label="0">所有人可见</el-radio>
                    <el-radio v-model="ruleForm.resource" label="1">所有人不可见</el-radio>
                    <font size="2" color="#d1ced6">所有人不可见：用户需在线申请，待审核通过后方可观看视频</font>
                </el-form-item>
                   

                <el-form-item label="申请审核：" prop="Auditor" required>
                        <el-select v-model="ruleForm.Auditor"  style="width:100%" placeholder="请选择视频下载审核人">
                            <el-option label="默认超管审核人" value="0"></el-option>
                            <el-option label="自定义审核人" value="1"></el-option>
                        </el-select>              
                </el-form-item>            
                <el-form-item v-if="ruleForm.Auditor == 1">
                    <div style="display:flex;justify-content:space-between;width:100%">
                        
                        <el-form-item class="my_item_style" label="工号：" prop="auditorCode" >
                            <el-input @blur="func()" v-model="ruleForm.auditorCode" placeholder="请输入" style="width:50%"></el-input>
                        </el-form-item >

                        <el-form-item class="my_item_style" label="姓名" prop="auditorName" >
                            <el-input v-model="ruleForm.auditorName" placeholder="请输入" style="width:50%"></el-input>
                        </el-form-item>

                        <el-form-item class="my_item_style" label="电话" prop="auditorNumber" >
                            <el-input v-model="ruleForm.auditorNumber" placeholder="请输入" style="width:50%"></el-input>
                        </el-form-item>
                    </div>
                </el-form-item>

                <el-form-item label="管理员分类" prop="adminClass">
                    <el-radio v-model="ruleForm.adminClass" label="0">是</el-radio>
                    <el-radio v-model="ruleForm.adminClass" label="1">否</el-radio>
                    <font size="2" color="#d1ced6">禁用后管理员将无法修改视频分类</font>
                </el-form-item>
                    

                <el-form-item label="管理员推荐" prop="adminRecom">
                    <el-radio v-model="ruleForm.adminRecom" label="0">是</el-radio>
                    <el-radio v-model="ruleForm.adminRecom" label="1">否</el-radio>
                    <font size="2" color="#d1ced6">禁用后管理员将无法将视频发布到精选推荐栏目</font>
                </el-form-item>

                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" style="background-color:#37BAA0">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
          </div>  
    </div>
</template>
<script>
export default {
    data(){
        var validatePass = (rule,value,callback) =>{
          if(value === ''){
              callback(new Error('请填写视频描述'));
          }else if(value.length > 300){
            //   console.log(value.length)
                let overNub = value.length - 300
              callback(new Error('文字已超出' + overNub + '个'    ))
          }else{
              callback();
          }
        }
        var validatePass2 = (rule,value,callback) =>{
          if(value === ''){
              callback(new Error('请输入标题'));
          }else if(value.length > 20){
            //   console.log(value.length)
                let overNub = value.length - 20
              callback(new Error('文字已超出' + overNub + '个'    ))
          }else{
              callback();
          }
      }
        return{
        options2: [],
        list: [],
        loading: false,
        // states: [
        //     {value:'2017887',label:"王五", },
        //     {value:'2017888',label:"张三",} ,
        //     {value:'2017889',label:"李四",}
        // ],
            // haha:'',
            // xixi:'',
            shudu:'1.00',
            dangqian:'10',
            yigong:'100',
            data:'00:50:00',
            // value1:'',
            today:"2017-06-01",
            // labelPosition:'left',
            // ixixhaha:'right',
            ruleForm: {
                name: '',
                region1: '',
                region2: '',
                region3: '',
                date1: '2019-8-13',
                // delivery: false,
                // type: [],
                resource: '0',
                desc: '',
                place:'',
                Auditor: '',
                imageUrl: '',
                auditorCode:'',
                auditorName:'',
                auditorNumber:'',  
                // visible:'',  
                // download:'', 
                // visibleCode: [],
                adminClass:'',
                adminRecom:''
            },
        options: [{
          value: 'guonei',
          label: '国内',
            children: 
                [{
                value: 'shandong',
                label: '山东',
                    children: [{
                            value: 'qingdao',
                            label: '青岛'
                        }, {
                            value: 'jinan',
                            label: '济南'
                        }, {
                            value: 'weihai',
                            label: '威海'
                        }, {
                            value: 'rizhao',
                            label: '日照'
                        }]
                }, 
                {
                value: 'shanghai',
                label: '上海',
                },                
                {
                value: 'beijing',
                label: '北京',
                },
                {
                value: 'shenzhen',
                label: '深圳',
                },
                ]
        },
        {
          value: 'guowai',
          label: '国外',
            children: 
                [{
                value: 'shejiyuanze',
                label: '毛里求斯',
                }, 
                {
                value: 'daohang',
                label: '新西兰',
                }]
        },
        ],
            rules: {
                name: [
                    { required: true, validator:validatePass2,trigger: 'blur' },
                ],
                region1: [
                    { required: true, message: '请选择一个属性', trigger: 'change' }
                ],
                region2: [
                    { required: true, message: '请选择一个属性', trigger: 'change' }
                ],
                region3: [
                    { required: true, message: '请选择一个属性', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                // type: [
                //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                // ],


                resource: [
                    { required: true, message: '视频可见', trigger: 'change' }
                ],
                adminClass: [
                    { required: true, message: '请选择是否管理员分类', trigger: 'change' }
                ],
                adminRecom: [
                    { required: true, message: '请选择是否管理员推荐', trigger: 'change' }
                ],


                desc: [
                    { required: true, validator:validatePass,trigger: 'blur' }
                ],
                place:[
                    { required: true, message: '请填写拍摄位置', trigger: 'blur' }
                ],
                Auditor:[
                    { required: true, message: '请填写审核人', trigger: 'blur' }
                ],
                imageUrl:[
                    { required: true, message: '请上传封面图', trigger: 'blur' }
                ],
                auditorCode:[
                    { required: true, message: '请填写工号', trigger: 'blur' }
                ],                 
                auditorName:[
                    { required: true, message: '请填写名字', trigger: 'blur' }
                ],                 
                auditorNumber:[
                    { required: true, message: '请填写电话', trigger: 'blur' }
                ], 
                // visible:[
                //     { required: true, message: '请填写电话', trigger: 'change' }
                // ], 
                // visibleCode:[
                //     { required: true, message: '请填写可观看人', trigger: 'change' }
                // ], 
            }
        }
    },
    mounted() {
    //   this.list = this.states.map(item => {
    //     return { value: item.value, label: item.label };
    //   });
    },
    methods: {
    // 提交表单
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      
       handleAvatarSuccess(res, file) {
        this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    func(){
        console.log('ok')
    },
    func2(){
        console.log(this.options2)
        console.log(this.ruleForm.visibleCode)
    },

    remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options2 = this.list.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options2 = [];
        }
      }
  }
}
</script>
<style scoped>
.upVideoTwoContainer{
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
}
.process{
    background-color: whitesmoke;
    padding: 10px 20px
}
p{
    text-align: center;
}
span{
    width: 20%;
}
input{
    background-color: whitesmoke;
    border: 0;
    border-radius: 4px;
    height: 40px;
    padding: 4px 20px;
    box-sizing: border-box;
    width: 100%
}
.form{
    width: 80%;
}
.form .el-form-item{
    margin-bottom:10px
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.textareaDiv{
    height: 150px
}
</style>
<style>
.el-progress-bar__inner{
    background-color: #37BAA0
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.el-cascader-panel{
    min-height: 100px;
}
.myupload > div{
    background-color:white
}
.form .el-form-item__error{
    position: static!important;
}
.my_item_style{
    margin-left:0px;
    width: 33.3%
}
.my_item_style > div{
    margin-left:0px!important;
}
.my_item_style  .el-form-item__error{
    padding-left: 100px
}
.textareaDiv textarea{
    height: 120px;
    max-height: 120px
}
</style>