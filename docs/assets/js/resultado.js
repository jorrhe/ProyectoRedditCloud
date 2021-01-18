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
header.innerHTML = header.innerHTML + `<a href="./" class="btn">Volver al inicio</a>`;

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
            document.getElementById("subtitulo").innerHTML = "Número de palabras que tiene el contenido de los 100 post con mayor puntuación";
            cargarGraficaS4();
            break;
        case "s5":
            document.getElementById("titulo").innerHTML = "Script S5";
            document.getElementById("subtitulo").innerHTML = "Número de palabras que tiene el título de los 100 post con mayor puntuación";
            cargarGraficaS5();
            break;
        case "s6":
            document.getElementById("titulo").innerHTML = "Script S6";
            document.getElementById("subtitulo").innerHTML = "Número de posts en todo Reddit etiquetado cómo nsfw (Mayor de 18 años)";
            cargarGraficaS6();
            break;
        case "s7":
            document.getElementById("titulo").innerHTML = "Script S7";
            document.getElementById("subtitulo").innerHTML = "Número de posts de cada subreddit etiquetados cómo nsfw (Mayor de 18 años)";
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
            document.getElementById("subtitulo").innerHTML = "Usuario que más ha posteado en cada subreddit";
            cargarGraficaS11();
            break;
        default:
            alert("Ha ocurrido un error");
            window.location.href = "/";
    }

    document.title = document.getElementById("subtitulo").innerHTML + " - Análisis de Reddit";

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

    let procesarHora = function (arr,source) {
        arr.forEach((element,i)=>{
            let hora = Number(element.hour) + 1;

            if(hora < 10){
                hora = `0${hora}`;
            }else if(hora > 23){
                hora = "00";
            }

            source[i].hour = `${element.hour}:00 a ${hora}:00`;
        });
    }

// Add data
    if(subreddit){
        chart.dataSource.url= `/assets/json/s2/${subreddit}.json`;
        let title = chart.titles.create();
        title.text = subreddit;
        title.fontSize = 25;
        title.marginBottom = 30;

        chart.dataSource.events.on("parseended", (ev) => {
            procesarHora(ev.target.data,chart.dataSource.data);
        });

    }else{
        chart.data = [{"hour":"00","avg":71.49449102482032},{"hour":"01","avg":73.07164594761447},{"hour":"02","avg":71.63955986472008},{"hour":"03","avg":65.17387638020007},{"hour":"04","avg":56.330170807190555},{"hour":"05","avg":54.48968045327629},{"hour":"06","avg":53.72921457897184},{"hour":"07","avg":57.68388453733685},{"hour":"08","avg":63.9452148809848},{"hour":"09","avg":72.15981062807036},{"hour":"10","avg":86.83707237822117},{"hour":"11","avg":116.62653430117288},{"hour":"12","avg":133.20051139140776},{"hour":"13","avg":130.92384470445023},{"hour":"14","avg":114.58435072789007},{"hour":"15","avg":106.4357906757257},{"hour":"16","avg":93.61855321439222},{"hour":"17","avg":87.16930163018962},{"hour":"18","avg":80.07089739089739},{"hour":"19","avg":77.29758849913958},{"hour":"20","avg":80.02617694615536},{"hour":"21","avg":76.39987280702776},{"hour":"22","avg":75.04549713116278},{"hour":"23","avg":73.13434275780776}];
        procesarHora(chart.data,chart.data);
    }

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

    chart.dataSource.url= "./assets/json/s4_output.json"
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
    wordsSeries.columns.template.tooltipText = "Palabras: {valueX}\nPuntos: {score}";
    wordsSeries.columns.template.tooltipX= am4core.percent(100);
    wordsSeries.tooltip.pointerOrientation="left"
    wordsSeries.tooltip.getFillFromObject = false;
    wordsSeries.tooltip.background.fill= am4core.color('#000000')

    wordsSeries.columns.template.adapter.add("fill", function(fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

    let title = chart.createChild(am4core.Label);
    title.text = "Nº Palabras";
    title.isMeasured = false;
    title.align = "center";
    title.x = am4core.percent(65);
    title.horizontalCenter = "middle";
    title.y = -20;

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

function cargarGraficaS5(){
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.dataSource.url= "./assets/json/s5_output.json"
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

    let title = chart.createChild(am4core.Label);
    title.text = "Nº Palabras";
    title.isMeasured = false;
    title.align = "center";
    title.x = am4core.percent(65);
    title.horizontalCenter = "middle";
    title.y = -20;

    var wordsSeries = chart.series.push(new am4charts.ColumnSeries());
    wordsSeries.dataFields.categoryY = "title";
    wordsSeries.dataFields.valueX = "words_title";
    wordsSeries.xAxis = WordsValueAxis;
    wordsSeries.columns.template.strokeOpacity = 0;
    wordsSeries.columns.template.column.cornerRadiusBottomRight = 5;
    wordsSeries.columns.template.column.cornerRadiusTopRight = 5;
    wordsSeries.columns.template.tooltipText = "Palabras: {valueX}\nPuntos: {score}";
    wordsSeries.columns.template.tooltipX= am4core.percent(100);
    wordsSeries.tooltip.pointerOrientation="left"
    wordsSeries.tooltip.getFillFromObject = false;
    wordsSeries.tooltip.background.fill= am4core.color('#000000')

    wordsSeries.columns.template.adapter.add("fill", function(fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

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
    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    am4core.useTheme(am4themes_animated);
    // Add data
    chart.dataSource.url = "assets/json/s6_output.json";

    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "over_18";
    pieSeries.ticks.template.disabled = true;
    pieSeries.alignLabels = false;
    pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    pieSeries.labels.template.radius = am4core.percent(-30);
    pieSeries.labels.template.fill = am4core.color("white");
    pieSeries.slices.template.tooltipText = "{value.value}";

    //creaate colorset and set it to piechart
    var colorSet = new am4core.ColorSet();
    colorSet.list = ["#2f4858","#ff7712"].map(function(color) {
        return new am4core.color(color);
    });
    pieSeries.colors = colorSet;

    //create custom Legend
    var legend = new am4charts.Legend();
    legend.parent = chart.chartContainer;
    //legend.align = "right";
    legend.position = "bottom";
    legend.valueLabels.template.text = "{percent}%";
    legend.itemContainers.template.clickable = false;
    legend.itemContainers.template.focusable = false;
    legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;

    //Populate Legend with data once it's been parsed from datasource
    var NSFWpercentage;
    var SFWpercentage;
    chart.dataSource.events.on("parseended", function(ev) {
        // parsed data is assigned to data source's `data` property
        var data = ev.target.data;
        for (var i = 0; i < data.length; i++) {
            if(data[i]["over_18"] == true){
                NSFWpercentage = data[i]["percentage"]
            }
            else{
                SFWpercentage = data[i]["percentage"]
            }
        }
        legend.data = [{
            "name": "Posts con contenido adulto",
            "percent":Math.round(NSFWpercentage*10)/10,
            "fill":"#2f4858"
        }, {
            "name": "Posts sin contenido adulto",
            "percent":Math.round(SFWpercentage*10)/10,
            "fill": "#ff7712"
        }];
    });

}

function cargarGraficaS7(){
    am4core.useTheme(am4themes_animated);
// Themes end

    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    chart.dataSource.url = "assets/json/s7_output.json";

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
    series.columns.template.tooltipText = "{valueX.value} posts"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    let title = chart.createChild(am4core.Label);
    title.text = "Nº Posts NSFW";
    title.isMeasured = false;
    title.align = "center";
    title.x = am4core.percent(65);
    title.horizontalCenter = "middle";
    title.y = -20;

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target){
        return chart.colors.getIndex(target.dataItem.index);
    });

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    var hoverState = axisBreak.states.create("hover");
    hoverState.properties.breakSize = 1;
    hoverState.properties.opacity = 0.1;
    hoverState.transitionDuration = 1500;

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

    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "top";
    categoryAxis.renderer.labels.template.rotation = -45;


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
    series.columns.template.column.cornerRadiusTopLeft = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

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

    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "top";
    categoryAxis.renderer.labels.template.rotation = -45;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 7000000;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.minGridDistance = 30;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "subreddit";
    series.dataFields.valueY = "num_comments";
    series.columns.template.tooltipText = "{valueY.value} comentarios";
    series.columns.template.tooltipY = 0;
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusTopLeft = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

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
    chart.dataSource.url = "./assets/json/s10_output.json"

    //create category axis for years
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "subreddit";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.cursorTooltipEnabled  =  false;


    var valueAxisRelacion = chart.xAxes.push(new am4charts.ValueAxis());
    //valueAxisRelacion.cursorTooltipEnabled = false;
    //valueAxisRelacion.renderer.labels.template.disabled = true

    var columnSeriesRelacion = chart.series.push(new am4charts.ColumnSeries());
    columnSeriesRelacion.dataFields.categoryY = "subreddit";
    columnSeriesRelacion.dataFields.valueX = "Relacion";
    columnSeriesRelacion.name = "Relacion";
    columnSeriesRelacion.xAxis = valueAxisRelacion;
    columnSeriesRelacion.tooltipText = "Relacion: {valueX.value}";
    columnSeriesRelacion.tooltip.getFillFromObject = false;
    columnSeriesRelacion.tooltip.background.fill = am4core.color("#000");
    columnSeriesRelacion.fill = am4core.color("#ff7712");

//create value axis for income and expenses
    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.labels.template.disabled = true

//create line
    var lineSeriesComentarios = chart.series.push(new am4charts.LineSeries());
    lineSeriesComentarios.dataFields.categoryY = "subreddit";
    lineSeriesComentarios.dataFields.valueX = "sum(num_comments)";
    lineSeriesComentarios.name = "Nº Comentarios";
    lineSeriesComentarios.strokeWidth = 3;
    lineSeriesComentarios.xAxis = valueAxis;
    lineSeriesComentarios.stroke = am4core.color("#2f4858");
    //lineSeriesComentarios.tooltipText = "Comentarios: {valueX.value}";

    var bullet = lineSeriesComentarios.bullets.push(new am4charts.Bullet());
    var square = bullet.createChild(am4core.Rectangle);
    square.width = 10;
    square.height = 10;
    square.fill = am4core.color("#fff");
    square.strokeWidth = 2;
    square.horizontalCenter = "middle";
    square.verticalCenter = "middle";

    var valueAxisPun = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxisPun.syncWithAxis = chart.xAxes.getIndex(0);
    valueAxisPun.cursorTooltipEnabled = false;
    valueAxisPun.renderer.labels.template.disabled = true

    var lineSeriesPuntuacion = chart.series.push(new am4charts.LineSeries());
    lineSeriesPuntuacion.dataFields.categoryY = "subreddit";
    lineSeriesPuntuacion.dataFields.valueX = "sum(score)";
    lineSeriesPuntuacion.name = "Puntuación";
    lineSeriesPuntuacion.strokeWidth = 3;
    lineSeriesPuntuacion.xAxis = valueAxisPun;
    lineSeriesPuntuacion.stroke = am4core.color("#b5348d");
    //lineSeriesPuntuacion.tooltipText = "Puntuación: {valueX.value}";

    //add bullets
    var circleBullet = lineSeriesPuntuacion.bullets.push(new am4charts.CircleBullet());
    circleBullet.circle.fill = am4core.color("#fff");
    circleBullet.circle.strokeWidth = 2;

//add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

//add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";

    var cellSize = 50;
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

function cargarGraficaS11(){

    cargarSelect(subreddit => {
        mostrarDatosS11(subreddit);
    });

    let div = document.getElementById("chartdiv");
    div.style.height = "auto";
    div.className = "s11";

    mostrarDatosS11("0xProject");

}


function mostrarDatosS11(subreddit) {

    const TIEMPO = 1000,           //En milesimas
        TIEMPO_ACTUALIZACION = 100;//En milesimas

    let div = document.getElementById("chartdiv");

    let r = new XMLHttpRequest();

    r.open("GET", `assets/json/s11/${subreddit}.json`, true);

    r.onreadystatechange = function () {
        div.innerHTML = "";
        if (r.readyState !== 4 || r.status !== 200) return;

        let datos = JSON.parse(r.responseText);

        let cantidadPosts = datos.count;
        let nombreUsuario = datos.author;

        let pos = 0;

        let postsDom = document.createElement("div");

        let suma = cantidadPosts / (TIEMPO / TIEMPO_ACTUALIZACION);

        let idInterval = setInterval(() => {

            if (pos >= cantidadPosts) {
                clearInterval(idInterval);
            }

            pos += suma;

            postsDom.innerHTML = `<span class="naranja grande">${Math.round(pos)}</span> posts creados por <a href="https://reddit.com/u/${nombreUsuario}" target="_blank">${nombreUsuario}</a> en <a href="https://reddit.com/r/${subreddit}">/r/${subreddit}</a>`;

        }, 100);

        div.appendChild(postsDom);

    };

    r.send("");

}


