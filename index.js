
const { WebSocketServer } = require('ws');

var wsOptions = {
  port: 8080
}

const wss = new WebSocketServer({ port: wsOptions.port });

console.log("WS Opened on port " + wsOptions.port)

wss.on('connection', function connection(ws) {
  ws.on('error', function () {
    console.error});
/*   ws.on('message', function message(data) {
    console.log('received: %s', data);
  }); */

});

var udp = require('dgram');

var server = udp.createSocket('udp4');

//================ When receiving data from client 
server.on('message', function (msg, info) {
  try {
  let msgString = msg.toString();
  console.log('Data received from server UDP : ' + msg.toString());
  let msgJson = JSON.parse(msgString);
  console.log('Parsed JSON in UDP server: ' + msgJson);
  let obj = {};
  Object.entries(msgJson).forEach(([key, value]) => {
    obj[key] = value;
  });
  wss.clients.forEach(function each(client) {
    console.log("Sending to clients: " + JSON.stringify(obj))
    client.send(JSON.stringify(obj))
  })
  } catch (e) {
    wss.clients.forEach(function each(client) {
      client.send("Invalid JSON: " + e)
    })
    console.log("Invalid JSON: " + e);
  }
});
//================ if an error occurs
server.on('error', function (error) {
  console.log('Error: ' + error);
  server.close();
});

//open function
server.on('listening', function () {
  var address = server.address();
  var port = address.port;
  console.log('Server UPD is listening at port ' + port);
});

server.bind(8081);
