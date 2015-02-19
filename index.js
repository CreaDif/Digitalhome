window.onload = function () {

    var tog_menu = 0;
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

    var mint = [0, 0, 20];
    var minb = [10, 0, 20];
    var maxt = [100, 180, 255];
    var maxb = [200, 230, 230];
    var time = 0;


    var s = document.getElementById("sunset");
    s.setAttribute("style", "width:" + width + "px;height:" + height+"px");
    s.style.width = ""+width;
    s.style.height = ""+height;
    var ctx = s.getContext("2d");


    window.onresize = ud_dim;

    function ud_dim() {
        //update dimensions -> Bildschirmmaße für Canvas updaten
        width = document.documentElement.clientWidth + 1;
        height = document.documentElement.clientHeight + 1;
        s.setAttribute("style", "width:" + width + "px;height:" + height + "px");
        s.style.width = "" + width;
        s.style.height = "" + height;
        ctx = c.getContext("2d");
    }


   

    function daytime() {
        dayLength = 1200;
        time = (time + 1) % dayLength;
        colt = '#';
        colb = '#';

        var dcolt = [0, 0, 0];
        var dcolb = [0, 0, 0];

        if (time < dayLength / 6) {
            //morgens
            dcolt = [0.5, 0, 1];
            dcolb = [1.2, 0.5, 0.3];
            maxt = [200, 180, 255];
            maxb = [240, 180, 255];
        } else if (time < 2 * dayLength / 6) {
            //vormittags
            dcolt = [-0.2, 0.8, 2];
            dcolb = [-0.2, 1, 1];
        } else if (time < 3 * dayLength / 6) {
            //mittags
            dcolt = [-0.3, -0.1, 0.2];
            dcolb = [0.7, 0.1, -0.6];
            maxt = [100, 180, 255];
            maxb = [240, 180, 255];
        } else if (time < 4 * dayLength / 6) {
            //abends
            dcolt = [-1, -2, -0.5];
            dcolb = [1.5, -1, -2];
            maxt = [200, 180, 255];
            maxb = [240, 230, 180];
        } else if (time < 5 * dayLength / 6) {
            //nachts
            dcolt = [-2, -3, -1];
            dcolb = [-1, -2, -1];
        } else {
            //mitternachts
            dcolt = [-2, -3, -3];
            dcolb = [-2, -3, -3];
        }



        for (var i = 0; i < 3; i++) {
            dcolt[i] = dcolt[i] * 1000 / dayLength;
            dcolb[i] = dcolb[i] * 1000 / dayLength;

            rgbt[i] += dcolt[i];
            rgbb[i] += dcolb[i];
            if (rgbt[i] < mint[i]) {
                rgbt[i] = mint[i];
            } else if (rgbt[i] > maxt[i]) {
                rgbt[i] = maxt[i];
            }
            if (rgbb[i] < minb[i]) {
                rgbb[i] = minb[i];
            } else if (rgbb[i] > maxb[i]) {
                rgbb[i] = maxb[i];
            }

            colt += ('0' + (rgbt[i] | 0).toString(16)).substr(-2);
            colb += ('0' + (rgbb[i] | 0).toString(16)).substr(-2);
        }
        updateCanvas();
    }


    requestAnimationFrame(daytime);
    var iv = setInterval(function () {
        //rekursiver Aufruf der requestAnimationFrame Methode, um stabile 60fps zu gewährleisten
        requestAnimationFrame(daytime);
    }, 40);


    function updateCanvas() {
        var grd = ctx.createLinearGradient(0, 0, 0, 140);
        grd.addColorStop(0, colt);
        grd.addColorStop(1, colb);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, width, height);
    }





};