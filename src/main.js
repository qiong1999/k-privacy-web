import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import { store, key } from './stores/index'
import router from './router/index'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'

createApp(App).use(ElementPlus).use(store, key).use(router).mount('#app')
