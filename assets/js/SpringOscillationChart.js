
var SpringOscillationChart = (function () {
    var ctx = null;
    var chart = null;
    return {
        init: function (pdata) {
            chart = Highcharts.chart('myChart', {
                chart: {
                    type: 'spline',
                    width: 460,
                    height:350,
                    animation: false

                },
                plotOptions: {
                    series: {
                        enableMouseTracking: false,
                        lineWidth: 2
                    }
                },
                xAxis: {
                    title: {
                        text: 'Time (Sec)',
                        enabled: false
                    },
                    labels: {
                        enabled: false
                    },
                    min:0,
                    max:15,
                    tickInterval:1,
                    gridLineWidth: 1,
                    lineWidth:0,
                    minorTickLength: 0,
                    tickLength: 0
                },
                title: false,
                subtitle:false,
                yAxis: {
                    title: {
                        text: 'Displacement (cm)',
                        align: 'high',
                        style:{
                            color:"#447215",
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }
                    },
                    min:-70,
                    max:70,
                    tickInterval:10,
                    gridLineWidth: 1,
                    tickLength: 5,
                    lineWidth: 1,
                    majorTickPosition:"outside",
                    minorGridLineWidth: 0,
                    minorTickInterval: 10,
                    minorTickLength: 10,
                    minorTickWidth: 1
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: "",
                    color:"#0505ff",
                    marker: {
                        enabled: false
                     },
                    data: []
                }]
            });
                          
        },
        update: function (datapoint) {
            //chart.series[0].addPoint([datapoint.x, datapoint.y], true);
            chart.series[0].addPoint(datapoint,true,false);
            //chart.redraw();
        },
        clearSeriesData: function(){
            chart.series[0].setData([]);
        }
    }
})();


function InitBrowserAttribute() {
		
    // Get the user-agent string
    let userAgentString =
        navigator.userAgent;

    let browserStr = "";

    // Detect Chrome
    let chromeAgent =
        userAgentString.indexOf("Chrome") > -1;

    // Detect Internet Explorer
    let IExplorerAgent =
        userAgentString.indexOf("MSIE") > -1 ||
        userAgentString.indexOf("rv:") > -1;

    // Detect Firefox
    let firefoxAgent =
        userAgentString.indexOf("Firefox") > -1;

    // Detect Safari
    let safariAgent =
        userAgentString.indexOf("Safari") > -1;
        
    // Discard Safari since it also matches Chrome
    if ((chromeAgent) && (safariAgent))
        safariAgent = false;

    // Detect Opera
    let operaAgent =
        userAgentString.indexOf("OP") > -1;
        
    // Discard Chrome since it also matches Opera	
    if ((chromeAgent) && (operaAgent))
        chromeAgent = false;

    if (safariAgent) browserStr = "safari"
    else if(chromeAgent) browserStr = "chrome"
    else if(firefoxAgent) browserStr = "firefox"
    else if (IExplorerAgent) browserStr = "IE"

    $("body").attr("browser", browserStr);
}