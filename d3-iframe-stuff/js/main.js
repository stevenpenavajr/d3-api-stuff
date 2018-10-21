var api = 'http://localhost:3000/api/datad';

var X_CONST = 7;

function drawAxisTickColors() {
    var options = {
        width: 700,
        height: 440,
        chartArea: {'width': '80%', 'height': '80%'},
        backgroundColor: {
            fill: 'transparent'
        },
        vAxis: {
            minValue: 0,
            maxValue: 300,
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
    data.addColumn('number', 'Usage (kWh)');
    data.addRow(['0', 234]);
    data.addRow(['1', 245]);
    data.addRow(['2', 230]);
    data.addRow(['3', 250]);
    data.addRow(['4', 243]);
    data.addRow(['5', 233]);
    data.addRow(['6', 238]);
    data.addRow(['7', 248]);
    // var button = document.getElementById('b1');

    setInterval(appendItem, 5000);

    function drawChart() {
        chart.draw(data, options);
    }

    function appendItem() {
        X_CONST = X_CONST + 1;
        if (data.getNumberOfRows() > 5) {
            data.removeRow(0);
        }

        var x = X_CONST;
        var y = Math.floor(Math.random() * 300) + 189;
        data.insertRows(7, [
            [x.toString(), y]
        ]);
        drawChart();
    }

    drawChart();
}



document.addEventListener('DOMContentLoaded', function (event) {
    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var parsedData = parseData(data);
            // drawChart(parsedData);
        })

    google.charts.load('current', {
        packages: ['corechart', 'line']
    });
    google.charts.setOnLoadCallback(drawAxisTickColors);

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
    // comment
}