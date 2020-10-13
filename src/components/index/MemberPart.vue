<template>
    <div class="member_part" @click="skipToDetail">
        <div class="word_font3 cx-fex cx-fex-itemsc">
            <div class="cx-fex cx-fex-itemsc">
                <span>{{list.user_info.user_name}}</span>
                <span class="member_type">{{list.user_type.type_name}}</span>
            </div>
            <span>{{list.user_info.user_phone}}</span>
        </div>
        <p class="word_font2 cx-fex cx-fex-itemsc second">
            <span>产品余额：{{list.product_balance}}</span>
            <span>服务余额：{{list.service_balance}}</span>
        </p>
        <p class="word_font1 cx-fex cx-fex-itemsc">
            <span>最近消费时间</span>
            <span>{{list.order_lately_time}}</span>
        </p>
    </div>
</template>

<script>
export default {
    name: "member_part",
    props: {
        list: {
            type: Object,
            default: ()=>{
                return {};
            }
        }
    },
    methods: {
        skipToDetail() {
            this.$router.push({name: 'MemberDetail'});
            this.$store.state.tab_bar_show=false;   //底部标签栏不显现
        }
    }
};
</script>

<style lang="scss" scoped>
.member_part {
    padding: 0 18px;
    border-radius: 10px;
    background-color: #fff;

    .member_type {
        padding: 2px 12px;
        margin-left: 10px;
        border-radius: 10px;
        color: #FC7573;
        border: 1px solid #FC7573;
        font-size: 10px;
    }

    >div, >p {
        padding-top: 16px;
    }
    .second {
        padding-bottom: 16px;
        border-bottom: 1px solid #F4F4F4;
    }
    >p:last-child {
        padding: 14px 0;
    }
}
</style>