const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
var WSS = require('ws').Server;

// Start the server
var wss = new WSS({ port: 3001 });

// When a connection is established
wss.on('connection', function(socket) {
  console.log('Opened connection ');
  piChartData = readJSONFile('./data/testing.json', function (err, json) {
    if(err) { throw err; }
  })
  // Send data back to the client
  socket.send(piChartData);

  // When data is received
  socket.on('message', function(message) {
    setInterval(broadcast,1000);
  });

  // The connection was closed
  socket.on('close', function() {
    console.log('Closed Connection ');
  });
});


// Every three seconds broadcast "{ message: 'Hello hello!' }" to all connected clients
var broadcast = function() {
  // piChartData.rows[0].c[1].v++;
  // wss.clients is an array of all connected clients
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(piChartData));
    console.log('Sent: ' + piChartData);
  });
}

function writeJSONFile(path, data, callback){
  fs.writeFile(path,data, utf8, (err) => {
    if (err) throw err
  })
}

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

app.use(bodyParser.json());

// allows Cross Origin Requests to obtain JSON data
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(3000, () => console.log('Server running on port 3000'))
