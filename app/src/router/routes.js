//路由配置信息，单独拎出来
//引入路由组件
// import Home from "@/pages/home/IndexHome";
// import Search from "@/pages/search/IndexSearch";
// import Login from "@/pages/Login/Login";
// import Register from "@/pages/Register/Register";
// import Detail from "@/pages/detail/IndexDetail";
// import AddCartSuccess from "@/pages/AddCartSuccess/AddCartSuccess";
// import ShopCart from "@/pages/ShopCart/ShopCart";
// import Trade from "@/pages/Trade/Trade";
// import Pay from "@/pages/Pay/Pay";
// import PaySuccess from "@/pages/PaySuccess/PaySuccess";
// import Center from "@/pages/Center/Center";
// import myOrder from "@/pages/Center/myOrder/myOrder";
// import groupOrder from "@/pages/Center/groupOrder/groupOrder";

//路由懒加载：当用户访问的时候才会执行
// const foo = ()=>{
//     return import('@/pages/home/IndexHome')
// }

export default [
    // home
    {
        path: "/home",
        //路由懒加载：当用户访问的时候才会执行
        component: () => import("@/pages/home/IndexHome"),
        meta: { show: true },
    },
    //search
    {
        name: "search",
        //在注册路由的时候,如果这里占位，切记务必要传递params
        path: "/search/:keyword?",
        component: () => import("@/pages/search/IndexSearch"),

        meta: { show: true },
        // props($route) {
        //     return {
        //         keyword: $route.params.keyword,
        //         k: $route.query.k,
        //     };
        // },
    },
    //login
    {
        //登录
        path: "/login",
        component: () => import("@/pages/Login/Login"),

        meta: { show: false },
    },
    //register
    {
        //注册
        path: "/register",
        component: () => import("@/pages/Register/Register"),

        meta: { show: false },
    },
    //detail
    {
        // 将点击的哪个商品的id从search传递给detail
        path: "/detail/:skuid",
        component: () => import("@/pages/detail/IndexDetail"),

        meta: { show: true },
    },
    //addcartsuccess
    {
        //加入购物车成功
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: () => import("@/pages/AddCartSuccess/AddCartSuccess"),

        meta: { show: true },
    },
    //shopcart
    {
        //购物车
        path: "/shopcart",
        name: "shopcart",
        component: () => import("@/pages/ShopCart/ShopCart"),

        meta: { show: true },
    },
    //trade
    {
        // 结算页面
        path: "/trade",
        name: "trade",
        component: () => import("@/pages/Trade/Trade"),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //要去交易页面必须要从路由车结算而来
            if (from.path == "/shopcart" || from.path == "/login") {
                next();
            } else {
                next(false);
            }
        },
    },
    //pay
    {
        // 支付页面
        path: "/pay",
        name: "pay",
        component: () => import("@/pages/Pay/Pay"),

        meta: { show: true },
        beforeEnter: (to, from, next) => {
            //如果要去支付页面必须要从交易页面来
            if (from.path == "/trade") {
                next();
            } else {
                next(false);
            }
        },
    },
    //paysuccess
    {
        // 支付成功页面
        path: "/paysuccess",
        name: "paysuccess",
        component: () => import("@/pages/PaySuccess/PaySuccess"),

        meta: { show: true },
    },
    //center
    {
        // 个人中心
        path: "/center",
        name: "center",
        component: () => import("@/pages/Center/Center"),

        meta: { show: true },
        // 二级路由
        children: [
            {
                path: "myorder",
                component: () => import("@/pages/Center/myOrder/myOrder"),
            },
            {
                path: "grouporder",
                component: () => import("@/pages/Center/groupOrder/groupOrder"),
            },
            {
                // 重定向
                // 二级路由搭建完毕
                path: "/center",
                redirect: "/center/myorder",
            },
        ],
    },

    //重定向，在项目跑起来的时候，访问/立马访问首页
    {
        path: "*",
        redirect: "/home",
    },
];
