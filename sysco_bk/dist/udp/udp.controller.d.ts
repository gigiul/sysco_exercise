import { UdpService } from './udp.service';
export declare class UdpController {
    private readonly udpService;
    constructor(udpService: UdpService);
    sendUdpMessage(data: any): void;
}
