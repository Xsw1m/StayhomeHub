<template>
    <div class="successContainer">
        <!-- <p>恭喜你，密码重置成功！</p> -->
        <div class="succDiv" style="width:42px;height:42px;">
            <img src="../images/passwordSuccess.png" alt="">
        </div>
        <div style="padding:13px 0 11px 8px ;width:206px;height:100%;box-sizing: border-box;display:flex">
            <span style="font-size:18px;line-height:1">恭喜你，密码重置成功！</span>
        </div>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    data(){
        return{
            active:3,
        }
    },
    methods:{
        sendMsg(){
            this.$emit('func',this.active)
        },

    },
    created(){
        this.sendMsg()
    },
    mounted(){
        setTimeout(()=>{
                this.$router.push({path:'/login'})
            },1500)
    }
}
</script>
<style scoped>
    .successContainer{
        width: 440px;
        /* margin:0  auto; */
        height: 379px;
        box-sizing: border-box; 
        padding: 168.5px 96px;
        display: flex
    }
    p{
        text-align: center;
    }
</style>
