<template>
    <div class="index common_page">
        <div>首页</div>
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {

        };
    },
    created() {
        this.$store.state.navbar_title = "CRM"; //导航栏命名
    },
    methods: {
        getMemberType() {
            //获取会员类型
            $core.request("api_staff/user/getUserType", res => {
                if (res.code) {
                    this.member_type = res.data;
                }
            });
        },
        getMemberList() {
            //获取会员列表
            let param = {
                keywords: this.keywords,
                user_type_id: this.user_type_id,
                is_my_serve: this.is_my_serve,
                page: 1,
                page_size: 10
            };
            $core.request(
                "api_staff/user/userList",
                res => {
                    if (res.code) {
                        this.member_list = res.data.data;
                    }
                },
                param
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.index {
    .head {
        background-color: #fc7573;
        color: #fff;
        padding: 0 6px 0 10px;
        .van-search {
            width: 80%;
            display: inline-block;
            padding: 10px 0;
        }
        > div {
            display: inline-block;
            padding: 6px;
            > span {
                margin-right: 6px;
            }
        }
        .van-icon-filter-o {
            vertical-align: text-top;
        }
    }

    .tables {
        padding: 20px 18px;
    }

    .van-popup {
        // transform: translate3d(0,-0%,0);
        transform: none;
        right: 15px;
        width: 258px;
        top: 110px;
    }

    ::v-deep .van-overlay {
        background: rgba(34, 34, 34, 0.1);
    }

    .select_popup {
        padding: 16px 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 9px 0px rgba(236, 236, 236, 1);
        p {
            font-size: 0;
        }
        p:first-child {
            margin-bottom: 12px;
        }
        span {
            width: 65px;
            height: 22px;
            font-size: 10px;
            text-align: center;
            color: #A7A7A7;
            line-height: 22px;
            border-radius: 14px;
            display: inline-block;
            margin: 0 10px 10px 0;
            border: 1px solid rgba(191, 191, 191, 1);
        }
        span:nth-child(3n) {
            margin-right: 0;
        }

        span.active {
            border-color: #FC7573;
            color: #FC7573;
        }

        .content {
            div:first-child {
                margin-bottom: 16px;
            }
        }

        button {
            width: 100%;
            height: 30px;
            border: none;
            color: #fff;
            border-radius: 14px;
            background-color: #FC7573;
        }
    }
}
</style>