<script setup lang="ts">
// 获取屏幕边界到安区域距离
import {onLoad, onPullDownRefresh, onShow} from "@dcloudio/uni-app";
import { onMounted, ref } from 'vue';
const { safeAreaInsets } = uni.getSystemInfoSync();
import { userLoginStatusStore,userMannerInfoStore } from '@/stores';
import { GetUserAllOrderAndBrowseNumApi } from "@/services/userInfo"
const loginStatus = ref(false);

const userStore = userLoginStatusStore();
const userInfoStore = userMannerInfoStore();

const goSetting = ()=>{
  uni.reLaunch({
    url:'/pagesMember/settings'
  })
}
const goProfile = ()=>{
  uni.reLaunch({
    url:'/pagesMember/profile'
  })
}

onPullDownRefresh(()=>{
  uni.reLaunch({
    url: '/pages/my/my'
  })
})

const UserAllOrderAndBrowseNum = ref({})

const getUserAllOrderAndBrowseNum = async ()=>{
  const res = await GetUserAllOrderAndBrowseNumApi();
  UserAllOrderAndBrowseNum.value = res
}

onShow(()=>{
  getUserAllOrderAndBrowseNum()
})
</script>

<template>
  <view class="flex-col justify-start relative page" :style="{ marginTop: safeAreaInsets?.top + 'px' }" v-if="userStore.token">
    <uni-icons type="gear" size="40" style="z-index: 999;margin-top: 15px" color="#ffffff" class="setting" @click="goSetting()"></uni-icons>
    <view class="flex-col justify-start items-end section_2 pos">
      <view class="flex-col items-start section_3" id="move1">
        <image
          class="image"
          id="avatar"
          style="border-radius: 35px"
          :src="userInfoStore.UserInfoManner.avatar"
        />
        <text class="mt-8 text" id="uname">{{ userInfoStore.UserInfoManner.NickName }}</text>
      </view>
      <image src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6584fd90bddbb7001184a142/17033402824611345930.png" class="bgImg2"/>
      <view class="flex-row equal-division" style="z-index: 2">
        <view class="flex-row justify-evenly equal-division-item section_4">
          <uni-icons type="vip" size="16" color="#ffffff" style="transform: translate(-3px,-3px)"></uni-icons>
          <text class="font">高级认证</text>
        </view>
        <view class="flex-row justify-evenly items-center equal-division-item section_4 ml-8-5">
          <view class="flex-col justify-start items-center relative group">
            <text class="font_2">v</text>
            <uni-icons type="compose" size="16" color="#ffffff" style="transform: translate(-3px,-3px)"></uni-icons>
          </view>
          <text class="font" @click="goProfile()">编辑资料</text>
        </view>
      </view>
    </view>
    <image
      class="image_2 pos_2"
      src="/static/images/my_bg2.png"
    />
    <view class="flex-row items-start equal-division_2 section_7">
      <navigator url="/pages/goods/components/BrowseList?type=0">
      <view class="flex-col group_3 equal-division-item_2">
        <text class="self-center font_3">{{ UserAllOrderAndBrowseNum?.collectionNum }}</text>
        <text class="self-start font_4 mt-13">收藏记录</text>
      </view>
      </navigator>
    <navigator url="/pagesOrder/list/list">
      <view class="flex-col group_3 equal-division-item_2">
        <text class="self-center font_3">{{ UserAllOrderAndBrowseNum?.orderNum }}</text>
        <text class="self-start font_4 mt-13">订单总数</text>
      </view>
    </navigator>
      <navigator url="/pages/goods/components/BrowseList?type=1">
      <view class="flex-col group_3 equal-division-item_2">
        <text class="self-center font_3">{{ UserAllOrderAndBrowseNum?.browseNum }}</text>
        <text class="self-start font_4 mt-13">历史记录</text>
      </view>
      </navigator>
    </view>
    <view class="flex-row equal-division_3 section_8">
      <navigator url="/pagesOrder/list/list">
      <view class="flex-col items-center equal-division-item_4">
        <image
          class="image_4"
          src="/static/images/order.png"
        />
        <text class="font_5 mt-9">订单</text>
      </view>
      </navigator>

      <view class="flex-col items-center equal-division-item_4">
        <image
          class="image_4"
          src="/static/images/logistics.png"
        />
        <text class="font_5 mt-9">物流</text>
      </view>

      <view class="flex-col items-center equal-division-item_4">
        <image
          class="image_4"
          src="/static/images/purse.png"
        />
        <text class="font_5 mt-9">钱包</text>
      </view>

      <view class="flex-col items-center equal-division-item_4">
        <image
          class="image_4"
          src="/static/images/customer.png"
        />
        <text class="font_5 mt-9">客服</text>
      </view>
    </view>


    <view class="flex-col section_9 pos_5">
      <view class="flex-row justify-between items-center group_9">
        <view class="flex-row items-center">
          <uni-icons type="flag" size="26"></uni-icons>
          <text class="font_6 ml-13">优惠券</text>
        </view>
      </view>
      <view class="flex-row justify-between items-center group_10">
        <view class="flex-row items-center">
          <uni-icons type="shop" size="26"></uni-icons>
          <text class="font_6 text_4 ml-10-5">积分商城</text>
        </view>
      </view>
      <view class="flex-row justify-between items-center group_11">
        <view class="flex-row items-center">
          <uni-icons type="wallet" size="26"></uni-icons>
          <text class="font_6 ml-12-5">我的钱包</text>
        </view>
      </view>
      <view class="flex-row justify-between items-center group_12">
        <view class="flex-row items-center">
          <uni-icons type="chat" size="26"></uni-icons>
          <text class="font_6 text_5 ml-11-5">意见反馈</text>
        </view>
      </view>
    </view>
  </view>


  <view class="flex-col justify-start relative page" :style="{ marginTop: safeAreaInsets?.top + 'px' }" v-else>
    <view class="flex-col justify-start items-end section_2 pos">
      <view class="flex-col items-start section_3">
        <uni-icons type="contact" size="50" color="#ffffff" style="margin-left: 3%"></uni-icons>
        <text class="mt-8 text" style="padding-left: 10px" >未登录</text>
      </view>
    </view>

    <navigator url="/pages/login/login">
      <view class="flex-col justify-start items-center button text-wrapper_2" style="transform: translateY(-550px)">
        <text class="font_6 text_6">登录</text>
      </view>
    </navigator>


  </view>

  <FanGuessLikeComponents :style="{ marginTop: safeAreaInsets?.top + 'px' }" style="transform: translateY(-30%)"  v-if="!userStore.token"/>
</template>

<style lang="scss">
@keyframes slidein {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
@keyframes move1 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.bgImg2{
  width: 258px;
  height: 240px;
  position: absolute;
  z-index: 1;
  animation-duration: .3s;
  animation-name: move1;
}
#avatar{
  animation-duration: .3s;
  animation-name: slidein;
}
#uname{
  position: absolute;
  top: 50%;
  left: 0%;
  width: 100%;
  text-align: center;
  animation-duration: .3s;
  animation-name: slidein;
}
.ml-8-5 {
  margin-left: 16.35rpx;
}
.mt-13 {
  margin-top: 25rpx;
}
.mt-12-5 {
  margin-top: 24.04rpx;
}
.mt-9 {
  margin-top: 17.31rpx;
}
.mt-10-5 {
  margin-top: 20.19rpx;
}
.ml-13 {
  margin-left: 25rpx;
}
.ml-10-5 {
  margin-left: 20.19rpx;
}
.ml-12-5 {
  margin-left: 24.04rpx;
}
.ml-11-5 {
  margin-left: 22.12rpx;
}
.setting{
  position: absolute;
  top: 2%;
  right: 5%;
}
.page {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  .section {

    width: 750rpx;
    height: 1623.08rpx;
  }
  .section_2 {
    padding-bottom: 128.85rpx;
    background-image: linear-gradient(0deg, #3673e9 0%, #3270e7 100%);
    .section_3 {
      z-index: 2;
      padding: 122.12rpx 34.62rpx 132.69rpx;
      width: 472.12rpx;
      .image {
        width: 125rpx;
        height: 125rpx;
      }
      .text {
        color: #ffffff;
        font-size: 28.85rpx;
        font-family: Microsoft YaHei;
        font-weight: 700;
      }
    }
    .equal-division {
      position: absolute;
      right: 205.77rpx;
      top: 328.85rpx;
      animation-duration: .3s;
      animation-name: move1;
      .equal-division-item {
        flex: 1 1 152.88rpx;
        .group_2 {
          padding: 3.85rpx 0;
          width: 23.08rpx;
          .section_6 {
            background-color: #ffffff;
            width: 16.35rpx;
            height: 16.35rpx;
          }
          .text-wrapper {
            padding: 5.77rpx 0;
            background-image: url('https://ide.code.fun/api/image?token=6586880fbddbb7001184caa8&name=05d9af34ccac06e86f1717212b79f404.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            width: 23.08rpx;
          }
          .pos_4 {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
          }
        }
        .font {
          font-size: 23.08rpx;
          font-family: Microsoft YaHei;
          line-height: 22.12rpx;
          color: #ffffff;
        }
        .group {
          padding: 8.65rpx 0 5.77rpx;
          width: 24.04rpx;
          .image_3 {
            width: 24.04rpx;
            height: 25rpx;
          }
          .pos_3 {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
          }
        }
        .font_2 {
          font-size: 17.31rpx;
          font-family: Microsoft YaHei;
          line-height: 10.58rpx;
          font-weight: 700;
          color: #70a4f7;
        }
      }
      .section_4 {
        padding: 9.62rpx 13.46rpx 9.62rpx 17.31rpx;
        background-color: var(--xiaofan-bg-unimportant-color);
        border-radius: 19.23rpx;
        height: 43.27rpx;
      }
      .section_5 {
        padding: 9.62rpx 10.58rpx 9.62rpx 17.31rpx;
        background-color: v-bind(--xiaofan-bg-unimportant-color);
        border-radius: 19.23rpx;
        height: 43.27rpx;
      }
    }
  }
  .pos {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }
  .image_2 {
    width: 134.62rpx;
    height: 415.38rpx;
  }
  .pos_2 {
    position: absolute;
    left: 0;
    top: 175rpx;
    animation-duration: .3s;
    animation-name: move1;
  }
  .equal-division_2 {
    position: absolute;
    left: 47.12rpx;
    right: 28.83rpx;
    top: 436.54rpx;
    .group_3 {
      margin-left: 5.77rpx;
    }
    .equal-division-item_2 {
      padding: 30rpx 42.31rpx;
      width: 220.67rpx;
    }
    .equal-division-item_3 {
      position: absolute;
      left: 50%;
      top: 15rpx;
      transform: translateX(-50%);
    }
    .group_4 {
      padding: 11.54rpx 0;
      width: 220.67rpx;
    }
    .font_3 {
      transform: translateX(-10px);
      font-size: 46.15rpx;
      font-family: Microsoft YaHei;
      line-height: 35.58rpx;
      color: #ffffff;
    }
    .font_4 {
      font-size: 28.85rpx;
      font-family: Microsoft YaHei;
      line-height: 27.88rpx;
      color: #ffffff;
    }
    .group_5 {
      position: absolute;
      right: 6rpx;
      top: 15rpx;
      .text_2 {
        line-height: 28.85rpx;
      }
    }
  }
  .section_7 {

    backdrop-filter: blur(20px);
    border-radius: 19.23rpx;
  }
  .equal-division_3 {
    position: absolute;
    left: 38.46rpx;
    right: 37.5rpx;
    top: 646.15rpx;
    .equal-division-item_4 {
      padding: 9.62rpx 0 11.54rpx;
      width: 163.79rpx;
    }
    .group_6 {
      margin-left: 330.77rpx;
    }
    .equal-division-item_5 {
      padding: 9.62rpx 0;
      width: 163.79rpx;
    }
    .image_4 {
      border-radius: 32.69rpx;
      width: 96rpx;
      height: 96rpx;
    }
    .font_5 {
      font-size: 23.08rpx;
      font-family: Microsoft YaHei;
      line-height: 22.12rpx;
      color: #757679;
    }
    .group_7 {
      position: absolute;
      right: 173.33rpx;
      top: 0;
    }
    .group_8 {
      position: absolute;
      right: 9.54rpx;
      top: 0;
    }
    .text_3 {
      line-height: 23.08rpx;
    }
  }
  .section_8 {
    padding: 0 7.69rpx 11.54rpx;
    background-color: #ffffff;
    box-shadow: 0.6rpx 2.83rpx 6.73rpx #0000000f;
    border-radius: 19.23rpx;
    border-left: solid 0.96rpx #71adff1c;
    border-right: solid 0.96rpx #71adff1c;
    border-top: solid 0.96rpx #71adff1c;
    border-bottom: solid 0.96rpx #71adff1c;
  }
  .section_9 {
    padding: 7.69rpx 53.85rpx 19.23rpx;
    background-color: #ffffff;
    box-shadow: 0.6rpx 2.83rpx 6.73rpx #0000000f;
    border-radius: 19.23rpx;
    border-left: solid 0.96rpx #71adff1c;
    border-right: solid 0.96rpx #71adff1c;
    border-top: solid 0.96rpx #71adff1c;
    border-bottom: solid 0.96rpx #71adff1c;
    .group_9 {
      padding: 40.38rpx 2.88rpx 25rpx;
    }
    .group_10 {
      margin-top: 5.77rpx;
      padding: 27.88rpx 0 25rpx;
      border-top: solid 1.92rpx #f0f5f7;
      border-bottom: solid 1.92rpx #f0f5f7;
      .image_7 {
        width: 38.46rpx;
        height: 41.35rpx;
      }
      .text_4 {
        line-height: 25.96rpx;
      }
      .image_8 {
        margin-right: 5.77rpx;
      }
    }
    .image_6 {
      width: 13.46rpx;
      height: 24.04rpx;
    }
    .group_11 {
      padding: 32.69rpx 2.88rpx;
      border-bottom: solid 1.92rpx #f0f5f7;
    }
    .image_5 {
      width: 31.73rpx;
      height: 27.88rpx;
    }
    .group_12 {
      padding: 28.85rpx 0;
      border-bottom: solid 1.92rpx #f0f5f7;
      .image_9 {
        width: 38.46rpx;
        height: 35.58rpx;
      }
      .text_5 {
        line-height: 25.96rpx;
      }
      .image_10 {
        margin-right: 3.85rpx;
      }
    }
  }
  .pos_5 {
    position: absolute;
    left: 38.46rpx;
    right: 37.5rpx;
    top: 846.15rpx;
  }
  .button {
    position: absolute;
    left: 50rpx;
    right: 28.83rpx;
    top: 1450.85rpx;
    .text_6 {
      color: #ffffff;
    }
  }
  .text-wrapper_2 {
    padding: 35.58rpx 0 31.73rpx;
    background-image: linear-gradient(87deg, #6fc8fd 0%, #347bf1 78%, #347bf1 100%);
    border-radius: 43.75rpx;
  }
  .font_6 {
    font-size: 26.92rpx;
    font-family: Microsoft YaHei;
    line-height: 25rpx;
    color: #363b47;
  }
}

</style>
