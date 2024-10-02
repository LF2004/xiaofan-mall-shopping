import { defineStore } from 'pinia'
import { ref } from 'vue'
// 定义 Store
export const userAddressInfoStore = defineStore(
  'addressInfo',
  () => {
    const UserAddressInfo = ref();

    const setUserAddressInfo = (val: any) => {
      UserAddressInfo.value = val
    }


    const clearUserAddressInfo = () => {
      uni.removeStorageSync('addressInfo');
    }


    // 记得 return
    return {
      UserAddressInfo,
      setUserAddressInfo,
      clearUserAddressInfo
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
