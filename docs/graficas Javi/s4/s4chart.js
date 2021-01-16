am4core.ready(function() {
// Themes begin
    // am4core.useTheme(am4themes_animated);
// Themes end

    var chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.colors.list = [
        am4core.color("#FF5700"),
        am4core.color("#FF4500"),
    ];

    chart.dataSource.url= "s4_out_array.json"
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
    label.truncate = false;
    label.maxWidth = 250;
    label.tooltipText = "";



    var ScoreValueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    ScoreValueAxis.min = 0;


    var WordsValueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    WordsValueAxis.min = 0;
    WordsValueAxis.renderer.inversed=false;
    WordsValueAxis.min = 0;

    /* var scoreSeries = chart.series.push(new am4charts.ColumnSeries());
     scoreSeries.dataFields.categoryY = "permalink";
     scoreSeries.dataFields.valueX = "score";
     scoreSeries.columns.template.strokeOpacity = 0;
     scoreSeries.columns.template.column.cornerRadiusBottomRight = 5;
     scoreSeries.columns.template.column.cornerRadiusTopRight = 5;
     scoreSeries.columns.template.url = "https://www.reddit.com/{categoryY}";
     scoreSeries.columns.template.tooltipText = "Score: {valueX}";
    scoreSeries.columns.template.tooltipX= am4core.percent(100);
 scoreSeries.tooltip.pointerOrientation = "left"
 */
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
    /*wordsSerie
        var labelBullet = wordsSeries.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = "center";
        labelBullet.label.dx = 20;
        labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        labelBullet.locationX = 0;
    */
    var labelBulletW = wordsSeries.bullets.push(new am4charts.LabelBullet())
    labelBulletW.label.horizontalCenter = "center";
    labelBulletW.label.dx = 10;
    labelBulletW.label.dy = 5;
    labelBulletW.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBulletW.locationX = 0;
    labelBulletW.label.truncate = false;
    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    /*  scoreSeries.columns.template.adapter.add("fill", function(fill, target){
          return chart.colors.getIndex(target.dataItem.index);
      });*/

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
}); // end am4core.ready()