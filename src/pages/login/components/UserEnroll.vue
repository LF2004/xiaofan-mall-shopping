<template>
  <view class="flex-col justify-start relative page">
    <view class="section"></view>
    <text class="text pos">您好！</text>
    <text class="font text_2 pos_2">欢迎来到小帆购物网</text>
    <view class="flex-col section_2 pos_3">
      <view class="flex-col group">
        <view class="flex-row justify-between self-stretch group_2">
          <text class="font text_3">注册</text>
          <text class="font text_4" @click="goUserLogin()">登录</text>
        </view>
        <view class="self-start section_3"></view>
      </view>
      <view class="flex-col group_3">
        <view class="flex-row items-center input section_4">
          <uni-icons type="email" size="20" color="#c8cac9"></uni-icons>
          <input class="font_2 text_5 ml-4-5" type="text" placeholder="请输入qq邮箱" v-model="userParams.uEmail"/>
        </view>
        <view class="flex-col group_4">
          <view class="flex-row justify-between items-center input section_5">
            <view class="flex-row">
              <uni-icons type="mail-open" size="20" color="#c8cac9"></uni-icons>
              <input class="font_2 text_5 ml-4-5" v-model="userParams.code" type="text" placeholder="请输入验证码"/>
            </view>
            <view class="flex-col justify-start text-wrapper" @click="sendEmailCode()"><text class="font_2 text_6">
              {{ codeMsg }}</text></view>
          </view>
          <view class="flex-row justify-between items-center input section_5" style="transform: translateY(15px)">
            <view class="flex-row">
              <uni-icons type="locked" size="20" color="#c8cac9"></uni-icons>
              <input class="font_2 text_5 ml-4-5" type="text" placeholder="请输入密码" v-model="userParams.uPwd"/>
            </view>
          </view>
        </view>
      </view>
      <view class="flex-col justify-start items-center button text-wrapper_3" @click="enroll()">
        <text class="font_2 text_8">注册登录</text>
      </view>

      <view class="flex-col justify-start items-center button text-wrapper_3" style="background-color: #00df4c" @click="wxEnroll()">
        <text class="font_2 text_8">微信公众号注册</text>
      </view>


    </view>
  </view>

  <uni-popup ref="popup" type="center" background-color="#fff" :mask-click="false">
    <view class="WxLoginPopup">
      <img src="/static/images/qrcode_for_gh_994d57b6897e_430.jpg" style="width: 200px;height: 200px">
      <h1>扫描关注<span>小帆购物</span>公众号</h1>
      <p>回复<b>注册</b>即可注册登录</p>
    </view>
  </uni-popup>

</template>

<script setup lang="ts">
import { userLoginStatusStore,userLoginMannerStatus,userMannerInfoStore } from '@/stores';
import returnPage from '@/components/returnPage'
import { ref } from 'vue'
import { Login,Enroll,WxUserEnroll,WxUserLogin,WxIsUserEnroll,GetEmailYamApi,VerifyEmailYzmApi } from '@/services/login';
const userLoginMannerStatusStor = userLoginMannerStatus();
const userStore = userLoginStatusStore();
const userInfoStore = userMannerInfoStore();
// 密码登录
const goUserLogin = ()=>{
  userLoginMannerStatusStor.setLoginManner(0);
}
const codeNum = ref(60);
const codeMsg = ref('发送验证码');

const isShowWxLoginProp = ref(false);
const userParams = ref({
  uEmail:'',
  uPwd:'',
  code:''
});

// 发送邮箱验证码
const sendEmailCode = async ()=>{
  const res = await GetEmailYamApi(userParams.value.uEmail);
  if(res.code === 200){
    uni.showToast({ icon: 'success', title: res.msg });
    let timer = setInterval(() => {
      --codeNum.value
      codeMsg.value = `重新发送 ${codeNum.value}`
    }, 1000)
    setTimeout(() => {
      clearInterval(timer)
      codeNum.value = 60
      odeMsg.value = '发送验证码'
    }, 60000);
  }

};

const login = async ()=>{
  // 保存用户登录状态
  const res = await Login({
    uName:userParams.value.uEmail,
    uPwd:userParams.value.uPwd
  });
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
// 注册用户
const enroll = async ()=>{
  const res = await VerifyEmailYzmApi(userParams.value);
  if(res.code === 200){
    uni.showToast({ icon: 'success', title: '注册成功!' });
    login();
  }else {
    uni.showToast({ icon: 'error', title: res.msg });
  }
};

const popup = ref(null); // 创建一个名为 "popup" 的 ref

// 公众号注册
const wxEnroll = async ()=> {
  popup.value.open('center');
  let isSend = false;
  const res = await WxUserEnroll();
  uni.setStorageSync('verifyCode',res.verifyCode)
  // 获取到 verifyCode保存到本地
  if(res.code === 200){
    const userEnrollStatus = await WxUserLogin(res.verifyCode);
    if(userEnrollStatus.code === 200){
      // 开始轮询用户公众号注册结果
      const verifyCode = uni.getStorageSync('verifyCode');
      let intervalId;
      // 校验用户是否完成注册
      intervalId = setInterval(async ()=>{
        const userIsOverEnrollStatus = await WxIsUserEnroll(verifyCode);
        if(userIsOverEnrollStatus.code === 200){
          clearInterval(intervalId);
          uni.clearStorage('verifyCode');
          userStore.setStatus(userIsOverEnrollStatus.data.token);
          userInfoStore.setUserInfoManner(userIsOverEnrollStatus.data.userInfo);
          popup.value.close();
          uni.reLaunch({
            url:'/pages/my/my'
          })
        }
      },1500)

    }
  }
}

</script>

<style lang="scss" scoped>
.ml-4-5 {
  margin-left: 9rpx;
}
.mt-13 {
  margin-top: 26rpx;
}
.page {
  background-color: #409efe;
  background-image: linear-gradient(135deg, #409efe 0%, #61aefc 100%);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  .section {
    background-color: #409efe;
    background-image: linear-gradient(135deg, #409efe 0%, #61aefc 100%);
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
    padding: 75rpx 50rpx 150rpx 57rpx;
    background-color: #ffffff;
    border-radius: 41.9rpx;
    width: 622rpx;
    .group {
      padding: 0 39rpx;
      .group_2 {
        padding-bottom: 5rpx;
        .text_3 {
          color: #67aaee;
          line-height: 35rpx;
        }
        .text_4 {
          margin-right: 76rpx;
          color: #000000;
          line-height: 33rpx;
        }
      }
      .section_3 {
        background-color: #0f71d499;
        width: 69rpx;
        height: 3rpx;
      }
    }
    .group_3 {
      margin-top: 58rpx;
      .input {
        margin-left: 5rpx;
        .image {
          width: 26rpx;
          height: 29rpx;
        }

        .image_2 {
          width: 23rpx;
          height: 30rpx;
        }
        .text-wrapper {
          transform: translateX(-45%);
          padding: 8rpx 0;
          border-left: solid 4rpx #d5d6d8;
          .text_6 {
            color: #71a5de;
            font-size: 29rpx;
          }
        }
      }
      .section_4 {
        padding: 27rpx 35rpx 24rpx;
        background-color: #F6F7FB;
        border-radius: 20px;
      }
      .group_4 {
        padding-top: 39rpx;
        .section_5 {
          padding: 21rpx 35rpx 17rpx 39rpx;
          background-color: #F6F7FB;
          border-radius: 20px;
        }
        .input_2 {
          margin-right: 5rpx;
          .text_7 {
            margin-left: 68rpx;
            line-height: 27rpx;
          }
        }
        .text-wrapper_2 {
          padding: 26rpx 0;
          background-color: #F6F7FB;
          border-radius: 20px;
          width: 510rpx;
        }
      }
    }
    .button {
      margin-left: 5rpx;
      margin-top: 51rpx;
      .text_8 {
        color: #ffffff;
      }
    }
    .text-wrapper_3 {
      padding: 0.9375rem 0 0.75rem;
      background-color: #409EFE;
      border-radius: 25px;
      width: 15.9375rem;
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
};
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
</style>
