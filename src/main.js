import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import axios from 'axios'

import './assets/jquery-2.1.1'
import './assets/common.scss'
import './assets/core'

import {Toast,Picker,Popup,Checkbox,Search,Form,Field,Button,Cell,Dialog,CellGroup,DropdownMenu, DropdownItem,Pagination,PullRefresh,Loading,List,NavBar } from 'vant';
Vue.use(Toast);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Cell);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Checkbox);
Vue.use(Search);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(CellGroup);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Pagination);
Vue.use(PullRefresh);
Vue.use(Loading);
Vue.use(List);
Vue.use(NavBar);



Vue.config.productionTip = false
axios.defaults.withCredentials=true;//让ajax携带cookie

Vue.prototype.$axios = axios;

// 解决点击相同地址报错问题
import Router from 'vue-router';
Vue.use(Router);
let origin_push=Router.prototype.push;
Router.prototype.push=function push(location) {
  return origin_push.call(this,location).catch(err=>err);
}

// 路由守卫
router.beforeEach(function(to,from,next) {
    if (to.name==='Login') {
        store.state.tab_bar_show=false;
        store.state.navbar_show=false;
    } else {
        store.state.navbar_show=true;
        store.state.tab_bar_show=true;
    }
    if ($core.getLocal('login')) {
        if ($core.getLocal('login')==='false' && to.name!=='Login') {
            next({name: 'Login', replace: true});
            // location.reload();
        }
        if (String($core.getLocal('login'))==='true' && to.name==='Login') {
            next({name: 'Index', replace: true});
            // history.pushState(null,null,'/index');
            // next({name: 'TwoCashier',replace: true});
        }
    }
    next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


