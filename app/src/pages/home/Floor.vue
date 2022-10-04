<template>
    <!--楼层-->
    <div class="floor">
        <div class="py-container">
            <div class="title clearfix">
                <h3 class="fl">{{list.name}}</h3>
                <div class="fr">
                    <ul class="nav-tabs clearfix">
                        <li class="active" v-for="(nav, index) in list.navList" :key="index">
                            <a href="#tab1" data-toggle="tab">{{nav.text}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tab-content">
                <div class="tab-pane">
                    <div class="floor-1">
                        <div class="blockgary">
                            <ul class="jd-list">
                                <li v-for="(keyWord, index) in list.keywords" :key="index">{{keyWord}}</li>
                            </ul>
                            <img :src="list.imgUrl" />
                        </div>
                        <div class="floorBanner">
                            <!-- 轮播图的地方 -->
                            <Carousel :list="list.carouselList" />
                        </div>
                        <!-- 这里由于结构都不同，所以不能vfor遍历 -->
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit">
                                <img :src="list.recommendList[0]" />
                            </div>
                            <div class="floor-conver-pit">
                                <img :src="list.recommendList[1]" />
                            </div>
                        </div>
                        <div class="split center">
                            <img :src="list.bigImg" />
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit">
                                <img :src="list.recommendList[2]" />
                            </div>
                            <div class="floor-conver-pit">
                                <img :src="list.recommendList[3]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Floor",
    // 父组件IndexHome传递的数据
    // 这里数据都有了，剩下的只用替换数据即可
    props: ["list"],

    mounted() {
        //不是在自己组件中发请求，所以不用nextTick，可以直接在mounted中发,但是为了封装，所以还是统一写法
    },
};
</script>

<style lang='less' scoped>
.floor {
    margin-top: 15px;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .title {
            .fl {
                float: left;
                color: #c81623;
                font-size: 20px;
                line-height: 30px;
                margin: 9px 0;
                font-weight: 700;
            }

            .fr {
                float: right;

                .nav-tabs {
                    margin: 10px 0 0;
                    display: inline-block;

                    li {
                        float: left;
                        line-height: 18px;

                        a {
                            padding-top: 1px;
                            font-weight: 400;
                            background-color: #fff;

                            &::after {
                                content: "|";
                                padding: 0 10px;
                            }
                        }

                        &:nth-child(7) {
                            a {
                                &::after {
                                    content: "";
                                }
                            }
                        }

                        &.active {
                            a {
                                color: #000000;
                                text-decoration: none;
                            }
                            a:hover {
                                color: #c81623;
                            }
                        }
                    }
                }
            }
        }

        .tab-content {
            border-top: 2px solid #c81623;
            border-bottom: 1px solid #e4e4e4;

            .tab-pane {
                .floor-1 {
                    height: 360px;
                    display: flex;

                    .blockgary {
                        width: 210px;
                        height: 100%;
                        background: #f7f7f7;

                        .jd-list {
                            padding: 15px 0;
                            overflow: hidden;

                            li {
                                list-style-type: none;
                                float: left;
                                width: 40%;
                                margin: 0 10px;
                                border-bottom: 1px solid #e4e4e4;
                                text-align: center;
                                line-height: 26px;
                            }
                        }

                        img {
                            width: 100%;
                        }
                    }

                    .floorBanner {
                        width: 330px;
                        height: 100%;
                    }

                    .split {
                        width: 220px;
                        height: 100%;
                        position: relative;

                        .floor-x-line {
                            position: absolute;
                            background: #e4e4e4;
                            width: 220px;
                            height: 1px;
                            top: 180px;
                        }

                        .floor-conver-pit {
                            width: 100%;
                            height: 50%;

                            img {
                                width: 100%;
                                height: 100%;
                                transition: all 400ms;

                                &:hover {
                                    opacity: 0.8;
                                }
                            }
                        }
                    }

                    .center {
                        border: 1px solid #e4e4e4;
                    }
                }
            }
        }
    }
}
</style>