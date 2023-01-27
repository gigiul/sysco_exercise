const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8000 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    server.send(data, 0, data.length, 8081, 'localhost', (err) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log(`Data sent: ${data}`);
      }
    });
  });

  ws.send('something');
});

server.on('message', (msg, rinfo) => {
    try {
      const json = JSON.parse(msg.toString()); 
      const mapped = {}; /* creo un oggetto mapped dove salvare i valori del JSON parsati */
      Object.entries(json).forEach(([key, value]) => {
        mapped[key] = value;
        console.log(`server udp got ${key}: ${value} from ${rinfo.address}:${rinfo.port}`);
      });
        console.log(mapped);
    } catch (e) {
      console.log("The received message is not a valid JSON");
    }
});

server.bind(8081);
