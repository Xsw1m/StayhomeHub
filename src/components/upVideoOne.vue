<template>
<div style="width:100%;height:100%">

    <div v-if="upClick == 0 && adminVideoId == undefined">
        <div class="mainTop" style="position:relative;">
            <div style="background-color: white;width:100%;height:100%"  v-loading="loading" element-loading-text="请耐心等待，视频加载中...">
                <div style="height: 65%;display:flex;justify-content:center;align-items:center">
                    <div  class="aSty"
                    style="background-color:#F4F4F4;width:10.4vw;height:10.4vw;display:flex;justify-content:center;align-items:center;border-radius: 50%"
                    @click="$refs.inputFile.click()">
                        <img src="../images/personal-up-upicon.png" alt="" style="width:3.4vw;height:2.6vw">
                    </div>
                    <!-- 上传的input，隐藏掉了，用上面的去触发 -->
                    <input type="file" id="videoFile" @change="onFileChange" ref="inputFile" style="display:none">
                </div>
                <div style="width:100%;height:28.5%;display:flex;justify-content:center">
                    <span style="font-size:0.78vw" @click="test">请选择要上传的视频</span>
                </div>
                <div style="width:100%;text-align:center">
                    <span style="font-size:0.625vw;color:#999999">上传视频，即表示您已同意<a href="" @click.prevent="func" style="text-decoration:none;color:#E9A786;">上传服务条款</a>，请勿上传色情及反动等违法视频</span>
                </div>
            </div>
        </div>
        <div class="mainBottom">
            <div style="display:flex;justify-content:space-around;width:50.7%;margin:0 auto;height:4.9vw;padding-top:8%;box-sizing:border-box">
                <el-popover
                    placement="bottom"
                    width="200"
                    trigger="hover"
                    content="每天上传视频暂无数量限制。">
                    <span class="bottomTips aSty"  slot="reference">上传数量</span>
                </el-popover>
                <div style="width:1px;height:8px;background-color:#98B1AC"></div>
                <el-popover
                    placement="bottom"
                    width="200"
                    trigger="hover"
                    content="视频最大不能超过5G。">
                    <span class="bottomTips aSty"  slot="reference">视频大小</span>
                </el-popover>
                <div style="width:1px;height:8px;background-color:#98B1AC"></div>
                <el-popover
                    placement="bottom"
                    width="200"
                    trigger="hover"
                    content="视频时长最短不能低于10s。">
                    <span class="bottomTips aSty"  slot="reference">视频时长</span>
                </el-popover>
                <div style="width:1px;height:8px;background-color:#98B1AC"></div>
                <el-popover
                    placement="bottom"
                    width="200"
                    trigger="hover"
                    content="所有主流视频格式均可上传。">
                    <span class="bottomTips aSty"  slot="reference">视频规格</span>
                </el-popover>
                <!-- <button @click="tiaozhuan()">下一步</button>     -->
            </div>
        </div>
        <!-- <uploadDemo></uploadDemo> -->
    </div>


    <div v-if="upClick == 1 || adminVideoId !== undefined " class="upVideoTwoContainer">
        <div v-if="adminVideoId == undefined " class="process">
            <p v-if="(uploaderInfos[0].progress * 100) == 100">上传成功！请继续填写内容！</p>
            <p v-if="(uploaderInfos[0].progress * 100) < 100">上传中，请勿关闭页面</p>
            <el-progress :text-inside="true" :stroke-width="26" :percentage = "(uploaderInfos[0].progress * 100)"></el-progress>
            <div v-if="(uploaderInfos[0].progress * 100) < 100" style="display:flex;justify-content:space-between">
                <p>当前上传速度：{{speed}}M/S</p>
                <p>已上传：{{current}}M/{{videoSize}}M</p>
                <p v-if="Surplus == 'NaN秒'">剩余时间：暂无</p>
                <p v-else>剩余时间：{{Surplus}}</p>
                <el-button type="error" @click="uploaderInfos[0].cancel()">取消上传</el-button>
            </div>
        </div>
        <br>
        <div class="form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm" >
                <el-form-item style="width:100%" label="标题：" prop="name" >
                    <el-input v-model="ruleForm.name" placeholder="请输入标题描述（1-50字）"></el-input>
                </el-form-item>
                <div style="display:flex;justify-content:space-between" >
                    <el-form-item label="视频分类：" prop="region1" style="width:40%">
                        <el-select v-model="ruleForm.region1" placeholder="请选择视频分类" @change="getTwoClass()">
                            <el-option
                                v-for="item in region1options"
                                :key="item.id"
                                :label="item.column_name"
                                :value="item.id"
                                >
                            </el-option>
                        </el-select>                   
                    </el-form-item>
                    <el-form-item v-if="showClassTwo" label="子标签" prop="region2" style="width:40%">
                        <el-select v-model="ruleForm.region2" placeholder="请选择子标签">
                            <el-option
                                v-for="item in region2options"
                                :key="item.id"
                                :label="item.column_name"
                                :value="item.id"
                                >
                            </el-option>
                        </el-select>                   
                    </el-form-item>
                </div>
                <el-form-item label="拍摄时间：" required >
                    <el-col :span="24">
                        <el-form-item  prop="date1">
                            <el-date-picker type="date"  placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <div style="display:flex;justify-content:space-between" >

                    <el-form-item label="拍摄地点：" prop="country" style="width:20%">
                        <el-select v-model="ruleForm.country" placeholder="请选择拍摄地点" @change="getAllProvince()">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                            </el-option>
                        </el-select>                   
                    </el-form-item>

                    <el-form-item v-if="showPlace" label="省：" prop="province" style="width:20%">
                        <el-select v-model="ruleForm.province" placeholder="请选择拍摄地点" @change="getAllCity()">
                            <el-option
                                v-for="item in options4"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name"
                            >
                            </el-option>
                        </el-select>                   
                    </el-form-item>

                    <el-form-item v-if="showPlace" label="市" prop="city" style="width:20%">
                        <el-select v-model="ruleForm.city" placeholder="请选择拍摄地点">
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
                <el-form-item label="封面竖图："  prop="imageUrl" style="height:250px">
                    <upImgTemplate class="myUploadOne" @getImUrl="getImUrl1" v-bind:parentUrl="this.ruleForm.imageUrl"></upImgTemplate>
                </el-form-item>
                <el-form-item style="height:20px"><font size="2" color="#37BAA0">这是竖图尺寸: 564px x 692px</font></el-form-item>
                <br>
                <el-form-item label="封面横图："  prop="imageUrl2" style="height:186px">
                    <upImgTemplatehorizontal class="myUploadTwo" @getImUrl="getImUrl2" v-bind:parentUrl="this.ruleForm.imageUrl2"></upImgTemplatehorizontal>
                </el-form-item>
                <el-form-item style="height:20px"><font size="2" color="#37BAA0">这是横图尺寸: 564px x 332px</font></el-form-item>
                <br>
                <el-form-item class="textareaDiv" label="描述：" prop="desc" >
                    <el-input type="textarea" v-model="ruleForm.desc" placeholder="描述是对视频的详细说明，不少于十个字，不多于300字" ></el-input>
                </el-form-item>


                <el-form-item label="视频观看：" prop="resource">
                    <!-- <el-radio v-model="ruleForm.resource" label="1">所有人可见</el-radio> -->
                    <!-- <el-radio v-model="ruleForm.resource" label="2">所有人不可见</el-radio> -->
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio :label="1">所有人可见</el-radio>
                        <el-radio :label="2">所有人不可见</el-radio>
                    </el-radio-group>
                    <font size="2" color="#d1ced6">所有人不可见：用户需在线申请，待审核通过后方可观看视频</font>
                </el-form-item> 

                <el-form-item label="申请审核：" prop="Auditor" required>
                    <el-select v-model="ruleForm.Auditor"  style="width:100%" placeholder="请选择视频下载审核人">
                        <el-option label="默认超级管理员审核" value="0"></el-option>
                        <el-option label="自定义审核人" value="1"></el-option>
                    </el-select>              
                </el-form-item>            
                <el-form-item v-if="ruleForm.Auditor == 1">
                    <div style="display:flex;justify-content:space-between;width:100%">
                        
                        <el-form-item class="my_item_style" label="工号：" prop="auditorCode" >
                            <el-input @blur="func()" v-model="ruleForm.auditorCode" placeholder="请输入" style="width:50%"></el-input>
                        </el-form-item >

                        <el-form-item v-if="adminVideoId == undefined" class="my_item_style" label="姓名" prop="auditorName" >
                            <el-input v-model="ruleForm.auditorName" placeholder="请输入" style="width:50%"></el-input>
                        </el-form-item>

                        <el-form-item class="my_item_style" label="电话" prop="auditorNumber" >
                            <el-input v-model="ruleForm.auditorNumber" placeholder="请输入" style="width:50%"></el-input>
                        </el-form-item>
                    </div>
                </el-form-item>

                <el-form-item label="允许分类调整" prop="adminClass">
                    <!-- <el-radio v-model="ruleForm.adminClass" label="1">允许</el-radio>
                    <el-radio v-model="ruleForm.adminClass" label="2">不允许</el-radio> -->
                    <el-radio-group v-model="ruleForm.adminClass">
                        <el-radio :label="1">允许</el-radio>
                        <el-radio :label="2">不允许</el-radio>
                    </el-radio-group>
                    <font size="2" color="#d1ced6">不允许后管理员无法将无法修改视频的分类</font>
                </el-form-item>
                    

                <el-form-item label="允许首页展示" prop="adminRecom">
                    <!-- <el-radio v-model="ruleForm.adminRecom" label="1">允许</el-radio>
                    <el-radio v-model="ruleForm.adminRecom" label="2">不允许</el-radio> -->
                    <el-radio-group v-model="ruleForm.adminRecom">
                        <el-radio :label="1">允许</el-radio>
                        <el-radio :label="2">不允许</el-radio>
                    </el-radio-group>
                    <font size="2" color="#d1ced6">不允许后管理员将无法推荐视频到首页精选栏目</font>
                </el-form-item>

                
                <el-form-item>
                    <el-button v-if="!video_url && adminVideoId == undefined" type="primary" :loading="true">视频上传中..</el-button>
                    <el-button v-else type="primary" @click="adminVideoId == undefined ? submitForm('ruleForm') : changVideoInfor('ruleForm') " style="background-color:#37BAA0" >立即提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
          </div>  
    </div>
    </div>
</template>
<script>
import region from '../json/region.json'
import service from '../API/request';
import configAPI from '../API/configAPI';
import Qs from 'qs'
import Axios from '../API/http.js'
import axios from 'axios'
import TcVod from 'vod-js-sdk-v6'

//导入组件
import upImgTemplate from '../components/upImgTemplate.vue'
import upImgTemplatehorizontal from '../components/upImgTemplatehorizontal.vue'
import { Server } from 'http';

function getSignature() {
  return Axios.post('/signature').then(function (response) {
    console.log('签名', response)
    return response.data.result;
  })
}
function getAntiLeechUrl(videoUrl, callback) {
//   return axios
//     .post(
//       "https://stayhomehub-1258210079.cos.ap-beijing.myqcloud.com",
//       JSON.stringify({
//         Action: "GetAntiLeechUrl",
//         Url: videoUrl
//       })
//     )
//     .then(function(response) {
//       return response.data.data.url;
//     })
    return videoUrl
}
function test(videoUrl, callback) {
    let params = {
        Action: 'GetAntiLeechUrl',
        Url: videoUrl
    }
  return axios
    .post(
      'https://stayhomehub-1258210079.cos.ap-beijing.myqcloud.com',
      Qs.stringify(params),
      {headers: {'Content-Type': 'multipart/form-data;charset=utf-8'}}
    )
    .then(function(response) {
      return response.data.data.url;
    })
}
export default {
    components:{
        // 'uploadDemo':uploadDemo,
        'upImgTemplate':upImgTemplate,
        'upImgTemplatehorizontal':upImgTemplatehorizontal
    },
    data(){
        var validatePass = (rule,value,callback) =>{
          if(value === ''){
              callback(new Error('请填写视频描述'));
          }else if(value.length > 300){
            //   console.log(value.length)
                let overNub = value.length - 300
              callback(new Error('文字已超出' + overNub + '个'    ))
          }else if(value.length < 10){
              callback(new Error('文字低于10个'))
          }else{
              callback();
          }
        }
        var validatePass2 = (rule,value,callback) =>{
          if(value === ''){
              callback(new Error('请输入标题'));
          }else if(value.length > 50){
            //   console.log(value.length)
                let overNub = value.length - 50
              callback(new Error('文字已经超出' + overNub + '个'    ))
          }else{
              callback();
          }
        }
        var validatePass3 = (rule,value,callback) =>{
            if(value === ''){
                callback(new Error('请输入手机号'));
            }else if(!(/^1[3-9][0-9]{9}$/.test(value))){
                callback(new Error('输入手机号格式错误'))
            }else{
                callback();
            }
        }
        return{   
            // testUrl1:'https://s3.cn-northwest-1.amazonaws.com.cn/video.site/static/20190924/182245771.jpg',
            // testUrl2:'https://s3.cn-northwest-1.amazonaws.com.cn/video.site/static/20190924/182245771.jpg',
            loading:false,
            // imageUrl:'',
            myPag:4,
            upClick:0,
            options2: [],
            options: [
                    {
                    value: '国内',
                    label: '国内'
                    }, {
                    value: '国外',
                    label: '国外'
                    },
                ],
            options4:'',
            options3:'',
            list: [],
            uploaderInfos: [],
            // loading: false,
            speed:0,
            current:0,
            videoSize:0,
            Surplus:'00:00:00',
            today:"2017-06-01",
            region1options: '',
            region2options: '',
            showPlace:false,
            showClassTwo:false,
            videoName:'',
            video_url:'',  //视频地址，在上传页面获取。暂时乱编。
            video_duration:'',   //视频时长，在上传页面获取。格式为秒，暂时乱编
            videoUploadPercent:'',
            MAX_IMAGE_SIZE : 5*1024*1024*1024,
            image: '',
            uploadURL: '',
            uploadType:'',
            file:'',
            progress:0,
            altime:0,
            myIntervalStatus:true,
            wating:0,
            adminVideoId:'',
            ruleForm: {
                country:'',
                province:'',
                city:'',
                name: '',
                region1: '',
                region2: '',
                date1: '2019/12/31',
                resource: '',
                desc: '',
                place:'',
                Auditor: '',
                imageUrl: '',
                imageUrl2:'',
                auditorCode:'',
                auditorName:'',
                auditorNumber:'',  
                adminClass:'',
                adminRecom:'',
            },
            rules: {
                name: [
                    { required: true, validator:validatePass2,trigger: 'blur' },
                ],
                region1: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ],
                region2: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ],
                date1: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
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
                imageUrl2:[
                    { required: true, message: '请上传封面图', trigger: 'blur' }
                ],
                auditorCode:[
                    { required: true, message: '请填写工号', trigger: 'blur' }
                ],                 
                auditorName:[
                    { required: true, message: '请填写名字', trigger: 'blur' }
                ],                 
                auditorNumber:[
                    { required: true, validator:validatePass3, trigger: 'blur' }
                ], 
                country:[
                    { required: true, message: '请填写国家', trigger: 'change' }
                ],
                province: [
                    { required: true, message: '请填写省', trigger: 'change' }
                ],
                city: [
                    { required: true, message: '请填写城市', trigger: 'change' }
                ],
            }
        }
    },
    methods:{
        getImUrl1(data){
            console.log(data)
            console.log('12412421')
            this.ruleForm.imageUrl = data
        },
        getImUrl2(data){
            console.log(data)
            this.ruleForm.imageUrl2 = data
        },
        uploadVideo (e) {
            console.log('1.上传视频', e.target.files[0])
            const tcVod = new TcVod({
                getSignature: getSignature
            })
            // const uploader = tcVod.upload({
            //     mediaFile: e.target.files[0], // 媒体文件（视频或音频或图片），类型为 File
            // })
            // uploader.on('media_progress', function(info) {
            //     console.log('1.进度', info.percent) // 进度
            // })

            // uploader.done().then(function (doneResult) {
            //     console.log('2.成功', doneResult)
            // }).catch(function (err) {
            //     console.log('3.失败', err)
            // })
        },
        onFileChange (e) {
            console.log('1.上传视频-->', e)
            // this.loading = true

            let LocalvideoUrl = URL.createObjectURL(e.target.files[0]);
//             this.Localvideo= LocalvideoUrl; 
            this.$store.state.Localvideo = LocalvideoUrl


            console.log(e)
            console.log(e.target.files[0])
            this.videoName = e.target.files[0].name
            this.file = e.target.files[0]
            this.videoSize = parseInt(e.target.files[0].size /1024 /1024)
            console.log('前传视频大小MB：', this.videoSize)
            let files = e.target.files || e.dataTransfer.files
            // 获取图片信息，但是e.dataTransfer.files恒为空
            // console.log(e.target.files[0].duration)
            // 获取上传信息的后缀
            this.uploadType = e.target.files[0].name.split('.')[1]
            this.ruleForm.name = e.target.files[0].name.split('.')[0]
            // console.log(this.uploadType)
            // console.log(e.target.result)
            //获取录音时长
            var url = URL.createObjectURL(e.target.files[0]);
            //经测试，发现audio也可获取视频的时长
            var audioElement = new Audio(url);
            // console.log(audioElement)
            var duration;
            let add_this = this
            audioElement.addEventListener("loadedmetadata", function(_event){
                
                duration = audioElement.duration;
                add_this.video_duration  = duration
                console.log('监听视频总时长为' + add_this.video_duration + 's');
            });
            // console.log('视频总时长为' + this.video_duration);

            console.log('前传视频大小',e.target.files[0].size)

            let isType = ['avi', 'wmv', 'mpeg', 'mp4', 'mov', 'mkv', 'flv', 'f4v', 'm4v', 'rmvb', 'rm', '3gp', 'dat', 'ts', 'mts', 'vob'].indexOf(this.uploadType)

            if (isType == -1) {
                // this.loading = false
                return this.$message.error('请上传正确格式的视频！')
            }
            if (e.target.files[0].size > this.MAX_IMAGE_SIZE) {
                // this.loading = false
                return this.$message.error('视频最大不能超过5G！')
            }
            
            // if (!files.length) return
            // 这一步其实是把视频或图片以转码后的格式上传，好处是打开上传后的url在浏览器就能直接观看，缺点就是视频时长长，转码时间长，加载速度慢，因此暂时注掉。
            // this.createImage(files[0])

            var videoFile = document.getElementById('videoFile');

            this.$confirm('当前视频为 ： ' + this.videoName + ' ， ' + '格式为 : ' + this.uploadType + 
            [this.uploadType == 'mp4' ? ('') : (' ， ' + '请尽可能上传mp4格式，否者浏览器可能不支持！')] + ' ， 是否确认上传？', {
            // distinguishCancelAndClose: true,
            closeOnClickModal: false
            }) 
            .then(()=> {
                // done();
                console.log('ok')
                this.upClick = 1;
                this.uploadImage(e)
            })
            .catch( () => {
                // console.log(action)
                // this.loading = false
                
                videoFile.value = '';
                console.log('我不传了')
            });

        },
        check(){
            console.log('why！！！', this.uploaderInfos)
        },
        test() {
            console.log('测试！！！', test('http://1258210079.vod2.myqcloud.com/18f996e5vodcq1258210079/d2b38cae5285890803260834945/2BCW79b111YA.mp4'))
        },
        // createImage (file) {
        //     // var image = new Image()
        //     // this.loading = true
        //     let reader = new FileReader()

        //     reader.onload = (e) => {
        //         console.log('wode ')
        //         console.log(e)
        //         console.log('length: ', e.target.result.includes('data:image/jpeg'))
        //         // if (!e.target.result.includes('data:image/jpeg')) {
        //         // if (!e.target.result.includes('data:video/mp4')) {
        //         //     this.loading = false
        //         //     return this.$message.error('请上传mp4格式的视频！')
        //         // }
        //         // if (e.target.result.length > this.MAX_IMAGE_SIZE) {
        //         //     this.loading = false
        //         //     return this.$message.error('视频最大不能超过10G！')
        //         // }
        //         // console.log(e.target.result)
        //         this.image = e.target.result

        //         var videoFile = document.getElementById('videoFile');
        //         // console.log(videoFile + 'qq')

        //         this.$confirm('当前视频为 ： ' + this.videoName + ' ， ' + '格式为 : ' + this.uploadType + 
        //         [this.uploadType == 'mp4' ? ('') : (' ， ' + '请尽可能上传mp4格式，否者浏览器可能不支持！')] + ' ， 是否确认上传？') 
        //         .then(()=> {
        //             // done();
        //             console.log('ok')
        //             this.uploadImage(e)
        //         })
        //         .catch(() => {
        //             console.log('no')
        //             this.loading = false
                    
        //             videoFile.value = '';
        //             console.log('异常')
        //         });
        //             console.log('接着来')
                
        //     }
        //     reader.readAsDataURL(file)
        // },
        uploadImage (e) {
            
            console.log('Upload clicked', e)

            //获取当前时间
            var date = new Date();
            var hour = date.getHours();
            var minu = date.getMinutes();
            var sec = date.getSeconds();
            if (hour < 10) hour = "0" + hour;
            if (minu < 10) minu = "0" + minu;
            if (sec < 10) sec = "0" + sec;
            //添加后缀名
            let uploadType = '.' + this.uploadType
            console.log(hour.toString())
            // console.log(hour)
            let fileName =  hour.toString() + minu.toString() + sec.toString() +  Math.round(Math.random()*10).toString() +  Math.round(Math.random()*10).toString() +  Math.round(Math.random()*10).toString() + uploadType
            // console.log('1.---文件名称', fileName)

            var response = ''
            // type 1图片 2视频 3音频 4其它

            // await axios.put(`https://stayhomehub-1258210079.cos.ap-beijing.myqcloud.com`,{
            //     fileName:fileName,
            //     type:2,
            // }).then(result=>{
            //     response = result
            //     console.log(result)
            // })

            const tcVod = new TcVod({
                getSignature: getSignature
            })
            console.log('1.上传视频', e.target.files[0])            
            var uploader = tcVod.upload({
                mediaFile: e.target.files[0]
            });
            const _this = this
            uploader.on("media_progress", function(info) {
                uploaderInfo.progress = info.percent;
                console.log('2.进度参数', info.percent)
                console.log('2.进度进程', (uploaderInfo.progress * 100) + '%')
                if((uploaderInfo.progress * 100) < 100){
                    console.log('2-1判断进程开始', (uploaderInfo.progress * 100))
                    // if(this.myIntervalStatus){
                        _this.current = parseInt((uploaderInfo.progress * 100) * _this.videoSize / 100) 
                        console.log('2-2开启', _this.videoSize)
                        _this.myIntervalFuntion()
                    // } else {
                    //     console.log('2-2不开启', this.myIntervalStatus)
                    // }
                } else if ((uploaderInfo.progress * 100) == 100) {
                    console.log('2-1判断进程完成', (uploaderInfo.progress * 100))
                    // clearInterval(this.myInterval)
                    // this.myIntervalStatus = true
                    _this.altime = -1
                    _this.speed = 0
                    _this.Surplus = 0
                } else {
                    console.log('2-1判断进程出错', (uploaderInfo.progress * 100))
                }
            });
            uploader.on("media_upload", function(info) {
                uploaderInfo.isVideoUploadSuccess = true;
                console.log('3,上传结果', info,uploaderInfo.isVideoUploadSuccess)
            });

            console.log(uploader, "uploader");

            var uploaderInfo = {
                videoInfo: uploader.videoInfo,
                isVideoUploadSuccess: false,
                isVideoUploadCancel: false,
                progress: 0,
                fileId: "",
                videoUrl: "",
                cancel: function() {
                uploaderInfo.isVideoUploadCancel = true;
                uploader.cancel();
                }
            }
            console.log('4.uploaderInfo:', uploaderInfo)

            this.uploaderInfos.push(uploaderInfo);
            console.log('5.uploaderInfos[]:', uploaderInfo)


            uploader
                .done()
                .then(function(doneResult) {
                console.log("6.上传成功结果doneResult", doneResult);

                uploaderInfo.fileId = doneResult.fileId;

                return getAntiLeechUrl(doneResult.video.url);
            }).then(function(videoUrl) {
                uploaderInfo.videoUrl = videoUrl;
                console.log('7，视频地址：', uploaderInfo.videoUrl)
            });

            //////////////////////////////////////////////////////////
            // console.log('1.上传视频', e)
            // const tcVod = new TcVod({
            //     getSignature: getSignature
            // })
            // const uploader = tcVod.upload({
            //     mediaFile: e.target.files[0], // 媒体文件（视频或音频或图片），类型为 File
            // })
            // uploader.on('media_progress', function(info) {
            //     console.log('1.进度', info.percent) // 进度
            // })

            // const uploaderInfo = {
            //     videoInfo: uploader.videoInfo,
            //     isVideoUploadSuccess: false,
            //     isVideoUploadCancel: false,
            //     progress: 0,
            //     fileId: "",
            //     videoUrl: "",
            //     cancel: function() {
            //     uploaderInfo.isVideoUploadCancel = true;
            //     uploader.cancel();
            //     }
            // }

            // this.uploaderInfos.push(uploaderInfo);


            // uploader.done().then(function (doneResult) {
            //     response = doneResult
            //     console.log('2.成功', response)
            // }).catch(function (err) {
            //     console.log('3.失败', err)
            // })

            // // 视频上传进度
            // // 视频上传完成时
            // uploader.on('media_upload', function(info) {
            //     uploaderInfo.isVideoUploadSuccess = true;
            // })
            // // 视频上传进度
            // uploader.on('media_progress', function(info) {
            //     this.progress = info.percent;
            //     console.log('4.上传进度', this.progress)
            // })
            ////////////////////////////////////////////////////////////
            // console.log(response)
            
            // console.log('Response: ', response.data)
            // let uploadInfo = JSON.parse(response.data.body)
            // console.log('Responsebody: ', uploadInfo)
            // console.log('Uploading to: ', uploadInfo.uploadURL)

            // console.log(this.file)

            // var nnnn = this.file
            
            // var config = {
            //     onUploadProgress: progressEvent => {
            //         var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
            //         this.progress = (progressEvent.loaded / progressEvent.total * 100 | 0)
            //         this.current = parseInt(this.progress * this.videoSize / 100)   
                    
            //         // this.loading = false           

            //         console.log('当前进度' +this.progress)
                   
            //         if(this.progress == 0){  
            //             if(this.myIntervalStatus){
            //                 this.myIntervalFuntion()
            //                 console.log('开启')
            //             }
            //         }
            //         if(this.progress == 100){
            //             // clearInterval(this.myInterval)
            //             // this.myIntervalStatus = true
            //             this.altime = -1
            //             this.speed = 0
            //             this.Surplus = 0
            //         }

            //     }
            // }
            
            // const result = await axios.put(uploadInfo.uploadURL,nnnn,config)
            // this.upClick = 1;

            // console.log('Result: ', result)

            // Final URL for the user doesnt need the query string params
            // console.log(result.config.url.split('?')[0])
            // this.video_url = result.config.url.split('?')[0]
            // this.video_url = response.video.url
            // console.log('5.视频地址', this.video_url)
            // this.uploadURL = result.url.split('?')[0]
        },
        myIntervalFuntion(){
            console.log('8.开始调用速度显示方法：')
            // this.upClick = 1;
            const _this = this
            var myInterval = setInterval(()=>{
                if(_this.altime == -1){
                    clearInterval(myInterval)
                    return false
                }
                _this.myIntervalStatus = false
                _this.altime ++
                _this.speed = (_this.current/_this.altime).toFixed(2)
                console.log('8.当前速度' + _this.speed)
                _this.Surplus = _this.formatSeconds(parseInt(_this.videoSize/_this.speed) - _this.altime)
                console.log('8.当前已用时：' + _this.altime)
                
            },1000)
        },
        formatSeconds(value) {
	        let secondTime = parseInt(value);// 秒
	        let minuteTime = 0;// 分
	        let hourTime = 0;// 小时
	        if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
	            //获取分钟，除以60取整数，得到整数分钟
	            minuteTime = parseInt(secondTime / 60);
	            //获取秒数，秒数取佘，得到整数秒数
	            secondTime = parseInt(secondTime % 60);
	            //如果分钟大于60，将分钟转换成小时
	            if(minuteTime > 60) {
	                //获取小时，获取分钟除以60，得到整数小时
	                hourTime = parseInt(minuteTime / 60);
	                //获取小时后取佘的分，获取分钟除以60取佘的分
	                minuteTime = parseInt(minuteTime % 60);
	            }
	        }
	        let result = "" + parseInt(secondTime) + "秒";
 
	        if(minuteTime > 0) {
	        	result = "" + parseInt(minuteTime) + "分" + result;
	        }
	        if(hourTime > 0) {
	        	result = "" + parseInt(hourTime) + "小时" + result;
	        }
            return result;
        },
        // tiaozhuan(){
        //     this.upClick = 1;
        // },
        sedPag(){
            this.$emit('func',this.myPag)
        },
        // 提交表单
        submitForm(formName) {
            console.log(this.video_url)
            console.log('提交的时候的视频时长' + this.video_duration)
            this.$refs[formName].validate((valid) => {
            if (valid) {
                // alert('submit!');
                
                if(this.video_url == ''){
                    this.$message.error('暂无视频，请等待视频上传成功后再提交！')
                    return false
                }
                if(this.video_duration == ''){
                    // this.$message.error('暂无视频信息，请等待视频上传成功后再提交！')
                    // return false
                    this.video_duration = 0
                }
                if(typeof(this.ruleForm.date1) == 'string'){
                    
                }else{
                    this.ruleForm.date1 = this.dateToString(this.ruleForm.date1)
                }  
                let params = {
                    url:this.video_url,   //视频地址
                    cover:this.ruleForm.imageUrl2,   //视频封面横图
                    cover_s:this.ruleForm.imageUrl,   //视频封面竖图
                    title:this.ruleForm.name,   //视频标题
                    introduction:this.ruleForm.desc,   // 视频的描述/简介
                    video_duration:this.video_duration,    //视频的时长
                    shooting_time:this.ruleForm.date1,    //视频拍摄时间
                    shooting_country:this.ruleForm.country,   //拍摄地点-国家
                    shooting_province:this.ruleForm.province,   //拍摄地点-省份
                    shooting_city:this.ruleForm.city,   //拍摄地点-城市
                    auditor_staff_id:this.ruleForm.auditorCode,     //观看/下载视频审核人工号
                    auditor_phone:this.ruleForm.auditorNumber,       //观看/下载视频审核人电话
                    user_watch_jurisdiction:this.ruleForm.resource,    //观看权限 1默认可见 2不可见
                    admin_classify_jurisdiction:this.ruleForm.adminClass,    //管理员自主分类权限 1有权限 2无权限
                    admin_recommend_jurisdiction:this.ruleForm.adminRecom,     //管理员自主推荐权限 1有权限 2无权限
                }     
                //传递视频所属的栏目
                if(this.showClassTwo){
                    params["column_id"] = this.ruleForm.region2
                }else{
                    params["column_id"] = this.ruleForm.region1
                }
                console.log(Qs.stringify(params))
                //首次新建提交
                service.post(configAPI.uploadVideo_url + Qs.stringify(params),{
                    
                }).then( result => {
                    console.log(result)
                    this.$message.success('上传成功！')
                    this.$refs[formName].resetFields();
                    this.video_url = ''
                    this.video_duration = ''
                    this.upClick = 0
                }).catch( (err)=>{
                    console.log(err)
                    this.$store.state.Localvideo = ''
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },

        dateToString(date){ 
            var year = date.getFullYear(); 
            var month =(date.getMonth() + 1).toString(); 
            var day = (date.getDate()).toString();  
            if (month.length == 1) { 
                month = "0" + month; 
            } 
            if (day.length == 1) { 
                day = "0" + day; 
            }
            var dateTime = year + "-" + month + "-" + day;
            return dateTime; 
        },
        changVideoInfor(formName){
            // var d = new Date();
            // var n = d.getHours();
            // console.log(d)
            console.log(typeof(this.ruleForm.date1))
            // console.log(this.ruleForm.date1.getHours().setHours(this.ruleForm.date1.getHours() + 8))
            if(typeof(this.ruleForm.date1) == 'string'){
                
            }else{
                this.ruleForm.date1 = this.dateToString(this.ruleForm.date1)
            }   
            this.$refs[formName].validate((valid) => {
              if (valid) {
                
                let params = {
                        cover:this.ruleForm.imageUrl2,   //视频封面横图
                        cover_s:this.ruleForm.imageUrl,   //视频封面竖图
                        title:this.ruleForm.name,   //视频标题
                        introduction:this.ruleForm.desc,   // 视频的描述/简介
                        shooting_time:this.ruleForm.date1,    //视频拍摄时间
                        shooting_country:this.ruleForm.country,   //拍摄地点-国家
                        shooting_province:this.ruleForm.province,   //拍摄地点-省份
                        shooting_city:this.ruleForm.city,   //拍摄地点-城市
                        auditor_staff_id:this.ruleForm.auditorCode,     //观看/下载视频审核人工号
                        auditor_phone:this.ruleForm.auditorNumber,       //观看/下载视频审核人电话
                        user_watch_jurisdiction:this.ruleForm.resource,    //观看权限 1默认可见 2不可见
                        admin_classify_jurisdiction:this.ruleForm.adminClass,    //管理员自主分类权限 1有权限 2无权限
                        admin_recommend_jurisdiction:this.ruleForm.adminRecom,     //管理员自主推荐权限 1有权限 2无权限
                    }     
                    //传递视频所属的栏目
                if(this.showClassTwo){
                    params["column_id"] = this.ruleForm.region2
                }else{
                    params["column_id"] = this.ruleForm.region1
                }
                //其次编辑提交
                service.put(configAPI.changVideoInfor + this.adminVideoId + '?' +  Qs.stringify(params) ,{

                }).then( result => {
                    console.log(result)
                    this.$message.success('修改成功！')
                    this.$refs[formName].resetFields();
                    this.video_url = ''
                    this.video_duration = ''
                    this.upClick = 0
                    this.$router.push({path:'/videoAdmin'})
                }).catch( (err)=>{
                    console.log(err)
                    this.$store.state.Localvideo = ''
                })
              } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$confirm('确认全部重置？')
            .then(_ => {
                this.$refs[formName].resetFields();
                // this.upClick = 0
                // this.video_url = ''
                // this.video_duration = ''
                this.showPlace = false
                this.showClassTwo = false
                this.ruleForm.province = ''
                this.ruleForm.city = ''
                this.options4 = ''
                this.options3 = ''
                this.
                done();
            })
            .catch(_ => {});
            // this.$refs[formName].resetFields();
        },  
        func(){
            console.log('ok')
        },
        func2(){
            console.log(this.options2)
            console.log(this.ruleForm.visibleCode)
        },
        // remoteMethod(query) {
        //     if (query !== '') {
        //     this.loading = true;
        //     setTimeout(() => {
        //         this.loading = false;
        //         this.options2 = this.list.filter(item => {
        //         return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        //         });
        //     }, 200);
        //     } else {
        //     this.options2 = [];
        //     }
        // },
        getAllProvince(){
            if(this.ruleForm.country == '国内'){
                this.options4 = region
                this.showPlace = true
                console.log(this.options4)
            }else{
                // this.ruleForm.province = ''
                // this.ruleForm.city = ''
                this.showPlace = false
                this.options4 = ''
            }
            // console.log(region)
        },
        getAllCity(){
            
            this.ruleForm.city = ''

            // console.log(this.ruleForm.province)
        
            this.options4.forEach(element => {
                // console.log(element)
                if(element.name == this.ruleForm.province){
                    this.options3 = element.son;
                }
            });

            console.log(this.ruleForm.province)
        },
        getTwoClass(){
            this.ruleForm.region2 = ''
            service.get(configAPI.getAllUpVideoTwoClass_url + this.ruleForm.region1,{

            }).then( result =>{
                console.log(result)
                this.region2options = result.data.result.list
                if(result.data.result.total !== 0){
                    this.showClassTwo = true
                }else{
                    this.showClassTwo = false
                }
            })
        }
    },
    created(){
        //从视频管理页面传递过来的视频id
        console.log(this.$route.query.videoId)
        this.adminVideoId = this.$route.query.videoId
        if(this.adminVideoId !== undefined){
            //获取所有的信息
            service.get(configAPI.getAdminVideoInfor + this.adminVideoId,{

            }).then(result=>{
                console.log(result)
                
                if(result.data.result.auditor_phone == ''){
                    this.ruleForm.Auditor = '0'
                }else{
                    this.ruleForm.Auditor = '1'
                    this.ruleForm.auditorCode = result.data.result.auditor_staff_id,     //观看/下载视频审核人工号
                    this.ruleForm.auditorNumber = result.data.result.auditor_phone     //观看/下载视频审核人电话
                }
                if((result.data.result.column_group.id.toString()).indexOf(".") == -1){  //不存在二级
                    this.ruleForm.region1 = result.data.result.column_group.id   // 获取视频分类
                    console.log(typeof(this.ruleForm.region1))
                }else{
                    this.ruleForm.region1 = parseInt(result.data.result.column_group.id.split('.')[0])
                    
                    // console.log(typeof(parseInt(this.ruleForm.region1)))
                    this.getTwoClass()
                    this.ruleForm.region2 = parseInt(result.data.result.column_group.id.split('.')[1])
                }
                // console.log((result.data.result.column_group.id.toString()).indexOf("."))
                
                this.ruleForm.imageUrl2 = result.data.result.cover,   //视频封面横图
                this.ruleForm.imageUrl = result.data.result.cover_s,   //视频封面竖图
                this.ruleForm.name = result.data.result.title,   //视频标题
                this.ruleForm.desc = result.data.result.introduction,   // 视频的描述/简介
                this.video_duration = result.data.result.video_duration,    //视频的时长
                this.ruleForm.date1 = result.data.result.shooting_time.split(' ')[0].replace(/-/g,'/'),    //视频拍摄时间
                this.ruleForm.country = result.data.result.shooting_country,   //拍摄地点-国家
                this.ruleForm.province = result.data.result.shooting_province,   //拍摄地点-省份
                this.ruleForm.city = result.data.result.shooting_city,   //拍摄地点-城市
                // this.ruleForm.auditorCode = result.data.result.auditor_staff_id,     //观看/下载视频审核人工号
                // this.ruleForm.auditorNumber = result.data.result.auditor_phone,       //观看/下载视频审核人电话
                this.ruleForm.resource = result.data.result.user_watch_jurisdiction,    //观看权限 1默认可见 2不可见
                this.ruleForm.adminClass = result.data.result.admin_classify_jurisdiction,    //管理员自主分类权限 1有权限 2无权限
                this.ruleForm.adminRecom = result.data.result.admin_recommend_jurisdiction     //管理员自主推荐权限 1有权限 2无权限

                if(result.data.result.shooting_country == '国内' ){
                    this.showPlace = true  // 显示城市的三级联动 
                    this.getAllProvince()
                    // this.getAllCity()
                    this.options4.forEach(element => {
                        // console.log(element)
                        if(element.name == this.ruleForm.province){
                            this.options3 = element.son;
                        }
                    });
                }
            })
        }
        console.log(this.adminVideoId)
        this.sedPag()
        service.get(configAPI.getAllUpVideoClass_url,{

        }).then( result => {
            console.log(result.data.result.list)
            this.region1options = result.data.result.list
        })
    },
    // destroyed(){
    //     this.altime = -1
    // }
}
</script>
<style scoped>
    .mainTop{
        height: 27.1vw;
        width: 100%;   
        box-sizing: border-box;
        padding: 2.5% 33.75% 0 3.75%;
    }
    .mainBottom{
        width: 100%;   
        box-sizing: border-box;
        padding: 0 33.75% 0 3.75%
    }
    p{
        text-align: center;
    }
    .bottomTips:hover{
        color: #37BAA0;
    }
    .el-upload{
        margin:0 auto
    }
    .avatar-uploader > div{
        width:100%;
        height: 100%
    }
    .bottomTips{
        font-size:0.73vw;color:#bbbbbb;display:flex;line-height:1;
    }
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
    .upVideoTwoContainer p{
        text-align: center;
    }
    .upVideoTwoContainer span{
        width: 20%;
    }
    .upVideoTwoContainer input{
        background-color: whitesmoke;
        border: 0;
        border-radius: 4px;
        height: 40px;
        padding: 4px 20px;
        box-sizing: border-box;
        width: 100%
    }
    .upVideoTwoContainer .form{
        width: 80%;
    }
    .form .el-form-item{
        margin-bottom:10px
    }
    .upVideoTwoContainer .textareaDiv{
        height: 150px;
    }
    .aSty{
        cursor:pointer
    }
</style>
<style >
    .mainBottom span:focus{
        outline: none;
    }
    .myUploadOne .avatar{
        width: 188px;
        height: 230px;
    }
    .myUploadOne .el-upload--text{
        width: 188px;
        height: 230px;
        display: flex;
        align-items: center
    }
    .myUploadTwo .avatar{
        width: 282px;
        height: 166px;
    }
    .myUploadTwo .el-upload--text{
        width: 282px;
        height: 166px;
        display: flex;
        align-items: center;
        justify-content: center
    }
    .myUploadOne img{
        width: 100%;
        height: 100%;
    }
</style>