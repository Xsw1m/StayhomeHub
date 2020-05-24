<template>
    <div class="container2">
        <ecoaside @req2="req2"></ecoaside>
        <div class="main">
            <!-- 验证页 
            <div class="checked" v-if="ischeck == 1 && allcheck != 1">
                <el-row style="text-align: center;margin-bottom:5%;">
                    <span style="color: #AEAEAE">
                    请输入“{{column_name}}”栏目的视频观看
                        <el-tooltip v-if="isshow" content="987023" placement="top" effect="dark">
                            <p style="display:inline;font-weight: bold;" @click="isshow = false">邀请码</p>
                        </el-tooltip>
                        <p v-else style="display:inline;font-weight: bold;" @click="isshow = false">邀请码</p>
                    ，验证成功后方可进行视频观看～
                    </span>
                </el-row>
                <el-row style="display: flex;align-items: center;justify-content: center;margin-bottom:3%;">
                    <el-col :span="4" style="text-align: center;">
                        <span style="font-size:0.833vw;font-weight: bold;">观看邀请码:</span>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="code" placeholder="请输入邀请码" @keyup.enter.native="getchecked(code)"></el-input>
                    </el-col>
                </el-row>
                <el-row style="text-align: center;margin-bottom:4%;">
                    <el-button type="primary" round @click="getchecked(code)">确认</el-button>
                </el-row>
                <el-row style="text-align: center;">
                    <span style="color: #AEAEAE">视频观看邀请码可联系视频库运营人员申请～</span>
                </el-row>
            </div>-->
            <!-- 内容页 
            <div class="container3" v-if="ischeck == 2 || allcheck == 1">-->
            <div class="container3">
                <!-- 筛选栏目 -->
                <div class="card2">
                    <div class="all_year aSty" @click="get_allyear">时间</div>
                    <div class="year">
                        <!-- 其他时间列表 -->
                        <div
                          v-for="(i,index) in allyear"
                          :class="[year==i.time_buckets?'details_year_style':'details_year']"
                          @click="getyear(i.time_buckets)"
                        >{{i.item}}
                        </div>
                    </div>
                    <div style="display:flex;align-items:center;margin-left: auto;justify-content: space-between;width: 4%;">
                        <img :src="this.showModel===1?require('../../img/showModel1_focus.png'):require('../../img/showModel1.png')" alt="" @click="changeshowModel1">
                        <img :src="this.showModel===2?require('../../img/showModel2_focus.png'):require('../../img/showModel2.png')" alt="" @click="changeshowModel2">
                    </div>
                    <div class="total">
                        已为您找到<span>{{total}}</span>个视频
                    </div>
                </div>
                <!-- 视频详情栏 -->
                 <!-- 模式1  -->
                    <div class="card3" v-if="this.showModel === 1">
                        <div class="video_body">
                            <div class="news2 aSty"
                            @mouseenter="isfloor(pro.id)"
                            @mouseleave="nofloor()"
                            style="position:relative"
                            v-for="pro in propaganda"
                            :key="pro.id">
                            <div class="container1">
                            <!-- 绑定class -数据- -->
                                <div class="propaganda1" >
                                    <div v-if="pro.cover_s" class="image_videolist":style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                                    <!-- <img v-if="pro.cover" :src="pro.cover" alt="" style="width:100%;height:100%;"> -->
                                    <img v-if="!pro.cover_s" src="../../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                                    <div class="video_length2">
                                        <span class="duration">{{pro.video_duration}}</span>
                                    </div>
                                </div>
                                <div class="text3"><span class="line3">{{pro.title}}</span></div>
                                <div class="text4"><span class="line4">{{pro.introduction}}</span></div>
                                <div v-if="pro.id == isFloor" class="floor1">
                                    <div class="floorTop" style="margin-top:15%;margin-bottom:20%;">
                                        <div class="floor-title"  >
                                            <span >{{pro.title}}</span>
                                        </div>
                                        <div class="floor-time" >
                                            <span >时长：{{pro.video_duration}}</span>
                                        </div>
                                        <div class="floor-introduction" >
                                            <span >{{pro.introduction}}</span>
                                        </div>
                                    </div>
                                    <div class="floorButtom" >
                                        <div class="buttonDiv">
                                            <button @click="getVideo(pro)">
                                                <span class="aSty">立即播放</span>
                                            </button>
                                        </div>
                                        <div class="iconDiv">
                                            <div
                                            class="personal-Record-coll floorIcon"
                                            :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                            @click="iscollect(pro)"
                                            >
                                            </div>
                                            <div class="personal-Record-down floorIcon" @click="downpopup(pro.id)">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 模式2  -->
                <div class="card3" v-if="this.showModel === 2">
                    <div class="video_body">
                        <div
                        class="details2 aSty"
                        @mouseenter="isfloor(pro.id)"
                        @mouseleave="nofloor()"
                        style="position:relative"
                        v-for="pro in propaganda"
                        :key="pro.id"
                        >
                            <div class="container4" style="display: flex;">
                            <!-- <div class="container" style="display: flex;justify-content: space-between;"> -->
                                <div class="propaganda2" >
                                    <div v-if="pro.cover_s" class="image_videolist":style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                                    <img v-if="!pro.cover_s" src="../../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                                </div>
                                <div class="content">
                                    <span>{{pro.title}}</span>
                                    <span>时长：{{pro.video_duration}}</span>
                                    <span>{{pro.introduction}}</span>
                                </div>
                                <div v-if="pro.id == isFloor" class="floor2">
                                    <div class="floorButtom2" >
                                        <div class="iconDiv2">
                                            <div
                                            class="personal-Record-coll floorIcon2"
                                            :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                            @click="iscollect(pro)"
                                            >
                                            </div>
                                            <div class="personal-Record-down floorIcon2" @click="downpopup(pro.id)">
                                            </div>
                                        </div>
                                        <div class="buttonDiv2">
                                            <button @click="getVideo(pro)">
                                                <span class="aSty">立即播放</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-pagination
                    background
                    layout="prev, pager, next, jumper"
                    :current-page="page"
                    :hide-on-single-page=false
                    @current-change="handleCurrentChange"
                    :page-size="pagesize"
                    :total="total">
                </el-pagination>
                <!-- 下载提醒组件  refs不是响应式的 不能再循环中使用,需要拿出使用，只需要每次向里面传递不同的数据就行了  -->
                <downPopup :parentVideoId="videoId" ref="downpopup"></downPopup>

                <!-- 观看权限认证组件 -->
                <popup :videoId="videoId" ref="child"></popup>
            </div>
        </div>
    </div>
</template>
<script>
import ecoaside from '../ecocivilization/eco_aside.vue'
import downPopup from '../../components/downPopup.vue'
import popup from '../../components/popup.vue'
import Vue from 'vue'
// 导入API
import configAPI from '../../API/configAPI.js'
import service from '../../API/request.js'
import Qs from 'qs'
export default {
  data () {
    return {
      code: null,
      ischeck: 1,
      allcheck: 0,
      showModel: 2,
      checkFloor: 0,
      isFloor: 0,
      total: 0,
      pagesize: 14,
      page: 1,
      year: 0,
      allyear: [
        { item: '每日', time_buckets: 'day' }, { item: '每周', time_buckets: 'week' }, { item: '每月', time_buckets: 'month' }, { item: '每年', time_buckets: 'year' }, { item: '全部', time_buckets: 'all' }
      ],
      propaganda: [],
      listid: 'collect',
      column_name: '首席纪录片',
      videoId: '',
      isshow: false
    }
  },
  components: {
    ecoaside: ecoaside,
    downPopup: downPopup,
    popup: popup
  },
  created () {
    var checked = window.localStorage.getItem('column' + this.listid)
    const phone1 = window.localStorage.getItem('phone').split('****')[0]
    const phone2 = window.localStorage.getItem('phone').split('****')[1]
    const phone = phone1 + phone2
    this.getvideo()
    console.log('手机号', phone)
    if (phone == 1786364 || phone == 1380363) {
      window.localStorage.setItem('ischeck', 1)
      this.allcheck = 1
      this.ischeck = 2
      this.getvideo()
    } else {
      if (!checked) {
        window.localStorage.setItem('column' + this.listid, 1)
        this.ischeck = 1
      } else {
        // this.ischeck = window.localStorage.getItem('ischeck')
        if (window.localStorage.getItem('column' + this.listid) == 1) {
          this.ischeck = 1
        } else if (window.localStorage.getItem('column' + this.listid) == 2) {
          this.ischeck = 2
          this.getvideo()
        }
      }
    }
  },
  methods: {
    // 验证区
    getchecked (code) {
      console.log('code：', (9870 * 100 + this.listid))
      if (code == (9870 * 100 + this.listid)) {
        console.log('123', this.listid)
        window.localStorage.setItem('column' + this.listid, 2)
        // window.localStorage.setItem('column' + this.listid, 2)
        this.ischeck = 2
        this.getvideo()
      } else {
        this.$message.error('邀请码错误,可联系视频库运营人员!')
      }
    },
    // end
    changeshowModel1 () {
      this.pagesize = 15
      this.showModel = 1
      this.updatapagelist()
    },
    changeshowModel2 () {
      this.pagesize = 14
      this.showModel = 2
      this.updatapagelist()
    },
    onFloor (id) {
      this.checkFloor = id
    },
    offFloor () {
      this.checkFloor = 0
    },
    isfloor (id) {
      this.isFloor = id
    },
    nofloor () {
      this.isFloor = 0
    },
    get_allyear () {
      this.year = 0
    },
    getyear (id) {
      this.year = id
      console.log('更改year:' + this.year)
    },
    req2 (id, name) {
      console.log('获取子级传来的id:' + id, name)
      this.code = null
      this.listid = id
      this.column_name = name
      // var checked = window.localStorage.getItem('column' + id)
      // if (this.allcheck == 1) {
      //   this.ischeck = 2
      // } else {
      //   if (!checked) {
      //     window.localStorage.setItem('column' + id, 1)
      //     this.ischeck = 1
      //   } else {
      //   // this.ischeck = window.localStorage.getItem('ischeck')
      //     if (window.localStorage.getItem('column' + id) == 1) {
      //       this.ischeck = 1
      //     } else if (window.localStorage.getItem('column' + id) == 2) {
      //       this.ischeck = 2
      //     }
      //   }
      // }
    },
    // 跳转视频详情页的方法，添加了是否含有观看权限
    getVideo (data) {
      console.log(data)
      // 检查此视频有没有观看权限
      if (data.user_watch_jurisdiction == 1) {
        // 这里是把视频的id传送过去
        var person = {
          videoid: data.id
        }
        this.$router.push({ name: 'video', query: person })
      } else {
        this.$refs.child.chang()
        this.videoId = data.id
      }
    },
    // 跳转下载弹窗的方法
    downpopup (data) {
      console.log(data)
      this.$refs.downpopup.chang()
      // 把videoId传递到下载弹窗里
      this.videoId = data
    },
    // collect 收藏取消视频功能
    iscollect (data) {
      if (data.is_collect == true) {
        this.operate = 2
      } else {
        this.operate = 1
      }
      let params = {
            'video_id': data.id,
            'operate': this.operate
        }
      service.post(configAPI.postcollection,
          Qs.stringify(params)
      ) .then((result) => {
          console.log(result)
          data.is_collect = !data.is_collect
      }).catch((err) => {
      });
      // 更新数据
    },
    // 分页
    handleCurrentChange (val) {
      this.page = val
      this.updatapagelist()
    },
    // 获取视频详情
    updatapagelist () {
      if (this.year != 0) {
        service.get(configAPI.getvideolist, {
          params: {
            rank: this.listid,
            page: this.page,
            pagesize: this.pagesize,
            time: this.year
          }
        }).then((result) => {
          // console.log("category:"+this.category)
          // console.log("year:"+this.year)
          const { data } = result
          console.log('存在cate和 year', data.result.list)
          // console.log(data)
          // console.log(result)
          this.propaganda = data.result.list
          this.total = data.result.total
        }).catch((err) => {
          console.log(err)
        })
      } else {
        service.get(configAPI.getvideolist, {
          params: {
            rank: this.listid,
            page: this.page,
            pagesize: this.pagesize
          }
        }).then((result) => {
          // console.log("category:"+this.category)
          // console.log("year:"+this.year)
          const { data } = result
          // console.log(data)
          // console.log(result)
          this.propaganda = data.result.list
          this.total = data.result.total
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    getvideo () {
      service.get(configAPI.getvideolist, {
        params: {
          rank: this.listid,
          page: this.page,
          pagesize: this.pagesize
        }
      }).then((result) => {
        const res = result.data.result
        this.total = res.total
        console.log('3.getvideo', res)
        this.propaganda = res.list
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  watch: {
    // 注意之后，后端做好后 ，if 判断要判断本地储存，此处有需要修改
    listid: function (newVal) {
      console.log('listid发生了变化', newVal)
      this.page = 1
      this.category = this.listid
      this.year = 0
      service.get(configAPI.getvideolist, {
          params: {
            rank: this.listid,
            page: this.page,
            pagesize: this.pagesize
          }
        }).then((result) => {
          const res = result.data.result
          this.total = res.total
          // console.log('hhhhhhh', res)
          this.propaganda = res.list
        }).catch((err) => {
          console.log(err)
        })
      // var checked = window.localStorage.getItem('column' + this.listid)
      // if (this.allcheck == 1) {
      //   service.get(configAPI.getvideolist, {
      //     params: {
      //       rank: this.listid,
      //       page: this.page,
      //       pagesize: this.pagesize
      //     }
      //   }).then((result) => {
      //     const res = result.data.result
      //     this.total = res.total
      //     // console.log('hhhhhhh', res)
      //     this.propaganda = res.list
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      // } else {
      //   if (!checked) {
      //     this.propaganda = []
      //   } else {
      //     if (window.localStorage.getItem('column' + this.listid) == 1) {
      //     // this.propaganda = []
      //     } else if (window.localStorage.getItem('column' + this.listid) == 2) {
      //       service.get(configAPI.getvideolist, {
      //         params: {
      //           rank: this.listid,
      //           page: this.page,
      //           pagesize: this.pagesize
      //         }
      //       }).then((result) => {
      //         const res = result.data.result
      //         this.total = res.total
      //         // console.log('hhhhhhh', res)
      //         this.propaganda = res.list
      //       }).catch((err) => {
      //         console.log(err)
      //       })
      //     }
      //   }
      // }
    },
    year: function (newVal) {
      this.page = 1
      console.log(newVal)
      if (newVal != 0) {
        service.get(configAPI.getvideolist, {
          params: {
            rank: this.listid,
            page: this.page,
            pagesize: this.pagesize,
            time: this.year
          }
        }).then((result) => {
          // console.log("category:"+this.category)
          // console.log("year:"+this.year)
          const { data } = result
          console.log('存在cate和 year', data.result.list)
          // console.log(data)
          // console.log(result)
          this.propaganda = data.result.list
          this.total = data.result.total
        }).catch((err) => {
          console.log(err)
        })
      } else {
        service.get(configAPI.getvideolist, {
          params: {
            rank: this.listid,
            page: this.page,
            pagesize: this.pagesize
          }
        }).then((result) => {
          // console.log("category:"+this.category)
          // console.log("year:"+this.year)
          const { data } = result
          // console.log(data)
          // console.log(result)
          this.propaganda = data.result.list
          this.total = data.result.total
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
}
</script>
<style scoped>
.checked{
    height:90%;
    box-sizing: border-box;
    padding: 18% 25%;
}
.main{
    background-color: #F4F7FD;
    color: #333;
    width: 83.334%;
    /* min-width: 1000px; */
    /* height: 52.08333334vw; */
    height: 100%;
}
.aSty{
    cursor:pointer
}
.container3{
    height:97%;
    padding: 1% 0 0 3.6875%;
}
.card2{
height: 3.2%;
/* width:1510px;  */
display: flex;
justify-content: flex-start;
margin-right: 1.2%;
margin-bottom: 2.02565834%;
}
.card3{
height:78.2%;
overflow:scroll;
overflow-x:hidden;
margin-bottom: 2%;
}
.container4{
    height: 100%;
    background-color: #F4F7FD;
    width: 100%;
    /* min-width: 1200px; */
    display: flex;
}
.all_category,.all_year{
width:80px;
/* height:32px; */
border-radius:16px;
background:#37BAA0;
display:flex;
align-items: center;
justify-content: center;
color: #FFFFFF;
font-size: 0.73vw;
margin-right: 2.701%;
}
.category{
    display: flex;
    justify-content: space-between;
    width: 42.5%;
}
.year{
    display: flex;
    justify-content: space-between;
    width: 30%;
}
.details_category,.details_year{
    cursor:pointer;
    font-size: 0.73vw;
    display: flex;
    align-items: center;
}
.details_category_style,.details_year_style{
    cursor:pointer;
    font-size: 0.73vw;
    display: flex;
    align-items: center;
    color: #37BAA0
}
.total{
    color: #999999;
    display: flex;
    align-items: center;
    /* 使最后一项居右对齐 */
    margin-left: auto;
    font-size: 0.73vw;
}
.total span{
    font-size: 0.73vw;
    color: #000000;
}
/* floor1 */
.floor1{
    width: 100%;
    height: 100%;
    background:linear-gradient(rgba(0, 0, 0, 0.479),rgb(0, 0, 0));
    opacity: 0.99;
    position: absolute;
    bottom: 0%;
    padding: 20% 10% 60%  10%;
    box-sizing: border-box;
}
.floor-title{
    width:100%;height:22.5%;display:flex
}
    .floor-title span{
        color:#FFFFFF;
        font-size: 0.78125vw;
        line-height:1.1;
        height:100%;
        overflow:hidden;
        text-overflow: ellipsis;/* 多余的省略号表示 */
        /* white-space: nowrap; */

    }
    .floor-time{
        width:100%;height:16.875%;display:flex
    }
    .floor-time span{
        color:#E1E1E1;font-size:0.625vw
    }
    .floor-introduction{
        width:100%;height:60.625%
    }
    .floorTop{
        width:100%;height:84.3%
    }
    .floorButtom{
        width:100%;
        height: 15.25%;
        display:flex
    }
    .buttonDiv{
        width:41.3%;height:100%;display:flex
    }
    .buttonDiv button{
        width:100%;height:100%;background-color:#37BAA0;
    }
    .buttonDiv span{
        color:#FFFFFF;font-size:0.625vw
    }
    .floor-introduction span{
        color:#E1E1E1;
        font-size:0.625vw;
        line-height:1.5;
        /* float:left; */
        width:100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
    }
    button:focus{
        outline: none
    }
    button:active{
        background-color: rgb(42, 139, 120)
    }
    button{
        border: 0px;
        border-radius: 15px
    }
    .iconDiv{
        width:59.7%;
        height:100%;
        padding:2% 0 2% 25%;
        box-sizing:border-box;
        display:flex;
        justify-content:space-between
    }
    .floorIcon{
        width:25%;height:100%;
    }
    .personal-Record-coll{
        background-image: url('../../images/personal-Record-coll.png');
        background-size: 100% 100%
    }
    .personal-Record-coll_style{
        background-image: url('../../images/personal-Record-coll-hover.png');
        background-size: 100% 100%
    }
    .personal-Record-coll:hover{
        background-image: url('../../images/personal-Record-coll-hover.png');
        background-size: 100% 100%
    }
    .personal-Record-down{
        background-image: url('../../images/personal-Record-down.png');
        background-size: 100% 100%
    }
    .personal-Record-down:hover{
        background-image: url('../../images/personal-Record-down-hover.png');
        background-size: 100% 100%
    }
/* :end */
/* floor2 */
.floor2{
    width: 100%;
    height: 100%;

    background:linear-gradient(270deg,rgba(0, 0, 0, 0.931),rgba(0, 0, 0, 0.137));
    opacity: 0.99;
    position: absolute;
    bottom: 0%;
    /* padding: 20% 10% 60%  10%; */
    box-sizing: border-box;
}
    .floorButtom2{
        width:30%;
        height: 100%;
        display:flex;
        text-align: center;
        margin-left: auto;
        padding-right: 5%;
    }
    .buttonDiv2{
        width:100%;
        height:100%;
        display:flex;
        align-items: center;
        margin-left: 10%;
    }
    .buttonDiv2 button{
        width:80%;
        height:20%;
        background-color:#37BAA0;
    }
    .buttonDiv2 span{
        color:#FFFFFF;font-size:0.625vw
    }
    button:focus{
        outline: none
    }
    button:active{
        background-color: rgb(42, 139, 120)
    }
    button{
        border: 0px;
        border-radius: 15px
    }
    .iconDiv2{
        width:50%;
        height:100%;
        box-sizing:border-box;
        display:flex;
        justify-content:space-between;
        align-items: center;
    }
    .floorIcon2{
        width:32%;
        height:12%;
        /* padding-left: 50%;  */
        /* margin-right: 20%; */
    }
/* :end */
/* 下方视频播放框 video  下方视频播放框 video下方视频播放框 video下方视频播放框 video下方视频播放框 video*/
.video_body{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    /* height: 90%; */
    height: 21.9270833vw;
    margin-bottom: 5%;
}
.news2{
    height: 100%;
    /* height: 55.302%; */
    width: 18.408%;
    display: inline-block;
    margin-right: 1%;
    margin-bottom: 1.5%;
}
.details2{
    width: 49%;
    height: 37%;
    /* height: 55.302%; */
    /* width: 100%; */
    display: inline-block;
    margin-right: 1%;
    margin-bottom: 0.5%;
}
.image_videolist{
    height: 100%;
    /* background:url(../img/banner3.jpg); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.container1{
    width: 100%;
    height: 100%;
}
.duration{
display: flex;
justify-content:center;
align-items: center;
width: 100%;
height: 100%;
font-size:0.625vw;
font-family:FZLanTingHei-R-GBK;
color:rgba(255,255,255,1);
opacity:1;
}
.video_length2{
/* margin: 113.487% 2.133% 2.128% 74.4771%;
display: inline-block; */
position:absolute;
left: 75%;
bottom:19%;
width:23.409%;
height:5.780347%;
background:rgba(0,0,0,1);
opacity:1;
border-radius:10px;
line-height: 1;
}
.propaganda1{
    width:100%;
    height:82.2%;
}
.propaganda2{
    width:18%;
    height:100%;
    margin-right: 3%;
}
.content{
    width: 70%;
    display:flex;
    flex-flow: column;
    margin: auto 0;
}
.content span{
    display: inline-block;
    margin-bottom: 2%;
    font-size: 0.73vw;
    line-height: 1.2;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    overflow: hidden;/* 超出部分隐藏 */
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    /* white-space: nowrap;规定段落中的文本不进行换行 */

}
.content_button{
width:12%;
display:flex;
height:100%;
padding: 6% 0%;
margin-right: 1%;
box-sizing: border-box;
}
.text3{
    background-color:rgba(255,255,255,1);
    height: 3.802%;
    line-height: 1;
    padding: 4.97% 0px 1px 10px;
}
.text4{
    background-color:rgba(255,255,255,1);
    height: 4.753%;
    line-height: 1;
    padding: 3.5% 0px 3.8% 10px;

}
.line3{
width:91%;
/* height:16px; */
font-size:0.78125vw;
font-family:FZLanTingHei-R-GBK;
font-weight:bold;
color:rgba(51,51,51,1);
}
.line4{
width:92%;
/* height:14px; */
font-size:0.73vw;
font-family:FZLanTingHei-R-GBK;
font-weight:400;
color:rgba(102,102,102,1);
}
.text1 span,.text2 span,.text3 span,.text4 span{
    display: inline-block;
    line-height: 1em;
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.showModel1{

}
.showModel2{

}
</style>
