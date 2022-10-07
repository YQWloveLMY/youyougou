function animate1(obj, target) {
    //匀速动画
    clearInterval(obj.timer); //先把以前的定时器清除，防止越来越快的bug
    obj.timer = setInterval(function () {
        if (obj.offsetLeft >= target) {
            //停止定时器
            clearInterval(obj.timer);
            return; //防止停止后再移动
        }
        obj.style.left = obj.offsetLeft + 1 + "px";
    }, 20);
}

function animate(obj, target) {
    //减速动画
    clearInterval(obj.timer); //先把以前的定时器清除，防止越来越快的bug
    obj.timer = setInterval(function () {
        //尽量避免小数 , 正值往上取整，负值往下取
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            //停止定时器
            clearInterval(obj.timer);
        }
        //用步长公式替换
        obj.style.left = obj.offsetLeft + step + "px";
    }, 20);
}

function animate(obj, target, callback) {
    //动画添加回调函数
    clearInterval(obj.timer); //先把以前的定时器清除，防止越来越快的bug
    obj.timer = setInterval(function () {
        //尽量避免小数 , 正值往上取整，负值往下取
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            //停止定时器
            clearInterval(obj.timer);
            //回调函数写到定时器结束
            /* if (callback) {
                callback();
            } */
            callback && callback();
        }
        //用步长公式替换
        obj.style.left = obj.offsetLeft + step + "px";
    }, 20);
}