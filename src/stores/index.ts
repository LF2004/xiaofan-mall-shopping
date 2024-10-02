import { createPinia } from 'pinia'
// @ts-ignore
import persist from 'pinia-plugin-persistedstate'
// 创建pinia实例
const pinia = createPinia()
// @ts-ignore
pinia.use(persist)
// 导出pinia实例，给main使用
export default pinia
// 模块统一导出
export * from './modules/loginStatus';
export * from './modules/userLoginManner';
export * from './modules/userInfo';
export * from './modules/address';
