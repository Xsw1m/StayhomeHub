<template>
    <div class="upvideoContainer">
        <shareheader></shareheader>
            <el-dialog
            :title="test"
            :visible.sync="logindialogVisible"
            width="40%"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            >
                <el-row style="display:flex;align-items:center;padding-bottom:5%;">
                    <el-col :span="4"><span>提取码:</span></el-col>
                    <el-col :span="7"><el-input v-model="code" placeholder="验证码" @keyup.enter.native="showsharevideo"></el-input></el-col>
                </el-row>
                <el-row style="display:flex;align-items:center;justify-content: center;">
                    <el-button type="primary" @click="showsharevideo" round>观看视频</el-button>
                </el-row>
            </el-dialog>
            <div style="height:100%;width:100%;overflow:scroll;overflow-x:hidden">
                <!-- <div style="width:100%; height: 72.1%;padding: 2.13% 18.75% 0 18.75%;box-sizing: border-box;background-color: #232525" > -->
                    <div style="width:100%; height: 72.1%;padding: 2.13% 18.75% 0 18.75%;box-sizing: border-box;background-color: #232525" >
                    <div class="videoDiv">
                    <!-- 视频组件 -->
                    <videoMd v-show="!checkData" :parentmsg="videoInfor"></videoMd>
                    <!-- 视频内顶部的的悬浮栏 -->
                    <div class="floatWindow">
                        <!-- <span>{{videoTitle}}</span> -->
                        <span>{{ videoInfor.title }}</span>
                        <div class="floatWindow2">
                            <!-- <span>你需要，我送到</span> -->
                            <div style="width:100%;height:100%;display: flex;align-items: center;justify-content: space-between;">
                                <a href="https://wangzhanmulu.s3.cn-northwest-1.amazonaws.com.cn/空境素材/制造工厂/2018建陶新金亿工厂外景自动化生产线.mp4" download>下载</a>
                                <img class="aSty" @click="downpopup()" src="../images/video-down.png" alt="" style="width:1.6vw;height:1.5vw">
                            </div>
                        </div>
                    </div>
                    <!-- 视频内右下角的logo -->
                    <div class="floatLogo">
                        <img src="../images/haiVideoLogo.png" alt="">
                    </div>
                    <img class="aSty" v-show="checkData" src="../images/loading2.gif" alt="" style="width:100%;height:100%">
                </div>
            </div>
            <div class="bottom_bott">
                <div style="height:2.656vw;width:100%;display:flex;align-items:center">
                    <span style="font-size:1.25vw;color:#333333;line-height:1">相关推荐</span>
                </div>
                <div style="display:flex; flex-wrap:wrap">
                    <div  v-for='item in recommendVideoInfor' :key="item.id" class="mainInfor aSty">
                        <div style="width:100%;height:100%;position:relative">
                            <div class="img">
                                <!-- <img v-if="item.cover_s" v-bind:src='item.cover_s' alt="" style="width:100%;height:100%"> -->
                                <img src="../img/undefind_img.jpg"  alt="" style="width:100%;height:100%">
                                <!-- <div class="durationDiv"></div> -->
                                <!-- <span class="duration">{{item.video_duration}}</span> -->
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
        </div>
    </div>
</template>
<script>
import header from '../components/shareheader.vue'
import videoMd from '../views/sharevideoty.vue'
import axios from 'axios'
import service from '../API/request'
import configAPI from '../API/configAPI'
export default {
    components:{
        'shareheader':header,
        'videoMd':videoMd,
    },
    data () {
        return {
            checkData: true,
            logindialogVisible: true,
            videoInfor: {},
            recommendVideoInfor: [
                {id: 1, title: '广告位暂未添加', introduction: '目前尚未明确'},
                {id: 2, title: '广告位暂未添加', introduction: '目前尚未明确'},
                {id: 3, title: '广告位暂未添加', introduction: '目前尚未明确'},
                {id: 4, title: '广告位暂未添加', introduction: '目前尚未明确'}
            ],
            code: null,
            test: '',
            test1: 'smx',
            isdownload: 2,
            axiosid: 0,
            videoid: null,
            videodetails: {}
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
            // this.getAdminVideoInfor()
        }else{
            // this.getVideoInfor()
            console.log('获取视频信息')
            this.test = this.test1 + '给你分享了视频'
        }
        var url = window.location.href
        this.axiosid = url.split('?info=')[1]
        // this.getVideoRecommend()
              
    },
    methods: {
        downpopup() {
            axios.get(configAPI.share_download, {
                params:{
                    id: this.axiosid,
                    share_code: this.code
                }
            }).then((result) => {
                let res = result.data.result
                // window.location.href = res.source_url
                console.log(res)  
                if (res.type == 1) {
                    const ele = document.createElement('a')
                    ele.setAttribute('href', res.data.source_url) //设置下载文件的url地址
                    ele.setAttribute('download' , 'download') //用于设置下载文件的文件名
                    ele.click()
                } else {
                    this.$message.error(res.msg)
                }
                

            }).catch((err) => {
                console.log(err)
            });
        },
        showsharevideo() {
            axios.get(configAPI.share_details, {
                params:{
                    id: this.axiosid,
                    share_code: this.code
                }
            }).then((result) => {
                let res = result.data.result
                // console.log('观看结果', res)
                if (res.type == 1) {
                    this.videoInfor = res.data
                    // console.log('视频详细信息', this.videoInfor)
                    this.logindialogVisible = false
                    this.checkData = false
                } else { 
                    this.$message.error(res.msg)
                }
            }).catch((err) => {
                console.log(err)
            })
            
            
        }
    },
}
</script>
<style scoped>
    .upvideoContainer{
        height: 100%;
    }
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
        height: 2.23vw
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
    .player:focus{
      outline: none
    }
    .videoDiv:focus{
      outline: none
    }
    .vjs-poster:focus{
      outline: none
    }
    .vjs-custom-skin > .video-js{
        height: 100%!important
    }
    video:focus{
        outline: none!important
    }
    button:focus{
        outline: none!important
    }
    .vjs-control-bar{
      background-color: #000000!important;
      opacity: 0.8;
    }
    /* .vjs-modal-dialog-content{
      display: none
    } */
    .aSty {
      cursor:pointer      
    }
</style>