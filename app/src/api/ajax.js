//对axios进行二次封装
import axios from "axios";
//引入进度条和进度条样式
import nprogress from "nprogress";
import "nprogress/nprogress.css";
//在当前模块中引入vuex仓库，因为要拿到detail中的游客的id数据
import store from "@/store";

//1.利用axios对象的方法create，去创建一个axios实例
//2.request就是axios，只不过需要稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发送请求的时候，路径当中会出现api
    baseURL: "/api",
    //代表请求超时的时间
    timeout: 5000,
});
//请求拦截器
requests.interceptors.request.use(config => {
    //config:配置对象，其中的headers很重要
    //进度条开始动
    nprogress.start();
    //
    if (store.state.detail.uuid_token) {
        //如果有这个id，则给请求头添加一个字段带给服务器(userTempId),这个字段是后台服务器确定的
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //需要携带token带给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }
    return config;
});
//响应拦截器
requests.interceptors.response.use(
    res => {
        //成功的回调
        //进度条结束
        nprogress.done();
        return res.data;
    },
    err => {
        //失败的回调
        return Promise.reject(new Error("faile"));
    }
);

export default requests;
