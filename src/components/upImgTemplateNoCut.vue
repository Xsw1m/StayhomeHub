<template>
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
</template>
<script>
import Qs from 'qs'
import Axios from '../API/http.js'
import service from '../API/request';
import configAPI from '../API/configAPI';
export default {
    data(){
        return{
            image:'',
            imageUrl:'',
            uploadURL:'',
            uploadType:'',
            uptype:1,  //  type 1图片 2视频 3音频 4其它
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
        beforeAvatarUpload(file) {
            console.log('1.上传前获取图片文件', file)
            this.image = file
            let isJPG = ['image/jpeg' , 'image/gif' , 'image/png' , 'image/webp'].indexOf(file.type);
            // console.log('1.图片类型', isJPG)
            const isLt4M = file.size / 1024 / 1024 < 4;
            this.uploadType = file.name.split('.')[1]
            // console.log('1.图片类型', this.uploadType)
            if (isJPG < 0) {
                this.$message.error('上传图片格式不正确，只支持jpg,jpeg,gif,png,webp!');   
                return false
            }
            if (!isLt4M) {
                this.$message.error('上传图片大小不能超过 4MB!');
                return false
            }
            return true;
            // this.file = file
            // this.createImage(file)
        },
        // 上传头像

        uploadFile: async function (params){
            // 开始上传
            // console.log('2.--上传前获取参数', params)
            // console.log('2.--上传前测试参数', this.image)
            let a = new FormData()
            a.append('type', 'avatar')
            a.append('image', params.file)
            service.post(configAPI.uploadImages,
                a
            ).then((result) => {
                if (result.data.code === 200) {
                    console.log('1.上传成功', result)
                    this.changeUserInfo(result.data.result.id)
                } else {
                    this.$message.error(result.data.msg)
                }
            }).catch((err) => {
                console.log('2.上传失败', err)
            })
        },
        // 修改个人信息（头像）
        changeUserInfo(id) {
            let params = Qs.stringify({
                avatar_image_id: id
            })
            service.patch(configAPI.changUserInfor_url + params,{
            }).then(result=>{
                console.log('3.修改个人信息', result)
                this.$message.success('修改个人信息成功', result.data.message)
                // this.getUserInfor()
                // this.$emit('getUserInfor', result)
                // parent.location.reload()
                this.$bus.$emit('getUserInfo')
            })
        }
    },
    watch: {
        imageUrl(newval, oldval) {
            this.$emit('getImUrl',newval)
        },
        parentUrl(newval, oldval) {
            this.imageUrl = newval
            console.log(newval)
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