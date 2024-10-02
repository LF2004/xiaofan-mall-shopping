<template>
  <view class="return" @click="back()">

    <uni-icons type="left" :size="size" :color="color"></uni-icons>
  </view>
</template>

<script setup lang="ts">



defineProps<{
  color: string,
  size:string,
}>()


const back = ()=>{
  uni.navigateBack({
    delta:1,//返回层数，2则上上页
  })

}
</script>

<style scoped>
.return{
  position: absolute;
  top: 2%;
  z-index: 999;
}
</style>
