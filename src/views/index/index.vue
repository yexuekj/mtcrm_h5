<template>
    <div class="index common_page">
        <div class="div_top">
          <div class="top_left" @click="redirect(1)">
            <img class="top_img" src="@/assets/customer_manage.png"/>
            <span class="top_span">客户管理</span>
          </div>
          <div class="top_line">
            <img src="@/assets/line.png" style="height: 174%;width: 31%;"/>
          </div>
          <div class="top_right" @click="redirect(2)">
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
                <span style="color: #25a5ff;float: left;display: block;width: 100px">{{brief_report[0][0]}}</span>
                <span style="font-size: 14px;float: left">本{{brief_report[0][1]}}新增{{brief_report[0][4]}}</span>
              </div>
            </div>
            <div class="list_right">
              <img class="list_icon" src="@/assets/icon1.png" />
              <div class="list_font">
                <span style="color: #25a5ff;float: left;display: block;width: 100px">{{brief_report[0][2]}}</span>
                <span style="font-size: 14px;float: left">本{{brief_report[0][3]}}新增{{brief_report[0][4]}}</span>
              </div>
            </div>
          </div>
          <div class="table_list">
            <div class="list_left">
              <img class="list_icon" src="@/assets/icon2.png" />
              <div class="list_font">
                <span style="color: #25a5ff;float: left;display: block;width: 100px">{{brief_report[1][0]}}</span>
                <span style="font-size: 14px;float: left">本{{brief_report[1][1]}}新增{{brief_report[1][4]}}</span>
              </div>
            </div>
            <div class="list_right">
              <img class="list_icon" src="@/assets/icon2.png" />
              <div class="list_font">
                <span style="color: #25a5ff;float: left;display: block;width: 100px">{{brief_report[1][2]}}</span>
                <span style="font-size: 14px;float: left">本{{brief_report[1][3]}}新增{{brief_report[1][4]}}</span>
              </div>
            </div>
          </div>
          <div class="table_list" style="border-bottom: none">
            <div class="list_left">
              <img class="list_icon" src="@/assets/icon3.png" />
              <div class="list_font">
                <span style="color: #25a5ff;float: left;display: block;width: 100px">{{brief_report[2][0]}}</span>
                <span style="font-size: 14px;float: left">本{{brief_report[2][1]}}新增{{brief_report[2][4]}}</span>
              </div>
            </div>
            <div class="list_right">
              <img class="list_icon" src="@/assets/icon3.png" />
              <div class="list_font">
                <span style="color: #25a5ff;float: left;display: block;width: 100px">{{brief_report[2][2]}}</span>
                <span style="font-size: 14px;float: left">本{{brief_report[2][3]}}新增{{brief_report[2][4]}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    name: "index",
    data() {
        return {
          brief_report:[
            {0:'0',1:'周',2:'0',3:'月',4:'客户'},
            {0:'0',1:'周',2:'0',3:'月',4:'联系人'},
            {0:'0',1:'周',2:'0',3:'月',4:'商机'}
          ],
          userInfo:''
        };
    },
    created() {
        this.$store.state.navbar_title = "CRM"; //导航栏命名
        this.userInfo = $core.getLocal('loginUserInfo');
        // this.getIndexH5()
        this.briefReportInfo()
    },
    methods: {
      // 跳转
      redirect(type){
         switch (type){
           case 1:
             this.$router.replace({name: 'customer_list'});
         }
      },
        getIndexH5() {
            $core.request("m=index&a=getIndexH5", res => {
                if (res.status === 1 ) {
                    this.brief_report = res.data;
                    console.log(this.brief_report)
                } else {
                    Toast.fail(res.info);
                    // this.$router.replace({name: 'Login'});
                }
            });
        },
       // 销售简报
       briefReportInfo(){
        $core.request("m=index&a=index", res => {
          if (res.status === 1 ) {
            this.brief_report =[
              {0:res.data.customer_count.week,1:'周',2:res.data.customer_count.month,3:'月',4:'客户'},
              {0:res.data.contacts_count.week,1:'周',2:res.data.contacts_count.month,3:'月',4:'联系人'},
              {0:res.data.business_count.week,1:'周',2:res.data.business_count.month,3:'月',4:'商机'},
            ];
            console.log(this.brief_report)
          } else {
            Toast.fail(res.info);
            // this.$router.replace({name: 'Login'});
          }
        },{token:this.userInfo.token});
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
    font-size: 22px;
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