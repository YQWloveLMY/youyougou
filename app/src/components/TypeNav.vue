<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container" @mouseleave="leaveShow">
            <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <!-- 过渡动画 -->
            <transition name="sort">
                <div class="sort" v-show="show">
                    <div class="all-sort-list2" @mouseleave="leaveIndex" @click="goSearch">
                        <!-- 第一层 -->

                        <div class="item" v-for="c1 in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==c1.categoryId}">
                            <h3 @mouseenter="changeIndex(c1.categoryId)">
                                <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                                <!-- 用router-link会由于循环导致卡顿，所以这里不适用声明式导航 -->
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                            </h3>
                            <!-- 第二层 -->
                            <!-- 用js实现二三级分类的展示，此处css实现更为简单，但是目的练习js，同样背景颜色也是如此 -->
                            <div class="item-list clearfix" :style="{display:currentIndex==c1.categoryId?'block':'none'}">
                                <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c1.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                        </dt>
                                        <dd>
                                            <!-- 第三层 -->
                                            <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c1.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
// import throttle from "lodash/throttle";  按需引入
import { mapState, mapGetters } from "vuex";
export default {
    name: "TypeNav",
    data() {
        return {
            //存储用户鼠标移到哪一个一级分类,用于放上鼠标底色变蓝的效果
            currentIndex: -1,
            //控制商品分类的显示与隐藏
            show: true,
        };
    },
    //当这个全局组件挂载完毕，就像服务器发请求
    mounted() {
        //通知vuex发请求，获取服务器的数据放在仓库中,但是为了不要每次跳转页面挂载TypeNav都请求数据，放在app中去
        // this.$store.dispatch("categoryList");
        //如果不是home路由组件，将typeNav进行隐藏
        if (this.$route.path != "/home") {
            this.show = false;
        }
    },
    computed: {
        // ...mapState("categoryList"),
        //对象写法，右侧需要的是一个函数，函数会立即执行一次
        //传入的参数state是大仓库中的数据，里面包含home
        // ...mapState({
        //     categoryList: (state) => state.home.categoryList,
        // }),
        //对服务器返回的数据在vuex中使用getter处理了一下，避免太多导致溢出
        ...mapGetters(["categoryList"]),
    },

    methods: {
        //鼠标进入底色边蓝
        changeIndex(value) {
            this.currentIndex = value;
        },
        //节流
        // changeIndex: throttle(function (value) {
        //     this.currentIndex = value;
        // }, 50),
        //鼠标离开恢复
        leaveIndex() {
            this.currentIndex = -1;
        },

        //三级导航跳转到search模块
        goSearch(event) {
            // this.$router.push({
            //     path: "/search",
            // });
            //存在几个问题：无法分辨到底点的是不是a以及点的是哪个a以及传参
            //1.在子节点a中加入自定义属性,获取

            let element = event.target;
            let { categoryname, category1id, category2id, category3id } =
                element.dataset;
            //判断是否为a
            if (categoryname) {
                //整理路由跳转的参数
                let location = { name: "search" };
                let query = { categoryName: categoryname };
                //判断是一级分类二级分类三级分类
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else if (category3id) {
                    query.category3Id = category3id;
                }
                //跳转前需要判断，如果路由跳转的时候带有params，需要带着一起
                if (this.$route.params) {
                    // console.log("有params参数");
                    location.params = this.$route.params;
                    location.query = query;
                    this.$router.push(location);
                }
            }
        },

        //鼠标移入的时候显示
        enterShow() {
            this.show = true;
        },
        //鼠标离开隐藏
        leaveShow() {
            if (this.$route.path != "/home") {
                this.show = false;
            }
        },
    },
};
</script>

<style lang='less' scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fefefe;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;
                        cursor: pointer;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #fff;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;

                                    a {
                                        cursor: pointer;
                                    }
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                        cursor: pointer;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                .cur {
                    background-image: linear-gradient(to right, pink, skyblue);
                }
            }
        }
        // 过渡动画的样式
        .sort-enter {
            //进入的起点
            height: 0px;
        }
        .sort-enter-to {
            height: 461px;
        }
        .sort-enter-active {
            transition: all 1s;
        }

        // .sort-leave {
        //     height: 461px;
        // }
        // .sort-leave-to {
        //     height: 0px;
        // }
        // .sort-leave-active {
        //     transition: all 0.5s;
        // }
    }
}
</style>