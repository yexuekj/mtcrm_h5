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
      <van-form @submit="onSubmit" style="margin-top: 10px">
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
        <van-dialog v-model="show" title="修改密码" show-cancel-button style="color: #5A5A5A">
          <span style="display:block;width: 90%;margin: 10px auto;color: #5A5A5A">
            <p style="float: left;line-height: 30px">旧密码</p>
            <input type="password" style="border: 1px solid #c8c9cc;height: 30px;border-radius: 5px" />
          </span>
          <span style="display:block;width: 90%;margin: 10px auto;color: #5A5A5A">
            <p style="float: left;line-height: 30px">新密码</p>
            <input type="password" style="border: 1px solid #c8c9cc;height: 30px;border-radius: 5px" />
          </span>
        </van-dialog>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" color="#25a5ff" style="letter-spacing:15px">保存</van-button>
        </div>
      </van-form>
      <van-button round block type="info" color="#25a5ff" style="margin: 0 auto;width: 92%;letter-spacing:15px">退出</van-button>
    </div>
</template>
<script>
export default {
    name: 'home_three_index',
    data() {
      return {
        full_name:'测试',
        name:'18256004276',
        ecpid:'',
        account_sid:'',
        appid:'',
        token:'',
        show: false,
      };
    },

    created() {
      this.$store.state.navbar_title = "个人中心"; //导航栏命名
    },
    methods: {
      onSubmit(values) {
        console.log('submit', values);
      },
      showPopup() {
        this.show = true;
      },
    }
}
</script>

<style>

</style>