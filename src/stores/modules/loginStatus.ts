import { defineStore } from 'pinia'
import { ref } from 'vue'
// 定义 Store
export const userLoginStatusStore = defineStore(
  'userToken',
  () => {
    // 用户token
    const token = ref();

    // 保存token信息，登录时使用
    const setStatus= (val: boolean) => {
      token.value = val
    }

    // 清理用户token信息，退出时使用
    const clearStatus = () => {
      uni.removeStorageSync('userToken');
    }


    // 记得 return
    return {
      token,
      setStatus,
      clearStatus,
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
