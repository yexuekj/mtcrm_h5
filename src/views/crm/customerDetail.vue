<template>
  <div class="customer_detail_bg">
    <div style="margin-bottom: 10px;background-color: white">
     <div>
       <div class="fl"><img style="margin:10px" src="../../assets/icon1.png">
       </div>
       <div class="fl" style="line-height: 90px;margin-left: 40px">{{customerName}}</div>
       <div class="cl_both"></div>
     </div>
      <div>
        <div class="fl div_display div_title">
            负责人
        </div>
        <div class="fl div_display div_info">
           {{ownerName}}
        </div>
        <div class="cl_both"></div>
      </div>
      <div>
        <div class="fl div_display div_title">
          最后跟进时间
        </div>
        <div class="fl div_display div_info">
          {{last_get_time}}
        </div>
        <div class="cl_both"></div>
      </div>
      <div>
        <div class="fl div_display div_title">
          联系电话
        </div>
        <div class="fl div_display div_info">
          {{contacts_telephone}}
        </div>
        <div class="cl_both"></div>
      </div>
    </div>

    <div style="margin: 10px 0">
      <van-tabs type="line">
        <van-tab title="跟进记录">
          <div v-for="(item,index) in  log" style="font-size: 18px;padding-top: 10px">
            <div style="line-height: 50px">
              <div class="fl"><img style="width: 50px;margin-left: 10px" src="../../assets/icon1.png">
              </div>
              <div class="fl div_display " style="margin:0 20px">{{item.owner.user_name}}</div>
              <div class="fl div_date" >{{item.create_date}}</div>
              <div class="cl_both"></div>
            </div>
            <div>
              <div class="div_margin_left content_border">{{item.content}}</div>
            </div>
            <div>
              <div class="div_margin_left div_get_type">{{item.status_name}}</div>
            </div>
            <div>
              <div class="div_margin_left div_date">下次联系时间：{{item.nextstep_time}}</div>
            </div>
            <div class="border-line"></div>
          </div>
        </van-tab>
        <van-tab title="操作记录">
          <div v-if="actionList">
            <div v-for="(item,index) in actionList">
              <div ></div>
              <div ></div>
            </div>
          </div>
          <div v-else>暂无数据</div>
        </van-tab>
        <van-tab title="通话记录">暂无数据</van-tab>
      </van-tabs>
    </div>


  </div>
</template>

<script>
import {Tab, Tabs, Toast} from "vant";

export default {
  name: "customer_detail",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      customerName:'',
      ownerName:'',
      last_get_time:'',
      contacts_telephone:'',
      userInfo:'',
      customer_id:'',
      page:1,
      log:[],
      actionList:[]
    }
  },
  destroyed() {
    this.$store.state.tab_bar_show = true;
  },
  created() {
    this.$store.state.navbar_title = "详情"; //导航栏命名
    this.userInfo = $core.getLocal('loginUserInfo');
    this.customer_id = this.$route.params.customer_id ;
    this.getDetail();
    this.getLogList();
    this.getActionList();
  },
  methods: {
     // 详情信息
     getDetail(){
       $core.request('m=customer&a=dynamic',res=>{
           this.customerName = res.data.name;
           this.ownerName = res.data.owner.full_name;
           this.contacts_telephone = res.data.contacts_telephone;
           this.last_get_time = res.data.get_time;
       },{id:this.customer_id,token:this.userInfo.token})
     },

    // 跟进记录
    getLogList(){
      $core.request('m=index&a=loglist',res=>{
         this.log = res.list;
      },{module:'customer',id:this.customer_id,token:this.userInfo.token,p:this.page})
    },
    getActionList(){
      $core.request('m=customer&a=getActionList',res=>{
        this.actionList = res.list;
      },{module:'customer',id:this.customer_id,token:this.userInfo.token,p:this.page})
    }
  }
};
</script>

<style lang="scss" scoped>
.customer_detail_bg{
  background-color: #f2f3f5;
}
body{
  height: 0;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.cl_both{
  clear: both;
}
.div_display{
  display: inline-block;
}
.div_title{
  font-size: 18px;
  line-height: 40px;
  width: 140px;
  text-align: left;
  margin:0 20px;
}
.div_margin_left{
  text-align: left;
  margin-left: 20px;
}
.div_date{
  font-size: 16px;
  margin-left: 40px;
}
.div_info{
  font-size: 18px;
  line-height: 40px;
}
.van-tabs{
   ::v-deep .van-tab:nth-child(2){
     border-left:1px solid gray;
     border-right:1px solid gray;
   }
  ::v-deep .van-tabs__content{
    background-color: white;
  }
  ::v-deep  .van-tabs__wrap{
    border-bottom: 1px solid gray;
    //border-top: 1px solid gray;
    padding: 10px;
    background-color: white;
  }
}
.border-line{
  border:0.02667rem solid #f2f3f5;
  margin: 10px 0;
}
.content_border{
  font-weight: bold;;
  padding: 10px 20px;
}
.div_get_type{
  padding: 10px 20px;
  border: 1px solid gray;
  border-radius: 20px;
  width: 130px;
  margin-bottom: 10px;
}
</style>