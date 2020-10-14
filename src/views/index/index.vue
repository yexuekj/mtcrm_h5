<template>
    <div class="index common_page">
        <div class="div_top">
          <div class="top_left">
            <img class="top_img" src="@/assets/customer_manage.png"/>
            <span class="top_span">客户管理</span>
          </div>
          <div class="top_line">
            <img src="@/assets/line.png" style="height: 174%;width: 31%;"/>
          </div>
          <div class="top_right">
            <img class="top_img" src="@/assets/customer_sea.png"/>
            <span class="top_span">客户池</span>
          </div>
        </div>
      <div class="div_center">
        <h6 style="font-size: 20px;font-weight: 500">销售简报</h6>
        <div class="center_table">
          <div class="table_list">
            <div class="list_left">
              <img class="list_icon" src="@/assets/icon1.png" />
              <div class="list_font">
                <span style="color: #25a5ff;float: left">49666</span>
                <span style="font-size: 15px;float: left">本周新增客户</span>
              </div>
            </div>
            <div class="list_right">
              <img class="list_icon" src="@/assets/icon1.png" />
              <div class="list_font">
                <span style="color: #25a5ff;float: left">49666</span>
                <span style="font-size: 15px;float: left">本周新增客户</span>
              </div>
            </div>
          </div>
          <div class="table_list">
            <div class="list_left">
              <img class="list_icon" src="@/assets/icon2.png" />
              <div class="list_font">
                <span style="color: #25a5ff;float: left">49666</span>
                <span style="font-size: 15px;float: left">本周新增联系人</span>
              </div>
            </div>
            <div class="list_right">
              <img class="list_icon" src="@/assets/icon2.png" />
              <div class="list_font">
                <span style="color: #25a5ff;float: left">49666</span>
                <span style="font-size: 15px;float: left">本周新增联系人</span>
              </div>
            </div>
          </div>
          <div class="table_list" style="border-bottom: none">
            <div class="list_left">
              <img class="list_icon" src="@/assets/icon3.png" />
              <div class="list_font">
                <span style="color: #25a5ff;float: left">49666</span>
                <span style="font-size: 15px;float: left">本周新增商机</span>
              </div>
            </div>
            <div class="list_right">
              <img class="list_icon" src="@/assets/icon3.png" />
              <div class="list_font">
                <span style="color: #25a5ff;float: left">49666</span>
                <span style="font-size: 15px;float: left">本周新增商机</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  .div_top{
    width: 100%;
    height: 150px;
    background-color: #ffffff;
  }
  .top_left{
    width: 49%;
    height: 120px;
    float: left;
    padding: 0px 30px;
  }
  .top_right{
    width: 49%;
    height: 120px;
    float: right;
    padding: 0px 30px;
  }
  .top_line{
    float: left;
    width: 5px;
    margin: 10px 1px;
  }
  .top_img{
    width: 60%;
    float: left;
    margin: 25px 30px 10px 30px;
  }
  .top_span{
    float: left;
    font-size: 16px;
    width: 140px;
    display: block;
    text-align: center;
  }
  .div_center{
    width: 100%;
    background-color: #ffffff;
    margin-top: 20px;
    padding: 15px;
  }
  .center_table{
      margin-top: 10px;
  }
  .table_list{
    width: 100%;
    height: 75px;
    border-bottom: 1px solid #F0F0F0;
    margin: 23px 0px;
  }
  .list_left{
    float: left;
    width: 48%;
  }
  .list_font{
    width: 100px;
    float: right;
    text-align: left;
  }
  .list_right{
    float: right;
    width: 48%;
  }
  .list_icon{
    width: 30%;
    float: left;
  }
}
</style>