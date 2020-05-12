 <template>
    <div class="test_two_box">
        <video
          id="myVideo"
          class="video-js vjs-big-play-centered"
          >   
        </video>
        <!-- <router-link to="/upvideo">
          <button>上传视频</button>
        </router-link>  -->
    </div>
    </template>

    <script>
    import 'video.js/dist/video-js.css'

    import videojs from 'video.js'

    import 'videojs-contrib-hls'
    /* eslint-disable */
    export default {
    name: "TestTwo",
    data() {
        return {};
    },
    mounted() { 
        this.initVideo();
    },
    methods: {
        initVideo() {
        //初始化视频方法
        let myPlayer = this.$video(myVideo, {
            sources: [{
              type: 'video/mp4',
              // src: '//vjs.zencdn.net/v/oceans.mp4',
              src: '../video/93772515-1-6.mp4',
            },
            ],
            //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            controls: true,
            //自动播放属性,muted:静音播放
            // autoplay: "false",
            //建议浏览器是否应在<video>加载元素后立即开始加载视频数据。
            preload: "auto",
            //设置视频播放器的显示宽度（以像素为单位）
            width: "100%",
            //设置视频播放器的显示高度（以像素为单位）
            height: "100%",
            //  视频缩略图
            poster:'https://img04.sogoucdn.com/app/a/100520024/3f4fe60c421e061e4d1064568b85b4a6',
            // 自动循环
            // loop: "true",
            //流体大小，不明白
            // aspectRatio:'16:9' 
            //倍速,最高为16
            playbackRates: [0.5, 1, 1.5, 2,],

            controlBar: {
              //禁用全屏
              // fullscreenToggle: false
               volumePanel: {
                  inline: false
                },
                //隐藏视频播放进度条
                // progressControl: false 
                
                currentTimeDisplay: true, // 当前时间

                timeDivider: true, // 时间分割线

                durationDisplay: true, // 总时间

            
                //控制行的各种按钮的排列顺序
                //  children: [
                //     {
                //         name: 'playToggle'
                //     },
                    
                //     {
                //         name: 'currentTimeDisplay'
                //     },
                //     {
                //         name: 'timeDivider',
                //     },
                //     {
                //         name: 'durationDisplay'
                //     },
                //     {
                //         name: 'progressControl'
                //     },
                //     {
                //         name:'remainingTimeDisplay'
                //     },
                //     {
                //         name: 'volumePanel',
                //         inline: false,
                //     },
                //     {
                //         name: 'fullscreenToggle'
                //     },
                //   ]
            }
            
        }
        );
        },

    }
    };
    </script>
    <style>
    .test_two_box{
      width: 100%;
      height: 100%
    }
    /* 把暂停在视频播放中显示 */
    .vjs-paused .vjs-big-play-button,
    .vjs-paused.vjs-has-started .vjs-big-play-button {
        display: block;
    } 
    .video-js{
      width: 100%!important;
      height: 100%;
    }
    .video-js .vjs-time-control{display:block;}
    .video-js .vjs-remaining-time{display: none;}
    .vjs-control-bar{
      background-color: #000000!important;
      opacity: 0.8;
    }
    video:focus{
      outline: none
    }
    button:focus{
      outline: none
    }
    .vjs-volume-level{
      background-color:#37BAA0!important;
    }
    </style>
    