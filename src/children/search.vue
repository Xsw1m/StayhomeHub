<template>
<div class="container2">
    <homeaside v-if="seen"></homeaside>
    <timeaside v-if="!seen"></timeaside>
    <div style="display:flex;width:83.333%;height:99%;overflow:scroll;overflow-x:hidden;">
    <div class="main1">
        <div class="card1">
            搜索“<span style="color:#F39C34">{{this.search_result}}</span>”,共找到{{total}}个相关视频
        </div>
        <div>
            <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page"
            :hide-on-single-page=true
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            :total="total"
            style="margin-bottom:2%;"
            >
            </el-pagination>
            <div class="card2"
            v-for="(item,index) in search_details"
            :key="item.id"
            >
                <img v-if="item.cover_s" :src="item.cover_s" @click="getVideo(item)">
                <img v-if="!item.cover_s" src="../img/undefind_img.jpg" @click="getVideo(item)">
                <div class="content">
                    <span style="font-size:0.9375vw;font-weight:bold;">{{item.title}}</span>
                    <div style="width:20%;margin:3.4% 0 0 1%;display:flex;">
                        <span style="font-size:0.73vw;color:#999999;margin-right:12%;">标签:</span>
                        <span style="font-size:0.73vw;">{{item.category.name}}</span>
                    </div>
                    <div style="width:20%;margin:2.27% 0 0 1%;display:flex;">
                        <span style="font-size:0.73vw;color:#999999;margin-right:12%;">时长:</span>
                        <span style="font-size:0.73vw;">{{item.video_duration}}</span>
                    </div>
                    <div style="width:100%;margin:2.27% 0 0 1%;display:flex;padding-bottom:2%;">
                        <div style="width:5%;display:flex;margin-right:1%;">
                           <span style="font-size:0.73vw;color:#999999;">简介:</span> 
                        </div>
                        <div style="width:90%;line-height:1;">
                            <span  :class="[isseen !== index+1?'summary':'summary_style']" style="font-size:0.73vw;margin-bottom:1%;">{{item.introduction}}</span>
                            <div class="fold aSty" v-if="open !== index+1" style="color:#37BAA0;font-size:0.73vw;" @click="isopen(index+1)">展开<i class="el-icon-arrow-down"></i></div>
                            <div class="fold aSty" v-else style="color:#37BAA0;font-size:0.73vw;" @click="ishide(index)">收起<i class="el-icon-arrow-up"></i></div>
                        </div>
                    </div>
                    <div style="margin:1.6% 0 0 1.2%;display:flex;">
                        <div v-if="item.is_collect == false" style="width:8%;margin-right:10%;display:flex;align-items:center;justify-content: space-between;">
                            <img src="../img/collection.png" style="width:30%;cursor:pointer;" @click="iscollect(item)">
                            <span style="font-size:0.625vw;color:#999999;cursor:pointer;" @click="iscollect(item)">收藏</span>
                        </div>
                        <div v-else="item.is_collect == true" style="width:8%;margin-right:10%;display:flex;align-items:center;justify-content: space-between;">
                            <img src="../img/collection_style.png" style="width:30%;cursor:pointer;" @click="iscollect(item)">
                            <span style="font-size:0.625vw;color:#37BAA0;cursor:pointer;" @click="iscollect(item)">收藏</span>
                        </div>
                        <!-- <div style="width:8%;display:flex;align-items:center;justify-content: space-between;" >
                            <img src="../img/download.png" style="width:35%;cursor:pointer;" @click="downpopup(item.id)">
                            <span style="font-size:0.625vw;color:#999999;cursor:pointer;" @click="downpopup(item.id)">下载</span>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- 下载提醒组件  refs不是响应式的 不能再循环中使用,需要拿出使用，只需要每次向里面传递不同的数据就行了  -->
        <downPopup :parentVideoId="videoId" ref="downpopup"></downPopup>
        
        <!-- 观看权限认证组件 -->
        <popup :videoId="videoId" ref="child"></popup>
        <el-pagination
        background
        layout="prev, pager, next, jumper"
        :current-page="page"
        :hide-on-single-page=true
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        :total="total">
        </el-pagination>
    </div>
    <div class="main2">
        <!-- 标题 -->
        <div class="billboard_header">
            <div class="details_header">
                <img src="../img/hotsearch.png" style="width: 20%;height: 1.2615vw;">
                <span>热搜榜</span>
            </div>
        </div>
        <!-- 分页导航选项 -->
        <div class="billboard_tag">
            <div :class="[i.id == which_board?'tag_style':'tag']"
            @click="select_board(i.id)"
            v-for="i in tags"
            :key="i.id"
            >
            <span style="display: flex;align-items: center;">{{i.value}}</span>
            </div>
        </div>
        <!-- 循环出的榜单列表 -->
        <div class="billboard_list">
            <div style="height:2%;display:flex;align-items:center;padding: 4.7% 0px;border-bottom: 1px solid #E9ECEB;"
            v-for="(i,index) in board"
            :key="index+1"
            >
                <div :class="'tr'+(index+1)" >{{index+1}}</div>
                <span :class="'text'+(index+1)">{{i.title}}</span>
            </div>
        </div>
    </div>
    </div>
</div>
</template>
<script>
import timeaside from '../children/time_aside.vue'
import homeasider from '../children/home_aside.vue'
import configAPI from '../API/configAPI.js'
import service from '../API/request.js'
import downPopup from '../components/downPopup.vue'
import popup from '../components/popup.vue'
import Qs from 'qs'
export default {
    components: {
        'homeaside':homeasider,
        'timeaside':timeaside,
        'downPopup':downPopup,
        'popup':popup,
    },
    data () {
        return {
            open:'',
            isseen:'',
            operate:'',
            videoId:'',

            seen: false,
            search_result:'',
            total: 0,//总视频数量，
            pagesize: 15,
            page: 1,
            which_board:'1',//什么类型的榜单
            //收藏是否收藏了
            tags:[
                {id:1,value:'娱乐'},{id:2,value:'音乐'},{id:3,value:'舞蹈'},{id:4,value:'生活'},
            ],
            search_details:[],
            //榜单的类别具体内容
            board:[]
        }
    },
    methods:{
        isopen(id){
            this.isseen = id
            this.open = id
        },
        ishide(id){
            this.isseen = 0
            this.open = 0
        },
        select_board(id){
            this.which_board = id
            console.log("选择榜单类型"+this.which_board)
            //发送请求 获取榜单类型：
            service.get(configAPI.getvideolist,{
                params:{
                    'category_id': id,
                    'filter[status]': 2,
                    'page':1,
                    'pagesize':10,
                }
            }).then((result) => {
                // let data = result.data
                // this.board = data.result
                this.board = result.data.result.list
                console.log('热搜榜', this.board)
            }).catch((err) => {
                console.log('热搜榜出错', err)
            })
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
        //警告消息
        warning() {
        this.$message.error('请输入有效关键词');
      },
      //collect 收藏取消视频功能
      iscollect(data){
        if(data.is_collect == true){
            this.operate = 2     
        } else {
            this.operate = 1
        }
        let params = {
            'video_id': data.id,
            'operate': this.operate
        }
        service.post(configAPI.postcollection,
            Qs.stringify(params)
        ) .then((result) => {
            console.log(result)
            data.is_collect = !data.is_collect
        }).catch((err) => {
        });
        //更新数据
      },
      gethotlist(id){
          service.get(configAPI.getvideolist,{
                params:{
                    'category_id': id,
                    'filter[status]': 2,
                    'page':1,
                    'pagesize':10,
                }
            }).then((result) => {
                // let data = result.data
                // this.board = data.result
                this.board = result.data.result.list
                console.log('热搜榜', this.board)
            }).catch((err) => {
                
            })
      },
      getdata(){
          this.page = 1
            service.get(configAPI.getvideolist,{
            params: {
                        'filter[title]': this.search_result,
                        'include': 'category',
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
            }).then((result) => {
                // console.log("category:"+this.category)
                // console.log("year:"+this.year)
                let {data} = result;
                // console.log(data)
                // console.log(result)
                this.search_details = data.result.list
                this.total = data.result.total
                
            }).catch((err) => {
                
            });
      },
      handleCurrentChange(val){
            this.page = val
            console.log('搜索结果： ' + this.search_result)
            service.get(configAPI.getvideolist,{
            params: {
                        'filter[title]': this.search_result,
                        'include': 'category',
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
            }).then((result) => {
                // console.log("category:"+this.category)
                // console.log("year:"+this.year)
                let {data} = result;
                // console.log(data)
                // console.log(result)
                this.search_details = data.result.list
                this.total = data.result.total
                
            }).catch((err) => {
                
            });
        },
    },
    created(){
        this.search = JSON.parse(localStorage.getItem("search"))
        this.search_result=JSON.parse(localStorage.getItem("search"))
        // console.log("搜索结果:"+this.search_result)
        console.log("路由地址"+this.$route.query.from_path)
        if(this.$route.query.from_path == undefined||this.$route.query.from_path == '/time_axis'){
            this.seen = false
        }else{
            this.seen = true
        }
        //页面刷新搜索功能  
        if(this.search_result == ''){
            this.warning()
        }else{
        service.get(configAPI.getvideolist,{
            params: {
                        'filter[title]': this.search_result,
                        'include': 'category',
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
            }).then((result) => {
                // console.log("category:"+this.category)
                // console.log("year:"+this.year)
                let {data} = result;
                // console.log(data)
                // console.log(result)
                this.search_details = data.result.list
                this.total = data.result.total
                
            }).catch((err) => {
                
            });
            this.gethotlist(1)
        }
    },
    watch:{
        'search_result':function(newVal,oldVal){
            this.getdata()
        },
        '$route':function(to,from) {
            console.log("路由跳转"+to)
            this.search_result = to.query.search_result
        },
        
    }
}
</script>
<style scoped>
.aSty{
    cursor:pointer
}
.summary {
/* display: inline-block; */
line-height: 1.5;
white-space:pre-line;
overflow: hidden;
-webkit-line-clamp: 2;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
/* margin-bottom: 2%; */
}
.summary_style{
white-space:pre-line;
line-height: 1.5;
-webkit-line-clamp: 2;
text-overflow: ellipsis;
/* display: -webkit-box; */
display: inline-block;
}
.fold{
/* float: right; */
display: flex;
justify-content: flex-end;
align-items: flex-end;
}
/* 修改滚动条样式 */
.main1{
    height: 97%;
    width:67%;
    padding: 1.0417% 0 0 2.527%;
    margin-right: 6.5%;
}
.main2{
    height: 100%;
    width: 22%;
    margin-right: 2%;
}
.billboard_header{
    height: 6%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #D3DFDD;
    margin-top: 20.4924%;
    margin-bottom: 8.7824%;
}
.details_header{
width:30%;
font-size:0.9375vw;
display:flex;
justify-content:space-between;
}
.billboard_tag{
    display: flex;
    justify-content: space-between;
    height: 3.2%;
    margin-bottom: 8.7824%;
}
.tag{
    cursor:pointer;
    display: flex;
    align-content: center;
    justify-content: center;
    width: 23%;
    height: 1.6666vw;
    background: #DFF1EE;
    color: #7B8D89;
    font-size: 0.73vw;
    border-radius: 16px;
}
.tag_style{
    cursor:pointer;
    display: flex;
    align-content: center;
    justify-content: center;
    width: 23%;
    height: 1.6666vw;
    background: #37BAA0;
    color: #FFFFFF;
    font-size: 0.73vw;
    border-radius: 16px;
}
.card1{
/* height:4.1237%; */
/* width:29.3658192%; */
/* width: auto; */
background:#FFFFFF;
display: inline-block;
/* display:flex; */
/* align-items: center;
justify-content: center; */
padding: 1%;
line-height: 1;
box-sizing: border-box;
border-radius: 20px;
font-size: 0.73vw;
margin-bottom: 2.1415%;
}
.card2{
    margin-bottom:2.64831%;
    display: flex;
    justify-content: space-between;
}
.card2>img{
    width: 17.925%;
    height: 12.76vw;
    margin-right: 2.69%
}
.content{
    width: 79%;
}
.billboard_list{
    height: 100%;
    padding: 0 8%;
}
.tr1{
background:#37BAA0;
width:10%;
height:100%;
border-radius:0px 9px 9px 0px;
font-size: 0.729166vw;
color:#FFFFFF;
text-align:center;
margin-right:5%;
float: left;
}
.tr2{
background:#88DCCB;
width:10%;
height:100%;
border-radius:0px 9px 9px 0px;
font-size: 0.729166vw;
color:#FFFFFF;
text-align:center;
margin-right:5%;
float: left;
}
.tr3{
background:#C0EFE6;
width:10%;
height:100%;
border-radius:0px 9px 9px 0px;
font-size: 0.729166vw;
color:#FFFFFF;
text-align:center;
margin-right:5%;
float: left;    
}
.tr4,.tr5,.tr6,.tr7,.tr8,.tr9,.tr10{
background:#D8D8D8;
width:10%;
height:100%;
border-radius:0px 9px 9px 0px;
font-size: 0.729166vw;
color:#FFFFFF;
text-align:center;
margin-right:5%;
float: left;    
}
.text1,.text2,.text3{
    width: 90%;
    /* line-height: 1em; */
    font-size: 0.73vw;
    font-weight:bold;
    color: #333333;
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.text4,.text5,.text6,.text7,.text8,.text9,.text10{
    width: 90%;
    font-size: 0.73vw;
    color: #000000;
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
}
</style>