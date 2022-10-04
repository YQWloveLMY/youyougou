<template>
    <!-- 轮播图组件 -->
    <div class="swiper-container swiper-no-swiping" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name: "Carousel",
    props: ["list"],
    watch: {
        list: {
            //由于list是父亲给的数据，从头至尾没有变化，所以只有用immediate立即监听一次
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    var mySwiper = new Swiper(this.$refs.mySwiper, {
                        loop: true, // 循环模式选项
                        autoplay: true,

                        // 如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                    });
                });
            },
        },
    },
};
</script>

<style scoped>
</style>