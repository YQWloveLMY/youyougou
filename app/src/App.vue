<template>
    <div>
        <IndexHeader />
        <router-view></router-view>
        <!-- 在home或search是显示，在login或registe是隐藏 -->
        <!-- 少量可以如下解决，但是大量就不可以了 -->
        <!-- <IndexFooter
            v-show="$route.path == '/home' || $route.path == '/search'"
        /> -->
        <IndexFooter v-show="$route.meta.show" />
    </div>
</template>

<script>
import IndexHeader from "./components/Header/IndexHeader";
import IndexFooter from "./components/Footer/IndexFooter.vue";
export default {
    name: "App",
    components: { IndexHeader, IndexFooter },

    mounted() {
        //通知vuex发请求，获取服务器的数据放在仓库中,
        this.$store.dispatch("categoryList");
    },
};
</script>

<style>
</style>