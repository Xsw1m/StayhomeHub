<template>
    <div class="upvideoContainer">
        <!-- 顶部搜索栏 -->
        <div class="bottom" >

            <div style="height:100%;width:100%;overflow:scroll;overflow-x:hidden">
            <div style="width:100%; height: 72.1%;padding: 2.13% 18.75% 0 18.75%;box-sizing: border-box;background-color: #232525" >
                               
                 <div class="videoDiv" v-show="!checkData">

                    <!-- 视频组件 -->
                    <videoMd :parentmsg="videoInfor"></videoMd>

                    <!-- 视频内顶部的的悬浮栏 -->
                    <div class="floatWindow">
                        <span>{{videoTitle}}</span>
                        <div class="floatWindow2">
                            <!-- <span>你需要，我送到</span> -->
                            <div style="width:100%;height:100%;display: flex;align-items: center;justify-content: space-between;">
                            <img class="shareVideo aSty" @click="shareVideo(videoId)" src="../images/share.png" style="width:1.1vw;height:1.1vw">
                            <!-- todo -->
                            <img class="aSty"  v-if="!this.videoInfor.is_collect"
                                src="../images/video-coll.png" alt="" 
                                style="width:1.25vw;height:1.25vw"
                                @click="chang(videoInfor.is_collect = !videoInfor.is_collect),changColl(videoInfor.is_collect)">
                            <img class="aSty"  v-if="this.videoInfor.is_collect" 
                                src="../images/myCollection-hover.png" alt="" 
                                style="width:1.25vw;height:1.25vw"
                                @click="chang(videoInfor.is_collect = !videoInfor.is_collect),changColl(videoInfor.is_collect)">
                            <img class="aSty" @click="downpopup()" v-if="checkDown" src="../images/video-down.png" alt="" style="width:1.25vw;height:1.25vw">
                            <img class="aSty" @click="downpopup()" v-if="!checkDown" src="../images/video-down.png" alt="" style="width:1.25vw;height:1.25vw">

                            </div>
                        </div>
                    </div>
                    
                    <!-- 视频内右下角的logo -->
                    <div class="floatLogo">
                        <img src="../images/stayhome.png" alt="">
                    </div>
                </div>

                <img class="aSty" v-show="checkData" src="../images/loading2.gif" alt="" style="width:100%;height:100%">


                <downPopup :parentVideoId="videoId" ref="downpopup"></downPopup>

            </div>
            
            <div class="bottom_bott">

                <div style="height:2.656vw;width:100%;display:flex;align-items:center">
                    <span style="font-size:1.25vw;color:#333333;line-height:1">相关推荐</span>
                </div>

                <div style="display:flex; flex-wrap:wrap">
                    <div  v-for='item in recommendVideoInfor' :key="item.id" class="mainInfor aSty"  @click="beforPlayer(item)">
                        <div style="width:100%;height:100%;position:relative">
                            <div class="img">
                                <img v-if="item.cover_s" v-bind:src='item.cover_s' alt="" style="width:100%;height:100%">
                                <img v-if="!item.cover_s" src="../img/undefind_img.jpg"  alt="" style="width:100%;height:100%">
                                <div class="durationDiv"></div>
                                <span class="duration">{{item.video_duration}}</span>
                            </div>
                            <div class="information">
                                <div>
                                    <div class="title">
                                        <span >{{item.title}}</span>
                                    </div>
                                    <div style="height:25%;width:100%"></div>
                                    <div class="progress">
                                        <span >{{item.introduction}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-dialog
            title="分享申请"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            >
              <el-form :model="temp" ref="dataForm" :rules="rules" label-width="80px">
                <el-row>
                <el-col :span="20">
                <el-form-item label="分享意图" prop="intention">
                  <el-input
                    type="textarea"
                    :rows="2"
                    width="80px"
                    placeholder="请输入内容"
                    v-model="temp.intention">
                  </el-input>
                </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="20">
                <el-form-item label="分享说明" prop="explain">
                  <el-checkbox v-model="temp.explain" label= "number" :false-label="0" :true-label="1">分享者需对分享内容的使用时长、用途、下载等全流程负责，如因此造成任何问题由分享者自行承担
                  </el-checkbox>
                </el-form-item>
                </el-col>
                </el-row>
                
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitShareForm(temp)" :disabled="temp.explain === 0?true:false">提 交</el-button>
              </div>
            </el-dialog>
            <popup ref="child"></popup>

        </div>

        </div>
    </div>
</template>
<script>
import videoMd from '../components/videoTy.vue'
import popup from '../components/popup.vue'
import downPopup from '../components/downPopup.vue'
import { setTimeout } from 'timers'
import service from '../API/request'
import configAPI from '../API/configAPI'
import qs from 'qs'
const axios = require('axios');

export default {
    components:{
        'videoMd':videoMd,
        'popup':popup,
        'downPopup':downPopup
    },
    data() {
      return {
        videoInfor:'',
        recommendVideoInfor:'',
        checkColl:true,
        checkDown:true,
        checkData:true,
        videoTitle:'',
        videoId: Number,
        operate:'',
        dialogVisible:false,
        left:'left',
        mainInfor:[ ],
        temp: {
          intention: '',
          explain: 0
        },
        rules: {
          intention: [
            { required: true, message: '请输入分享意图', trigger: 'blur' }
          ],
          explain: [
            { required: true, message: '须同意分享说明', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
        // videoId:{
        //     handler(newName,oldName){
        //         // console.log('xx')
        //         this.getVideoInfor()
        //         this.getVideoRecommend()
        //     },
        // },
        $route: {
        handler: function (val, oldVal) {
            console.log('监听路由了')
            let splitLength = window.location.href.split('=').length
            // console.log(window.location.href.split('=').length)   splitLength = 3
            this.videoId = window.location.href.split('=')[splitLength - 1]
            //let _urlParams = this.$route.params;
            //created事件触发的函数可以在这里写...  
            //都是componentA组件，声明周期还在，改变不了
            if(splitLength == 3){
                this.getAdminVideoInfor()
            }else{
                this.getVideoInfor()
            }   
            // this.getVideoRecommend()
            },
        deep: true
        }
    },
    methods: {
      beforPlayer(item){
        // this.$refs.child.chang()
        if(item.user_watch_jurisdiction == 1){
                //这里是把视频的id传送过去
                var person = {
                    videoid:item.id
                }
                this.$router.push({name:'video',query:person})
                this.videoId = item.id
            }else{
                this.$refs.child.chang()
                this.videoId = item.id
        }
        // this.videoId = item.id 
        // console.log(this.videoId)
      },
      //因为进到这个视频播放的页面中，videoId就是本视频的id了。默认已经已经传递过去了，所以不用再传值到downpopup中，
      downpopup(){
        this.$refs.downpopup.chang()
      },
      changColl(data){
            console.log('视频id为' + this.videoId)
            console.log('视频被操作为' + this.videoInfor.is_collect)
            if(this.videoInfor.is_collect){
                this.operate = 1
            }else{
                this.operate = 2
            }
            service.post(configAPI.collOneVideo_url+'operate='+this.operate+'&id='+this.videoId,{
                
            }).then(result=>{
                console.log(result)
            })
        },
        chang(){
            // console.log('ok')
        },
        getVideoInfor(){
            service.get(configAPI.getVideoInfor_url + this.videoId,{

            }).then(result=>{
                console.log('获取视频详情：',result)
                let {data} = result;
                if(data.code == 200){
                    // console.log(result)
                    this.videoInfor = data.result;
                    this.videoTitle = data.result.title
                    // console.log(this.videoInfor.coll +'infor')

                    //拿到了数据把加载动图改为video
                    
                    if(this.videoInfor == ''){
                        this.checkData = true
                    }else{
                        this.checkData = false
                    }
                    console.log(this.checkData)
                    this.getVideoRecommend(result.data.result.category_id)
                }
            })
        },
        // getAdminVideoInfor_url
        getAdminVideoInfor(){
            service.get(configAPI.getAdminVideoInfor_url + this.videoId,{

            }).then(result=>{
                console.log(result)
                let {data} = result;
                if(data.code == 200){
                    // console.log(result)
                    this.videoInfor = data.result;
                    this.videoTitle = data.result.title
                    // console.log(this.videoInfor.coll +'infor')

                    //拿到了数据把加载动图改为video
                    
                    if(this.videoInfor == ''){
                        this.checkData = true
                    }else{
                        this.checkData = false
                    }
                    console.log(this.checkData)
                    this.getVideoRecommend(result.data.result.category_id)
                }
            })
        },
        getVideoRecommend(id){
            service.get(configAPI.recommend_url,{
            params: {
                'filter[category_id]': id,
                'filter[status]': 1,
                'page': 1,
                'pagesize':4,
            }
        }).then(result => {
            // console.log('是我')
            // console.log(result.data.result.list)
            this.recommendVideoInfor  = result.data.result.list
        })
        },
        shareVideo(id) {
          this.resetTemp()
          console.log('分享视频'+id)// todo ----审核判断有无权限分享
          
          this.dialogVisible = true
        },
        resetTemp() {
          this.temp = {
            intention: '',
            explain: 0
          }
        },
        submitShareForm(temp) {
          this.$refs['dataForm'].validate((valid) => {
              console.log(valid)
              if (valid) {
                service.post(configAPI.share_apply, qs.stringify({
                    video_id: this.videoId,
                    apply_reason: temp.intention
                })).then((result) => {
                    console.log(result)
                    this.dialogVisible = false
                    this.$message.success('已提交视频分享,请等待后台审核通过! ')
                }).catch((err) => {
                    console.log(err)
                })
              }
          })
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }
    },
    created(){
        console.log('这是初始')
        var cs = this.$route.query;
        // console.log(cs)
        console.log('视频ID为'+cs.videoid)
        console.log('视频来自于'+cs.from)
        this.videoId = cs.videoid
        //下面的请求也得带着传递过来的id
        if( cs.from == 'admin'){
            this.getAdminVideoInfor()
        }else{
            this.getVideoInfor()
        }
              
    },
}
</script>
<style scoped>
    .upvideoContainer{
        width:100%;
        height: 92.6%;
    }
    .bottom{
        height:100%;
        width:100%;
    }
    .videoDiv{
        height: 100%;
        width: 100%;
        position: relative;
    }
    .floatWindow{
        height: 8.5%;
        width: 100%;
        position: absolute;
        top: 0;
        background-color: #000000;
        opacity: 0.7;
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
    }
    .floatLogo{
        position: absolute;
        /* top:0; */
        bottom: 25px;
        right: 20px;
        width:13.18vw;
        height: 5.23vw
    }
    .floatLogo img{
        width: 100%;
        height: 100%
    }
    /* .vjs-menu-content{
        display: none!important
    } */
    .floatWindow2{
        height: 100%;
        width: 10%;
        position: absolute;
        right: 3.3%;
        background-color: #000000;
        opacity: 0.6;
        top:0px
    }
    .floatWindow span{
        color:#FFFFFF;
        line-height: 1;
        font-size: 1.04vw
    }
    .bottom_bott{
        /* height: 59.1%; */
        width:100%;
        padding: 2.13% 17% 0 18.75%;
        box-sizing: border-box;
        background-color: #F4F7FD
    }
    .mainInfor{
        width:14.7vw;
        height:21.9vw;
        /* max-height:242px; */
        background-color:#FFFFFF;
        margin-right: 1.1vw;
        margin-bottom: 4vw
    }
    .img{
        width:100%;
        height:82.18%;
        position: relative;
    }
    .durationDiv{
        width:3.4vw;
        height:1vw;
        background-color:#000000;
        position:absolute;
        top:90%;
        left:74.5%;
        border-radius: 10px;
        opacity: 0.5;
    }
    .duration{
        position:absolute;
        font-size: 0.625vw;
        top: 91%;
        left: 77.3%;
        line-height: 1;
        color: white;
    }
    .information{
        width:100%;
        height:17.82%;
        display:flex;
        align-items:center;
        padding:0 10px;
        box-sizing:border-box
    }
    .information > div{
        width:100%;height:52.3%
    }
    .title{
        width:100%;
        height:40%;
    }
    .title span{
        font-size:0.83vw;
        line-height:1;
        font-family: 'FZLTHK--GBK1-0';
        float:left;
        width:100%;
        height:100%;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .progress{
        width:100%;height:35%;display:flex;
    }
    .progress span{
        font-size:0.68vw;
        line-height:1; 
        font-family: 'FZLTHK--GBK1-0';
        color:#666666;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .videoDiv:hover .floatWindow{     
        visibility: visible;
    }
    .aSty{
        cursor:pointer
    }
    /* .shareVideo{
        background:url(../images/share.png) 
    } */
    .shareVideo:hover{
        content:url(../images/share-hover.png) 
    }
    /* 
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
    } */

/* 分享视频样式todo */
.el-checkbox /deep/ .el-checkbox__label {
    display: inline-grid;
    white-space: pre-line;
    word-wrap: break-word;
    overflow: hidden;
}
</style>
<style >
    /* .el-dialog__headerbtn{
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
    .el-dialog{
        border-radius: 10px
    }
    .xixi textarea{
        max-height: 4.89vw!important;
        min-height: 4.89vw!important;
        height: 4.89vw;
    } */
</style>