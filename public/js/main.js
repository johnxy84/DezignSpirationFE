$(document).ready(function () {
    $('#copyright').html("&copy; Dezignspiration " + new Date().getFullYear());

    loadDailyQuote();

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

    $('#contact-form').on('submit', function (e) {
        e.preventDefault();
        var message = $('#message');
        if (!message.val() || message.val() === '') {
            alert('Please provide a message');
            return false;
        }

        $('#submit-form').attr('disabled', true);

        var html = '';
        $.ajax({
            url: 'https://dezignspiration.com/api/v1/feedback',
            method: 'POST',
            data: $('#contact-form').serialize(),
            dataType: 'JSON',
            success: function (response) {
                $('#submit-form').removeAttr('disabled');
                message.val('');
                renderAlert('success', "Feedback sent successfully!");
            },
            error: function (error) {
                $('#submit-form').removeAttr('disabled');
                renderAlert('error', "We could not send your feedback, please try again");
            }
        });
    });
});

function loadDailyQuote () {
    var html = '';
    $.ajax({
        url: 'https://dezignspiration.com/api/v1/daily/quote',
        method: 'GET',
        dataType: 'JSON',
        success: function (response) {
            var data = response.data;
            $('#daily-quote').css({ 'background-color': data.primary_color, 'color': data.secondary_color });
            html = new EJS({
                url: `../partials/daily_quote.ejs`
            })
                .render( { data });
            $('#render-quote').html(html);
        },
        error: function (error) {
            renderAlert('error', "We could not load today's daily quote");
        }
    });
}

function renderAlert (type, message) {
    var notification_bar = $('.notification-bar');
    notification_bar.remove();

    html = new EJS({
        url: "../partials/" + type + "_alert.ejs"
    })
        .render( { message });
    $('body').append(html);
    notification_bar.removeClass('fade');
    setTimeout(function () {
        notification_bar.addClass('fade');
    }, 3000);
}
