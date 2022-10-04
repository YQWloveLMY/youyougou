//home模块：Vuex模块化开发
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
const actions = {
    //通过api里面的接口函数调用，向服务器发送请求，获取服务器的数据
    //拿到的是promise数据，所以要用async和await
    async categoryList(context, value) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            context.commit("CATEGORYLIST", result.data);
        }
    },

    //轮播图组件从mock获取数据
    async getBannerList(context, value) {
        let result = await reqGetBannerList();
        if (result.code === 200) {
            context.commit("GETBANNERLIST", result.data);
        }
    },

    async getFloorList(context, value) {
        let result = await reqFloorList();
        if (result.code == 200) {
            context.commit("GETFLOORLIST", result.data);
        }
    },
};
const mutations = {
    //将服务器返回的数据放到state中
    CATEGORYLIST(state, value) {
        state.categoryList = value;
    },

    //mock轮播图数据放到state中
    GETBANNERLIST(start, value) {
        start.bannerList = value;
    },
    //floor轮播图数据放入仓库
    GETFLOORLIST(start, value) {
        start.floorList = value;
    },
};
const state = {
    // 准备数据来接收
    categoryList: [],
    bannerList: [],
    floorList: [],
};
const getters = {
    categoryList(state) {
        //只取服务器返回的前十五项数据，因为这里服务器返回的数据过多会导致溢出
        return state.categoryList.slice(0, 15);
    },
};

export default {
    actions,
    mutations,
    state,
    getters,
};
