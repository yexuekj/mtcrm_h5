import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

import './assets/common.scss'
import './assets/core'

import {Toast} from 'vant';
Vue.use(Toast);

Vue.config.productionTip = false

// 解决点击相同地址报错问题
import Router from 'vue-router';
Vue.use(Router);
let origin_push=Router.prototype.push;
Router.prototype.push=function push(location) {
  return origin_push.call(this,location).catch(err=>err);
}

// 路由守卫
router.beforeEach(function(to,from,next) {
    // console.log(to,from);
    if (to.name==='Login') {
        store.state.navbar_show=false;
    } else {
        store.state.navbar_show=true;
    }
    next();
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


