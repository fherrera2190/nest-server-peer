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
    client.broadcast.emit('clients-updated', client.id);
    client.emit(
      'list-clients',
      this.webcamWsService
        .getConnectedClients()
        .filter((id) => id !== client.id),
    );
  }
  handleDisconnect(client: any) {
    this.webcamWsService.removeClient(client.id);

    client.broadcast.emit('client-offline', client.id);
  }

  @SubscribeMessage('videoStreamClient')
  handleVideoStream(client: Socket, stream: string) {
    //console.log(client.id);
    client.broadcast.emit('broadcastVideo', { stream, client: client.id });
  }
}
