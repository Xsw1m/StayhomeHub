<template>
    <div class="fDiv-container">
        <div class="iconDiv" style="">
            <!-- <img src="../images/history.png" alt="" > -->
            <img src="../img/stayhome.png" alt="" style="height:100%;cursor:pointer" @click="tologin">
            <div class="mDiv" style=""></div>
            <span class="loginDiv" >{{msg}}</span>
        </div>   
        <router-view @func = "getPag"></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg:''
        }
    },
    methods:{
        getPag(data){
            this.msg = data
            console.log(this.active)
        },
        tologin() {
            this.$router.push('/login')
        }
    }
}
</script>
<style scoped>
    .fDiv-container{
        padding-top: 0.00001px;
        height: 100%;
        /* background-color:rgb(213, 241, 237); */
        background-image: url('../images/firstbg519.jpg') ;
        background-size: 100% 100%;
        box-sizing: border-box;
        display:flex; 
        align-items:center
    }
    .iconDiv{
        position:absolute;
        top:20px;
        left:71px;
        width:330px;
        height:40px;   
    }
    .mDiv{
        width:1px;
        height:20px;
        background-color:#F3F7F6;
        display:inline-block;
        position:absolute;
        top:10px;
        left:200px
    }
    .loginDiv{
        position:absolute;
        left:250px;
        color:#D6E2E2;
        text-decoration:none;
        line-height:40px;
    }
</style>


