am4internal_webpackJsonp(["bec2"], {
    AZyi: function (e, c, t) {
        "use strict";
        Object.defineProperty(c, "__esModule", {
            value: !0
        });
        var b = t("aCit"),
            i = t("8ZqG"),
            j = function (e) {
                Object(b.b)(e, "ColorSet") && (e.list = [Object(i.c)("#F9320B"),Object(i.c)("#e9005f"),Object(i.c)("#b5348d"),Object(i.c)("#6f4d97"),Object(i.c)("#375180"),Object(i.c)("#2f4858"),Object(i.c)("#f74e60"),Object(i.c)("#c74c8c"),Object(i.c)("#815698"),Object(i.c)("#435581"),Object(i.c)("#2f4858"),Object(i.c)("#ff7712")], e.minLightness = .2, e.maxLightness = .7, e.reuse = !0)
            };
        window.am4themes_reddit = j
    }
}, ["AZyi"]);

let header = document.querySelector("header");
header.innerHTML = header.innerHTML + `<a href="/" class="btn">Volver al inicio</a>`;

am4core.ready(function() {
    let r = window.location.search.split("r=");

    if (r.length === 1) {
        alert("Ha ocurrido un error");
        window.location.href = "/";
        return;
    }

    am4core.useTheme(am4themes_reddit);

    switch (r[1]) {
        case "s1":
            document.getElementById("titulo").innerHTML = "Script S1";
            document.getElementById("subtitulo").innerHTML = "Franja horaria (UTC) donde se consigue mayor puntuación.";
            cargarGraficaS1();
            break;
        case "s2":
            document.getElementById("titulo").innerHTML = "Script S2";
            document.getElementById("subtitulo").innerHTML = "Franja horaria (UTC) donde se consigue mayor puntuación en cada subreddit";
            cargarGraficaS2();
            break;
        case "s3":
            document.getElementById("titulo").innerHTML = "Script S3";
            document.getElementById("subtitulo").innerHTML = "Número de posts por dia y por subreddit";
            cargarGraficaS3();
            break;
        case "s4":
            document.getElementById("titulo").innerHTML = "Script S4";
            document.getElementById("subtitulo").innerHTML = "Número de palabras que tienen los 100 post más votados en su contenido";
            cargarGraficaS4();
            break;
        case "s5":
            document.getElementById("titulo").innerHTML = "Script S5";
            document.getElementById("subtitulo").innerHTML = "Número de palabras que tienen los 100 post más votados en su título";
            cargarGraficaS5();
            break;
        case "s6":
            document.getElementById("titulo").innerHTML = "Script S6";
            document.getElementById("subtitulo").innerHTML = "Número de posts en todo Reddit etiquetado cómo nsfw(over_18)";
            cargarGraficaS6();
            break;
        case "s7":
            document.getElementById("titulo").innerHTML = "Script S7";
            document.getElementById("subtitulo").innerHTML = "Número de posts de cada subreddit etiquetados cómo nsfw(over_18)";
            cargarGraficaS7();
            break;
        case "s8":
            document.getElementById("titulo").innerHTML = "Script S8";
            document.getElementById("subtitulo").innerHTML = "Los 10 subreddits con más puntuación";
            cargarGraficaS8();
            break;
        case "s9":
            document.getElementById("titulo").innerHTML = "Script S9";
            document.getElementById("subtitulo").innerHTML = "Los 10 subreddits con más comentarios";
            cargarGraficaS9();
            break;
        case "s10":
            document.getElementById("titulo").innerHTML = "Script S10";
            document.getElementById("subtitulo").innerHTML = "Relación de puntuación y número de comentarios de cada subreddit";
            cargarGraficaS10();
            break;
        case "s11":
            document.getElementById("titulo").innerHTML = "Script S11";
            document.getElementById("subtitulo").innerHTML = "Usuarios que más han posteado en cada subreddit";
            cargarGraficaS11();
            break;
        default:
            alert("Ha ocurrido un error");
            window.location.href = "/";
    }

});

function cargarSelect(listener){

    let extra = document.getElementById("extra");

    extra.style.display = "flex";

    let select = document.createElement("select");
    select.id = "select";

    DATA_S1.forEach(el => {
        let o = document.createElement("option");
        o.innerHTML = el;
        select.appendChild(o);
    })

    extra.appendChild(select);

    let choices = new Choices("#select",{
        shouldSort: false,
        loadingText: "Cargando...",
        noResultsText: 'Sin resultados',
        noChoicesText: 'No choices to choose from',
        itemSelectText: '',
        removeItems: false,
        resetScrollPosition: false
    });

    select.addEventListener("change",() => {
        let valor = select.value;
        listener(valor);
    });

    extra.style.marginBottom = "20px";

}

function cargarGraficaS1(subreddit){
    am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    chart.numberFormatter.numberFormat = "#.##";

// Add data
    if(subreddit){
        chart.dataSource.url= `/assets/json/s2/${subreddit}.json`;
        let title = chart.titles.create();
        title.text = subreddit;
        title.fontSize = 25;
        title.marginBottom = 30;
    }else{
        chart.data = [{"hour":"00","avg":71.49449102482032},{"hour":"01","avg":73.07164594761447},{"hour":"02","avg":71.63955986472008},{"hour":"03","avg":65.17387638020007},{"hour":"04","avg":56.330170807190555},{"hour":"05","avg":54.48968045327629},{"hour":"06","avg":53.72921457897184},{"hour":"07","avg":57.68388453733685},{"hour":"08","avg":63.9452148809848},{"hour":"09","avg":72.15981062807036},{"hour":"10","avg":86.83707237822117},{"hour":"11","avg":116.62653430117288},{"hour":"12","avg":133.20051139140776},{"hour":"13","avg":130.92384470445023},{"hour":"14","avg":114.58435072789007},{"hour":"15","avg":106.4357906757257},{"hour":"16","avg":93.61855321439222},{"hour":"17","avg":87.16930163018962},{"hour":"18","avg":80.07089739089739},{"hour":"19","avg":77.29758849913958},{"hour":"20","avg":80.02617694615536},{"hour":"21","avg":76.39987280702776},{"hour":"22","avg":75.04549713116278},{"hour":"23","avg":73.13434275780776}];
    }

    chart.dataSource.events.on("parseended", function (ev) {
        ev.target.data.forEach((element,i)=>{
            let hora = Number(element.hour) + 1;

            if(hora < 10){
                hora = `0${hora}`;
            }else if(hora > 23){
                hora = "00";
            }

            chart.dataSource.data[i].hour = `${element.hour}:00 a ${hora}:00`;
        });
    });

// Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "hour";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = "middle";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 0;
    categoryAxis.renderer.labels.template.wrap = true;

    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Puntuación media";
    valueAxis.renderer.minWidth = 50;

// Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueX = "avg";
    series.dataFields.categoryY = "hour";
    series.tooltipText = "[{categoryY}]{valueX} ptos[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusBottomRight = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

// on hover, make corner radiuses bigger
    var hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function(fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

// Cursor
    chart.cursor = new am4charts.XYCursor();


    document.getElementById("chartdiv").style.height = "1000px";
}

function cargarGraficaS2(){

    cargarGraficaS1("0xProject");

    cargarSelect(valor => {
        cargarGraficaS1(valor);
    });

}

function cargarGraficaS3(){
    let div = document.getElementById("chartdiv");
    div.className = "flourish-embed flourish-bar-chart-race";
    div.dataset.src = "visualisation/4973361";

    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://public.flourish.studio/resources/embed.js"

    document.body.appendChild(script);
    div.style.height = "auto";
}

function cargarGraficaS4(){
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.dataSource.url= "/assets/json/s4_out_array.json"
    chart.padding(40, 40, 40, 40);

    chart.cursor = new am4charts.XYCursor();

    chart.dataSource.events.on("parseended", function (ev) {
        var data = ev.target.data;
        var array=[];
        var i=0;
        data.forEach(element=>{
            ele=element.permalink.match(/^(?:[^\/]*\/){5}([^\/]*)/)
            chart.dataSource.data[i].body = ele[1];
            i++;

        })

    })

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "body";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.cellStartLocation = 0.2;
    categoryAxis.renderer.cellEndLocation = 0.8;

    var label = categoryAxis.renderer.labels.template;
    label.url = "https://www.reddit.com/{permalink}";
    label.target = "_blank";
    label.truncate = true;
    label.maxWidth = 250;
    label.tooltipText = "{category}";

    var ScoreValueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    ScoreValueAxis.min = 0;


    var WordsValueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    WordsValueAxis.min = 0;
    WordsValueAxis.renderer.inversed=false;
    WordsValueAxis.min = 0;

    var wordsSeries = chart.series.push(new am4charts.ColumnSeries());
    wordsSeries.dataFields.categoryY = "body";
    wordsSeries.dataFields.valueX = "words";
    wordsSeries.xAxis = WordsValueAxis;
    wordsSeries.columns.template.strokeOpacity = 0;
    wordsSeries.columns.template.column.cornerRadiusBottomRight = 5;
    wordsSeries.columns.template.column.cornerRadiusTopRight = 5;
    wordsSeries.columns.template.tooltipText = "Words: {valueX}\nScore: {score}";
    wordsSeries.columns.template.tooltipX= am4core.percent(100);
    wordsSeries.tooltip.pointerOrientation="left"
    wordsSeries.tooltip.getFillFromObject = false;
    wordsSeries.tooltip.background.fill= am4core.color('#000000')

    var labelBulletW = wordsSeries.bullets.push(new am4charts.LabelBullet())
    labelBulletW.label.horizontalCenter = "center";
    labelBulletW.label.dx = 10;
    labelBulletW.label.dy = 5;
    labelBulletW.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBulletW.locationX = 0;
    labelBulletW.label.truncate = false;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    wordsSeries.columns.template.adapter.add("fill", function(fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

    var cellSize = 30;
    chart.events.on("datavalidated", function(ev) {

        // Get objects of interest
        var chart = ev.target;
        var categoryAxis = chart.yAxes.getIndex(0);

        // Calculate how we need to adjust chart height
        var adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;

        // get current chart height
        var targetHeight = chart.pixelHeight + adjustHeight;

        // Set it on chart's container
        chart.svgContainer.htmlElement.style.height = targetHeight + "px";
    });

}

function cargarGraficaS5(){
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.colors.list = [
        am4core.color("#FF5700"),
        am4core.color("#FF4500"),
    ];

    chart.dataSource.url= "/assets/json/s5_out_array.json"
    chart.padding(40, 40, 40, 40);

    chart.cursor = new am4charts.XYCursor();

    chart.dataSource.events.on("parseended", function (ev) {
        var data = ev.target.data;
        var array=[];
        var i=0;
        data.forEach(element=>{
            ele=element.permalink.match(/^(?:[^\/]*\/){5}([^\/]*)/)
            chart.dataSource.data[i].title = ele[1];
            i++;

        })

    })

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "title";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.cellStartLocation = 0.2;
    categoryAxis.renderer.cellEndLocation = 0.8;

    var label = categoryAxis.renderer.labels.template;
    label.url = "https://www.reddit.com/{permalink}";
    label.truncate = true;
    label.maxWidth = 250;
    label.tooltipText = "";



    var ScoreValueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    ScoreValueAxis.min = 0;


    var WordsValueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    WordsValueAxis.min = 0;
    WordsValueAxis.renderer.inversed=false;
    WordsValueAxis.min = 0;
    WordsValueAxis.max = 100;

    var wordsSeries = chart.series.push(new am4charts.ColumnSeries());
    wordsSeries.dataFields.categoryY = "title";
    wordsSeries.dataFields.valueX = "words_title";
    wordsSeries.xAxis = WordsValueAxis;
    wordsSeries.columns.template.strokeOpacity = 0;
    wordsSeries.columns.template.column.cornerRadiusBottomRight = 5;
    wordsSeries.columns.template.column.cornerRadiusTopRight = 5;
    wordsSeries.columns.template.tooltipText = "Words: {valueX}\nScore: {score}";
    wordsSeries.columns.template.tooltipX= am4core.percent(100);
    wordsSeries.tooltip.pointerOrientation="left"
    wordsSeries.tooltip.getFillFromObject = false;
    wordsSeries.tooltip.background.fill= am4core.color('#000000')

    var labelBulletW = wordsSeries.bullets.push(new am4charts.LabelBullet())
    labelBulletW.label.horizontalCenter = "center";
    labelBulletW.label.dx = 10;
    labelBulletW.label.dy = 5;
    labelBulletW.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBulletW.locationX = 0;
    labelBulletW.label.truncate = false;


    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();
    var cellSize = 30;
    chart.events.on("datavalidated", function(ev) {

        // Get objects of interest
        var chart = ev.target;
        var categoryAxis = chart.yAxes.getIndex(0);

        // Calculate how we need to adjust chart height
        var adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;

        // get current chart height
        var targetHeight = chart.pixelHeight + adjustHeight;

        // Set it on chart's container
        chart.svgContainer.htmlElement.style.height = targetHeight + "px";
    });
}

function  cargarGraficaS6(){
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    am4core.useTheme(am4themes_animated);
    // Add data
    chart.dataSource.url = "/assets/json/s6_output.json"

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "over_18";

    var colorSet = new am4core.ColorSet();
    colorSet.list = ["#ff5700", "#e38864",].map(function(color) {
        return new am4core.color(color);
    });
    pieSeries.colors = colorSet;

}

function cargarGraficaS7(){
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "subreddit";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "subreddit";
    series.dataFields.valueX = "nsfw_posts";
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    var labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.dx = 10;
    labelBullet.label.text = "{values.valueX}";
    labelBullet.locationX = 1;

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target){
        return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
    chart.data=[{"nsfw_posts": 1, "subreddit": "01NebSucks"}, {"nsfw_posts": 13, "subreddit": "03103108xxx"}, {"nsfw_posts": 11, "subreddit": "0Cedeh0"}, {"nsfw_posts": 1, "subreddit": "0xbitcoin"}, {"nsfw_posts": 394, "subreddit": "1000ccplus"}, {"nsfw_posts": 98, "subreddit": "100sexiest"}, {"nsfw_posts": 1, "subreddit": "100yearsago"}, {"nsfw_posts": 1, "subreddit": "10G2"}, {"nsfw_posts": 1, "subreddit": "10relax"}, {"nsfw_posts": 15, "subreddit": "1111111111111111"}, {"nsfw_posts": 1, "subreddit": "1200isfineIGUESSugh"}, {"nsfw_posts": 1, "subreddit": "1200isjerky"}, {"nsfw_posts": 5, "subreddit": "120FPSPorn"}, {"nsfw_posts": 1, "subreddit": "12Monkeys"}, {"nsfw_posts": 1, "subreddit": "13DaysofChristmas"}, {"nsfw_posts": 4, "subreddit": "15SecPorn"}, {"nsfw_posts": 25, "subreddit": "15jar"}, {"nsfw_posts": 51, "subreddit": "177013"}, {"nsfw_posts": 1, "subreddit": "1776_ftw"}, {"nsfw_posts": 73, "subreddit": "1819club"}, {"nsfw_posts": 1, "subreddit": "1820club"}, {"nsfw_posts": 1237, "subreddit": "18_19"}, {"nsfw_posts": 107, "subreddit": "18_20"}, {"nsfw_posts": 98, "subreddit": "18nsfw"}, {"nsfw_posts": 66, "subreddit": "18plusGIFs"}, {"nsfw_posts": 363, "subreddit": "18plusclub"}, {"nsfw_posts": 2, "subreddit": "18yo_69Porn"}, {"nsfw_posts": 2, "subreddit": "18yo_Adult_Porn"}, {"nsfw_posts": 2, "subreddit": "18yo_Amateur"}, {"nsfw_posts": 2, "subreddit": "18yo_ArficanFuck"}, {"nsfw_posts": 2, "subreddit": "18yo_Ass_Fuck"}, {"nsfw_posts": 2, "subreddit": "18yo_Ass_Orgy"}, {"nsfw_posts": 1, "subreddit": "18yo_Blonde"}, {"nsfw_posts": 2, "subreddit": "18yo_Blonde_Fuck"}, {"nsfw_posts": 2, "subreddit": "18yo_Blonde_Grup"}, {"nsfw_posts": 4, "subreddit": "18yo_Blonde_Party"}, {"nsfw_posts": 2, "subreddit": "18yo_Blonde_Sex"}, {"nsfw_posts": 2, "subreddit": "18yo_Brunette"}, {"nsfw_posts": 2, "subreddit": "18yo_Fuck_Action"}, {"nsfw_posts": 1, "subreddit": "18yo_Fuck_HardPussy"}, {"nsfw_posts": 3, "subreddit": "18yo_Fuck_Mature"}, {"nsfw_posts": 3, "subreddit": "18yo_Fuck_MilfPussy"}, {"nsfw_posts": 2, "subreddit": "18yo_Fuck_Pussy"}, {"nsfw_posts": 2, "subreddit": "18yo_Fuck_Sex"}, {"nsfw_posts": 3, "subreddit": "18yo_Fuck_Sleep"}, {"nsfw_posts": 2, "subreddit": "18yo_Fucked"}, {"nsfw_posts": 2, "subreddit": "18yo_Fucked_Anal"}, {"nsfw_posts": 2, "subreddit": "18yo_Fucked_Ass"}, {"nsfw_posts": 3, "subreddit": "18yo_Fucked_Oral"}, {"nsfw_posts": 2, "subreddit": "18yo_Girl_Fuck"}, {"nsfw_posts": 2, "subreddit": "18yo_Girls_Fucked"}, {"nsfw_posts": 2, "subreddit": "18yo_Hard_Fuck"}, {"nsfw_posts": 2, "subreddit": "18yo_Mouse_Pussy"}, {"nsfw_posts": 2, "subreddit": "18yo_Orgy_Fuck"}, {"nsfw_posts": 2, "subreddit": "18yo_Party_Sex"}, {"nsfw_posts": 1, "subreddit": "18yo_Pussy_Sweet"}, {"nsfw_posts": 2, "subreddit": "18yo_Sex"}, {"nsfw_posts": 1, "subreddit": "1911"}, {"nsfw_posts": 20, "subreddit": "195"}, {"nsfw_posts": 3, "subreddit": "19Y_MadeGreatBlowjob"}, {"nsfw_posts": 1, "subreddit": "19yo_Hard_Fuck"}, {"nsfw_posts": 1, "subreddit": "1PageComics"}, {"nsfw_posts": 1, "subreddit": "1percentmc"}, {"nsfw_posts": 1, "subreddit": "1season1week"}, {"nsfw_posts": 5, "subreddit": "1stTimeinPorn"}, {"nsfw_posts": 164, "subreddit": "2007scape"}, {"nsfw_posts": 1, "subreddit": "2010sMusic"}, {"nsfw_posts": 2, "subreddit": "20445603"}, {"nsfw_posts": 82, "subreddit": "20thCenturyFoxes"}, {"nsfw_posts": 9, "subreddit": "2137"}, {"nsfw_posts": 1, "subreddit": "21Sextury_Network"}, {"nsfw_posts": 1, "subreddit": "23andme"}, {"nsfw_posts": 1, "subreddit": "240sx"}, {"nsfw_posts": 171, "subreddit": "2Booty"}, {"nsfw_posts": 1, "subreddit": "2CBreathe"}, {"nsfw_posts": 56, "subreddit": "2DTittyTouching"}, {"nsfw_posts": 14, "subreddit": "2Dicks1Hole"}, {"nsfw_posts": 1, "subreddit": "2Names3People"}, {"nsfw_posts": 2, "subreddit": "2b2t"}, {"nsfw_posts": 2, "subreddit": "2b2t_Uncensored"}, {"nsfw_posts": 16, "subreddit": "2busty"}, {"nsfw_posts": 1345, "subreddit": "2busty2hide"}, {"nsfw_posts": 1, "subreddit": "2cb"}, {"nsfw_posts": 19, "subreddit": "2for1"}, {"nsfw_posts": 3, "subreddit": "2girls1pic"}, {"nsfw_posts": 6, "subreddit": "2healthbars"}, {"nsfw_posts": 5, "subreddit": "2hmaymays"}, {"nsfw_posts": 2, "subreddit": "2irl4meirl"}, {"nsfw_posts": 1, "subreddit": "2mad42mad42mad4madlad"}, {"nsfw_posts": 3, "subreddit": "2meirl42meirl4meirl"}, {"nsfw_posts": 39, "subreddit": "2meirl4meirl"}, {"nsfw_posts": 4, "subreddit": "2mouths1cock"}, {"nsfw_posts": 1, "subreddit": "2pee4you"}, {"nsfw_posts": 1, "subreddit": "2shore"}, {"nsfw_posts": 15, "subreddit": "2wsxsw2"}, {"nsfw_posts": 1, "subreddit": "300BLK"}, {"nsfw_posts": 1, "subreddit": "303"}, {"nsfw_posts": 1, "subreddit": "30Plus"}, {"nsfw_posts": 1, "subreddit": "30PlusKik"}, {"nsfw_posts": 2, "subreddit": "322nyc"}, {"nsfw_posts": 1, "subreddit": "324thworldproblems"}, {"nsfw_posts": 3, "subreddit": "342343thyryrtyhgfhfgh"}, {"nsfw_posts": 108, "subreddit": "34Honor"}, {"nsfw_posts": 1, "subreddit": "3540"}, {"nsfw_posts": 47, "subreddit": "35honor"}, {"nsfw_posts": 2, "subreddit": "35mm"}, {"nsfw_posts": 31, "subreddit": "365daysofporn"}, {"nsfw_posts": 85, "subreddit": "3DHentai"}, {"nsfw_posts": 215, "subreddit": "3DPorncraft"}, {"nsfw_posts": 2, "subreddit": "3DS"}, {"nsfw_posts": 1, "subreddit": "3DSM"}, {"nsfw_posts": 2, "subreddit": "3DVRPorn"}, {"nsfw_posts": 7, "subreddit": "3DXFutanari"}, {"nsfw_posts": 5, "subreddit": "3D_Futanari"}, {"nsfw_posts": 1, "subreddit": "3D_NSFW"}]
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    var cellSize = 30;
    chart.events.on("datavalidated", function(ev) {

        // Get objects of interest
        var chart = ev.target;
        var categoryAxis = chart.yAxes.getIndex(0);

        // Calculate how we need to adjust chart height
        var adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;

        // get current chart height
        var targetHeight = chart.pixelHeight + adjustHeight;

        // Set it on chart's container
        chart.svgContainer.htmlElement.style.height = targetHeight + "px";
    });
}

function cargarGraficaS8(){

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
        {"subreddit":"dankmemes","score":53733913},
        {"subreddit":"memes","score":51279024},
        {"subreddit":"aww","score":43173623},
        {"subreddit":"funny","score":40683349},
        {"subreddit":"politics","score":26148626},
        {"subreddit":"pics","score":23742650},
        {"subreddit":"The_Donald","score":23041500},
        {"subreddit":"gaming","score":21573877},
        {"subreddit":"me_irl","score":18068495},
        {"subreddit":"gifs","score":16246206}
    ];

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "subreddit";
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.fontSize = 14;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 60000000;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.minGridDistance = 30;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "subreddit";
    series.dataFields.valueY = "score";
    series.columns.template.tooltipText = "{valueY.value}";
    series.columns.template.tooltipY = 0;
    series.columns.template.strokeOpacity = 0;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

}

function cargarGraficaS9(){

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
        {"subreddit":"AskReddit","num_comments":6588734},
        {"subreddit":"politics","num_comments":2520187},
        {"subreddit":"nfl","num_comments":1499055},
        {"subreddit":"nba","num_comments":1125002},
        {"subreddit":"funny","num_comments":1119052},
        {"subreddit":"dankmemes","num_comments":994044},
        {"subreddit":"memes","num_comments":945318},
        {"subreddit":"The_Donald","num_comments":913368},
        {"subreddit":"worldnews","num_comments":855975},
        {"subreddit":"AskOuija","num_comments":819950}
    ];

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "subreddit";
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.fontSize = 14;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 7000000;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.minGridDistance = 30;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "subreddit";
    series.dataFields.valueY = "num_comments";
    series.columns.template.tooltipText = "{valueY.value}";
    series.columns.template.tooltipY = 0;
    series.columns.template.strokeOpacity = 0;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

}

function cargarGraficaS10(){

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.dataSource.url = "/assets/json/s11_output.json"


    // Add data
    chart.data = [
        {"subreddit":"ITCareerQuestions","sum(score)":10032,"sum(num_comments)":11763,"Relacion":85.28},
        {"subreddit":"RadRussianMemes","sum(score)":10030,"sum(num_comments)":497,"Relacion":2018.11},
        {"subreddit":"Edinburgh","sum(score)":10024,"sum(num_comments)":5022,"Relacion":199.6},
        {"subreddit":"GirlsWearingVS","sum(score)":10023,"sum(num_comments)":374,"Relacion":2679.95},
        {"subreddit":"REUTERSauto","sum(score)":10022,"sum(num_comments)":22,"Relacion":45554.55},
        {"subreddit":"FolkPunk","sum(score)":10019,"sum(num_comments)":1608,"Relacion":623.07},
        {"subreddit":"GayPOCxxx","sum(score)":10011,"sum(num_comments)":207,"Relacion":4836.23},
        {"subreddit":"modernhousewife","sum(score)":10011,"sum(num_comments)":134,"Relacion":7470.9},
        {"subreddit":"nihilism","sum(score)":10008,"sum(num_comments)":5963,"Relacion":167.83},
        {"subreddit":"Precum","sum(score)":10005,"sum(num_comments)":812,"Relacion":1232.14},
        {"subreddit":"secondsketch","sum(score)":10003,"sum(num_comments)":221,"Relacion":4526.24},
        {"subreddit":"starwarsspeculation","sum(score)":10000,"sum(num_comments)":11031,"Relacion":90.65}
    ];

    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "subreddit";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;
    categoryAxis.fontSize = 18;

    var  valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    // Create series
    function createSeries(field, name, toolTipY) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = field;
        series.dataFields.categoryY = "subreddit";
        series.name = name;
        //series.columns.template.tooltipText = "{name}: [bold font-size: 16]{valueX}[/]";
        series.columns.template.height = am4core.percent(100);
        series.sequencedInterpolation = true;

        var valueLabel = series.bullets.push(new am4charts.LabelBullet());
        valueLabel.label.text = "[font-size: 14]{valueX}[/]";
        valueLabel.label.horizontalCenter = "left";
        valueLabel.label.dx = 10;
        valueLabel.label.hideOversized = false;
        valueLabel.label.truncate = false;

    }

    createSeries("sum(score)", "Puntuacion",-15);
    createSeries("sum(num_comments)", "Comentarios",10);
    createSeries("Relacion", "Relacion", 30);

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";

    document.getElementById("chartdiv").style.height = "2000px";

}


function cargarGraficaS11(){

    cargarSelect(valor => {
        alert(valor);
    });


}










































