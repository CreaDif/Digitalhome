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

    //canvas
    //geschrieben von der DigitalHome Gruppe

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
    var time = 200;
    var tswitch = 1;


    var s = document.getElementById("sunset");
    var ctx;
    ud_dim();

    window.onresize = ud_dim;

    function ud_dim() {
        //update dimensions -> Bildschirmmaße für Canvas updaten
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
        s.setAttribute("style", "width:" + width + "px;height:" + height + "px");
        s.style.width = "1";
        s.style.height = "" + height;
        ctx = s.getContext("2d");
        ctx.scale(width/5, 21);
    }


   

    function daytime() {
        dayLength = 960;
        time = (time + 1) % dayLength;
        colt = '#';
        colb = '#';

        if (time < dayLength * 6 / 24 && tswitch != 0) {
            tswitch = 0;
            stim = 0;
            etim = 6;
            mint = [0, 0, 0];
            minb = [0, 0, 0];
            maxt = [82, 1, 187];
            maxb = [207, 84, 70];
        } else if (time < dayLength * 9 / 24 && time >= dayLength * 6 / 24 && tswitch != 1) {
            tswitch = 1;
            stim = 6;
            etim = 9;
            mint = [82, 1, 187];
            minb = [207, 84, 70];
            maxt = [49, 132, 255];
            maxb = [175, 180, 235];
        } else if (time < dayLength * 12 / 24 && time >= dayLength * 9 / 24 && tswitch != 2) {
            tswitch = 2;
            stim = 9;
            etim = 12;
            mint = [49, 132, 255];
            minb = [175, 180, 235];
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
            maxt = [0, 0, 0];
            maxb = [0, 0, 0];
        } else if (time <= dayLength * 24 / 24 && time >= dayLength * 21 / 24 && tswitch != 5) {
            tswitch = 5;
            stim = 21;
            etim = 24;
            mint = [0, 0, 0];
            minb = [0, 0, 0];
            maxt = [0, 0, 0];
            maxb = [0, 0, 0];
        } else {
            //random shit -> dieser Fall wird nie eintreten
        }
       
        

        //var debugr = time;
        //var debugl = time;
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
            
            //debugl += " | " + mt + " | " + colt;
            //debugr += " | " + mb + " | " + (rgbb[i] | 0) + " | " + colb;
        }
        //console.log(debugr);
        updateCanvas();
        
    }


    requestAnimationFrame(daytime);
    var iv = setInterval(function () {
        //rekursiver Aufruf der requestAnimationFrame Methode, um stabile 60fps zu gewährleisten
        requestAnimationFrame(daytime);
    }, 100);


    function updateCanvas() {
        var grd = ctx.createLinearGradient(0, 0, 0, 5);
        grd.addColorStop(0, colt);
        grd.addColorStop(1, colb);
        ctx.fillStyle = grd;
        
        ctx.fillRect(0, 0, 1, height/120);
    }





};