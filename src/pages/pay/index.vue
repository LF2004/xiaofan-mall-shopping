<template>
  <div>
    <returnPage :color="'#000000'" :size="30" class="return"/>
    <p>复制支付连接打开浏览器使用支付宝支付</p>
    <h3 @tap="onCopy(url)">{{url}}</h3>
    <web-view :src="url"></web-view>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {PaySuccesspaymentOrderApi} from '@/services/order';
import returnPage from '@/components/returnPage';

const url = ref('');

// 复制内容
const onCopy = (payUrl: string) => {
  // 设置系统剪贴板的内容
  uni.setClipboardData({ data: payUrl })

  uni.reLaunch({
    url:'/pagesOrder/detail/detail?id=' + uni.setStorageSync('orderId')
  })

}

// 先查询一遍订单支付已经支付完成

const getOrderIsOver = async ()=>{
  const res = await PaySuccesspaymentOrderApi(uni.getStorageSync('orderId'));
  if(res.code === 200) {
    uni.reLaunch({
      url:'/pagesOrder/detail/detail?id=' + uni.getStorageSync('orderId')
    })
  }
}

onMounted(() => {
  url.value = uni.getStorageSync('payUrl')
  getOrderIsOver()
});
</script>

<style>
.return{
  position: absolute;
  left: 10px;
  top: -3%;
}
p{
  margin-top: 10%;
}
h3{
  margin-top: 20%;
  font-size: 16px;
}
</style>
