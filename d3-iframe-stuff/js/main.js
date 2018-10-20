document.addEventListener('DOMContentLoaded', function (event) {
    google.charts.load('current', {
        packages: ['corechart', 'line']
    });
    google.charts.setOnLoadCallback(drawAxisTickColors);
    
    $("#startStream").on("click", function() {
      var s = JSON.stringify({
        "Test": "Sent"
      });
      socket.send(s);
    });
}); 
var jsonData;
// Open a connection
var socket = new WebSocket('ws://localhost:3001/');
socket.onopen = function(){
  console.log("Socket Opened..");
  console.log("Waiting for user to start stream");
}

// When data is received
socket.onmessage = function(event) {
  jsonData = JSON.parse(event.data);
  console.log(jsonData);
  drawAxisTickColors(jsonData);
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

function drawAxisTickColors(j) {
  // Create our data table out of JSON data loaded from server.
  var data = new google.visualization.DataTable(j);

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    // Load the Visualization API and the piechart package.
    google.charts.load('current', {
        'packages': ['corechart']
    });
     // Set a callback to run when the Google Visualization API is loaded.
    drawChart(j);
    google.charts.setOnLoadCallback(drawChart);
}
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
