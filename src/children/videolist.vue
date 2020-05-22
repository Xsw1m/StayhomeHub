<template>
  <div class="container2"> 
      <homeaside @req2="req2" :listid="listid"></homeaside>
<div class="main">
<!-- <div v-if="this.listid === 12?false:true" class="container3"> -->
    <div class="container3">

    <!-- <div class="card1" v-if="listid != 16 && listid!= 12 && listid!= 14"> -->
    <div class="card1" v-if="this.iscolumn != 0 ">
        <!-- 第一行3块 -->
        <div class="all_category aSty" @click="get_allcategory">全部</div>
        <div class="category"><!--  -->
            <div 
                v-for="(i,index) in allcategory"
                :class="[category==i.id?'details_category_style':'details_category']"
                @click="getcategory(i.id)"
                >{{i.name}}
            </div>
        </div>
    
        <div class="total">
            已为您找到<span>{{total}}</span>个视频
        </div>
    </div>
    <div class="card2">
        <div class="all_year aSty" @click="get_allyear">时间</div>
        <div class="year">
            <!-- 其他时间列表 -->
            <div 
                v-for="(i,index) in allyear"
                v-if="listid != 13"
                :class="[year==i.time_buckets?'details_year_style':'details_year']"
                @click="getyear(i.time_buckets)"
                >{{i.item}}
            </div>
            <!-- 人单合一的时间列表 -->
            <div 
                v-for="(i,index) in POOPallyear"
                v-if="listid === 13 "
                :class="[year==i.time_buckets?'details_year_style':'details_year']"
                @click="getyear(i.time_buckets)"
                >{{i.item}}
            </div>
        </div>
        <div style="display:flex;align-items:center;margin-left: auto;justify-content: space-between;width: 4%;">
            <img :src="[this.showModel===1?require('../../src/img/showModel1_focus.png'):require('../../src/img/showModel1.png')]" alt="" @click="changeshowModel1">
            <img :src="[this.showModel===2?require('../../src/img/showModel2_focus.png'):require('../../src/img/showModel2.png')]" alt="" @click="changeshowModel2">
        </div>
        <!-- <div class="total"  v-if="listid === 16 || listid === 12 || listid === 14"> -->
        <div class="total"  v-if="this.iscolumn === 0">    
            已为您找到<span>{{total}}</span>个视频
        </div>
    </div>
    <!-- 模式1  -->
        <div class="card3" v-if="this.showModel === 1">
    <div class="video_body">
        <div class="news2 aSty"
            @mouseenter="isfloor(pro.id)"
            @mouseleave="nofloor()"
            style="position:relative"
            v-for="pro in propaganda"
            :key="pro.id">
                <div class="container1">
                <!-- 绑定class -数据- -->
                    <div class="propaganda1" >
                        <div v-if="pro.cover_s" class="image_videolist":style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                        <!-- <img v-if="pro.cover" :src="pro.cover" alt="" style="width:100%;height:100%;"> -->
                        <img v-if="!pro.cover_s" src="../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                        <div class="video_length2">
                            <span class="duration">{{pro.video_duration}}</span>
                        </div>
                    </div>
                    <div class="text3"><span class="line3">{{pro.title}}</span></div>
                    <div class="text4"><span class="line4">{{pro.introduction}}</span></div>
                    <div v-if="pro.id == isFloor" class="floor1">
                            <div class="floorTop" style="margin-top:15%;margin-bottom:20%;">
                                <div class="floor-title"  >
                                    <span >{{pro.title}}</span>
                                </div>
                                <div class="floor-time" >
                                    <span >时长：{{pro.video_duration}}</span>
                                </div>
                                <div class="floor-introduction" >
                                    <span >{{pro.introduction}}</span>
                                </div>
                            </div>
                            <div class="floorButtom" >
                                <div class="buttonDiv">
                                    <button @click="getVideo(pro)">
                                        <span class="aSty">立即播放</span>
                                    </button>
                                </div>
                                <div class="iconDiv">
                                    <div 
                                    class="personal-Record-coll floorIcon" 
                                    :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                    @click="iscollect(pro)"
                                    >
                                    </div>
                                    <div class="personal-Record-down floorIcon" @click="downpopup(pro.id)">
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            
    </div>
    </div>
    <!-- 模式2  -->
        <div class="card3" v-if="this.showModel === 2">
    <div class="video_body">
        <div
        class="details2 aSty"
        @mouseenter="isfloor(pro.id)"
        @mouseleave="nofloor()"
        style="position:relative"
        v-for="pro in propaganda"
        :key="pro.id"
        >
            <div class="container4" style="display: flex;">
            <!-- <div class="container" style="display: flex;justify-content: space-between;"> -->
                <div class="propaganda2" >
                    <div v-if="pro.cover_s" class="image_videolist":style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                    <img v-if="!pro.cover_s" src="../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                </div>
                <div class="content">
                    <span>{{pro.title}}</span>
                    <span>时长：{{pro.video_duration}}</span>
                    <span>{{pro.introduction}}</span>
                </div>
                <div v-if="pro.id == isFloor" class="floor2">
                    <div class="floorButtom2" >
                        <div class="iconDiv2">
                            <div 
                            class="personal-Record-coll floorIcon2" 
                            :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                            @click="iscollect(pro)"
                            >
                            </div>
                            <div class="personal-Record-down floorIcon2" @click="downpopup(pro.id)">
                            </div>
                        </div>
                        <div class="buttonDiv2">
                            <button @click="getVideo(pro)">
                                <span class="aSty">立即播放</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            
    </div>
        <el-pagination
        background
        layout="prev, pager, next, jumper"
        :current-page="page"
        :hide-on-single-page=true
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        :total="total">
        </el-pagination>
        <!-- 下载提醒组件  refs不是响应式的 不能再循环中使用,需要拿出使用，只需要每次向里面传递不同的数据就行了  -->
        <downPopup :parentVideoId="videoId" ref="downpopup"></downPopup>
        
        <!-- 观看权限认证组件 -->
        <popup :videoId="videoId" ref="child"></popup>
    </div>
    
</div>
</div>
  </div>
</template>
<script>
import homeaside from '../children/home_aside.vue'
import downPopup from '../components/downPopup.vue'
import popup from '../components/popup.vue'
// import func from '../../Axios-登录跳转/vue-temp/vue-editor-bridge';
// import timeaside from './children/time_aside.vue'
import Vue from 'vue'
//导入API
import configAPI from '../API/configAPI.js'
import service from '../API/request.js'
const axios = require('axios');
export default {
    data () {
        
        return {
        showModel: 1, 
        checkFloor: 0,
        isFloor: 0,
        operate: '',
        videoId: '',
        
        listid: 1,
        category: 0,

        year: 0,

        total: 0,
        pagesize: 15,
        page: 1,

        allcategory: '',
        iscolumn: '',
        allyear:[
        {item:'2019',time_buckets:'2019'},{item:'2018',time_buckets:'2018'},{item:'2017',time_buckets:'2017'},{item:'2016',time_buckets:'2016'},{item:'1984-2015',time_buckets:'2015'},
        ],
        POOPallyear:[
        {item:'2019',time_buckets:'2019'},{item:'2018',time_buckets:'2018'},{item:'2017',time_buckets:'2017'},
        ],
        propaganda:[],
        }
    },
    components: {
            'homeaside':homeaside,
            'downPopup':downPopup,
            'popup':popup,
    },
    methods:{
        changeshowModel1(){
            this.pagesize = 15
            this.showModel = 1
            this.updatapagelist()
        },
        changeshowModel2(){
            this.pagesize = 14
            this.showModel = 2
            this.updatapagelist()
        },
        onFloor(id){
            this.checkFloor = id
        },
        offFloor(){
            this.checkFloor = 0
        },
        isfloor(id){
            this.isFloor = id
        },
        nofloor(){
            this.isFloor = 0
        },
      req2(data){
        console.log("获取子级传来的id:"+data)
        this.listid = data
      },
      getcategory(id){
        this.category = id
        console.log("更改category:"+this.category)
      },
      get_allcategory(){
        this.category = this.listid
        console.log(this.category)
      },
      get_allyear(){
        this.year = 0
      },
      getyear(id){
        this.year = id
        console.log("更改year:"+this.year)
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
        //collect 收藏取消视频功能
        iscollect(data){
        if(data.is_collect == true){
            this.operate = 2     
        } else {
            this.operate = 1
        }
        service.post(configAPI.postcollection+'operate='+this.operate+'&id='+data.id,{
        }) .then((result) => {
            console.log(result)
            data.is_collect = !data.is_collect
        }).catch((err) => {
        });
        //更新数据
        },
        //// 视频分页功能:
        handleCurrentChange(val){
            this.page = val
            this.updatapagelist()
        },
        updatapagelist(){
            if(this.category>0&&this.year>0){
                service.get(configAPI.getvideolist,{
                    params: {
                                'filter[category_id]': this.category,
                                'filter[status]': 1,
                                'page':this.page,
                                'pagesize':this.pagesize,
                                'time_buckets': this.year,
                            }
                    }).then((result) => {
                        // console.log("category:"+this.category)
                        // console.log("year:"+this.year)
                        let {data} = result;
                        console.log(this.category)
                        console.log('存在cate和 year')
                        // console.log(data)
                        // console.log(result)
                        this.propaganda = data.result.list
                        this.total = data.result.total
                        
                    }).catch((err) => {
                        
                });
            }else if(this.category>0){
                service.get(configAPI.getvideolist,{
                    params: {
                                'filter[category_id]': this.category,
                                'filter[status]': 1,
                                'page':this.page,
                                'pagesize':this.pagesize,
                            }
                    }).then((result) => {
                        let {data} = result;
                        this.propaganda = data.result.list
                        this.total = data.result.total
                        
                    }).catch((err) => {
                        
                });
            }else if(this.year>0){
                service.get(configAPI.getvideolist,{
                    params: {
                                'time_buckets': this.year,
                                'page':this.page,
                                'pagesize':this.pagesize,
                            }
                    }).then((result) => {
                        // console.log("category:"+this.category)
                        // console.log("year:"+this.year)
                        let {data} = result;
                        // console.log(data)
                        // console.log(result)
                        this.propaganda = data.result.list
                        this.total = data.result.total
                        
                    }).catch((err) => {
                        
                });
            }else{
                service.get(configAPI.getvideolist,{
                    params: {
                        'filter[category_id]': this.listid,
                        'filter[status]': 1,
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
                }).then((result) => {
                    // console.log("category:"+this.category)
                    // console.log("year:"+this.year)
                    let {data} = result;
                    // console.log(data)
                    // console.log(result)
                    this.propaganda = data.result.list
                    this.total = data.result.total
                    
                }).catch((err) => {
                    
                });
            }
            
        }
    },
    created () {
        //注意之后，后端做好后 ，if 判断要判断本地储存，此处有需要修
        this.listid = this.$route.query.listid
            service.get(configAPI.getcategory+this.listid,{
                
            }).then((result) => {
                console.log('这是请求的种类'+this.listid)
                this.allcategory = result.data.result.list
                this.iscolumn = this.allcategory.length
                console.log('是否存在子栏目', result)
                // console.log(this.iscolumn)
            }).catch((err) => {
                
            });
            service.get(configAPI.getvideolist,{
                params: {
                    'filter[category_id]': this.listid,
                    'filter[status]': 1,
                    'page':this.page,
                    'pagesize':this.pagesize,
                }
            }).then((result) => {
                // console.log("category:"+this.category)
                // console.log("year:"+this.year)
                let {data} = result;
                // console.log(data)
                // console.log(result)
                this.propaganda = data.result.list
                this.total = data.result.total
                
            }).catch((err) => {
                
            });
    },
    watch:{
        //注意之后，后端做好后 ，if 判断要判断本地储存，此处有需要修改
        'listid':function(newVal){
            this.page = 1
            this.category = this.listid
            this.year = 0
            service.get(configAPI.getcategory+this.listid,{
                
            }).then((result) => {
                // console.log("hhhhhhh"+this.listid)
                this.allcategory = result.data.result.list
                this.iscolumn = result.data.result.list.length
                // console.log(result.data.result.list.length)
                // console.log(result.data.result.list.length)
                console.log(this.iscolumn)
            }).catch((err) => {
                
            });
            // 获取父栏目下的视频
            service.get(configAPI.getvideolist,{
            params: {
                'filter[category_id]': this.listid,
                'filter[status]': 1,
                'page':this.page,
                'pagesize':this.pagesize,
            }
            }).then((result) => {
                // console.log("category:"+this.category)
                // console.log("year:"+this.year)
                let {data} = result;
                // console.log(data)
                // console.log(result)
                this.propaganda = data.result.list
                this.total = data.result.total
            }).catch((err) => {
                
            });
        },
        'category':function(newVal){
            this.page = 1
            console.log("page页码:"+this.page)
            if(this.year>2){
            service.get(configAPI.getvideolist,{
                params: {
                        'filter[category_id]': this.category,
                        'filter[status]': 1,
                        'time_buckets': this.year,
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
            }).then((result) => {
                // console.log("category:"+this.category)
                // console.log("year:"+this.year)
                let {data} = result;
                // console.log(data)
                // console.log(result)
                this.propaganda = data.result.list
                this.total = data.result.total
                
            }).catch((err) => {
                
            });
            }else{
            service.get(configAPI.getvideolist,{
                params: {
                        'filter[category_id]': this.category,
                        'filter[status]': 1,
                        // 'time_buckets': this.year
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
            }).then((result) => {
                // console.log("category:"+this.category)
                // console.log("year:"+this.year)
                let {data} = result;
                // console.log(data)
                // console.log(result)
                this.propaganda = data.result.list
                this.total = data.result.total
                
            }).catch((err) => {
                
            }); 
            }
            
        },
        'year':function(newVal){
            this.page = 1
            if(newVal>2){
                if(this.category>0){
                service.get(configAPI.getvideolist,{
                    params: {
                        'filter[category_id]': this.category,
                        'filter[status]': 1,
                        'time_buckets': this.year,
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
                }).then((result) => {
                    let {data} = result;

                    this.propaganda = result.data.result.list
                    this.total = result.data.result.total
                }).catch((err) => {
                    console.log("出错啦")
                    console.log(err)
                });
                }else{
                service.get(configAPI.getvideolist,{
                    params: {
                        'filter[category_id]': this.category,
                        'filter[status]': 1,
                        'time_buckets': this.year,
                        'page':this.page,
                        'pagesize':this.pagesize,
                    }
                }).then((result) => {
                    let {data} = result;

                    this.propaganda = result.data.result.list
                    this.total = result.data.result.total
                }).catch((err) => {
                    console.log("出错啦")
                    console.log(err)
                }); 
                }
            }else{
                service.get(configAPI.getvideolist,{
                params: {
                    'filter[category_id]': this.listid,
                    'filter[status]': 1,
                    'page':this.page,
                    'pagesize':this.pagesize,
                }
                }).then((result) => {
                    // console.log("category:"+this.category)
                    // console.log("year:"+this.year)
                    let {data} = result;
                    // console.log(data)
                    // console.log(result)
                    this.propaganda = data.result.list
                    this.total = data.result.total
                }).catch((err) => {
                    
                });
            }
        },    
    }

}
</script>
<style scoped>
/* floor1 */
.floor1{
    width: 100%;
    height: 100%;
    background:linear-gradient(rgba(0, 0, 0, 0.479),rgb(0, 0, 0));
    opacity: 0.99;
    position: absolute;
    bottom: 0%;
    padding: 20% 10% 60%  10%;
    box-sizing: border-box;
}
.floor-title{
    width:100%;height:22.5%;display:flex    
}
    .floor-title span{
        color:#FFFFFF;
        font-size: 0.78125vw;
        line-height:1.1;
        height:100%;
        overflow:hidden;
        text-overflow: ellipsis;/* 多余的省略号表示 */
        /* white-space: nowrap; */
        
    }
    .floor-time{
        width:100%;height:16.875%;display:flex
    }
    .floor-time span{
        color:#E1E1E1;font-size:0.625vw
    }
    .floor-introduction{
        width:100%;height:60.625%
    }  
    .floorTop{
        width:100%;height:84.3%
    } 
    .floorButtom{
        width:100%;
        height: 15.25%;
        display:flex
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
        width:59.7%;
        height:100%;
        padding:2% 0 2% 25%;
        box-sizing:border-box;
        display:flex;
        justify-content:space-between
    }
    .floorIcon{
        width:25%;height:100%;
    }
    .personal-Record-coll{
        background-image: url('../images/personal-Record-coll.png');
        background-size: 100% 100%
    }
    .personal-Record-coll_style{
        background-image: url('../images/personal-Record-coll-hover.png');
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
/* :end */
/* floor2 */
.floor2{
    width: 100%;
    height: 100%;
    
    background:linear-gradient(270deg,rgba(0, 0, 0, 0.931),rgba(0, 0, 0, 0.137));
    opacity: 0.99;
    position: absolute;
    bottom: 0%;
    /* padding: 20% 10% 60%  10%; */
    box-sizing: border-box;
}
    .floorButtom2{
        width:30%;
        height: 100%;
        display:flex;
        text-align: center;
        margin-left: auto;
        padding-right: 5%; 
    } 
    .buttonDiv2{
        width:100%;
        height:100%;
        display:flex;
        align-items: center;
        margin-left: 10%; 
    }
    .buttonDiv2 button{
        width:80%;
        height:20%;
        background-color:#37BAA0;
    }
    .buttonDiv2 span{
        color:#FFFFFF;font-size:0.625vw
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
    .iconDiv2{
        width:50%;
        height:100%;
        box-sizing:border-box;
        display:flex;
        justify-content:space-between;
        align-items: center;
    }
    .floorIcon2{
        width:32%;
        height:12%;
        /* padding-left: 50%;  */
        /* margin-right: 20%; */
    }
/* :end */
.container4{
    height: 100%;
    background-color: #F4F7FD;
    width: 100%;
    /* min-width: 1200px; */
    display: flex;
}
.main{
  background-color: #F4F7FD;
  color: #333;
  width: 83.334%;
  /* min-width: 1000px; */
  /* height: 52.08333334vw; */
  height: 100%;
  
  /* float: left; */
}
.aSty{
cursor:pointer
}
.container3{
    height:97%;
    padding: 1% 0 0 3.6875%;
}
.card1{
    height: 3.2%;
/* width:1510px;  */
display: flex;
justify-content: space-between;
margin-right: 1.2%;
margin-bottom: 1.742%;
}
.card2{
    height: 3.2%;
  /* width:1510px;  */
display: flex;
justify-content: flex-start;
margin-right: 1.2%;
margin-bottom: 2.02565834%;
}
.card3{
height:78.2%;
overflow:scroll;
overflow-x:hidden;
margin-bottom: 2%;
}
.all_category,.all_year{
width:80px;
/* height:32px; */
border-radius:16px;
background:#37BAA0;
display:flex;
align-items: center;
justify-content: center;
color: #FFFFFF;
font-size: 0.73vw;
margin-right: 2.701%;
}
.category{
    display: flex;
    width: 42.5%;
}
.year{
    display: flex;
    justify-content: space-between;
    width: 30%;
}
.details_category,.details_year{
    cursor:pointer;
    font-size: 0.73vw;
    display: flex;
    align-items: center;
}
.details_category, .details_category_style {
    margin-right: 7%;
}
.details_category_style,.details_year_style{
    cursor:pointer;
    font-size: 0.73vw;
    display: flex;
    align-items: center;
    color: #37BAA0
}
.total{
    color: #999999;
    display: flex;
    align-items: center;
    /* 使最后一项居右对齐 */
    margin-left: auto;
    font-size: 0.73vw;
}
.total span{
    font-size: 0.73vw;
    color: #000000;
}
/* 下方视频播放框 video  下方视频播放框 video下方视频播放框 video下方视频播放框 video下方视频播放框 video*/
.video_body{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    /* height: 90%; */
    height: 21.9270833vw;
    margin-bottom: 5%;
}
.news2{
    height: 100%;
    /* height: 55.302%; */
    width: 18.408%;
    display: inline-block;
    margin-right: 1%;  
    margin-bottom: 1.5%;
}
.details2{
    width: 49%;
    height: 37%;
    /* height: 55.302%; */
    /* width: 100%; */
    display: inline-block;
    margin-right: 1%;  
    margin-bottom: 0.5%;
}
.image_videolist{
    height: 100%;
    /* background:url(../img/banner3.jpg); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.container1{
    width: 100%;
    height: 100%;
}
.duration{
display: flex;
justify-content:center;
align-items: center;
width: 100%;
height: 100%;
font-size:0.625vw;
font-family:FZLanTingHei-R-GBK;
color:rgba(255,255,255,1);
opacity:1;
}
.video_length2{
/* margin: 113.487% 2.133% 2.128% 74.4771%;
display: inline-block; */
position:absolute;
left: 75%;
bottom:19%;
width:23.409%;
height:5.780347%;
background:rgba(0,0,0,1);
opacity:1;
border-radius:10px;
line-height: 1;
}
.propaganda1{
    width:100%;
    height:82.2%;
}
.propaganda2{
    width:18%;
    height:100%;
    margin-right: 3%;
}
.content{
    width: 70%;
    display:flex;
    flex-flow: column;
    margin: auto 0;
}
.content span{
    display: inline-block;
    margin-bottom: 2%;
    font-size: 0.73vw;
    line-height: 1.2;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
    overflow: hidden;/* 超出部分隐藏 */
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    /* white-space: nowrap;规定段落中的文本不进行换行 */
    
}
.content_button{
width:12%;
display:flex;
height:100%;
padding: 6% 0%;
margin-right: 1%;
box-sizing: border-box;
}
.text3{
    background-color:rgba(255,255,255,1);
    height: 3.802%;
    line-height: 1;
    padding: 4.97% 0px 1px 10px;
}
.text4{
    background-color:rgba(255,255,255,1);
    height: 4.753%;
    line-height: 1;
    padding: 3.5% 0px 3.8% 10px;
    
}
.line3{
width:91%;
/* height:16px; */
font-size:0.78125vw;
font-family:FZLanTingHei-R-GBK;
font-weight:bold;
color:rgba(51,51,51,1);
}
.line4{
width:92%;
/* height:14px; */
font-size:0.73vw;
font-family:FZLanTingHei-R-GBK;
font-weight:400;
color:rgba(102,102,102,1);
}
.text1 span,.text2 span,.text3 span,.text4 span{
    display: inline-block;
    line-height: 1em;
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.showModel1{

}
.showModel2{

}
</style>