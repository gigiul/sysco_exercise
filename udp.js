const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    try {
      const json = JSON.parse(msg.toString());
      const mapped = {};
      Object.entries(json).forEach(([key, value]) => {
        mapped[key] = value;
        console.log(`server got ${key}: ${value} from ${rinfo.address}:${rinfo.port}`);
      });
        console.log(mapped);
    } catch (e) {
      console.log("The received message is not a valid JSON");
    }
});

server.bind(8081);
