<template>
    <!-- <h2>这是个人设置</h2> -->
    <div class="personalSettingContainer">
        <div class="Top">
            <div class="myDiv">
                <span>基本信息</span>
            </div>
            <!-- <span class="aSty">全部标记为已读</span> -->
        </div>

        <div style="width:100%;height:2.1%"></div>
        <div style="width:100%;height:0.1%;background-color:#DCDEDE"></div>
        
        <div class="main">
            <div class="mainTop">
                <div style="display:flex;width:100%;height:4.57vw;">
                        <div class="aSty" style="position:relative;;width:17.1%;height:100%;">
                        <!-- 圆圈 -->
                        <div class="comFa" style="">
                            <!-- <img v-bind:src="imageUrl" alt="" style="width:100%;height:100%;border-radius:50%;"> -->
                            <!-- <el-upload
                            class="avatar-uploader-my"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            style="width:100%;height:100%">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:100%;height:100%;border-radius:50%;">
                            </el-upload> -->
                            <upImgTemplate class="avatar-uploader-my" @getImUrl="getImUrl" @getUserInfor="getUserInfor" v-bind:parentUrl="imageUrl"  ref="child"
                            style="background-color:#faebd7; border-radius: 50%;width:100%;height:100%"></upImgTemplate>
                        </div>
                        <div id="oval" @click="useSonMe()">
                            <span class="aSty" style="font-size:0.625vw;color:#FFFFFF;">更换头像</span>
                        </div>
                    </div>
                
                    <div style="width:1.15vw;height:4.58vw;background-color:#F4F7FD"></div>
                    <div style="height:4.58vw;display:flex;align-items:center">
                        <span style="font-size:0.73vw;color:#999999">姓名：{{ name }}</span>
                        <!-- <input class="nameInput" type="text" v-model="name"> -->
                    </div>
                </div>
                <div style="width:100%;height:54.8%;padding:12.06% 0 15.56% 0;box-sizing:border-box">
                    <div style="width:100%;height:50%">
                            <span style="font-size:0.9vw">性别：</span>
                            <!-- <el-radio v-model="radio" label="2" >男</el-radio>
                            <el-radio v-model="radio" label="3">女</el-radio> -->
                            <el-radio-group v-model="radio">
                                    <el-radio :label="2">男</el-radio>
                                    <el-radio :label="3">女</el-radio>
                            </el-radio-group>
                    </div>
                    <br>
                    <div style="width:100%;height:100%;display:flex;justify-content:space-between;align-items:baseline">

                        <div style="width:80%;height:50%;display:flex;justify-content:space-between;">
                            <span style="font-size:0.9vw;width:17%;line-height:3">生日：</span>
                            <el-col class="mySelect">
                                <el-date-picker type="date" placeholder="选择日期" v-model="Birthday" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </div>
                        <!-- <a href="#" style="font-size:0.73vw;color:#37BAA0" @click.prevent="submitChang()">提交修改</a> -->
                    </div>
                </div>
                <div class="myDiv2">
                    <div>
                        <span>安全中心</span>
                    </div>    
                </div>
            </div>
            <div style="width:100%;height:1px;background-color:#DCDEDE;"></div>
            <div style="width:100%;height:50%">
                <div style="width:100%;height:100%;padding:1.6vw 53.4375vw 0 3.12vw;box-sizing:border-box;">
                    <div style="width:100%;height:14.6%;display:flex;align-items:baseline">
                        <div style="width:21.4%;height:100%;display:flex;align-items:center">
                            <span style="font-size:0.78vw;color:#999999">手机号：</span>
                        </div>
                        <div style="width:60.5%;height:100%">
                            <span style="font-size:0.73vw;color:#333333">{{phone}}</span>
                        </div>
                        <div style="width:18.1%;height:100%;display:flex;justify-content:flex-end;">
                            <a href="#" style="font-size:0.73vw;color:#37BAA0" @click.prevent ="changMo()">修改手机</a>
                        </div>
                    </div>
                    <div style="width:100%;height:14.6%;display:flex;align-items:baseline">
                        <div style="width:21.4%;height:100%;display:flex;align-items:center">
                            <span style="font-size:0.78vw;color:#999999">登录密码：</span>
                        </div>
                        <div style="width:60.5%;height:100%">
                            <span style="font-size:0.73vw;color:#333333">登录网站所需密码</span>
                        </div>
                        <div style="width:18.1%;height:100%;display:flex;justify-content:flex-end; display: none;">
                            <a href="#" style="font-size:0.73vw;color:#37BAA0" @click.prevent="retrievePassword()">修改密码</a>
                        </div>
                    </div>

                <!-- <input type="file" ref="inputFile" name="ffffffff"/> -->

                <!-- <button @click="aaaoo">触发文件上传事件</button> -->

                </div>
            </div>
        </div>
        <retrieveMobile ref="retrieveMobilePopup"></retrieveMobile>
        <retrievePasswordPopup ref="retrievePasswordPopup"></retrievePasswordPopup>
    </div>
</template>
<script>
import retrieveMobile from '../components/retrieveMobile.vue'
import retrievePasswordPopup from '../components/retrievePasswordPopup.vue'
import service from '../API/request';
import configAPI from '../API/configAPI';
import Qs from 'qs'

import upImgTemplate from '../components/upImgTemplateNoCut.vue'

export default {
    components:{
        'retrieveMobile':retrieveMobile,
        'retrievePasswordPopup':retrievePasswordPopup,
        'upImgTemplate':upImgTemplate
    },
    data(){
        return{
            myPag:7,
            radio:'',   // 2 男 3 女
            value:'1',
            imageUrl: '',
            name:'',
            Birthday:'2020/12/31',
            phone:'',
            WatchImageUrl:1,
            WatchRadio:1,
            WatchBirthday:1,
        }
    },
    watch: {
        imageUrl(newval, oldval) {
            console.log(this.WatchImageUrl + 'Img')
            console.log(newval + 'newval')
            if(this.WatchImageUrl > 1){
                this.submitChang()
            }
            this.WatchImageUrl++
        },
        radio(newval,oldval){
            console.log(this.WatchRadio + 'radion')
            if(this.WatchRadio > 1){
                this.submitChang()
            }
            this.WatchRadio++
        },
        Birthday(newval,oldval){
            console.log(this.WatchBirthday  + 'ss')
            console.log(this.Birthday + 'bir')
            if(this.WatchBirthday > 1){
                if(typeof(this.Birthday) == 'string'){
                    console.log('这是第一步')
                    return false
                }else{
                    this.Birthday = this.dateToString(this.Birthday)
                    console.log('这是第二步')                    
                }  
                // this.Birthday = this.dateToString(this.Birthday)
                this.submitChang()
            }
            this.WatchBirthday++
        }
    },
    methods:{
        useSonMe(){
            this.$refs.child.fatherUser()
        },
        // aaaoo(){
        //     document.getElementsByName("ffffffff")[0].click()
        // },
        getImUrl(data){
            console.log(data)
            this.imageUrl = data
        },
        sedPag(){
            this.$emit('func',this.myPag)
        },
        ok(){
            console.log(this.value)
        },
        retrievePassword(){
            // this.$router.push({ path: '/retrievePassword' })
            this.$refs.retrievePasswordPopup.chang()
        },
        changMo(){
            // this.$router.push({ path: '/retrieveMobile' })
            this.$refs.retrieveMobilePopup.chang()
        },
        dateToString(date){ 
            var year = date.getFullYear(); 
            var month =(date.getMonth() + 1).toString(); 
            var day = (date.getDate()).toString();  
            if (month.length == 1) { 
                month = "0" + month; 
            } 
            if (day.length == 1) { 
                day = "0" + day; 
            }
            var dateTime = year + "-" + month + "-" + day;
            return dateTime; 
        },
        submitChang(){
                
                console.log('ok')
                let params = Qs.stringify({
                    avatar:this.imageUrl,
                    gender:this.radio,
                    birthday:this.Birthday
                })
                service.patch(configAPI.changUserInfor_url + params,{

                }).then(result=>{
                    console.log(result)
                    this.$message.success('修改个人信息成功', result.data.message)
                    this.getUserInfor()
                })
        },
        getUserInfor(){
            console.log('查询个人信息')
            service.get(configAPI.getUserDetails_url,{

            }).then(result =>{
                console.log(result)
                // if(result.data.result.birthday == null){
                //     console.log(11)
                // }
                // console.log(result.data.result.birthday)
                if(result.data.result.avatar == ''){
                    this.WatchImageUrl++
                    // console.log(this.WatchImageUrl + 'xx')
                }
                if(result.data.result.gender == 1){
                    this.WatchRadio++
                }else{
                    this.radio = result.data.result.gender
                }
                if(result.data.result.birthday == null){
                    this.WatchBirthday++
                }else{
                    this.Birthday = result.data.result.birthday.split(' ')[0].replace(/-/g,'/')
                }
                this.name = result.data.result.name,
                this.phone = result.data.result.phone,
                this.imageUrl = result.data.result.avatar,
                
                
                
                // console.log(result.data.result.birthday)
                // console.log(this.Birthday)
                // console.log(result.data.result.birthday.split(' ')[0].replace(/-/g,'/'))
                localStorage.setItem("avatar",this.imageUrl)
                // if(localStorage.getItem("avatar") == ''){
                //     this.imageUrl = '../images/pom.png'
                // }else{
                //     localStorage.setItem("avatar",this.imageUrl)
                // }
            })
        }
    },
    created(){
        this.sedPag()
        this.getUserInfor()
    }
}
</script>
<style scoped>
    .personalSettingContainer{
        width: 100%;
        height: 100%;
        padding-top: 1.56vw;
        box-sizing: border-box;
    }
    .Top{
        padding: 0 3.75%;
        height: 4.15%;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .main{
        width:100%;
        height:93.65%;
        padding:2.1vw 0 0 0;
        box-sizing:border-box
    }
    .myDiv{
        width:6.14%;
        height:100%;
        border-radius: 20px;
        background-color: #333A3A;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .myDiv2{
        width:17.5%;
        height:23.97%;
        border-radius: 20px;
        
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .myDiv2 span{
        font-size: 0.73vw;
        line-height: 1;
        color: #FFFFFF;
    }
    .myDiv2 div{
        height: 40%;
        width: 100%;
        background-color: #333A3A;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center
    }
    .myDiv span{
        font-size: 0.73vw;
        line-height: 1;
        color: #FFFFFF;
    }
    .newsDiv{
        width: 100%;
        height: 3.125vw;
        border-radius: 10px;
        background-color: #fff;
        padding: 2.3% 2% 2.3% 1.6%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        margin: 20px;
    }
    .comFa{
        background-color:#faebd7;
        border-radius: 50%;
        width:100%;height:100%;
    }
    .aSty{
        cursor:pointer;
    }
    .mainTop{
        width:100%;height:47.7%;padding:0 53.4375vw 0 3.12vw;box-sizing:border-box;
    }
    #oval {
        width:100%;height:50%;
        background: #000000;
        border-radius: 0 0 2.29vw 2.29vw;
        opacity: 0.6;
        position: absolute;
        top:2.29vw;
        display: flex;
        align-items: center;
        justify-content: center
    }
    .aSty{
        cursor:pointer
    } 
    .nameInput{
        border:0;
        background-color:#f4f7fd;
        font-size:0.73vw;
        color:#999999
    }
    .nameInput:focus{
        outline: none
    }
</style>
<style>
    /* .mySelect > div{
        height: 100%;
        width: 80% 
    }
    .mySelect input{
        height: 100%!important;
        width: 80%!important
    }
    .mySelect i{
        line-height: 1
    } */
    .mySelect .el-input__inner{
        width: 70%
    }
    .mySelect  .el-input__suffix{
        display: none
    }
    .avatar-uploader-my{
        width:100%;
        height:100%;
        /* border-radius: 10px!important; */
    }
    .avatar-uploader-my div{
        width: 100%;
        height: 100%;
        border-radius: 50%!important;
    }
    .avatar-uploader-my el-upload--text{
        width: 100%;
        height: 100%;
        border-radius: 50%!important;
    }
    .avatar-uploader-my .avatar-uploader-icon{
        display: none
    }
    .avatar-uploader-my .el-upload{
        border: 0px!important;
    }
    .avatar-uploader-my img{
        width:100%;height:100%
    }
</style>