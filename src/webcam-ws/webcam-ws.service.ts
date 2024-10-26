import { Injectable } from '@nestjs/common';
import { ConnectedClients } from './interfaces/connected-clients.interface';
import { Socket } from 'socket.io';

@Injectable()
export class WebcamWsService {
  private connectedClients: ConnectedClients = {};

  registerClient(client: Socket) {
    this.connectedClients[client.id] = client;
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }
}
