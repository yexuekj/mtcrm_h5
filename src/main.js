import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

import './assets/jquery-2.1.1'
import './assets/common.scss'
import './assets/core'

import {Toast,Picker,Popup,Checkbox} from 'vant';
Vue.use(Toast);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Checkbox);

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
        store.state.tab_bar_show=false;
        store.state.navbar_show=false;
    } else {
        store.state.navbar_show=true;
        store.state.tab_bar_show=true;
    }
    //
    // if ($core.getLocal('login')) {
    //     if ($core.getLocal('login')==='false' && to.name!=='Login') {
    //         next({name: 'Login', replace: true});
    //         location.reload();
    //     }
    //     if (String($core.getLocal('login'))==='true' && to.name==='Login') {
    //         next({path: '/index', replace: true});
    //         // history.pushState(null,null,'/index');
    //         // next({name: 'TwoCashier',replace: true});
    //     }
    // }
    next();
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


