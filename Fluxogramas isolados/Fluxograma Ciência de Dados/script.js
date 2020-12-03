// Classe Subject
class Subject {
    constructor(pr, nome, link) {
        this.pre = pr;
        this.pos = [];
        this.related = [];
        this.related.push(this);
        this.related.push(pr);
        this.nome = nome;
        this.position = [0, 0];
        this.link = link;
    }

    add_pos(po) {
        this.pos.push(po);
        this.related.push(po);
    }
}

//Declarando todas as materias que serao utilizadas depois
var
    CUV = new Subject([], "CUV", "https://emap.fgv.br/disciplina/graduacao/calculo-variavel"),                             						GAN = new Subject([], "GAN", "https://emap.fgv.br/disciplina/graduacao/geometria-analitica"),            						ICD = new Subject([], "ICD", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/introducao-ciencia-de-dados"),  	IAC = new Subject([], "IAC", "https://emap.fgv.br/disciplina/graduacao/introducao-computacao"),        					ADV = new Subject([], "ADV", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/analise-exploratoria-de-dados-visualizacao"),
    CVV = new Subject([CUV], "CVV", "https://emap.fgv.br/disciplina/graduacao/calculo-varias-variaveis"),                  						ALL = new Subject([GAN], "ALL", "https://emap.fgv.br/disciplina/graduacao/algebra-linear"),              						IAE = new Subject([], "IAE", "https://emap.fgv.br/disciplina/graduacao/introducao-economia"),               				LDP = new Subject([IAC], "LDP", "https://emap.fgv.br/disciplina/graduacao/linguagens-de-programacao"), 					BDD = new Subject([IAC], "BDD", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/analise-exploratoria-de-dados-visualizacao"),
	EDO = new Subject([CVV, ALL], "EDO", "https://emap.fgv.br/disciplina/graduacao/equacoes-diferenciais-ordinarias-edo"), 						TDP = new Subject([ALL, CVV], "TDP", "https://emap.fgv.br/disciplina/graduacao/teoria-probabilidade"),   						ALN = new Subject([LDP, ALL], "ALN", "https://emap.fgv.br/disciplina/graduacao/algebra-linear-numerica"),   				EDA = new Subject([LDP], "EDA", "https://emap.fgv.br/disciplina/graduacao/estruturas-de-dados-algoritmos"),     		TAC = new Subject([ICD, ADV, LDP], "TAC", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/tecnicas-algoritmos-ciencia-de-dados"),
	OCD = new Subject([ALL, TDP, CVV], "OCD", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/otimizacao-para-ciencia-de-dados"),    IES = new Subject([TDP], "IES", "https://emap.fgv.br/disciplina/graduacao/inferencia-estatistica"),      						MMD = new Subject([], "MMD", "https://emap.fgv.br/disciplina/graduacao/matematica-discreta"),     						MGI = new Subject([BDD], "MGI", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/modelagem-informacional"), 	PLN = new Subject([EDA], "PLN", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/processamento-de-linguagem-natural-sistemas-de-recuperacao-de"),
	IAR = new Subject([CUV], "IAR", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/introducao-analise-real"),            			MES = new Subject([IES], "MES", "https://emap.fgv.br/disciplina/graduacao/modelagem-estatistica"),       						ADM = new Subject([OCD, IES], "ADM", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/aprendizado-de-maquinas"),  CES = new Subject([BDD, TAC], "CES", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/computacao-escalavel"), 
	CDR = new Subject([TDP, EDA, MMD], "CDR", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/ciencia-de-redes"),        			STP = new Subject([MES], "STP", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/series-temporais"),      			APP = new Subject([ADM], "APP", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/aprendizado-profundo"),
	PCD = new Subject([TAC, APP], "PCD", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/projetos-ciencia-de-dados"), 				MDC = new Subject([], "MDC", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/metodologia-cientifica"), 				EC1 = new Subject([], "EC1", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/estagio-curricular-obrigatorio-i"),
	EMD = new Subject([], "EMD", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/etica-manipulacao-de-dados"),        				TCC = new Subject([MDC], "TCC", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/trabalho-de-conclusao-de-curso"),    EC2 = new Subject([], "EC2", "https://emap.fgv.br/disciplina/graduacao-ciencia-de-dados/estagio-curricular-obrigatorio-ii"),LBR = new Subject([], "LBR", "https://emap.fgv.br/disciplina/graduacao/libras");

var all_subjects = [CUV, GAN, ICD, ADV, IAC, CVV, ALL, IAE, LDP, BDD, EDO, TDP, ALN, TAC, EDA, MMD, IES, OCD, MGI, PLN, IAR, MES, ADM, CES, CDR, STP, APP, EC1, MDC, PCD, EC2, TCC, EMD, LBR];

//Adicionando todas as materias que pode-se fazer apos concluir uma materia e suas respectivas posicoes no svg
var d, a, cp;
for (var i = 0; i < all_subjects.length; i++) {
    for (var j = i + 1; j < all_subjects.length; j++) {
        if ((all_subjects[j].pre).includes(all_subjects[i])) {
            all_subjects[i].add_pos(all_subjects[j]);
        }
    }

    if (i < 20) d = 5, a = 0, cp = 0;
    else if (i < 24) d = 4, a = 2, cp = 20;
    else if (i < 33) d = 3, a = 2.5, cp = 24;
    all_subjects[i].position = [215 + 340 * a + Math.floor((i - cp) / d) * 170, 190 + ((i - cp) % d) * 100];
}
LBR.position = [1405, 690];


//Declarando a funcao que cria as ligacoes
function create_lines() {
    var svg = document.getElementById("svg");
    for (var j = 0; j < all_subjects.length; j++) {
        var materia = all_subjects[j];
        for (var i = 0; i < materia.pre.length; i++) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            var r = materia.pre[i];
            line.setAttribute("x1", r.position[0].toString());
            line.setAttribute("y1", r.position[1].toString());
            line.setAttribute("x2", materia.position[0].toString());
            line.setAttribute("y2", materia.position[1].toString());
            line.classList.add("linha");
            line.classList.add(materia.nome + "pre");
            svg.appendChild(line);
        }
        for (var i = 0; i < materia.pos.length; i++) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            var r = materia.pos[i];
            line.setAttribute("x1", r.position[0].toString());
            line.setAttribute("y1", r.position[1].toString());
            line.setAttribute("x2", materia.position[0].toString());
            line.setAttribute("y2", materia.position[1].toString());
            line.classList.add("linha");
            line.classList.add(materia.nome + "pos");
            svg.appendChild(line);
        }
    }
}

//Tudo referente a interacao do usuario
function interaction(evt) {
    var svg = evt.target,
        mostrar_relacoes_indiretas = false;

	//Voltando � opacidade normal quando clicar fora
	document.getElementById("fundo").addEventListener('click', back_to_normal);

    //Adicionando event listeners pra cada subject
    var subs = document.getElementsByClassName('subject1');
    for (var i = 0; i < subs.length; i++) {
        subs[i].addEventListener('mouseover', mouse_over);
        subs[i].addEventListener('mouseout', mouse_out);
        subs[i].addEventListener('click', mouse_click);
    }

    function mouse_over(evt) {
        if (first_click){
			evt.preventDefault();
			var materia = this.getElementsByClassName("subject")[0];
            if (materia.classList.contains("complementar") || materia.classList.contains("eletiva")) {
				return;
			}
			this.classList.add("pointer");
			materia.classList.add("mouse_over");
			
		}
    }

    function mouse_out(evt) {
		evt.preventDefault();
		var materia = this.getElementsByClassName("subject")[0];
		materia.classList.remove("mouse_over");
		this.classList.remove("pointer");		
    }

    var first_click = true, subject = CUV;
    function mouse_click(evt, b = true) {
        evt.preventDefault();
        var materia = b ? this.getElementsByClassName("subject")[0] : "not_used",
            id = b ? materia.getAttributeNS(null, "id") : subject.nome,
            todas = document.getElementsByClassName("subject1"),
            driver = document.getElementById("driver"),
			botao = document.getElementById("button");
		subject = CUV;
        //Verifica se o objeto tem id
        if (typeof id == "string" && id.length && first_click) {
            var contador = 1;
            //Acha o objeto que contem esse id como nome
            while (id != subject.nome) {
                subject = all_subjects[contador];
                contador += 1;
            }
            //Deixando o fundo transparente
            for (var i = 0; i < todas.length; i++) {
                todas[i].setAttribute("opacity", "0.15");
            }
            show_lines(subject, true);
            first_click = false;
            driver.style.setProperty("--x", (subject.position[0] + 50).toString() + "px");
            driver.style.setProperty("--y", (subject.position[1] + 65).toString() + "px");
             if (![BDD, IAE, MMD, IAR, MDC, EC1, EC2, TCC, EMD, LBR].includes(subject)) {
                botao.style.setProperty("--bx", (subject.position[0] + 55).toString() + "px");
                botao.style.setProperty("--by", (subject.position[1] - (subject.position[1] > 195 ? 130 : -130)).toString() + "px");
            }
            link = subject.link;
        }
        else {
            //Recolorindo o fundo
            for (var i = 0; i < todas.length; i++) {
                todas[i].setAttribute("opacity", "1");
            }
            show_lines(subject, false);
            first_click = true;
            driver.style.setProperty("--x", "0px");
            driver.style.setProperty("--y", "0px");
			botao.style.setProperty("--bx", "0px");
            botao.style.setProperty("--by", "0px");
        }
    }

    function show_lines(materia, show, p = 0) {
        var lines = [];

        if (show) {
            document.getElementsByClassName(materia.nome + "_o")[0].setAttribute("opacity", "1");

            if (p <= 0) {
                lines.push(...document.getElementsByClassName(materia.nome + "pre"));
                for (var i = 0; i < materia.pre.length; i++) {
                    document.getElementsByClassName(materia.pre[i].nome + "_o")[0].setAttribute("opacity", "1");
                    if (mostrar_relacoes_indiretas) show_lines(materia.pre[i], true, -1);
                }
            }
            if (p >= 0) {
                lines.push(...document.getElementsByClassName(materia.nome + "pos"));
                for (var i = 0; i < materia.pos.length; i++) {
                    document.getElementsByClassName(materia.pos[i].nome + "_o")[0].setAttribute("opacity", "1");
                    if (mostrar_relacoes_indiretas) show_lines(materia.pos[i], true, 1);
                }
            }

            for (var i = 0; i < lines.length; i++) {
                lines[i].style.opacity = 1;
				if (p!=0) {
					lines[i].setAttribute("stroke-dasharray", "2 7");
					lines[i].style.opacity = 0.4;
				}
            }
        } else {
            lines = document.getElementsByClassName("linha");
            for (var i = 0; i < lines.length; i++) {
                lines[i].style.opacity = 0;
				lines[i].setAttribute("stroke-dasharray", "1");
            }
        }
    }

    //Adicionando interacao com o botao
    document.getElementById("button").addEventListener("click", activate);

    function activate(evt) {
        var texto = document.getElementById("button_text"), t;

        evt.preventDefault();
        if (mostrar_relacoes_indiretas) {
            mostrar_relacoes_indiretas = false;
			if (!first_click) {
				first_click = true;
				show_lines(CUV, false);
				mouse_click(evt, false);
			}	
            document.getElementById("botao").style.fill = "#068A88";
            texto.textContent = "Mostrar";

        } else {
            mostrar_relacoes_indiretas = true;
			if (!first_click) show_lines(subject, true);
            document.getElementById("botao").style.fill = "#e46d6d";
            texto.textContent = "Ocultar";
        }
        for (var i = 0; i < document.getElementsByClassName("btext").length; i++) {
            t = document.getElementsByClassName("btext")[i];
            t.classList.toggle("dark_text");
            t.classList.toggle("light_text");
        }
    }

    //Adicionando interacao com botao que leva pra descricao detalhada da materia
    document.getElementById("driver").addEventListener("click", redirect);
    var link = "http://www.google.com";
    function redirect(evt) {
        window.open(link);
    }
	
	function back_to_normal(evt){
		evt.preventDefault();
		var todas = document.getElementsByClassName("subject1"),
            driver = document.getElementById("driver"),
			botao = document.getElementById("button");
		//Recolorindo o fundo
		for (var i = 0; i < todas.length; i++) {
			todas[i].setAttribute("opacity", "1");
		}
		show_lines(subject, false);
		first_click = true;
		driver.style.setProperty("--x", "0px");
		driver.style.setProperty("--y", "0px");
		botao.style.setProperty("--bx", "0px");
		botao.style.setProperty("--by", "0px");
	}
}
