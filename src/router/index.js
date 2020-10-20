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
        path: '/index', //crm页面
        name: 'Index',
        component: ()=>import('../views/index/index.vue'),
    },
    {
        path: '/mine',  //个人中心主页
        name: "Mine",
        component: ()=>import('../views/three/index.vue')
    },
    {
        path: '/customer',  //客户列表
        name: "customer_list",
        component: ()=>import('../views/crm/customerList.vue')
    },
      {
          path: '/customeradd',  //添加客户
          name: "customer_add",
          component: ()=>import('../views/crm/customerAdd.vue')
      },
      {
          path: '/customerdetail',  //客户详情
          name: "customer_detail",
          component: ()=>import('../views/crm/customerDetail.vue')
      }
]

const router = new VueRouter({
  routes
})

export default router
