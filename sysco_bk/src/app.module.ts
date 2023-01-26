import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UdpService } from './udp/udp.service';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UdpService, WebsocketGateway],
})
export class AppModule {}
