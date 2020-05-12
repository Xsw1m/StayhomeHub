<template>
    <div class="acceptcodeContainer">
        <el-form>
            <p>短信已发送至{{this.$store.state.mobile}}，请查看并输入验证码</p>
            <br>
            <div style="display:flex;justify-content:space-between">
                <el-input class="myClass" v-model="yanzhengma" placeholder="请输入验证码" prefix-icon="el-icon-news"></el-input>
                <div class="mybtn"  @click="getCode">
                    <span v-show="show" >获取验证码</span>
                    <span v-show="!show" class="count">{{count}}</span>
                </div>
            </div>
            <br>
            <br>
            <router-link to="/resetpassword">
            <!-- @click="submit()" -->
                <el-button type="primary" size="medium" @click="submit()">下一步</el-button>
            </router-link>
            <br>
            <br>
            <router-link to="/retrievePassword">
                <el-button type="info" size="medium" @click="submit()">返回</el-button>
            </router-link>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            active:1,
            show: true,
            count: '',
            timer: null,
            yanzhengma:'',
        }
    },
    methods: {
         getCode(){
            const TIME_COUNT = 60;
            if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
                } else {
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                    }
                }, 1000)
                }
            console.log('ok')
            },
            submit(){

            },  
            sendMsg(){
                this.$emit('func',this.active)
            }   
        },
        created(){
            this.sendMsg()
            if(this.$store.state.mobile){
            this.$store.state.mobile = this.$store.state.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
            this.getCode()//需要触发的函数
            }else{
                return
            };
            
        },

}
</script>
<style scoped>
    .acceptcodeContainer{
        width: 40vw;
        margin:0  auto;
        /* height: 50%; */
        box-sizing: border-box; 
    }
    .myClass{
        width: 29vw;
    }
    .mybtn{
        height: 40px;
        width: 10vw;
    }
    .el-button--medium{
        width: 100%;   
    }
    p{
        text-align: center
    }
</style>
