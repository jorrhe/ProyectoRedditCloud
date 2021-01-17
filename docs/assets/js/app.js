am4core.ready(function() {

// Themes begin
    am4core.useTheme(am4themes_reddit);
    am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
    var chart = am4core.create("s1", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    chart.numberFormatter.numberFormat = "#.##";

// Add data
    chart.data = [{"hour":"00","avg":71.49449102482032},{"hour":"01","avg":73.07164594761447},{"hour":"02","avg":71.63955986472008},{"hour":"03","avg":65.17387638020007},{"hour":"04","avg":56.330170807190555},{"hour":"05","avg":54.48968045327629},{"hour":"06","avg":53.72921457897184},{"hour":"07","avg":57.68388453733685},{"hour":"08","avg":63.9452148809848},{"hour":"09","avg":72.15981062807036},{"hour":"10","avg":86.83707237822117},{"hour":"11","avg":116.62653430117288},{"hour":"12","avg":133.20051139140776},{"hour":"13","avg":130.92384470445023},{"hour":"14","avg":114.58435072789007},{"hour":"15","avg":106.4357906757257},{"hour":"16","avg":93.61855321439222},{"hour":"17","avg":87.16930163018962},{"hour":"18","avg":80.07089739089739},{"hour":"19","avg":77.29758849913958},{"hour":"20","avg":80.02617694615536},{"hour":"21","avg":76.39987280702776},{"hour":"22","avg":75.04549713116278},{"hour":"23","avg":73.13434275780776}];

// Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "hour";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.renderer.labels.template.adapter.add("currentText",function (text,target,key){
        if(target){
            let text = target.currentText;
            let n = parseInt(text);

            n++;
            if(n>=24){
                n = 0;
            }
            if(n<10){
                n = "0"+n;
            }

            key.currentText = text + ":00 a "+n+":00";
        }
        console.log(currentText)
        return text;
    });
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

// Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "avg";
    series.dataFields.categoryX = "hour";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
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

}); // end am4core.ready()