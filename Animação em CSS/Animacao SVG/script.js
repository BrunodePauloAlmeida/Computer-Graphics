function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("realMain").style.marginLeft = "250px";
  document.getElementById("span").style.opacity = 0;
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("realMain").style.marginLeft = "0";
  document.getElementById("span").style.opacity = 1;
}

function makeClickable(evt) {

    var svg = evt.target;
    var p1 = document.getElementById("p1"), p2 = document.getElementById("p2"), l1 = document.getElementById("l1"),
        l2 = document.getElementById("l2"), nose = document.getElementById("nose"), tongue = document.getElementById("tongue"),
        pote = null, offset;

    nose.addEventListener('click', nose_clicked);
    svg.addEventListener('click', clicked);
    svg.addEventListener('contextmenu', zoom);
    document.getElementById("ppl1").addEventListener('animationiteration', parou_de_rodar);
    document.getElementById("bochechas").addEventListener('animationiteration', nao_to_mais_com_vergonha);
    p1.addEventListener('animationiteration', stop_animation);
    document.getElementById("nothing").addEventListener('animationiteration', stop_zoom);
    document.getElementById("pote").addEventListener('mousedown', startDrag);
    document.getElementById("pote").addEventListener('mousemove', drag);
    document.getElementById("pote").addEventListener('mouseup', endDrag);
    document.getElementById("pote").addEventListener('mouseleave', endDrag);

    function startDrag(evt) {
        pote = document.getElementById("pote_movel");
        document.getElementById("pote").style.cursor = "grabbing";
        tongue.style.animationPlayState = "paused";
        nose.style.animationPlayState = "paused";
    }

    function drag(evt) {
        if (pote) {
            evt.preventDefault();
            document.getElementById("tongueA").setAttribute("transform", "scale(0.1)");
            document.getElementById("sobrancelha").style.opacity = 1;
            document.getElementById("angryMouth").style.opacity = 1;
	    document.getElementById("top_teeth").style.opacity = 1;

            var coord = getMousePosition(evt);
            pote.setAttributeNS(null, "x", coord.x - 400);
        }
    }

    function endDrag(evt) {
        document.getElementById("tongueA").setAttribute("transform", "scale(1)");
        document.getElementById("pote").style.cursor = "grab";
        document.getElementById("sobrancelha").style.opacity = 0;
        document.getElementById("angryMouth").style.opacity = 0;
	document.getElementById("top_teeth").style.opacity = 0;
        tongue.style.animationPlayState = "running";
        nose.style.animationPlayState = "running";

        pote = null;
    }

    function getMousePosition(evt) {
        var CTM = svg.getScreenCTM();
        return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
        };
    }

    function normalized_vector(Xf, Xi, Yf, Yi) {

        return {
            x: (Xf - Xi) / Math.sqrt((Xf - Xi) * (Xf - Xi) + (Yf - Yi) * (Yf - Yi)),
            y: (Yf - Yi) / Math.sqrt((Xf - Xi) * (Xf - Xi) + (Yf - Yi) * (Yf - Yi))
        };
    }

    function pausa_olhada() {
        p1.style.animationPlayState = "paused";
        l1.style.animationPlayState = "paused";
        p2.style.animationPlayState = "paused";
        l2.style.animationPlayState = "paused";
    }

    function clicked(evt) {
        evt.preventDefault();
        var coord = getMousePosition(evt), vetor;

        vetor1 = normalized_vector(coord.x, 360, coord.y, 180);
        vetor2 = normalized_vector(coord.x, 440, coord.y, 180);

        p1.style.animationPlayState = "initial";
        p1.style.setProperty("--x", (3 * vetor1.x).toString() + "px");
        p1.style.setProperty("--y", (2.5 * vetor1.y).toString() + "px");


        l1.style.animationPlayState = "initial";
        l1.style.setProperty("--x", (3 * vetor1.x).toString() + "px");
        l1.style.setProperty("--y", (2.5 * vetor1.y).toString() + "px");


        p2.style.animationPlayState = "initial";
        p2.style.setProperty("--x", (3 * vetor2.x).toString() + "px");
        p2.style.setProperty("--y", (2.5 * vetor2.y).toString() + "px");

        l2.style.animationPlayState = "initial";
        l2.style.setProperty("--x", (3 * vetor2.x).toString() + "px");
        l2.style.setProperty("--y", (2.5 * vetor2.y).toString() + "px");

    }

    function nose_clicked(evt) {
        p1.style.setProperty("--x", 0);
        p1.style.setProperty("--y", 0);
        l1.style.setProperty("--x", 0);
        l1.style.setProperty("--y", 0);
        p2.style.setProperty("--x", 0);
        p2.style.setProperty("--y", 0);
        l2.style.setProperty("--x", 0);
        l2.style.setProperty("--y", 0);
        tongue.style.animationPlayState = "paused";
        nose.style.animationPlayState = "paused";
        pausa_olhada();
        document.getElementById("tongueA").style.animationPlayState = "running";
        document.getElementById("mouth").style.animationPlayState = "running";
        document.getElementById("dog").style.animationPlayState = "running";
        document.getElementById("pupila1").style.animationPlayState = "running";
        document.getElementById("pupila2").style.animationPlayState = "running";
        document.getElementById("bochechas").style.animationPlayState = "running";
        document.getElementById("ppl1").style.animationPlayState = "running";
        document.getElementById("ppl2").style.animationPlayState = "running";
    }

    function nao_to_mais_com_vergonha(evt) {
        document.getElementById("bochechas").style.animationPlayState = "paused";
    }

    function parou_de_rodar(evt) {
        document.getElementById("tongueA").style.animationPlayState = "paused";
        document.getElementById("mouth").style.animationPlayState = "paused";
        document.getElementById("dog").style.animationPlayState = "paused";
        document.getElementById("pupila1").style.animationPlayState = "paused";
        document.getElementById("pupila2").style.animationPlayState = "paused";
        document.getElementById("ppl1").style.animationPlayState = "paused";
        document.getElementById("ppl2").style.animationPlayState = "paused";
        tongue.style.animationPlayState = "running";
        nose.style.animationPlayState = "running";
    }

    function stop_animation(evt) {
        pausa_olhada();
    }

    function zoom(evt) {
        evt.preventDefault();
        var coord = getMousePosition(evt), dog = document.getElementById("dogzoom");
        console.log(coord.x, coord.y);
        dog.style.setProperty("--zx", (coord.x).toString() + "px");
        dog.style.setProperty("--zy", (coord.y).toString() + "px");
        dog.style.animationPlayState = "running";
        document.getElementById("nothing").style.animationPlayState = "running";
    }

    function stop_zoom(evt) {
        console.log("I'M IN !!!")
        document.getElementById("dogzoom").style.animationPlayState = "paused";
        document.getElementById("nothing").style.animationPlayState = "paused";
    }


}
