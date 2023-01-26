"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UdpService = void 0;
const common_1 = require("@nestjs/common");
const dgram = require('dgram');
let UdpService = class UdpService {
    constructor() {
        this.server = dgram.createSocket('udp4');
        this.server = dgram.createSocket('udp4');
        this.server.on('message', (msg, rinfo) => {
            try {
                const json = JSON.parse(msg.toString());
                const mapped = {};
                Object.entries(json).forEach(([key, value]) => {
                    mapped[key] = value;
                    console.log(`server got ${key}: ${value} from ${rinfo.address}:${rinfo.port}`);
                });
                console.log(mapped);
            }
            catch (e) {
                console.log("The received message is not a valid JSON");
            }
        });
        this.server.bind(5000);
    }
};
UdpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UdpService);
exports.UdpService = UdpService;
//# sourceMappingURL=udp.service.js.map