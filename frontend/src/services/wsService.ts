import { io, Socket } from 'socket.io-client';

class WsService {
  private socket: Socket;
  public username: string;

  constructor() {
    this.socket = io('http://localhost:3333');
    this.username = 'Unknown';
  }

  initialize(username: string) {
    this.username = username;
    console.log(`User ${username} connected`);
  }

  joinChannel(channel: string) {
    this.socket.emit('joinChannel', channel);
    console.log(`User joined channel: ${channel}`);
  }

  sendMessage(channel: string, message: string) {
    this.socket.emit('sendMessage', { channel, message });
    console.log(`Message sent to channel: ${channel}`);
  }

  onMessage(callback: (message: string) => void) {
    this.socket.on('receiveMessage', callback);
    console.log('Message received');
  }

  onDisconnect(callback: () => void) {
    this.socket.on('disconnect', callback);
  }
}

export const wsService = new WsService();
