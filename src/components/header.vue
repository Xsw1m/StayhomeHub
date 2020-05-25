<template>
    <div class="header">
        <div class="logo" @click="tohomepage">
        </div>
        <div class="search">
            <form action="" class="parent">
                <input type="search" id="search_input" class="search_input" placeholder="搜 索" 
                autocomplete="off"
                @focus="focus"
                @blur="blur"
                @keyup.enter="input_search"
                v-model="search" 
                >
                <!--  -->
                <div class="search_btn" @click="input_search"><img src="../img/search.png"></div>
                <div class="search_dropdown" v-if="seen">

                    <div class="search_dropdown_history" style="margin-bottom:2.3364486%;">
                        <span class="search_dropdown_header">历史搜索</span>
                        <div v-for="item in searchData" :key="item.id">
                            <div class="tr content" id="content" 
                            @mousedown="search_push"
                            tabindex="0"
                            >{{item}}</div>
                        </div>
                        
                    </div>
                    <!--<div class="search_dropdown_hot" style="margin-bottom:2.3364486%;">
                        <span class="search_dropdown_header">热门搜索</span>
                        <div class="tr">
                            <div class="option1">1</div>
                            <span class="content" id="content" @mousedown="search_push" tabindex="0">{{search_hot[0].title}}</span>
                        </div>
                        <div class="tr" >
                            <div class="option2">2</div>
                            <span class="content" id="content" @mousedown="search_push" tabindex="0" >{{search_hot[1].title}}</span>
                        </div>
                        <div class="tr">
                            <div class="option3">3</div>
                            <span class="content" id="content"  @mousedown="search_push" tabindex="0">{{search_hot[2].title}}</span>
                        </div>
                        <div class="tr">
                            <div class="option4">4</div>
                            <span class="content" id="content"  @mousedown="search_push" tabindex="0">{{search_hot[3].title}}</span>
                        </div>
                        <div class="tr" >
                            <div class="option5">5</div>
                            <span class="content" id="content" @mousedown="search_push" tabindex="0">{{search_hot[4].title}}</span>
                        </div>
                    </div>
                    <div v-if="false" class="search_dropdown_recommend" style="margin-bottom:0.868%;">
                        <span class="search_dropdown_header">推荐搜索</span>
                        <div class="tr" >
                            <div class="option1">1</div>
                            <span class="content" id="content" @mousedown="search_push" tabindex="0">{{search_recommend[0].title}}</span>
                        </div>
                        <div class="tr" >
                            <div class="option2">2</div>
                            <span class="content" id="content" @mousedown="search_push" tabindex="0">{{search_recommend[1].title}}</span>
                        </div>
                        <div class="tr" style="margin-bottom:1px;" >
                            <div class="option3">3</div>
                            <span class="content" id="content" @mousedown="search_push" tabindex="0">{{search_recommend[2].title}}</span>
                        </div>
                    </div> -->
                </div>
            </form>
        </div>
    <div class="function">
        <div class="history" @click="toplayRecord" tabindex="0"></div>
        <div class="collection" @click="tomyCollection" tabindex="0"></div>
        <!-- <div class="download" @click="tomyDown" tabindex="0"> </div> -->
        <div class="upload">
            <upload-drop></upload-drop>
        </div>
        <div class="messages" @click="tomessages" tabindex="0"><el-badge is-dot class="item" v-if="this.$store.state.news > 0"></el-badge></div>
        <div class="user">
            <user-drop></user-drop>
        </div>
        <!-- header结束 -->
    </div>
    </div>
</template>
<script>
import user_drop from '../dropdown/user_drop.vue'
import upload_drop from '../dropdown/upload_drop.vue'

import configAPI from '../API/configAPI.js'
import service from '../API/request.js'
export default {
    data() {
        return {
            search:'',//inputval
            searchData:'',//..localStorage->arr
            seen: false,
            username:'',
            useraccount:'',
            search_hot:[],
            search_recommend:[],
        }
    },
    methods: {
        tohomepage(){
            this.$router.push('/homepage')
        },
        toplayRecord(){
            this.$router.push('/personalCenter')
        },
        tomyCollection(){
            this.$router.push('/myCollection')
        },
        tomyDown(){
            this.$router.push('/myDown')
        },
        tomessages(){
            this.$router.replace('/newsMid')
        },
        focus(){
            this.seen = true;
            console.log('打开搜索推荐下拉')
        },
        blur(){
            this.seen = false;
            console.log('关闭搜索推荐下拉')
        },
        search_push(){
            var el = event.currentTarget;
            this.search = el.innerHTML;
            this.input_search()
        },
        input_search(){
            var arr=[];
            if(localStorage.getItem("searchData")){
            arr=JSON.parse(localStorage.getItem("searchData")); 
            if(arr.length<2){
                if(this.search !== ''){
                    arr.unshift(this.search);
                    }else{
                    console.log("不能为空")
                }
            }else{
                if(this.search !== ''){
                arr.pop();
                arr.unshift(this.search);
                }else{
                    console.log("不能为空")
                }
            }
            }else{
                arr.unshift(this.search);
            }
            window.localStorage.setItem("searchData",JSON.stringify(arr));
            this.updata_search();
            console.log(this.search)
            console.log(arr)
            window.localStorage.setItem("search",JSON.stringify(this.search));
            this.$router.push({path:'/search',query:{search_result:this.search}})
        },
        updata_search(){
            this.searchData = JSON.parse(localStorage.getItem("searchData"))
            
        }
    },
    created(){
        this.updata_search()
        // 获取搜索列表 推荐搜索类
        // service.get(configAPI.getsearch_recommend,{
                
        //     }).then((result) => {
        //         this.search_recommend = result.data.result.list
        //         // console.log(this.selection)
        //     }).catch((err) => {
                
        //     });
        // service.get(configAPI.getsearch_hot,{

        // }).then((result) => {
        //     let data = result
        //     this.search_hot = data.data.result
        //     // console.log(data)
        // }).catch((err) => {
            
        // });
    },
    components:{
        'user-drop': user_drop,
        'upload-drop':upload_drop,
    }
}
</script>
<style scoped>
/* 全局变量 */
.header{
  position: relative;
  background:rgba(35,37,37,1);
  height: 7.4%;
  width: 100%;
    /* min-width: 1920px; */
    display: flex;
    white-space: nowrap;
    align-items: center;
}
/* .header>div{ */
    /* float: left; */
/* } */
/* logo配置 */
.logo{
    cursor:pointer;
    background:url('../img/stayhome.png');
    background-repeat:no-repeat;
    background-size:100% 100%;
    /* width: 9.6875%; */
    height: 2.6833vw;
    width: 7.0457176%;
    margin: auto 22.1041667% auto 4.66667%;
    /* width: 487px;
    height: 144px; */
}
/* search搜索框 */
.search{
    width: 32.2917%;
    height: 2.604167vw;
    padding-top: 0.78125vw;
    padding-bottom: 0.78125vw;
    border-radius: 25px;
}

.search_input{
    font-size: 1vw;
    color: rgba(255, 255, 255, 1);
    height: 2.604167vw;
    width: 85.1612903%;
    width: 78.5%\9\0;
    outline: none;
	border: none;
    text-align: start;
    background: rgba(51, 51, 51, 1);
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    float: left;
    padding: 0px 0px 0px 6.4516%;
    -webkit-appearance:none; /*去除input默认样式*/
    line-height: 1;
}
@media screen and (max-width: 1440px) {
    .search_input{
        font-size: 1vw;
        color: rgba(255, 255, 255, 1);
        height: 2.604167vw;
        width: 78.5%;
        width: 78.5%\9\0;
        outline: none;
        border: none;
        text-align: start;
        background: rgba(51, 51, 51, 1);
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        float: left;
        padding: 0px 0px 0px 6.4516%;
        -webkit-appearance:none; /*去除input默认样式*/
        line-height: 1;
    }
}
.search_input::-webkit-input-placeholder{
    font-size: 1vw;
    font-family:'FZLanTingHei-R-GBK';
    font-weight:400;
    color:rgba(163,163,163,1);
    -webkit-appearance:none; /*去除input默认样式*/
    line-height: 1;
}
.search_btn{
    height: 2.604167vw;
    width: 14.8387%;
    display: flex;
    justify-content: center;
    align-items: center;  
    outline: none;
	border: none;
    background:rgba(55, 186, 160, 1);
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    margin: 0px;
    -webkit-appearance:none; /*去除input默认样式*/
}
.search_btn img{
    cursor:pointer;
    width: 1.4vw;
    height: 1.4vw;
}
.search_dropdown{
    background:rgba(255, 255, 255, 1);
    width:69.032258%;
    /* height: 22.65625vw; */
    position:relative;
    z-index:3;
    margin: 0px 0px 0px 6.4516%;
    padding: 1.04167vw 4.83870967% 0.65vw 4.83870967%;
    box-shadow: 0px 0px 16px 0px rgba(15, 78, 65, 0.2);
}
/* 搜索下拉行样式 */
.tr{
    font-size: 0.729166vw;
    padding-top: 1.8691589%;
    padding-bottom: 1.8691589%;
}
.tr:hover{
    background: rgba(232, 249, 245, 1);
    cursor:pointer;
}
.search_dropdown_header{
font-size: 0.729166vw;
font-weight:400;
color:rgba(153,153,153,1);
display:block;
margin-bottom:1.6728972%;
line-height: 1;
}
.content{
font-size: 0.729166vw;
font-weight:400;
color:rgba(0,0,0,1);
display:block;
overflow: hidden;/*超出部分隐藏*/
text-overflow:ellipsis;/* 超出部分显示省略号 */
white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.option1{
background:#37BAA0;
width:5.60747663%;
height:100%;
border-radius:0px 9px 9px 0px;
font-size: 0.729166vw;
color:#FFFFFF;
text-align:center;
margin-right:2.3364486%;
float: left;
}
.option2{
background:#88DCCB;
width:5.60747663%;
height:100%;
border-radius:0px 9px 9px 0px;
font-size: 0.729166vw;
color:#FFFFFF;
text-align:center;
margin-right:2.3364486%;
float: left;
}
.option3{
background:#C0EFE6;
width:5.60747663%;
height:100%;
border-radius:0px 9px 9px 0px;
font-size: 0.729166vw;
color:#FFFFFF;
text-align:center;
margin-right:2.3364486%;
float: left;    
}
.option4{
background:#D8D8D8;
width:5.60747663%;
height:100%;
border-radius:0px 9px 9px 0px;
font-size: 0.729166vw;
color:#FFFFFF;
text-align:center;
margin-right:2.3364486%;
float: left;    
}
.option5{
background:#D8D8D8;
width:5.60747663%;
height:100%;
border-radius:0px 9px 9px 0px;
font-size: 0.729166vw;
color:#FFFFFF;
text-align:center;
margin-right:2.3364486%;
float: left;   
}
/* end */
/* 四个功能配置 */
.function{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 25.41667%;
    height: 100%;
    padding-left: 8.4375%;
}
.function>div{
    /* display:inline-block; */
    float: left;
}
.function > div:focus{
    outline: none 
}
.history{
    cursor:pointer;
    background:url('../img/history.png');
    background-repeat:no-repeat;
    background-size:100% 100%;
    width: 4.1%;
    height: 1.19791667vw;
    margin: 0 4.8% 0 20.8%;
}
.collection{
    cursor:pointer;
    background:url('../img/collection.png');
    background-repeat:no-repeat;
    background-size:100% 100%;
    width: 4.51%;
    height: 1.14583333vw;
    margin: 0 4.8% 0 4.8%;
}

.download{
    cursor:pointer;
    background:url('../img/download.png');
    background-repeat:no-repeat;
    background-size:100% 100%;
    width: 5.33%;
    height: 1.041667vw;
    margin: 0 4.8% 0 4.8%;
}
.upload{
    cursor:pointer;
    display:flex;
    background:url('../img/upload.png');
    background-repeat:no-repeat;
    background-size:100% 100%;
    width: 5.33%;
    height: 1.041667vw;
    margin: 0 4.8% 0 4.8%;
}
.messages {
    cursor:pointer;
    background:url('../img/messages.png');
    background-repeat:no-repeat;
    background-size:100% 100%;
    width: 4.51%;
    height: 1.14583333vw;
    margin: 0 8% 0 4.8%;
}
.item {
  /* margin-left: 100%; */
}
.el-badge /deep/ .el-badge__content {
  position: absolute;
  bottom: 8px;
  left: 20px;
  border: none;
  background-color: #F56C6C;
}
.user{
    cursor:pointer;
    display:flex;
    width: 10.6557377%;
    height: 2.70834vw;
    /* margin: 0.729167vw 0px 0.729167vw 0px; */
    background: url('../img/avatar.png');
    background-size: 100% 100%;
    background-repeat: no-repeat; 
    border-radius: 50%;
}
/* 下拉菜单单独封装组件用 */
/* 基础配置 */
</style>