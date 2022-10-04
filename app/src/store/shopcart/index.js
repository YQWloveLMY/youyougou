import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api";
const actions = {
    async getCartList(context) {
        let result = await reqCartList();
        if (result.code == 200) {
            context.commit("GETCARTLIST", result.data);
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId(context, value) {
        let result = await reqDeleteCartById(value);
        if (result.code == 200) {
            return "删除成功";
        } else {
            return Promise.reject(new Error("删除失败"));
        }
    },
    //修改购物车某一个产品的选中状态
    async updateCheckedById(context, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked);
        if (result.code == 200) {
            return "修改成功";
        } else {
            Promise.reject(new Error("修改失败"));
        }
    },

    //删除全部选中的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        //通过遍历执行多次
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(element => {
            // 如果选中了那么就删除
            PromiseAll.push(element.isChecked == 1 ? dispatch("deleteCartListBySkuId", element.skuId) : "");
        });
        //通过promise.all来判断，只要有一个失败那么就返回失败
        return Promise.all(PromiseAll);
    },

    //修改全部产品的状态
    updateAllChecked({ dispatch, state }, isChecked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            //全选那么isChecked就都改为1，否则就都改为0
            let promise = dispatch("updateCheckedById", { skuId: item.skuId, isChecked });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    },
};
const mutations = {
    GETCARTLIST(state, value) {
        state.cartList = value;
    },
};
const state = {
    cartList: [],
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    },
    //计算出来的购物车的数据
};
export default {
    mutations,
    actions,
    state,
    getters,
};
