import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressPeerServer } from 'peer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port: number = +process.env.PORT || 51000;

  const peerServer = ExpressPeerServer(app.getHttpServer());

  app.use('/peerjs', peerServer);

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
