<template>
<div style="height:100%;">
    <homeheader></homeheader>
    <keep-alive>
        <router-view  v-if="$route.meta.keepAlive"> </router-view>
    </keep-alive>
        <router-view  v-if="!$route.meta.keepAlive"> </router-view>
    <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
</div>
</template>
<script>
import header from './components/header.vue'

export default {
    components: {
            'homeheader':header,
    },
    watch: {
        '$route.path':function(newVal,oldVal){
            if(newVal == '/search'){
                this.$router.push({path:'/search',query:{from_path:oldVal}})
            }
            
        }
    },
    created () {
        // 获取消息中心的提醒数量
        if(this.$store.state.news == 0){
            this.$store.dispatch('getdata')
        }
    },
}
</script>
<style scoped>
/* :end */
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
  /* min-width: 1000px; */
  height: 100%;
  /* float: left; */
  overflow:scroll;
    overflow-x:hidden;
}
</style>