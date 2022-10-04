//search模块：Vuex模块化开发
import { reqGetSearchInfo } from "@/api";
const actions = {
    async getSearchList(context, value = {}) {
        // 这里再调用reqGetSearchInfo()的时候，需要传递参数
        let result = await reqGetSearchInfo(value);
        if (result.code == 200) {
            context.commit("GETSEARCHLIST", result.data);
        }
    },
};
const mutations = {
    GETSEARCHLIST(state, value) {
        state.searchList = value;
    },
};

const state = {
    searchList: {},
};
//计算属性，在项目中为了简化数据而生
const getters = {
    //简化数据以便以后组件中使用
    goodsList(state) {
        // 假如没有网络，那么返回的searchList为一个空对象，空对象.goodsList的值为undefined
        //undefined传递到组件中没办法遍历，所以当为undefined的时候返回一个空数组
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
};

export default {
    actions,
    mutations,
    state,
    getters,
};
