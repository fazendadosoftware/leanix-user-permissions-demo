import { createApp } from 'vue'
import App from './App.vue'
import '@leanix/reporting'

const app = createApp(App)
/* global lx */
app.config.globalProperties.$lx = lx
app.mount('#app')
