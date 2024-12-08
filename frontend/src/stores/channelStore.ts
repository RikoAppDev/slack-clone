import { defineStore } from 'pinia';
import { Channel } from '../types/channel';
import { Message } from '../types/message';
import { channelService } from '../services/channelService';
import { inviteService } from '../services/inviteService';
import { wsService } from '../services/wsService';
import { kickService } from '../services/kickService';
import { useMessageStore } from './messageStore';
import { useUserStore } from './user';
import { User } from '../types/user';

export const useChannelStore = defineStore('channelStore', {
  state: () => ({
    invitations: [] as Channel[],
    channels: [] as Channel[],
    selectedChannel: null as Channel | null,
    typingUsers: {} as { [key: string]: Message },
    showUserList: JSON.parse(localStorage.getItem('userList') || 'true'),
  }),
  actions: {
    async fetchChannels() {
      const data = await channelService.fetchChannels();
      this.channels = data.channels;
      this.invitations = this.channels.filter((c) => c.isInvitation == true);
      this.channels = this.channels.filter((c) => c.isInvitation == false);

      const messageStore = useMessageStore();
      this.channels.forEach((channel) => {
        if (!messageStore.messages[channel.name]) {
          const messageStore = useMessageStore();
          messageStore.messages[channel.name] = [];
          wsService.joinChannel(channel.name);
        }
      });

      await this.initializeSelectedChannel();
    },

    removeTypingUser(username: string) {
      delete this.typingUsers[username];
    },

    addTypingUser(username: string, message: string) {
      const formatedMessage: Message = {
        text: message,
        name: username,
        timestamp: new Date().toISOString(),
        channelName: this.selectedChannel?.name as string,
      };
      this.typingUsers[username] = formatedMessage;

      setTimeout(() => {
        if (this.typingUsers[username] && this.typingUsers[username].text === message) {
          this.removeTypingUser(username);
        }
      }, 5000);
    },

    selectChannel(channel: Channel) {
      if (this.selectedChannel?.name !== channel.name) {
        console.log('CHANNEL', channel)
        this.selectedChannel = channel;
        const messageStore = useMessageStore();
        messageStore.messages[channel.name] = [];
        wsService.joinChannel(channel.name);
      }
    },

    async addNewChannel(newChannel: Channel, isJoin = false) {
      const data = await channelService.addNewChannel(newChannel, isJoin);

      this.channels.push(data.channel);

      this.selectChannel(this.channels[this.channels.length - 1]);
      const userStore = useUserStore();
      const user = userStore.user as User;

      if (!user) {
        throw new Error('User not found');
      }

      wsService.joinChannel(newChannel.name);
      wsService.updateUser(data.channel, user, true);
      wsService.updateStatus(user);
    },

    async invite(newChannel: string, username: string) {
      await inviteService.invite(newChannel, username);

      const channel = this.channels.find((c) => c.name === newChannel);

      if (!channel) {
        throw new Error('Channel not found');
      }

      wsService.invite(channel, username);
    },

    async revoke(channelName: string, username: string) {
      await inviteService.revoke(channelName, username);
      
      const channel = this.channels.find((c) => c.name === channelName);
      const user = this.selectedChannel?.users?.find((u: User) => u.username === username);

      wsService.kickUser(channelName, username);
      wsService.updateUser(channel as Channel, user as User, false);
    },

    getSelectedChannel() {
      return this.selectedChannel;
    },

    async removeChannel(channelName: string) {
      await channelService.removeChannel(channelName);
      wsService.deleteChannel(channelName);

      this.channels = this.channels.filter(
        (channel) => channel.name !== channelName
      );
      if (this.selectedChannel?.name === channelName) {
        this.selectedChannel =
          this.channels.length > 0 ? this.channels[0] : null;
      }
    },

    async quitChannel(channelName: string) {
      const channel = this.channels.find((c) => c.name === channelName);
      
      await channelService.quitChannel(channelName);
      this.channels = this.channels.filter(
        (channel) => channel.name !== channelName
      );
      if (this.selectedChannel?.name === channelName) {
        this.selectedChannel =
          this.channels.length > 0 ? this.channels[0] : null;
      }
      
      if (!channel) {
        throw new Error('Channel not found');
      }

      wsService.updateUser(channel, useUserStore().user as User, false);
    },

    async initializeSelectedChannel() {
      this.selectedChannel = this.channels.length > 0 ? this.channels[0] : null;
      if (this.selectedChannel) {
        const messageStore = useMessageStore();
        await messageStore.fetchMessages(
          this.selectedChannel.name as string,
          1
        );
        wsService.joinChannel(this.selectedChannel.name);
      }
    },

    async acceptInvitation(name: any) {
      const data = await inviteService.acceptInvite(name);

      this.invitations = this.invitations.filter(
        (channel) => channel.name !== data.channel.name
      );
      this.channels.push(data.channel);
      this.selectChannel(this.channels[this.channels.length - 1]);

      const userStore = useUserStore();
      const user = userStore.user as User;

      if (!user) {
        throw new Error('User not found');
      }

      wsService.joinChannel(data.channel.name);
      wsService.updateUser(data.channel, user, true);
    },

    async rejectInvitation(name: string) {
      await inviteService.rejectInvite(name);

      this.invitations = this.invitations.filter(
        (channel) => channel.name !== name
      );
    },

    async kickUser(newChannel: string, username: string) {
      const data = await kickService.kickUser(newChannel, username);
      
      const user = this.selectedChannel?.users?.find((u: User) => u.username === username);
      const channel = this.channels.find((c) => c.name === newChannel);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      if (!channel) {
        throw new Error('Channel not found');
      }

      if (data.banned) {
        wsService.kickUser(newChannel, username);
        wsService.updateUser(channel, user, false);
      }
      return data;
    },

    handleUserList() {
      this.showUserList = !this.showUserList;
      localStorage.setItem('userList', JSON.stringify(this.showUserList));
    },
  },
});
