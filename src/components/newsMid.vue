<template>
        <div class="newsMidContainer">
        <div class="Top">
            <div class="myDiv">
                <span>系统消息</span>
            </div>
            <span class="aSty" @click="allwatch()">全部标记为已读</span>
        </div>

        <div style="width:100%;height:2.1%;"></div>
        <div style="width:100%;height:0.1%;background-color:#DCDEDE"></div>
        
        <div class="main">  
            <div class="newsDiv" v-for="(item ,index) in data" :key="item.id">
                <div class="everyNewsDiv aSty" @click="watch(item.id,index)">
                    <div v-if="item.status == 3" class="whiteDiv"></div>
                    <div v-if="item.status == 2" class="greenDiv"></div>
                    <div class="main_info">
                        <span class="aSty" style="line-height:1.5">{{item.content}}
                            <a v-if="item.type == 3" @click.prevent="downVideo(item)" style="color:#37BAA0" >点此下载</a>
                            <!-- <a v-if="item.type == 4" @click.prevent="getVideo(item)" style="color:#37BAA0">点此重新申请下载</a> -->
                            <a v-if="item.type == 1" @click.prevent="watchVideo(item)" style="color:#37BAA0">点此前往观看</a>
                            <!-- <a v-if="item.type == 2" @click.prevent="getVideo(item)" style="color:#37BAA0">点此重新申请观看</a> -->
                            <a v-if="item.type == 7" @click.prevent="shareVideo(item)" style="color:#37BAA0">立即分享</a>
                        </span>
                    </div>                   
                    <div class="main_data">
                        <span>{{item.send_time}}</span>
                    </div>
                </div>
            </div>
            <!-- 创建分享链接 -->
            <el-dialog
            title="分享创建链接"
            width="800"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :visible.sync="dialogVisible"
            >
            <el-form :model="temp" label-width="80px">
              <el-row v-if="step === 1">
                <el-col :span="20">
                  <el-form-item label="分享形式:">
                    <el-checkbox :checked="true" disabled>提取码</el-checkbox>
                    <span style="color: #C0C4CC;font-size:8px;">(仅限提供提取码形式进行分享)</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="step === 1">
                <el-col :span="4">
                  <el-form-item label="有效期:">
                    <el-select v-model="temp.value">
                        <el-option
                        v-for="item in validity"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="step === 1">
                <el-col :span="10">
                  <el-form-item label="分享下载:">
                    <el-radio v-model="temp.isdownload" :label="1">允许</el-radio>
                    <el-radio v-model="temp.isdownload" :label="2">不允许</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="step === 2">
                <el-col :span="20">
                  <el-form-item label="分享链接:">
                    <el-input v-model="temp.link">
                        <el-button slot="append" icon="el-icon-share" v-clipboard:copy="copy(temp)" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="step === 2">
                <el-col :span="4">
                  <el-form-item label="提取码:">
                    <el-input v-model="temp.code"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
                <hr>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="step = 2" v-if="step === 1">下一步</el-button>
                <el-button type="success" @click="createdShare" v-if="step === 2" v-clipboard:copy="copy(temp)" v-clipboard:success="onCopy" v-clipboard:error="onError">创建链接</el-button>
                <el-button type="primary" @click="step = 1" v-if="step === 2">上一步</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
              </div>
            </el-dialog>
            <!-- 分页 -->
            <div style="width:100%;display:flex;justify-content:center;margin-bottom: 40px">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :hide-on-single-page= 'true'
                    background
                    layout = "prev, pager, next"
                    :page-size = 15
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
import qs from 'qs'
export default {
    data(){
        return{
            myPag:6,
            data:{},
            newDownUrl:'',
            page:1,
            paginationNumber:0,//总数量
            dialogVisible: false,
            temp: {
              value: 1,
                isdownload: 1,
                link: 'http://history.ailive.cloud/?#/sharevideo',
                code: 0,
                info: 0,
            },
            validity: [
                {label: '1天',value: 1},
                {label: '7天',value: 7},
                {label: '无限期',value: 0},
            ],
            step: 1
        }
    },
    methods:{
        // 创建视频分享
        // 随机生成4位数字
        resetdialog(){
            this.temp = {
                value: 1,
                isdownload: 1,
                link: 'http://history.ailive.cloud/?#/sharevideo',
                code: 0,
                info: 0
            }
            // this.randomCode()
        },
        randomCode(){
            for (let i = 0; i < 4; i++) {
                var randomNum = Math.floor((Math.random()*10)+1)
                var power = Math.pow(10,i);
                this.temp.code = this.temp.code + randomNum*power
            }
        },
        createdShare(){// todo
            console.log('临时数据', this.temp)
            service.put(configAPI.share_activate,qs.stringify({
                id: this.temp.info,
                share_code: this.temp.code,
                useful_life: this.temp.link,
                is_download: this.temp.isdownload
            })).then((result) => {
                console.log('创建成功', result)
                this.copy(this.temp)
                this.dialogVisible = false
            }).catch((err) => {
                console.log(err)
            })
        },
        // 一键复制功能
        copy(data) {
            const value ='点击此链接进入观看：' + data.link + ' ' +'提取码为: ' + data.code
            return value
        },
        onCopy(){
            this.$message.success("内容已复制到剪切板！")
        },
        onError(){
            this.$message.error("抱歉，复制失败！")
        },
        sedPag(){
            this.$emit('func',this.myPag)
        },
        ok(){
            console.log(this.value)
        },
        downVideo(data){
            console.log(data.video_id)

            service.post(configAPI.downVideo_url + data.video_id,{
                
            }).then( result =>{
                console.log(result)
                this.newDownUrl = result.data.result.data
                console.log(this.newDownUrl)
                // location.replace(this.newDownUrl)
                // this.getAlllNews()
                var aLink = document.createElement('a') 
                aLink.download = 'filename' 
                aLink.href = this.newDownUrl
                // console.log(aLink)
                aLink.click()

            })
            // 检查此视频有没有观看权限
            // if(data.watch == 1){
            //     //这里是把视频的id传送过去
            //     var person = {
            //         videoid:data.videoId
            //     }
            //     this.$router.push({name:'video',query:person})
            // }else{
            //     // this.$refs.child.chang()
            //     // this.videoId = data.id
            //     console.log('已无权限')
            //     this.clear()
            // }
        },
        watchVideo(data){
            console.log(data.video_id)

            var person = {
                from:'admin',
                videoid:data.video_id,
            }
            // console.log(person)
            this.$router.push({name:'video',query:person})

            // service.post(configAPI.downVideo_url + data.video_id,{
                
            // }).then( result =>{
            //     console.log(result.data.result.data)
            //     this.newDownUrl = result.data.result.data
            //     console.log(this.newDownUrl)
            //     location.replace(this.newDownUrl)
            // })
            // 检查此视频有没有观看权限
            // if(data.watch == 1){
            //     //这里是把视频的id传送过去
            //     var person = {
            //         videoid:data.videoId
            //     }
            //     this.$router.push({name:'video',query:person})
            // }else{
            //     // this.$refs.child.chang()
            //     // this.videoId = data.id
            //     console.log('已无权限')
            //     this.clear()
            // }
        },
        shareVideo(data){
            // console.log('begin')
            console.log(data)
            this.step = 1
            // console.log('end')
            this.resetdialog()
            service.get(configAPI.share_validate, {
                params:{
                id: data.info
            }
            }).then((result) => {
                console.log(result)
                if(result.data.result === false){
                    this.$message.warning('您没有分享视频的权限')
                } else {
                    // this.resetdialog()
                    this.temp.info = data.info
                    this.temp.link = this.temp.link + '?info=' + data.info
                    console.log(this.temp.link)
                    this.dialogVisible = true
                    this.randomCode()
                }
            }).catch((err) => {
                console.log(err)
            })
            // this.dialogVisible = true
        },
        clear(){
            this.$confirm('已无观看权限，请重新申请')
            .then(()=> {
                // done();
                console.log('ok')
            })
            .catch(() => {
                console.log('no')
            });
        },
        watch(itemId,index){
            console.log(this.data[index].status)
            if(this.data[index].status == 2){
                service.put(configAPI.checkNew_url + itemId,{

                }).then(result => {
                    console.log('读了')
                    //在store中减少一个未读消息
                    this.$store.commit("reduction")
                    //本地为已读
                    this.data[index].status = 3
                    // this.data.forEach(element => {
                    //     if(element.id == itemId){
                    //         if(element.status == 2){
                    //             element.status = 3
                    //         }
                    //     }
                    // });
                }).catch(() => {
                    console.log('no')
                });
            }
            
        },
        allwatch(){            
            service.put(configAPI.checkAllNews_url,{
            }).then(result => {
                console.log('全部已读')
                this.data.forEach(element => {
                    if(element.status == 2){
                        element.status = 3
                    }
                });
                this.$store.commit("clear")
            })   
            
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val
            // this.pagesize = 10
            this.getAlllNews()
        },
        getAlllNews(){
            //  + '?page=1&pagesize=15'
            let params = {};
            if (this.page)  params["page"] = this.page 
            service.get(configAPI.getAllNews_url,{
                params:{
                    page:this.page,
                    pagesize:15
                }
            }).then(result => {
                console.log(result)
                this.data = result.data.result.list
                this.paginationNumber = result.data.result.total
                console.log(result.data.result.total)
            })
        }
    },
    created(){
        this.sedPag()
        this.getAlllNews()
    },
}
</script>
<style>
    .el-dialog /deep/ .el-dialog__body{
        border-top: 1px solid rgba(112, 112, 112, 0.609);
    }
</style>
<style  scoped>
    .newsMidContainer{
        width: 100%;
        height: 100%;
        padding-top: 1.56vw;
        box-sizing: border-box;
    }
    .Top{
        padding: 0 3.75%;
        height: 4.15%;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .Top > span{
        color: #37BAA0;
        font-size: 0.73vw;
        line-height: 1;
    }
    .main{
        width:100%;
        height:93.65%;
        padding:1.56vw 28.125vw 0 3.12vw;
        box-sizing:border-box
    }
    .myDiv{
        width:6.14%;
        height:100%;
        border-radius: 20px;
        background-color: #333A3A;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .myDiv span{
        font-size: 0.73vw;
        line-height: 1;
        color: #FFFFFF;
    }
    .newsDiv{
        width: 100%;
        height: 3.125vw;
        border-radius: 10px;
        background-color: #fff;
        
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin: 20px;
    }
    .everyNewsDiv{
        width:100%;height:100%;padding: 0 2% 0 1.6%;display:flex;align-items: baseline;justify-content: center;box-sizing: border-box;
    }
    .aSty{
        cursor:pointer
    }
    .greenDiv{
        width:0.83%;height:0.41vw;background-color:#37BAA0;border-radius:50%
    }
    .whiteDiv{
        width:0.83%;height:0.41vw;background-color:white;border-radius:50%
    }
    .main_info{
        width:85%;height:100%;padding-left:3.07%;display:flex;align-items: center
    }
    .main_info span{
        font-size:0.73vw;color:#333333;line-height:1
    }
    .main_data{
        width:14.17%;height:100%;display:flex;justify-content:flex-end
    }
    .main_data span{
        color:#999999;font-size:0.52vw;line-height:1
    }
</style>