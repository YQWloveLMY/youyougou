<template>
    <div class="spec-preview">
        <img :src="imgObj.imgUrl" />
        <!-- 放大镜效果 -->
        <div class="event" @mousemove="handler"></div>

        <div class="big">
            <img :src="imgObj.imgUrl" ref="big" />
        </div>
        <!-- 遮罩层 -->
        <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
export default {
    name: "Zoom",
    data() {
        return {
            currentIndex: 0,
        };
    },
    props: ["skuImageList"],
    computed: {
        imgObj() {
            // 当服务器还没有返回数据的时候，返回一个空数组，否则一个空数组的[0].imgUrl又会报错
            return this.skuImageList[this.currentIndex] || [];
        },
    },
    mounted() {
        this.$bus.$on("getIndex", (index) => {
            //兄弟组件通过全局事件总线返回的点击的哪一张图片的值，拿到后对应展示
            this.currentIndex = index;
        });
    },
    methods: {
        handler(event) {
            //放大镜中鼠标移动事件
            // 获取蒙版的dom
            let mask = this.$refs.mask;
            let big = this.$refs.big;
            // 算出蒙版的左边距离边框的左边距离：鼠标距离边框的距离减去这个蒙版的宽度的一半
            let left = event.offsetX - mask.offsetWidth / 2;
            // 蒙版于上边边框的距离同理
            let top = event.offsetY - mask.offsetHeight / 2;

            //约束这个蒙版不能让它离开这个边框，即left>0，
            if (left <= 0) {
                left = 0;
            }
            if (left >= mask.offsetWidth) {
                left = mask.offsetWidth;
            }
            // 上下同理
            if (top <= 0) {
                top = 0;
            }
            if (top >= mask.offsetHeight) {
                top = mask.offsetHeight;
            }
            mask.style.left = left + "px";
            mask.style.top = top + "px";
            // 右侧放大图是左侧的二倍，所以直接*2即可，注意取反
            big.style.left = -2 * left + "px";
            big.style.top = -2 * top + "px";
        },
    },
};
</script>

<style lang="less">
.spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
        width: 100%;
        height: 100%;
    }

    .event {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
    }

    .mask {
        width: 50%;
        height: 50%;
        background-color: rgba(0, 255, 0, 0.3);
        position: absolute;
        left: 0;
        top: 0;
        display: none;
    }

    .big {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -1px;
        left: 100%;
        border: 1px solid #aaa;
        overflow: hidden;
        z-index: 998;
        display: none;
        background: white;

        img {
            width: 200%;
            max-width: 200%;
            height: 200%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    .event:hover ~ .mask,
    .event:hover ~ .big {
        display: block;
    }
}
</style>