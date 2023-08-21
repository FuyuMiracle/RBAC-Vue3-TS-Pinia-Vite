import { createApp } from 'vue'
import App from './App.vue'

//引入路由
import router from "@/router/index"

//引入全局样式
import '@/style/global.scss'

//引入图标库
import 'remixicon/fonts/remixicon.css' 

//引入图片预览插件
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

//引入pinia
import { setupStore } from '@/store'

//引入自定义指令
import directive from '@/utils/directive';

const app = createApp(App)
setupStore(app)//注册pinia
app.use(VueViewer)//图片预览插件
app.use(router)//注册路由
app.use(directive)//注册自定义指令
app.mount('#app')
