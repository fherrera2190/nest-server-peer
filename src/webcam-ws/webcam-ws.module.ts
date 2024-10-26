import { Module } from '@nestjs/common';
import { WebcamWsService } from './webcam-ws.service';
import { WebcamWsGateway } from './webcam-ws.gateway';

@Module({
  providers: [WebcamWsGateway, WebcamWsService],
})
export class WebcamWsModule {}
