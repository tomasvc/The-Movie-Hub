$((window.addEventListener('resize', () => {
    if ($(window).width() < 550) {
        $(".header").css({ height: "70px" });
        $(".search-area").css({ top: "15px" });
    } else {
        $(".header").css({ height: "40px" });
        $(".search-area").css({ top: "15px" });
    }
})))


$(".search").click(function (e) {
    e.preventDefault()
    if ($(window).width() < 550) {
        $(".header").css({ height: "70px" });
        $(".search-area").css({ top: "15px" });
    } else {
        $(".header").css({ height: "60px" });
        $(".search-area").css({ top: "12px" });
    }

    $(".search-area").addClass("show-search");
    $(".branding").fadeOut();
    $(".shade").css({ visibility: "visible" });
    $(".shade").css({ opacity: 1 });
    $(".menu").fadeOut();
    $("body").addClass("stop-scrolling");
});

$(".close-search").click(function (e) {
    e.preventDefault()
    if ($(window).width() < 550) {
        $(".header").css({ height: "70px" });
    } else {
        $(".header").css({ height: "40px" });
    }

    $(".search-area").removeClass("show-search");
    $(".branding").fadeIn();
    $(".shade").css({ visibility: "hidden" });
    $(".shade").css({ opacity: 0 });
    $(".menu").fadeIn();
    $("body").removeClass("stop-scrolling");
});

var prevScrollPos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos || currentScrollPos == 0) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-55px";
        if ($(window).width() < 550) {
            document.getElementById("navbar").style.top = "-85px";
        }
    }
    prevScrollPos = currentScrollPos;
};
