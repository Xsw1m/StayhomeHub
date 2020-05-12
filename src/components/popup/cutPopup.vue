<template>
    <el-dialog
        :visible.sync="centerDialogVisible"
        :close-on-click-modal='false'
        width="1300px"
        center>
        <!-- <span>需要注意的是内容是默认不居中的</span> -->
        <div style="width:1250px;display:flex">
        <div style="width:700px;height:420px;">
            <div style="width:100%;height:30px;display:flex;align-items: center;justify-content: center;">
                <span>从视频种选取静态图片</span>
            </div>
            <div style="width:100%;height:420px;display:flex;align-items: center;justify-content: center;">
                <video id="video" controls="controls"  crossorigin="anonymous" :src= "this.$store.state.Localvideo" style="max-width:100%;max-height:100%"></video>
            </div>
        </div>
        <div style="width:100px;height:420px;display:flex;align-items: center;justify-content: center;">
            <img src="../../images/rightTo.png" alt="" class="aSty" style="width:80%;height:80px" @click="ok()">
        </div>
        <div style="width:450px;">
            <div class="mianDiv aSty">
                <div class="btnDiv" @click="changeScale(-1)">
                    <span>减小</span>
                </div>
                <div class="btnDiv aSty" @click="changeScale(1)">
                    <span>放大</span>
                </div>
                <div class="btnDiv aSty" @click="rotateLeft">
                    <span>左旋转</span>
                </div>
                <div class="btnDiv aSty" @click="rotateRight">
                    <span>右旋转</span>
                </div>
            </div>
            <br>
            <!-- 
                img	裁剪图片的地址	空	url 地址 || base64 || blob
                outputSize	裁剪生成图片的质量 
                outputType	裁剪生成图片的格式	jpg (jpg 需要传入jpeg)	jpeg || png || webp 
                info	裁剪框的大小信息	true	true || false 
                full	是否输出原图比例的截图	false	true | false 
                canMove	上传图片是否可以移动	true	true | false
                canMoveBox	截图框能否拖动	true	true | false 
                original	上传图片按照原始比例渲染	false	true | false
                autoCrop	是否默认生成截图框	false	true || false 
                autoCropWidth	默认生成截图框宽度	容器的80%	0~max
                autoCropHeight	默认生成截图框高度	容器的80%	0~max   
                fixedBox	固定截图框大小 不允许改变	false	true | false    
            -->
            <div class="cutDiv" style="width:100%;height:300px;">
                <vueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.size" 
                :outputType="option.outputType"
                :info="true"
                :full="option.full"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"
                :autoCrop="option.autoCrop"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :fixedBox="option.fixedBox"
                @realTime="realTime"
                @imgLoad="imgLoad"
                ></vueCropper>
            </div>
        </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false,pause()">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false,sendPh(),pause()">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import {VueCropper} from 'vue-cropper'
export default {
    components: { 
      VueCropper 
    }, 
    data() {
      return {
        centerDialogVisible: false,       //默认false
        option: {
          img: '',
          outputSize:1, //剪切后的图片质量（0.1-1）
          full: false,//输出原图比例截图 props名full
          outputType: 'jpg',
          canMove: true, 
          original: false, 
          canMoveBox: true, 
          autoCrop: true, 
          autoCropWidth: 224, 
          autoCropHeight: 276, 
          fixedBox: true 
        }, 
      };
    },
    props: ["photo"],
    methods:{
        onDialog(){
            this.centerDialogVisible = true
        },
        // 实时预览函数 
        realTime(data) { 
            console.log('realTime')
            // console.log(data)
            // this.previews = data 
        }, 
        imgLoad (msg) { 
            console.log('imgLoad')
            console.log(msg) 
        },
        sendPh(){
            this.$refs.cropper.getCropBlob((data) => {
                // do something
                console.log('这里是bolo代码')
                console.log(data)  
                // _this.finish = data

                // this.downImg = window.URL.createObjectURL(data)
                // console.log(this.downImg)
                // var aLink = document.createElement('a') 
                // aLink.download = '' 
                // aLink.href = window.URL.createObjectURL(data) 
                // aLink.click() 
                // console.log(aLink)
                this.$emit('func',data)
            })
            console.log('发送')
            // console.log(this.finish)
            // this.$emit('func',this.finish)
        },
        pause(){
            let video = document.getElementById('video');
            video.pause();
        },
        //放大/缩小
        changeScale(num) { 
            console.log('changeScale')
            num = num || 1; 
            this.$refs.cropper.changeScale(num); 
        }, 
        //坐旋转
        rotateLeft() { 
            console.log('rotateLeft')
            this.$refs.cropper.rotateLeft(); 
        }, 
        //右旋转
        rotateRight() { 
            console.log('rotateRight')
            this.$refs.cropper.rotateRight(); 
        }, 
        ok(){
            console.log('ok')
            var canvas = document.createElement('canvas')
            // var img = document.getElementById('img')
            let img = document.createElement(img)
            const video = document.getElementById('video')
            console.log(video)
            video.setAttribute('crossOrigin', 'anonymous')
            console.log(canvas)
            canvas.width = video.clientWidth
            console.log(video.clientWidth)
            canvas.height = video.clientHeight
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
            console.log(canvas)
            var dataURL = canvas.toDataURL('image/png')
            img.setAttribute('src', dataURL)
            console.log(dataURL)
            console.log(img)

            var arr = dataURL.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            while(n--){
            u8arr[n] = bstr.charCodeAt(n);
            }
            // 转为blob
            let file = new File([u8arr], 'filename', {type:mime})
            console.log(new File([u8arr], 'filename', {type:mime}))
            this.photo = file
        }
    },
    watch : {
        photo(newval, oldval) {
            console.log('我在这')
            console.log(newval)

            var file = newval 
            console.log(file);
            // _this.fileName = file.name;
            var reader = new FileReader(); 
            reader.onload =(e) => { 
                console.log(e.target.result)
                let data; 
                if (typeof e.target.result === 'object') { 
                    // 把Array Buffer转化为blob 如果是base64不需要 
                    data = window.URL.createObjectURL(new Blob([e.target.result])) 
                } 
                else { 
                    data = e.target.result 
                }
                // if (num === 1) { 
                    this.option.img = data 
                // } else if (num === 2) { 
                //     _this.example2.img = data 
                // } 
            } 
            // 转化为base64 
            // reader.readAsDataURL(file) 
            // 转化为blob 
            reader.readAsArrayBuffer(file);

        }
    },
    created(){
        console.log('这个是本地视频')
        console.log(this.$store.state.Localvideo)
    }
}
</script>
<style scoped>
    .mianDiv{
        display: flex;
        justify-content: space-around;
    }
    .btnDiv{
        width:20%;
        height:30px;
        background-color: #37BAA0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px
    }
    .btnDiv span{
        display: flex;
        font-size: 10px;
        line-height: 1.5;
        color: white;
    }
    .aSty{
        cursor:pointer
    }
</style>