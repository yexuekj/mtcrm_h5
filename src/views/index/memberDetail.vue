<template>
    <div class="member_detail">
        <van-tabs v-model="active" swipeable>
            <van-tab title="基本信息">内容 1</van-tab>
            <van-tab title="库存记录">内容 2</van-tab>
            <van-tab title="预约记录">内容 3</van-tab>
            <van-tab title="消费记录">内容 4</van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Tab, Tabs } from "vant";
export default {
    name: "member_detail",
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs
    },
    data() {
        return {
            active: 0,
        }
    },
    destroyed() {
        this.$store.state.tab_bar_show=true;
    }
};
</script>

<style lang="scss" scoped>
</style>