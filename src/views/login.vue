<template>
    <div class="login">
        <img src="@/assets/login.png" alt width="100%" />
        <div class="body">
            <h1 class="word_font4 tleft">欢迎登录</h1>
          <div>
            <van-field
                readonly
                clickable
                label="服务器"
                :value="value"
                placeholder="选择服务器"
                @click="showPicker = true"
            />
            <van-popup v-model="showPicker" round position="bottom">
              <van-picker
                  show-toolbar
                  :columns="columns"
                  @cancel="showPicker = false"
                  @confirm="onConfirm"
              />
            </van-popup>
          </div>
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
            <div style='border-bottom: none;line-height: normal'>
              <van-checkbox shape="square" v-model="remchecked" style="font-size: 15px" @change="rember">记住账号</van-checkbox>
            </div>
        </div>
        <button type="button" class="word_font3" @click="Login">登录</button>
    </div>
</template>

<script>
import { Field, Toast } from "vant";
import crypto from 'crypto'
export default {
    name: "login",
    components: {
        [Field.name]: Field
    },
    data() {
        return {
            user_name: "",  //用户名
            password: '',   //密码
            columns: [],
            value: '',
            showPicker: false,
            remchecked:false   //记住账号
        };
    },
    created() {
      this.getHost();
      this.value = $core.getLocal('hostName') || '';
      this.$store.state.tab_bar_show= false   //底部标签栏是否显现
      if($core.getLocal('RemberAccount') == 'true'){
         this.remchecked = true;
         this.user_name = $core.getLocal('UserName');
         this.password = $core.getLocal('PassWord');
      }
    },
    methods: {
        Login() {   //登录
            if(!this.user_name || !this.password) {
                Toast('请将账号和密码输入完整');
                return;
            }
            if(!this.value){
                Toast('请选择服务器');
                return;
            }

          // 密码MD5格式
          const md5 = crypto.createHash('md5')
          md5.update(this.password)
          let md5pwd = md5.digest('hex')

          $core.request('m=user&a=login',(res)=>{
                if (res.status == 0) {
                    Toast.fail(res.info);
                } else {

                    $core.setLocal('PHPSESSID',res.session_id);
                    /** 将用户信息放入缓存 */
                    $core.setLocal('loginUserInfo',res);
                    this.$store.state.userInfo = res;
                    $core.setLocal('login',true)
                    $core.setLocal('UserName',this.user_name);
                    $core.setLocal('PassWord',this.password);

                    Toast.success('登录成功');

                    this.$router.replace({name: 'Index'});
                }
            },{name: this.user_name, password:md5pwd});
        },
       // 选择服务器
        onConfirm(value){
          this.value = value;
          this.showPicker = false;
          $core.setLocal('hostName',value);
        },
        // 获取服务器
        getHost(){
          let url = 'http://boss.ymz666.com/admin/ip_data/getIpList';
          $core.request(
              url,
              res => {
                let arr = []
                res.data.forEach(function (item, index) {
                  arr.push(item.domain_name)
                });
                this.columns = arr;
              }
          );
        },
        // 记住账号
        rember(value){
          $core.setLocal('RemberAccount',value);
          if(value){
            $core.setLocal('UserName',this.user_name);
            $core.setLocal('PassWord',this.password);
          }
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
          >div{
            .van-field__label{
              width: 4.2rem;
            }
          }
        }
        >div:last-child {
            margin-top: 36px;
        }
        >div >.van-field >.van-field__label{
          width: 4.2rem;
        }
    }

    .van-cell {
        font-size: 14px;
        div:first-child{
          width: 4.2rem;
        }
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
        background-color: #1989fa;

    }
}
.van-field__label{
  width:4.2rem
}

</style>