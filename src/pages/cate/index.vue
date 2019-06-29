<template>
  <div>
    <!-- 搜索栏 -->
    <search-bar></search-bar>
    <!-- 商品列表 -->
    <div class="content">
      <!-- 左侧分类信息 -->
      <div class="left">
        <div :class='["menu-item",currentIndex==item.cat_id?"active":""]' v-for="item in listData" :key="item.cat_id" @click="leftMenu(item.cat_id)">{{item.cat_name}}</div>
      </div>
      <div class="right">
        <!-- 右侧分类信息 -->
        <div class="brand-item" v-for="item in rightData" :key="item.cat_id">
          <div class="brand-title">{{item.cat_name}}</div>
          <div class="brand-list">
            <div class="brand" v-for="(e,i) in item.children" :key="i">
              <img :src="e.cat_icon">
              <p>{{e.cat_name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
import searchBar from "../../components/searchBar.vue";
export default {
  data() {
    return {
      listData: [],
      currentIndex:1
    };
  },
  computed: {
    rightData(){
      let rd = this.listData.filter(item=>{
        return this.currentIndex == item.cat_id
      })
      return rd.length>0?rd[0].children:[]
    }
  },
  components: {
    "search-bar": searchBar
  },
  methods: {
    async init() {
      let res = await request("/categories");
      this.listData = res.data.message;
    },
    leftMenu(id){
      this.currentIndex=id
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
@import "./main.less";
</style>

