import App from './App'
import { routerBeforeEach } from './utils/routerBeforeEach'
import store from './store'
// 路由跳转公用方法
uni.$push = routerBeforeEach

import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
