window.onload = function () {
    tog_m();
};

var tog_menu = 1;
var width = document.documentElement.clientWidth + 1;
var height = document.documentElement.clientHeight + 1;
document.getElementById("m_button").addEventListener("click", tog_m);

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


//parallax scrolling


function getScLPos() {
    if (self.pageXOffset) return self.pageXOffset;
    if (document.documentElement && document.documentElement.scrollLeft)
        return document.documentElement.scrollLeft; 
    if (document.body.scrollLeft) return document.body.scrollLeft;
        return 0; 
}

//ScLPos = ScrollLeftPosition
//bug warning: if(0) will not be fired -> check variable + check (variable value == 0)
function setScLPos(pos) {
    if (document.documentElement.scrollLeft || document.documentElement.scrollLeft == 0)
        document.documentElement.scrollLeft = pos;
    if (document.body.scrollLeft || document.body.scrollLeft == 0)
        document.body.scrollLeft = pos;
}




var p1_img = document.getElementById("p1_bg_img");

function prllx() {
    var curr_x = getScLPos();
    var speed = 0.5;
    
    p1_img.style.left = curr_x * speed + 50 + "px";
    scroll_correct = false;
};

var scroll_correct = false;
function scrollex() {
    if (scroll_correct == false) {
        scroll_correct = true;
        requestAnimationFrame(prllx);
    }
}
window.onscroll = scrollex;

//horizontal scroll translation
window.addEventListener("wheel", mousewheel, false);          //non FF
window.addEventListener("DOMMouseScroll", mousewheel, false); //FF
window.onmousewheel = mousewheel;

function mousewheel(e) {
    var e = window.event || e;
    //var delta = e.wheelDeltaY / 40 || -e.detail;
    if (e.wheelDeltaY) {
        //Webkit
        var delta = e.wheelDeltaY / 40;
        startX = null;
        startY = getScLPos();
        dest = startY - delta * document.documentElement.clientWidth * 0.13;
        duration = 500;
        scAnimate();
    } else if (e.wheelDelta) {
        //IE
        cancelAnim();
        var delta = e.wheelDelta / 40;
        setScLPos(getScLPos() - delta * 20);
    } else {
        //Others
        cancelAnim();
        var delta = -e.detail;
        setScLPos(getScLPos() - delta * 20);
    }
}

//Arrow Navigation
window.onkeydown = function (e) {
    if (e.keyCode == 37 || e.keyCode == 38) {
        startX = null;
        startY = getScLPos();
        dest = startY - document.documentElement.clientWidth * 0.4;
        duration = 1000;
        scAnimate();
        e.preventDefault();
    } else if (e.keyCode == 39 || e.keyCode == 40) {
        startX = null;
        startY = getScLPos();
        dest = startY + document.documentElement.clientWidth * 0.4;
        duration = 1000;
        scAnimate();
        e.preventDefault();
    }
}


//Animation CORE
var startX = null;
var startY = getScLPos();
var dest = 0;
var duration = 1000;
var reqID = 0;


document.getElementById("s_button").onclick = function () {
    //set Animation parameters
    startX = null;
    startY = getScLPos();
    dest = startY + document.documentElement.clientWidth * 0.4;
    duration = 1000;
    //call animation
    scAnimate();
};

function cancelAnim() {
    if (reqID) {
        //cancel ongoing animation
        cancelAnimationFrame(reqID);
        reqID = 0;
    }
}
function scAnimate() {
    cancelAnim();
    reqID = requestAnimationFrame(scStep);
    
}

function delta(prog) {
    return 1 - Math.pow(1 - prog, 3);
}

function scStep(timestamp) {
    if (startX == null)
        startX = timestamp;
    var passed = timestamp - startX;
    var progress = passed / duration;
    var value = startY + ((dest - startY) * delta(progress));
    setScLPos(value);
    if (progress < 1){reqID = requestAnimationFrame(scStep);}
    if (progress >= 1) { startX = null; startY = getScLPos(); }
}