import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      navbar_title: '', //导航栏命名
      navbar_show: true,  //导航栏是否显现

      tab_bar_show: true,   //底部标签栏是否显现
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
