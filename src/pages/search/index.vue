<template>
    <div>
    <!-- 搜索条 -->
    <div class="search">
      <div class="search-content">
        <div class="search-input">
          <icon type='search' size='16'/>
          <input @input='handleInput' v-model='keyword' placeholder="请输入关键字" />
        </div>
        <button class="cancel" v-if='keyword' @click="cancel()">取消</button>
        <div class="search-modal" v-if='keyword'>
          <div :key='item.goods_id' v-for='item in resultList' class="search-item">{{item.goods_name}}</div>
        </div>
      </div>
    </div>
    <div class="history"></div>
    <div class="history-list"></div>
  </div>
</template>

<script>
import request from '../../utils/request.js'

export default {
  data () {
    return {
      keyword: '',
      resultList: [],
      timer:null
    }
  },
  methods: {
    cancel(){
      this.keyword=''
    },
    // 防抖
    handleInput(){
      clearTimeout(this.timer)
      this.timer=setTimeout(async ()=>{
        let res = await request('/goods/qsearch', {query: this.keyword})
        this.resultList = res.data.message
      },1000)
    }
    // async handleInput() {
    //   if(this.isLoading){
    //     return
    //   }
    //   this.isLoading = true
    //   let res = await request('/goods/qsearch', {query: this.keyword})
    //   this.resultList = res.data.message
    //   this.isLoading = false
    // }
  }
}
</script>

<style lang="less" scoped>
  @import "./main.less";
</style>

