
var pointsList, svg, dragging, nPoints, nPointsCounter, pointsList, selectedT;

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



function startDrag(evt) {
    dragging = true;
    evt.target.style.cursor = "grabbing";
    svg.removeChild(document.getElementById("poligono"));
}

function drag(evt) {
    if (dragging) {
        var coord = getMousePosition(evt, svg);
        evt.target.setAttributeNS(null, "cx", coord.x);
        evt.target.setAttributeNS(null, "cy", coord.y);

        var oldCPoints = document.getElementsByClassName("curve");
        //Deletando a curva antiga
        while (oldCPoints[0]) oldCPoints[0].parentNode.removeChild(oldCPoints[0]);
        //Desenhando a curva
        var nPoints = pointsList.length, X, Y;
        for (t = 2; t < 199; t++) {
            var Cpoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            X = bezierCurvePosition("cx", t / (200), nPoints);
            Y = bezierCurvePosition("cy", t / (200), nPoints);

            Cpoint.setAttribute("cx", X);
            Cpoint.setAttribute("cy", Y);
            Cpoint.setAttribute("r", 5);
            Cpoint.setAttribute("id", "CP" + i.toString());
            Cpoint.classList.add("curve");
            svg.appendChild(Cpoint);
        }
        redrawPoints();
    }
}

function endDrag(evt) {

    if (dragging) {
        evt.target.style.cursor = "grab";
        dragging = false;
        drawPolygon();
        redrawPoints();
    }
}



function settings() {
    svg = document.getElementById("svg"), dragging = false, nPoints = 3, nPointsCounter = 0, pointsList = [];
    svg.addEventListener("click", drawPoint);
}

function restart() {
    pointsList = [],
        nPoints = parseInt(document.getElementById("nPoints").value),
        nPointsCounter = 0;
    var oldPoints = document.getElementsByClassName("ponto");
    //Deletando os pontos antigos
    while (oldPoints[0]) oldPoints[0].parentNode.removeChild(oldPoints[0]);

    var oldCPoints = document.getElementsByClassName("curve");
    //Deletando a curva antiga
    while (oldCPoints[0]) oldCPoints[0].parentNode.removeChild(oldCPoints[0]);
    //Deletando o poligono
    svg.removeChild(document.getElementById("poligono"));
}

function getMousePosition(evt, kkk) {
    var CTM = kkk.getScreenCTM();
    return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
    };
}

function ccw(pA, pB, pC) {
    var x1 = parseInt(pA.getAttribute("cx")), x2 = parseInt(pB.getAttribute("cx")), x3 = parseInt(pC.getAttribute("cx")), y1 = parseInt(pA.getAttribute("cy")), y2 = parseInt(pB.getAttribute("cy")), y3 = parseInt(pC.getAttribute("cy"));
    return -1 * ((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1));
}

function bezierCurvePosition(eixo, t, n) {
    var position = 0, fatorial = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368000, 20922789888000, 355687428096000, 6402373705728000, 121645100408832000, 2432902008176640000, 51090942171709440000, 1124000727777607680000, 25852016738884976640000, 620448401733239439360000, 15511210043330985984000000, 403291461126605635584000000, 10888869450418352160768000000, 304888344611713860501504000000, 8841761993739701954543616000000, 265252859812191058636308480000000, 8222838654177922817725562880000000, 263130836933693530167218012160000000, 8683317618811886495518194401280000000, 295232799039604140847618609643520000000, 10333147966386144929666651337523200000000, 371993326789901217467999448150835200000000, 13763753091226345046315979581580902400000000, 523022617466601111760007224100074291200000000, 20397882081197443358640281739902897356800000000, 815915283247897734345611269596115894272000000000, 33452526613163807108170062053440751665152000000000, 1405006117752879898543142606244511569936384000000000, 60415263063373835637355132068513997507264512000000000, 2658271574788448768043625811014615890319638528000000000, 119622220865480194561963161495657715064383733760000000000, 5502622159812088949850305428800254892961651752960000000000, 258623241511168180642964355153611979969197632389120000000000, 12413915592536072670862289047373375038521486354677760000000000, 608281864034267560872252163321295376887552831379210240000000000, 30414093201713378043612608166064768844377641568960512000000000000, 1551118753287382280224243016469303211063259720016986112000000000000, 80658175170943878571660636856403766975289505440883277824000000000000, 4274883284060025564298013753389399649690343788366813724672000000000000, 230843697339241380472092742683027581083278564571807941132288000000000000, 12696403353658275925965100847566516959580321051449436762275840000000000000, 710998587804863451854045647463724949736497978881168458687447040000000000000, 40526919504877216755680601905432322134980384796226602145184481280000000000000, 2350561331282878571829474910515074683828862318181142924420699914240000000000000, 138683118545689835737939019720389406345902876772687432540821294940160000000000000, 8320987112741390144276341183223364380754172606361245952449277696409600000000000000, 507580213877224798800856812176625227226004528988036003099405939480985600000000000000, 31469973260387937525653122354950764088012280797258232192163168247821107200000000000000, 1982608315404440064116146708361898137544773690227268628106279599612729753600000000000000, 126886932185884164103433389335161480802865516174545192198801894375214704230400000000000000, 8247650592082470666723170306785496252186258551345437492922123134388955774976000000000000000, 544344939077443064003729240247842752644293064388798874532860126869671081148416000000000000000, 36471110918188685288249859096605464427167635314049524593701628500267962436943872000000000000000, 2480035542436830599600990418569171581047399201355367672371710738018221445712183296000000000000000, 171122452428141311372468338881272839092270544893520369393648040923257279754140647424000000000000000, 11978571669969891796072783721689098736458938142546425857555362864628009582789845319680000000000000000, 850478588567862317521167644239926010288584608120796235886430763388588680378079017697280000000000000000, 61234458376886086861524070385274672740778091784697328983823014963978384987221689274204160000000000000000, 4470115461512684340891257138125051110076800700282905015819080092370422104067183317016903680000000000000000, 330788544151938641225953028221253782145683251820934971170611926835411235700971565459250872320000000000000000, 24809140811395398091946477116594033660926243886570122837795894512655842677572867409443815424000000000000000000, 1885494701666050254987932260861146558230394535379329335672487982961844043495537923117729972224000000000000000000, 145183092028285869634070784086308284983740379224208358846781574688061991349156420080065207861248000000000000000000, 11324281178206297831457521158732046228731749579488251990048962825668835325234200766245086213177344000000000000000000, 894618213078297528685144171539831652069808216779571907213868063227837990693501860533361810841010176000000000000000000, 71569457046263802294811533723186532165584657342365752577109445058227039255480148842668944867280814080000000000000000000, 5797126020747367985879734231578109105412357244731625958745865049716390179693892056256184534249745940480000000000000000000, 475364333701284174842138206989404946643813294067993328617160934076743994734899148613007131808479167119360000000000000000000, 39455239697206586511897471180120610571436503407643446275224357528369751562996629334879591940103770870906880000000000000000000, 3314240134565353266999387579130131288000666286242049487118846032383059131291716864129885722968716753156177920000000000000000000, 281710411438055027694947944226061159480056634330574206405101912752560026159795933451040286452340924018275123200000000000000000000, 24227095383672732381765523203441259715284870552429381750838764496720162249742450276789464634901319465571660595200000000000000000000, 2107757298379527717213600518699389595229783738061356212322972511214654115727593174080683423236414793504734471782400000000000000000000, 185482642257398439114796845645546284380220968949399346684421580986889562184028199319100141244804501828416633516851200000000000000000000, 16507955160908461081216919262453619309839666236496541854913520707833171034378509739399912570787600662729080382999756800000000000000000000, 1485715964481761497309522733620825737885569961284688766942216863704985393094065876545992131370884059645617234469978112000000000000000000000, 135200152767840296255166568759495142147586866476906677791741734597153670771559994765685283954750449427751168336768008192000000000000000000000, 12438414054641307255475324325873553077577991715875414356840239582938137710983519518443046123837041347353107486982656753664000000000000000000000, 1156772507081641574759205162306240436214753229576413535186142281213246807121467315215203289516844845303838996289387078090752000000000000000000000, 108736615665674308027365285256786601004186803580182872307497374434045199869417927630229109214583415458560865651202385340530688000000000000000000000, 10329978488239059262599702099394727095397746340117372869212250571234293987594703124871765375385424468563282236864226607350415360000000000000000000000, 991677934870949689209571401541893801158183648651267795444376054838492222809091499987689476037000748982075094738965754305639874560000000000000000000000, 96192759682482119853328425949563698712343813919172976158104477319333745612481875498805879175589072651261284189679678167647067832320000000000000000000000, 9426890448883247745626185743057242473809693764078951663494238777294707070023223798882976159207729119823605850588608460429412647567360000000000000000000000, 933262154439441526816992388562667004907159682643816214685929638952175999932299156089414639761565182862536979208272237582511852109168640000000000000000000000, 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000]
        ;
    for (i = 0; i < n; i++) {
        position += ((1 - t) ** (n - 1 - i)) * (t ** (i)) * (fatorial[n - 1] / (fatorial[n - 1 - i] * fatorial[i])) * parseFloat(pointsList[i].getAttribute(eixo));
    }
    return position;
}

function drawPoint(evt) {
    if (nPointsCounter < nPoints) {
        var coord = getMousePosition(evt, svg),
            point = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        point.setAttribute("cx", coord.x.toString());
        point.setAttribute("cy", coord.y.toString());
        point.setAttribute("r", 15);
        point.setAttribute("id", "P" + nPointsCounter.toString());
        point.classList.add("ponto");
        svg.appendChild(point);
        pointsList.push(point);
        nPointsCounter += 1;
        //Adicionando Intera��o
        point.addEventListener('mousedown', startDrag);
        point.addEventListener('mousemove', drag);
        point.addEventListener('mouseup', endDrag);
        point.addEventListener('mouseleave', endDrag);
    }
    if (nPointsCounter == nPoints) drawCurve(), drawPolygon(), redrawPoints(), nPointsCounter += 1;

}

function drawCurve() {
    var oldCPoints = document.getElementsByClassName("curve");
    //Deletando a curva antiga
    while (oldCPoints[0]) oldCPoints[0].parentNode.removeChild(oldCPoints[0]);
    //Desenhando a curva
    var CPoints = pointsList.length, X, Y, t = 0;

    function curveAnimation() {
        var Cpoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        X = bezierCurvePosition("cx", t / (200), CPoints);
        Y = bezierCurvePosition("cy", t / (200), CPoints);

        Cpoint.setAttribute("cx", X);
        Cpoint.setAttribute("cy", Y);
        Cpoint.setAttribute("r", 5);
        Cpoint.setAttribute("id", "CP" + i.toString());
        Cpoint.classList.add("curve");
        svg.appendChild(Cpoint);
        document.getElementById("t").textContent = "t = " + t / 2;

        t += 1;
        if (t > 200) clearInterval(animation);
    }
    selectedT = parseFloat(document.getElementById("slider").value);
    var animation = setInterval(curveAnimation, 25 - (selectedT / 10));
}

function drawPolygon() {
    var p0;

    function cosine(pA, pB) {
        var x1 = parseInt(pA.getAttribute("cx")), x2 = parseInt(pB.getAttribute("cx")), y1 = parseInt(pA.getAttribute("cy")), y2 = parseInt(pB.getAttribute("cy"));
        if (pA == pB) return 1
        else return (x2 - x1) / (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
    }

    function compare(a, b) {
        return (cosine(p0, b) - cosine(p0, a));
    }

    function createPolygon(vertices) {
        var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon"), pontos = "";

        for (var i = 0; i < vertices.length; i++) {
            pontos = pontos.concat(vertices[i] + " ");
        }

        polygon.setAttribute("points", pontos);
        polygon.setAttribute("id", "poligono");
        svg.appendChild(polygon);
    }

    function grahamScan() {
        var vertices = [], pointsList = document.getElementsByClassName("ponto"), hullPoints = [];
        pointsList = Array.from(pointsList);
        p0 = pointsList[0];

        //Achando o ponto com maior ordenada e atribuindo p0 este valor
        for (var i = 0; i < pointsList.length; i++) {
            if (parseFloat(pointsList[i].getAttribute("cy")) > parseFloat(p0.getAttribute("cy"))) p0 = pointsList[i];
            else if (parseFloat(pointsList[i].getAttribute("cy")) == parseFloat(p0.getAttribute("cy"))) {
                if (parseFloat(pointsList[i].getAttribute("cx")) < parseFloat(p0.getAttribute("cx"))) p0 = pointsList[i];
            }
        }
        //Ordenando o array de acordo com o coseno do angulo que eles fazem com o eixo x
        pointsList.sort(compare);
        //Verificando quais pontos est�o no envolt�rio convexo m�nimo
        hullPoints.push(pointsList[0]);
        hullPoints.push(pointsList[1]);
        for (var i = 2; i < pointsList.length; i++) {
            var cpd = ccw(hullPoints[hullPoints.length - 2], hullPoints[hullPoints.length - 1], pointsList[i]);
            if (cpd == 0) {
                hullPoints.pop();
                hullPoints.push(pointsList[i]);
            } else if (cpd > 0) {
                hullPoints.push(pointsList[i]);
            } else {
                while (cpd <= 0 && hullPoints.length > 2) {
                    hullPoints.pop();
                    cpd = ccw(hullPoints[hullPoints.length - 2], hullPoints[hullPoints.length - 1], pointsList[i]);
                }
                hullPoints.push(pointsList[i]);
            }
        }
        //Formando o vetor com as coordenadas dos vertices do poligono
        for (var i = 0; i < hullPoints.length; i++) vertices.push(hullPoints[i].getAttribute("cx") + "," + hullPoints[i].getAttribute("cy"));
        //Chamando a fun��o que desenha os pol�gonos
        createPolygon(vertices);
    }

    grahamScan();
}

function redrawPoints() {
    var oldPoints = document.getElementsByClassName("ponto");
    //Deletando os pontos antigos
    while (oldPoints[0]) oldPoints[0].parentNode.removeChild(oldPoints[0]);
    //Recriando eles de modo que fiquem sobre os outros elementos do SVG
    for (var i = 0; i < pointsList.length; i++) {
        svg.appendChild(pointsList[i]);
    }
}



var animationPointsList = [], canvas;

function animationSettings() {
    canvas = document.getElementById("gscanAnimation"), animationPointsList = [];

    canvas.addEventListener("click", drawAnimationPoint);

    function drawAnimationPoint(evt) {
        var coord = getMousePosition(evt, canvas),
            point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        point.setAttribute("cx", coord.x.toString());
        point.setAttribute("cy", coord.y.toString());
        point.setAttribute("r", 10);
        point.setAttribute("id", "AP" + animationPointsList.length.toString());
        point.setAttribute("stroke", "#22277a");
        point.setAttribute("stroke-width", "2px");
        point.setAttribute("fill", "#4066e0");
        canvas.appendChild(point);
        animationPointsList.push(point);
    }
}

function startAnimation() {
    var p0 = animationPointsList[0], animation = setInterval(findHighestAnimation, 750), i = 0;
    p0.classList.add("p0");

    function testIntersection(line, point) {
        var x1 = parseFloat(line.getAttribute("x1")), x2 = parseFloat(line.getAttribute("x2")), y1 = parseFloat(line.getAttribute("y1")), y2 = parseFloat(line.getAttribute("y2")), cx = parseFloat(point.getAttribute("cx")), cy = parseFloat(point.getAttribute("cy")), r = parseFloat(point.getAttribute("r"));

        var m = (y2 - y1) / (x2 - x1), plano = m * (cx - x1) + y1;

        if (cy > plano && m < 0) return true;
        else if (cy < plano && m > 0) return true;
        else return false;

    }

    function findHighestAnimation() {
        if (i < animationPointsList.length) {
            if (i > 0) animationPointsList[i - 1].setAttribute("fill", "#4066e0");
            if (parseFloat(animationPointsList[i].getAttribute("cy")) > parseFloat(p0.getAttribute("cy"))) {
                p0.classList.remove("p0");
                p0 = animationPointsList[i];
                p0.classList.add("p0");
            }
            else if (parseFloat(animationPointsList[i].getAttribute("cy")) == parseFloat(p0.getAttribute("cy"))) {
                if (parseFloat(animationPointsList[i].getAttribute("cx")) < parseFloat(p0.getAttribute("cx"))) {
                    p0.classList.remove("p0");
                    p0 = animationPointsList[i];
                    p0.classList.add("p0");
                }
            }
        }
        if (i < animationPointsList.length) animationPointsList[i].setAttribute("fill", "lightgreen");
        else if (i >= animationPointsList.length) {
            clearInterval(animation);
            if (animationPointsList[i - 1] != p0) animationPointsList[i - 1].setAttribute("fill", "#4066e0");
            orderByCosAnimation();
        }
        i++;
    }

    var VanimationPointsList = animationPointsList,
        animationOrderedPoints = [p0];

    function orderByCosAnimation() {
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        var raio = 2000, theta = 0;
        var x = p0.getAttribute("cx"), y = p0.getAttribute("cy");
        line.setAttribute("stroke-width", "3px");
        line.setAttribute("stroke", "black");
        line.setAttribute("x1", x);
        line.setAttribute("y1", y);
        line.setAttribute("x2", raio + x);
        line.setAttribute("y2", y);
        canvas.appendChild(line);

        var animation = setInterval(rotateRadius, 10), plotNumber = 1;


        function rotateRadius() {
            line.setAttribute("x2", raio * Math.cos(theta) + parseFloat(x));
            line.setAttribute("y2", raio * Math.sin(theta) * -1 + parseFloat(y));

            for (i = 0; i < VanimationPointsList.length; i++) {
                if (testIntersection(line, VanimationPointsList[i])) {
                    var number = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    number.textContent = plotNumber;
                    number.setAttribute("x", (parseFloat(VanimationPointsList[i].getAttribute("cx")) + 15).toString());
                    number.setAttribute("y", (parseFloat(VanimationPointsList[i].getAttribute("cy")) + 10).toString());
                    number.setAttribute("font-size", "30px");
                    canvas.appendChild(number);
                    VanimationPointsList[i].setAttribute("r", "12");
                    animationOrderedPoints.push(VanimationPointsList[i]);
                    VanimationPointsList.splice(i, 1);
                    plotNumber += 1;
                }
            }

            if (theta > Math.PI) clearInterval(animation), canvas.removeChild(line), rateTurns();
            theta += 0.005;
        }

    }

    function rateTurns() {
        var animationHullPoints = [];
        animationHullPoints.push(p0);
        animationHullPoints.push(animationOrderedPoints[1]);

        var animation = setInterval(paintEdges, 1000), i = 2, voltando, voltandoList = [];

        function paintEdges() {
            var p1 = animationHullPoints[animationHullPoints.length - 2], p2 = animationHullPoints[animationHullPoints.length - 1], p3 = animationOrderedPoints[i];
            var cpd = ccw(p1, p2, p3);
            //Deletando arestas que deram errado, caso existam
            if (document.getElementById("bad1")) canvas.removeChild(document.getElementById("bad1"));
            if (document.getElementById("bad2")) canvas.removeChild(document.getElementById("bad2"));
            for (let k = 0; k < voltandoList.length; k++) {
                canvas.removeChild(document.getElementById((voltandoList[k] - 1).toString() + "2"));
            }
            voltandoList = [];
            //Criando arestas entre esses pontos

            var aresta1 = document.createElementNS("http://www.w3.org/2000/svg", "line"),
                aresta2 = document.createElementNS("http://www.w3.org/2000/svg", "line");


            aresta1.setAttribute("stroke-width", "5px");
            aresta1.setAttribute("x1", p1.getAttribute("cx"));
            aresta1.setAttribute("y1", p1.getAttribute("cy"));
            aresta1.setAttribute("x2", p2.getAttribute("cx"));
            aresta1.setAttribute("y2", p2.getAttribute("cy"));
            aresta1.setAttribute("id", i.toString() + "1");
            canvas.appendChild(aresta1);


            aresta2.setAttribute("stroke-width", "5px");
            aresta2.setAttribute("x1", p2.getAttribute("cx"));
            aresta2.setAttribute("y1", p2.getAttribute("cy"));
            aresta2.setAttribute("x2", p3.getAttribute("cx"));
            aresta2.setAttribute("y2", p3.getAttribute("cy"));
            aresta2.setAttribute("id", i.toString() + "2");
            canvas.appendChild(aresta2);

            if (cpd == 0) {
                aresta1.setAttribute("stroke", "green");
                aresta2.setAttribute("stroke", "green");
                animationHullPoints.pop();
                animationHullPoints.push(animationOrderedPoints[i]);
            } else if (cpd > 0) {
                aresta1.setAttribute("stroke", "green");
                aresta2.setAttribute("stroke", "green");
                animationHullPoints.push(animationOrderedPoints[i]);
            } else {
                voltando = i;
                while (cpd <= 0 && animationHullPoints.length > 2) {
                    if (document.getElementById("bad1")) canvas.removeChild(document.getElementById("bad1"));
                    if (document.getElementById("bad2")) canvas.removeChild(document.getElementById("bad2"));

                    voltandoList.push(voltando);
                    p2.setAttribute("opacity", 0.5);
                    aresta1.setAttribute("stroke", "red");
                    aresta2.setAttribute("stroke", "red");
                    aresta1.setAttribute("id", "bad1");
                    aresta2.setAttribute("id", "bad2");
                    animationHullPoints.pop();
                    p1 = animationHullPoints[animationHullPoints.length - 2];
                    p2 = animationHullPoints[animationHullPoints.length - 1];
                    p3 = animationOrderedPoints[i];
                    cpd = ccw(p1, p2, p3);
                    voltando--;
                }
                animationHullPoints.push(animationOrderedPoints[i]);
            }
            i++;
            if (i >= animationOrderedPoints.length) {
                if (document.getElementById("bad1")) canvas.removeChild(document.getElementById("bad1"));
                if (document.getElementById("bad2")) canvas.removeChild(document.getElementById("bad2"));
                var aresta1 = document.createElementNS("http://www.w3.org/2000/svg", "line"),
                    aresta2 = document.createElementNS("http://www.w3.org/2000/svg", "line");

                aresta1.setAttribute("stroke-width", "5px");
                aresta1.setAttribute("stroke", "green");
                aresta1.setAttribute("x1", animationHullPoints[animationHullPoints.length - 1].getAttribute("cx"));
                aresta1.setAttribute("y1", animationHullPoints[animationHullPoints.length - 1].getAttribute("cy"));
                aresta1.setAttribute("x2", animationHullPoints[animationHullPoints.length - 2].getAttribute("cx"));
                aresta1.setAttribute("y2", animationHullPoints[animationHullPoints.length - 2].getAttribute("cy"));
                canvas.appendChild(aresta1);

                aresta2.setAttribute("stroke-width", "5px");
                aresta2.setAttribute("stroke", "green");
                aresta2.setAttribute("x1", animationHullPoints[animationHullPoints.length - 1].getAttribute("cx"));
                aresta2.setAttribute("y1", animationHullPoints[animationHullPoints.length - 1].getAttribute("cy"));
                aresta2.setAttribute("x2", p0.getAttribute("cx"));
                aresta2.setAttribute("y2", p0.getAttribute("cy"));
                canvas.appendChild(aresta2);
                clearInterval(animation);
            }
        }
    }
}