var WSS = require('ws').Server;

// Start the server
var wss = new WSS({ port: 3001 });

// When a connection is established
wss.on('connection', function(socket) {
  console.log('Opened connection ');

  // Send data back to the client
  var json = JSON.stringify({ message: 'Gotcha' });
  socket.send(json);

  // When data is received
  socket.on('message', function(message) {
    setInterval(broadcast, 1500);
  });

  // The connection was closed
  socket.on('close', function() {
    console.log('Closed Connection ');
  });

});

// Every three seconds broadcast "{ message: 'Hello hello!' }" to all connected clients
var broadcast = function() {
  var json = JSON.stringify({
    message: 'Hello hello!'
  });

  // wss.clients is an array of all connected clients
  wss.clients.forEach(function each(client) {
    client.send(json);
    console.log('Sent: ' + json);
  });
}
