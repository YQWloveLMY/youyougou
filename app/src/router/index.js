//配置路由
import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//重写push方法,先保存一份
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //如果传递了成功和失败的回调，那么就执行以前自带的哪个push方法，但是此时this指向window，所以得用call修改this指向
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(
            this,
            location,
            //手动调用成功和失败的回调，治本
            () => {},
            () => {}
        );
    }
};
//重写replace
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //如果传递了成功和失败的回调，那么就执行以前自带的哪个push方法，但是此时this指向window，所以得用call修改this指向
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            //手动调用成功和失败的回调，治本
            () => {},
            () => {}
        );
    }
};

//引入路由配置
import routes from "./routes";

let router = new VueRouter({
    //配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        //滚动行为，跳转到新的路由的时候跳转到哪里
        // 始终滚动到顶部
        return { y: 0 };
    },
});

//全局路由守卫
let name = store.state.user.userInfo.name;
router.beforeEach(async (to, from, next) => {
    if (localStorage.getItem("TOKEN")) {
        //先判断是否登录
        if (to.path == "/login" || to.path == "/register") {
            //再判断是不是去登录
            alert("您已登录");
        } else {
            //登录了跳转到其他的模块前需要发送一次请求，防止一刷新就没了
            if (name) {
                next();
            } else {
                try {
                    // 获取用户信息成功
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    //token失效，需要用户重新登录,且清除旧的token
                    store.dispatch("userLogout");
                    next("/login");
                }
            }
        }
    } else {
        //没有登录就是游客：游客不能去结算页面，支付页面，支付成功页面等当点击这些页面的时候就跳转到登录
        let toPath = to.path;
        if (to.path == "/trade" || to.path == "/paysuccess" || to.path == "/pay" || to.path.indexOf("/center") != -1) {
            // 这里是做一个重定向，比如想要去订单，但是发现没登录，就先登录了，然后再去
            //同时要在路由组件中跳转那里设置跳转的地址
            next("/login?redirect=" + toPath);
        } else {
            next();
        }
    }
});

export default router;
