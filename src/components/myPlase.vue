<template>
    <!-- <h2>这是个人设置</h2> -->
    <div class="personalSettingContainer">
        <div class="Top">
            <div style="width:15%">
                <span style="font-size:0.83vw">标题：</span>
                <el-select v-model="name" placeholder="请选择" class="plaseSelect">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="width:15%">
                <span style="font-size:0.83vw">类型：</span>
                <el-select v-model="type" placeholder="全部" class="plaseSelect">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
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
            <div style="width:37%">
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
                    <span style="color:white;line-height: 1;font-size:0.83vw">筛选</span>
                </div>  
                <div class="PlaseButton aSty" style="background-color:#F18155;display:flex;align-items:center;justify-content:center">
                    <span style="color:white;line-height: 1;font-size:0.83vw">删除</span>
                </div>
            </div> 
        </div>

        <div style="width:100%;height:2.1%"></div>
        <div style="width:100%;height:0.1%;background-color:#DCDEDE"></div>
        
        <div class="mainBottom">
            <!-- 重复这个div -->
            <div class="everyOne" >
                <div style="width:2.02%;height:0.729vw;display:flex">
                    <!-- 我new一个数组  把选中的每一个信息的id传进去，判断数组里有没有用这个id，如果有就显示对号，如果没有就不显
                    其实一开始都是未选中的，所有检索数组都是空的，当你点击的时候，就把id传进去，这是一个静态的操作，当你再点击的时候删除 -->
                    
                    <img v-show="-1 == checkList.indexOf(item)"  @click="addItem()"
                    class="aSty" src="../images/checkbutton-no.png" alt="" style="height:100%">
                    <img v-show="-1 !== checkList.indexOf(item)"  @click="delItem()"
                    class="aSty" src="../images/checkbutton-action.png" alt="" style="height:100%">
                </div>
                <div class="center" style="width:33.47%">
                    <span style="font-size:0.729vw">标题：第三届人单合一模式国际论坛宴会场片</span>
                </div>
                <div class="center" style="width:25.9%">
                    <span style="font-size:0.729vw">类型：观看申请</span>
                </div>
                <div class="center" style="width:21.4%">
                    <span  style="font-size:0.729vw">审核状态：</span>
                    <!-- <span class="aSty" style="color:#0092fe;font-size:0.729vw">审核中</span> -->
                    <!-- <span class="aSty" style="color:#F18155;font-size:0.729vw">审核失败</span> -->
                    <span class="aSty" style="color:#37BAA0;font-size:0.729vw" @click = "openDialog()">审核成功</span>
                </div>
                <div class="center" style="width:17.21%">
                    <span style="font-size:0.729vw">申请时间：2019-09-15 11：00：00</span>
                </div>
            </div>

            <!-- 分页 -->
            <!-- <div style="width:100%;display:flex;justify-content:center;margin-bottom: 40px">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :hide-on-single-page= 'true'
                    background
                    layout = "prev, pager, next"
                    :page-size = 20
                    :total = paginationNumber>
                </el-pagination>
            </div> -->

            <el-dialog title="审核详情" :visible.sync="dialogTableVisible">
                <el-table :data="gridData">
                    <el-table-column property="date" label="审核时间" width="150"></el-table-column>
                    <el-table-column property="name" label="审核人" width="150"></el-table-column>
                    <el-table-column property="result" label="审核结果" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 1">待审核</span>
                            <span v-if="scope.row.status == 2" style="color:#F18155">审核拒绝</span>
                            <span  v-if="scope.row.status == 3" style="color:#37BAA0">审核通过</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="address" label="审核意见"></el-table-column>
                </el-table>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import service from '../API/request';
import configAPI from '../API/configAPI';
import Qs from 'qs'

export default {
    data(){
        return{
            myPag:8,
            value:'',
            name:'',
            type:'',
            status:'',
            beginData:'',
            endData:'',
            paginationNumber:100,
            options: [{
                value: '选项1',
                label: '由新到旧'
            }, {
                value: '选项2',
                label: '由旧到新'
            }],
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
            checkList:[1,2,3],
            item:4,
            dialogTableVisible:false,
            gridData: [{
                date: '2019-10-02',
                name: '王小虎',
                // result:'审核未通过',
                status:'1',
                address: ''
            }, {
                date: '2019-10-04',
                name: '王小虎',
                // result:'审核通过',
                status:'2',
                address: '这个视频的剪辑有点问题'
            }, {
                date: '2019-10-04',
                name: '王小虎',
                // result:'审核通过',
                status:'3',
                address: '通过'
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
        delItem(){
            for(var i=0; i < this.checkList.length; i++) {
                if(this.checkList[i] == this.item) {
                    this.checkList.splice(i, 1);
                    console.log('ok')
                    break;
                }
            }
        },
        addItem(){
            this.checkList.push(this.item)
        },
        openDialog(){
            this.dialogTableVisible = true
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
        width:32%
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
    .everyOne{
        width:100%;
        height: 3.28vw;
        background-color: white;
        border-radius: 10px;
        margin-bottom: 30px;
        padding: 1.09vw;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content:center;
    }
    .center{
        display: flex;
        align-items: center;
        /* justify-content: center */
    }
</style>
<style>
    .Top .el-input__inner{
        border: 0px;
        font-size:0.78vw;
        border-radius: 10px;
        height: 38px
    }
</style>