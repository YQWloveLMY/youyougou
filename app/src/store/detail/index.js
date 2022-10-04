//派发数据
import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";

const actions = {
    //获取数据
    async getGoodInfo(context, value) {
        // 由于从服务器获取数据是一个异步函数，执行回调，根据promise 放在await，同时有await就应该有async,同时用一个参数接收返回值
        let result = await reqGoodsInfo(value);
        if (result.code == 200) {
            context.commit("GETGOODINFO", result.data);
        }
    },
    //将产品添加到购物车中
    async AddOrUpdateShopCart(context, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            // console.log("服务器存储成功");
            // 这里只是让服务器存数据，服务器没有返回数据也不需要返回数据，服务器只是返回了一个存储成功
            //所以并不需要三连环存储数据
            // 给组件返回一个成功或者失败
            return "成功";
        } else {
            return Promise.reject(new Error("请求服务器失败"));
        }
    },
};
const mutations = {
    GETGOODINFO(state, value) {
        state.goodInfo = value;
    },
};
const state = {
    goodInfo: {},
    //游客临时身份,在utils中封装的一个函数
    uuid_token: getUUID(),
};
const getters = {
    categoryView(state) {
        // 不反悔一个空对象会报错，虽然对程序运行没有影响
        //简化路径导航模块
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state) {
        //简化产品信息，如价格等
        return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
        //简化产品售卖属性
        return state.goodInfo.spuSaleAttrList || [];
    },
};
export default {
    actions,
    mutations,
    state,
    getters,
};
