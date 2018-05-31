/**
 * Created by HUCC on 2018/5/28.
 */

// 11111111111111111111111111111
    //思路
    // 1.给window注册一个滚动事件
    // 2.获取到window的scrollTop值
    // 3.根据比例计算opacity
    // 4.给header进行设置
    ;(function () {
        var header = document.querySelector(".jd_header")
        window.addEventListener("scroll", function () {
            var opacity = 0;
            var scrollTop = window.pageYOffset;
            // 当前的scrollTop/600 = 当前的opacity/0.9
            if (scrollTop <= 600) {
                opacity = scrollTop / 600 * 0.9;
            } else {
                opacity = 0.9;
            }
            header.style.backgroundColor = "rgba(222, 24, 27, "+opacity+")"
        })
    })()

// 2222222222222222222222222222
    //思路：
    //1. 获取到秒杀商品中的ul
    //2. 获取ul下所有的li的个数
    //3. 获取到一个li的宽度 * 个数
    ;(function () {
        var ul = document.querySelector(".seckill_content ul");
        var lis = ul.querySelectorAll("li");
        var liWidth = lis[0].offsetWidth;
        ul.style.width = lis.length * liWidth + "px";
    })();


// 33333333333333333333333333333333333
    //思路：
    //1. 获取秒杀时间 - 获取当前时间 = 需要倒计时的时间
    //2. 把倒计时转换成时分秒，设置到页面中
    //3. 开启定时器，，，，，倒计时结束的时候，还需要清除定时器
    ;(function () {
        //获取spans
        var spans = document.querySelectorAll(".seckill_title .time span:nth-child(odd)");
        //开启一个定时器，每秒钟设置一次时间
        setTime();
        var timer = setInterval(setTime, 1000);
        //设置时间
        function setTime() {
        //当前时间
        var nowTime = new Date();
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
    var timeId = setInterval(function () {
        //自增
        count++;
        ul.style.transition = "all 1s";
        ul.style.webkitTransition = "all .5s";

        ul.style.transform = "translateX("+ -count * liWidth+"px)"
        ul.style.webkitTransform = "translateX("+ -count * liWidth+"px)"
    }, 1000);

    // 4.ul注册过渡结束事件
    ul.addEventListener("transitionend", function () {
        console.log("3333333");
        
        if(count >= imgs.length - 1) {
            console.log("12213");
            count = 1;
            ul.style.transition = "none";
            ul.style.webkitTransition = "none";
    
            ul.style.transform = "translateX("+ -count * liWidth+"px)"
            ul.style.webkitTransform = "translateX("+ -count * liWidth+"px)"
        }
        // 5.点亮小圆点
        points.forEach(function (e) {
            e.classList.remove("now");
        });
        points[count-1].classList.add("now");
    })

    // 6.给ul注册三个touch事件
        //1. 清除定时器
        //2. 获取开始位置
    var startX = 0;
    ul.addEventListener("touchstart", function (e) {
        clearInterval(timeId);
        startX = e.touches[0].clientX;
    });
        //1. 获取到移动的距离
        //2. 让ul在原来的基础上加上移动距离（不能有过渡）
    ul.addEventListener("touchmove", function (e) {
        var distance = e.touches[0].clientX - startX;
        var duration = new Date() - startTime;
        ul.style.transform = "translateX("+ -count * liWidth + distance +"px)";
        ul.style.webkitTransform = "translateX("+ -count * liWidth + distance +"px)";
    });
        //1. 判断distance的距离是否超过1/3
    ul.addEventListener("touched", function (e) {
        var distance = e.changedTouches[0].clientX - startX;
        if(distance >= liWidth/3 || (duration <= 200 && distance >= 50) ) {
            //去上一屏
            count--;
      
        }else if(distance <= -liWidth/3 || duration <= 200 && distance <= -50) {
            //去下一屏
            count++;
      
        }else {
            //留在当前屏
        }

        addTransition();
        setTranslate(-count * liWidth);
    
        //重新开始定时器
        timeId = setInterval(function () {
          //自增
          count++;
          //添加过渡
          addTransition();
          //设置ul的位置
          setTranslate(-count * liWidth);
    
        }, 1000);
    });

      //给window注册resieze事件，动态的修改的liWidth的值
  window.addEventListener("resize", function () {
    liWidth = banner.offsetWidth;

    setTranslate(-count * liWidth);
  });

  function addTransition() {
    ul.style.transition = "all .2s";
    ul.style.webkitTransition = "all .2s";
  }
  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }
  function setTranslate(value) {
    ul.style.transform = "translateX("+ value +"px)";
    ul.style.webkitTransform = "translateX("+ value +"px)";
  }


})();

  

    
