import { defineStore } from 'pinia'
import { ref } from 'vue'
// 定义 Store
export const userMannerInfoStore = defineStore(
  'userInfo',
  () => {
    const UserInfoManner = ref();

    const setUserInfoManner = (val: any) => {
      UserInfoManner.value = val
    }

    const changeUserInfoManner= (val: any) => {
      UserInfoManner.value = val
    }

    const clearUserInfoManner = () => {
      uni.removeStorageSync('userInfo');
    }


    // 记得 return
    return {
      UserInfoManner,
      setUserInfoManner,
      changeUserInfoManner,
      clearUserInfoManner,
    }
  },
  {
    // @ts-ignore
    // 此配置支持小程序本地存储
    persist: {
      storage: {
        getItem(key: string) {
          return uni.getStorageSync(key)
        },
        setItem(key: string, value: any) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
