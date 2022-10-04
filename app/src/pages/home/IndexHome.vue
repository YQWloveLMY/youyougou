<template>
    <div>
        <!-- 三级联动全局组件 -->
        <TypeNav />
        <!-- 其他静态组件 -->
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <!-- 涉及了父亲给子组件传递数据 数据名为list 值为floor-->
        <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor" />
        <Brand />
    </div>
</template>

<script>
import ListContainer from "./ListContainer.vue";
import Recommend from "./Recommend.vue";
import Rank from "./Rank.vue";
import Like from "./Like.vue";
import Floor from "./Floor.vue";
import Brand from "./Brand.vue";
//
import { mapState } from "vuex";
export default {
    name: "IndexHome",
    components: { ListContainer, Recommend, Rank, Like, Floor, Brand },

    //注意，由于floor有很多，是根据后台数据生成的，所以floor是通过for生成的
    mounted() {
        this.$store.dispatch("getFloorList");
        // //根据token获取用户信息并且展示
        // this.$store.dispatch("getUserInfo");
    },
    computed: {
        //获得floor轮播图数据
        ...mapState({
            floorList: (state) => state.home.floorList,
        }),
    },
};
</script>

<style>
</style>