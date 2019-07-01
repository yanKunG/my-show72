<template>
  <div>
    <!-- 轮播图 -->
    <swiper indicator-dots>
      <swiper-item :key="item.pics_id" v-for="item in detail.pics">
        <image :src="item.pics_big_url" class="slide-image" mode="aspectFill" />
      </swiper-item>
    </swiper>
    <!-- 商品基本信息 -->
    <div class="goods-info">
      <div class="goods-price">￥ {{detail.goods_price}}</div>
      <div class="goods-title">
        <h4>{{detail.goods_name}}</h4>
        <div class="goods-star">
          <span class="iconfont icon-shoucang"></span>
          <p>分享</p>
          <button open-type="share" class="share-btn">分享</button>
        </div>
      </div>
    </div>
    <!-- 商品的详细信息 -->
    <div class="goods-detail">
      <div class="goods-detail-title">商品详情</div>
      <div v-html="detail.goods_introduce"></div>
    </div>
    <!-- 底部菜单 -->
    <div class="footer">
      <button class="contact"></button>
      <div class="footer-left">
        <span class="iconfont icon-kefu"></span>
        <p>联系客服</p>
      </div>
      <navigator class="footer-left" url="/pages/cart/main" open-type="switchTab">
        <span class="iconfont icon-gouwuche"></span>
        <p>购物车</p>
      </navigator>
      <div class="footer-right" @click="addCard()">加入购物车</div>
      <div class="footer-right">立即购买</div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
export default {
  data() {
    return {
      goodsId: "",
      detail: {}
    };
  },
  methods: {
    async init() {
      let res = await request("/goods/detail", { goods_id: this.goodsId });
      this.detail = res.data.message;
    },
    addCard() {
      let cart = mpvue.getStorageSync("mycart") || {};

      if (cart[this.goodsId]) {
        cart[this.goodsId].num = cart[this.goodsId].num + 1;
      } else {
        cart[this.goodsId] = this.detail;
        cart[this.goodsId].num = 1;
        cart[this.goodsId].checked = false
      }
      mpvue.setStorageSync("mycart", cart);

      mpvue.showToast({
        title: "商品添加成功",
        icon: "success"
      });
    }
  },
  onLoad(e) {
    this.goodsId = e.key;

    this.init();
  }
};
</script>

<style lang="less" scoped>
@import "./main.less";
</style>
