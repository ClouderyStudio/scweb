import { createApp } from 'vue'
import App from './App.vue'

// 顺序要注意：m3-ui 的结构令牌先加载（组件自己会引入），
// 然后是站点配色（--md-sys-color-*），最后是站点自己的排版。
import './theme/tokens.css'
import './theme/site.css'

createApp(App).mount('#app')
