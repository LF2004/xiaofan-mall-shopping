<script setup lang="ts">
import { userLoginStatusStore } from '@/stores';
const userStore = userLoginStatusStore();
const quitLogin = () => {
  uni.showModal({
    content: '是否退出登录?',
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync('userToken');
        uni.removeStorageSync('userInfo');
        userStore.token = userStore.value;
        console.log('退出成功')
        uni.showToast({ icon: 'none', title: '退出成功!' })
        setTimeout(() => {
          uni.switchTab({
            url:'/pages/my/my'
          })
        }, 500)
      }
    },
  })
}
const back = ()=>{
  uni.switchTab({
    url:'/pages/my/my'
  })
}
</script>

<template>
  <uni-icons type="left" size="40" color="#000000" @click="back()" class="return"></uni-icons>
  <view class="viewport" style="margin-top: 5%">
    <!-- 列表1 -->
    <view class="list" v-if="true">
      <navigator
        url="/pagesMember/address"
        hover-class="none"
        class="item arrow"
      >
        我的收货地址
      </navigator>
    </view>
    <!-- 列表2 -->
    <view class="list">
      <button hover-class="none" class="item arrow" open-type="openSetting">
        授权管理
      </button>
      <button hover-class="none" class="item arrow" open-type="feedback">
        问题反馈
      </button>
      <button hover-class="none" class="item arrow" open-type="contact">
        联系我们
      </button>
    </view>
    <!-- 列表3 -->
    <view class="list">
      <navigator hover-class="none" class="item arrow" url=" "
        >关于小帆购物</navigator
      >
    </view>
    <!-- 操作按钮 -->
    <view class="action" v-if="true">
      <view class="button" @tap="quitLogin">退出登录</view>
    </view>
  </view>
</template>

<style lang="scss">
.return{
  position: relative;
  top: 20px;
  z-index: 99;
}
page {
  background-color: #f4f4f4;
}

.viewport {
  padding: 20rpx;
}

/* 列表 */
.list {
  padding: 0 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  .item {
    line-height: 90rpx;
    padding-left: 10rpx;
    font-size: 30rpx;
    color: #333;
    border-top: 1rpx solid #ddd;
    position: relative;
    text-align: left;
    border-radius: 0;
    background-color: #fff;
    &::after {
      width: auto;
      height: auto;
      left: auto;
      border: none;
    }
    &:first-child {
      border: none;
    }
    &::after {
      right: 5rpx;
    }
  }
  .arrow::after {
    content: '\e6c2';
    position: absolute;
    top: 50%;
    color: #ccc;
    font-family: 'erabbit' !important;
    font-size: 32rpx;
    transform: translateY(-50%);
  }
}

/* 操作按钮 */
.action {
  text-align: center;
  line-height: 90rpx;
  margin-top: 40rpx;
  font-size: 32rpx;
  color: #333;
  .button {
    background-color: #fff;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
  }
}
</style>
