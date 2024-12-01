import { io, Socket } from 'socket.io-client';
import { useChannelStore } from '../stores/channelStore';
import { Channel } from '../types/channel';
import { useMessageStore } from '../stores/messageStore';
import { User } from '../types/user';

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
      // Pride iba tomu na GUI, kto je pozvany check lebo to je broadcast vsetkym 
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

    this.socket.on('userUpdated', (channelName, user, isAdd) => {
      const channelStore = useChannelStore();
      const selectedChannel = channelStore.getSelectedChannel();
      console.log(channelName, user, isAdd);
      if (!selectedChannel || !user) return;
    
      if (!selectedChannel.users) {
        selectedChannel.users = [];
      }
      
      if (isAdd && this.username !== user.username) {
        selectedChannel.users.push(user);
        console.log(selectedChannel.users);
      } else if (!isAdd && this.username !== user.username) {
        selectedChannel.users = selectedChannel.users.filter(
          (user) => user !== user
        );
        console.log('removed user');
      }
    });

    this.socket.on('channelDeleted', (channelName) => {
      const channelStore = useChannelStore();
      const selectedChannel = channelStore.getSelectedChannel();
      
      if (selectedChannel && selectedChannel.name === channelName) {
        channelStore.selectChannel(channelStore.channels[0]);
      }
      
      channelStore.channels = channelStore.channels.filter(
        (channel) => channel.name !== channelName
      )
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
  }

  deleteChannel(channelName: string) {
    this.socket.emit('deleteChannel', channelName);
  }

  updateUser(channel: Channel, user: User, isAdd: boolean) {
    this.socket.emit('updateUser', { channel, user, isAdd });
  }
}

export const wsService = new WsService();
