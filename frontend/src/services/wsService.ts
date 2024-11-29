import { io, Socket } from 'socket.io-client';
import { useChannelStore } from '../stores/channelStore';
import { Channel } from '../types/channel';
import { useMessageStore } from '../stores/messageStore';

class WsService {
  private socket: Socket;
  username: string;

  constructor() {
    this.socket = io('http://localhost:3333');
    this.username = '';
  }

  initialize(username: string) {
    this.username = username;

    this.socket.on('receiveInvite', (channel, username) => {
      // Pride iba tomudo GUI, kto je pozvany check lebo to je broadcast vsetkym 
      if (username === this.username) {
        const channelStore = useChannelStore();
        channel.isInvitation = true;
        channelStore.invitations.push(channel);
        console.log(channelStore.invitations);
      }
    });

  this.socket.on('receiveMessage', (message, username) => {
    const channelName = useChannelStore().getSelectedChannel()?.name;
    
    if (channelName) {
      const messageStore = useMessageStore();
      
      // Initialize the messages array if it doesn't exist
      if (!messageStore.messages[channelName]) {
        messageStore.messages[channelName] = [];
      }

      const newMessage = {
        text: message,
        name: username,
        timestamp: new Date().toISOString(),
        channelName,
      }

      messageStore.messages[channelName].push(newMessage);
    }
  });

  }

  joinChannel(channel: string) {
    this.socket.emit('joinChannel', channel);
  }

  sendMessage(channel: string, message: string) {
    const username = this.username;
    this.socket.emit('sendMessage', { channel, message, username });
  }

  invite(channel: Channel, username: string) {
    this.socket.emit('invitation', { channel, username })
    console.log('Invitation sent');
  }
}

export const wsService = new WsService();
