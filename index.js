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



window.addEventListener("mousewheel", MouseWheelHandler, false);
window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);


var lastScrollLeft = document.documentElement.scrollLeft;
var lastScrollTop = document.documentElement.scrollTop;

function MouseWheelHandler(e) {
    var e = window.event || e;
    var delta = e.wheelDelta || -e.detail;
    //check if scrolled horizontaly or verticaly
    var deltaScLeft = document.documentElement.scrollLeft - lastScrollLeft;
    var deltaScTop = document.documentElement.scrollTop - lastScrollTop;
    var scrolledXdir = false;
    var scrolledYdir = false;
    if (Math.abs(deltaScLeft) > Math.abs(deltaScTop)) {
        scrolledXdir = true;
        console.log(delta);
        lastScrollLeft = deltaScLeft;
    } else {
        scrolledXdir = false;
        console.log("ver");
    }
    if (scrolledXdir == false) {
        startX = null;
        startY = document.documentElement.scrollLeft;
        dest = startY + delta * document.documentElement.clientWidth * 0.4;
        scAnimate();
    }
}



//Button Click scroll
var start = null;
var from = document.documentElement.scrollLeft;
var dest = 0;
var last = 0;
var duration = 1000;
var reqID;

window.onkeydown = function (e) {
    if (e.keyCode == 37 || e.keyCode == 38) {
        e.preventDefault();
        startX = null;
        startY = document.documentElement.scrollLeft;
        dest = startY - document.documentElement.clientWidth * 0.4;
        scAnimate();
    } else if (e.keyCode == 39 || e.keyCode == 40) {
        e.preventDefault();
        startX = null;
        startY = document.documentElement.scrollLeft;
        dest = startY + document.documentElement.clientWidth * 0.4;
        scAnimate();
    }
}



document.getElementById("s_button").onclick = function () {
    //set Animation parameters
    startX = null;
    startY = document.documentElement.scrollLeft;
    dest = startY + document.documentElement.clientWidth * 0.4;
    //call animation
    scAnimate();
};

function scAnimate() {
    if (reqID) {
        //cancel ongoing animation
        cancelAnimationFrame(reqID);
    }
    reqID = requestAnimationFrame(scStep);
}

function delta(prog) {
    return 1 - Math.pow(1 - prog, 3);
}

function scStep(timestamp) {
    if (startX == null){startX = timestamp;}
    var passed = timestamp - startX;
    var progress = passed / duration;
    var value = startY + ((dest - startY) * delta(progress));
    document.documentElement.scrollLeft = value;
    if (progress < 1){reqID = requestAnimationFrame(scStep);}
    if (progress >= 1){startX = null;from = document.documentElement.scrollLeft;}
}