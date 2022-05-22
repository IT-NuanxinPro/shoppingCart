import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementPlus from 'element-plus';  // 引入element-plus
import "element-plus/dist/index.css";    // 引入element-plus样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app  = createApp(App);
app.use(ElementPlus);


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
} // 引入element-plus图标

app.use(store).use(router).mount('#app')
