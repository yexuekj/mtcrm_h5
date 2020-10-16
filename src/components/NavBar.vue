<template>
    <div class="nav_bar" v-if="$store.state.navbar_title !== '添加客户'">
        <van-nav-bar
            :title="$store.state.navbar_title"
            left-arrow
            @click-left="onClickLeft"
        />
    </div>
</template>

<script>
import { NavBar } from "vant";
export default {
    name: "nav_bar",
    components: {
        [NavBar.name]: NavBar
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        }
    }
};
</script>

<style lang="scss" scoped>
.nav_bar {
    .van-nav-bar {
        background: #25a5ff;
        ::v-deep .van-nav-bar__title {
            color: #fff;
        }
        ::v-deep .van-icon-arrow-left {
            color: #fff;
        }
    }
}
</style>