<template>
  <view class="flex-col justify-start relative page">
    <view class="section"></view>
    <text class="text pos">您好！</text>
    <text class="font text_2 pos_2">欢迎来到小帆购物网</text>
    <view class="flex-col section_2 pos_3">
      <view class="flex-col group">
        <view class="flex-row justify-between self-stretch group_2">
          <text class="font text_4" @click="goUserNameLogin()">邮箱登录</text>
          <text class="font text_3" @click="goPasswordLogin()">密码登录</text>
        </view>
        <view class="self-start section_3"></view>
      </view>
      <view class="flex-col group_3">
        <view class="flex-row items-center input">
          <uni-icons type="email" size="20" color="#c8cac9"></uni-icons>
          <input class="font_2 text_5 ml-4-5" v-model="emailParams.uEmail" placeholder="请输入邮箱"/>
        </view>
        <view class="flex-row justify-between items-center input_2 mt-19-5">
          <view class="flex-row">
            <uni-icons type="mail-open" size="20" color="#c8cac9"></uni-icons>
            <input class="font_2 text_5 ml-4-5" v-model="emailParams.code" placeholder="请输入验证码"/>
          </view>
          <view class="flex-col justify-start text-wrapper" style="margin-left: -20px" @click="sendEmailCode()"><text class="font_2 text_6">
            {{ codeMsg }}</text></view>
        </view>
      </view>
      <view class="flex-col group_4">
        <view class="flex-col justify-start items-center button text-wrapper_2">
          <text class="font_2 text_7" @click="EmailLogin()">登录</text>
        </view>
        <view class="self-center group_5 mt-19-5" @click="goUserEnroll()">
          <text class="font_2 text_8">还没有账号？</text>
          <text class="font_2 text_9">立即注册</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {userLoginMannerStatus, userLoginStatusStore, userMannerInfoStore} from '@/stores';
import { ref } from 'vue'
import {GetEmailYamApi,EmailLoginApi} from "@/services/login";
const userLoginMannerStatusStor = userLoginMannerStatus();
const userStore = userLoginStatusStore();
const userInfoStore = userMannerInfoStore();

const emailParams = ref({
  uEmail:'',
  code:''
})

const codeNum = ref(60);
const codeMsg = ref('发送验证码');
const canSendCode = ref(true); // 增加一个变量来表示是否可以发送验证码
// 密码登录
const goUserNameLogin = ()=>{
  userLoginMannerStatusStor.setLoginManner(0);
}
// 邮箱登录
const goPasswordLogin = ()=>{
  userLoginMannerStatusStor.changeLoginManner(1);
}
// 用户注册
const goUserEnroll = ()=>{
  userLoginMannerStatusStor.changeLoginManner(2);
}

// 发送邮箱验证码
const sendEmailCode = async () => {
  if (!canSendCode.value) {
    return; // 如果还未过60秒，则直接返回，不执行发送验证码的逻辑
  }
  const res = await GetEmailYamApi(emailParams.value.uEmail);
  if (res.code === 200) {
    uni.showToast({ icon: 'success', title: res.msg });
    canSendCode.value = false; // 设置为不可发送状态

    let timer = setInterval(() => {
      --codeNum.value;
      codeMsg.value = `重新发送 ${codeNum.value}`;
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      codeNum.value = 60;
      codeMsg.value = '发送验证码';
      canSendCode.value = true; // 设置为可发送状态
    }, 60000);
  }
};

const EmailLogin = async ()=>{
  const res = await EmailLoginApi(emailParams.value);
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
}
</script>

<style lang="scss" scoped>
.ml-4-5 {
  margin-left: 9rpx;
}
.mt-19-5 {
  margin-top: 39rpx;
}
.page {
  background-color: #409efe;
  background-image: linear-gradient(135deg, #409efe 0%, #61aefc 100%);
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
  padding: 74rpx 50rpx 154rpx 62rpx;
  background-color: #ffffff;
  border-radius: 41.9rpx;
  width: 622rpx;
.group {
  padding: 0 34rpx;
.group_2 {
  padding-bottom: 4rpx;
.text_4 {
  color: #67aaee;
  line-height: 35rpx;
}
.text_3 {
  margin-right: 11rpx;
  margin-bottom: 3rpx;
  color: #000000;
}
}
.section_3 {
  background-color: #0f71d499;
  width: 173rpx;
  height: 3rpx;
}
}
.group_3 {
  margin-top: 58rpx;
.input {
  padding: 0.7rem 0.75rem;
  background-color: #F6F7FB;
  border-radius: 20px;
.image {
  width: 26rpx;
  height: 29rpx;
}
.text_5 {
  margin-right: 145rpx;
  line-height: 27rpx;
}
}
.input_2 {
  padding: 0.5rem 0.75rem;
  background-color: #F6F7FB;
  border-radius: 20px;
.image_2 {
  width: 23rpx;
  height: 30rpx;
}
.text-wrapper {
  transform: translateX(-25%);
  padding: 8rpx 0;
  border-left: solid 4rpx #d5d6d8;
.text_6 {
  margin-left: 9rpx;
  color: #71a5de;
  font-size: 29rpx;
}
}
}
}
.group_4 {
  margin-top: 85rpx;
.button {
  align-self: stretch;
.text_7 {
  color: #ffffff;
  line-height: 26rpx;
}
}
.text-wrapper_2 {
  padding: 0.9375rem 0 0.75rem;
  background-color: #409EFE;
  border-radius: 25px;
  width: 15.9375rem;
}
.group_5 {
  line-height: 29rpx;
.text_8 {
  color: #b7b7b7;
}
.text_9 {
  color: #92c1f5;
  line-height: 29rpx;
}
}
}
.font_2 {
  font-size: 28rpx;
  font-family: Microsoft YaHei;
  line-height: 28rpx;
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
