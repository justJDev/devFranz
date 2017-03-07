const path = require('path');

//Request notification permission
if (Notification.permission !== "granted")
    Notification.requestPermission();

if (window.location.pathname.indexOf("feed") == -1) {
    $(".rant-top-bar")
        .append(
        "<button href=\"#\" id=\"backbtn\">" +
        "<img src=\"https://cdn2.iconfinder.com/data/icons/pittogrammi/142/27-20.png\">" +
        "</button>"
        );
    $("#backbtn").click(function () {
        window.history.back();
    });
}

// Fix external links
$('.app-btns-container a').each(function () {
    $(this).attr('target', '_blank');
});

$('.rantlist .rantlist-title a').each(function () {
    if ($(this).attr('href').indexOf('devrant.io') === -1) {
        $(this).attr('target', '_blank');
    }
});


// Franz integration
module.exports = (Franz, options) => {
    Franz.injectCSS(path.join(__dirname, "css", "main.css"));
    var unread = "";

    function checkNotifs() {
        if ($('.top-bar-notif.notif-badge').length) {
            unread = $('.top-bar-notif.notif-badge').text();
        }
        Franz.setBadge(unread);
    }
    Franz.loop(checkNotifs);
};