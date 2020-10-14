<template>
    <div id="app">
        <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
        </div>-->

        <!-- 头部 -->
        <NavBar v-if="$store.state.navbar_show"></NavBar>
        <!-- 中部内容 -->
        <transition :name="transtion_name">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" :key="$route.name" />
            </keep-alive>
        </transition>
        <transition :name="transtion_name">
            <router-view v-if="!$route.meta.keepAlive" />
        </transition>
        <!-- 底部 -->
        <!--  v-show="tab_bar_show" -->
        <van-tabbar route @change="changeTabbar">
            <van-tabbar-item replace to="/index">
                <span>CRM</span>
                <template #icon="props">
                    <img :src="props.active ? icon[0].active : icon[0].inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/mine">
                <span>个人中心</span>
                <template #icon="props">
                    <img :src="props.active ? icon[1].active : icon[1].inactive" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import NavBar from "./components/NavBar";
import { Tabbar, TabbarItem } from "vant";
export default {
    name: "app",
    components: {
        NavBar,
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem
    },
    watch: {
        $route(to, from) {
            // console.log(to, from);
            this.tab_bar_show = false;
            if (to.meta.tabbar_show === "false") {
                setTimeout(() => {
                    this.tab_bar_show = false;
                }, 0);
            } else {
                setTimeout(() => {
                    this.tab_bar_show = true;
                }, 0);
            }

            const toDepth = to.path.split("/").length;
            const fromDepth = from.path.split("/").length;
            this.transtion_name =
                toDepth < fromDepth ? "slide-right" : "slide-left";
            // console.log(this.transtion_name);
            
            // console.log(this.tab_bar_show);
        }
    },
    data() {
        return {
            icon: [
                //底部标签栏图标
                {
                    inactive: require("./assets/icon/one.png"),
                    active: require("./assets/icon/one_active.png")
                },
                {
                    inactive: require("./assets/icon/three.png"),
                    active: require("./assets/icon/three_active.png")
                }
            ],
            tab_bar_show: true, //状态栏是否显现
            transtion_name: "" //动画效果的名称
        };
    },
    created() {
        this.$router.replace({ name: "Login" });
    },
    methods: {
        changeTabbar(index) {
            //切换标签栏
            // console.log(index,'进入了');
            switch (index) {
                case 2:
                    this.$store.state.navbar_title = "个人中心";
                    break;
                default:
                    this.$store.state.navbar_title = "全部会员";
                    break;
            }
        }
    }
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    width: 100%;
    height: 100%;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.van-tabbar-item__text {
    color: #595959;
}
.van-tabbar-item--active .van-tabbar-item__text {
    color: #25a5ff;
}
</style>
