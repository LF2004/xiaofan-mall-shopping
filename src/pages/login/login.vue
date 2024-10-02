<template>
  <returnPage :size="30" :color="'#ffffff'"/>
  <AccountLogin v-if="userLoginStatusStore.LoginManner === 1"/>
  <MobilePhoneNumberLogin v-if="userLoginStatusStore.LoginManner === 0"/>
  <UserEnroll v-else/>
</template>

<script setup lang="ts">
import {onLoad} from "@dcloudio/uni-app";
// 导入分类骨架屏
import AccountLogin from '@/pages/login/components/AccountLogin.vue';
// AccountLogin
import MobilePhoneNumberLogin from '@/pages/login/components/MobilePhoneNumberLogin.vue';

import UserEnroll from '@/pages/login/components/UserEnroll.vue';
import returnPage from '@/components/returnPage'
import { userLoginMannerStatus } from '@/stores';

const userLoginStatusStore = userLoginMannerStatus();


</script>

<style lang="scss" scoped>

</style>

