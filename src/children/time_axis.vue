<template>
    <div class="container2"> 
        <timeaside @req1="req1" :years="years"></timeaside>
        <div class="main">
<div class="container3">
        <div class="card">
            <!-- <div class="all_month">全部({{this.years}})</div> -->
            <div class="all_month aSty" @click="get_allmonth">全部</div>
            <div class="month">
                <div 
                v-for="(i,index) in columns"
                :class="[month==i.id?'details_month_style':'details_month']"
                @click="getmonth(i.id)"
                >{{i.item}}</div>
            </div>
            <div class="total">
                已为您找到<span>{{total}}</span>个视频
            </div>
        </div>
        <div class="card2">
        <div class="video_body">
            
            <div class="news1"
            v-for="sel in selection"
            :key="sel.id"
            > <!--  -->
                <div class="text1" v-popover="sel.id" @click="getVideo(sel)">《<span>{{sel.title}}</span>》</div>
                <div class="text2">视频时长: <span>{{sel.video_duration}}</span></div>
                <div class="text3">时间: <span>{{sel.shooting_time}}</span></div>
                <!-- <el-button v-popover="sel.id" >click 激活</el-button> -->
                <el-popover
                :ref="sel.id"
                placement="right-start"
                width="200"
                padding = "0"
                trigger="hover">
                    <img :src="sel.cover" alt="" style="height:100%;width:100%;"/>
                </el-popover>
            </div>
        </div>
        </div>
        <!-- 时间轴分页功能 -->
        <el-pagination
        background
        layout="prev, pager, next, jumper"
        :current-page="page"
        :hide-on-single-page=true
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        :total="total">
        </el-pagination>
        <!-- 观看权限认证组件 -->
        <popup :videoId="videoId" ref="child"></popup>
</div>
        </div>
    </div>
</template>
<script>
import timeaside from '../children/time_aside.vue'
import popup from '../components/popup.vue'
import Vue from 'vue'
//导入API
import configAPI from '../API/configAPI.js'
import service from '../API/request.js'

const axios = require('axios');
export default {
    data() {
        return {
            years:'2019',//之后可以储存到localstorage上
            month: 0,
            columns:'',
            videoId:'',
            allmonth:[
                {id: '01',item:'1月'},{id:'02',item:'2月'},{id:'03',item:'3月'},{id:'04',item:'4月'},{id:'05',item:'5月'},{id:'06',item:'6月'},{id:'07',item:'7月'},{id:'08',item:'8月'},{id:'09',item:'9月'},{id:10,item:'10月'},{id:11,item:'11月'},{id:12,item:'12月'},
            ],
            all00years:[
                {id:2009,item:'2009年'},{id:2008,item:'2008年'},{id:2007,item:'2007年'},{id:2006,item:'2006年'},{id:2005,item:'2005年'},{id:2004,item:'2004年'},{id:2003,item:'2003年'},{id:2002,item:'2002年'},{id:2001,item:'2001年'},{id:2000,item:'2000年'}
            ],
            all90years:[
                {id:1999,item:'1999年'},{id:1998,item:'1998年'},{id:1997,item:'1997年'},{id:1996,item:'1996年'},{id:1995,item:'1995年'},{id:1994,item:'1994年'},{id:1993,item:'1993年'},{id:1992,item:'1992年'},{id:1991,item:'1991年'},{id:1990,item:'1990年'}
            ],
            all80years:[
                {id:1989,item:'1989年'},{id:1988,item:'1988年'},{id:1987,item:'1987年'},{id:1986,item:'1986年'},{id:1985,item:'1985年'},{id:1984,item:'1984年'}
            ],
            status : 1,
            total: 0,
            pagesize: 20,
            page: 1,
            selection: [],
        }
    },
    components: {
        'timeaside':timeaside,
        'popup':popup,
    },
    methods: {
        getmonth(id){
            this.month = id;
            console.log("更改month:"+this.month)
        },
        req1(data){
            console.log("获取子级来的数据: "+data.isChecked)
            this.years = data.isChecked
            this.month = data.month
        },
        //时间轴子页面传值判断 向父组件传值状态表明自己是什么页面
        // judge(){
        //     console.log("我是时间轴"+this.status)
        //     this.$emit('judge',this.status)
        // },
        get(){
            console.log("获取视频"+this.years)
        },
        get_allmonth(){
            this.month = 0
            service.get(configAPI.gettimeaxis,{
                    params:{
                        'year':this.years,
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
                }).then((result) => {
                    this.selection = result.data.result.list
                    this.total = result.data.result.total
                }).catch((err) => {
                    
                });
                console.log("years: "+this.years)
        },
        //跳转视频详情页的方法，添加了是否含有观看权限
        getVideo(data){
            console.log(data)
            // 检查此视频有没有观看权限
            const _this = this
            if(data.user_watch_jurisdiction == 1){
                //这里是把视频的id传送过去
                var person = {
                    videoid:data.id
                }
                this.$router.push({name:'video',query:person})
            }else{
                _this.$refs.child.chang()
                this.videoId = data.id
            }
        },
        // 时间轴分页功能
        handleCurrentChange(val) {
            this.page = val
            this.updatapagelist()
        },
        updatapagelist() {
            if (this.month > 0 && this.month < 20) {
                service.get(configAPI.gettimeaxis,{
                    params:{
                        'year':this.years,
                        'month':this.month,
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
                }).then((result) => {
                    this.selection = result.data.result.list
                    this.total = result.data.result.total
                }).catch((err) => {
                    
                });
            } else if (this.month === 0) {
                service.get(configAPI.gettimeaxis,{
                    params:{
                        'year':this.years,
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
                }).then((result) => {
                    this.selection = result.data.result.list
                    this.total = result.data.result.total
                }).catch((err) => {
                    
                });
            } else if (this.month > 20) {
                service.get(configAPI.gettimeaxis,{
                    params:{
                        'year':this.month,
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
                }).then((result) => {
                    this.selection = result.data.result.list
                    this.total = result.data.result.total
                }).catch((err) => {
                    
                });
            } else {
                service.get(configAPI.gettimeaxis,{
                    params:{
                        'year':this.years,
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
                }).then((result) => {
                    this.selection = result.data.result.list
                    this.total = result.data.result.total
                }).catch((err) => {
                    
                });
            }
        }
    },
    created(){
        // this.req1()
        this.columns = this.allmonth
        this.get()
        console.log(this.month)
        service.get(configAPI.gettimeaxis,{
                params:{
                    'year':this.years,
                    'page':this.page,
                    'pagesize':this.pagesize,
                }
            }).then((result) => {
                console.log(result.data.result)
                this.selection = result.data.result.list
                console.log(this.selection)
                this.total = result.data.result.total
            }).catch((err) => {
                
            });
            
    },
    watch:{
        // 监听年份
        'years':function(newVal){
            this.page = 1
            console.log("监听,子级的数据发送请求 :"+newVal)
            //判断更改月份数值
            if(newVal >= 2010){
                this.columns = this.allmonth
            }
            if(newVal == 0){
                this.columns = this.all00years
            }
            if(newVal == 90){
                this.columns = this.all90years
            }
            if(newVal == 80){
                this.columns = this.all80years
            }
            //请求该年份视频
            service.get(configAPI.gettimeaxis,{
                params:{
                    'year':this.years,
                    'page':this.page,
                    'pagesize':this.pagesize,
                }
            }).then((result) => {
                this.selection = result.data.result.list
                this.total = result.data.result.total
            }).catch((err) => {
                
            });
        },
        // 监听月份
        'month':function(newVal){
            this.page = 1
            // console.log("月份"+this.years)
            if(newVal > 20){
                service.get(configAPI.gettimeaxis,{
                    params:{
                        'year':this.month,
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
                }).then((result) => {
                    this.selection = result.data.result.list
                    this.total = result.data.result.total
                }).catch((err) => {
                    
                }); 
            }else if(newVal == 13){
                service.get(configAPI.gettimeaxis,{
                    params:{
                        'year':this.years,
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
                }).then((result) => {
                    this.selection = result.data.result.list
                    this.total = result.data.result.total
                }).catch((err) => {
                    
                });
            }else{
                service.get(configAPI.gettimeaxis,{
                    params:{
                        'year':this.years,
                        'month':this.month,
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
                }).then((result) => {
                    this.selection = result.data.result.list
                    this.total = result.data.result.total
                }).catch((err) => {
                    
                });                 
            }
        }
    }
    
}
</script>
<style scoped>
.aSty{
cursor:pointer
}
.container2{
    height: 92.6%;
    background-color: #F4F7FD;
    width: 100%;
    /* min-width: 1200px; */
    display: flex;
}
  .main{
    background-color: #F4F7FD;
    color: #333;
    width: 83.334%;
    height: 100%;
    float: left;
    
  }
.container3{
    height:98%;
    /* padding: 2.5% 3.75% 0 3.6875%; */
    padding: 1% 0 0 3.6875%;
}
.card{
/* width:1510px;  */
display: flex;
justify-content: space-between;
margin-right: 1.2%;
margin-bottom: 1.9467878%;
/* margin-bottom: 2.02565834%; */
}
.card2{
    height: 80%;
    overflow:scroll;
    overflow-x:hidden;
    margin-bottom: 2%;
}
.all_month{
width:80px;
height:32px;
border-radius:16px;
background:#37BAA0;
display:flex;
align-items: center;
justify-content: center;
color: #FFFFFF;
font-size: 0.73vw;
margin-right: 2.701%;
}
.month{
    display: flex;
    justify-content: space-between;
    width: 67.476383%;
}
.details_month{
    cursor:pointer;
    font-size: 0.73vw;
    display: flex;
    align-items: center;
}
.details_month_style{
    cursor:pointer;
    font-size: 0.73vw;
    display: flex;
    align-items: center;
    color: #37BAA0
}
.total{
    color: #999999;
    font-size: 0.73vw;
    display: flex;
    align-items: center;
    /* 使最后一项居右对齐 */
    margin-left: auto;
}
.total span{
    font-size: 0.73vw;
    color: #000000;
}
/* 下方视频播放框 video  下方视频播放框 video下方视频播放框 video下方视频播放框 video下方视频播放框 video*/
.video_body{
    display: flex;
    /* justify-content: flex-start; */
    /* flex-wrap: wrap; */
    flex-direction:column; 
    /* height: 100%; */
}
.aSty{
    cursor:pointer
}
.news1{
    display: flex;
    justify-content:space-between;
    width: 60%;
    font-size: 0.73vw;
    padding:10px;
    box-sizing: border-box;
}
.text1{
line-height: 1;
overflow: hidden;/*超出部分隐藏*/
text-overflow:ellipsis;/* 超出部分显示省略号 */
white-space: nowrap;/*规定段落中的文本不进行换行 */
width:55%;
font-weight:bold;
cursor:pointer;
}
.text1:hover{
color: #37BAA0;
line-height: 1;
overflow: hidden;/*超出部分隐藏*/
text-overflow:ellipsis;/* 超出部分显示省略号 */
white-space: nowrap;/*规定段落中的文本不进行换行 */
width:55%;
font-weight:bold;
cursor:pointer;
}
.text1:active{
line-height: 1;    
color: #000000;
overflow: hidden;/*超出部分隐藏*/
text-overflow:ellipsis;/* 超出部分显示省略号 */
white-space: nowrap;/*规定段落中的文本不进行换行 */
width:55%;
font-weight:bold;
cursor:pointer;
}

.text1_style{
color: #37BAA0;
overflow: hidden;/*超出部分隐藏*/
text-overflow:ellipsis;/* 超出部分显示省略号 */
white-space: nowrap;/*规定段落中的文本不进行换行 */
width:55%;
font-weight:bold;
cursor:pointer;
}
.text2{
width:20%;
line-height: 1;
white-space: nowrap;/*规定段落中的文本不进行换行 */
overflow: hidden;/*超出部分隐藏*/
}
.text3{
width:20%;
line-height: 1;
white-space: nowrap;/*规定段落中的文本不进行换行 */
overflow: hidden;/*超出部分隐藏*/
}
</style>