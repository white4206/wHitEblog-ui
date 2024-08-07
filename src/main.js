import {createApp} from "vue";
import "@/style.css";
import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";
import "@/styles/element/index.scss";
import "@/styles/element/index-dark.scss"
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import directive from "@/directive/index.js";
import CKEditor from '@ckeditor/ckeditor5-vue';
// html Symbol 定义
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvgIcon/index.vue'

const app = createApp(App);
// 全局注册所有图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 注册全局svg组件
app.component('SvgIcon', SvgIcon)

// 自定义指令
directive(app)

app.use(CKEditor) // 全局使用 CKEditor
app.use(ElementPlus, {locale: zhCn,}); // 全局使用 Element-Plus
app.use(store); // 全局使用 Pinia
app.use(router); // 全局使用 Vue-Router

app.mount("#app"); // 挂载节点
