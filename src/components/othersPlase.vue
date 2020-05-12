<template>
    <!-- <h2></h2> -->
    <div class="personalSettingContainer">
        <div class="Top">
            <div style="width:15%">
                <span style="font-size:0.83vw">审核人：</span>
                <el-input v-model="name" placeholder="请输入姓名" class="plaseSelect"></el-input>
            </div>
            <div style="width:18%">
                <span style="font-size:0.83vw">审核状态：</span>
                <el-select v-model="status" placeholder="全部" class="plaseSelect">
                    <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="width:52%">
                <span style="font-size:0.83vw">审核时间：</span>
                <el-date-picker
                    class="plaseData"
                    v-model="beginData"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <span style="font-size:0.83vw">至</span>
                <el-date-picker
                    class="plaseData"
                    v-model="endData"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="PlaseAllButton" style="width:15%">
                <div class="PlaseButton aSty" style="background-color:#37BAA0;display:flex;align-items:center;justify-content:center">
                    <span style="color:white;line-height: 1;font-size:0.83vw">查询</span>
                </div>  
                <div class="PlaseButton aSty" style="background-color:#DFF1EE;display:flex;align-items:center;justify-content:center">
                    <span style="color:#7B8D89;line-height: 1;font-size:0.83vw">清空</span>
                </div>
            </div> 
        </div>

        <div style="width:100%;height:2.1%"></div>
        <div style="width:100%;height:0.1%;background-color:#DCDEDE"></div>
        
        <!-- 对于点击审核打开弹窗的设计
            1 点击审核按钮打开弹窗,在弹窗内watch监视传过去的id,如果id>0的话,就拉取数据,关闭时清空所有的数据
            2 在弹窗内点击提交的时候,把修改完的状态提交到申请审核页面,在申请审核页面拿到数据后,就修改审核状态的数据
         -->
        <div class="mainBottom" v-if="true">
            <el-table :data="gridData">
                <el-table-column type="index" label="序号" align="center"></el-table-column>
                <el-table-column property="name" label="申请人" align="center" ></el-table-column>
                <el-table-column property="photo" label="手机号" align="center" ></el-table-column>
                <el-table-column property="title"  label="申请视频标题" :show-overflow-tooltip="true" align="center" ></el-table-column>
                <el-table-column  label="审核状态"  align="center" :formatter="formatSex">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">待审核</span>
                        <span v-if="scope.row.status == 2" style="color:#F18155">审核拒绝</span>
                        <span  v-if="scope.row.status == 3" style="color:#37BAA0">审核通过</span>
                    </template>
                </el-table-column>
                <el-table-column property="date" label="申请时间" align="center" ></el-table-column>
                <el-table-column property="address" align="center" label="操作">
                    <div class="btnDiv">
                        <div class="btn center aSty" @click="open()" style="background-color: #37BAA0;">
                            <span style="color:white">审核</span>
                        </div>
                        <div class="btn center aSty" style="background-color: #DFF1EE;">
                            <span>删除</span>
                        </div>
                    </div>
                </el-table-column>
            </el-table>
        </div>

        <div class="NoEverything" v-else>
            <div style="width:100%;height:80%;display:flex;align-items: center;justify-content:center">
                <img src="../images/nothing.png" alt="">
            </div>
            <div style="display:flex;align-items: center;justify-content:center">
                <span style="color:#CCCCCC;">暂无视频观看、下载记录</span>
            </div>
        </div>

        <examinePopup ref="examinePopup"></examinePopup>
    </div> 
</template>
<script>
import service from '../API/request';
import configAPI from '../API/configAPI';
import Qs from 'qs'

import examinePopup from './popup/examinePopup.vue'

export default {
    components: {
        examinePopup
    },
    data(){
        return{
            myPag:9,
            name:'',
            status:'',
            beginData:'',
            endData:'',
            paginationNumber:100,
            options3: [{
                value: '选项1',
                label: '审核中'
            }, {
                value: '选项2',
                label: '审核失败'
            }, {
                value: '选项3',
                label: '审核成功'
            }],
            dialogTableVisible:false,
            gridData: [{
                date: '2019-10-02 11:00:00',
                name: '王小虎',
                photo : '15966276272',
                title:'视频标题展示视频标题展示视频标题展示视频标题展示视频标题展示',
                status:'1',
            }, {
                date: '2019-10-04 11:00:00',
                name: '王小虎',
                photo : '15966276272',
                title:'视频标题展示',
                status:'2',
            }, {
                date: '2019-10-04 11:00:00',
                name: '王小虎',
                photo : '15966276272',
                title:'视频标题展示',
                status:'3',
            }],
        }
    },
    methods:{
        sedPag(){
            this.$emit('func',this.myPag)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val
            this.pagesize = 20
            // this.getTimeNews()
        },
        penDialog(){
            this.dialogTableVisible = true
        },
        formatSex: function (row, column, cellValue) {
            if (cellValue === "1"){
                return '女';
            }else if (cellValue === "0"){
                return '男';
            }
        },
        open(){
            this.$refs.examinePopup.opDialog()
        }
    },
    created(){
        this.sedPag()
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
    .aSty{
        cursor:pointer;
    }
    .Top{
        padding: 0 4%;
        height: 6%;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        /* justify-content: space-around; */
    }
    .plaseSelect{
        width:53%
    }
    .plaseData{
        width:25%
    }
    .PlaseAllButton{
        width:150px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .PlaseButton{
        width: 60px;
        height: 31px;
        border-radius: 15px
    }
    .mainBottom{
        padding: 0 4%;
        width: 100%;
        box-sizing: border-box;
        height: 91.8%;
        padding-top: 30px;
        overflow-y:scroll
    }
    .center{
        display: flex;
        align-items: center;
        justify-content: center
    }
    .btnDiv{
        width:100%;
        height: 30px;
        /* background-color: antiquewhite; */
        display: flex;
        align-items: center;
        justify-content: space-around
    }
    .btn{
        width:60px;
        height: 100%;
        border-radius: 15px;
    }
    .NoEverything{
        padding: 17% 30%;
        width: 100%;
        box-sizing: border-box;
        height: 91.8%;
    }
</style>
<style>
    .Top .el-input__inner{
        border: 0px;
        font-size:0.78vw;
        border-radius: 10px;
        height: 38px
    }
    .mainBottom  .el-table__header-wrapper{
        background-color: #EFF5F4;
    }
    .mainBottom th{
        background-color: #EFF5F4;
    }
</style>