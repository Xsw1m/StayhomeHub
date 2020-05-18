<template>
    <div class="aside">
        <!-- 路由router导航 -->
        <div class="to_time_axis" >
            <i class="el-icon-arrow-left aSty" @click="toeco"></i>
            <span>视频分类</span>
            <i class="el-icon-arrow-right aSty" @click="totimeaxis"></i>
        </div>
        <div :class="[pageid==status?'nav_style':'nav']" @click="toSelected" tabindex="0">
            <div class="nav_left"><img :src="[pageid!=status ? require('../../src/img/nav.png'):require('../../src/img/nav_focus.png')]"  :class="[pageid==status?'navimg':'']" style="width:0.9375vw;height:0.9375vw;"></div>
            <div class="nav_right"> <span style="line-height:1;">精选</span></div>
        </div>

<!-- 视频列表页 -->
        <div tabindex="0"
        v-if="item.id != 46"
        @click="choosecategory(item.id)" 
        v-for="(item,index) in video"
        :key="item.id"
        class="nav1"
        :class="[item.id==listid?'nav1_style':'nav1']"
        >
        
        <!-- 循环判断 -->
            <div v-if="(index+1)<11" class="nav_left"><img :src="item.id==listid ? require(('../../src/img/nav'+(index+1)+'_focus.png')):require(('../../src/img/nav'+(index+1)+'.png'))" style="width:0.9375vw;height:0.9375vw;"></div>
            <div v-if="(index+1)>=11" class="nav_left"><img :src="item.id==listid ? require(('../../src/img/nav10_focus.png')):require(('../../src/img/nav10.png'))" style="width:0.9375vw;height:0.9375vw;"></div>
            <div class="nav_right"> <span>{{item.name}}</span></div>
        </div>
    </div>
</template>
<script>
import { constants } from 'crypto';

import Vue from 'vue'
//导入API
import configAPI from '../API/configAPI.js'
import service from '../API/request.js'
const axios = require('axios');
export default {
    props:{
        status:'',
        listid: '',
    },
    data () {
        return {
            pageid:'0',
            video:[
                // {id: 8, column_name: '娱乐'},
                // {id: 9, column_name: '音乐'},
                // {id: 10, column_name: '舞蹈'},
                // {id: 11, column_name: '生活'},
                // {id: 12, column_name: '科技'},
                // {id: 13, column_name: 'Vlog'},
                // {id: 14, column_name: '鬼畜'},
                // {id: 15, column_name: '游戏'},
                // {id: 16, column_name: '动漫番剧'},
                // {id: 17, column_name: '影视'}
            ]
        }
    },
    methods: {
        toSelected(){
            this.$router.replace('/homepage')
        },
        totimeaxis(){
            this.$router.replace('/time_axis')
        },
        toeco() {
            this.$router.replace('/ecocivilization')
        },
        choosecategory(id){
            this.pageid = id
            this.$emit('req2',this.pageid)
            // this.$router.push('/propaganda')
        },
    },
    created(){
        // console.log("测试: "+this.nav.id+' '+this.isChecked)

        service.get(configAPI.getvideolistnavmenu,{

        }).then((result) => {
            let {data} = result;
            console.log('1.侧边栏', data.result[0])
            this.video = data.result[0];
        }).catch((err) => {
            
        });
    },
    watch:{
        pageid:function(newVal){
            console.log("监听pageid:"+newVal+"__"+this.pageid)
            if(this.pageid>0){
                this.$router.push({path:'/propaganda',query:{listid:this.pageid}})
            }
            //历程节点跳转
            if (this.pageid === 12) {
                // this.$router.push({path:'/process'}) // todo 历程节点
            }
        }
    }
}
</script>
<style scoped>
.aSty {
    cursor:pointer;
}
.aside {
    background:rgba(255, 255, 255, 1);
    /* color: #333; */
    width: 16.667%;
    /* height: 52.083333vw; */
    height: 100%;
    /* float: left;     */
    box-shadow: 0px 2px 20px 0px rgba(221, 231, 229, 0.7)
}
.nav_left{
    font-size: 0.8334vw;
    display: inline-block;
    float: left;
    width: 30%;
    text-align: right;
    align-content: center;
    padding: 0 7.5% 0 0;
}
.nav_right{
    font-size: 0.8334vw;
    display: inline-block;
    float: left;
    width: 60%;
    text-align: start;
}

.to_time_axis{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 15px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 16px 0px rgba(15, 78, 65, 0.2);
    text-align: center;
    padding: 7.17% 0px 7.59% 0px;
    margin-bottom: 6.251%;
    font-size:0.8334vw;
    font-family:FZLanTingHei-R-GBK;
    font-weight:400;
    color:rgba(55,186,160,1);
}
.nav{
    cursor:pointer;
    width: 98.579%;
    height: 1.5%;
    background: rgba(255, 255, 255, 1);
    padding: 7% 0px 7.318% 0px;
    outline: 0;
}
.nav_style{
    cursor:pointer;
    width: 98.579%;
    height: 1.5%;
    background: rgba(232, 249, 245, 1);
    border-right: 5px solid #37BAA0;
    color: #37BAA0;
    padding: 7% 0px 7.318% 0px;
    outline: 0;
    
}
.nav1{
    display: flex;
    align-items: center;
    cursor:pointer;
    font-size: 0.8334vw;
    width: 98.579%;
    height: 1.5%;
    background: rgba(255, 255, 255, 1);
    padding: 7% 0px 7.318% 0px;
    outline: 0;
}
.nav1_style{
    display: flex;
    align-items: center;
    cursor:pointer;
    font-size: 0.8334vw;
    width: 98.579%;
    height: 1.5%;
    background: rgba(255, 255, 255, 1);
    padding: 7% 0px 7.318% 0px;
    outline: 0;
    background: rgba(232, 249, 245, 1);
    border-right: 5px solid #37BAA0;
    color: #37BAA0;
}
</style>