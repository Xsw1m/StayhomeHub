<template>
    <div class="hello">
        <h1>S3 Uploader Test</h1>

        <div v-if="!image">
            <h2>Select an image</h2>
            <input type="file" @change="onFileChange">
        </div>
        <div v-else>
            <img :src="image" />
            <button v-if="!uploadURL" @click="removeImage">Remove image</button>
            <button v-if="!uploadURL" @click="uploadImage">Upload image</button>
        </div>
        <h2 v-if="uploadURL">Success! Image uploaded to:</h2>
        <a :href="uploadURL">{{ uploadURL }}</a>
    </div>
</template>

<script>
    import Qs from 'qs'
    import axios from 'axios'
    const MAX_IMAGE_SIZE = 10*1024*1024*1024

    export default {
        name: 's3uploader',
        data () {
            return {
                image: '',
                uploadURL: '',
                uploadType:'',
            }
        },
        methods: {
            onFileChange (e) {
                let files = e.target.files || e.dataTransfer.files
                // 获取图片信息，但是e.dataTransfer.files恒为空
                // console.log(e.target.files[0].duration)
                // 获取上传信息的后缀
                this.uploadType = e.target.files[0].name.split('.')[1]
                // console.log(this.uploadType)
                // console.log(e.target.result)
                //获取录音时长
                // var url = URL.createObjectURL(e.target.files[0]);
                //经测试，发现audio也可获取视频的时长
                // var audioElement = new Audio(url);
                // console.log(audioElement)
                // var duration;
                // audioElement.addEventListener("loadedmetadata", function (_event) {
                //     duration = audioElement.duration;
                //     console.log(duration);
                // });

                if (!files.length) return
                // console.log(files[0])
                this.createImage(files[0])
            },
            createImage (file) {
                // var image = new Image()
                let reader = new FileReader()

                reader.onload = (e) => {
                    console.log('length: ', e.target.result.includes('data:image/jpeg'))
                    // if (!e.target.result.includes('data:video/mp4')) {
                    if (!e.target.result.includes('data:image/jpeg')) {
                        return alert('Wrong file type - JPG only.')
                    }
                    if (e.target.result.length > MAX_IMAGE_SIZE) {
                        return alert('视频最大不超过10G')
                    }

                    this.image = e.target.result
                    console.log(this.image)
                }
                reader.readAsDataURL(file)
            },
            removeImage: function (e) {
                console.log('Remove clicked')
                this.image = ''
            },
            uploadImage: async function (e) {
                console.log('Upload clicked')

                //获取当前时间
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hour = date.getHours();
                var minu = date.getMinutes();
                var sec = date.getSeconds();
                if (month < 10) month = "0" + month;
                if (day < 10) day = "0" + day;
                if (hour < 10) hour = "0" + hour;
                if (minu < 10) minu = "0" + minu;
                if (sec < 10) sec = "0" + sec;
                // var nowDate = year + "-" + month + "-" + day;
                //添加后缀名
                let uploadType = '.' + this.uploadType
                let fileName =  year + month + day + hour + minu + sec +  Math.round(Math.random()*10) +  Math.round(Math.random()*10) +  Math.round(Math.random()*10) + uploadType
                console.log(fileName)

                // Get the presigned URL
                let data = Qs.stringify({
                        fileName:fileName,
                        type:1,
                    })
                console.log(data)


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


                // atob() 方法用于解码使用 base-64 编码的字符串。
                let binary = atob(this.image.split(',')[1])
                let array = []
                for (var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i))
                }
                // let blobData = new Blob([new Uint8Array(array)], {type: 'image/jpeg'})
                let blobData = new Blob([new Uint8Array(array)],{type: 'image/jpeg'})
                console.log('Uploading to: ', uploadInfo.uploadURL)
                // console.log(blobData)

                 const result = await fetch(uploadInfo.uploadURL, {
                    method: 'PUT',
                    body: blobData
                })


                console.log('Result: ', result)

                // Final URL for the user doesn't need the query string params
                console.log(result.url.split('?')[0])
                this.uploadURL = result.url.split('?')[0]
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    #app {
        text-align: center;
    }
    img {
        width: 30%;
        margin: auto;
        display: block;
        margin-bottom: 10px;
    }
    button {
    }
</style>
