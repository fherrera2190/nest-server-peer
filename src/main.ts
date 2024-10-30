import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ExpressPeerServer } from 'peer';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port: number = +process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);

  // Peer Server
  const peerApp = express();
  const peerServer = peerApp.listen(50000);
  const peerExpressServer = ExpressPeerServer(peerServer);
  peerApp.use('/peerjs', peerExpressServer);
}
bootstrap();
