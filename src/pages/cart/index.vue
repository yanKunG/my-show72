<template>
    <div>
    <!-- 收货地址 -->
    <div class="cart-top" v-if='address'>
      <div class="receive">
        <div class="name">收货人: </div>
        <div class="phonen-number"></div>
      </div>
      <div class="address">收货地址: </div>
      <img src="../../../static/images/cart_border@2x.png" class="address-bar" mode="aspectFill">
    </div>
    <div @click='getAddress' class="add_addresss" v-else>
      <text>新增收货人</text>
      <span></span>
    </div>
    <div class="list-title">优购生活馆</div>
    <!-- 商品列表信息 -->
    <div class="ware-list">
      <div class="ware-item" >
        <!-- 左侧按钮checkbox -->
        <div class="choice-button">
          <icon @click='singleCheck(value.goods_id)'  type='success' size='18'/>
        </div>
        <!-- 右侧商品信息 -->
        <div class="ware-content">
          <!-- 左侧图片 -->
          <navigator class='ware-image'>
            <img src="" mode="aspectFill"/>
          </navigator>
          <!-- 右侧商品信息 -->
          <div class="ware-info">
            <!-- 商品名称 -->
            <navigator class='ware-title'>
              
            </navigator>
            <!-- 商品价格和数量变更 -->
            <div class="ware-info-btm">
              <!-- 商品价格 -->
              <div class="ware-price">
                <span>￥</span>
                
              </div>
              <!-- 数量变更 -->
              <div class="calculate">
                <div class="rect" >-</div>
                <div class="number"></div>
                <div class="rect">+</div>
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
        <icon color='#eee' type='success' size='18'/>全选
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
      <div class="accounts" >
        结算
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request"
export default {
}
</script>

<style lang="less" scoped>
@import "./main.less";
</style>

