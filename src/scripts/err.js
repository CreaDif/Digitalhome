window.onload = function () {


    tog_m();

    var width = document.documentElement.clientWidth + 1;
    var height = document.documentElement.clientHeight + 1;
    
    //canvas
    //written by Digital Home

    var colt = '#000000';
    var colb = '#000000';

    var rgbt = [0, 0, 0];
    var rgbb = [0, 0, 0];

    var mint = [0, 0, 0];
    var minb = [0, 0, 0];
    var maxt = [0, 0, 0];
    var maxb = [0, 0, 0];
    var stim = 0;
    var etim = 0;
    var time = 50;
    var tswitch = 1;


    var s = document.getElementById("sunset");
    var ctx;
    ud_dim();
    window.onresize = ud_dim;
    function ud_dim() {
        //update dimensions
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
        s.setAttribute("style", "width:" + width + "px;height:" + height + "px");
        ctx = s.getContext("2d");
    }

    function daytime() {
        dayLength = 240;
        time = (time + 1) % dayLength;
        colt = '#';
        colb = '#';

        if (time < dayLength * 6 / 24 && tswitch != 0) {
            tswitch = 0;
            stim = 0;
            etim = 6;
            mint = [0, 0, 50];
            minb = [50, 0, 50];
            maxt = [82, 1, 187];
            maxb = [207, 84, 70];
        } else if (time < dayLength * 9 / 24 && time >= dayLength * 6 / 24 && tswitch != 1) {
            tswitch = 1;
            stim = 6;
            etim = 9;
            mint = [82, 1, 187];
            minb = [207, 84, 70];
            maxt = [49, 132, 255];
            maxb = [200, 200, 235];
        } else if (time < dayLength * 12 / 24 && time >= dayLength * 9 / 24 && tswitch != 2) {
            tswitch = 2;
            stim = 9;
            etim = 12;
            mint = [49, 132, 255];
            minb = [200, 200, 235];
            maxt = [0, 113, 254];
            maxb = [240, 178, 133];
        } else if (time < dayLength * 18 / 24 && time >= dayLength * 12 / 24 && tswitch != 3) {
            tswitch = 3;
            stim = 12;
            etim = 18;
            mint = [0, 113, 254];
            minb = [240, 178, 133];
            maxt = [0, 0, 170];
            maxb = [238, 10, 20];
        } else if (time < dayLength * 21 / 24 && time >= dayLength * 18 / 24 && tswitch != 4) {
            tswitch = 4;
            stim = 18;
            etim = 21;
            mint = [0, 0, 170];
            minb = [238, 10, 20];
            maxt = [0, 0, 120];
            maxb = [80, 0, 50];
        } else if (time <= dayLength * 24 / 24 && time >= dayLength * 21 / 24 && tswitch != 5) {
            tswitch = 5;
            stim = 21;
            etim = 24;
            mint = [0, 0, 120];
            minb = [80, 0, 50];
            maxt = [0, 0, 50];
            maxb = [50, 0, 50];
        } else {
            //random shit -> this case will never happen
        }
       
       
        for (var i = 0; i < 3; i++) {
            var mt = (maxt[i] - mint[i]) / ((etim - stim));
            var mb = (maxb[i] - minb[i]) / ((etim - stim));
            
            rgbt[i] = mint[i] + mt * (time * 24 / dayLength - stim);
            rgbb[i] = minb[i] + mb * (time * 24 / dayLength - stim);

            rgbt[i] = rgbt[i] >= 0 ? rgbt[i] : 0;
            rgbb[i] = rgbb[i] >= 0 ? rgbb[i] : 0;

            rgbt[i] = rgbt[i] <= 255 ? rgbt[i] : 255;
            rgbb[i] = rgbb[i] <= 255 ? rgbb[i] : 255;

            colt += ('0' + (rgbt[i] | 0).toString(16)).substr(-2);
            colb += ('0' + (rgbb[i] | 0).toString(16)).substr(-2);
            
        }
        updateCanvas();
        
    }


    requestAnimationFrame(daytime);
    var iv = setInterval(function () {
        requestAnimationFrame(daytime);
    }, 100);


    function updateCanvas() {
        var grd = ctx.createLinearGradient(0, 0, 0, 100);
        var curr_x = getScLPos();
        grd.addColorStop(0, colt);
        grd.addColorStop(1, colb);
        ctx.fillStyle = grd;
        
        ctx.fillRect(0, 0, width, height);

    }


};


//parallax scrolling
var sky1 = document.getElementById("skyline1");
var sky2 = document.getElementById("skyline2");
var sky3 = document.getElementById("skyline3");
var sky4 = document.getElementById("skyline4");

function prllx2() {
    var curr_x = getScLPos();

    sky1.style.left = curr_x * 0.25 + "px";
    sky2.style.left = curr_x * 0.5 + "px";
    sky3.style.left = curr_x * 0.75 + "px";
    sky4.style.left = curr_x * 0.9 + "px";
    scroll_correct = false;
};

var scroll_correct = false;
function scrollex2() {
    if (scroll_correct == false) {
        scroll_correct = true;
        requestAnimationFrame(prllx2);
    }
}
window.onscroll = scrollex2;

