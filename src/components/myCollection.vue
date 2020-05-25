<template>
    <!-- <h1>这是播放记录</h1> -->
    <div class="myCollectionContainer">
        <div style="margin-top:28px">

            <div class="top-rail">
                <div class="data_data">
                    <div class="allDiv" style="display:flex;justify-content:center">
                        <span style="font-size:0.78vw;color:#FFFFFF;display:flex;align-items:center">全部({{myCollNumber}})</span>
                    </div>
                </div>
                <div  class="everyClass" style="width:48.6vw;display:flex;justify-content:space-between;align-items:center;padding-left:2%;box-sizing:border-box;visibility: hidden;">
                    <!-- 
                        1 通过everyClass方法发送value，获取数据
                        2 如果获取数据成功，就把span的值变绿。
                        3 本地存储一个固定的值，然后，可以给span的v-if绑定id或者value。在数据返回成功后，把id和value复制给本地的值，
                          然后再去再拿本地的值验证id和value，验证成功就变色。
                          （主要是起到一个唯一性和验证是否获取到数据的所用）
                        4 变色后，渲染数据。
                     -->
                     <!-- 循环分类的span -->
                    <div v-for="item in everyClass" :key="item.id"> 
                        <span v-if="checkClass !== item.value" class="aSty" style="font-size:0.78vw;color:#333333" @click="everyClassInfor(item.value)">{{item.value}}({{item.number}})</span>
                        <span v-if="checkClass == item.value" class="aSty" style="font-size:0.78vw;color:#37BAA0" @click="everyClassInfor(item.value)">{{item.value}}({{item.number}})</span>
                    </div>
                </div>
                <div class="delDiv"  style="">
                    <div style=""  @click="clear()" class="aSty" >
                        <div class="delIcon" style="width:16px;height:16px;">
                            <!-- <img src="../images/personal-Coll-del.png" alt="" style="width:100%;height:100%"> -->
                        </div>
                        <span >清空</span>
                    </div>
                </div>
            </div>

            <div style="width:100%;height:100%;display:flex;justify-content: flex-start; flex-wrap: wrap">
                
                <!-- 循环视频div -->
                <div v-for='(item,index) in mainInfor' :key="item.id" class="mainInfor aSty" @mouseenter="onFloor(item.id)" @mouseleave="offFloor()">
                    <div style="width:100%;height:100%;position:relative">
                        <div class="img">
                            <img  v-bind:src='item.cover' alt="" style="width:100%;height:100%">
                            <div  class="durationDiv"></div>
                            <span class="duration">{{item.video_duration}}</span>
                        </div>
                        <div class="information">
                            <div>
                                <div class="title">
                                    <span >{{item.title}}</span>
                                </div>
                                <div style="height:25%;width:100%"></div>
                                <div class="progress">
                                    <span >{{item.current_progress}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- item.record_id == checkFloor -->
                        <div v-if="item.id == checkFloor" class="floor">
                            <div class="floorTop">
                                <div class="floor-title"  >
                                    <span >{{item.title}}</span>
                                </div>
                                <div class="floor-time" >
                                    <span >时长：{{item.video_duration}}</span>
                                </div>
                                <div class="floor-introduction" >
                                    <span >简介：{{item.introduction}}</span>
                                </div>
                            </div>
                            <div class="floorButtom" >
                                <div class="buttonDiv">
                                    <button @click="getVideo(item)">
                                        <span class="aSty">立即播放</span>
                                    </button>
                                </div>
                                <div class="iconDiv">
                                    <div class="personal-Record-coll floorIcon" style=" visibility: hidden;">

                                    </div>
                                    <!-- <div class="personal-Record-down floorIcon" @click="downpopup(item.id)">

                                    </div> -->
                                    <div class="personal-Record-del floorIcon" @click="delThisColl(index,item.id)">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            
            <!-- 下载提醒组件  refs不是响应式的 不能再循环中使用,需要拿出使用，只需要每次向里面传递不同的数据就行了  -->
            <downPopup :parentVideoId="videoId" ref="downpopup"></downPopup>
            
            <!-- 观看权限认证组件 -->
            <popup :videoId="videoId" ref="child"></popup>

            <!-- 分页 -->
            <div style="width:100%;display:flex;justify-content:center;margin-bottom: 40px">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :hide-on-single-page= "true"
                    background
                    layout = "prev, pager, next"
                    :page-size = 20
                    :total = paginationNumber>
                </el-pagination>
            </div>

        </div>
    </div>
</template>
<script>
import Vue from 'vue'
//导入API
import configAPI from '../API/configAPI.js'
import service from '../API/request.js'
import Qs from 'qs'
//导入下载和观看的弹窗
import downPopup from '../components/downPopup.vue'
import popup from '../components/popup.vue'


const axios = require('axios');
export default {
    components:{
        'downPopup':downPopup,
        'popup':popup
    },
    data(){
        return {
            checkFloor:0,
            myPage:2,
            getClassInfor:1,
            checkClass:'0',
            videoId:'',
            myCollNumber:'',
            mainInfor:{},
            everyClass:[
                // {id:1,value:'链群动态',number:3},
                // {id:2,value:'人单合一',number:5},
                // {id:3,value:'宣传资料',number:8},
                // {id:4,value:'Haier记录',number:9},
                // {id:5,value:'发展历程',number:10},
                // {id:6,value:'海外资料',number:3},
                // {id:7,value:'空镜素材',number:2},
                // {id:8,value:'其他',number:0},
            ],
            paginationNumber:0,
            page:'',
            pagesize:'',
        }
    },
    methods:{
        onFloor(id){
            console.log('某一个收藏', id)
            this.checkFloor = id
        },
        offFloor(){
            this.checkFloor = 0
        },
        sedPag(){
            this.$emit('func',this.myPage)
        },
        ok(){
            console.log('ok')
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val
            this.pagesize = 20
            this.getTimeNews()
        },
        //跳转视频详情页的方法，添加了是否含有观看权限
        getVideo(data){
            console.log(data)
            // 检查此视频有没有观看权限
            if(data.user_watch_jurisdiction == 1){
                //这里是把视频的id传送过去
                var person = {
                    videoid:data.id
                }
                this.$router.push({name:'video',query:person})
            }else{
                this.$refs.child.chang()
                this.videoId = data.id
            }
        },
        //跳转下载弹窗的方法
        downpopup(data){
            console.log(data)
            this.$refs.downpopup.chang()
            //把videoId传递到下载弹窗里
            this.videoId = data
        },
        delThisColl(index,item_videoid){
            console.log('del')
            console.log(index)
            // this.mainInfor.splice(index,1)
            // this.myCollNumber--

            this.$confirm('确认删除？')
            .then(()=> {
                let params = {
                    'video_id': item_videoid,
                    'operate': 2
                }
                service.post(configAPI.collOneVideo_url,
                    Qs.stringify(params)
                ).then(result=>{
                    this.mainInfor.splice(index,1)
                    this.myCollNumber--
                    this.paginationNumber --
                    console.log('删除成功')

                })

            })
            .catch(() => {
                console.log('我不删')
            });
        },
        getTimeNews(){
            let params = {};
            if (this.page) params["page"] = this.page
            if (this.pagesize) params["pagesize"] = this.pagesize
            service.get(configAPI.getCollRecord_url,{
                params
            }).then(result=>{
                let {data} = result;
                // let {result} = data
                console.log('获取所有收藏视频：', data.result);
                // this.everyClass = data.result
                this.mainInfor = data.result.list
                this.myCollNumber = this.mainInfor.length
                this.paginationNumber = data.result.total
            })
        },
        clear(){
            this.$confirm('确认清空？')
            .then(()=> {
                // done();   del_allcoll
                console.log('ok')
                service.delete(configAPI.del_allcoll,{

                }).then(result=>{
                    console.log('删除成功')
                    this.paginationNumber = 0
                    this.mainInfor = {}
                    this.myCollNumber = 0
                })
            })
            .catch(() => {
                console.log('no')
            });
        }
    },
    created(){
        // console.log(this.mainInfor[0])
        this.sedPag()
        this.getTimeNews()
    }
}
</script>
<style scoped>
/* @media screen and (max-width: 1366px) {
        .floor-title span{
            font-size:11px
        }
        .floor-time span{
            font-size: 10px
        }
        .floor-introduction span{
            font-size: 10px
        }
    } */
    .myCollectionContainer{
        height: 100%;
        width: 100%;
        padding: 10px 0 0px 3.1%;
        box-sizing: border-box;
    }
    .top-rail{
        height: 63px;
        width:100%;
        padding: 0px 0px 31px 0px;
        box-sizing: border-box;
        display:flex;
    }
    .allDiv{
        width:4.68vw;
        height:100%;
        background-color:#37BAA0;
        border-radius:16px;
    }
    .date_number{
        width:35px;height:100%;padding:3px 0 0 8px;box-sizing: border-box;display:flex
    }
    .date_number span{
        font-size:17px;color:#37BAA0;font-family:'FZLTHK--GBK1-0';line-height:1
    }
    .mainInfor{
        width:14.7vw;
        height:12.6vw;
        /* max-height:242px; */
        background-color:#FFFFFF;
        margin-right: 1.05vw;
        margin-bottom: 30px;
    }
    .img{
        width:100%;
        height:68.6%;
        position: relative;
        background: url(../img/undefinds_img.jpg);
        background-size: 100% 100%
    }
    .durationDiv{
        width:3.4vw;
        height:1vw;
        background-color:#000000;
        position:absolute;
        top:84.3%;
        left:74.5%;
        border-radius: 10px;
        opacity: 0.5;
    }
    .duration{
        position:absolute;
        font-size: 0.625vw;
        top: 86%;
        left: 77.3%;
        line-height: 1;
        color: white;
    }
    .information{
        width:100%;
        height:31.4%;
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
        color:#666666
    }
    .floor{
        width:14.7vw;
        height:12.6vw;
        margin-right: 1.05vw;
        margin-bottom: 30px;
        background:linear-gradient(rgba(0, 0, 0, 0.479),rgb(0, 0, 0));
        opacity: 0.99;
        position:absolute;
        top:0px;
        padding: 10.28% 7.1% 7.8%  7.1%;
        box-sizing: border-box
    }
    .floor-title{
        width:100%;height:30.5%;display:flex    
    }
    .floor-title span{
        color:#FFFFFF;
        font-size:0.83vw;
        line-height:1.5;
        height:2.49vw;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .floor-time{
        width:100%;height:16.875%;display:flex
    }
    .floor-time span{
        color:#E1E1E1;font-size:0.625vw
    }
    .floor-introduction{
        width:100%;height:52.625%
    }  
    .floorTop{
        width:100%;height:84.3%
    } 
    .floorButtom{
        width:100%;height:15.7%;display:flex
    } 
    .buttonDiv{
        width:41.3%;height:100%;display:flex
    }
    .buttonDiv button{
        width:100%;height:100%;background-color:#37BAA0;
    }
    .buttonDiv span{
        color:#FFFFFF;font-size:0.625vw
    }
    .floor-introduction span{
        color:#E1E1E1;
        font-size:0.625vw;
        line-height:1.5;
        /* float:left; */
        width:100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
    }
    button:focus{
        outline: none
    }   
    button:active{
        background-color: rgb(42, 139, 120)
    }
    button{
        border: 0px;
        border-radius: 15px
    }
    .iconDiv{
        width:59.7%;height:100%;padding:2% 0 2% 18.1%;box-sizing:border-box;display:flex;justify-content:center;
    }
    .floorIcon{
        width:20%;height:100%;
    }
    .personal-Record-coll{
        background-image: url('../images/personal-Record-coll.png');
        background-size: 100% 100%
    }
    .personal-Record-coll:hover{
        background-image: url('../images/personal-Record-coll-hover.png');
        background-size: 100% 100%
    }
    .personal-Record-down{
        background-image: url('../images/personal-Record-down.png');
        background-size: 100% 100%
    }
    .personal-Record-down:hover{
        background-image: url('../images/personal-Record-down-hover.png');
        background-size: 100% 100%
    }
    .personal-Record-del{
        background-image: url('../images/personal-Record-del.png');
        background-size: 100% 100%
    }
    .personal-Record-del:hover{
        background-image: url('../images/personal-Record-del-hover.png');
        background-size: 100% 100%
    }
    .delDiv{
        width:26.56vw;height:100%;box-sizing:border-box;padding-right:2.6%;display:flex;justify-content:flex-end
    }  
    .delDiv > div{
        width:4.6vw;height:100%;background-color:#DFF1EE;border-radius:16px;display:flex;justify-content:space-around;align-items:center;padding:0 2.7%;box-sizing:border-box
    }  
    .delDiv > div:hover{
        background-color:#37BAA0
    }
    .delIcon{
        background-image: url(../images/personal-Coll-del.png);
        background-size: 100% 100%
    }
    .delDiv > div:hover .delIcon{
        background-image: url(../images/personal-Coll-del-hover.png);
        background-size: 100% 100%
    }
    .delIcon ~span{
        font-size:0.73vw;color:#7B8D89
    }
    .delDiv > div:hover .delIcon ~span{
        color:#FFFFFF
    }
    a{ 
        text-decoration:none; 
        color:#333; 
    }
    .aSty{
        cursor:pointer
    }
</style>