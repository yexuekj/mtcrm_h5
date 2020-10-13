import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
    {
        path: '/login', //登录页
        name: 'Login',
        component: ()=>import('../views/login.vue')
    },
    {
        path: '/index', //全部会员主页
        name: 'Index',
        component: ()=>import('../views/index/index.vue'),
        meta: {
            keepAlive: true,    //存进缓存中
        }
    },
    {
        path: '/index/memberDetail',  //会员详情
        name: 'MemberDetail',
        component: ()=>import('../views/index/memberDetail.vue'),
        meta: {
            tabbar_show: 'false'  //底部标签栏是否显现
        }
    },
    {
        path: '/service',   //服务中心主页
        name: 'Service',
        component: ()=>import('../views/two/index.vue')
    },
    {
        path: '/mine',  //个人中心主页
        name: "Mine",
        component: ()=>import('../views/three/index.vue')
    }
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
]

const router = new VueRouter({
  routes
})

export default router
