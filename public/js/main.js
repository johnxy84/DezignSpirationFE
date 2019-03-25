$(document).ready(function () {
    $('#copyright').html("&copy; Dezignspiration " + new Date().getFullYear());
    var body = $("html, body");
    body.stop().animate({ scrollTop: 0 }, "250", "swing");
    var oldScrollTop = 0;
    var snapping = false;

    $('#scroll-down').on('click', function () {
        var scrollTop = $("#v-body").offset().top;
        body.stop().animate({ scrollTop }, "250", "swing");
    });

    $('#scroll-up').on('click', function () {
        var scrollTop = 0;
        body.stop().animate({ scrollTop }, "250", "swing");
    });

    $(window).scroll(function(e) {
        var scrollTop = body.scrollTop();
        var elementTop = $("#v-body").offset().top;

        if (!snapping) {
            if ((oldScrollTop < scrollTop) && (scrollTop < elementTop)) {
                e.preventDefault();
                snapping = true;
                setTimeout(function () {
                    body.stop().animate({ scrollTop: elementTop }, "250", "swing", function () {
                        snapping = false;
                    });
                }, 50);
            } else if ((oldScrollTop > scrollTop) && (scrollTop < elementTop)) {
                e.preventDefault();
                snapping = true;
                setTimeout(function () {
                    body.stop().animate({ scrollTop: 0 }, "250", "swing", function () {
                        snapping = false;
                    });
                }, 50);
            }
        }
        oldScrollTop = scrollTop;
    });
});
