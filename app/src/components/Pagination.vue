<template>
    <div class="pagination">
        <!-- 按钮点击事件，将点击的那一页或者是上一页还是下一页通过自定义事件传递给父亲indexSearch中 -->
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="startNumAndEndNum.start!=1" @click="$emit('getPageNo',1)">1</button>
        <button v-if="startNumAndEndNum.start>2">···</button>
        <!-- 中间部分 :遍历数字：且只需要五个-->
        <button v-if="page>=startNumAndEndNum.start" v-for="(page,index) in startNumAndEndNum.end" :key="index" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>
        <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
        <button v-if="startNumAndEndNum.end!=totalPage" @click="$emit('getPageNo',totalPage)">{{totalPage}}</button>
        <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
        <button style="margin-left: 30px">共 {{totalPage}} 页</button>
    </div>
</template>


<script>
export default {
    name: "Pagination",
    props: ["pageNo", "pageSize", "total", "continues"],
    computed: {
        totalPage() {
            //计算一共多少页
            return Math.ceil(this.total / this.pageSize);
        },
        startNumAndEndNum() {
            // 结构赋值一下就不用都去.this了
            const { pageNo, pageSize, total, continues, totalPage } = this;
            //计算起始的数字和结束的数字
            let start = 0;
            let end = 0;
            if (continues > totalPage) {
                //如果连续的页码大于总的页数
                start = 1;
                end = totalPage;
            } else {
                start = pageNo - parseInt(continues / 2);
                end = pageNo + parseInt(continues / 2);
                if (start < 1) {
                    //如果开始的页码小于了1，即为0或-1，或结束的页码大于了总共的页码值
                    //那么就为不正常的页码值，需要对其单独计算
                    start = 1;
                    end = continues;
                } else if (end > totalPage) {
                    end = totalPage;
                    start = totalPage - continues + 1;
                }
            }
            return { start, end };
        },
    },
};
/* 
制作分页器需要明白的：
1.当前是第几页：pageNo
2.每一页需要展示多少条数据：pageSize
3.分页器一共有多少数据：total
4.分页器连续的页码数，一般是五个或者七个，左右省略号隔开:continues
重难点：连续页码的起始数据和结束数据
*/
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
