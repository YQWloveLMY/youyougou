<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul class="cart-list" v-for="(cart) in carInfoList " :key="cart.id">
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list" :checked="cart.isChecked==1" @change="updateChecked(cart,$event)">
                    </li>
                    <li class="cart-list-con2">
                        <img :src="cart.imgUrl">
                        <div class="item-msg">{{cart.skuName}}</div>
                    </li>

                    <li class="cart-list-con4">
                        <span class="price">{{cart.skuPrice}}</span>
                    </li>
                    <li class="cart-list-con5">
                        <a style="cursor:pointer" class="mins" @click="handler('minus',-1,cart)">-</a>
                        <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,cart)">
                        <a style="cursor:pointer" class="plus" @click="handler('add',1,cart)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{cart.skuPrice*cart.skuNum}}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a class="sindelet" style="cursor:pointer" @click="deleteCartById(cart)">删除</a>
                        <br>
                        <a style="cursor:pointer">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" :checked="isAllChecked&&carInfoList.length>0" @change="updateAllCartChecked">
                <span>全选</span>
            </div>
            <div class="option">
                <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择
                    <span>0</span>件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{totalPrice}}</i>
                </div>
                <div class="sumbtn">
                    <router-link class="sum-btn" to="/trade">结算</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
//引入节流
import throttle from "lodash/throttle";
export default {
    name: "ShopCart",
    mounted() {
        //获取购物车数据
        this.getData();
    },
    methods: {
        //获取个人购物车,并不能直接获取，因为服务器存了太多的用户保存的数据，并不知道你是谁
        getData() {
            this.$store.dispatch("getCartList");
        },

        //修改数量+/-/自定义 这里注意节流，防止用户点击太快
        handler: throttle(async function (type, disNum, cart) {
            //派发action通知服务器修改,通过传递参数来区分是哪一个
            //三个参数为：1.点的+/-/输入框  2.变化个数  3.点的是谁-产品ID
            switch (type) {
                case "add":
                    disNum = 1;
                    break;
                case "minus":
                    if (cart.skuNum > 1) {
                        disNum = -1;
                    } else {
                        // 当产品个数不能再减小的时候，就不变
                        disNum = 0;
                    }
                    break;
                case "change":
                    if (isNaN(disNum) || disNum < 1) {
                        disNum = 0;
                    } else {
                        // 防止小数，返回个服务器用户输入的减去以前的即变化的量
                        disNum = parseInt(disNum) - cart.skuNum;
                    }
                    break;
                default:
                    break;
            }
            try {
                //派发action
                await this.$store.dispatch("AddOrUpdateShopCart", {
                    skuId: cart.skuId,
                    skuNum: disNum,
                });
                this.getData();
            } catch (error) {
                alert(error.message);
            }
        }, 1000),
        //删除购物车的某一项
        async deleteCartById(cart) {
            try {
                await this.$store.dispatch("deleteCartListBySkuId", cart.skuId);
                //删除成功再次发请求
                this.getData();
            } catch (error) {
                alert(error.message);
            }
        },

        //修改某一个产品勾选的状态
        async updateChecked(cart, event) {
            try {
                // 将true、false转换为1，0，因为服务器存的是1，0
                let isChecked = event.target.checked ? "1" : "0";
                await this.$store.dispatch("updateCheckedById", {
                    skuId: cart.skuId,
                    isChecked,
                });

                this.getData();
            } catch (error) {
                alert(error.message);
            }
        },
        //删除选中的商品
        async deleteAllCheckedCart() {
            try {
                //派发删除的action多次
                await this.$store.dispatch("deleteAllCheckedCart");
                this.getData();
            } catch (error) {
                alert(error.message);
            }
        },

        //修改全部产品的选择
        async updateAllCartChecked(event) {
            try {
                //获取当前选中状态
                let isChecked = event.target.checked ? "1" : "0";
                //派发action
                await this.$store.dispatch("updateAllChecked", isChecked);
                this.getData();
            } catch (error) {
                alert(error.message);
            }
        },
    },
    computed: {
        ...mapGetters(["cartList"]),
        //购物车数据
        carInfoList() {
            return this.cartList.cartInfoList || [];
        },
        //计算产品总价
        totalPrice() {
            let sum = 0;
            this.carInfoList.forEach((element) => {
                sum += element.skuNum * element.skuPrice;
            });
            return sum;
        },
        //计算是否全选
        isAllChecked() {
            return this.carInfoList.every((element) => {
                return element.isChecked == 1;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            & > div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                & > li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                .cart-list-con4 {
                    width: 10%;
                }

                .cart-list-con5 {
                    width: 17%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                        text-decoration: none;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                        text-decoration: none;
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>