<template>
    <div>
    <!-- 顶部搜索条 -->
    <div class="search">
      <div class="search-input">
        <icon type="search" size="16" color="#999"/>
        {{key}}
      </div>
    </div>
    <!-- Tab效果 -->
    <div class="tabs">
      <div :key='index' :class='{active: currentIndex===index}' v-for='(item, index) in tabs' @click="tab(index)" class="tab-item">
        {{item}}
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="goods_list">
      <navigator :url="'/pages/goods_detail/main?key=' + item.goods_id" class='goods-item' :key='item.goods_id' v-for='item in list'>
        <img :src="item.goods_small_logo">
        <div class="goods-right">
          <h4>{{item.goods_name}}</h4>
          <div class="price">
            <span>￥</span> {{item.goods_price}}
          </div>
        </div>
      </navigator>
    </div>
    <!-- 没有更多数据了 -->
    <div class="more" v-if='hasMore'>没有更多数据了</div>
  </div>
</template>

<script>
import request from "../../utils/request"
export default {
    data() {
        return {
            key:'',
            currentIndex:1,
            tabs:['综合', '销量', '价格'],
            pagenum:1,
            pagesize:10,
            list:[],
            total:'',
            hasMore:false,
            isloading:false
        }
    },
    methods:{
        tab(id){
          this.currentIndex = id
        },
        async init(){
            if(this.hasMore){
                return
            }
            if(this.isloading){
                return
            }
            this.isloading=true
            let res = await request('/goods/search',{
                query:this.key,
                pagenum:this.pagenum,
                pagesize:this.pagesize
            })
            this.list=[...this.list,...res.data.message.goods]
            // console.log(res.data.message)
            this.total=res.data.message.total
            this.isloading=false
            if(this.list.length>=this.total){
                this.hasMore=true
            }
            this.pagenum=this.pagenum+1
            
        }
    },
    onLoad(e){
        this.key=e.key
        this.init()
    },
    onReachBottom(){
        this.init()
    }
}
</script>

<style lang="less" scoped>
@import "./main.less";
</style>
