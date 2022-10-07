window.addEventListener("load", function () {
    // 鼠标放上去显示隐藏箭头
    var arrow_l = this.document.querySelector(".arrow-l");
    var arrow_r = this.document.querySelector(".arrow-r");
    var focus = this.document.querySelector(".jiaodiantu");
    //节流阀
    var flag = true;
    //自动播放功能--定时器,类似于点击右侧按钮
    var timer = setInterval(function () {
        //手动调用事件
        arrow_r.click();
    }, 2000);
    focus.addEventListener("mouseenter", function () {
        arrow_l.style.display = "block";
        arrow_r.style.display = "block";
        //停止自动播放
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener("mouseleave", function () {
        arrow_l.style.display = "none";
        arrow_r.style.display = "none";
        //开启自动播放
        timer = setInterval(function () {
            //手动调用事件
            arrow_r.click();
        }, 2000);
    });
    // 动态获取有几个图片(li)就有几个小圆圈
    var ul = focus.querySelector("ul");
    var ol = focus.querySelector(".circle");
    var focusWidth = focus.offsetWidth; //图宽度

    for (var i = 0; i < ul.children.length; i++) {
        //创建一个小li
        var li = document.createElement("li");
        //创建当前小圆圈的索引号-自定义属性
        li.setAttribute("index", i);
        ol.appendChild(li);
        //绑定点击事件
        li.addEventListener("click", function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = "";
            }
            this.className = "current";
            //ul动画 ,需要用到animate动画
            //点击小圆圈移动图片,移动ul 使用index索引号来判断移动距离.负值
            var index = this.getAttribute("index");
            //为了解决小圆圈和箭头没有配合，点击某个小圆圈就要把这个小圆圈的索引号给num
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        });
    }
    ol.children[0].className = "current";
    //克隆第一张图片放到最后 ,用克隆的办法防止小圆圈增多
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //控制小圆圈播放的变量
    var num = 0;
    //点击右侧按钮,图片移动
    var circle = 0;
    arrow_r.addEventListener("click", function () {
        if (flag) {
            flag = false; //关闭节流阀
            //判断是否到最后一张复制的图片 如果是,则全部置为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true; //打开节流阀
            });
            //小圆圈跟着图片一起走
            circle++;
            //先清除其余小圆圈类名
            if (circle == ol.children.length) {
                circle = 0; //复原
            }
            circleChange();
        }
    });
    //左侧

    arrow_l.addEventListener("click", function () {
        if (flag) {
            flag = false;
            //判断是否到第一张图片 如果是,则再点击就跳到最后一张
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + "px";
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            //小圆圈跟着图片一起走
            circle--;
            //先清除其余小圆圈类名
            if (circle < 0) {
                //小于0说明已经第一张图片了
                circle = ol.children.length - 1; //复原
            }
            circleChange();
        }
    });
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = "";
        }
        //留下当前的小圆圈
        ol.children[circle].className = "current";
    }
});
//电梯区域
$(function () {
    var flag = true;
    //显示隐藏电梯按钮
    var toolTop = $(".tuijian").offset().top;
    toggleTool();
    gundong();
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    function gundong() {
        if (flag) {
            $(".floor .w").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }
            });
        }
    }
    $(window).scroll(function () {
        toggleTool();
        //滚动到某个模块，这个模块也添加current类
        gundong();
    });

    //点击电梯按钮
    $(".fixedtool li").click(function () {
        flag = false;
        //当前小li 索引号console.log($(this).index());
        var current = $(".floor .w").eq($(this).index()).offset().top;
        $("body, html")
            .stop()
            .animate(
                {
                    //.stop 防止多次点击动画重叠
                    scrollTop: current,
                },
                function () {
                    flag = true;
                }
            );
        //添加类名
        $(this).addClass("current").siblings().removeClass();
    });
});
