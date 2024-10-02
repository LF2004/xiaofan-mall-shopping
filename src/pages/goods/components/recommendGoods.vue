<template>
  <view class="flex-col section space-y-30">
    <text class="self-start text">相关推荐</text>
    <view class="grid">
      <view class="flex-col grid-item space-y-24" v-for="item,index in list" :key="index" @tap="onTap(item.goodsId)">
          <view class="flex-col items-start group space-y-8">
            <image
              class="image"
              :src="item.picture"
            />
            <text class="font_1 text_2">{{item.name}}</text>
          </view>
          <view class="flex-row items-baseline space-x-14">
            <!-- 预售  -->
              <view class="group_2">
                <text class="font_4">￥</text>
                <text class="font_3">{{ item.price }}</text>
              </view>
          </view>

      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 定义props接收父组件传参
import type {goodsListData} from "@/types/goods";
const onTap = (id:number)=>{
  uni.navigateTo({
    url:`/pages/goods/goods?id=${id}`
  })
}
defineProps<{
  list: goodsListData[]
}>()
</script>

<style scoped lang="scss">
.section {
  margin-bottom: 20px;
  padding: 35.42rpx 19.44rpx 40.98rpx;
  background-color: #ffffff;
  border-radius: 24.65rpx;
.text {
  margin-left: 3.48rpx;
  color: #0b0b0b;
  font-size: 26.4rpx;
  font-family: Microsoft YaHei;
  font-weight: 700;
  line-height: 27.08rpx;
}
.grid {
  margin-right: 6.94rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 13.9rpx;
.grid-item {
  padding: 5.56rpx 0 5.56rpx 2.77rpx;
  background-color: #ffffff;
.group {
  padding-top: 2.77rpx;
.image {
  width: 223.96rpx;
  height: 223.96rpx;
}
.font_1 {
  font-size: 20.83rpx;
  font-family: Microsoft YaHei;
  letter-spacing: 1.67rpx;
  line-height: 24.31rpx;
  font-weight: 700;
  color: #0b0b0b;
}
.text_2 {
  width: 130px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 2.77rpx;
}
}
.space-y-8 {
& > view:not(:first-child),
& > text:not(:first-child),
& > image:not(:first-child) {
    margin-top: 5.56rpx;
  }
}
.space-x-14 {
& > view:not(:first-child),
& > text:not(:first-child),
& > image:not(:first-child) {
    margin-left: 9.73rpx;
  }
.font_2 {
  font-size: 20.83rpx;
  font-family: Microsoft YaHei;
  letter-spacing: 1.67rpx;
  line-height: 21.52rpx;
  font-weight: 700;
  color: #9b9b9b;
}
.group_2 {
  line-height: 16.67rpx;
  height: 16.67rpx;
.font_4 {
  font-size: 16.67rpx;
  font-family: Microsoft YaHei;
  letter-spacing: -1.67rpx;
  line-height: 13.19rpx;
  font-weight: 700;
  color: var(--xiaofan-bg-main-color);
}
.font_3 {
  font-size: 20.83rpx;
  font-family: Microsoft YaHei;
  letter-spacing: -2.08rpx;
  line-height: 16.67rpx;
  font-weight: 700;
  color: var(--xiaofan-bg-main-color);
}
}
}
}
.space-y-24 {
& > view:not(:first-child),
& > text:not(:first-child),
& > image:not(:first-child) {
    margin-top: 16.67rpx;
  }
}
}
}
.space-y-30 {
& > view:not(:first-child),
& > text:not(:first-child),
& > image:not(:first-child) {
    margin-top: 20.83rpx;
  }
}
</style>
