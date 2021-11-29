
var SpringOscillationChart = (function () {
    var ctx = null;
    var chart = null;
    return {
        init: function (pdata) {
            chart = Highcharts.chart('myChart', {
                chart: {
                    type: 'spline',
                    width: 400,
                    height: 320,
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
                    min: 0,
                    max: 15,
                    tickInterval: 1,
                    gridLineWidth: 1,
                    lineWidth: 0,
                    minorTickLength: 0,
                    tickLength: 0,
                    gridLineColor: '#ACBCC4'
                },
                title: false,
                subtitle: false,
                yAxis: {
                    title: {
                        text: 'Displacement (cm)',
                        enabled: false,
                        align: 'high',
                        style: {
                            color: "#447215",
                            fontSize: '14px',
                            fontWeight: 'bold',
                            margin: -10
                        }
                    },
                    min: -70,
                    max: 70,
                    tickInterval: 10,
                    gridLineWidth: 1,
                    tickLength: 5,
                    lineWidth: 1,
                    majorTickPosition: "outside",
                    minorGridLineWidth: 0,
                    minorTickInterval: 10,
                    minorTickLength: 10,
                    minorTickWidth: 1,
                    gridLineColor: '#ACBCC4'
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: "",
                    color: "#0505ff",
                    marker: {
                        enabled: false
                    },
                    data: []
                }]
            });

        },
        update: function (datapoint) {
            //chart.series[0].addPoint([datapoint.x, datapoint.y], true);
            chart.series[0].addPoint(datapoint, true, false);
            //chart.redraw();
        },
        clearSeriesData: function () {
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
    else if (chromeAgent) browserStr = "chrome"
    else if (firefoxAgent) browserStr = "firefox"
    else if (IExplorerAgent) browserStr = "IE"

    $("body").attr("browser", browserStr);
}

function InitOSAttribute() {
    var OSName = "Unknown";
    var OSGroup = "Unknown";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) { OSName = "Windows10"; OSGroup = "windows" };
    if (window.navigator.userAgent.indexOf("Windows NT 6.3") != -1) { OSName = "Windows8_1"; OSGroup = "windows" };
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) { OSName = "Windows8"; OSGroup = "windows" };
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) { OSName = "Windows7"; OSGroup = "windows" };
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) { OSName = "WindowsVista"; OSGroup = "windows" };
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) { OSName = "WindowsXP"; OSGroup = "windows" };
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) { OSName = "Windows2000"; OSGroup = "windows" };
    if (window.navigator.userAgent.indexOf("Mac") != -1) { OSName = "MaciOS"; OSGroup = "macios" };
    if (window.navigator.userAgent.indexOf("X11") != -1) { OSName = "UNIX"; OSGroup = "unix" };
    if (window.navigator.userAgent.indexOf("Linux") != -1) { OSName = "Linux"; OSGroup = "linux" };

    $("body").attr("os", OSGroup);
}

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        if (/iPad|iPhone|iPod/.test(navigator.platform)) {
            return true;
          } else {
            return navigator.maxTouchPoints &&
              navigator.maxTouchPoints > 2 &&
              /MacIntel/.test(navigator.platform);
          }
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS());
    },
    InitDeviceAttribute: function () {
        var debugStr = 'media';
        if (isMobile.any()) {
            $("body").attr("devicetype", "tablet");
            debugStr = debugStr + " - " + "tablet"
            if (isMobile.Android()) {
                $("body").attr("device", "android");
                debugStr = debugStr + " - " + "android"
            }
            else if (isMobile.iOS()) {
                $("body").attr("device", "ipad");
                debugStr = debugStr + " - " + "ipad"
            }
        }
    }
};