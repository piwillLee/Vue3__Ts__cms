import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './stores'

// 导入css 重置css样式
import 'normalize.css'
import '@/assets/css/index.less'

// 全局引入El的样式（不推荐）
// import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

/**
 * 状态管理
 */
app.use(store)
/**
 * 使用路由
 */
app.use(router)

app.mount('#app')
