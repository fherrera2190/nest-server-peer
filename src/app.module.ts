import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebcamWsModule } from './webcam-ws/webcam-ws.module';

@Module({
  imports: [WebcamWsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
