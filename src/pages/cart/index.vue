<template>
  <div>
    <!-- 收货地址 -->
    <div class="cart-top" v-if='address'>
      <div class="receive">
        <div class="name">收货人: {{address.userName}}</div>
        <div class="phonen-number">{{address.telNumber}}</div>
      </div>
      <div class="address">收货地址: {{allAddress}}</div>
      <img src="../../../static/images/cart_border@2x.png" class="address-bar" mode="aspectFill">
    </div>
    <div @click='getAddress' class="add_addresss" v-else>
      <text>新增收货人</text>
      <span></span>
    </div>
    <div class="list-title">优购生活馆</div>
    <!-- 商品列表信息 -->
    <div class="ware-list">
      <div class="ware-item" :key='value.goods_id' v-for='value in cart'>
        <!-- 左侧按钮checkbox -->
        <div class="choice-button">
          <icon @click='singleCheck(value.goods_id)' :color="value.checked?'red':'#eee'" type='success' size='18'/>
        </div>
        <!-- 右侧商品信息 -->
        <div class="ware-content">
          <!-- 左侧图片 -->
          <navigator class='ware-image'>
            <img :src='value.goods_small_logo' mode="aspectFill"/>
          </navigator>
          <!-- 右侧商品信息 -->
          <div class="ware-info">
            <!-- 商品名称 -->
            <navigator class='ware-title'>
              {{value.goods_name}}
            </navigator>
            <!-- 商品价格和数量变更 -->
            <div class="ware-info-btm">
              <!-- 商品价格 -->
              <div class="ware-price">
                <span>￥</span>
                {{value.goods_price}}
              </div>
              <!-- 数量变更 -->
              <div class="calculate">
                <div class="rect" @click="del(value.goods_id)">-</div>
                <div class="number">{{value.num}}</div>
                <div class="rect" @click="add(value.goods_id)">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部菜单布局 -->
    <div class="cart-total">
      <!-- 左侧CheckBox -->
      <div class="total-button">
        <icon @click="allCheck" :color="isAll?'red':'#eee'" type='success' size='18'/>全选
      </div>
      <!-- 中间的价格 -->
      <div class="total-center">
        <div class="total-price">合计：
          <text class="colorRed">
            <text>￥</text>{{allPrice}}
          </text>
        </div>
        <div class="price-tips">包含运费</div>
      </div>
      <!-- 右侧结算按钮 -->
      <div class="accounts" @click="jiesuan">
        结算
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
export default {
  data() {
    return {
      address:null,
      cart:{}
    }
  },
  computed: {
    allPrice(){
      let sum = 0
      for(let key in this.cart){
        let p = this.cart[key]
        if(p.checked){
          sum += p.goods_price * p.num
        }
      }
      return sum
    },
    isAll(){
      let flag = true
      for(let key in this.cart) {
        let p = this.cart[key]
        if(p.checked === false) {
          flag = false
          break
        }
      }
      return flag
    },
    allAddress(){
      if(this.address===null){
        return ''
      }
      let {provinceName,cityName,countyName,detailInfo}=this.address
      return `${provinceName}${cityName}${countyName}${detailInfo}`
    }
  },
  methods: {
    jiesuan(){
      if(this.allPrice===0){
        mpvue.showToast({
          title:'请选择商品'
        })
        return
      }
      // let token = getStorageSync('mytoken')
      // if(!token){
        
      // }
      mpvue.navigateTo({
          url:'/pages/auth/main'
        })
      
    },
    del(id){
      let c = JSON.parse(JSON.stringify(this.cart))
      if(c[id].num>1){
        c[id].num = c[id].num - 1
      }else{
        delete c[id]
      }
      this.cart = c
    },
    add(id){
      let c = JSON.parse(JSON.stringify(this.cart))
      c[id].num = c[id].num + 1
      this.cart = c
    },
    allCheck(){
      let flag = this.isAll
      let c = JSON.parse(JSON.stringify(this.cart))
      for(let key in c){
        c[key].checked = !flag
      }
      this.cart = c
    },
    singleCheck(id){
      var c = JSON.parse(JSON.stringify(this.cart))
      c[id].checked = !c[id].checked
      this.cart = c;
    },
    getAddress(){
      let that = this
      mpvue.chooseAddress({
        success(res){
          console.log(res)
          that.address = res
        }
      })
    }
  },
  onShow(){
    this.cart = mpvue.getStorageSync('mycart')
    console.log(this.cart)
  },
  onHide(){
    mpvue.setStorageSync('mycart',this.cart)
  }
};
</script>

<style lang="less" scoped>
@import "./main.less";
</style>

