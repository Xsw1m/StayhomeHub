<template>
    <div>
        <el-upload
            ref="el_inpout"
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadFile"  
            action="customize">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <!-- <img v-if="imgshow" :src="parentmsg" class="avatar"> -->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <cutPopuphorizontal ref="cutPopup" :photo="image" @func="getCutPhoto"></cutPopuphorizontal>
    </div>
</template>
<script>
import Qs from 'qs'
import axios from 'axios';
// 导入图片剪裁的组件
import cutPopuphorizontal from './popup/cutPopuphorizontal.vue'
export default {
    components: {
        cutPopuphorizontal
    },
    data(){
        return{
            image:'',
            imageUrl:'',
            uploadURL:'',
            uploadType:'',
            uptype:1,  //  type 1图片 2视频 3音频 4其它
            wode:0,
        }
    },
    props:['parentUrl'] ,  //把父组件传递过来的  parentmsg  属性，
    methods:{
        fatherUser(){
            document.getElementsByName("file")[0].click()
        },
        handleAvatarSuccess(res, file) {
            // this.imageUrl = URL.createObjectURL(file.raw);
        },
        getCutPhoto(data){
            console.log(data + '父组件拿到')
            this.image = data
            this.wode = 1
        },
        beforeAvatarUpload(file) {

            console.log('同一个')
            this.image = file
            let isJPG = ['image/jpeg' , 'image/gif' , 'image/png' , 'image/webp'].indexOf(file.type);
            console.log(isJPG)
            const isLt10M = file.size / 1024 / 1024 < 10;
            this.uploadType = file.name.split('.')[1]
            if (isJPG < 0) {
                this.$message.error('上传图片格式不正确，只支持jpg,jpeg,gif,png,webp!');   
                this.image = ''
                return false
            }
            if (!isLt10M) {
                this.$message.error('上传图片大小不能超过 10MB!');
                this.image = ''
                return false
            }

            //打开剪裁弹层
            this.$refs.cutPopup.onDialog()

            return true;

            
            // this.file = file
            // this.createImage(file)
        },
        // createImage (file) {
        //         // var image = new Image()
        //     let reader = new FileReader()

        //     reader.onload = (e) => {

        //         this.image = e.target.result
        //         console.log(this.image)
        //     }
        //     reader.readAsDataURL(this.file)
        // },
        uploadFile: async function (params){

            console.log(this.wode + '处理前的wode')
            if(this.wode == 0){
                return false
            }
            console.log(this.wode + '处理后的wode')

            // console.log(this.wode + '处理前的wode')
            // if( this.wode == 0){
            //     return false
            // } 
            // console.log(this.wode + '处理后的wode')

            //获取当前时间
            var date = new Date();
            var hour = date.getHours();
            var minu = date.getMinutes();
            var sec = date.getSeconds();
            if (hour < 10) hour = "0" + hour;
            if (minu < 10) minu = "0" + minu;
            if (sec < 10) sec = "0" + sec;
            //添加后缀名
            let uploadType = '.' + this.uploadType
            console.log(hour.toString())
            // console.log(hour)
            let fileName =  hour.toString() + minu.toString() + sec.toString() +  Math.round(Math.random()*10).toString() +  Math.round(Math.random()*10).toString() +  Math.round(Math.random()*10).toString() + uploadType
            // console.log(fileName)

            
            let data = Qs.stringify({
                    fileName:fileName,
                    type:this.uploadType,
                })
            // console.log(data)


            var response = ''
            await axios.put(`https://pq4wmkfnr9.execute-api.cn-northwest-1.amazonaws.com.cn/prod/uploads`,{
                fileName:fileName,
                type:1,
            }).then(result=>{
                response = result
                console.log(result)
            })
            
            console.log(response)
            
            // const response = await axios({
            //     method: 'PUT',
            //     data: data,
            //     url: `https://pq4wmkfnr9.execute-api.cn-northwest-1.amazonaws.com.cn/prod/uploads`
            // })
            // console.log(result)
            console.log('Response: ', response.data)
            // console.log('Uploading: ', this.image)
            let uploadInfo = JSON.parse(response.data.body)
            console.log('Responsebody: ', uploadInfo)


            // // atob() 方法用于解码使用 base-64 编码的字符串。
            // let binary = atob(this.image.split(',')[1])
            // let array = []
            // for (var i = 0; i < binary.length; i++) {
            //     array.push(binary.charCodeAt(i))
            // }
            // // let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
            // let blobData = new Blob([new Uint8Array(array)],{type: 'image/jpeg'})
            // console.log('Uploading to: ', uploadInfo.uploadURL)
            // // console.log(blobData)

            // const result = await fetch(uploadInfo.uploadURL, {
            //     method: 'PUT',
            //     body: blobData
            // })

            let nnnn = this.image
            const result = await axios.put(uploadInfo.uploadURL,nnnn)


            console.log('Result: ', result)

            // Final URL for the user doesn't need the query string params
            console.log(result.config.url.split('?')[0])
            this.imageUrl = result.config.url.split('?')[0]

            this.wode = 0
        },
    },
    watch: {
        imageUrl(newval, oldval) {
            this.$emit('getImUrl',newval)
        },
        parentUrl(newval, oldval) {
            this.imageUrl = newval
            console.log(newval)
        },
        wode(newVal,oldVal){
            if(newVal == 1){
                this.uploadFile()
            }
        }
    },
    // created(){
    //     this.imageUrl = this.parentUrl
    // }
}
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #37BAA0;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #37BAA0;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
        /* width: 188px;
        height: 230px; */
    }
    .avatar-uploader > div{
        background-color: white;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #37BAA0!important;
    }
</style>