<template>
    <!-- <h1>这是视频管理</h1> -->
    <div class="videoAdminContainer">
        <div class="upTimeDiv">
            <div class="labelDiv" style="display:flex;justify-content:space-between;align-items:baseline">
                <div style="width:80%;height:100%;display:flex;justify-content:space-between;align-items:baseline">
                    <div style="width:30.1%;height:100%">
                        <span style="font-size:0.78vw">上传时间：</span>

                        <el-select class="myStyle" v-model="value" placeholder="请选择" style="width:55%" @change="getTimeNews()">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div> 
                    <div style="width:30.1%;height:100%">
                        <span style="font-size:0.78vw">视频标签：</span>

                        <el-select class="myStyle" v-model="value2" placeholder="全部" style="width:55%" @change="getTimeNews()">
                            <el-option
                                v-for="item in options2"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="width:30.1%;height:100%">
                        <span style="font-size:0.78vw">发布状态：</span>

                        <el-select class="myStyle" v-model="value3" placeholder="全部" style="width:55%" @change="getTimeNews()">
                            <el-option
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div> 
                </div>
                <span style="color:#999999;font-size:0.73vw">共上传了{{allNewsNumber}}个视频</span>
            </div>
            <div class="upButton" @click="upNewVideo()">
                <img src="../images/upVideo-hover.png" alt="" style="height:100%">
                <span class="aSty" style="color:#37BAA0;font-size:0.78vw;">上传新视频</span>
            </div>
        </div>

        <div style="width:100%;height:2.1%"></div>
        <div style="width:100%;height:0.1%;background-color:#DCDEDE"></div>
        
        <div class="videoAdmin">

            <div class="videoAdmin_info" v-for="(item,i) in data" :key="item.id"> 
                <div class="videoAdmin_info_img" >
                    <!-- <img src="../images/imgTe3.jpg" alt="" > -->
                    <img :src="item.cover" alt="" >
                </div>
                <div class="videoAdmin_info_left">
                    <div class="videoAdmin_info_left_title" >
                        <span>《{{item.title}}》</span>
                        <div  v-if="item.status == 2" class="publishSucc" >
                            <span class="publishPro" >发布成功</span>
                        </div>
                        <div  v-if="item.status == 3" class="publishFail" >
                            <span class="publishPro" >发布失败</span>
                        </div>
                        <div  v-if="item.status == 1" class="publishing" >
                            <span class="publishPro" >审核中</span>
                        </div>
                    </div>
                    <div class="videoAdmin_info_left_bottom" >
                        <div class="videoAdmin_info_left_bottom_time" >
                            <span style="color:#999999">视频时长：</span>
                            <span>{{item.video_duration}}</span>
                        </div>
                        <div >
                            <div class="videoAdmin_info_left_bottom_class" >
                                <span style="color:#999999">视频分类：</span>
                                <span style="">{{item.category.name}}</span>
                            </div>
                            <div class="videoAdmin_info_left_bottom_operate">
                                <!-- style="visibility: hidden;" -->
                                <span v-if="item.status !== 2" class="aSty" @click="change(item.id)">编辑</span>
                                <span v-else style="visibility: hidden" class="aSty" @click="change(item.id)">编辑</span>
                                <span class="aSty" @click="del(item.id,i)" style="">删除</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 分页 -->
            <div style="width:100%;display:flex;justify-content:center;margin-bottom: 40px">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :hide-on-single-page= 'true'
                    background
                    layout = "prev, pager, next"
                    :page-size = 10
                    :total = paginationNumber>
                </el-pagination>
            </div>
        
        </div>
    </div>
</template>
<script>
import service from '../API/request';
import configAPI from '../API/configAPI';
import { Server } from 'http';
export default {
    data(){
        return{
            myPag:5,
            allNewsNumber:99,
            paginationNumber:0,
            page:'',
            pagesize:'',
            data:{},
            options: [{
                value: 1,
                label: '由新到旧'
            }, {
                value: 2,
                label: '由旧到新'
                }],
            options2: [],
            options3: [{
                value: '2',
                label: '发布成功'
            }, {
                value: '3',
                label: '发布失败'
            },{
                value: '1',
                label: '审核中'
            }],
            value:'',
            value2:'',
            value3:'',
            }
    },
    methods:{
        sedPag(){
            this.$emit('func',this.myPag)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val
            this.pagesize = 10
            this.getTimeNews()
        },
        del(itemID,i){
            this.$confirm('确认删除？')
            .then(_ => {
                // done();
                service.delete(configAPI.delVideoAdmin_url + itemID,{

                }).then(result=>{
                    console.log('删除成功')
                    //虽然这里删除成功了，但是还可以在观看记录中可以看到。可能测试环境中，这个视频不是我上传的，所有没有删除掉
                    this.data.splice(i,1)
                    this.allNewsNumber --
                    this.paginationNumber --
                })
            })
            .catch(_ => {});
        },
        change(videoId){
            console.log(videoId)
            var person = {
                    videoId:videoId
                }
            this.$router.push({path:'/upVideoOne',query:person})
            // this.$router.push('')
        },
        upNewVideo(){
            this.$router.push({ path: '/upVideoOne', })
        },
        getTimeNews(){
            // console.log(this.value)
            let params = {};
            if (this.value)  params["time_mode"] = this.value
            if (this.value2) params["filter[category_id]"] = this.value2
            if (this.value3) params["filter[status]"] = this.value3
            if (this.page) params["page"] = this.page
            if (this.pagesize) params["pagesize"] = this.pagesize

            service.get(configAPI.getVideoAdmin_url +'?include=category' , {
                params
            }).then(result=>{
                this.data = result.data.result.list
                this.paginationNumber =  result.data.result.total
                console.log('视频管理详情',result)
            })
        },
    },
    created(){
        this.sedPag()
        service.get(configAPI.getVideoAdmin_url + '?include=category',{

        }).then(result=>{
            this.data = result.data.result.list
            this.allNewsNumber = result.data.result.total
            this.paginationNumber = this.allNewsNumber
            console.log('视频管理详情', result)
        })
        service.get(configAPI.getVideoAdminClass_url,{

        }).then(result => {
            console.log(result)
            this.options2 = result.data.result[0]
        })
    }
}
</script>
<style scoped>
    .videoAdminContainer{
        width: 100%;
        height: 100%;
        padding-top: 1.56vw;
        box-sizing: border-box;
    }
    .upTimeDiv{
        padding: 0 3.75%;
        height: 4.15%;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .labelDiv{
        width: 67.6%;
        height: 100%;
    }
    .aSty{
        cursor:pointer
    }
    .publishSucc{
        width:9.6%;
        height:100%;
        background-image:url('../images/personal-video-publishSucc.png');
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .publishFail{
        width:9.6%;
        height:100%;
        background-image:url('../images/personal-video-publishFail.png');
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .publishing{
        width:8.23%;
        height:100%;
        background-image:url('../images/personal-video-publishing.png');
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }   
    .videoAdmin{
        width:100%;height:93.65%;padding:1.56vw 28.125vw 0 3.12vw;box-sizing:border-box
    }
    .videoAdmin_info{
        width:100%;height:7.1vw;margin-bottom:2%;display:flex
    }
    .videoAdmin_info_img{
        width:23.1%;height:100%;background: url(../img/undefinds_img.jpg);
        background-size: 100% 100%
    } 
    .videoAdmin_info_img img{
        width:100%;height:100%
    }   
    .videoAdmin_info_left{
        width:76.9%;height:100%;padding:2.9% 0 2% 2.8%;box-sizing:border-box;background-color:#FFFFFF
    } 
    .videoAdmin_info_left_title{
        width:100%;height:31.8%;display:flex;align-items:center;justify-content:space-between
    }
    .videoAdmin_info_left_title > span{
        font-size:0.88vw;color:#333333;line-height:1
    }
    .publishPro{
        color:white;font-size:0.625vw
    }
    .videoAdmin_info_left_bottom{
        width:100%;height:68.2%;padding:3.3% 2.88% 0 0;box-sizing:border-box
    }
    .videoAdmin_info_left_bottom_time{
        width:100%;height:50%;display:flex;align-items:flex-start
    }
    .videoAdmin_info_left_bottom_time ~ div{
        width:100%;height:50%;display:flex;
    }
    .videoAdmin_info_left_bottom_time span{
        font-size:0.625vw;line-height: 1;
    }
    .videoAdmin_info_left_bottom_class{
        width:85.12%;height:100%;display:flex;align-items:flex-end
    }
    .videoAdmin_info_left_bottom_class ~ div{
        width:14.88%;height:100%;display:flex;justify-content:space-between
    }
    .videoAdmin_info_left_bottom_class span{
        font-size:0.625vw;line-height: 1;
    }
    .videoAdmin_info_left_bottom_operate span{
        font-size:0.73vw;line-height: 1;
    }
    .videoAdmin_info_left_bottom_operate span:hover{
        color: #37BAA0
    }
    .upButton{
        height:0.78vw;width:7.57%;display:flex;align-items:center
    }
</style>
<style>
    .myStyle .el-input__inner{
        border: 0px;
        font-size:0.78vw;
        border-radius: 10px;
        height: 38px
    }
</style>