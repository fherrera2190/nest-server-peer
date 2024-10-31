import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ExpressPeerServer } from 'peer';
async function bootstrap() {

 // Peer Server
  const peerApp = express();
  const portPeer = +process.env.PEER_PORT || 50000;
  const peerServer = peerApp.listen(portPeer);
  console.log(`Peer Server running on: http://localhost:${portPeer}`);
  const peerExpressServer = ExpressPeerServer(peerServer);
  peerApp.use('/peerjs', peerExpressServer);



  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port: number = +process.env.PORT || 51000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);

 
}
bootstrap();
