<template>
    <div class="upvideoContainer">
        <!-- <h1>这是视频上传</h1> -->
        <!-- <div class="headerAA"> -->
        <!-- </div> -->
        <div class="bottom">
            <div class="left">
                <div class="leftTop">
                    <div class="myImgDiv">
                        <div class="myImg">
                            <img v-if="avatar" v-bind:src="avatar" alt="" style="width:100%;height:100%;border-radius:50%">
                            <img v-else src="../images/pom.png" alt="" style="width:100%;height:100%;border-radius:50%">
                        </div>
                    </div>
                    <div class="myInFor">
                        <span style="font-size:15px;line-height:1;">{{user_name}}</span>
                        <div style="width:100%;height:34%"></div>
                        <span style="font-size:14px;line-height:1;">{{user_mobile}}</span>
                    </div>
                </div>
                <!-- 如果想把不同大小的图标和文字上下对齐，用flex -->
                <button class="leftBotton" @click="jump1()">
                    <div class="changDiv" v-if="checkPag == 1"  >
                        <div class="myDiv" style="background-color:#ebf8f5">
                            <div class="myDiv2" >
                                <img src="../images/playRecord-hover.png" alt="" >
                                <span style="font-size:14px;color:#37BAA0">播放记录</span>
                            </div>
                        </div>
                        <div class="sideDiv2" ></div>                    
                    </div>
                    <div v-else class="changDiv" >
                        <div class="myDiv" >
                            <div class="myDiv2">
                                <img src="../images/playRecord.png" alt="" >
                                <span style="font-size:14px;">播放记录</span>
                            </div>
                        </div>
                        <div class="sideDiv" ></div>
                    </div>
                </button>

                <button class="leftBotton" @click="jump2()">
                    <div class="changDiv" v-if="checkPag == 2"  >
                        <div class="myDiv" style="background-color:#ebf8f5">
                            <div class="myDiv2" >
                                <img src="../images/myCollection-hover.png" alt="" >
                                <span style="font-size:14px;color:#37BAA0">我的收藏</span>
                            </div>
                        </div>
                        <div class="sideDiv2" ></div>                    
                    </div>
                    <div v-else class="changDiv" >
                        <div class="myDiv" >
                            <div class="myDiv2">
                                <img src="../images/myCollection.png" alt="" >
                                <span style="font-size:14px;">我的收藏</span>
                            </div>
                        </div>
                        <div class="sideDiv" ></div>
                    </div>
                </button>

                <!-- <button class="leftBotton" @click="jump8()">
                    <div class="changDiv" v-if="checkPag == 8"  >
                        <div class="myDiv" style="background-color:#ebf8f5">
                            <div class="myDiv2" >
                                <img src="../images/myPlase-hover.png" alt="" >
                                <span style="font-size:14px;color:#37BAA0">我的点赞</span>
                            </div>
                        </div>
                        <div class="sideDiv2" ></div>                    
                    </div>
                    <div v-else class="changDiv" >
                        <div class="myDiv" >
                            <div class="myDiv2">
                                <img src="../images/myPlase.png" alt="" >
                                <span style="font-size:14px;">我的点赞</span>
                            </div>
                        </div>
                        <div class="sideDiv" ></div>
                    </div>
                </button>

                <button class="leftBotton" @click="jump3()">
                    <div class="changDiv" v-if="checkPag == 3"  >
                        <div class="myDiv" style="background-color:#ebf8f5">
                            <div class="myDiv2" >
                                <img src="../images/myDown-hover.png" alt="" >
                                <span style="font-size:14px;color:#37BAA0">我的下载</span>
                            </div>
                        </div>
                        <div class="sideDiv2" ></div>                    
                    </div>
                    <div v-else class="changDiv" >
                        <div class="myDiv" >
                            <div class="myDiv2">
                                <img src="../images/myDown.png" alt="" >
                                <span style="font-size:14px;">我的下载</span>
                            </div>
                        </div>
                        <div class="sideDiv" ></div>
                    </div>
                </button> -->
                
                <button class="leftBotton" @click="jump4()" >
                    <div class="changDiv" v-if="checkPag == 4"  >
                        <div class="myDiv" style="background-color:#ebf8f5">
                            <div class="myDiv2" >
                                <img src="../images/upVideo-hover.png" alt="" >
                                <span style="font-size:14px;color:#37BAA0">上传视频</span>
                            </div>
                        </div>
                        <div class="sideDiv2" ></div>                    
                    </div>
                    <div v-else class="changDiv" >
                        <div class="myDiv" >
                            <div class="myDiv2">
                                <img src="../images/upVideo.png" alt="" >
                                <span style="font-size:14px;">上传视频</span>
                            </div>
                        </div>
                        <div class="sideDiv" ></div>
                    </div>
                </button>

                <!-- <button class="leftBotton" @click="jump5()">
                    <div class="changDiv" v-if="checkPag == 5"  >
                        <div class="myDiv" style="background-color:#ebf8f5">
                            <div class="myDiv2" >
                                <img src="../images/videoAdmin-hover.png" alt="" >
                                <span style="font-size:14px;color:#37BAA0">视频管理</span>
                            </div>
                        </div>
                        <div class="sideDiv2" ></div>                    
                    </div>
                    <div v-else class="changDiv" >
                        <div class="myDiv" >
                            <div class="myDiv2">
                                <img src="../images/videoAdmin.png" alt="" >
                                <span style="font-size:14px;">视频管理</span>
                            </div>
                        </div>
                        <div class="sideDiv" ></div>
                    </div>
                </button>

                <button class="leftBotton" @click="jump9()">
                    <div class="changDiv" v-if="checkPag == 9"  >
                        <div class="myDiv" style="background-color:#ebf8f5">
                            <div class="myDiv2" >
                                <img src="../images/othersPlase-action.png" alt="" >
                                <span style="font-size:14px;color:#37BAA0">申请审核</span>
                            </div>
                        </div>
                        <div class="sideDiv2" ></div>                    
                    </div>
                    <div v-else class="changDiv" >
                        <div class="myDiv" >
                            <div class="myDiv2">
                                <img src="../images/othersPlase.png" alt="" >
                                <span style="font-size:14px;">申请审核</span>
                            </div>
                        </div>
                        <div class="sideDiv" ></div>
                    </div>
                </button> -->

                <button class="leftBotton" @click="jump6()" >
                    <div class="changDiv" v-if="checkPag == 6"  >
                            <div class="myDiv" style="background-color:#ebf8f5">
                                <el-badge v-if="this.$store.state.news > 0" :value="this.$store.state.news" :max="99" class="item" >
                                    <div class="myDiv2" >
                                        <img src="../images/newsMd-hover.png" alt="" >
                                        <span style="font-size:14px;color:#37BAA0">消息中心</span>
                                    </div>
                                </el-badge>
                                <div v-else class="myDiv2" >
                                    <img src="../images/newsMd-hover.png" alt="" >
                                    <span style="font-size:14px;color:#37BAA0">消息中心</span>
                                </div>
                            </div>
                        <div class="sideDiv2" ></div>                    
                    </div>
                    <div v-else class="changDiv" >
                        <div class="myDiv" >
                            <el-badge v-if="this.$store.state.news > 0" :value="this.$store.state.news" class="item">
                                <div class="myDiv2">
                                    <img src="../images/newsMd.png" alt="" >
                                    <span style="font-size:14px;">消息中心</span>
                                </div>
                            </el-badge>
                            <div v-else class="myDiv2">
                                <img src="../images/newsMd.png" alt="" >
                                <span style="font-size:14px;">消息中心</span>
                            </div>
                        </div>
                        <div class="sideDiv" ></div>
                    </div>
                </button>
               
                <button class="leftBotton" @click="jump7()">
                    <div class="changDiv" v-if="checkPag == 7"  >
                        <div class="myDiv" style="background-color:#ebf8f5">
                            <div class="myDiv2" >
                                <img src="../images/setting-hover.png" alt="" >
                                <span style="font-size:14px;color:#37BAA0">个人设置</span>
                            </div>
                        </div>
                        <div class="sideDiv2" ></div>                    
                    </div>
                    <div v-else class="changDiv" >
                        <div class="myDiv" >
                            <div class="myDiv2">
                                <img src="../images/setting.png" alt="" >
                                <span style="font-size:14px;">个人设置</span>
                            </div>
                        </div>
                        <div class="sideDiv" ></div>
                    </div>
                </button>
                
            </div>
            <div class="main">
                <!-- 缓存组件激活的状态 -->
                <!-- <keep-alive>   -->
                    <router-view @func="getPag"></router-view>
                <!-- </keep-alive> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components:{
        
    },
    data() {
      return {
          check:true,
          checkPag:1,
          user_name:'',
          user_mobile:'',
          avatar:''
      };
    },
    methods: {
        changImgSrc(){
            this.check = !this.check
        },
        getPag(data){
            console.log(data)
            this.checkPag = data
        },
        jump1(){
            // if(this.checkPag == 1){
                // return
            // }else{
                this.$router.push({path:'playRecord'})
            // }
        },
        jump2(){
            this.$router.push({path:'myCollection'})
            // this.checkPag = 2
        },
        jump3(){
            this.$router.push({path:'myDown'})
        },
        jump4(){
            this.$router.push({path:'upVideoOne'})
        },
        jump5(){
            this.$router.push({path:'/videoAdmin'})
        },
        jump6(){
            this.$router.push({path:'/newsMid'})   
        },
        jump7(){
            this.$router.push({path:'/personalSetting'})
        },
        jump8(){
            this.$router.push({path:'/myPlase'})
        },
        jump9(){
            this.$router.push({path:'/othersPlase'})
        }
    },
    created(){
        this.real_name = localStorage.getItem("real_name")
        this.avatar = localStorage.getItem("avatar")
        this.phone = localStorage.getItem("phone")
        this.user_name = this.real_name 
        this.user_mobile = this.phone 
        // 获取消息中心的提醒数量   如果为0的话就不用再重新获取了，因为获取方法里写的是统计，否则会叠加上去的
        // if(this.$store.state.news == 0){
        //     this.$store.dispatch('getdata')
        // }
    }
}
</script>
<style scoped>
    .upvideoContainer{
        width:100%;
        /* height: 100%; */
        height:92.6%;
    }
    .headerAA{
        width: 100%;
        height: 7.4%;
        background-color: #ffffff;
    }
    .bottom{
        display:flex;
        
        height: 100%;
        width:100%;
    }
    .left{
        /* flex:1.5; */
        width:16.67%;
        height: 100%;
        background-color: #FFFFFF;
        /* box-shadow:inset 0px 15px 10px -15px rgba(0, 0, 0, 0.11); */
    }
    .myImgDiv{
        height: 52.46%;
        width: 100%;
        padding:12.5%  36.25% 0 36.25%;
        box-sizing: border-box;
    }
    .myImg{
        /* width:100%; */
        /* height:100%; */
        height: 4.58vw;
        width: 4.58vw;
        border-radius:50%;
        background-color: antiquewhite;
        /* min-width: 67px;  */
        /* min-height: 67px; */
        /* max-width: 88px; 
        max-height: 88px; */
    }
    .myInFor{
        height: 47.54%;
        width: 100%;
        /* padding: 8.75% 33.4% 13.75% 33.4%; */
        padding: 8.75% 0 13.75% 0;
        box-sizing: border-box;
        text-align: center
    }
    .main{
        width:83.33%;
        height: 100%;
        background-color: #F4F7FD;
        overflow-y:scroll;
        /* padding: 38px 60px 0 60px */
        /* 内阴影 */
        /* box-shadow:inset 0px 15px 10px -15px rgba(0, 0, 0, 0.11); */
        
    }
    .leftTop{
        width: 100%;
        height: 24.4%;
        /* background-color: #e4e4e4; */
    }
    .leftBotton{
        width: 100%;
        border: 0px;
        padding:0px;
        background-color: #FFFFFF;
        outline:0px;
        /* height: 5%; */
        min-height: 55px;
        min-width: 100px;
        display:flex;
    }
    .leftBotton:hover{
        background-color: #F6F6F6;
        /* border-right:#F6F6F6  4px solid; */
    }
    /* .leftBotton:active span,.act span{
        color:#37BAA0;
    } */
    /* .leftBotton:active .chebian,.act .chebian{
        background-color: #37BAA0;
    } */
    /* .leftBotton:active,.act{
        background-color: #ebf8f5;
    } */
    .myDiv{
        display:flex;
        align-items:center;
        justify-content:space-around;
        width:100%;
        height: 100%;
        min-height: 55px;
        box-sizing: border-box;
    }
    .myDiv2{
        display:flex;
        width:106px;
        justify-content:space-between;
        height:18px;
        box-sizing: border-box;
        padding-right: 10px;
    }
    .changDiv{
        display:flex;
        align-items:center;
        justify-content:space-around;
        width:100%;
        height: 100%;
        min-height: 55px;
        box-sizing: border-box;
    }
    .sideDiv{
        height:55px;
        width:4px;
    }
    .sideDiv2{
        height:55px;
        width:4px;
        background-color: #37BAA0;
    }
</style>