import { createApp } from 'vue'
import { register } from 'swiper/element/bundle'
import 'swiper/css/bundle'
import App from './App.vue'
import './index.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

register()

const app = createApp(App).use(Toast)

app.mount('#app')
