// 点击显示不同的详情
window.addEventListener("load", function () {
    var two_center = document.querySelectorAll(".two_center");
    var two_top = document.querySelector(".two_top");
    var t_span = two_top.querySelectorAll("span");

    /* two_top.addEventListener("mouseover", function () {
        two_center.style.display = "block";
    }); */
    for (var i = 0; i < t_span.length; i++) {
        // 开始给五个小li设置自定义属性索引号
        t_span[i].setAttribute("index", i);
        t_span[i].onclick = function () {
            for (var i = 0; i < t_span.length; i++) {
                t_span[i].className = "";
            }
            this.className = 'span_red';
            // 2.内容显示模块
            var index = this.getAttribute("index");
            for (var i = 0; i < two_center.length; i++) {
                two_center[i].style.display = "none";
            }
            two_center[index].style.display = "block";
        };
    }

});
// 图片跟随放大效果
window.addEventListener('load', function () {
    var left_img = document.querySelector('.left_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.bigmask');
    var bigImg = document.querySelector('.bigImg');
    left_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    left_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    left_img.addEventListener('mousemove', function (e) {
        // 先计算出鼠标在盒子内的坐标:鼠标在页面的坐标-盒子到页面的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        console.log(x, y);
        // 鼠标居中
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        var maskMax = left_img.offsetWidth - mask.offsetWidth;  //遮挡层最大移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;   //大图片最大移动距离

        //卡住盒子不让盒子出去
        if (maskX <= 0) {
            maskX = 0; // 左侧
        } else if (maskX >= maskMax) {
            maskX = maskMax; //右侧
        }
        if (maskY <= 0) {
            maskY = 0; // 上侧
        } else if (maskY >= maskMax) {
            maskY = maskMax; //下侧
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        //大图片移动距离 = 遮挡层移动距离 * 大突破最大移动距离 / 遮挡层最大移动距离
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px'
    })
})
$(function () {
    var sum = 1;
    $('.teshutd i:first').click(function () {
        sum = $('.teshutd input').val();
        sum++;
        $('.teshutd input').val(sum);
    })
    $('.teshutd i:last').click(function () {
        if (sum > 0) {
            sum = $('.teshutd input').val();
            sum--;
            $('.teshutd input').val(sum);
        } else {
            alert('不可再减少');
        }
    })

})