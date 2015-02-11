function currentXPosition() {
    if (self.pageXOffset) return self.pageXOffset;

    if (document.documentElement && document.documentElement.scrollLeft)
        return document.documentElement.scrollLeft;

    if (document.body.scrollLeft) return document.body.scrollLeft;
    return 0;
}


var tog_menu = 0;
var tog_search = 0;
//$("#navi").attr("class", "idle");
//$("#mb1, #mb2, #mb3").attr("class", "mnorm");
var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;
var curr_x = currentXPosition();


var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isFirefox = typeof InstallTrigger !== 'undefined';
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isChrome = !!window.chrome && !isOpera;
var isIE = /*@cc_on!@*/false || document.documentMode;

if (isChrome || isOpera || isSafari)
    var whole = $("body");
else
    var whole = $("html");



$("#m_button").click(function () {
    if (tog_menu == 0) {
        $("#navi").attr("class", "active");
        $("#mb1, #mb2, #mb3").attr("class", "mact");
        tog_menu = 1;
    } else {
        $("#navi").attr("class", "idle");
        $("#mb1, #mb2, #mb3").attr("class", "mnorm");
        tog_menu = 0;
    }
});



var scroll_correct = false;
function prllx() {
    if (window.innerHeight <= window.innerWidth) {
        clearTimeout($.data(this, 'scrollTimer'));
        var curr_x = currentXPosition();
        $.data(this, 'scrollTimer', setTimeout(function () {
            if (scroll_correct == false) {
                scroll_correct = true;
                var act_el = Math.floor(((curr_x/1.1) - width * 0.5) / width);     //adjust multiplier
                if (act_el >= 0) {
                    whole.stop().animate({
                        scrollLeft: width * 1.1 * (act_el + 1)                     //adjust multiplier
                    }, 500, "easeOutCubic");
                }
            }
        }, 600));
    }
};

$("a.scroll").click(function (event) {
    event.preventDefault();
    whole.animate({ scrollLeft: $(this.hash).offset().left }, 1500);
    //$("a.scroll").attr("class", "link scroll");
    //$(this).attr("class", "link clicked scroll");

    $("#navi").attr("class", "idle");
    $("#mb1, #mb2, #mb3").attr("class", "mnorm");
    tog_menu = 0;
});
