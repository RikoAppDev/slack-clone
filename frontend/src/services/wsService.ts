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

    // Listen for incoming invite
    this.socket.on('receiveInvite', (channel, username) => {
      // Pride iba tomu na GUI, kto je pozvany check lebo to je broadcast vsetkym 
      if (username === this.username) {
        const channelStore = useChannelStore();
        channel.isInvitation = true;
        channelStore.invitations.push(channel);
      }
    });

    // Listen for incoming messages
    this.socket.on('receiveMessage', (message, username, dstChannel) => {
      const channelName = useChannelStore().getSelectedChannel()?.name;
      
      if (channelName && channelName === dstChannel) {
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

    this.socket.on('statusUpdated', (user: User) => {      
      const channelStore = useChannelStore();
      channelStore.channels.forEach(channel => {
        const userInChannel = channel.users?.find(u => u.username === user.username);
        if (userInChannel) {
        userInChannel.status = user.status;
        }
      });
    });

    // Listen for incoming user updates
    this.socket.on('userUpdated', (channelName, user, isAdd) => {
      const channelStore = useChannelStore();
      const selectedChannel = channelStore.getSelectedChannel();

      if (!selectedChannel || !user) return;
    
      if (!selectedChannel.users) {
        selectedChannel.users = [];
      }
      
      if (isAdd && this.username !== user.username && !selectedChannel.users.some(u => u.username === user.username)) {
        selectedChannel.users.push(user);

      } else if (!isAdd && this.username !== user.username) {
        const userIndex = selectedChannel.users.findIndex(
          (u) => u.username === user.username
        );
        if (userIndex !== -1) {
          selectedChannel.users.splice(userIndex, 1);
        }
      }
    });

    // Listen for removing channel
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

    this.socket.on('userKicked', (channelName, username) => {
      if (username === this.username) {
        console.log('You have been kicked from the channel');
        const channelStore = useChannelStore();
        const selectedChannel = channelStore.getSelectedChannel();
        
        if (selectedChannel && selectedChannel.name === channelName) {
          channelStore.selectChannel(channelStore.channels[0]);
        }
        
        channelStore.channels = channelStore.channels.filter(
          (channel) => channel.name !== channelName
        )
      }
    });

    this.socket.on('userTyping', ({ username, message }) => {
      const channelStore = useChannelStore();
      const selectedChannel = channelStore.getSelectedChannel();
      if (selectedChannel && username !== this.username && selectedChannel.users?.some(user => user.username === username)) {
        channelStore.addTypingUser(username, message);
      }
    });
  }

  joinChannel(channel: string) {
    this.socket.emit('joinChannel', channel);
  }

  sendMessage(channel: string, message: string) {
    this.socket.emit('sendMessage', { channel, message, username: this.username });
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

  updateStatus(user: User) {
    this.socket.emit('updateStatus', { user });
  }

  kickUser(channelName: string, username: string) {
    this.socket.emit('kickUser', { channelName, username });
  }

  type(channel: string, message: string) {
    this.socket.emit('typing', { channel, username: this.username, message });
  }
}

export const wsService = new WsService();
