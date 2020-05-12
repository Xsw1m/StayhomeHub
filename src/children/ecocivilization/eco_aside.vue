<template>
    <div class="aside">
        <!-- 路由router导航 -->
        <div class="to_time_axis" >
            <i class="el-icon-arrow-left aSty" @click="totimeaxis"></i>
            <span>排行榜</span>
            <i class="el-icon-arrow-right aSty" @click="tohomepage"></i>
        </div>
<!-- 视频列表页 -->
        <div tabindex="0"
        @click="choosecategory(item.id, item.column_name)"
        v-for="(item, index) in video"
        :key="item.id"
        class="nav1"
        :class="[item.id==pageid?'nav1_style':'nav1']"
        >
            <div class="nav_left"></div>
            <div class="nav_right"> <span>{{item.column_name}}</span></div>
        </div>
    </div>
</template>
<script>
import { constants } from 'crypto'

import Vue from 'vue'
// 导入API
import configAPI from '../../API/configAPI.js'
import service from '../../API/request.js'
const axios = require('axios')
export default {
  // props: {
  //   status: ,
  //   listid:
  // },
  data () {
    return {
      pageid: '47',
      name: '',
      video: [
        {id: 47, column_name: "每日", introduction: ""},
        {id: 48, column_name: "每月", introduction: ""},
      ]
    }
  },
  methods: {
    totimeaxis () {
      this.$router.replace('/time_axis')
    },
    tohomepage () {
      this.$router.replace('/homepage')
      // 向父组件传值
      this.$emit('changeMsg2', true)
      // this.isChecked = 0
    },
    choosecategory (id, name) {
      this.pageid = id
      this.name = name
      this.$emit('req2', this.pageid, this.name)
      // this.$router.push('/propaganda')
    }
  },
  created () {
    // console.log("测试: "+this.nav.id+' '+this.isChecked)

    // service.get(configAPI.getvideoeco + 46, {

    // }).then((result) => {
    //   const { data } = result
    //   console.log(data)
    //   this.video = data.result.list
    // }).catch((err) => {
    //   console.log(err)
    // })
  },
  watch: {
    pageid: function (newVal) {
      console.log('监听pageid:' + newVal + '__' + this.pageid)
      // if(this.pageid>0){
      //     this.$router.push({path:'/propaganda',query:{listid:this.pageid}})
      // }
      // //历程节点跳转
      // if (this.pageid === 12) {
      //     this.$router.push({path:'/process'})
      // }
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
