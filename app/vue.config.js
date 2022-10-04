const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    //取消打包的时候的.map文件
    productionSourceMap: false,

    //代理服务器
    devServer: {
        proxy: {
            "/api": {
                target: "http://gmall-h5-api.atguigu.cn",
                // pathRewrite: { "^/api": "" },
            },
        },
    },
});
