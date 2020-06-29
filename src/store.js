import service from './API/request'
import configAPI from './API/configAPI'
//  导入vue
import Vue from 'vue'
//  导入vuex
import Vuex from 'vuex'
//  安装vuex
Vue.use(Vuex)
//  创建Vuex store
const store = new Vuex.Store({
//  用来存放全局存放的状态
  state: {
    // count: 0,
    // mobile: ''
    news: '0',
    Localvideo: ''
  },
  //  对state数据的包装，加工，拼接，过滤
  getters: {
    myCount (state) {
      return 'count is ' + state.count
    }
    // myMobile(state){
    //     var myMobile = this.state.mobile.splice(3,7,"*******"),
    // }
  },
  // 通过mutations更让state的状态，改变逻辑
  mutations: {
    // increment (state, n) {
    //   state.count += n
    // },
    // decrement (state, n) {
    //   state.count -= n
    // }
    reduction (state) {
      state.news--
      console.log('2.已读消息', state.news)
    },
    clear (state) {
      state.news = 0
      console.log('3.清空消息', state.news)
    }
  },
  // 单纯的复杂的业务逻辑，可以调用mutations的方法
  actions: {
    // async myIncrease (context, obj) {
    //   console.log(obj)
    //   context.commit('increment', 2)

    //   // 因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters

    //   // 从后台请求数据
    //   // axios.get{........}

    //   const products = [1, 2, 3, 4, 5]

    //   return products
    // },
    // myDecrease (context) {
    //   context.commit('decrement', 1)
    // }
    // 获取消息中心的未读数量
    getdata () {
      service.get(configAPI.getAllNews_url, {
      }).then(result => {
        console.log('获取消息1', this.state.news)
        result.data.result.list.forEach(element => {
          // console.log('', element)
          if (element.status === 2) {
            this.state.news++
            console.log('获取消息2', this.state.news)
          }
        })
      })
    }
  }
})

export default store
