<template>
    <div class="Container" style="box-sizing: border-box;">
        <!-- <h1>这是找回密码的界面</h1> -->
        <div class="stepdiv">
            <el-steps :active="active" finish-status="success">
                <el-step title="安全验证" ></el-step>
                <el-step title="重置密码" ></el-step>
                <el-step title="操作成功" ></el-step>
            </el-steps>
        </div>
        <router-view @func = "getActiveSon"></router-view>  

    </div>
</template>
<script>
// import {mapMutations} from 'vuex'
// import store from '../store.js'

export default {
    data(){
        return{
            active:0,
            pageTipe:'修改密码'
        }
    },
    methods:{
        getActiveSon(data){
            this.active = data
            console.log(this.active)
        },
        sendMsg(){
            this.$emit('func',this.pageTipe)
        },
    },
    created(){
        this.sendMsg()
    }

}
</script>
<style scoped>
    .Container{
        width: 460px;
        height: 540px;
        margin: 0 auto;
        border: 10px solid black;
        background-color: #fff;
        border-radius: 16px;
        box-sizing: border-box;
    }
    .stepdiv{
        width: 100%;
        /* height: 100px; */
        /* margin: 0 auto; */
        padding:60px 48px 0 48px;
        height: 141px;
        box-sizing: border-box;
    }
</style>
