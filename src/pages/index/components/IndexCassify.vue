<template>
  <!-- 首页分类功能 -->
  <view class="index-tab-bar">
    <view class="item" v-for="(item,index) in list">
      <view class="image-wrap" @click="goCategory(item.toUrl)">
        <view class="img-container">
          <img :src="item.imgUrl" class="index-tab-bar-image"/>
        </view>
      </view>
      <p class="desc">{{ item.title }}</p>
    </view>
  </view>
</template>

<script setup lang="ts">

defineProps<{
  list: [],
}>()

const goCategory = (url:string) =>{
  uni.reLaunch({
    url
  })
}
</script>

<style lang="scss" scoped>
.index-tab-bar {
  width: 95%;
  margin: 30% auto;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  flex-wrap: wrap;

  .item {
    width: 20%;

    .image-wrap {
      margin: 10px auto;
      width: 50px;
      height: 50px;
      position: relative;
      overflow: hidden;
    }

    .index-tab-bar-image {
      display: block;
      width: 100%;
      height: 100%;
    }

    .desc {
      margin-top: 4px;
      font-size: 12px;
      text-align: center;
      color: #212121;
    }
  }

}

;
</style>
