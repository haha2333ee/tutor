$(document).ready(function () {
    //导航栏吸附
    var $navbar = $('.hero-navbar');
    var showPoint = 160; // 你Banner的底部距离，可根据实际调整
    var isSticky = false;

    $(window).on('scroll', function () {
        var st = $(this).scrollTop();
        if (st > showPoint) {
            if (!isSticky) {
                $navbar.addClass('sticky-nav');
                isSticky = true;
            }
        } else {
            if (isSticky) {
                $navbar.removeClass('sticky-nav');
                isSticky = false;
            }
        }
    });

    const heroSwiper = new Swiper('.hero-swiper', {
        slidesPerView: 1,
        effect: 'fade',
        loop: true,
        autoplay: {
            delay: 5000,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    //复制按钮的逻辑
    $("#copyBtn1").click(async function () {
        var inputElement = $("#wechatInput1");
        if (inputElement.length === 0) {
            console.error("无法找到ID为 wechatInput1 的输入框。");
            return;
        }
        try {
            const isReadonly = inputElement.prop('readonly');
            inputElement.prop('readonly', false);
            inputElement[0].select();
            inputElement[0].setSelectionRange(0, 99999);

            const textToCopy = inputElement.val();
            await navigator.clipboard.writeText(textToCopy);
            inputElement.prop('readonly', isReadonly);
            alert("已复制到剪贴板：" + textToCopy);
        } catch (err) {
            console.error('复制失败: ', err);
            alert('复制失败！请确保页面在 https 或 localhost 环境下运行。');
        }
    });
    $("#copyBtn2").click(async function () {
        var inputElement = $("#wechatInput1");
        if (inputElement.length === 0) {
            console.error("无法找到ID为 wechatInput1 的输入框。");
            return;
        }
        try {
            const isReadonly = inputElement.prop('readonly');
            inputElement.prop('readonly', false);
            inputElement[0].select();
            inputElement[0].setSelectionRange(0, 99999);

            const textToCopy = inputElement.val();
            await navigator.clipboard.writeText(textToCopy);
            inputElement.prop('readonly', isReadonly);
            alert("已复制到剪贴板：" + textToCopy);
        } catch (err) {
            console.error('复制失败: ', err);
            alert('复制失败！请确保页面在 https 或 localhost 环境下运行。');
        }
    });
    //特色服务卡片高亮
    /*$('#service-list .card').on('click', function () {
        var $this = $(this);
        if ($this.hasClass('selected')) {
            $this.removeClass('selected');
        } else {
            $('#service-list .card').removeClass('selected');
            $this.addClass('selected');
        }
    });*/
    //数据统计区的实时更新
    //检测滑入视口后依次添加动画类
    var shown = false;
    function statsInView() {
        var $stats = $('#stats');
        if (shown) return;
        var winScroll = $(window).scrollTop() + $(window).height();
        var statsTop = $stats.offset().top + 60;
        if (winScroll > statsTop) {
            const counter = $('.counter');
            counter.counterUp({
                time: 2500,
                delay: 100
            });
            shown = true;
            // 依次给每个卡片加动画
            $('.stat-card').each(function (i, card) {
                setTimeout(function () {
                    $(card).addClass('stats-animated');
                }, i * 180);
            });
        }
    }
    $(window).on('scroll resize', statsInView);
    statsInView(); // 初次也检测一次
    //按钮滚动
    // 按钮点击：每次滑动100%卡片宽
    $('#casePrev').on('click', function () {
        var $list = $('#casesList');
        var cardWidth = $('.case-card').outerWidth(true) || 380;
        $list.animate({ scrollLeft: $list.scrollLeft() - cardWidth * 2 }, 300);
    });
    $('#caseNext').on('click', function () {
        var $list = $('#casesList');
        var cardWidth = $('.case-card').outerWidth(true) || 380;
        $list.animate({ scrollLeft: $list.scrollLeft() + cardWidth * 2 }, 300);
    });
    //案例卡片
    var casesData = [
        {
            img: "src/image/case-1.jpg",
            title: "Take-home exam 高分",
            desc: "通过个性化讲解和考前冲刺，学生顺利拿下A+"
        },
        {
            img: "src/image/case-2.jpg",
            title: "经济学考前辅导",
            desc: "知识点全面梳理，精准覆盖考试重难点"
        },
        {
            img: "src/image/case-3.jpg",
            title: "机械课程20h辅导",
            desc: "短期集训，助力零基础同学快速跟上进度"
        },
        {
            img: "src/image/case-4.jpg",
            title: "作业辅导",
            desc: "作业逐题精讲，精准查漏补缺，助你稳步提升解题能力"
        },
        {
            img: "src/image/case-5.jpg",
            title: "考前突击辅导",
            desc: "临考冲刺，梳理重点难点，快速提升考试分数"
        }
    ];

    // 2. 渲染方法
    function renderCasesSwiper() {
        var html = '';
        casesData.forEach(c => {
            html += `<div class="swiper-slide">
            <div class="case-card card mx-3 shadow-lg border-0">
              <img src="${c.img}" class="card-img-top" alt="${c.title}">
              <div class="card-body text-center">
                <h5 class="card-title">${c.title}</h5>
                <p class="card-text">${c.desc}</p>
              </div>
            </div>
          </div>`;
        });
        $(".cases-swiper .swiper-wrapper").html(html);
    }
    renderCasesSwiper();

    var mySwiper = new Swiper('.cases-swiper', {
        slidesPerView: 3,
        //loop: true,
        speed: 1500,
        spaceBetween: 30,
        centeredSlides: false,
        navigation: {
            nextEl: '#caseNext',
            prevEl: '#casePrev',
        },
        autoplay: {
            delay: 1000,                // 自动滚动
            disableOnInteraction: true // 用户交互后继续自动滚
        },
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            768: {
                spaceBetween: 30,
                slidesPerView: 2
            },
            992: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 3
            },
        }
    });
    // 按钮点击：每次滑动100%卡片宽
    $('#testimonialPrev').on('click', function () {
        var $list = $('#testimonialsList');
        var cardWidth = $('.testimonial-card').outerWidth(true) || 380;
        $list.animate({ scrollLeft: $list.scrollLeft() - cardWidth }, 300);
    });
    $('#testimonialNext').on('click', function () {
        var $list = $('#testimonialsList');
        var cardWidth = $('.testimonial-card').outerWidth(true) || 380;
        $list.animate({ scrollLeft: $list.scrollLeft() + cardWidth }, 300);
    });
    //评价区域渲染
    // 1. 评价数据
    const testimonialsData = [
        {
            img: "src/image/testimonial-1.jpg",
            name: "Lee 同学",
            meta: "悉尼大学 | 计算机专业",
            text: "“对于这门难度较高的专业课，我原本感到十分吃力，上课后，一切都变得不一样了。辅导老师不仅专业知识扎实，而且教学经验丰富，能够用通俗易懂的方式将复杂的概念讲解清楚。”"
        },
        {
            img: "src/image/testimonial-2.jpg",
            name: "Zhang 同学",
            meta: "曼彻斯特大学 | 经济学",
            text: "“这次选择这家考试辅导机构真是明智之举！他们的课程内容全面且紧扣考点，老师讲解清晰易懂，能够迅速帮助我抓住考试的重点和难点。”"
        },
        {
            img: "src/image/testimonial-3.png",
            name: "K 同学",
            meta: "新加坡国立大学 | Essay写作",
            text: "“下单了Essay辅导课程，老师专业且耐心，针对我的薄弱点精准施策，沟通顺畅，反馈及时，让我在写作路上少走弯路。强烈推荐！”"
        }
        // 可继续添加
    ];

    // 2. 渲染
    function renderTestimonials() {
        let html = '';
        testimonialsData.forEach(t => {
            html += `
            <div class="swiper-slide">
        <div class="testimonial-card card p-4 border-0 shadow-sm text-center mx-2">
          <img src="${t.img}" alt="${t.name}" class="rounded-circle mx-auto mb-3" style="width:70px; height:70px; object-fit:cover;">
          <h5 class="mb-1">${t.name}</h5>
          <p class="small text-muted mb-3">${t.meta}</p>
          <p class="font-italic mb-0">${t.text}</p>
        </div>
        </div>
      `;
        });
        $("#testimonialsList").html(html);
    }
    renderTestimonials();
    //评价区域滚动
    var testimonialSwiper = new Swiper('.testimonial-swiper', {
        //loop: true,
        speed: 1000,
        centeredSlides: false,        // 显示两张时通常关闭居中
        slidesPerView: 1.1,           // 移动端默认显示 1.1 张
        spaceBetween: 16,             // 移动端间距收窄一些
        navigation: {
            nextEl: '#testimonialNext',
            prevEl: '#testimonialPrev'
        },
        autoplay: {
            delay: 1000,                // 自动滚动
            disableOnInteraction: true // 用户交互后继续自动滚
        },
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            },
            992: {
                slidesPerView: 1
            },
            1200: {
                slidesPerView: 2
            },
        }
    });

    // 支持鼠标/触屏惯性横滑（和高分案例一样）
    /*var testimonialSwiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 2,
        loop: true,
        speed: 1000,
        spaceBetween: 30,
        centeredSlides: true,
        navigation: {
            nextEl: '#testimonialNext',
            prevEl: '#testimonialPrev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            },
            992: {
                slidesPerView: 1
            },
            1200: {
                slidesPerView: 2
            },
        }
    });*/

    //联系我们的表单前端校验和反馈
    $("#contact-form").on("submit", function (e) {
        e.preventDefault();
        // 简单校验（可扩展）
        var name = $("#name").val().trim(),
            email = $("#email").val().trim(),
            message = $("#message").val().trim();
        if (!name || !email || !message) {
            $("#form-result").html('<span style="color:#e83e8c;">请填写完整信息</span>');
            return;
        }
        // 邮箱正则
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(email)) {
            $("#form-result").html('<span style="color:#e83e8c;">请输入正确的邮箱</span>');
            return;
        }
        // 静态页面可直接显示成功
        $("#form-result").html('<span style="color:#20c997;">提交成功！我们会尽快联系您~</span>');
        // 清空表单
        setTimeout(function () {
            $("#contact-form")[0].reset();
        }, 800);
    });
    //返回顶部按钮
    // 滚动出现返回顶部
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#scrollTopBtn').fadeIn();
        } else {
            $('#scrollTopBtn').fadeOut();
        }
    });
    // 平滑滚动到顶部
    $('#scrollTopBtn').click(function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 500);
    });
});