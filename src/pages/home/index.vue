<template>
  <div>
    <div class="search">
      <div class="search-item">
        <icon type="search"/>
        <span>搜索</span>
      </div>
    </div>
    <swiper indicator-dots="true">
      <swiper-item v-for="(item,index) in swiperData" :key="index">
        <img class="swiperImg" :src="item.image_src">
      </swiper-item>
    </swiper>
    <div class="menu">
      <div class="menu-item" v-for="(item,index) in menuData" :key="index">
        <img :src="item.image_src">
      </div>
    </div>
  </div>
</template>
<script>
import request from "../../utils/request"
export default {
  data() {
    return {
      swiperData:[],
      menuData:[]
    };
  },
  methods: {
    async init(){
      let swiperRes = await request("/home/swiperdata")
      this.swiperData=swiperRes.data.message
      let menuRes = await request("/home/catitems")
      this.menuData=menuRes.data.message
    }
  },
  created() {
    this.init()
    // request("/home/swiperdata").then(res=>{
    //   this.swiperData=res.data.message
    // })
    // mpvue.request({
    //   url:"https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata",
    //   method:"GET",
    //   success:(res)=>{
    //     this.swiperData=res.data.message
    //   }
    // })
    // mpvue.request({
    //   url:"https://www.zhengzhicheng.cn/api/public/v1/home/catitems",
    //   method:"GET",
    //   success:(res)=>{
    //     this.menuData=res.data.message
    //   }
    // })
  },
};
</script>
<style scoped>
.search {
  background-color: #EB4450;
  padding: 10px;
}
.search-item {
  background-color: #fff;
  text-align: center
}

.search-item icon {
  vertical-align: middle
}
.swiperImg {
  width: 750rpx;
}
.menu {
  margin-top: 10rpx;
  display: flex;
}
.menu .menu-item {
  flex: 1;
}
.menu .menu-item image {
  width: 180rpx;
  height: 170rpx;
}

</style>