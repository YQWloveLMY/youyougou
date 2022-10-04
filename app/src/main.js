import Vue from "vue";
import App from "./App.vue";
//引入路由
import router from "@/router";

//引入vuex
import store from "@/store/index";

//注册三级联动组件为全局组件
import TypeNav from "@/components/TypeNav.vue";
Vue.component(TypeNav.name, TypeNav);

//注册轮播图为全局组件
import Carousel from "@/components/Carousel.vue";
Vue.component(Carousel.name, Carousel);

//注册分页器为全局组件
import Pagination from "@/components/Pagination";
Vue.component(Pagination.name, Pagination);

//关闭生产提示
Vue.config.productionTip = false;

//引入mock虚拟数据
import "@/mock/mockServe";
//引入swiper轮播图样式
import "swiper/css/swiper.css";

//统一接收api文件夹里面全部的请求函数
import * as API from "@/api";

//引入elementui组件：局部引入
import { Button, MessageBox, Message } from "element-ui";
Vue.component(Button.name, Button);
// 提示弹窗效果
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

//引入图片懒加载插件
import VueLazyload from "vue-lazyload";
// 懒加载默认图片
const loadimage = require("@/assets/lazy.gif");
Vue.use(VueLazyload, {
    loading: loadimage,
});

//引入表单验证插件
import "@/plugins/validate";

new Vue({
    render: h => h(App),
    // 会多一个$router
    router,
    //会多一个$store
    store,

    //配置全局事件总线
    beforeCreate() {
        //全局事件总线
        Vue.prototype.$bus = this;
        //API
        Vue.prototype.$API = API;
    },
}).$mount("#app");
