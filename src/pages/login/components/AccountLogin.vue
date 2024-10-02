<template>

  <view class="flex-col justify-start relative page">
    <view class="section"></view>
    <text class="text pos">您好！</text>
    <text class="font text_2 pos_2">欢迎来到小帆购物网</text>
    <view class="flex-col section_2 pos_3">
      <view class="flex-col group">
        <view class="flex-row justify-between self-stretch group_2">
          <text class="font text_4" @click="goUserNameLogin()">手机号登录</text>
          <text class="font text_3" @click="goPasswordLogin()">密码登录</text>
        </view>
        <view class="self-end section_3"></view>
      </view>
      <view class="flex-col group_3">
        <view class="flex-row items-center input">
          <uni-icons type="person" color="#c8cac9" size="24"></uni-icons>
          <input class="ml-2 font_2 text_5" placeholder="请输入用户名" v-model="userParams.uName"/>
        </view>
        <view class="flex-row items-center input mt-19-5">
          <uni-icons type="locked" color="#c8cac9" size="24"></uni-icons>
          <input class="ml-2 font_2 text_5" placeholder="请输入密码" v-model="userParams.uPwd"/>
        </view>
      </view>
      <view class="flex-col group_4">
        <view class="flex-col justify-start items-center button"><text class="font_2 text_7" @click="login()">登录</text></view>
        <view class="flex-row justify-between group_5">
          <text class="font_3 text_8">遇见问题</text>
          <text class="font_3">忘记密码</text>
        </view>
      </view>

    </view>
  </view>
  <uni-popup ref="popup" type="center" background-color="#fff" :mask-click="false">
    <view class="WxLoginPopup">
      <img src="https://www.z4a.net/images/2024/01/06/qrcode_for_gh_994d57b6897e_430.jpg" style="width: 200px;height: 200px">
      <h1>扫描关注<span>乐初购物</span>公众号</h1>
      <p>回复<b>登录</b>即可登录</p>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {userLoginStatusStore, userLoginMannerStatus, userMannerInfoStore} from '@/stores';
import {Login, Enroll, WxIsUserLogin, WxIsUserEnroll,WxFromUserName} from '@/services/login';

const userStore = userLoginStatusStore();
const userInfoStore = userMannerInfoStore();
const userLoginMannerStatusStor = userLoginMannerStatus();
// 密码登录
const goUserNameLogin = ()=>{
  userLoginMannerStatusStor.setLoginManner(0);
}
// 邮箱登录
const goPasswordLogin = ()=>{
  userLoginMannerStatusStor.changeLoginManner(1);
}

const userParams = ref({
  uName:'',
  uPwd:''
});

const login = async ()=>{
  // 保存用户登录状态
  const userStore = userLoginStatusStore();
  const res = await Login(userParams.value);
  if(res.code === 200){
    uni.showToast({ icon: 'success', title: '登录成功!' });
    userStore.setStatus(res.token);
    userInfoStore.setUserInfoManner(res.userInfo);
    uni.reLaunch({
      url:'/pages/my/my'
    })
  }else {
    uni.showToast({ icon: 'error', title: res.msg });
  }
};
const popup = ref(null); // 创建一个名为 "popup" 的 ref
const FromUserName = ref();
const wxGzhLogin = async ()=>{
  popup.value.open('center');
  let intervalId;
  // 校验用户是否完成注册
  intervalId = setInterval(async ()=>{
    const userIsOverEnrollStatus = await WxFromUserName();
    if(userIsOverEnrollStatus.FromUserName){
      FromUserName.value = userIsOverEnrollStatus.FromUserName;
      clearInterval(intervalId);
    }
  },1500)

  let loginIntervalId;
  loginIntervalId = setInterval(async ()=>{
    if(FromUserName.value){
     const loginRes = await WxIsUserLogin(FromUserName.value)
      userStore.setStatus(loginRes.data.token);
      userInfoStore.setUserInfoManner(loginRes.data.userInfo);
      popup.value.close();
      uni.reLaunch({
        url:'/pages/my/my'
      })
      clearInterval(loginIntervalId);
    }
  },2000)

}

</script>

<style lang="scss" scoped>
.WxLoginPopup{
  display: flex;
  width: 370px;
  height: 350px;
  border-radius: 25px;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  span{
    color: #4cd964;
  }
  b{
    color: #dd524d;
  }
}
.mt-19-5 {
  margin-top: 39rpx;
}
.ml-2-5 {
  margin-left: 5rpx;
}
.page {
  background-color: var(--xiaofan-bg-main-color);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  .section {
    width: 750rpx;
    height: 1450rpx;
  }
  .text {
    color: #ffffff;
    font-size: 60rpx;
    font-family: Microsoft YaHei;
    line-height: 58rpx;
  }
  .pos {
    position: absolute;
    left: 80rpx;
    top: 209rpx;
  }
  .font {
    font-size: 35rpx;
    font-family: Microsoft YaHei;
    line-height: 34rpx;
  }
  .text_2 {
    color: #ffffff;
  }
  .pos_2 {
    position: absolute;
    left: 84rpx;
    top: 299rpx;
  }
  .section_2 {
    padding: 74rpx 50rpx 171rpx 62rpx;
    background-color: #ffffff;
    border-radius: 41.9rpx;
    width: 622rpx;
    .group {
      padding: 0 24rpx;
      .group_2 {
        padding-bottom: 4rpx;
        .text_4 {
          color: #000000;
          line-height: 35rpx;
        }
        .text_3 {
          margin-right: 21rpx;
          margin-bottom: 3rpx;
          color: var(--xiaofan-bg-main-color);
        }
      }
      .section_3 {
        margin-right: 61rpx;
        background-color: var(--xiaofan-bg-main-color);
        width: 62rpx;
        height: 3rpx;
      }
    }
    .group_3 {
      margin-top: 58rpx;
      .input {
        padding: 16rpx 24rpx;
        background-color: #F6F7FB;
        border-radius: 20px;
        .image {
          width: 41rpx;
          height: 49rpx;
        }
        .text_5 {
          margin-right: 150rpx;
        }
        .text_6 {
          margin-right: 274rpx;
        }
      }
    }
    .group_4 {
      margin-top: 85rpx;
      .button {
        padding: 30rpx 0 24rpx;
        background-color: var(--xiaofan-bg-main-color);
        border-radius: 25px;
        width: 510rpx;
        .text_7 {
          color: #ffffff;
          line-height: 26rpx;
        }
      }
      .group_5 {
        padding: 23rpx 14rpx 0;
        .font_3 {
          font-size: 28rpx;
          font-family: Microsoft YaHei;
          line-height: 27rpx;
          color: #6b6b6b;
        }
        .text_8 {
          line-height: 28rpx;
        }
      }
    }
    .font_2 {
      font-size: 28rpx;
      font-family: Microsoft YaHei;
      line-height: 27rpx;
      color: #c8cac9;
    }
  }
  .pos_3 {
    position: absolute;
    left: 50%;
    top: 384rpx;
    transform: translateX(-50%);
  }
}
</style>
