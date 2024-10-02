import { defineStore } from 'pinia'
import { ref } from 'vue'
// 定义 Store
export const userLoginMannerStatus = defineStore(
  'userLoginManner',
  () => {
    const LoginManner = ref();

    const setLoginManner= (val: number) => {
      LoginManner.value = val
    }

    const changeLoginManner= (val: number) => {
      LoginManner.value = val
    }

    const clearLoginManne = () => {
      uni.removeStorageSync('userLoginManner');
    }


    // 记得 return
    return {
      LoginManner,
      setLoginManner,
      changeLoginManner,
      clearLoginManne,
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
