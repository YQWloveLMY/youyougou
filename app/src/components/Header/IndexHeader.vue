<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p v-show="!userName">悠悠购欢迎您！</p>
                    <!-- 用户没有登录，即没有用户名的时候，没登录 -->
                    <p v-if="!userName">

                        <span>请</span>
                        <!-- 声明式导航 -->
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                    <!-- 登录了 -->
                    <p v-else='userName'>
                        <a>欢迎您:</a>
                        &nbsp;&nbsp;
                        <a>{{userName}}</a>
                        &nbsp;&nbsp;
                        <a class="register" @click="logout">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center">我的订单</router-link>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">我的悠悠购</a>
                    <a href="###">悠悠购会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注悠悠购</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <!-- 声明式导航 -->
                <router-link class="logo" to="/home">
                    <img src="./images/logo.png" alt="" />
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                    <!-- 这里就采用编程式路由导航 -->
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
                        搜索
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "IndexHeader",
    data() {
        return {
            keyword: "",
        };
    },
    methods: {
        goSearch() {
            //路由传参——params需要在配置中添加占位符//编程式导航跳转
            // console.log(this.$route.query);
            // if (this.$route.query) {
            // console.log("有query参数");???没有传递query数据的时候这里输出的是一个空数组，但是也进来了

            //如果路径有query参数也带过去

            let locations = {
                name: "search",
                params: { keyword: this.keyword || undefined },
            };
            //确定路径当中有query参数
            if (this.$route.query.categoryName) {
                locations.query = this.$route.query;
            }

            this.$router.push(locations);
            // }
        },
        //退出登录
        logout() {
            //退出登录需要做的事情：发请求通知服务器退出登录，清除token、本地也需要清除存储的token
            this.$store.dispatch("userLogout");
            //退出登录要停留在首页
            this.$router.push("/home");
        },
    },

    mounted() {
        //当面包屑中的关键字清除之后，需要这里的input框中也清空：涉及兄弟组件通信，用全局事件总线
        this.$bus.$on("clear", () => {
            this.keyword = "";
            // console.log("2");
        });
    },
    computed: {
        //从仓库获取用户名
        userName() {
            return this.$store.state.user.userInfo.name;
        },
    },
};
</script>

<style lang='less' scoped>
.header {
    & > .top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                        cursor: pointer;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    & + a {
                        border-left: 1px solid #b3aeae;
                    }
                }
            }
        }
    }

    & > .bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>
