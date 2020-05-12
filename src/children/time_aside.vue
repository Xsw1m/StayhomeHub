<template>
<div class="timeaside">
    <!-- 路由router导航 -->
    <div class="to_time_axis">
        <i class="el-icon-arrow-left aSty" @click="tohomepage"></i>
        <span>时间轴</span>
        <i class="el-icon-arrow-right aSty" @click="toeco"></i>
    </div>
    <div class="navmenu"><!-- -->
        <div tabindex="0"
        @click="choosetime(nav.id)"
        v-for="nav in navmenu"
        :key="nav.id"
        :class="[nav.id==years?'nav_style':'nav']"
         class="nav">
            {{nav.value}}
        </div>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
//导入API
import configAPI from '../API/configAPI.js'
import service from '../API/request.js'

const axios = require('axios');
export default {
    props:{
        years:'',
    },
    data() {
        return {
            isChecked:'1',
            navmenu:[
                {id:2019,value:'2019'},
                {id:2018,value:'2018'},
                {id:2017,value:'2017'},
                {id:2016,value:'2016'},
                {id:2015,value:'2015'},
                {id:2014,value:'2014'},
                {id:2013,value:'2013'},
                {id:2012,value:'2012'},
                {id:2011,value:'2011'},
                {id:2010,value:'2010'},
                {id:'00',value:'00年代'},
                {id:'90',value:'90年代'},
                {id:'80',value:'80年代'},
            ],
        }
    },
    methods: {
        tohomepage(){
            
            this.$router.replace('/homepage')
            //向父组件传值
            this.$emit('changeMsg2',true)
            // this.isChecked = 0
        },
        toeco() {
            this.$router.replace('/ecocivilization')
        },
        // function
        // totimepage(){
        //     this.isChecked = this.nav.id
        //     console.log("向服务端发送请求"+this.isChecked)
        //     this.$router.replace('/years_2019')
        // },
        choosetime(id){
            this.isChecked = id
            console.log("向时间轴父级发送请求"+this.isChecked)
            this.$emit('req1',{isChecked:this.isChecked,month:0})
            this.$router.replace('/time_axis')
            // this.$router.replace('/years_2019')
            // this.$router.go(0)
        },
    },
    created(){
        // console.log("测试: "+this.nav.id+' '+this.isChecked)

        // axios.get(configAPI.gettimeaxis,{

        // }).then((result) => {
        //     let {data} = result;
        //     console.log(data)
        //     this.navmenu = data.result;
        // }).catch((err) => {
            
        // });
    }
    
}
</script>
<style scoped>
.aSty {
    cursor:pointer;
}
.timeaside {
    background:rgba(255, 255, 255, 1);
    /* color: #333; */
    width: 16.667%;
    /* height: 52.083333vw; */
    height: 100%;
    float: left;    
    box-shadow: 0px 2px 20px 0px rgba(221, 231, 229, 0.7)
}
.nav_left{
    display: inline-block;
    float: left;
    width: 30%;
    text-align: right;
    padding: 0 7.5% 0 0;
}
.nav_right{
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
    font-size: 0.83334vw;
    width: 98.4375%;
    height: 15px;
    background: rgba(255, 255, 255, 1);
    padding: 6% 0px 7% 0px;
    /* padding: 6.9841% 0px 7.3015873% 0px; */
    outline: 0;
    text-align: center;
}
.nav_style{
    /* font-size: 0.83334vw;
    width: 98.4375%;
    height: 15px;
    background: rgba(255, 255, 255, 1);
    padding: 6.9841% 0px 7.3015873% 0px;
    outline: 0;
    text-align: center;
    line-height: 1; */
    cursor:pointer;
    background: rgba(232, 249, 245, 1);
    border-right: 5px solid #37BAA0;
    color: #37BAA0;
}
/* .nav:hover{
    background: rgba(232, 249, 245, 1);
    border-right: 5px solid rgba(232, 249, 245, 1);
} */
/* 需要改动 */
.nav:focus{
    background: rgba(232, 249, 245, 1);
    border-right: 5px solid #37BAA0;
    color: #37BAA0;
}
</style>