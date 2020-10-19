<template>
    <div class="home_three_index common_page">
      <van-form>
        <van-field
            v-model="full_name"
            name="姓名"
            label="姓名"
            placeholder="姓名"
            readonly
        />
        <van-field
            v-model="name"
            name="登录账号"
            label="登录账号"
            placeholder="登录账号"
            readonly
        />
      </van-form>
      <van-form @submit="editEcpinfo" style="margin-top: 10px">
        <van-field
            v-model="ecpid"
            name="ECPID"
            label="ECPID"
            placeholder="ECPID"
            :rules="[{ required: true, message: '请填写ECPID' }]"
        />
        <van-field
            v-model="account_sid"
            name="AccountSid"
            label="AccountSid"
            placeholder="AccountSid"
            :rules="[{ required: true, message: '请填写AccountSid' }]"
        />
        <van-field
            v-model="appid"
            name="APPID"
            label="APPID"
            placeholder="APPID"
            :rules="[{ required: true, message: '请填写APPID' }]"
        />
        <van-field
            v-model="token"
            name="Token"
            label="Token"
            placeholder="Token"
            :rules="[{ required: true, message: '请填写Token' }]"
        />
        <van-cell is-link @click="showPopup" style="margin-top: 10px">修改密码</van-cell>
        <van-dialog v-model="show" title="修改密码" show-cancel-button style="color: #5A5A5A" @confirm="editPassword">
          <span style="display:block;width: 90%;margin: 10px auto;color: #5A5A5A">
            <p style="float: left;line-height: 30px">旧密码</p>
            <input type="password" style="border: 1px solid #c8c9cc;height: 30px;border-radius: 5px" v-model="old_password"/>
          </span>
          <span style="display:block;width: 90%;margin: 10px auto;color: #5A5A5A">
            <p style="float: left;line-height: 30px">新密码</p>
            <input type="password" style="border: 1px solid #c8c9cc;height: 30px;border-radius: 5px" v-model="new_password" />
          </span>
        </van-dialog>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" color="#25a5ff" style="letter-spacing:15px">保存</van-button>
        </div>
      </van-form>
      <van-button round block type="info" color="#25a5ff" style="margin: 0 auto;width: 92%;letter-spacing:15px" @click="logout">退出</van-button>
    </div>
</template>
<script>
import {Toast} from "vant";

export default {
    name: 'home_three_index',
    data() {
      return {
        full_name:'',
        name:'',
        ecpid:'',
        account_sid:'',
        appid:'',
        token:'',
        show: false,
        old_password:'',
        new_password:'',
        userInfo: '',
        user:[]
      };
    },
    created() {
      this.$store.state.navbar_title = "个人中心"; //导航栏命名
      this.userInfo = $core.getLocal('loginUserInfo');
      this.getUserInfo()
    },
    methods: {
      showPopup() {
        this.show = true;
      },
      getUserInfo(){
        $core.request("m=user&a=getUser", res => {
          if (res.status === 1 ) {
            this.ecpid = res.data.ecpinfo.ecpid
            this.account_sid = res.data.ecpinfo.accountSid
            this.appid = res.data.ecpinfo.appid
            this.token = res.data.ecpinfo.token
            this.user = res.data.ecpinfo
            this.full_name = res.data.full_name
            this.name = res.data.name
          } else {
            Toast.fail(res.info);
          }
        },{token:this.userInfo.token});
      },
      editEcpinfo(values){
        values.token = this.userInfo.token
        $core.request("m=user&a=editEcpInfo", res => {
          if (res.status === 1 ) {
            Toast.success(res.info);
          } else {
            Toast.fail(res.info);
          }
        },values);
      },
      editPassword(){
        $core.request("m=user&a=editPassword", res => {
          if (res.status === 1 ) {
            Toast.success(res.info);
          } else {
            Toast.fail(res.info);
          }
        },{old_password:this.old_password,new_password:this.new_password,confirm_password:this.new_password,token:this.userInfo.token});
      },
      logout(){
        $core.request("m=user&a=logoutH5", res => {
          if (res.status === 1 ) {
            Toast.success('退出成功！');
            this.$router.replace({name: 'Login'});
          } else {
            Toast.fail(res.info);
          }
        });
      }
    }
}
</script>

<style>

</style>