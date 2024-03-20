import { createApp } from 'vue'
import { register } from 'swiper/element/bundle'
import 'swiper/css/bundle';
import App from './App.vue'
import './index.css'

register()

const app = createApp(App)

app.mount('#app')
