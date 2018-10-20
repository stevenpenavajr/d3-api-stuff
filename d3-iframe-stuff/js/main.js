var jsonData;
// Open a connection
var socket = new WebSocket('ws://localhost:3001/');

socket.onopen = function(){
  console.log("Socket Opened..");
  console.log("Waiting for user to start stream");
}

// When data is received
socket.onmessage = function(event) {
  var jsonData = JSON.parse(event);
  drawAxisTickColors();
  drawChart(jsonData);
}

// A connection could not be made
socket.onerror = function(event) {
  console.log(event);
}

// A connection was closed
socket.onclose = function(code, reason) {
  console.log(code, reason);
}

// Close the connection when the window is closed
window.addEventListener('beforeunload', function() {
  socket.close();
});
function drawChart(jsonData) {
    // Create our data table out of JSON data loaded from server.
    var data = new google.visualization.DataTable(jsonData);

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));

    chart.draw(data, {
        width: 400,
        height: 240
    });
}

function drawAxisTickColors() {
    // Load the Visualization API and the piechart package.
    google.charts.load('current', {
        'packages': ['corechart']
    });
    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);
}


$(function(){
  drawAxisTickColors();
  $("#startStream").on("click", function() {
    var start = JSON.stringify("{}");
    socket.send(start);
  });
});

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
