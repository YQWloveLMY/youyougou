//统一管理api接口
import requests from "./ajax";
// 一定要理解以下内容！！！！结合vuex仓库三连环存储从服务器请求来的数据
// 模式：确定好请求地址与请求方式
// export const 接口名字(自定义) = (传递给服务器的参数，若没有则为空) =>回调函数为二次封装的axios，需要传入url和method参数
//{requests({url:'请求地址',method:'请求方式'})}

//三级联动接口
///api/product/getBaseCategoryList GET请求  无参数
export const reqCategoryList = () => {
    return requests({
        url: "/product/getBaseCategoryList",
        method: "get",
    });
};

//首页大图轮播图接口
import mockRequest from "./mockAjax";
export const reqGetBannerList = () => mockRequest.get("/banner");

//floor轮播图接口
export const reqFloorList = () => mockRequest.get("/floor");

//获取搜索模块数据  请求地址/api/list   请求方式post    需要参数
export const reqGetSearchInfo = params =>
    requests({
        url: "/list",
        method: "post",
        data: params,
    });

//获取产品详情信息的接口 :请求地址/api/item/{ skuId } ：请求方式GET
export const reqGoodsInfo = skuId =>
    requests({
        url: `/item/${skuId}`,
        method: "get",
    });

//将产品添加到购物车中（获取更新某一产品的个数）:/api/cart/addToCart/{ skuId }/{ skuNum } 请求方式POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
    requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: "POST",
    });

//获取购物车列表 /api/cart/cartList 请求方式GET
export const reqCartList = () =>
    requests({
        url: "/cart/cartList",
        method: "GET",
    });

//删除购物车商品 /api/cart/deleteCart/{skuId} 请求方式：DELETE
export const reqDeleteCartById = skuId =>
    requests({
        url: `/cart/deleteCart/${skuId}`,
        method: "DELETE",
    });

//改变商品选中状态 /api/cart/checkCart/{skuId}/{isChecked} 请求方式GET
export const reqUpdateCheckedByid = (skuId, isChecked) =>
    requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: "GET",
    });

//获取验证码 /api/user/passport/sendCode/{phone} 请求方式GET
export const reqGetCode = phone =>
    requests({
        url: `/user/passport/sendCode/${phone}`,
        method: "GET",
    });

//用户注册 /api/user/passport/register 请求方式POST  phone code password
export const reqUserRegister = data =>
    requests({
        url: "/user/passport/register",
        method: "POST",
        data,
    });

//用户登录 /api/user/passport/login 请求方式POST phone password
export const reqUserLogin = data =>
    requests({
        url: "/user/passport/login",
        method: "POST",
        data,
    });

//token字符找服务器要数据 /api/user/passport/auth/getUserInfo 请求方式 GET  由于这里没有运行我们带数据，所以要在请求头里面带
export const reqUserInfo = () =>
    requests({
        url: "/user/passport/auth/getUserInfo",
        method: "GET",
    });

//退出登录 /api/user/passport/logout 请求方式 GET
export const reqLogout = () =>
    requests({
        url: "/user/passport/logout",
        method: "GET",
    });

//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList GET
export const reqAddressInfo = () =>
    requests({
        url: "/user/userAddress/auth/findUserAddressList",
        method: "GET",
    });

//获取商品清单 /api/order/auth/trade GET
export const reqOrderInfo = () =>
    requests({
        url: "/order/auth/trade",
        method: "GET",
    });

//提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo} POST
// 这里以后不再使用vuex三连环来发请求，换一种办法，直接在组件中管理
export const reqSubmitOrder = (tradeNo, data) =>
    requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method: "POST",
    });

//获取订单支付信息 /api/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = orderId =>
    requests({
        url: `/payment/weixin/createNative/${orderId}`,
        method: "GET",
    });

//获取支付成功或者失败 /api/payment/weixin/queryPayStatus/{orderId} GET
export const reqPayStatus = orderId =>
    requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: "GET",
    });

//获取我的订单 /api/order/auth/{page}/{limit} GET
export const reqMyOrderList = (page, limit) =>
    requests({
        url: `/order/auth/${page}/${limit}`,
        method: "GET",
    });
