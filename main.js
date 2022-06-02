import App from './App'
import { routerBeforeEach } from './utils/routerBeforeEach'
// 路由跳转公用方法
uni.$push = routerBeforeEach


import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
