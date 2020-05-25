<template>
  <div class="container2"> 
      <homeaside :status="status"></homeaside>
      <div class="main" style="overflow:scroll;overflow-x:hidden;">
    <div style="background-color: #F4F7FD;">
        <div class="banner">
            <el-carousel trigger="click" height="23.95834vw">
            <el-carousel-item v-for="(item,index) in bannerimg" :key="index+1">
                <img :src="item.pic" alt="" style="height:100%;width:100%;" @click="bannertovideo(item)">
            </el-carousel-item>
            </el-carousel>
        </div>
        <!---------------------- 精选 --------------------->
        <div class="selectness_head" style="line-height:1;">
            <div class="nav_left"><img src="../img/nav_focus.png"></div>
            <div class="nav_right"><span>精选</span></div>
        </div>
        <div class="selectness_body">
            <!-- 1 -->
            <div class="news1 aSty"
            @mouseenter="onFloor(sel.id)"
            @mouseleave="offFloor()"
            v-for="sel in selection"
            style="position:relative"
            :key="sel.id">
                <div class="container">
                <!-- 绑定class -数据- -->
                    <div class="preview">
                        <img v-if="sel.cover" :src="sel.cover" alt="" style="width:100%;height:100%;">
                        <img v-if="!sel.cover" src="../img/undefinds_img.jpg" alt="" style="width:100%;height:100%;">
                        <div class="video_length1">
                            <span class="duration">{{sel.video_duration}}</span>
                        </div>
                    </div>
                    <div class="text1"><span class="line1">{{sel.title}}</span></div>
                    <div class="text2"><span class="line2">{{sel.introduction}}</span></div>
                <!-- floor -->
                    <div v-if="sel.id == checkFloor" class="floor1">
                            <div class="floorTop">
                                <div class="floor-title"  >
                                    <span >{{sel.title}}</span>
                                </div>
                                <div class="floor-time" >
                                    <span >时长：{{sel.video_duration}}</span>
                                </div>
                                <div class="floor-introduction" >
                                    <span >{{sel.introduction}}</span>
                                </div>
                            </div>
                            <div class="floorButtom" >
                                <div class="buttonDiv">
                                    <button @click="getVideo(sel)">
                                        <span class="aSty">立即播放</span>
                                    </button>
                                </div>
                                <div class="iconDiv">
                                    <div 
                                    class="personal-Record-coll floorIcon" 
                                    :class="[sel.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                    @click="iscollect(sel)"
                                    >

                                    </div>
                                    <!-- <div class="personal-Record-down floorIcon" @click="downpopup(sel.id)">

                                    </div>-->
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <!-- 2 -->
        </div>

        <!----- ------------- 娱乐新闻   --------------------->
        <div class="propaganda_head" style="line-height:1;">
            <div class="nav_left"><img src="../img/nav1_focus.png"></div>
            <div class="nav_right"><span>娱乐新闻</span><a class="aSty" style="color:rgba(55,186,160,1);float:right;" @click="toPropaganda">更多</a></div>
            
        </div>
        <div class="propaganda_body">
            <div class="news2 aSty"
            @mouseenter="isfloor(pro.id)"
            @mouseleave="nofloor()"
            style="position:relative"
            v-for="pro in propaganda"
            :key="pro.id">
                <div class="container">
                <!-- 绑定class -数据- -->
                    <div class="propaganda">
                        <div v-if="pro.cover_s" class="image_videolist" :style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                        <!-- <img v-if="pro.cover" :src="pro.cover" alt="" style="width:100%;height:100%;"> -->
                        <img v-if="!pro.cover_s" src="../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                        <div class="video_length2">
                            <span class="duration">{{pro.video_duration}}</span>
                        </div>
                    </div>
                    <div class="text3"><span class="line3">{{pro.title}}</span></div>
                    <div class="text4"><span class="line4">{{pro.introduction}}</span></div>
                    <div v-if="pro.id == isFloor" class="floor2">
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
                                    <div class="personal-Record-coll floorIcon" 
                                    :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                    @click="iscollect(pro)"
                                    >
                                    </div>
                                    <!--<div class="personal-Record-down floorIcon" @click="downpopup(pro.id)">

                                    </div>-->
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <!----- ------------- 音乐music   --------------------->
        <div class="propaganda_head" style="line-height:1;">
            <div class="nav_left"><img src="../img/nav2_focus.png"></div>
            <div class="nav_right"><span>音乐music</span><a class="aSty" style="color:rgba(55,186,160,1);float:right;" @click="todynamics">更多</a></div>
            
        </div>
        <div class="propaganda_body">
            <div class="news2 aSty"
            @mouseenter="isfloor(pro.id)"
            @mouseleave="nofloor()"
            style="position:relative"
            v-for="pro in dynamics"
            :key="pro.id">
                <div class="container">
                <!-- 绑定class -数据- -->
                    <div class="propaganda">
                        <div v-if="pro.cover_s" class="image_videolist" :style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                        <!-- <img v-if="pro.cover" :src="pro.cover" alt="" style="width:100%;height:100%;"> -->
                        <img v-if="!pro.cover_s" src="../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                        <div class="video_length2">
                            <span class="duration">{{pro.video_duration}}</span>
                        </div>
                    </div>
                    <div class="text3"><span class="line3">{{pro.title}}</span></div>
                    <div class="text4"><span class="line4">{{pro.introduction}}</span></div>
                    <div v-if="pro.id == isFloor" class="floor2">
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
                                    <div class="personal-Record-coll floorIcon" 
                                    :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                    @click="iscollect(pro)"
                                    >
                                    </div>
                                    <!--<div class="personal-Record-down floorIcon" @click="downpopup(pro.id)">

                                    </div>-->
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <!----- ------------- 舞蹈show   --------------------->
        <div class="propaganda_head" style="line-height:1;">
            <div class="nav_left"><img src="../img/nav3_focus.png"></div>
            <div class="nav_right"><span>舞蹈show</span><a class="aSty" style="color:rgba(55,186,160,1);float:right;" @click="toMschool">更多</a></div>
            
        </div>
        <div class="propaganda_body">
            <div class="news2 aSty"
            @mouseenter="isfloor(pro.id)"
            @mouseleave="nofloor()"
            style="position:relative"
            v-for="pro in Mschool"
            :key="pro.id">
                <div class="container">
                <!-- 绑定class -数据- -->
                    <div class="propaganda">
                        <div v-if="pro.cover_s" class="image_videolist" :style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                        <!-- <img v-if="pro.cover" :src="pro.cover" alt="" style="width:100%;height:100%;"> -->
                        <img v-if="!pro.cover_s" src="../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                        <div class="video_length2">
                            <span class="duration">{{pro.video_duration}}</span>
                        </div>
                    </div>
                    <div class="text3"><span class="line3">{{pro.title}}</span></div>
                    <div class="text4"><span class="line4">{{pro.introduction}}</span></div>
                    <div v-if="pro.id == isFloor" class="floor2">
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
                                    <div class="personal-Record-coll floorIcon" 
                                    :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                    @click="iscollect(pro)"
                                    >
                                    </div>
                                    <!--<div class="personal-Record-down floorIcon" @click="downpopup(pro.id)">

                                    </div>-->
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <!----- ------------- 生活live   --------------------->
        <div class="propaganda_head" style="line-height:1;" v-if="false">
            <div class="nav_left"><img src="../img/nav4_focus.png"></div>
            <div class="nav_right"><span>生活live</span><a class="aSty" style="color:rgba(55,186,160,1);float:right;" @click="toHaierRecord">更多</a></div>
            
        </div>
        <div class="propaganda_body" v-if="false">
            <div class="news2 aSty"
            @mouseenter="isfloor(pro.id)"
            @mouseleave="nofloor()"
            style="position:relative"
            v-for="pro in HaierRecord"
            :key="pro.id">
                <div class="container">
                <!-- 绑定class -数据- -->
                    <div class="propaganda">
                        <div v-if="pro.cover_s" class="image_videolist" :style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                        <!-- <img v-if="pro.cover" :src="pro.cover" alt="" style="width:100%;height:100%;"> -->
                        <img v-if="!pro.cover_s" src="../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                        <div class="video_length2">
                            <span class="duration">{{pro.video_duration}}</span>
                        </div>
                    </div>
                    <div class="text3"><span class="line3">{{pro.title}}</span></div>
                    <div class="text4"><span class="line4">{{pro.introduction}}</span></div>
                    <div v-if="pro.id == isFloor" class="floor2">
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
                                    <div class="personal-Record-coll floorIcon" 
                                    :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                    @click="iscollect(pro)"
                                    >
                                    </div>
                                    <!--<div class="personal-Record-down floorIcon" @click="downpopup(pro.id)">

                                    </div>-->
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <!----- ------------- 科技数码   --------------------->
        <div class="propaganda_head" style="line-height:1;">
            <div class="nav_left"><img src="../img/nav5_focus.png"></div>
            <div class="nav_right"><span>科技数码</span><a class="aSty" style="color:rgba(55,186,160,1);float:right;" @click="toProcessNode">更多</a></div>
            
        </div>
        <div class="propaganda_body">
            <div class="news2 aSty"
            @mouseenter="isfloor(pro.id)"
            @mouseleave="nofloor()"
            style="position:relative"
            v-for="pro in ProcessNode"
            :key="pro.id">
                <div class="container">
                <!-- 绑定class -数据- -->
                    <div class="propaganda">
                        <div v-if="pro.cover_s" class="image_videolist" :style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                        <!-- <img v-if="pro.cover" :src="pro.cover" alt="" style="width:100%;height:100%;"> -->
                        <img v-if="!pro.cover_s" src="../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                        <div class="video_length2">
                            <span class="duration">{{pro.video_duration}}</span>
                        </div>
                    </div>
                    <div class="text3"><span class="line3">{{pro.title}}</span></div>
                    <div class="text4"><span class="line4">{{pro.introduction}}</span></div>
                    <div v-if="pro.id == isFloor" class="floor2">
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
                                    <div class="personal-Record-coll floorIcon" 
                                    :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                    @click="iscollect(pro)"
                                    >
                                    </div>
                                    <!--<div class="personal-Record-down floorIcon" @click="downpopup(pro.id)">

                                    </div>-->
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <!----- ------------- Vlog记录   --------------------->
        <div class="propaganda_head" style="line-height:1;">
            <div class="nav_left"><img src="../img/nav6_focus.png"></div>
            <div class="nav_right"><span>Vlog记录</span><a class="aSty" style="color:rgba(55,186,160,1);float:right;" @click="toPOOP">更多</a></div>
            
        </div>
        <div class="propaganda_body">
            <div class="news2 aSty"
            @mouseenter="isfloor(pro.id)"
            @mouseleave="nofloor()"
            style="position:relative"
            v-for="pro in POOP"
            :key="pro.id">
                <div class="container">
                <!-- 绑定class -数据- -->
                    <div class="propaganda">
                        <div v-if="pro.cover_s" class="image_videolist" :style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                        <!-- <img v-if="pro.cover" :src="pro.cover" alt="" style="width:100%;height:100%;"> -->
                        <img v-if="!pro.cover_s" src="../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                        <div class="video_length2">
                            <span class="duration">{{pro.video_duration}}</span>
                        </div>
                    </div>
                    <div class="text3"><span class="line3">{{pro.title}}</span></div>
                    <div class="text4"><span class="line4">{{pro.introduction}}</span></div>
                    <div v-if="pro.id == isFloor" class="floor2">
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
                                    <div class="personal-Record-coll floorIcon" 
                                    :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                    @click="iscollect(pro)"
                                    >
                                    </div>
                                    <!--<div class="personal-Record-down floorIcon" @click="downpopup(pro.id)">

                                    </div>-->
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <!----- ------------- 鬼畜   --------------------->
        <div class="propaganda_head" style="line-height:1;">
            <div class="nav_left"><img src="../img/nav7_focus.png"></div>
            <div class="nav_right"><span>鬼畜</span><a class="aSty" style="color:rgba(55,186,160,1);float:right;" @click="toinformation">更多</a></div>
            
        </div>
        <div class="propaganda_body">
            <div class="news2 aSty"
            @mouseenter="isfloor(pro.id)"
            @mouseleave="nofloor()"
            style="position:relative"
            v-for="pro in information"
            :key="pro.id">
                <div class="container">
                <!-- 绑定class -数据- -->
                    <div class="propaganda">
                        <div v-if="pro.cover_s" class="image_videolist" :style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                        <!-- <img v-if="pro.cover" :src="pro.cover" alt="" style="width:100%;height:100%;"> -->
                        <img v-if="!pro.cover_s" src="../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                        <div class="video_length2">
                            <span class="duration">{{pro.video_duration}}</span>
                        </div>
                    </div>
                    <div class="text3"><span class="line3">{{pro.title}}</span></div>
                    <div class="text4"><span class="line4">{{pro.introduction}}</span></div>
                    <div v-if="pro.id == isFloor" class="floor2">
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
                                    <div class="personal-Record-coll floorIcon" 
                                    :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                    @click="iscollect(pro)"
                                    >
                                    </div>
                                    <!--<div class="personal-Record-down floorIcon" @click="downpopup(pro.id)">

                                    </div>-->
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <!----- ------------- 游戏   --------------------->
        <div class="propaganda_head" style="line-height:1;">
            <div class="nav_left"><img src="../img/nav8_focus.png"></div>
            <div class="nav_right"><span>游戏</span><a class="aSty" style="color:rgba(55,186,160,1);float:right;" @click="tomaterial">更多</a></div>
            
        </div>
        <div class="propaganda_body">
            <div class="news2 aSty"
            @mouseenter="isfloor(pro.id)"
            @mouseleave="nofloor()"
            style="position:relative"
            v-for="pro in material"
            :key="pro.id">
                <div class="container">
                <!-- 绑定class -数据- -->
                    <div class="propaganda">
                        <div v-if="pro.cover_s" class="image_videolist" :style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                        <!-- <img v-if="pro.cover" :src="pro.cover" alt="" style="width:100%;height:100%;"> -->
                        <img v-if="!pro.cover_s" src="../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                        <div class="video_length2">
                            <span class="duration">{{pro.video_duration}}</span>
                        </div>
                    </div>
                    <div class="text3"><span class="line3">{{pro.title}}</span></div>
                    <div class="text4"><span class="line4">{{pro.introduction}}</span></div>
                    <div v-if="pro.id == isFloor" class="floor2">
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
                                    <div class="personal-Record-coll floorIcon" 
                                    :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                    @click="iscollect(pro)"
                                    >
                                    </div>
                                    <!--<div class="personal-Record-down floorIcon" @click="downpopup(pro.id)">

                                    </div>-->
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <!----- ------------- 动漫番剧   --------------------->
        <div class="propaganda_head" style="line-height:1;" v-if="false">
            <div class="nav_left"><img src="../img/nav9_focus.png"></div>
            <div class="nav_right"><span>动漫番剧</span><a class="aSty" style="color:rgba(55,186,160,1);float:right;" @click="tologo">更多</a></div>
            
        </div>
        <div class="propaganda_body" v-if="false">
            <div class="news2 aSty"
            @mouseenter="isfloor(pro.id)"
            @mouseleave="nofloor()"
            style="position:relative"
            v-for="pro in logo"
            :key="pro.id">
                <div class="container">
                <!-- 绑定class -数据- -->
                    <div class="propaganda">
                        <div v-if="pro.cover_s" class="image_videolist" :style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                        <!-- <img v-if="pro.cover" :src="pro.cover" alt="" style="width:100%;height:100%;"> -->
                        <img v-if="!pro.cover_s" src="../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                        <div class="video_length2">
                            <span class="duration">{{pro.video_duration}}</span>
                        </div>
                    </div>
                    <div class="text3"><span class="line3">{{pro.title}}</span></div>
                    <div class="text4"><span class="line4">{{pro.introduction}}</span></div>
                    <div v-if="pro.id == isFloor" class="floor2">
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
                                    <div class="personal-Record-coll floorIcon" 
                                    :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                    @click="iscollect(pro)"
                                    >
                                    </div>
                                    <!--<div class="personal-Record-down floorIcon" @click="downpopup(pro.id)">

                                    </div>-->
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <!----- ------------- 影视   --------------------->
        <div class="propaganda_head" style="line-height:1;" v-if="false">
            <div class="nav_left"><img src="../img/nav10_focus.png"></div>
            <div class="nav_right"><span>影视</span><a class="aSty" style="color:rgba(55,186,160,1);float:right;" @click="toother">更多</a></div>
            
        </div>
        <div class="propaganda_body" v-if="false">
            <div class="news2 aSty"
            @mouseenter="isfloor(pro.id)"
            @mouseleave="nofloor()"
            style="position:relative"
            v-for="pro in other"
            :key="pro.id">
                <div class="container">
                <!-- 绑定class -数据- -->
                    <div class="propaganda">
                        <div v-if="pro.cover_s" class="image_videolist" :style="{background: 'url('+pro.cover_s+')',backgroundSize:'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',}"></div>
                        <!-- <img v-if="pro.cover" :src="pro.cover" alt="" style="width:100%;height:100%;"> -->
                        <img v-if="!pro.cover_s" src="../img/undefind_img.jpg" alt="" style="width:100%;height:100%;">
                        <div class="video_length2">
                            <span class="duration">{{pro.video_duration}}</span>
                        </div>
                    </div>
                    <div class="text3"><span class="line3">{{pro.title}}</span></div>
                    <div class="text4"><span class="line4">{{pro.introduction}}</span></div>
                    <div v-if="pro.id == isFloor" class="floor2">
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
                                    <div class="personal-Record-coll floorIcon" 
                                    :class="[pro.is_collect == false?'personal-Record-coll':'personal-Record-coll_style']"
                                    @click="iscollect(pro)"
                                    >
                                    </div>
                                    <!--<div class="personal-Record-down floorIcon" @click="downpopup(pro.id)">

                                    </div>-->
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
         
            <!-- 下载提醒组件  refs不是响应式的 不能再循环中使用,需要拿出使用，只需要每次向里面传递不同的数据就行了  -->
            <downPopup :parentVideoId="videoId" ref="downpopup"></downPopup>
            
            <!-- 观看权限认证组件 -->
            <popup :videoId="videoId" ref="child"></popup>
    </div>
    </div>
  </div>
</template>
<script>
import homeaside from '../children/home_aside.vue'
// import propaganda_base from '../components/propaganda_base.vue'
//导入下载和观看的弹窗
import downPopup from '../components/downPopup.vue'
import popup from '../components/popup.vue'
import configAPI from '../API/configAPI.js'
import Qs from 'qs'
import service from '../API/request.js'
export default {
    components: {
        'homeaside':homeaside,
        'downPopup':downPopup,
        'popup':popup,
    },
    data () {
        return {
            bannerimg:[],
            checkFloor:0,
            isFloor:0,
            videoId:'',

            operate:'',
            status:0,
            item:'',
            selection: [],
            propaganda: [],
            dynamics: [],
            Mschool: [],
            HaierRecord: [],
            ProcessNode: [],
            POOP: [],
            information: [],
            material: [],
            logo: [],
            other: [],
        }
    },
    methods: {
        onFloor(id){
            this.checkFloor = id
        },
        offFloor(){
            this.checkFloor = 0
        },
        isfloor(id){
            this.isFloor = id
        },
        nofloor(){
            this.isFloor = 0
        },
        toPropaganda(){
            this.$router.push({path:'/propaganda',query:{listid:1}})
        },
        todynamics(){
            this.$router.push({path:'/propaganda',query:{listid:2}})
        },
        toMschool(){
            this.$router.push({path:'/propaganda',query:{listid:3}})
        },
        toHaierRecord(){
            this.$router.push({path:'/propaganda',query:{listid:4}})
        },
        toProcessNode(){
            this.$router.push({path:'/propaganda',query:{listid:5}})
        },
        toPOOP(){
            this.$router.push({path:'/propaganda',query:{listid:6}})
        },
        toinformation(){
            this.$router.push({path:'/propaganda',query:{listid:7}})
        },
        tomaterial(){
            this.$router.push({path:'/propaganda',query:{listid:8}})
        },
        tologo(){
            this.$router.push({path:'/propaganda',query:{listid:9}})
        },
        toother(){
            this.$router.push({path:'/propaganda',query:{listid:10}})
        },
        //判断 首页子组件 向父组件表明自己身份
        judge(){
            console.log("我是首页"+ this.status)
            this.$emit("judge",this.status)
        },
        //跳转视频详情页的方法，添加了是否含有观看权限
        getVideo(data){
            console.log(data)
            // 检查此视频有没有观看权限
            if(data.user_watch_jurisdiction === 1){
                //这里是把视频的id传送过去
                var person = {
                    videoid:data.id
                }
                this.$router.push({name:'video',query:person})
            }else{
                this.$refs.child.chang()
                this.videoId = data.id
            }
        },
        bannertovideo(data) {
            console.log(data)
            // if(data.user_watch_jurisdiction === 1){
                var person = {
                    videoid: data.id
                }
                this.$router.push({name:'video',query:person})
            // }else{
            //     this.$refs.child.chang()
            //     this.videoId = data.id
            // }
        },
        //跳转下载弹窗的方法
        downpopup(data){
            console.log(data)
            this.$refs.downpopup.chang()
            //把videoId传递到下载弹窗里
            this.videoId = data
        },
        //collect 收藏取消视频功能
        iscollect(data){
            if(data.is_collect == true){
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
            //更新数据
        },
    },
    created(){
        this.judge()
        // 获取焦点图
        service.get(configAPI.bannerimg,{
            'filter[status]': 2,
            'include': 'video'
        }).then((result) => {
            console.log('banner: ')
            this.bannerimg = result.data.result
            // console.log('banner详情信息', this.bannerimg)
        }).catch((err) => {
            console.log('错误', err)
        });
        // 获取首页精选栏目
        service.get(configAPI.gethomepageselected,{
            }).then((result) => {
                // let {data} = result;
                this.selection = result.data.result.list
                console.log('获取精选栏目', this.selection)
            }).catch((err) => {
                
            });
        //获取首页宣传栏目
        service.get(configAPI.getvideolist,{
                params: {
                    'category_id': 1,
                    'filter[status]': 2,
                    'page': 1,
                    'pagesize':5,
                }
            }).then((result) => {
                console.log('这是请求的种类', this.listid)
                this.propaganda = result.data.result.list
                console.log('这是请求的种类详情', this.propaganda)
            }).catch((err) => {
                
            });
        //获取首页链群动态
        service.get(configAPI.getvideolist,{
                params: {
                    'category_id': 2,
                    'filter[status]': 2,
                    'page': 1,
                    'pagesize':5,
                }
            }).then((result) => {
                // console.log('这是请求的种类'+this.listid)
                this.dynamics = result.data.result.list
            }).catch((err) => {
                
            });
        //获取首页舞蹈show
        service.get(configAPI.getvideolist,{
                params: {
                    'category_id': 3,
                    'filter[status]': 2,
                    'page': 1,
                    'pagesize':5,
                }
            }).then((result) => {
                // console.log('这是请求的种类'+this.listid)
                this.Mschool = result.data.result.list
            }).catch((err) => {
                
            });
        //获取首页生活live
        service.get(configAPI.getvideolist,{
                params: {
                    'category_id': 4,
                    'filter[status]': 2,
                    'page': 1,
                    'pagesize':5,
                }
            }).then((result) => {
                // console.log('这是请求的种类'+this.listid)
                this.HaierRecord = result.data.result.list
            }).catch((err) => {
                
            });
        //获取首页科技数码
        service.get(configAPI.getvideolist,{
                params: {
                    'category_id': 5,
                    'filter[status]': 2,
                    'page': 1,
                    'pagesize':5,
                }
            }).then((result) => {
                // console.log('这是请求的种类'+this.listid)
                this.ProcessNode = result.data.result.list
            }).catch((err) => {
                
            });
        //获取首页Vlog记录
        service.get(configAPI.getvideolist,{
                params: {
                    'category_id': 6,
                    'filter[status]': 2,
                    'page': 1,
                    'pagesize':5,
                }
            }).then((result) => {
                // console.log('这是请求的种类'+this.listid)
                this.POOP = result.data.result.list
            }).catch((err) => {
                
            });
        //获取首页鬼畜
        service.get(configAPI.getvideolist,{
                params: {
                    'category_id': 7,
                    'filter[status]': 2,
                    'page': 1,
                    'pagesize':5,
                }
            }).then((result) => {
                // console.log('这是请求的种类'+this.listid)
                this.information = result.data.result.list
            }).catch((err) => {
                
            });
        //获取首页游戏
        service.get(configAPI.getvideolist,{
                params: {
                    'category_id': 8,
                    'filter[status]': 2,
                    'page': 1,
                    'pagesize':5,
                }
            }).then((result) => {
                // console.log('这是请求的种类'+this.listid)
                this.material = result.data.result.list
            }).catch((err) => {
                
            });
        //获取首页动漫番剧
        service.get(configAPI.getvideolist,{
                params: {
                    'category_id': 9,
                    'filter[status]': 2,
                    'page': 1,
                    'pagesize':5,
                }
            }).then((result) => {
                // console.log('这是请求的种类'+this.listid)
                this.logo = result.data.result.list
            }).catch((err) => {
                
            });
        //获取首页影视
        service.get(configAPI.getvideolist,{
                params: {
                    'category_id': 10,
                    'filter[status]': 2,
                    'page': 1,
                    'pagesize':5,
                }
            }).then((result) => {
                // console.log('这是请求的种类'+this.listid)
                this.other = result.data.result.list
            }).catch((err) => {
                
            });
    }
}
</script>
<style scoped>
.floor-title{
        width:100%;
        height:22.5%;
        display:flex;
    }
    .floor-title span{
        color:#FFFFFF;
        font-size: 0.78125vw;
        line-height:1.1;
        height:100%;
        overflow:hidden;
        text-overflow: ellipsis;
        /* display: -webkit-box; */  
        /* -webkit-box-orient: vertical; */
        -webkit-line-clamp: 2;
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
        width:100%;height:15.7%;display:flex
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
        justify-content:center;
    }
    .floorIcon{
        width:25%;height:100%;
    }
    .personal-Record-coll{
        background-image: url('../images/personal-Record-coll.png');
        background-size: 100% 100%
    }
    .personal-Record-coll_style{
        background-image: url('../images/personal-Record-coll-hover.png');
        background-size: 100% 100%
    }
    .personal-Record-coll:hover{
        background-image: url('../images/personal-Record-coll-hover.png');
        background-size: 100% 100%
    }
    .personal-Record-down{
        background-image: url('../images/personal-Record-down.png');
        background-size: 100% 100%
    }
    .personal-Record-down:hover{
        background-image: url('../images/personal-Record-down-hover.png');
        background-size: 100% 100%
    }
.container2{
    height: 92.6%;
    background-color: #F4F7FD;
    width: 100%;
    /* min-width: 1200px; */
    display: flex;
}
  .main{
    background-color: #F4F7FD;
    color: #333;
    width: 83.334%;
    /* min-width: 1000px; */
    height: 100%;
    /* float: left; */
    overflow:scroll;
    overflow-x:hidden;
  }
  .aSty{
cursor:pointer
}
    /* 轮播图组件样式 */
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
/* :end */
  /* 推广头 */
  .selectness_body{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    height: 12.604167vw;
    margin-left: 3.75%;
    margin-right: 2.5%;
  }
  .propaganda_body{
      height: 21.9270833vw;
      margin-left: 3.75%;
      margin-right: 2.5%;
      padding-bottom: 13px;
  }
  .selectness_head,.propaganda_head{
      margin: 2.08334vw 5.5% 0.9375vw 3.75%;
      font-size: 1.25vw;
  }
  .selectness_head img{
      width: 1.354167vw;
      height: 1.3021vw;
  }
  .propaganda_head img{
      width: 1.04166vw;
      /* height: 1.1458334vw; */
  }
  .nav_left{
    float: left;
    margin-right: 11px;
    height: 23px;
  }
  .nav_right{
    height: 23px;
  }
  /* selected_base 精选子组件样式 selected_base 精选子组件样式 selected_base 精选子组件样式 selected_base 精选子组件样式  */
  .news1{
    height: 100%;
    width: 18.8%;
    display: inline-block;
    margin-right: 0.666667%;
  }
 .news2{
    height: 100%;
    width: 18.8%;
    display: inline-block;
    margin-right: 0.666667%;  
  }
  .image_videolist{
    height: 100%;
    /* background:url(../img/banner3.jpg); */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
/* 视频时长 */
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
.video_length1{
/* margin: 49.64539% 2.133% 2.12765957% 74.4771%;
display: inline-block; */
position:absolute;
left: 75%;
bottom:3%;
width:23.409%;
height:12.05%;
background:rgba(0,0,0,1);
opacity:1;
border-radius:10px;
line-height: 1;
}
.video_length2{
/* margin: 113.487% 2.133% 2.128% 74.4771%;
display: inline-block; */
position:absolute;
left: 75%;
bottom:2%;
width:23.409%;
height:5.780347%;
background:rgba(0,0,0,1);
opacity:1;
border-radius:10px;
line-height: 1;
}
/* end */
.container{
    width: 100%;
    height: 100%;
}
.floor1{
    width: 100%;
    height: 100%;
    background:linear-gradient(rgba(0, 0, 0, 0.479),rgb(0, 0, 0));
    opacity: 0.99;
    position: absolute;
    padding: 10.28% 7.1% 7.8%  7.1%;
    top: 0%;
    box-sizing: border-box;

}
.floor2{
    width: 100%;
    height: 100%;
    background:linear-gradient(rgba(0, 0, 0, 0.479),rgb(0, 0, 0));
    opacity: 0.99;
    position: absolute;
    bottom: 0%;
    padding: 20% 10% 60%  10%;
    box-sizing: border-box;
}
/*----------------------------- v-for 循环输出不同div样式----------------------------- */
.preview{
    position:relative;
    width:100%;
    height:68.6%;
}
.propaganda{
    position:relative;
    width:100%;
    height:82.2%;
}
/*----------------------------- v-for 循环输出不同div样式----------------------------- */
/* .textare{
    height:31%;
} */
.text1 span,.text2 span,.text3 span,.text4 span{
    display: inline-block;
    line-height: 1em;
    overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.text1{
    background-color:rgba(255,255,255,1);
    height: 7%;
    line-height: 1;
    padding: 5% 0px 1px 10px;
}
.text2{
    background-color:rgba(255,255,255,1);
    height: 6%;
    line-height: 1;
    padding: 3.5% 0px 7% 10px;
}
.line1{
width:91%;
/* height:16px; */
font-size:0.78125vw;
font-family:FZLanTingHei-R-GBK;
font-weight:bold;
color:rgba(51,51,51,1);
}
.line2{
width:92%;
/* height:14px; */
font-size:0.73vw;
font-family:FZLanTingHei-R-GBK;
font-weight:400;
color:rgba(102,102,102,1);
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
    padding: 3.5% 0px 6.74% 10px;
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
.p{
    display: inline-block;
    height: 16px;
}
/* propaganda_base 宣传子组件样式 propaganda_base 宣传子组件样式 propaganda_base 宣传子组件样式 propaganda_base 宣传子组件样式*/
</style>