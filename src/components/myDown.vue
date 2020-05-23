<template>
    <!-- <h1>这是播放记录</h1> -->
    <div class="myDownContainer">
        <div style="margin-top:28px">
            <div class="top-rail">
                <div class="data_data">
                    <div class="allDiv" style="display:flex;justify-content:center">
                        <span class="aSty" style="font-size:0.78vw;color:#FFFFFF;display:flex;align-items:center">全部({{allDownRecorde}})</span>
                    </div>
                </div>
                <div  class="everyClass" style="width:48.6vw;display:flex;justify-content:space-between;align-items:center;padding-left:2%;box-sizing:border-box">

                </div>
                <div class="delDiv" style="">
                    <div  class="aSty" @click="clear()">
                        <div class="delIcon" style="width:16px;height:16px;">
                            <!-- <img src="../images/personal-Coll-del.png" alt="" style="width:100%;height:100%"> -->
                        </div>
                        <span>清空</span>
                    </div>
                </div>
            </div>

            <div style="height:1px;width:98%;background-color:#DCDEDE;"></div>
            <div style="height:20px;width:100%;"></div>

            <div style="width:100%;height:100%;display:flex;justify-content: flex-start; flex-wrap: wrap">
                
                <div v-for='(item,i) in mainInfor' :key="item.i" class="mainInfor aSty" @mouseenter="onFloor(item.record_id)" @mouseleave="offFloor()">
                    <div style="width:100%;height:100%;position:relative">
                        <div class="img">
                            <img  v-bind:src='item.cover' alt="" style="width:100%;height:100%">
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
                                    <span >{{item.current_progress}}</span>
                                </div>
                            </div>
                        </div>
                        <!-- item.id == checkFloor -->
                        <div v-if="item.record_id == checkFloor" class="floor">
                            <div class="floorTop" >
                                <div class="floor-title"  >
                                    <span >{{item.title}}</span>
                                </div>
                                <div class="floor-time" >
                                    <span >时长：{{item.video_duration}}</span>
                                </div>
                                <div class="floor-introduction" >
                                    <span >{{item.introduction}}</span>
                                </div>
                            </div>
                            <div class="floorButtom" >
                                <div class="buttonDiv">
                                    <button @click="getVideo(item)">
                                        <span class="aSty">立即播放</span>
                                    </button>
                                </div>
                                <div class="iconDiv">
                                    <!-- 是否被收藏 -->
                                    <!-- 0 是没有被收藏 -->
                                    <div v-if="!item.is_collect" class="personal-Record-coll floorIcon" @click="chang(item.is_collect = !item.is_collect),changColl(item)">

                                    </div>
                                    <!-- 1 是收藏 -->
                                    <div v-if="item.is_collect" class="personal-Record-coll-hover floorIcon" @click="chang(item.is_collect = !item.is_collect),changColl(item)">

                                    </div>
                                    <!-- 是否下载 -->
                                    <div class="personal-Record-down floorIcon" @click="downpopup(item.id)">

                                    </div>
                                    <div class="personal-Record-del floorIcon" @click="delThisColl(item.record_id,i)">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 分页 -->
                <!-- 添加了只有一页消失的功能 -->
                <!-- <div style="width:100%;display:flex;justify-content:center;margin-bottom: 40px">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :hide-on-single-page='true'
                        @current-change="handleCurrentChange"
                        :page-size="10"
                        :total="100">
                    </el-pagination>
                </div> -->

            </div>

            <!-- 下载提醒组件  refs不是响应式的 不能再循环中使用,需要拿出使用，只需要每次向里面传递不同的数据就行了  -->
            <downPopup :parentVideoId="videoId" ref="downpopup"></downPopup>

            <!-- 观看权限认证组件 -->
            <popup :videoId="videoId" ref="child"></popup>

        </div>
    </div>
</template>
<script>
//导入下载和观看的弹窗
import downPopup from '../components/downPopup.vue'
import popup from '../components/popup.vue'
import service from '../API/request';
import configAPI from '../API/configAPI';
import Qs from 'qs'

export default {
    //弹窗命名
    components:{
        'downPopup':downPopup,
        'popup':popup
    },
    data(){
        return {
            checkFloor:0,
            myPage:3,
            videoId:'',
            getClassInfor:1,
            mainInfor:{},
            allDownRecorde:'',
        }
    },
    methods:{
        onFloor(id){
            // console.log(id)
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
        chang(){
            console.log('ok')
        },
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
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            // console.log(`当前页: ` + val);
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
        delThisColl(dataId,i){
            console.log('del')
            console.log(dataId)
            console.log(this.mainInfor)
            service.delete(configAPI.delDownRecord_url + dataId,{

            }).then(result => {
                // console.log(configAPI.delDownRecord_url + dataId)
                this.mainInfor.splice(i,1)
                console.log('删除成功')
            })

        },
        clear(){
            this.$confirm('确认清空？')
            .then(()=> {
                // done();
                // console.log('ok')
                service.delete(configAPI.delAllDownRecord_url,{

                }).then( result =>{
                    console.log('删除成功')
                    this.mainInfor = ''
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
        service.get(configAPI.getDownRecord_url,{
            
        }).then(result => {
            console.log(result)
            this.mainInfor = result.data.result.list
            this.allDownRecorde  = this.mainInfor.length
        }).catch(function (error) {
            console.log(error);
        });
    }
}
</script>
<style scoped>
    .myDownContainer{
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
        background-color:#333A3A;
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
        width:59.7%;height:100%;padding:2% 0 2% 18.1%;box-sizing:border-box;display:flex;justify-content:space-between
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