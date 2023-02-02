
const { WebSocketServer } = require('ws');
var udp = require('dgram');
var server = udp.createSocket('udp4');

const DEBUG = false;

var wsOptions = {
  port: 8080
}

const wss = new WebSocketServer({ port: wsOptions.port });

console.log("WS Opened on port " + wsOptions.port)

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
});

//Server UDP

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  var msgString = msg.toString();
  if (DEBUG) {
    console.log(`server got: ${msgString} from ${rinfo.address}:${rinfo.port}`);
  }
  if (isNaN(msgString)) {
    try {
      let msgParsed = JSON.parse(msgString);
      if (DEBUG) {
        console.log("JsonParse", msgParsed)
      }
      let obj = {
        "type": "data",
        "payload": msgParsed
      }
      wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(obj));
        }
      )      
      }
    catch (e) {
      wss.clients.forEach(function each(client) {
        let obj_err = {
          "type": "json_error",
          "payload": "Parsed Failed"
        }
        client.send(JSON.stringify(obj_err))
      })
      if (DEBUG) {
        console.log("Parsed Failed")
      }
    }
  }
  else {
    wss.clients.forEach(function each(client) {
      let obj_err = {
        "type": "json_error",
        "payload": "Parsed Failed"
      }
      client.send(JSON.stringify(obj_err))
    })
    if (DEBUG) {
      console.log("Parsed Failed")
    }
  }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(8081);
