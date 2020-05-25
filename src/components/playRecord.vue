<template>
    <!-- <h1>这是播放记录</h1> -->
    <div class="playRecordContainer">

        <div v-for="(item,i) in data" :key="item.id" style="margin-top:28px">
            <div class="data" v-if="(/^[1-9]\d*$/.test(item.total)) && item!=='total'">
                <div class="data_data">
                    <span v-if="i == 'today'">今天</span>
                    <span v-if="i == 'yesterday'">本月</span>
                    <span v-if="i == 'within_a_week'">往期历史</span>
                </div>
                <div class="date_number">
                    <span>（{{item.total}}）</span>
                </div>
            </div>

            <div v-if="(/^[1-9]\d*$/.test(item.total)) && item!=='total'" style="width:100%;height:100%;display:flex;justify-content: flex-start; flex-wrap: wrap">
                
                <div v-for='(item2,j) in item.list' :key="item2.id" class="mainInfor aSty" @mouseenter="onFloor(item2.id)" @mouseleave="offFloor()">
                    <div style="width:100%;height:100%;position:relative">
                        <div class="img">
                            <img  v-bind:src='item2.cover' alt="" style="width:100%;height:100%">
                            <div class="durationDiv"></div>
                            <span class="duration">{{item2.video_duration}}</span>
                        </div>
                        <div class="information">
                            <div>
                                <div class="title">
                                    <span >{{item2.title}}</span>
                                </div>
                                <div style="height:25%;width:100%"></div>
                                <div class="progress">
                                    <span >{{item2.current_progress}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- item2.id === checkFloor -->
                        <div v-if="item2.id === checkFloor" class="floor">
                            <div class="floorTop" >
                                <div class="floor-title"  >
                                    <span class="woshishi">{{item2.title}}</span>
                                </div>
                                <div class="floor-time" >
                                    <span >时长：{{item2.video_duration}}</span>
                                </div>
                                <div class="floor-introduction" >
                                    <span >简介：{{item2.introduction}}</span>
                                </div>
                            </div>
                            <div class="floorButtom" >
                                <div class="buttonDiv">
                                    <button @click="getVideo(item2)">
                                        <span class="aSty">立即播放</span>
                                    </button>
                                </div>
                                <div class="iconDiv">
                                    <!-- 是否被收藏 -->
                                    <!-- 0 是没有被收藏 -->
                                    <div v-if="!item2.is_collect" class="personal-Record-coll floorIcon" @click="chang(item2.is_collect = !item2.is_collect),changColl(item2)">

                                    </div>
                                    <!-- 1 是收藏 -->
                                    <div v-if="item2.is_collect" class="personal-Record-coll-hover floorIcon" @click="chang(item2.is_collect = !item2.is_collect),changColl(item2)">

                                    </div>
                                    <!-- 是否下载 -->
                                    <!--<div class="personal-Record-down floorIcon" @click="downpopup(item2.id)">

                                    </div>-->
                                    <div class="personal-Record-del floorIcon" @click="delThisColl(i,j)">

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div v-if="(/^[1-9]\d*$/.test(item.total))" style="width:78vw;height:1px;background-color:#DCDEDE"></div>

        </div>

        <!-- 下载提醒组件  refs不是响应式的 不能再循环中使用,需要拿出使用，只需要每次向里面传递不同的数据就行了  -->
        <downPopup  :parentVideoId="videoId" ref="downpopup"></downPopup>

        <!-- 观看权限认证组件 -->
        <popup :videoId="videoId" ref="child"></popup>   
    </div>
</template>
<script>
import Vue from 'vue'
//导入API
import configAPI from '../API/configAPI.js'
import service from '../API/request.js'
//导入下载和观看的弹窗
import downPopup from '../components/downPopup.vue'
import popup from '../components/popup.vue'
import Qs from 'qs'
import { setTimeout } from 'timers';
import { log } from 'util';

const axios = require('axios');
export default {
    //弹窗命名
    components:{
        'downPopup':downPopup,
        'popup':popup
    },
    data(){
        return {
            checkFloor:'',
            myPag:1,
            videoId:'',
            operate:'',
            data:{
                today:Object
            },
        }
    },
    methods:{
        onFloor(recordId){
            // console.log(j)
            this.checkFloor = recordId
        },
        offFloor(){
            this.checkFloor = ''
        },
        sedPag(){
            this.$emit('func',this.myPag)
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
        //收藏
        changColl(data){
            console.log('视频id为' + data.id)
            console.log('视频被操作为' + data.is_collect)
            if(data.is_collect){
                this.operate = 1
            }else{
                this.operate = 2
            }
            let params = {
                'video_id': data.id,
                'operate': this.operate
            }
            service.post(configAPI.collOneVideo_url,
                Qs.stringify(params)
            ).then(result=>{
                console.log(result)
            })
        },
        chang(){
            console.log('ok')
        },
        // 删除播放记录
        delThisColl(i,j){
            this.$confirm('确认删除？')
            .then(()=> {
                // console.log(i,j)
                // this.data[i].list.splice(j,1)
                // this.data[i].total--
                // console.log('删除记录id1', this.data, i , j)
                // console.log('删除记录id2', this.data[i].list[j])
                let params = {
                    'video_id': this.data[i].list[j].id
                }
                service.post(configAPI.del_playerRecord_url,
                    Qs.stringify(params)
                ).then(result=>{
                    console.log('删除成功')
                    console.log(i,j)
                    this.data[i].list.splice(j,1)
                    this.data[i].total--
                })

            })
            .catch(() => {
                console.log('我不删')
            });
        }
    },
    // activated
    created(){
        // console.log(this.mainInfor[0])
        // console.log(this.myPag)
        this.sedPag()
        service.get(configAPI.PlayerRecord_url,{
            
        }).then(result=>{
            // console.log(result);
            let {data} = result;
            // let {result} = data
            // console.log(data.result);
            this.data = data.result
            console.log('历史记录', this.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
}
</script>
<style scoped>
    .playRecordContainer{
        height: 100%;
        width: 100%;
        padding: 10px 0 0px 3.1%;
        box-sizing: border-box;
    }
    .data{
        height: 39px;
        width:100%;
        padding: 0px 0px 19px 0px;
        box-sizing: border-box;
        display:flex;
    }
    .data_data{
        height:20px;display:flex
    }
    .data_data span{
        font-size:20px;color:#37BAA0;font-family:'FZLTHK--GBK1-0';line-height:1
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
        line-height:1.2;
        height:2.49vw;
        /* overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap; */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .floor-time{
        width:100%;height:16.875%;display:flex
    }
    .floor-time span{
        color:#E1E1E1;
        font-size:0.625vw;
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
        -webkit-line-clamp: 3;
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
        width:59.7%;height:100%;padding:2% 0 2% 18.1%;box-sizing:border-box;display:flex;justify-content:space-around
    }
    .floorIcon{
        width:20%;height:100%;
    }
    .personal-Record-coll{
        background-image: url('../images/personal-Record-coll.png');
        background-size: 100% 100%
    }
    /* .personal-Record-coll:hover{
        background-image: url('../images/personal-Record-coll-hover.png');
        background-size: 100% 100%
    } */
    .personal-Record-coll-hover{
        background-image: url('../images/personal-Record-coll-hover.png');
        background-size: 100% 100%
    }
    /* .personal-Record-coll-hover:hover{
        background-image: url('../images/personal-Record-coll.png');
        background-size: 100% 100%
    } */
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
    .aSty{
        cursor:pointer
    }
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
</style>
<style>
/*滚动条的宽度*/

    ::-webkit-scrollbar {
        width:9px;
        height:5px;
    }

/*外层轨道。可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果*/

    ::-webkit-scrollbar-track {
        width: 9px;
        background-color:#F4F7FD;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius:2em;
    }

/*滚动条的设置*/

    ::-webkit-scrollbar-thumb {
        background-color:#999999;
        background-clip:padding-box;
        min-height:28px;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius:2em;
    }
/*滚动条移上去的背景*/

    ::-webkit-scrollbar-thumb:hover {
         background-color:#999999;
    }
</style>