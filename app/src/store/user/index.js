//登录与注册模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            //这里是把后台生成的数据（假的验证码）返回了
            commit("GETCODE", result.data);
            return "返回验证码成功";
        } else {
            return Promise.reject(new Error("返回验证码失败"));
        }
    },
    //注册用户的地方
    async registerUser({ commit }, obj) {
        //注册接口没有返回data,不需要提交mutation

        let result = await reqUserRegister(obj);
        // console.log(result);
        if (result.code == 200) {
            //注册成功
            return "注册成功";
        } else {
            //注册失败
            return Promise.reject(new Error(result.message));
        }
    },
    //用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        // console.log(result);
        // 服务器会下发一个token，是每个用户的唯一标识,携带用户token找服务器要数据
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            //本地持久化存储
            localStorage.setItem("TOKEN", result.data.token);
            return "登录成功";
        } else {
            return Promise.reject(new Error("账号或密码错误"));
        }
    },

    /* 
        目前还有的问题bug   9.29
        1.多个组件如何刷新后都还有已经登录的用户信息，但是不要每个组件都去派发
        2.已经登录了之后没有退出之前不可以再登录（路由守卫解决）
    
    */

    //获取了用户的token，根据用户的token来获取用户信息并且显示
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("GETUSERINFO", result.data);

            return "获取用户信息成功";
        } else {
            return Promise.reject(new Error("获取用户信息失败"));
        }
    },

    //退出登录
    async userLogout({ commit }) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit("CLEAR");
        }
    },
};
const mutations = {
    GETCODE(state, value) {
        state.code = value;
    },
    USERLOGIN(state, value) {
        state.token = value;
    },
    GETUSERINFO(state, value) {
        state.userInfo = value;
    },
    CLEAR(state) {
        //清除本地数据
        state.token = "";
        state.userInfo = {};
        localStorage.removeItem("TOKEN");
    },
};
const state = {
    code: "",
    // 读取本地存储的token
    token: localStorage.getItem("TOKEN"),

    userInfo: {},
};
const getters = {};
export default {
    actions,
    mutations,
    state,
    getters,
};
