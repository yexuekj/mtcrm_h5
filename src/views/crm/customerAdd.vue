<template>
  <div class="customer_list_bg" >
    <div class="nav_bar">
      <van-nav-bar
          :title="$store.state.navbar_title"
          left-arrow
          right-text="保存"
          @click-left="onClickLeft"
          @click-right="add"
      />
    </div>
    <div class="base_title" @click="add()">
      基本信息
    </div>
    <div v-for="(item,index) in baseInfo">
      <van-cell-group>
        <van-field  v-if="item.form_type == 'text'"  :label="item.name" v-model="field[index].value"  placeholder="请输入" />
        <div v-else-if="item.form_type == 'select'">
          <van-field
              readonly
              clickable
              :label="field[index].name"
              :value="field[index].value"
              placeholder=""
              @click="field[index].show = true"
          />
          <van-popup v-model="field[index].show" round position="bottom">
            <van-picker
                show-toolbar
                :columns="field[index].setting"
                @cancel="field[index].show = false"
                @confirm="onConfirm"
            />
          </van-popup>
<!--          <div >-->
<!--            <img src="../../assets/left_arrow.png">-->
<!--          </div>-->
        </div>
        <div v-else-if="item.form_type == 'textarea'">
          <van-field
              v-model="field[index].value"
              rows="2"
              autosize
              :label="item.name"
              type="textarea"
              maxlength="50"
              placeholder="请输入"
              show-word-limit
          />
        </div>
      </van-cell-group>
    </div>
    <div class="base_title">
      附加信息
    </div>
    <div v-for="(item,index) in otherInfo">
      <van-cell-group>
        <van-field  v-if="item.form_type == 'text'" v-model="field[item.field]" :label="item.name" placeholder="请输入" />
        <div v-else-if="item.form_type == 'textarea'">
          <van-field
              v-model="field[index+count].value"
              rows="2"
              autosize
              :label="item.name"
              type="textarea"
              placeholder="请输入"
              show-word-limit
          />
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import {Tab, Tabs, Toast,NavBar} from "vant";

export default {
  name: "customer_add",
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      active: 0,
      customerSearch: '',
      userInfo: '',
      baseInfo:[],
      otherInfo:[],
      field:[],
      show:true,
      columns:[],
      value:'',
      showPicker: false,
      count:0,
      phone:''
    }
  },
  destroyed() {
    this.$store.state.tab_bar_show = true;
  },
  created() {
    this.$store.state.navbar_title = '添加客户';
    this.userInfo = $core.getLocal('loginUserInfo');
    this.phone = this.$route.params.phone ;
    this.getField();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    add(){
      console.log(this.field)
      const params = {};
      let isreturn = false;
      try{
        this.field.map(function (item, index) {
          params[item.field] = item.value;
          if((item.isunique == 1 || item.is_validate == 1) && !item.value && item.input_tips){
            isreturn = true;
            Toast(item.input_tips);
            throw Error();
          }
        });
      }catch(err){}
      if(isreturn){
        return  false;
      }
      params.token = this.userInfo.token
      $core.request("m=customer&a=add", res => {
        if(res.status == 1){

        }
        Toast(res.info);
        this.$router.replace({name: 'customer_list'});
      },params)
    },
    // 客户字段
    getField(){
      let phone = this.phone;
      $core.request("m=index&a=fields", res => {
            const arr=[];
            const arr1=[];
            const arr2= [];
            if (res.status != 1) {
              Toast(res.info);
              return;
            } else {
              res.data.forEach(function (item, index) {
                if(item.is_main == 1){
                  arr.push(item)
                }else{
                  arr1.push(item)
                }
                const field_key = item.field;
                if(item.name == "电话"){
                  item.default_value = phone;
                }
                if(item.is_unique == 1){
                  item.name = item.name+'*';
                }
                if(item.form_type == "select"){
                  const arr3= [];
                  item.setting.forEach(function (item1, index1) {
                    arr3.push({'text': item1.key,index:index})
                  });
                  arr2.push({input_tips:item.input_tips,is_validate:item.is_validate,isunique:item.is_unique,value:item.default_value,name:item.name,field:item.field,show:false,setting:arr3})
                }else{
                  arr2.push({input_tips:item.input_tips,is_validate:item.is_validate,isunique:item.is_unique,value:item.default_value,name:item.name,field:item.field})
                }
              });
              this.baseInfo = arr;
              this.count = arr.length;
              this.otherInfo = arr1;
              this.field = arr2;
            }
          }, {params:'{"module":"customer","action":"add"}', token: this.userInfo.token}
      );
    },
    showPopup(index,isshow){
      this.field[index].show = true
    },
    Onchange(){

    },
    onConfirm(field,value){
      this.field[field.index].value = field.text;
      this.field[field.index].show = false;
    }

  }
};
</script>

<style lang="scss" scoped>
.customer_list_bg{
  margin-bottom: 50px
}
.base_title{
  text-align: left;
  margin: 10px;
  font-size: 20px;
}
.base_select{
  position: relative;
  border: none;
  appearance:none;
  -moz-appearance:none;
  -webkit-appearance:none;
}
.van-cell-group{
  .van-field{
    .van-cell__value{
      .van-field__body{

      }
    }
  }
  ::v-deep .van-field__control{
    text-align: right;
  }
}
.van-field__control{
  text-align: right;
}
.nav_bar {
  .van-nav-bar {
    background: #25a5ff;
    ::v-deep .van-nav-bar__title {
      color: #fff;
    }
    ::v-deep .van-icon-arrow-left {
      color: #fff;
    }
    ::v-deep .van-nav-bar__text {
      color: #fff;
    }
  }
}

</style>