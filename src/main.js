// import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
// import axios from 'axios'

// CSS
import './assets/css/style.css'
import './assets/css/font/iconfont.css'

// 组件
import AppNav from './components/header'
Vue.component('app-nav', AppNav)
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// 过滤器
Vue.filter('getDate', function (value) {
    if (!value) return '';
    var Y, M, D;
    var date = new Date(value*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    return Y+M+D;
})
Vue.filter('getTime', function (value) {
    if (!value) return '';
    var Y, M, D, h, m, s;
    var date = new Date(value*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) +':';
    m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) +':';
    s = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
    return Y+M+D+h+m+s;
})

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

const ADD_COUNT = 'ADD_COUNT'; // 用常量代替事件类型，使得代码更清晰
const REMOVE_COUNT = 'REMOVE_COUNT';
//注册状态管理全局参数
var store = new Vuex.Store({
  state:{
    token:'',
    userID:'',
  },
  mutations: {
    //写法与getters相类似
    //组件想要对于vuex 中的数据进行的处理
    //组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
    //内部操作必须在此刻完成(同步)
    [ADD_COUNT] (state, token) { // 第一个参数为 state 用于变更状态 登录
      sessionStorage.setItem("token", token);
      state.token = token;
    },
    [REMOVE_COUNT] (state, token) { // 退出登录
      sessionStorage.removeItem("token", token);
      state.token = token;
    },
  }
});


router.beforeEach((to, from, next) => {
  store.state.token = sessionStorage.getItem('token');//获取本地存储的token
  // 本地有token时直接跳转index
  if(to.path == "/" && store.state.token !== null){
    next("/index")
  };
  // 路由跳转权限
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token !== null) {  // 通过vuex state获取当前的token是否存
      next();
    }
    else {
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

router.afterEach(route => {
  // iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
