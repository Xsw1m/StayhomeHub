<template>
    <el-dropdown trigger="hover"
    placement="bottom"
    >
        <div class="avatar">
        </div>
        <el-dropdown-menu slot="dropdown" class="dropdown_user">
            <el-dropdown-item  @click.native="toupVideoTwo">上传视频</el-dropdown-item>
            <el-dropdown-item  @click.native="tovideoAdmin">视频管理</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
export default {
    methods: {
        toupVideoTwo(){
        this.$router.push({path:'/upVideoOne'})
      },
        tovideoAdmin(){
        this.$router.push({path:'/videoAdmin'})
      },
    },
}
</script>
<style scoped>
/* 基础配置 */
.el-dropdown{
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    outline: none;
    border: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.el-dropdown-menu__item{
    font-size: 14px;
    line-height: 1;
    text-align: center;
    padding: 10%; 
}
.avatar{
    width: 100%;
    height: 100%;
    background:url('../img/upload.png');
    background-repeat:no-repeat;
    background-size:100% 100%;
    -webkit-appearance: none;
    outline: none;
    border: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.avatar_img{
    -webkit-appearance: none;
    outline: none;
    border: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
/* 下拉栏效果 */
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
    color: #37BBA0;
    background: rgba(238, 249, 247, 1);
}
.dropdown_user{
    width: 7.33vw;
    border-radius: 10px;
    padding: 0.729167vw 0 1.029167vw 0;
}
</style>