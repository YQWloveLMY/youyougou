//引入mock模块
import Mock from "mockjs";
//此处引入的json文件并没有对外暴露，但是可以引入
//原因：webpack会默认对外暴露图片和json格式
import banner from "./banner.json";
import floor from "./floor.json";
//mock数据:第一个参数：请求地址，第二个参数：请求数据
//模拟轮播图的数据
Mock.mock("/mock/banner", { code: 200, data: banner });
//模拟下面的数据
Mock.mock("/mock/floor", { code: 200, data: floor });
