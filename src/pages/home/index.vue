<template>
  <div>
    <!-- 搜索栏 -->
    <div class="search">
      <div class="search-item">
        <icon type="search"/>
        <span>搜索</span>
      </div>
    </div>
    <!-- 轮播图 -->
    <swiper indicator-dots="true">
      <swiper-item v-for="(item,index) in swiperData" :key="index">
        <img class="swiperImg" :src="item.image_src">
      </swiper-item>
    </swiper>
    <!-- 菜单栏 -->
    <div class="menu">
      <div class="menu-item" v-for="(item,index) in menuData" :key="index">
        <img :src="item.image_src">
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="floor" v-for="(item,index) in floorData" :key="index">
      <div class="floor-title">
        <img :src="item.floor_title.image_src">
      </div>
      <div class="floor-content">
        <div class="left">
          <img :src="item.leftSrc">
        </div>
        <div class="right">
          <img :src="e.image_src" v-for="(e,i) in item.rightSrc" :key="i">
        </div>
      </div>
    </div>
    <div class="top" v-show="flag" @click="toTop">
      ︿
      <p>顶部</p>
    </div>
  </div>
</template>
<script>
import request from "../../utils/request";
import "./main.less";
export default {
  data() {
    return {
      swiperData: [],
      menuData: [],
      floorData: [],
      flag: false
    };
  },
  computed: {
    floornewData() {
      return this.floorData.map(item => {
        item.leftSrc = item.product_list[0].image_src;
        item.rightSrc = item.product_list.filter((e, i) => {
          return i > 0;
        });
        return item;
      });
    }
  },
  methods: {
    toTop() {
      wx.pageScrollTo({
        scrollTop: 0
      });
    },
    async init() {
      let swiperRes = await request("/home/swiperdata");
      this.swiperData = swiperRes.data.message;
      let menuRes = await request("/home/catitems");
      this.menuData = menuRes.data.message;
      let floorRes = await request("/home/floordata");
      this.floorData = floorRes.data.message;
    }
  },
  created() {
    this.init();
  },
  onPageScroll(e) {
    this.flag = e.scrollTop > 100;
  },
  onPullDownRefresh() {
    this.init();
  }
};
</script>
<style scoped>
</style>