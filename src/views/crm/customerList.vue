<template>
  <div class="customer_list_bg">
    <div class="customer_nav_bar">
      <div class="vux-header" style="">
        <div class="vux-header-left" @click="onClickLeft">
          <span>
            <img
                src="../../assets/left_arrow.png"
                style="">
          </span>
        </div>
        <div class="vux-header-title-area">
          <div style="margin: 8px 0px;">
            <div class="show-search-header search-container">
              <input type="search"  v-model="customername" autocomplete="off" placeholder="请输入客户姓名或电话" class="search_tip">
              <img src="../../assets/search.png"
                  style="width: 20px; height: 20px; margin: 6px 10px;" @click="onSearch()">
            </div>
          </div>
        </div>
        <div class="vux-header-right" replace to="/customer" @click="redirect()">
          <span>
            <img src="../../assets/add.png"
                 style="position: relative; top: -2px; left: -3px; width: 23px; height: 23px;">
          </span>
        </div>
      </div>
    </div>
    <div class="inputdial">
      <van-cell-group>
        <van-field
            v-model="mobile"
            right-icon="phone-o"
            placeholder="输入手机号码进行拨打"
            @click-right-icon="dialNumber(1,mobile)"
        />
        <!--       <van-icon class="iconfont" class-prefix="icon" slot="right-icon" name="mobilephone"></van-icon>-->
      </van-cell-group>
    </div>
    <div>
      <van-dropdown-menu>
        <van-dropdown-item v-model="ascSearch" :options="option2" @change="onSearch()"/>
        <van-dropdown-item v-model="customerSearch" :options="option1" @change="onSearch()"/>
      </van-dropdown-menu>
    </div>
    <div class="border_class"></div>
    <div v-if="customer_list.length  != 0">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false"  offset="10">
          <!-- 内容 -->
          <div class="customer_bg" v-for="(item,index) in customer_list">
            <div class="cell-relate" style="min-height: 24px;">
              <p>{{ item.name }}</p>
              <p class="telphone_style">{{ item.crm_okpkzz }}</p>
            </div>
            <div class="tel_img">
              <img src="../../assets/icon/telphone.png" @click="dialNumber(2,item.crm_okpkzz)">
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div v-else style="height: 100%">
      <div class="nodata">
        暂无数据
      </div>
    </div>

  </div>
</template>

<script>
import {Tab, Tabs, Toast} from "vant";

export default {
  name: "customer_list",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      active: 0,
      mobile: '',
      ascSearch: 'create_time@asc',
      customerSearch: '',
      option1: [],
      option2: [
        {text: '创建时间正序', value: 'create_time@asc'},
        {text: '创建时间倒序', value: 'create_time@desc'},
        {text: '修改时间正序', value: 'update_time@asc'},
        {text: '修改时间倒序', value: 'update_time@desc'},
      ],
      userInfo: '',
      customer_list: [],
      page: 1,
      isLoading: false,
      finished: false,
      loading: false,
      customername: '',
      scene_flag:true
    }
  },
  destroyed() {
    this.$store.state.tab_bar_show = true;
  },
  created() {
    this.$store.state.navbar_show = false;
    this.userInfo = $core.getLocal('loginUserInfo');
    this.onSearch();
  },
  methods: {
    // 搜索
    onSearch(type = 2) {
      let loginUserInfo = this.userInfo;
      const params = {};
      params.token = loginUserInfo.token;
      params.p = this.page;
      if (this.customerSearch) {  // 客户
        params.by = this.customerSearch;
      }
      if (this.ascSearch) {      // 排序
        const assvalue = this.ascSearch.split('@');
        params.order_field = assvalue[0];
        params.order_type = assvalue[1];
      }
      if(this.customername){
        params.csname = this.customername;
      }
      this.isLoading = false;
      this.loading = false;
      $core.request("m=customer&a=index", res => {
            if (res.status == 0) {
              this.finished = true
              Toast(res.info);
              return;
            } else {
              if (res.list.length > 0) {
                const arr = [];
                if(this.scene_flag){
                  this.scene_flag = false;
                  res.scene_list.forEach(function (item, index) {
                    arr.push({'text': item.cut_name, 'value': item.by})
                  });
                  this.option1 = arr;
                }
                this.finished = false
              } else {
                this.finished = true
              }
              if(type == 1){
                this.customer_list = this.customer_list.concat(res.list)
              }else{
                this.customer_list = res.list;
              }

            }
          }, params
      );
    },
    //拨打电话
    dialNumber(type, phone = '') {
      if (type == 1 && !phone) {
        Toast('请输入手机号');
        return;
      }
      if (phone) {
        this.mobile = phone;
      }
      $core.request("m=call&a=dialNumber", res => {
            if (res.status == 0) {
              Toast(res.info);
              return;
            } else {
              Toast("拨打成功");
            }
          }, {mobile: this.mobile, pid: this.userInfo.admin}
      );
    },
    // 下拉刷新
    onRefresh() {
      this.customer_list = []
      this.page = 1;
      this.onSearch();
    },
    onLoad() {
      this.page = this.page + 1;
      this.onSearch(1);
    },
    onClickLeft() {
      this.$router.back();
    },
    redirect(){
      this.$router.replace({name: 'customer_add'});
    }

  }
};
</script>

<style lang="scss" scoped>
body{
  height: 0;
}
.customer_nav_bar {
  div {
    display: inline-block;
  }

  text-align: left;
  background-color: #25a5ff;

  .van-cell {
    top: -11px
  }

  img:first-child {
    margin: 0 15px;
    width: 2%;
  }

  .vux-header {
    width: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 400;
    background-color:#25a5ff;

    .vux-header-left img {
      position: relative;
      top: -2px;
      left: -3px;
      width: 13px;
      height: 15px;
    }

    .vux-header-title-area{
      margin: 0 88px;
      height: 40px;
      width: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .search-container{
      display: flex;
    }
    .show-search-header {
      background-color: white;
      border-radius: 4px;
      height: 32px;
      line-height: 32px;
    }
    .search_tip {
      width: 100%;
      background-color: transparent;
      border: none;
      font-size: 15px;
    }
  }
  .vux-header .vux-header-left, .vux-header .vux-header-right {
    position: absolute;
    top: 14px;
    display: block;
    font-size: 14px;
    line-height: 21px;
    color: #ccc;
  }
  .vux-header .vux-header-right {
    right: 15px;
  }
}

.customer_list_bg {
  background-color: #f2f3f5;
}

.inputdial {
  margin:46px 0 10px;
  .van-field {
    line-height: 30px;
  }
}

.telphone_style {
  font-size: 15px;
  min-height: 25px;
  color: rgb(141, 141, 141);
  line-height: 32px;
}

.tel_img {
  display: inline-block;
  line-height: 72px;

  img {
    width: 65%;
    vertical-align: middle;
  }
}

.box {
  min-height: 21px;
}

.border_class {
  width: 100%;
  border-bottom: 1px solid #25a5ff;
}

.cell-relate {
  width: 66%;
  text-align: left;
  margin-left: 50px;
  float: left;
  display: inline-block;

  p:first-child {
    margin: 10px 0 5px;
    font-size: 17px;
  }
}

.customer_bg {
  background-color: white;
  border-bottom: 1px solid #bfbfbf;
}

.nodata {
  line-height: 60px;
  color: rgb(170, 170, 170);
  font-size: 16px;
}
.van-list{
    ::v-deep .van-list__finished-text {
    margin-top: 100px;
    position: relative;
    top: -100px;
  }
}
</style>