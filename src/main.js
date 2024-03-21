import {createApp} from 'vue';
import App from './App';
import router from './routes/index.js';
import store from './store/index.js'
import loadImage from './plugins/loadImage'

createApp(App)
    .use(router)    //use(): 플러그인을 연결하는 메소드.
    .use(store)
    .use(loadImage)
    .mount('#app');