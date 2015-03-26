window.onload = function () {

    var tog_menu = 1;
    tog_m();
    var tog_search = 0;
    var width = document.documentElement.clientWidth + 1;
    var height = document.documentElement.clientHeight + 1;
    var mb = document.getElementById("m_button");
    mb.addEventListener("click", tog_m);

    function tog_m() {
        if (tog_menu == 0) {
            document.getElementById("navi").className = "active";
            document.getElementById("mb1").className = "mact";
            document.getElementById("mb2").className = "mact";
            document.getElementById("mb3").className = "mact";
            tog_menu = 1;
        } else {
            document.getElementById("navi").className = "idle";
            document.getElementById("mb1").className = "mnorm";
            document.getElementById("mb2").className = "mnorm";
            document.getElementById("mb3").className = "mnorm";
            tog_menu = 0;
        }
    }







};


//parallax scrolling


function currentXPosition() {
    if (self.pageXOffset) return self.pageXOffset;

    if (document.documentElement && document.documentElement.scrollLeft)
        return document.documentElement.scrollLeft;

    if (document.body.scrollLeft) return document.body.scrollLeft;
    return 0;
}



var scroll_correct = false;
function prllx() {
    var curr_x = currentXPosition();
    var speed = 0.5;
    var p1_img = document.getElementById("p1_bg_img");
    p1_img.style.left = curr_x * speed + 50 + "px";
    scroll_correct = false;
};
function scrollex() {
    if (scroll_correct == false) {
        scroll_correct = true;
        requestAnimationFrame(prllx);
    }
}
window.onscroll = function (event) {
    scrollex();
};