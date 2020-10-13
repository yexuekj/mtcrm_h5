<template>
    <div class="login">
        <img src="@/assets/login.png" alt width="100%" />
        <div class="body">
            <h1 class="word_font4 tleft">欢迎登录</h1>
            <div>
                <van-field v-model="user_name" placeholder="请输入账号" clearable>
                    <template #left-icon>
                        <img src="@/assets/user.png" alt />
                    </template>
                </van-field>
            </div>
            <div>
                <van-field v-model="password" placeholder="请输入密码" type="password" clearable>
                    <template #left-icon>
                        <img src="@/assets/password.png" alt />
                    </template>
                </van-field>
            </div>
        </div>
        <button type="button" class="word_font3" @click="Login">登录</button>
    </div>
</template>

<script>
import { Field, Toast } from "vant";
export default {
    name: "login",
    components: {
        [Field.name]: Field
    },
    data() {
        return {
            user_name: "",  //用户名
            password: '',   //密码
        };
    },
    created() {
      this.$store.state.tab_bar_show= false   //底部标签栏是否显现
        /*if ($core.getLocal('token')) {
            this.$router.replace({name: 'Index'});
        }*/
    },
    methods: {
        Login() {   //登录
            if(!this.user_name || !this.password) {
                Toast('请将账号和密码输入完整');
                return;
            }
            $core.request('index.php?m=user&a=login',(res)=>{
                if (!res.code) {
                    Toast.fail(res.msg);
                } else {
                    // $core.setLocal('token',res.data.token_code);
                    Toast.success('登录成功');
                    //this.$router.replace({name: 'Index'});
                }
            },{name: this.user_name, password: this.password});
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    h1 {
        color: #777;
        font-weight: 500;
        margin-bottom: 36px;
    }
    .body {
        padding: 50px 40px 0;
        >div {
            border-bottom: 1px solid #ECECEC;
        }
        >div:last-child {
            margin-top: 36px;
        }
    }

    .van-cell {
        font-size: 16px;
    }
    ::v-deep .van-field__left-icon {
        margin: 2px 12px 0 0;
    }

    button {
        width: calc(100% - 80px);
        height: 40px;
        line-height: 40px;
        margin: 50px auto 0;
        color: #fff;
        border: none;
        border-radius: 8px;
        background-color: #FC7573;

    }
}
</style>