var X_CONST = 7;
var hour = 17;
var min = 30;
var currentRead = 6348;
var i = 0;
function drawAxisTickColors() {
    var options = {
        width: 800,
        height: 440,
        chartArea: {'width': '80%', 'height': '80%'},
        backgroundColor: {
            fill: 'transparent'
        },
        vAxis: {
            minValue: 0,
            maxValue: 0.3,
            title: 'Usage (kWh)',
            textStyle: {
                color: 'white'
            },
            titleTextStyle: {
                color: 'white'
            },
            baselineColor: 'white'
            // gridlines: {
            //     color: 'transparent'
            // }
        },
        hAxis: {
            title: 'Time (current minute)',
            textStyle: {
                color: 'white'
            },
            titleTextStyle: {
                color: 'white'
            }
        },
        animation: {
            duration: 1000,
            easing: 'in'
        },
        legend: {
            position: 'none',
            textStyle: {
                color: 'white'
            }
        },
        colors: ['#51ff0d']
    };

    var chart = new google.visualization.LineChart(document.getElementById('visualization'));

    google.visualization.events.addListener(chart, 'ready', function () {
        var chartFont = 'Helvetica';
        $('text').attr('font-family', chartFont);
    });

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Minute');
    data.addColumn('number', 'Usage (kWm)');
    data.addRow(['17:22:00', 0.0204326 ]);
    data.addRow(['17:23:00', 0.0204263 ]);
    data.addRow(['17:24:00', 0.0203326 ]);
    data.addRow(['17:25:00', 0.02058326 ]);
    data.addRow(['17:26:00', 0.0204326 ]);
    data.addRow(['17:27:00', 0.02068326 ]);
    data.addRow(['17:28:00', 0.02008326 ]);
    data.addRow(['17:29:00', 0.02048326 ]);
    // var button = document.getElementById('b1');

    // setInterval(appendItem, 5000);
		setInterval(function(i, currentRead){
			if(i < 60){
				var rateAmount = Math.random() * Math.floor(20) + 10;	// (0-1) * max + min
				if (22 < rateAmount <= 30)
					var priceType = "peak";
				else
					var priceType = "off peak";

				var meterDelta = Math.random() * (0.02048326 * 2) + .005;	// 0.02048326 avg kWh/min in USA
				var dateTime = hour.toString() + ':' + min.toString() + ':00';
				var priceType = priceType;
				var rateAmount = rateAmount / 100;	// Amount in dollars
				var rateUnit = 'kWh';
				var meterNo = "05504";
				var currentRead = currentRead + meterDelta;

				// Spliting meterDelta into 3 random parts that add up to meterDelta
				var sub1 = meterDelta * Math.random();
				var sub2 = (meterDelta - sub1) * Math.random();
				var sub3 = (meterDelta - sub1) - sub2;

				min += 1;
				if (min >= 60) {
					hour += 1;
					min = 0;
				}
        if (data.getNumberOfRows() > 5) {
            data.removeRow(0);
        }
        var y = currentRead;
        data.insertRows(7, [
            [dateTime, rateAmount]
        ]);
        drawChart();
			}
		}, 60000, i++, currentRead);

    function drawChart() {
        chart.draw(data, options);
    }
    drawChart();
}

document.addEventListener('DOMContentLoaded', function (event) {

    google.charts.load('current', {
        packages: ['corechart', 'line']
    });
    google.charts.setOnLoadCallback(drawAxisTickColors);
		// simulatedData();

});

function parseData(data) {
    var arr = [];
    for (var i in data.data) {
        let dateTimeTemp = data.data[i].date + " " + data.data[i].time;
        let finalDate = new Date(dateTimeTemp);
        arr.push({
            date: finalDate,
            kitchen: +data.data[i].subm1,
            laundry: +data.data[i].subm2,
            ac: +data.data[i].subm3
        });
    }
    return arr;
}
