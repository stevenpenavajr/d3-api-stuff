var jsonData;
// Open a connection
var socket = new WebSocket('ws://localhost:3001/');

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


function drawChart(jsonData) {
    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));

document.addEventListener('DOMContentLoaded', function (event) {
    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var parsedData = parseData(data);
            // drawChart(parsedData);
        })
}

function drawAxisTickColors() {
    // Load the Visualization API and the piechart package.
    google.charts.load('current', {
        'packages': ['corechart']
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
}
    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);
}

// document.addEventListener('DOMContentLoaded', function (event) {
//     fetch(api)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             var parsedData = parseData(data);
//             drawChart(parsedData);
//         })
//
//     google.charts.load('current', {
//         packages: ['corechart', 'line']
//     });
//     google.charts.setOnLoadCallback(drawAxisTickColors);
//
// });
//
// function parseData(data) {
//     var arr = [];
//     for (var i in data.data) {
//         let dateTimeTemp = data.data[i].date + " " + data.data[i].time;
//         let finalDate = new Date(dateTimeTemp);
//         arr.push({
//             date: finalDate,
//             kitchen: +data.data[i].subm1,
//             laundry: +data.data[i].subm2,
//             ac: +data.data[i].subm3
//         });
//     }
//     return arr;
// }
//
// function drawChart(data) {
//     var svgWidth = 800,
//         svgHeight = 600;
//     var margin = {
//         top: 20,
//         right: 20,
//         bottom: 30,
//         left: 50
//     };
//     var width = svgWidth - margin.left - margin.right;
//     var height = svgHeight - margin.top - margin.bottom;
//     var svg = d3.select('svg')
//         .attr("width", svgWidth)
//         .attr("height", svgHeight);
//
//     var g = svg.append("g")
//         .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")"
//         );
//
//     var x = d3.scaleTime().rangeRound([0, width]);
//     var y = d3.scaleLinear().rangeRound([height, 0]);
//
//     var line = d3.line()
//         .x(function (d) {
//             return x(d.date)
//         })
//         .y(function (d) {
//             return y(d.ac)
//             // return 4
//         })
//
//     x.domain(d3.extent(data, function (d) {
//         return d.date
//     }));
//     y.domain(d3.extent(data, function (d) {
//         return d.ac
//     }));
//
//     g.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x))
//         .select(".domain")
//         .remove();
//
//     g.append("g")
//         .call(d3.axisLeft(y))
//         .append("text")
//         .attr("fill", "#000")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", "0.71em")
//         .attr("text-anchor", "end")
//         .text("Air Condition Usage (Wh)");
//
//     g.append("path")
//         .datum(data)
//         .attr("fill", "none")
//         .attr("stroke", "steelblue")
//         .attr("stroke-linejoin", "round")
//         .attr("stroke-linecap", "round")
//         .attr("stroke-width", 1.5)
//         .attr("d", line);
// }
