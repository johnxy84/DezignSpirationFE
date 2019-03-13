$(document).ready(function () {
    var body = $("html, body");
    body.stop().animate({ scrollTop: 0 }, "500", "swing");
    var oldScrollTop = 0;
    var snapping = false;

    $('#scroll-down').on('click', function () {
        var scrollTop = $("#v-body").offset().top;
        body.stop().animate({ scrollTop }, "500", "swing");
    });

    $('#scroll-up').on('click', function () {
        var scrollTop = 0;
        body.stop().animate({ scrollTop }, "500", "swing");
    });

    $(window).scroll(function(e) {
        var scrollTop = body.scrollTop();
        var elementTop = $("#v-body").offset().top;

        if (!snapping) {
            if ((oldScrollTop < scrollTop) && (scrollTop < elementTop)) {
                e.preventDefault();
                snapping = true;
                setTimeout(function () {
                    body.stop().animate({ scrollTop: elementTop }, "500", "swing", function () {
                        snapping = false;
                    });
                }, 50);
            } else if ((oldScrollTop > scrollTop) && (scrollTop < elementTop)) {
                e.preventDefault();
                snapping = true;
                setTimeout(function () {
                    body.stop().animate({ scrollTop: 0 }, "500", "swing", function () {
                        snapping = false;
                    });
                }, 50);
            }
        }
        oldScrollTop = scrollTop;
    });
});
