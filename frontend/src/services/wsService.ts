import { io, Socket } from 'socket.io-client';
import { useChannelStore } from '../stores/channelStore';
import { Channel } from '../types/channel';
import { useMessageStore } from '../stores/messageStore';
import { User } from '../types/user';
import { useUserStore } from '../stores/user';
import { UserStatus } from '../types/enum';
import NotificationService from '../services/NotificationService';
import { isTaggedCurrentUser } from '../utils/mentionFinder';

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

    this.socket.on('receiveMessage', (message, sender, dstChannel) => {
      const userStore = useUserStore();
      const messageStore = useMessageStore();

      const newMessage = {
        text: message,
        name: sender,
        timestamp: new Date().toISOString(),
        channelName: dstChannel,
      };

      if (userStore.user?.status !== UserStatus.OFFLINE) {
        const channelName = useChannelStore().getSelectedChannel()?.name;
        
        NotificationService.handleNewMessage({
          sender: sender,
          content: message,
          addressedToUser: isTaggedCurrentUser(message, this.username),
          channel: dstChannel,
        });

        if (channelName && channelName === dstChannel) {
          if (!messageStore.messages[channelName]) {
            messageStore.messages[channelName] = [];
          }
          messageStore.messages[channelName].push(newMessage);
        }
      } else {
        // Store missed messages while offline
        if (!messageStore.missedMessages[dstChannel]) {
          messageStore.missedMessages[dstChannel] = [];
        }
        messageStore.missedMessages[dstChannel].push(newMessage);
      }
    });

    this.socket.on('statusUpdated', (user: User) => {
      const channelStore = useChannelStore();
      channelStore.channels.forEach((channel) => {
        const userInChannel = channel.users?.find(
          (u) => u.username === user.username
        );
        if (userInChannel) {
          userInChannel.status = user.status;
        }
      });
    });

    // Listen for incoming user updates
    this.socket.on('userUpdated', (channel, user, isAdd) => { 
      const channelStore = useChannelStore();

      if (
        isAdd &&
        this.username !== user.username){
        channelStore.channels.forEach((c) => {
          if (c.name === channel.name) {
            c.users = channel.users;
          }
        });

      } else if (!isAdd && this.username !== user.username) {
        channelStore.channels.forEach((c) => {
          if (c.name === channel.name) {
            c.users = c.users?.filter((u) => u.username !== user.username);
          }
        });
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
      );
    });

    this.socket.on('userKicked', (channelName, username) => {
      if (username === this.username) {
        const channelStore = useChannelStore();
        const selectedChannel = channelStore.getSelectedChannel();

        if (selectedChannel && selectedChannel.name === channelName) {
          channelStore.selectChannel(channelStore.channels[0]);
        }

        channelStore.channels = channelStore.channels.filter(
          (channel) => channel.name !== channelName
        );
      }
    });

    this.socket.on('userTyping', ({ channel, username, message }) => {
      const channelStore = useChannelStore();
      const selectedChannel = channelStore.getSelectedChannel();
      const user = useUserStore().user;

      if (
        selectedChannel &&
        username !== this.username &&
        selectedChannel.users?.some((user) => user.username === username) &&
        user!.status !== UserStatus.OFFLINE &&
        channel === selectedChannel.name
      ) {
        channelStore.addTypingUser(username, message);
      }
    });
  }

  joinChannel(channel: string) {
    this.socket.emit('joinChannel', channel);
  }

  sendMessage(channel: string, message: string) {
    this.socket.emit('sendMessage', {
      channel,
      message,
      username: this.username,
    });
  }

  invite(channel: Channel, username: string) {
    this.socket.emit('invitation', { channel, username });
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
    const user = useUserStore().user;
    if (user!.status !== UserStatus.OFFLINE) {
      this.socket.emit('typing', { channel, username: this.username, message });
    }
  }
}

export const wsService = new WsService();
