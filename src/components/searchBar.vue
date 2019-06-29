<template>
    <!-- 搜索栏 -->
    <div class="search">
      <navigator url="/pages/search/main">
      <div class="search-item">
        <icon type="search"/>
        <span>搜索</span>
      </div>
      </navigator>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style lang="less" scoped>
.search {
  background-color: #eb4450;
  padding: 10px;
}
.search-item {
  background-color: #fff;
  text-align: center;
}

.search-item icon {
  vertical-align: middle;
}
</style>
