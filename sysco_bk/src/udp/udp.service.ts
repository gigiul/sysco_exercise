import { Injectable } from '@nestjs/common';
const dgram = require('dgram');

@Injectable()
export class UdpService {
  private server = dgram.createSocket('udp4');

  constructor() {
    this.server = dgram.createSocket('udp4');
    this.server.on('message', (msg, rinfo) => {
      try {
        const json = JSON.parse(msg.toString()); 
        const mapped = {}; /* creo un oggetto mapped dove salvare i valori del JSON parsati */
        Object.entries(json).forEach(([key, value]) => {
          mapped[key] = value;
          console.log(`server got ${key}: ${value} from ${rinfo.address}:${rinfo.port}`);
        });
        console.log(mapped);
      } catch (e) {
        console.log("The received message is not a valid JSON");
      }
    });
    this.server.bind(8081);
  }
}

