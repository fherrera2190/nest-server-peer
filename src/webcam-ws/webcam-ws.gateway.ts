import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WebcamWsService } from './webcam-ws.service';
import { Socket } from 'socket.io';
import { Server } from 'http';

@WebSocketGateway({ cors: true, namespace: '/webcam-ws' })
export class WebcamWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly webcamWsService: WebcamWsService) {}
  handleConnection(client: Socket, ...args: any[]) {
    this.webcamWsService.registerClient(client);
    this.wss.emit(
      'clients-updated',
      this.webcamWsService.getConnectedClients(),
    );
  }
  handleDisconnect(client: any) {
    this.webcamWsService.removeClient(client.id);

    this.wss.emit(
      'clients-updated',
      this.webcamWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('videoStreamClient')
  handleVideoStream(client: Socket, stream: string) {
    client.broadcast.emit('broadcastVideo', stream);
  }
}
