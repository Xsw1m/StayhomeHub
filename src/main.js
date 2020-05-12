//入口文件
// console.log('ok')
import Vue from 'vue'

// 导入路由的包
import VueRouter from 'vue-router'

//导入echarts
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

// import echartsGL from 'echarts-gl' // 引入echarts
// Vue.prototype.$echartsGL = echartsGL // 引入组件（将echarts注册为全局）

//导入icon包
import './icon/iconfont.css'

//导入element的主题样式
import '../theme/index.css'

//导入vuex兼容ie的插件
import 'babel-polyfill'

// "build": "./node_modules/.bin/webpack --config webpack.config.js"

// import '../element-variables.scss' // global css

// 引入element-ui
import {
    Button,
    ButtonGroup,
    Carousel, CarouselItem, Icon,
    Select,
    Input,
    Row,
    Col,
    Dropdown,  
    DropdownMenu,
    DropdownItem,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    TableColumn,
    Dialog,
    Form,
    FormItem,
    Option,
    DatePicker,
    TimeSelect,
    TimePicker,
    Switch,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Upload, 
    MessageBox,
    Message,
    Pagination,
    link,
    Steps,
    Step,
    Tooltip,
    popover,
    Progress,
    Cascader,
    Loading,
    Badge  } from 'element-ui';

import { Menu,Submenu, MenuItem,MenuItemGroup } from 'element-ui'

// 导入 app 组件
import app from './App.vue'

//导入自己的router.js的路由模块
import router from './router.js'

//导入axios
import axios from 'axios'

// //导入vuex
// import Vuex from 'vuex'
// //安装vuex
// Vue.use(Vuex)
//导入store

import store from './store.js'
//挂载到vue上
import VideoPlayer from 'vue-video-player'

//复制粘贴剪切板
import VueClipboard from 'vue-clipboard2'

//路由重复点击不报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(error => error)
}
// 启用vuerouter
Vue.use(VueRouter)
// 挂载
// Vue.component(Button.name,Button);
// Vue.component(Select.name,Select);
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Icon)
Vue.use(Select)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Switch)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Upload)
Vue.use(Pagination)
Vue.use(link)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Tooltip)
Vue.use(popover)
Vue.use(Progress)
Vue.use(Cascader)
Vue.use(Loading.directive)
Vue.use(Badge)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Menu)

Vue.use(Submenu)

Vue.use(MenuItem)

Vue.use(MenuItemGroup)
Vue.prototype.$axios = axios

//导入 vue-video-player
// 第一个是videoJs的样式，后一个是vue-video-player的样式，因为考虑到我其他业务组件可能也会用到视频播放，所以就放在了main.js内
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
require('../src/CSS/myVideoCss.css')
Vue.use(VideoPlayer);
Vue.use(VueClipboard)
// 导入video.js
// import Video from 'video.js'
// import 'video.js/dist/video-js.css'

// Vue.prototype.$video = Video

var vm = new Vue({
  el: '#app',
  data: {},
  methods: {},
  render: c => c(app),
  router, // 挂载路由到对象的vm实例上
  store
})
