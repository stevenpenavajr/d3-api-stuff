var X_CONST = 7;
var hour = 17;
var min = 30;
var currentRead = 6348;
var i = 0;
var SUB1_SUM = 0.23  // 0.0013763804728731193  OVE
var SUB2_SUM = 0.49 // 0.00829282948786613 // AC
var SUB3_SUM = 0.28 // 0.004981089722375572 // TV

/*
0.020690063140724472 0.0009816686438060584 0.002635080761982451 */

function drawAxisTickColors() {
    var options = {
        title:'Energy Consumption by Medium',
        titleTextStyle: {
            color: '#ffffff',
            fontSize: 18
        },
        
        width: 700,
        height: 440,
        pieHole: 0.4,
        // chartArea: { 
        //     'width': 800, 
        //     'height': 440,            
        // },
        backgroundColor: {
            fill: 'transparent',
            stroke: 'transparent'
        },
        lineWidth: 10,
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
            easing: 'in',
            startup: true
        },
        legend: {
            position: 'right',
            textStyle: {
                color: 'white'
            }
        },
        slices: [{color: '#A8D7FA'}, {color: '#FFC200'}, {color: '#330EC7'}]
    };
    
    var chart = new google.visualization.PieChart(document.getElementById('visualizationPie'));

    google.visualization.events.addListener(chart, 'ready', function () {
        var chartFont = 'Helvetica';
        $('text').attr('font-family', chartFont);
    });

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Minute');
    data.addColumn('number', 'Usage (kWm)');
    data.addRow(['Air Conditioning', 0.49 ]);
    data.addRow(['Oven', 0.23 ]);
    data.addRow(['Entertainment Systems', 0.28 ]);
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
                
                SUB1_SUM = SUB1_SUM + sub1
                SUB2_SUM = SUB2_SUM + sub2
                SUB3_SUM = SUB3_SUM + sub3

				min += 1;
				if (min >= 60) {
					hour += 1;
					min = 0;
				}
        if (data.getNumberOfRows() > 5) {
            data.removeRow(0);
        }
        var y = currentRead;
        // data.insertRows(0, [
        //     [dateTime, rateAmount]
        // ]);
        data.setCell(0,1,SUB2_SUM); // ac
        data.setCell(1,1,SUB1_SUM); // oven
        data.setCell(2,1,SUB3_SUM); // tv
        // console.log(data);
        drawChart();
			}
		}, 1000, i++, currentRead);

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
