<template>
      <div class="item" style="width:100%;height:100%">
        <div class="player aSty" style="width:100%;height:100%" @contextmenu.prevent>
          <video-player class="vjs-custom-skin"
                        ref="videoPlayer"
                        :options="playerOptions"
                        :playsinline="true"
                        @play="onPlayerPlay($event)"
                        @pause="onPlayerPause($event)"
                        @ended="onPlayerEnded($event)"
                        @loadeddata="onPlayerLoadeddata($event)"
                        @waiting="onPlayerWaiting($event)"
                        @playing="onPlayerPlaying($event)"
                        @timeupdate="onPlayerTimeupdate($event)"
                        @canplay="onPlayerCanplay($event)"
                        @canplaythrough="onPlayerCanplaythrough($event)"
                        @ready="playerReadied"
                        @statechanged="playerStateChanged($event)"
                        style="width:100%;height:100%">
          </video-player>
          <!-- <button @click="shuchu()">啊啊啊啊啊</button> -->
          <!-- <img src="../images/loading.gif" alt="" style="width:100%;height:100%"> -->
        </div>
      </div>
</template>

<script>
import { setTimeout, setInterval, clearInterval } from 'timers';
import service from '../API/request';
import configAPI from '../API/configAPI';
import Watermark from '../watermark'

  
  export default {
    data() {
      return {
          VideoCurrentTime:0,
          playingTime:0,
          allTime:0,
          videoId:'',
          myInterval:'',
          state:'0',   //0为停 1为放
          // videojs options
          playerOptions: {
              // height: '100%',
              // width:'100%',
              // 自动播放
              autoplay: false,
              //静音
              muted: false,
              language: 'en',
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              // aspectRatio:'16:9',
              // fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
              sources: {
                type: "video/mp4",
                // mp4
                // src: "http://vjs.zencdn.net/v/oceans.mp4",
                // src:'https://img.ssyer.com/video/1527562615855.mp4'
                src:'https://wangzhanmulu.s3.cn-northwest-1.amazonaws.com.cn/video/202909/103544376.mp4'
                // https://img.ssyer.com/video/1527561709741.mp4
                // https://img.ssyer.com/video/1527561706001.mp4
                // webm
                // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
              },
              // poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
              poster:'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg'
              // http://ssyerv1.oss-cn-hangzhou.aliyuncs.com/picture/cf0b29170faf4deebbfd7339b81f97ae.jpg
        }
      }
    },
    props:['parentmsg'],
    mounted(){
      this.myInterval = setInterval(() => {
        if(this.VideoCurrentTime == 0){
          return
        }else{
            //判断是否是暂停的状态或者结束的状态
            if(this.playingTime == this.player.currentTime()){
                this.VideoCurrentTime = 0;
            }else{
              //如果小于播放时间和总时间小于3的话，就传递全部的时间。
              if(this.allTime - this.playingTime < 3){
                // console.log(this.allTime)
                service.get(configAPI.upVideoprogress_url,{
                  params:{
                    id:this.videoId,
                    schedule:this.allTime
                  }
                }).then(result=>{
                  console.log(result)
                })
                this.VideoCurrentTime = 0;
                // console.log(this.allTime)
                // console.log(this.playingTime)
                this.playingTime = 0
              }
              else{
                //传递进度
                console.log(this.player.currentTime())
                service.get(configAPI.upVideoprogress_url,{
                  params:{
                    id:this.videoId,
                    schedule:this.player.currentTime()
                  }
                }).then(result=>{
                  console.log(result)
                })
                this.playingTime = this.player.currentTime()

              }
            }
        }
        }, 3000);

    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    watch:{
      parentmsg:{
        handler(newName,oldName){
            console.log('ok')
            console.log(this.parentmsg.url)
            // this.parentmsg.poster
            // this.shuchu()
            console.log(this.parentmsg)

            this.playerOptions.sources = this.parentmsg.url
            this.playerOptions.poster = this.parentmsg.cover
            this.videoId = this.parentmsg.id
            // this.sources.src = this.parentmsg.videoSrc
        },
        deep:true
      },

    },
    methods: {
      // shuchu(){
      //   console.log(this.parentmsg + '哈哈')
      //     console.log(this.playerOptions.sources)
      // },
      // listen event
      onPlayerPlay(player) {
        this.VideoCurrentTime = 1;
        this.allTime = player.duration()
        // 是时间的总长度
        // console.log('player play!', player.duration())
        this.state = 1
      },
      onPlayerPause(player) {
        // this.VideoCurrentTime = 0;
        // console.log('喜喜')
        this.state = 0
      },
      onPlayerEnded(player) {
        this.VideoCurrentTime = 0
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
        //  this.VideoCurrentTime = 0;
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
          // console.log('player Timeupdate!', this.VideoCurrentTime)
        // this.VideoCurrentTime = 1;
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        // console.log('example player 1 readied', player)
        // player.currentTime(10)
        // console.log('example 01: the player is readied', player)
      },
    },
    // mounted(){
    //   console.log(this.parentmsg)
    // }
    created(){
      // 添加自动空格暂停和播放
      document.body.onkeydown =  (event) => {
          var e = window.event || event
          if(e.keyCode === 32){
            if(e.preventDefault){
                e.preventDefault();
                const player = this.$refs.videoPlayer.player
                if(this.state == 0){
                  this.state = this.state + 1
                  player.play()
                }else{
                  this.state--
                  player.pause()
            }
            }else{
              window.event.returnValue = false;
              console.log('我没用了')
              const player = this.$refs.videoPlayer.player
              console.log(player)
              player.pause()
            } 
          }
      }
    },
    mounted: function () {
        let watermark = localStorage.getItem("real_name")
        // Watermark.set('History:' + watermark)
    },
    destroyed(){
      clearInterval(this.myInterval)
    }
  }
</script>
<style scoped>
    
</style>
<style >
    .player:focus{
      outline: none
    }
    .videoDiv:focus{
      outline: none
    }
    .vjs-poster:focus{
      outline: none
    }
    .vjs-custom-skin > .video-js{
        height: 100%!important
    }
    video:focus{
        outline: none!important
    }
    button:focus{
        outline: none!important
    }
    .vjs-control-bar{
      background-color: #000000!important;
      opacity: 0.8;
    }
    /* .vjs-modal-dialog-content{
      display: none
    } */
    .aSty {
      cursor:pointer      
    }
</style>