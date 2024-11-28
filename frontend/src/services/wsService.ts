import { io, Socket } from 'socket.io-client';

class WsService {
  private socket: Socket;
  username: string;

  constructor() {
    this.socket = io('http://localhost:3333');
    this.username = 'Unknown';
  }

  initialize(username: string) {
    this.username = username;
  }

  joinChannel(channel: string) {
    this.socket.emit('joinChannel', channel);
  }

  sendMessage(channel: string, message: string) {
    const username = this.username;
    this.socket.emit('sendMessage', { channel, message, username });
  }

  onMessage(callback: (message: string, username: string) => void) {
    this.socket.on('receiveMessage', callback);
  }

  kickUser(channel: string, username: string) {
    this.socket.emit('kickUser', { channel, username });
  }

}

export const wsService = new WsService();
