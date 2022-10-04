import { reqAddressInfo, reqOrderInfo } from "@/api";
const actions = {
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit("GETUSERADDRESS", result.data);
        }
    },
    //获取商品清单
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code == 200) {
            commit("GETORDERINFO", result.data);
        }
    },
};
const mutations = {
    GETUSERADDRESS(state, value) {
        state.address = value;
    },
    GETORDERINFO(state, value) {
        state.orderInfo = value;
    },
};
const state = {
    address: [],
    orderInfo: {},
};
const getters = {};
export default {
    actions,
    mutations,
    state,
    getters,
};
