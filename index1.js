/**
 * Created by HUCC on 2018/5/28.
 */
    // js特效1:根据滚动距离设置头部的opacity
        // 跟着滚动条的距离：一直加到0.9
        // scroll-top>=600, opacity = 0.9
        // 如果没有超过，等比例计算
        // 当前的scrollTop/600 = 当前的opacity/0.9
    ;(function () {
        //思路
        // 1.给window注册一个滚动事件
        // 2.获取到window的scrollTop值
        // 3.根据比例计算opacity
        // 4.给header进行设置
        var header = document.querySelector(".jd_header")
        window.addEventListener("scroll", function () {
            var opacity = 0;
            window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            var scrollTop = window.pageYOffset;
            if (scrollTop <= 600) {
                opacity = scrollTop / 600 * 0.9; 
            } else {
                opacity = 0.9; 
            }
            header.style.backgroundColor = "rgba(222, 24, 27, "+opacity+")";
        });
    })();  


    // js特效2：动态的计算秒杀商品的ul长度
        //自执行函数
    ;(function () {

        //思路：
        //1. 获取到秒杀商品中的ul
        //2. 获取ul下所有的li的个数
        //3. 获取到一个li的宽度 * 个数
        var ul = document.querySelector(".seckill_content ul");
        var lis = ul.querySelectorAll("li");
        var liWidth = lis[0].offsetWidth;
    
        //给ul设置宽度
        ul.style.width = lis.length * liWidth + "px";
    
    })();

    // js特效3：倒计时功能
    ;(function () {

        //思路：
        //1. 获取秒杀时间 - 获取当前时间 = 需要倒计时的时间
        //2. 把倒计时转换成时分秒，设置到页面中
        //3. 开启定时器，，，，，倒计时结束的时候，还需要清除定时器
    
        //获取spans
        var spans = document.querySelectorAll(".seckill_title .time span:nth-child(odd)");
    
        //开启一个定时器，每秒钟设置一次时间
        setTime();
        var timer = setInterval(setTime, 1000);
        //设置时间
        function setTime() {
        //当前时间
        var nowTime = new Date();
        //秒杀时间
        //new Date();创建一个当前的日期
        //new Date(timestamp)
        //new Date("string")： 这个字符串需要符合国际化标准
        //new Date(year, month, day, hour, minutes, second)
        //var seckillTime = new Date("2018-03-22 12:00:00");
        //月份从0开始
        var seckillTime = new Date(2018, 5, 31, 12, 0, 0);
        var time = parseInt((seckillTime - nowTime) / 1000);
        //console.log(time);
    
        if (time <= 0) {
            //如果算出来time已经是一个负数，直接把time变成0
            time = 0;
            clearInterval(timer);
        }   
            //把秒数转换成小时部分  1小时 = 3600秒
            var hours = parseInt(time / 3600);
            //转换成分钟,不足60的那部分   1分钟60秒
            var minutes = parseInt(time / 60) % 60;
            //不足60的秒数
            var seconds = time % 60;
            //console.log(hours, minutes, seconds);
        
            spans[0].innerText = addZero(hours);
            spans[1].innerText = addZero(minutes);
            spans[2].innerText = addZero(seconds);
        }

        function addZero(n) {
            return n < 10 ? "0" + n : n;
        }
    
    
    })();


    // 44444444444444444444444444444
    //思路
    //开启定时器，每次让计数器+1，， 设置ul的translateY
    //等ul的动画结束的时候，判断index是否是lis.length-1
    ;(function () {
        var ul = document.querySelector(".jd_news .info ul");
        var lis = ul.children;
        var liHeight = lis[0].offsetHeight;
      
        var count = 0;//计数器
        setInterval(function () {
            if(count >= lis.length - 1) {
                count = 0;
          
                ul.style.transition = "none";
                ul.style.webkitTransition = "none";
          
                ul.style.transform = "translateY(0px)";
                ul.style.webkitTransform = "translateY(0px)";
            }
            ul.offsetWidth;
            count++;
            ul.style.transition = "all .5s";
            ul.style.webkitTransition = "all .5s";
            ul.style.transform = "translateY(-"+ liHeight * count+"px)"
            ul.style.webkitTransform = "translateY(-"+ liHeight * count+"px)"
        },1000)

        ul.addEventListener("transitionend", function () {
            if (count >= lis.length - 1) {
                //让ul瞬间变回到第一个
                count = 0;
                //清除过渡
                ul.style.transition = "none";
                ul.style.webkitTransition = "none";
          
                //设置ul的translateY
                ul.style.transform = "translateY(0px)";
                ul.style.webkitTransform = "translateY(0px)";
            }
        })
    })();


// 555555555555555555555555555555555555
    //思路
    //1. 获取到ul，imgs ,points
    //2 开启定时器，每次让ul移动一个图片的宽度
    //3. 在动画结束的时候，判断count是否是最后一个，瞬间变回1

;(function () {
    // 1.找对象：banner、ul、imgs、ol、points
    var banner = document.querySelector(".jd_banner");
    var ul = banner.querySelector("ul");
    var imgs = ul.querySelectorAll("li");
    var ol = banner.querySelector("ol");
    var points = ol.querySelectorAll("li");

    // 2。知道每个li的宽度，用count记录滑动值
    var liWidth = banner.offsetWidth;
    var count = 1;//count从一开始，前面有张假图片

    // 3.开启定时器
    setInterval(function () {
        count++;
        ul.style.transition = "all .5s";
        // ul.style.webkitTransition = "all 1s";

        ul.style.transform = "translateX("+ -count * liWidth+"px)"
        // ul.style.webkitTransform = "translateX("+ -count * liWidth+"px)"
    }, 1000);

    // 4.ul注册过渡结束事件
    ul.addEventListener("transitionend", function () {
        alert("12132213")
        if(count >= imgs.length - 1) {
            count = 1;
            ul.style.transition = "none";
            // ul.style.webkitTransition = "none";
    
            ul.style.transform = "translateX("+ -count* liWidth +"px)";
            // ul.style.webkitTransform = "translateX("+ -count* liWidth +"px)";
        }
    })
    
})();