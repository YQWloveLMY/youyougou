<template>
    <div>
        <TypeNav />
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <!-- 面包屑效果 -->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <!-- 分类面包屑 -->
                        <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
                        <!-- 用户输入的关键字面包屑 -->
                        <li class="with-x" v-show="searchParams.keyword">{{ searchParams.keyword }}<i @click="removekeyword">×</i></li>
                        <!-- 品牌的面包屑 -->
                        <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
                        <!-- 平台的售卖的属性值展示 -->
                        <!-- 由于这里是可以选很多项，即props是一个数组，所有不能再是一个单纯的v-if，是要遍历了 -->
                        <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">{{attrValue.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>
                    </ul>
                </div>

                <!--selector-->
                <SearchSelector @trademarkInfo='trademarkInfo' @attrInfo="attrInfo" />

                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li :class="{active:isOne}" @click="changeOrder('1')">
                                    <!-- 谁有类名，谁就有这个箭头以及红色底色 -->
                                    <a href="javascript:;">综合<span v-show="isOne" class="iconfont " :class="{'icon-long-arrow-down':isDesc,'icon-long-arrow-up':isAsc}"></span></a>
                                </li>
                                <li :class="{active:isTwo}" @click="changeOrder('2')">
                                    <a href="javascript:;">价格<span v-show="isTwo" class="iconfont " :class="{'icon-long-arrow-down':isDesc,'icon-long-arrow-up':isAsc}"></span></a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="(good) in goodsList" :key="good.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <!-- 跳转到商品详情页并且带过去params参数 -->
                                        <router-link :to="`/detail/${good.id}`"><img v-lazy="good.defaultImg" /></router-link>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>&nbsp
                                            <i>{{good.price}}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <!-- 分页器 -->
                    <Pagination :pageNo='searchParams.pageNo' :pageSize='searchParams.pageSize' :total='total' :continues='5' @getPageNo="getPageNo" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchSelector from "./SearchSelector.vue";
import { mapGetters, mapState } from "vuex";
export default {
    name: "Search",
    data() {
        return {
            searchParams: {
                //带给服务器的参数
                // 一级分类
                category1Id: "",
                // 二级分类
                category2Id: "",
                // 三级分类
                category3Id: "",
                // 分类名字
                categoryName: "",
                //关键字
                keyword: "",
                //排序:初始值为综合降序
                order: "1:desc",
                // 当前是第几页，默认为1
                pageNo: 1,
                // 每一页有多少条数据
                pageSize: 10,
                //平台售卖属性的参数
                props: [],
                //品牌
                trademark: "",
            },
        };
    },

    components: {
        SearchSelector,
    },
    beforeMount() {
        //组件挂载完毕之前执行一次
        // this.searchParams.category1Id = this.$route.query.category1Id;
        // this.searchParams.category2Id = this.$route.query.category2Id;
        // this.searchParams.category3Id = this.$route.query.category3Id;
        // this.searchParams.categoryName = this.$route.query.categoryName;
        // this.searchParams.keyword = this.$route.params.keyword;

        // **********************************************
        //9.19结束在这里：有点问题：目前手机模块并不能根据输入的华为返回对应的手机，返回的数据很多
        //原因：好像是因为返回的数据有问题，返回的数据goodsList中并没有这些选项了，有空自己做数据
        // **********************************************

        // 用如下会方便很多
        Object.assign(this.searchParams, this.$route.query, this.$route.params);

        // console.log("发送请求之前", this.searchParams);
    },
    mounted() {
        //由于每次用户发起请求都需要传递参数到服务器返回对应数据，所以这里请求数据不能放在mounted里面
        // this.$store.dispatch("getSearchList", {});
        //在发请求之前带给服务器参数，且searchParams参数发生变化有数值带给服务器
        this.getDate();
    },
    computed: {
        ...mapGetters(["goodsList", "trademarkList", "attrsList"]),

        //计算排序的class类名应该显示在哪一个上面
        isOne() {
            return this.searchParams.order.indexOf("1") != -1;
        },
        isTwo() {
            return this.searchParams.order.indexOf("2") != -1;
        },
        isAsc() {
            return this.searchParams.order.indexOf("asc") != -1;
        },
        isDesc() {
            return this.searchParams.order.indexOf("desc") != -1;
        },

        //获取一共有多少数据
        ...mapState({
            total: (state) => state.search.searchList.total,
        }),
    },
    methods: {
        //向服务器发送请求，获取数据，放在一个函数里
        getDate() {
            this.$store.dispatch("getSearchList", this.searchParams);
            // this.$store.dispatch("getSearchList");
        },

        removeCategoryName() {
            //点击小叉号就删除,但是这里只是把面包屑删了，但是地址栏路径还没有变化
            this.searchParams.categoryName = "";

            //删除之后还需要再发一次请求
            this.searchParams.category1Id = undefined;
            this.searchParams.category2Id = undefined;
            this.searchParams.category3Id = undefined;
            this.getDate();

            //修改地址栏,将对应参数去掉方法：自己跳转自己，但是需要注意，只能去掉query参数，不能去掉params参数
            if (this.$route.params) {
                this.$router.push({
                    name: "search",
                    params: this.$route.params,
                });
            } else {
                this.$router.push({ name: "search" });
            }
        },
        removekeyword() {
            //删除输入搜索的关键字
            this.searchParams.keyword = undefined;

            if (this.$route.query) {
                this.$router.push({ name: "search", query: this.$route.query });
            } else {
                this.$router.push({ name: "search" });
            }

            this.getDate();

            //通知兄弟组件header中清除输入框中的内容
            this.$bus.$emit("clear");
        },

        //自定义事件回调
        trademarkInfo(trademark) {
            //整理参数
            this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
            this.getDate();
        },
        removeTrademark() {
            //删除选择品牌的面包屑
            this.searchParams.trademark = undefined;
            this.getDate();
        },

        //收集平台属性的回调
        attrInfo(attrId, attrName, attrValue) {
            //子组件传递的数据
            // 服务器传参的要求"属性ID:属性值:属性名"
            let props = `${attrId}:${attrValue}:${attrName}`;
            if (this.searchParams.props.indexOf(props) == -1) {
                // 判断数组中是否已经有这个数据，如果有，那么就不要再push了
                this.searchParams.props.push(props);
            }

            this.getDate();
        },
        //点击x删除售卖属性
        removeAttr(index) {
            //即从数组中删除点击的元素
            this.searchParams.props.splice(index, 1);
            //再次发起请求
            this.getDate();
        },

        //改变排序方式
        changeOrder(flag) {
            //形参flag为一个标记，代表用户点击的是综合还是价格
            // 获取起始的状态
            let originOrder = this.searchParams.order;
            let originFlag = originOrder.split(":")[0];
            let originSort = originOrder.split(":")[1];
            let newOrder = "";
            if (flag == originFlag) {
                //如果传入进来的flag和起始的flag相等，那么一定点击的是同一个标签，那么更换排序方式即可
                newOrder = `${originFlag}:${
                    originSort == "desc" ? "asc" : "desc"
                }`;
            } else {
                //如果不相等那么点击的一定是价格
                newOrder = `${flag}:${"desc"}`;
            }
            this.searchParams.order = newOrder;
            this.getDate();
        },

        //自定义事件的回调函数，--获取当前是第几页
        getPageNo(pageNo) {
            this.searchParams.pageNo = pageNo;
            this.getDate();
        },
    },
    watch: {
        //监听，只要路由传递的参数发生变化了就重新请求服务器
        $route() {
            //重新传递参数,且分类id需要值为空重新传递,空字符串就不再传给服务器了，以便节省宽带
            this.searchParams.category1Id = undefined;
            this.searchParams.category2Id = undefined;
            this.searchParams.category3Id = undefined;

            Object.assign(
                this.searchParams,
                this.$route.query,
                this.$route.params
            );

            this.getDate();
        },
    },
};

/* 
数据说明：
attrsList：属性列表，像素，价格，屏幕尺寸等
goodsList：产品列表，对于售卖产品信息
pageNo：分页器当前第几页
pageSize：每一页有几条数据
total：分页器一共要展示多少数据
totalPages:一共有多少页
trademarkList:品牌列表
*/
</script>

<style lang="less" scoped>
.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }

        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>