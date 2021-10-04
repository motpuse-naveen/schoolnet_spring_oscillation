
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
                            color:"#447215"
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
                    color:"#0000ff",
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